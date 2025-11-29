---
layout: post
title: '用 Render 免費部署一個 FastAPI 服務'
categories: 'Python'
description: 'A beginner-friendly guide to deploying a FastAPI application for free using Render.'
keywords: 'FastAPI,Render,Deployment,Cloud Hosting,Python'
---

## 前言
在開發 Python API 的時候，FastAPI 幾乎是現在最熱門的框架之一；而如果你想「**免費、快速**」把它丟到雲端給別人呼叫，Render 也是很多開發者常用的平台之一。

這篇文章會帶你從零開始：

1. 在本機建立一個最簡單的 FastAPI 專案
2. 把程式碼推到 GitHub
3. 在 Render 上建立 Web Service
4. 成功拿到一個可以公開使用的 HTTPS API 網址

整體流程大概是：**本機開發 → GitHub → Render 自動部署**。


## 一、前置條件
在開始前，請先確認你有以下環境：

* 一台電腦（Windows / macOS / Linux 皆可）
* 已安裝：

  * **Python 3.9+**
  * **Git**
* 一個 **GitHub 帳號**
* 一個 **Render 帳號**（可以用 GitHub 直接登入）

## 二、建立一個最簡單的 FastAPI 專案

我們先在本機建立一個乾淨的資料夾，裡面只放最必要的檔案：

* `main.py`：FastAPI 入口程式
* `requirements.txt`：列出 Python 套件
* （可選）`README.md`：專案說明

### 1. 建立資料夾與虛擬環境

```bash
mkdir fastapi-render-demo
cd fastapi-render-demo

# 建立虛擬環境（名稱可依喜好）
python -m venv .venv

# 啟用虛擬環境
# macOS / Linux:
source .venv/bin/activate

# Windows PowerShell:
# .venv\Scripts\Activate.ps1
```

### 2. 安裝 FastAPI 與 Uvicorn

```bash
pip install fastapi uvicorn
```

### 3. 建立 `main.py`

在專案根目錄建立 `main.py`，內容如下：

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Render!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
```

說明：

* `app = FastAPI()`：建立一個 FastAPI 應用程式物件。
* `/`：首頁路由，回傳一個簡單的 JSON。
* `/health`：健康檢查端點，之後在雲端上也可以用來確認服務有沒有正常啟動。

### 4. 建立 `requirements.txt`

Render 會根據 `requirements.txt` 幫你安裝套件，因此我們要把必要套件列出來：

```bash
pip freeze > requirements.txt
```

產生出來的檔案可能會列出很多套件，如果你想維持乾淨，可以手動改成最小版本，例如：

```txt
fastapi==0.115.5
uvicorn[standard]==0.32.0
```

> 版本號可依你實際安裝的為主，重點是 FastAPI + Uvicorn 要存在。

### 5. 本機測試 FastAPI

在本機先啟動看看：

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

然後在瀏覽器打開：

* `http://127.0.0.1:8000/` → 應該會看到 `{"message": "Hello from FastAPI on Render!"}`
* `http://127.0.0.1:8000/docs` → 自動產生的 Swagger UI 文件

![](/images/posts/Python/2025/img1141129-1.png)

如果這裡都正常，表示你的 FastAPI 程式沒有問題，可以進下一步。

## 三、把專案推到 GitHub

Render 是從 Git repository（例如 GitHub）抓程式碼來部署的，所以我們先把專案推上 GitHub。

### 1. 初始化 Git

```bash
git init
git add .
git commit -m "Initial FastAPI app for Render"
```

### 2. 在 GitHub 建立 Repository

到 GitHub 網站：

1. 點右上角「New repository」
2. Repository name 輸入如 `fastapi-render-demo`
3. 其他設定用預設即可，按「Create repository」

![](/images/posts/Python/2025/img1141129-2.png)

在建立完成的頁面中，你會看到一段教學，把遠端加進本地 repo，類似下面這樣：

```bash
git remote add origin https://github.com/你的帳號/fastapi-render-demo.git
git branch -M main
git push -u origin main
```

執行完之後，到 GitHub 專案頁面重新整理，應該就可以看到 `main.py`、`requirements.txt` 等檔案。

![](/images/posts/Python/2025/img1141129-3.png)

## 四、在 Render 建立 Web Service

接著來到重點：把這個 FastAPI 部署到 Render。

### 1. 登入 Render

1. 打開 [https://render.com](https://render.com)
2. 使用 GitHub 帳號登入（第一次登入會要你授權存取 repo）

### 2. 建立新的 Web Service

1. 在 Render Dashboard 點選 **「New」 → 「Web Service」**
2. 選擇你剛剛的 GitHub repo：`fastapi-render-demo`
3. 接下來會進入設定畫面，重點如下：

![](/images/posts/Python/2025/img1141129-4.png)

#### （1）Name

* 給你的服務取一個名字，例如：`fastapi-render-demo`
* 這個名稱會出現在你的服務網址上，例如：
  `https://fastapi-render-demo.onrender.com`

#### （2）Region

* 選一個靠近你使用者的區域（例如你在台灣，選 Singapore / Asia 會比較快，如果有提供的話；如果沒有就選 closest）。

#### （3）Branch

* 用 `main`（或你實際 push 的分支）

#### （4）Runtime & Build Settings

**Runtime**：選擇 **Python**（如果介面有這個選項）。
有時候 Render 會以「Docker」或「Native environment」呈現，原則是我們用「普通的 Python 環境」即可，不需要自己寫 Dockerfile。

**Build Command（建置指令）**

Render 預設會幫你從 `requirements.txt` 安裝套件，你可以這樣寫：

```bash
pip install -r requirements.txt
```

**Start Command（啟動指令）**

這是最關鍵的部分，Render 會用這個指令啟動你的 FastAPI。

我們希望 Uvicorn listen 在 Render 提供的 `PORT` 環境變數上：

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

> 注意：
>
> * `main:app` 表示「`main.py` 檔案裡的 `app` 物件」。
> * `--host 0.0.0.0` 讓外部可以連進來。
> * `--port $PORT` 是 Render 指定的 port，不能自己亂寫 8000。

#### （5）Environment（環境）

* 一開始可以先選 `Free`
* Python 版本：有些介面可以指定，若有選項建議選 Python 3.10 或以上

其他像 auto deploy 可以保持預設（通常是「每次 push 自動重新部署」）。

設定完成後，按下 **「Create Web Service」**。

## 五、等待 Render 部署並測試 API

建立 Web Service 後，Render 會開始：

1. 建立環境
2. 執行 Build Command（安裝套件）
3. 執行 Start Command（啟動 Uvicorn）

你可以在服務的 **「Logs」** 頁籤中看到部署過程。

![](/images/posts/Python/2025/img1141129-5.png)

### 1. 確認啟動成功

當你在 log 中看到類似：

```text
INFO:     Uvicorn running on http://0.0.0.0:10000 (Press CTRL+C to quit)
```

或沒有錯誤訊息時，Render 頂端通常會顯示 `Live` 狀態，表示服務已經成功啟動。

### 2. 測試線上 API URL

在 Render 服務頁面右上角，會看到一個網址，例如：

* `https://fastapi-render-demo-n9yw.onrender.com`

打開瀏覽器輸入：

* `https://fastapi-render-demo-n9yw.onrender.com`
* `https://fastapi-render-demo-n9yw.onrender.com/health`
* `https://fastapi-render-demo-n9yw.onrender.com/docs`

正常情況下你會看到：

* `/`：`{"message": "Hello from FastAPI on Render!"}`
* `/health`：`{"status": "ok"}`
* `/docs`：Swagger UI（線上 API 文件）

到這邊為止，你已經成功把 FastAPI 部署到 Render 上，任何人只要知道這個網址，都可以呼叫你的 API。

![](/images/posts/Python/2025/img1141129-6.png)

## 六、後續開發與自動部署流程

Render 最大的優點之一，就是支援「**自動部署**」。

### 1. 修改程式碼

假設你在本機 `main.py` 多加一個端點：

```python
@app.get("/hello/{name}")
def say_hello(name: str):
    return {"message": f"Hello, {name}! This is FastAPI on Render."}
```

### 2. Commit 並推到 GitHub

```bash
git add main.py
git commit -m "Add /hello/{name} endpoint"
git push origin main
```

### 3. Render 自動重新部署

推到 GitHub 之後，Render 會自動偵測到有新的 commit，重新跑一次 Build + Start。幾十秒之後，你的線上 API 就會更新。

測試網址：

* `https://fastapi-render-demo.onrender.com/hello/Yilin`

應該會回應：

```json
{
  "message": "Hello, Yilin! This is FastAPI on Render."
}
```

## 七、常見問題整理

### 1. 為什麼會顯示「Service unavailable」或打開很慢？

Render 免費版有一個很重要的特性：**若一段時間沒有流量，服務會自動 Sleep**。
下一次有人打 API，它會先把服務喚醒，這時候就會出現幾秒鐘的「冷啟動」延遲。

解決方式：

* 免費版：沒辦法完全避免，只能接受第一次會比較慢。
* 若你有預算：可以升級到付費方案，減少休眠與冷啟動問題。

### 2. 為什麼我的服務會啟動失敗？

常見原因有：

1. **Start Command 寫錯**

   * 確認是不是 `uvicorn main:app --host 0.0.0.0 --port $PORT`
   * `main` 要對到檔名 `main.py`，`app` 要對到程式裡的變數名稱。

2. **缺少 requirements**

   * `requirements.txt` 裡沒有 `fastapi` 或 `uvicorn[standard]`
   * 套件名稱拼錯。

3. **Python 版本不符**

   * 若有使用新語法（例如 pattern matching），但 Render 預設 Python 太舊，可能啟動會噴錯。
   * 可以在 Render 的環境設定中指定 Python 版本，或在專案中加一個 `runtime.txt`（視 Render 當前支援情況而定）。

### 3. 可以使用環境變數嗎？

可以，在 Render 的服務設定中有 **Environment → Environment Variables**，你可以新增像：

* `API_KEY`
* `DATABASE_URL`

在程式裡直接透過 `os.getenv("API_KEY")` 取得即可。

## 八、總結與延伸方向

到這裡，我們完成了這幾件事：

1. 用 FastAPI 在本機寫了一個簡單的 API
2. 建立虛擬環境、安裝套件並產生 `requirements.txt`
3. 把專案推到 GitHub
4. 在 Render 建立 Web Service，設定 Build / Start Command
5. 拿到一個線上的 HTTPS API 網址讓外部可以使用
