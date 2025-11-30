---
layout: post
title: '使用 Dockerfile 在 Fly.io 部署 FastAPI API'
categories: 'Python'
description: 'Deploy FastAPI on Fly.io with Dockerfile.'
keywords: 'FastAPI,Fly.io,Docker,Dockerfile,Deploy'
---

## 前言
[前一篇](./2025-11-29-deploy-fastapi-on-render.md)我們示範了如何在 Render 上部署一個最簡單的 FastAPI API。這次我們沿用同一個範例專案，改成用 **Dockerfile** 打包後部署到 **Fly.io**。

[Fly.io](https://fly.io/) 本質上是「跑容器的 VM 平台」，很適合拿來部署 FastAPI 這種長駐型 API 服務。官方文件也示範了用 Docker image 來部署 FastAPI，流程大致是：先把應用程式打包成 image，再交給 Fly.io 跑。

本文會一步一步完成：

1. 準備 FastAPI 專案（沿用 Render 範例）
2. 加入 Dockerfile
3. 安裝 Fly.io CLI（flyctl）與建立應用
4. 部署、測試線上 API

---

## 一、建立一個最簡單的 FastAPI 專案
我們先在本機建立一個乾淨的資料夾，裡面只放最必要的檔案：

* `main.py`：FastAPI 入口程式
* `requirements.txt`：列出 Python 套件
* `Dockerfile`：使用Docker部署FastAPI

接下來的檔案結構會長這樣：

```text
fastapi-fly-demo/
├─ main.py
├─ requirements.txt
└─ Dockerfile       
```

### 1. `main.py`（FastAPI 程式）
在專案根目錄建立 `main.py`，內容如下：

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Fly.io!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
```

### 2. `requirements.txt`

同樣維持最小相依即可，例如：

```txt
fastapi==0.115.5
uvicorn[standard]==0.32.0
```

> 版本可依你實際使用為主，重點是有 fastapi 與 uvicorn。


## 二、加入 Dockerfile：把 FastAPI 打包成容器
Fly.io 會偵測你的專案，如果找到 `Dockerfile`，就會直接用它來 build image。在專案根目錄新增 `Dockerfile`，內容可以先用這個乾淨版本：

```Dockerfile
# 使用官方 Python 精簡版映像檔
FROM python:3.11-slim

# 建立工作目錄
WORKDIR /app

# 安裝系統層級套件（如果你未來需要 NumPy / SciPy 等，可在這邊加）
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     build-essential \
#   && rm -rf /var/lib/apt/lists/*

# 複製 requirements 並安裝 Python 套件
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製程式碼
COPY . .

# 使用 Uvicorn 啟動 FastAPI
# 注意：這邊 port 要用 8080，Fly.io 預設會對應到這個 port
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

這個 Dockerfile 做了幾件事：

1. 以 `python:3.11-slim` 為基底，減少 image 大小。
2. 在 `/app` 建立工作目錄，將 `requirements.txt` 與程式碼複製進去。
3. 安裝 FastAPI、Uvicorn 等相依套件。
4. 使用 `uvicorn main:app` 啟動 API，並且 listen 在 `0.0.0.0:8080`。

只要這個 image 能在本機 `docker run` 順利啟動，Fly.io 上基本就沒問題。

如果你想要再更乾淨一點，也可以加一個 `.dockerignore`，排除 `.venv`、`.git` 等不必要檔案：

```text
.venv
.git
__pycache__
*.pyc
```

---

## 三、安裝 Fly.io CLI 與登入
### macOS 系統安裝
Fly.io 的操作主要透過 `flyctl` 這個 CLI 工具完成。官方文件提供各平台安裝方式，例如 macOS 可以用 Homebrew 安裝：

```bash
brew install flyctl
```

### Windows 系統安裝

如果你使用 Windows，有兩種常見安裝方式：
（1）PowerShell 一鍵安裝（官方推薦）
（2）下載執行檔（ZIP 安裝方式）


#### 方法一：使用 PowerShell 一鍵安裝（官方推薦）

1. 打開 PowerShell（建議使用「以系統管理員身分執行」）
2. 執行以下指令：

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

執行後，Windows 會自動：

* 下載 flyctl
* 安裝到你的使用者資料夾
* 自動加入 PATH

你可以用以下指令確認：

```powershell
flyctl version
```

若成功，你會看到類似：

```
flyctl v0.x.x
```

#### 方法二：手動下載 ZIP

1. 前往官方 GitHub Releases
   [https://github.com/superfly/flyctl/releases](https://github.com/superfly/flyctl/releases)
2. 找到最新版 → 下載 `flyctl_Windows_x86_64.zip`
3. 解壓縮後，把資料夾加入 PATH
4. 重新啟動終端機輸入：

```powershell
flyctl version
```

即可確認是否安裝成功。

## 登入 Fly.io
安裝完成後，先登入你的帳號（如果還沒有帳號，指令會引導你註冊）：

```bash
flyctl auth signup   # 第一次使用，建立帳號
# 或
flyctl auth login    # 之後用這個登入
```

執行後會開瀏覽器讓你登入／授權。

> 我自己測試未綁定信用卡還是能7天免費試用。

如果想要用 GitHub 專案部署也能透過連動帳號方式啟用。

![](/images/posts/Python/2025/img1141130-3.png)

## 四、初始化 Fly.io 應用（產生 fly.toml）

接著在專案根目錄 `fastapi-fly-demo/` 執行：

```bash
cd fastapi-fly-demo
flyctl launch
```

`flyctl launch` 會做幾件事：

1. 掃描你的 source code，判斷這是一個 Python / FastAPI 專案。
2. 詢問你一些設定（可以依需求回答）：
   * App name（可以直接 Enter 讓 Fly 幫你取，或自己輸入一個）
   * 要部署的 region（例如 prime 會自動選一個接近你的節點）
   * 要不要建立 PostgreSQL、Redis 等服務（這個簡單範例可以選「不要」）
3. 產生一個 `fly.toml` 設定檔，裡面描述應用程式如何被部署。

最後他詢問，在繼續之前先調整一下這些設定？如果輸入 y 會跳出一個網頁可以在上面進行設定。儲存後就會自動幫你初始化部署。

![](/images/posts/Python/2025/img1141130-1.png)

初始化完之後，專案目錄會多一個檔案：

```text
fastapi-fly-demo/
├─ main.py
├─ requirements.txt
├─ Dockerfile
└─ fly.toml
```

### `fly.toml` 大致長相

實際內容會依你當時選的 app name、region 等有所不同，大致會長得像這樣：([Fly][1])

```toml
app = "fastapi-fly-demo"
primary_region = "sin"

[build]

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]
```

這裡最關鍵的是：

* `internal_port = 8080`：要對應到 Dockerfile 裡 Uvicorn 啟動的 port（`--port 8080`），兩邊要一致。
* `auto_stop_machines` / `auto_start_machines`：免費方案下， Fly.io 會在一段時間沒有流量時自動停機，有請求時再啟動，類似 Render 的 sleep 行為。

---

## 五、部署到 Fly.io

完成初始化後，只要一行指令就能部署：

```bash
flyctl deploy
```

這個指令會：

1. 使用你的 `Dockerfile` 建立 Docker image。
2. 將 image 推送到 Fly.io 的 registry。
3. 在你選擇的 region 建立 VM，啟動這個容器。

在部署過程中，終端機會顯示 build log、部署狀態。如果一切順利，你最後會看到類似：

```text
Deploying fastapi-fly-demo
...
Monitoring Deployment
v0 deployed successfully

Visit your app at https://fastapi-fly-demo.fly.dev/
```

![](/images/posts/Python/2025/img1141130-2.png)

URL 會依你設定的 app name 而不同，但格式大概是：

```text
https://<你的-app-name>.fly.dev/
```

---

## 六、線上測試 FastAPI API

部署完成後，我們來驗證一下 API 是否正常運作。

假設你的 app name 是 `fastapi-fly-demo`，可以測試：

* 首頁
  `https://fastapi-fly-demo.fly.dev/`

  預期回傳：

  ```json
  {"message": "Hello from FastAPI on Fly.io!"}
  ```

* 健康檢查端點
  `https://fastapi-fly-demo.fly.dev/health`

  預期回傳：

  ```json
  {"status": "ok"}
  ```

* 自動產生的 Swagger 文件
  `https://fastapi-fly-demo.fly.dev/docs`

  你應該會看到熟悉的 FastAPI Swagger UI，可以直接在上面發送請求。

![](/images/posts/Python/2025/img1141130-4.png)

---

## 七、日後更新程式的流程

之後你如果要修改程式碼（例如多加一個路由），流程會非常簡單：

1. 在本機修改 `main.py`（或其他檔案）

   ```python
   @app.get("/hello/{name}")
   def say_hello(name: str):
       return {"message": f"Hello, {name}! From Fly.io."}
   ```

2. 重新 build & 部署

   ```bash
   flyctl deploy
   ```

3. 稍等 build 完成後，即可呼叫：

   ```text
   https://fastapi-fly-demo.fly.dev/hello/Yilin
   ```

   預期回傳：

   ```json
   {"message": "Hello, Yilin! From Fly.io."}
   ```

Fly.io 會幫你做滾動更新（rolling update），在新版本啟動前先讓舊版本繼續跑，降低 downtime 的時間。

---

## 八、常見問題與小提醒

### 1. 一定要 Dockerfile 嗎？

Fly.io 也支援自動偵測專案並產生 Docker image（例如搭配 Buildpacks），但官方文件與社群範例普遍建議：
**Python / FastAPI 專案最好自己寫 Dockerfile，掌控依賴與執行環境**，尤其當你有 NumPy、Pandas 或其他需要系統套件的相依時更是如此。([Fly][1])

### 2. 我要怎麼指定 Python 版本？

在這個範例中，我們直接在 Dockerfile 的 `FROM python:3.11-slim` 決定 Python 版本。
未來如果你想升級版本，只要改這一行，再重新 `flyctl deploy` 即可。

### 3. 怎麼觀看 Log？

Fly.io 提供 log 指令：

```bash
flyctl logs
```

可以即時看到 Uvicorn 的 log，例如請求記錄、錯誤訊息等。

### 4. 免費嗎？目前 Fly.io 的定位是什麼？

Fly.io **沒有傳統的永久免費方案**，新帳號也不再有過去那種「一直跑 3 台小 VM、每月免費額度」的 free-tier。現在的模式比較像：

* **新用戶有 7 天免費試用期**（不綁卡也能用）
* 試用期結束後變成 **「用多少算多少」的 pay-as-you-go**
* 如果你的服務很小、很少流量，
  → **可能每個月是 0 元**（因為你幾乎沒使用資源）
* 如果你讓機器 24/7 長時間運作
  → **基本上一定會產生費用**

也就是說，Fly.io 的定位比較像「**容器化 VM 平台**」，適合部署 Docker 化的 API、後端服務，彈性比 Render 更高，但也比較偏向付費型服務。
如果你只是偶爾測試、低流量小專案，它確實可以做到幾乎不用花錢；但如果你想要長期穩定上線的 Production，就不建議把它當永久免費平台。

## 九、Render 與 Fly.io 的差異與定位
如果你已經有一個在 Render 上跑得好好的 FastAPI 專案，要搬到 Fly.io 其實只差幾步：

1. 加一個 Dockerfile，保證在容器裡可以正常啟動
2. 安裝 `flyctl`，`flyctl launch` 產生 `fly.toml`
3. `flyctl deploy` 把 image 丟上去

兩者在開發體驗上的差異，大致可以這樣理解：

* Render：偏向「全代管 PaaS」，不用 Docker 也能跑，適合想省事、快速 PoC / MVP 開發。
* Fly.io：偏向「容器＋輕量 VM 平台」，你掌控 Docker image 與環境設定，適合需要更多彈性、或偏向微服務架構的專案。

如果你原本的 Render 專案只是單一 `main.py`、`requirements.txt`，這篇文章示範的做法就是很自然的一步：
把它包成 Docker image，然後在 Fly.io 上啟動，未來要搬到其他容器平台（例如 Kubernetes、自家伺服器）也會更輕鬆。

完整[GitHub](https://github.com/1010code/fastapi-fly-demo)範例成始碼