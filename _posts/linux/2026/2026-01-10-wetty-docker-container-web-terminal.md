---
layout: post
title: '用 WeTTY 讓 Docker Container 擁有專屬 Web Terminal'
categories: 'Linux'
description: 'A practical guide to deploying WeTTY inside individual Docker containers to provide isolated web-based terminals for multi-tenant, sandbox, and secure environments.'
keywords: 'WeTTY, Docker, web terminal, container isolation, multi-tenant, sandbox'
---


## 前言
在[上一篇](./2026-01-09-wetty-browser-remote-linux-terminal-tutorial.md)文章中，我們已經介紹了如何使用 WeTTY 透過瀏覽器存取遠端 Linux Terminal，完成基本的 Web SSH 架設。不過當環境導入 Docker，並在同一台主機上運行多個 container 時，單純讓使用者登入 Host 再切換 container 的方式，可能會產生權限控管與隔離性的問題。因此，本篇將進一步探討如何讓每個 Docker Container 擁有專屬的 Web Terminal，並比較集中式與容器級兩種部署架構，協助你在便利性與安全性之間取得最佳平衡。

## 1. 教學目標與情境需求

在實務上，我們常見的需求不是「讓客戶 SSH 進入 Host 主機」，而是：

* Host 上跑著多個服務容器（例如：client-a、client-b、demo、sandbox）
* 每個容器希望提供「獨立的 Terminal 入口」
* 客戶只要用瀏覽器就能進入該容器的 console
* 彼此隔離：客戶 **不會碰到 host，也不會看到其他 container**

這時 WeTTY（Web Terminal）就是非常合適的工具：
它提供 **瀏覽器介面 → WebSocket → SSH** 的終端機體驗。

## 2. 架構說明

每個客戶/容器都有一套自己的 WeTTY，架構如下：

```
Client Browser
   │
   │ HTTP / WebSocket (Host Port 3001)
   ▼
WeTTY (inside Container)
   │
   │ SSH (127.0.0.1:22)  ← 連回容器自己
   ▼
Container Shell (user /bin/ash)
```

重點概念：

* 瀏覽器只連到 Host 的 `:3001`
* Host 只是做 port mapping，客戶不會登入 host
* WeTTY 透過 SSH 連回 **同一個容器內的 SSH Server**（127.0.0.1）
* 所以 Terminal 看到的是容器內的環境（隔離）


## 3. 前置條件

### 3.1 Host 環境

* Linux 主機（建議 Ubuntu）
* 已安裝 Docker
* Host IP（範例）：`123.456.789.000`

### 3.2 你要開放的對外入口

假設給 `client-a` 這個 container 使用：

* WeTTY 對外 port：`3001`
* 實際容器內 WeTTY port：`3000`


## 4. 實作方式：每個 Container 內建 WeTTY + SSH Server

> 下面是「最小可用」版本：只要能用 WeTTY 進容器即可。

你需要兩個檔案：

* `Dockerfile`
* `entrypoint.sh`

### 4.1 Dockerfile（建立可用的 WeTTY Container）

建立 `Dockerfile`：

```dockerfile
FROM wettyoss/wetty:latest

USER root

# 安裝 dropbear (SSH server) 與 bash
RUN apk add --no-cache dropbear bash

# 建立一般使用者 user
RUN adduser -D -s /bin/ash user \
 && echo 'user:user' | chpasswd

# 產生 dropbear host keys
RUN mkdir -p /etc/dropbear \
 && dropbearkey -t rsa -f /etc/dropbear/dropbear_rsa_host_key \
 && dropbearkey -t ecdsa -f /etc/dropbear/dropbear_ecdsa_host_key \
 && dropbearkey -t ed25519 -f /etc/dropbear/dropbear_ed25519_host_key

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000 22

CMD ["/entrypoint.sh"]
```

為什麼用 `dropbear`？

* `wettyoss/wetty` 使用 Alpine，可能遇到 `openssh` 套件版本相依衝突
* `dropbear` 是輕量 SSH server，適合容器環境且安裝簡單


### 4.2 entrypoint.sh（啟動 SSH + WeTTY）

建立 `entrypoint.sh`：

```sh
#!/usr/bin/env sh
set -e

# 啟動 dropbear SSH server（背景）
dropbear -F -E -R -p 22 &
sleep 0.2

# 直接用 wetty CLI 啟動
exec wetty \
  --host 0.0.0.0 \
  --port 3000 \
  --base /wetty \
  --ssh-host 127.0.0.1 \
  --ssh-port 22 \
  --ssh-user user \
  --ssh-auth publickey,password \
  --force-ssh \
  --log-level info
```

關鍵設定解釋：

* `--base /wetty`：讓 WeTTY 掛在 `/wetty` 路徑
* `--ssh-host 127.0.0.1`：WeTTY SSH 連到「容器自己」
* `--ssh-port 22`：dropbear 聽在 22
* `--ssh-user user`：登入的使用者是容器內的 `user`
* `--ssh-auth publickey,password`：允許密碼登入（demo 先用密碼）
* `--force-ssh`：強制走 SSH 模式

## 5. Build 與啟動（完整指令）


### 5.1 Build Image

在 Dockerfile 所在資料夾執行：

```bash
sudo docker build --no-cache -t wetty-per-container-demo:latest .
```

### 5.2 啟動 Container（映射到 Host 3001）
假設這是給客戶 A 的應用部署。

```bash
sudo docker run -d --name demo-client-1 \
  -p 3001:3000 \
  wetty-per-container-demo:latest
```

### 5.3 查看 Logs

```bash
sudo docker logs -f demo-client-a
```


## 6. 從瀏覽器登入（客戶使用方式）

客戶只要開瀏覽器輸入：

```
http://118.163.199.137:3001/wetty
```

登入資訊：

* 帳號：`user`
* 密碼：`user`

> 密碼輸入時不會顯示任何字元（連 `*` 都不會）是正常行為。


## 7. 多客戶/多容器的擴充方式

如果你有多個客戶，每個客戶一個容器，只需要：

* 每個容器都用同一份 image
* 但對外 port 不同

例如：

### client-a → 3001

```bash
sudo docker run -d --name client-a -p 3001:3000 wetty-per-container-demo:latest
```

### client-b → 3002

```bash
sudo docker run -d --name client-b -p 3002:3000 wetty-per-container-demo:latest
```

客戶入口分別是：

* `http://host:3001/wetty`
* `http://host:3002/wetty`

## 8. Docker 操作
### 查看 Containers
查看所有的 container

```
sudo docker ps -a
```

### 停止指定的 Container
若你只想「暫時關閉」某個服務：

```
sudo docker stop demo-client-a
```

### 再次啟動已停止的 container

```
sudo docker start demo-client-a
```

### 移除 Container（釋放名稱與資源）
如果你確定某個 container 不再需要（例如要重建設定），可以直接強制移除：

```
sudo docker rm -f demo-client-b
```

## 9. 常見維運情境整理

### 情境一：名稱被佔用，無法重新啟動

錯誤訊息：

```
Conflict. The container name "/demo-client-a" is already in use
```

解法：

```bash
sudo docker rm -f demo-client-a
```

### 情境二：WeTTY 畫面異常，想重啟 container

```bash
sudo docker restart demo-client-a
```


### 情境三：查看 WeTTY 或 SSH 啟動狀態

```bash
sudo docker logs -f demo-client-a
```


## 9. 安全性建議

目前 demo 為了快速可用，使用固定密碼 `user/user`。正式環境建議：

* 每個客戶建立獨立帳號與密碼（或一次性密碼）
* 改用 SSH Key（不開密碼登入）
* WeTTY 前面加一層 Auth（例如 Basic Auth、JWT、或 SSO）
* 只允許特定 IP 存取該客戶 port（iptables / security group）
