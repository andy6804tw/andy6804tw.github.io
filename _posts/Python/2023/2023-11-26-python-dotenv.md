---
layout: post
title: 'Python 透過dotenv 載入環境變數'
categories: 'Python'
description: 'python dotenv environment variable'
keywords: 
---

## 前言
在 Python 開發中，經常需要使用環境變數來配置應用程式的行為。而 python-dotenv 是一個簡單而強大的工具，它使得管理和載入這些環境變數變得更加輕鬆。在本文中我們將了解如何使用 python-dotenv，將環境變數的管理變得更加簡單而清晰。無論是在本地開發環境還是部署到伺服器上，python-dotenv 都能確保你的應用程式在各種情境下順暢運行。

## python-dotenv
python-dotenv 允許我們使用一個名為 `.env` 的文件，將所有的環境變數集中在一處。這樣我們就可以在不同的環境中輕鬆切換，而不必修改程式碼。這對於開發、測試和部署的流程是極為方便。首先輸入以下指令安裝套件：

```sh
pip install python-dotenv
```

#### 1. 在你的專案根目錄創建一個 .env 檔案，並在其中設定你的環境變數，例如：

```
VERSION = 1.0.0
```

#### 2. 在你的 Python 程式的開頭加入以下程式：

```py
from dotenv import load_dotenv

# 載入 .env 文件中的變數
load_dotenv()
```

### 3. 現在你可以使用 os.environ.get() 來讀取這些環境變數：

```py
import os

# 讀取 VERSION 環境變數
version = os.environ.get('VERSION')

# 輸出讀取到的值
print(f"VERSION value: {version}")
```

最後執行 python xxx.py 該變數自動會根據環境變數檔的設定透過 dotenv 讀取數值。

## 後記
如果有使用 docker 部署 python 相關的應用的話，可以透過 `docker-compose.yml` 中的 environment 設定環境變數。無論是指定敏感的 API 金鑰、設定執行模式，還是定義應用程式行為的其他參數，`docker-compose.yml` 的 environment 設定為我們提供了一個方便、統一的管理方式。

```yml
version: '3.0'
services:
    myapp:
        build: .
        image: myapp-dockercompose
        container_name: myapp-compose-container
        ports:
          - 8001:8001
        volumes:
          - /etc/ssl:/etc/ssl
        environment:
          - VERSION = 1.0.0
```

接著

```py
import os

# 讀取 VERSION 環境變數
version = os.environ.get('VERSION')

# 輸出讀取到的值
print(f"VERSION value: {version}")
```