---
layout: post
title: 'Python webcam 實作 TCP socket 串流服務'
categories: 'Python'
description: 'Python OpenCV webcam sending frames through TCP socket'
keywords: 
---

## 前言
最近在實作 YOLOv4 專案，礙於硬體限制我們只能依靠雲端 GPU 來進行運算。因此要進行 Realtime Demo 會受到一些限制。例如要如何將本機的網路攝影機影像傳送到雲端伺服器上面進行辨識呢？本篇文章就透過 TCP Socket 建立一個連線機制，在本機設定一個 Client(客服端) 連線到伺服端(Server)，並同時將每個 Frame 傳送出去。最終伺服端接收到本機的影像並進行辨識，並將結果直接呈現在伺服器上面的 Jupyter Notebook 上。

## 什麼是 Socket？
- 兩個互相溝通的程序之間的任一端點
- 作為發送和接收的端點
- 是一種協議類型，由IP位置和端口號組合，用於數據交換

## client-server model
首先伺服端必須先建立一個 TCP Socket，接著客戶端必須要知道伺服端的 IP 和 PORT 才能成功連線。

![](/images/posts/Python/2021/img1100403-1.png)

## 操作說明
首先先將範例程式下載下來至本機與伺服器端。

```
git clone https://github.com/1010code/python-webcam-socket-streaming.git
```

### 伺服端操作
在伺服端這裡我們必須先透過 Jupyter lab 執行 `server.ipynb`。程式中的 `HOST` 可以不用填，系統會自動預設 loacl 位置。如果您的伺服端電腦是有 GUI 介面的就可以直接執行 `server.py`。

執行結果如下，會看到我們的 Socket 已經在監聽 8485 PORT。

![](/images/posts/Python/2021/img1100403-2.png)

成功執行 server 後我們就能在本機端執行並傳送影像了。但是有些人可能會想問如果我的雲端 Hub 伺服器沒有實體 IP 怎麼辦？此時可以透過 [ngrok](hhttps://ngrok.com/product) 來實現。ngrok 做為一個轉發的伺服器，他可以把外界的請求轉發到你指定的 PORT。至於安裝可以參考[這篇](https://andy6804tw.github.io/2018/01/16/ngrok-intro/)。

安裝好後在伺服端開啟終端機輸入以下指令：

```
ngrok tcp 8485
```

![](/images/posts/Python/2021/img1100403-3.png)

### 本機端操作
回到自己的電腦上，開啟 `client.py`，將 HOST 與 PORT 更改上面所建立的 ngrok 提供的資訊。(如果伺服器本身有固定 IP 可省略此步驟，直接在 HOST 填入固定 IP 即可)

![](/images/posts/Python/2021/img1100403-4.png)

此外為了避免傳送過載，我們並不會將每秒 30 幀的畫面傳送出去，而是在第 33 行動了手腳。各位可以去調整判斷式中的數值，範例中我是設定 10。表示每秒若有 30 幀，我只傳送 3 個 Frame(3 fps)。

![](/images/posts/Python/2021/img1100403-5.png)

一切就緒後就可以執行 `client.py`

```
python client.py
```

## 結果

![](https://github.com/1010code/python-webcam-socket-streaming/raw/main/screenshot/demo-3.gif)

完整 Code 可以從我的 [GitHub](https://github.com/1010code/python-webcam-socket-streaming) 中取得！