---
layout: post
title: '[Node.js打造API] Google Cloud Platform(2)-建立專案與VM部署'
categories: '2018iT邦鐵人賽'
description: 'forever運行'
keywords: api
---

## 本文你將會學到
- 新增專案
- 建置一個 Node.js 環境的虛擬機
- 預約靜態外部IP位址
- 新增防火牆規則
- 在 VM 上測試執行 Node.js

## 前言
這一篇文章要來教你如何新增一個專案且部屬一個 Node.js 的 Virtual Machine (以下簡稱VM為虛擬機)，由於目前尚未建立 SQL 雲端資料庫所以目前實作的部落格 API 還不能馬上測試，因此在這章節最後會用之前的簡單範例來執行測試虛擬機是否能正常運作。

## 新增專案
申請成功後會自動導向到 GCP 的主控頁面，或是由以下[網址](https://console.cloud.google.com)進入控制台，接下來點選上方新增專案，建立成功後會進入該專案的主控台，可以一覽所有服務資訊。

<img src="/images/posts/it2018/img1070112-1.png" width="600">
<img src="/images/posts/it2018/img1070112-2.png">

## 新增虛擬環境 (Virtual Machine)
左邊工具列進入 `Cloud Launcher` 後在上方搜尋列輸入 `node.js` 就會看到 `Node.js Certified by Bitnami` 點入後並選擇在 COMPUTE ENGINE 上啟動。

<img src="/images/posts/it2018/img1070112-3.png">
<img src="/images/posts/it2018/img1070112-4.png">

進入後會要你先設定的虛擬機環境，主機位址我選擇離我們最近的 `asia-east1-a` 當然想省錢可以選擇其他地區，機器種類就選擇預設微型的就夠用了，硬碟可以選擇 HDD 或 SSD 想省錢的可以選擇前者，設定完成後按下部署，Google 自己就會幫你建置一個具有 Node.js 的環境，作業系統是使用他們提供的 Debian Linux。

<img src="/images/posts/it2018/img1070112-5.png">
<img src="/images/posts/it2018/img1070112-6.png">

## 預約靜態IP位址 
在左邊的選單目錄中點選 `網路 > VPC網路 > 外部IP位址` ，進入後你會發現列表有一個預設的臨時 IP 位址這就是剛剛所部署 VM 成功後所給予的，使用臨時 IP 有個缺點就是，它會過段時間就失效並且要重新上來後台取得新的 IP 位址，若不想這麼麻煩可以按照以下步驟來新增一個靜態的 IP 位址。

##### 1. 預約靜態位址
類型的臨時點下去選擇靜態，並馬上跳出預約視窗，資料填寫完畢後點選預約即可立馬生效。

<img src="/images/posts/it2018/img1070112-7.png">

## 執行VM個體
在左邊的選單目錄中點選 `Compute Engine > VM執行個體`，進入後即可看到我們所建立的虛擬環境，上面的外部 IP 位址也設定成靜態了，準備就緒就可以點選連線 `在瀏覽器視窗中開啟`。

<img src="/images/posts/it2018/img1070112-8.png">

##### 1. clone 專案至 VM

開啟虛擬機後會跑出一個終端機的畫面，沒錯這就是我們的執行環境，因為沒有 GUI 介面所以全都必須仰賴 Linux 指令，首先將專案 `git clone` 下來，之後進入該專案資料夾，進入後再輸入 `npm install` 把node_modules下載回來，基本上就是這三步驟將 GitHub 上的專案移下載至 VM 中。

```bash
#把專案下載到VM
git clone https://github.com/andy6804tw/RESTful_API_start_kit.git
#進入專案資料夾
cd RESTful_API_start_kit
#把node_modules下載回來
npm install
```

<img src="/images/posts/it2018/img1070112-9.png">

##### 2. 執行測試

這邊要來執行這篇文章的範例 [[Node.js打造API] 使用Express建立路由](https://andy6804tw.github.io/2017/12/26/express-mvc-tutorial/)，先使用 npm 安裝 webpack 與 nodemon 的全域 `sudo npm install webpack nodemon -g` 記得要使用管理者權限安裝(sudo = superuser do)，安裝完後，進入我們要測試的分支 `git checkout 'Part3-Express'`，進入後執行 `webbpack` 將程式碼轉利用 babel 轉譯成 ES5 語法，最後輸入 `npm run start` 來執行程式囉。


```bash
#進入Part3-Express分支
git checkout 'Part3-Express'
#安裝webpack與nodemon的全域
sudo npm install webpack nodemon -g
# 
webpack
#執行程式碼
npm run start
```

<img src="/images/posts/it2018/img1070112-10.png">

在瀏覽器輸入(外部IP位址:3000/api) `例如：http://104.199.199.103:3000/api`，最後你會發現根本沒反應！原來我們還沒設定允許的連接防火牆，主要原因是還沒設定允許的防火牆連接阜，如下圖紅色圈起部分要新增一個 tcp:3000 的標籤。

<img src="/images/posts/it2018/img1070112-11.png">
