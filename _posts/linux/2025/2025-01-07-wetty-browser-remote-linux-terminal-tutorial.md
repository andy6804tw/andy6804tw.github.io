---
layout: post
title: '使用 WeTTY 透過瀏覽器存取遠端 Linux Terminal (完整安裝與設定教學)'
categories: 'Linux'
description: 'A step-by-step guide to installing and configuring WeTTY to securely access a remote Linux terminal directly from a web browser via SSH.'
keywords: 'WeTTY, web ssh, browser terminal, linux remote access, ssh over web'
---


## 前言

WeTTY 是一套 **Web-based Terminal（網頁終端機）** 工具，可以讓使用者只透過瀏覽器，就連線並操作遠端 Linux 主機的終端機（Terminal）。換句話說，WeTTY 的核心價值在於：**把原本需要用 SSH 操作的終端機，搬到瀏覽器上。**


### WeTTY 的主要功能

WeTTY 提供的功能相當單純但實用：

* 透過 **瀏覽器** 存取遠端 Linux 的 terminal
* 支援 **SSH 連線**
* 即時顯示終端機輸出（stdout / stderr）
* 不需在用戶端安裝任何額外軟體（只要瀏覽器）
* 可透過 **Docker 快速部署**（也能使用 npm 安裝啟用）

使用者的操作體驗基本上等同於：

```bash
ssh user@remote-host
```

只是把「終端機視窗」換成「Web 畫面」。

### WeTTY 的兩種使用情境整理
在一台 Linux 伺服器上部署多個 Docker container 時，若希望透過 **WeTTY（Web Terminal）** 讓使用者以瀏覽器方式進入終端機，常見會有以下兩種做法：

![Screenshot 2026-02-07 at 11.06.24 PM](https://hackmd.io/_uploads/BkReBANvZl.png)

#### 用法一：Host 主機安裝 WeTTY（統一入口）

此做法是在 **Host 主機上安裝並啟動 WeTTY**，作為單一的 Web Terminal 入口。
使用者登入後，實際上是先進入 **Host 的 Shell**，再透過：

```bash
docker exec -it <container_name_or_id> /bin/bash
```

進入指定的 Docker container。

這種方式的優點是架構單純、集中管理，但缺點是 **使用者必須持有 Host 主機的帳號權限**，在多客戶或對外服務場景下，安全性與權限控管較為敏感。


#### 用法二：每個 Docker Container 一個 WeTTY（容器級入口）

此做法是在 **每個 Docker container 內部各自部署 WeTTY**，WeTTY 透過 SSH 連回「該容器自己」，形成獨立的 Web Terminal 入口。

使用者只會看到並操作該 container 的環境：

* 無法接觸 Host 主機
* 無法看到其他 container
* 權限與責任邊界清楚

這種方式特別適合 **多客戶、Sandbox、Demo、測試環境** 等場景。


### 兩種 WeTTY 用法比較表

| 項目               | 用法一：Host 安裝 WeTTY（統一入口） | 用法二：每個 Container 一個 WeTTY |
| ---------------- | ----------------------- | ------------------------- |
| WeTTY 部署位置       | Host 主機                 | 各個 Docker Container       |
| 使用者實際登入位置        | Host Shell              | Container Shell           |
| 進入 Container 的方式 | `docker exec -it`       | SSH 回連容器自身                |
| 是否需要 Host 帳密     | 需要                    | 不需要                     |
| Container 之間隔離性  | 低（可切換 container）      | 高（完全隔離）                 |
| 安全性              | 中（需嚴格控管 Host 權限）        | 高（最小權限原則）                 |
| 管理方式             | 集中式                     | 分散式                       |
| 適合情境             | 內部維運、DevOps 管理          | 客戶環境、Demo、Sandbox、多租戶     |



## 1. 環境與前置條件

### 1.1 主機環境

* 作業系統：Linux
* 已安裝 Docker
* 主機 IP（範例）：`123.456.789.000`

### 1.2 已知可正常登入的 SSH 指令

```bash
ssh -p 22 user@123.456.789.000
```

代表：

| 項目       | 值               |
| -------- | --------------- |
| SSH Host | 123.456.789.000 |
| SSH Port | 22              |
| SSH User | user            |

⚠️ **WeTTY 的設定必須與此 SSH 指令完全一致**
否則 Web Terminal 將無法成功連線。

## 2. WeTTY 架構簡介

```
Browser
   │
   │ HTTP / WebSocket (3000)
   ▼
WeTTY (Docker Container)
   │
   │ SSH (port 22)
   ▼
Remote Linux Host
```

說明：

* 瀏覽器只會連線到 WeTTY（HTTP / WebSocket）
* SSH 連線實際是由 **Docker 容器內的 SSH client** 發起
* WeTTY 本身僅負責「轉接與顯示」
* 實際登入驗證仍由遠端 Linux Host 處理

## 3. 使用 docker run 啟動 WeTTY（快速部署）

### 3.1 啟動指令

請在 **123.456.789.000 這台主機上** 執行：

```bash
sudo docker run -d --name wetty \
  -p 3000:3000 \
  wettyoss/wetty \
  --ssh-host=123.456.789.000 \
  --ssh-port=22 \
  --ssh-user=user
```

---

### 3.2 參數說明

| 參數              | 說明                |
| --------------- | ----------------- |
| `-p 3000:3000`  | 對外開啟 Web 服務（3000） |
| `--ssh-host`    | SSH 目標主機          |
| `--ssh-port=22` | SSH 服務埠（預設 22）    |
| `--ssh-user`    | 預設登入使用者           |

---

## 4. 從其他電腦使用瀏覽器登入

在 **任一台可連到該主機的電腦**，開啟瀏覽器並輸入：

```
http://123.456.789.000:3000/wetty
```

畫面會顯示類似：

```
<hostname> login:
```

---

### 4.1 登入方式

請輸入：

* 使用者名稱：`user`
* 密碼：與你平常執行
  `ssh user@123.456.789.000`
  時相同的密碼

⚠️ **密碼輸入時不會顯示任何字元（連 `*` 都沒有）是正常行為**

---

## 5. 為什麼 WeTTY 一定要指定 SSH 參數？

WeTTY 在啟動時，會將以下參數固定成內部設定：

| WeTTY 參數     | 對應 SSH 行為         |
| ------------ | ----------------- |
| `--ssh-host` | `ssh <host>`      |
| `--ssh-user` | `ssh user@<host>` |
| `--ssh-port` | `ssh -p <port>`   |

若未指定 `--ssh-port`：

* WeTTY 會預設使用 **port 22**

在本教學情境中：

* SSH 剛好就是 22
* 即使不寫也能連線
* **但為了設定清楚與後續維運，建議明確指定**


## 6. 連線檢查與常見問題

### 6.1 確認容器是否正在執行

```bash
docker ps
```


### 6.2 確認 3000 Port 是否監聽

```bash
ss -ltnp | grep 3000
```


## 7. 停止與移除 WeTTY

標準停止與清除方式：

```bash
sudo docker stop wetty
sudo docker rm wetty
```

