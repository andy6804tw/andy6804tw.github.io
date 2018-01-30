---
layout: post
title: 'Firebase Hosting 靜態網站部署'
categories: 'Web'
description: 
keywords: Firebase
---

## 前言
Firebase 這幾年來被  Google 收購後開始不斷成長，也不斷的開出新功能讓大家體驗，其中今天要來介紹的是 Firebase Hosting 靜態網站部署，雖然是免費的但還是有流量的限制一個月上載 1GB 下載 10GB，詳細付費資訊可以參考[官方](https://firebase.google.com/pricing/)。

## Firebase Hosting 介紹
Firebase Hosting 所提供的服務能夠將你本機所開發的靜態網頁發布到 Google 所代管的雲端主機中，此外它還提供一個很棒的 SSL 加密環境能夠放心的使用 https。

## 前置作業
使用 Firebase Hosting 的服務前需要安裝 Node.js 跟 npm 的環境，若還沒安裝的讀者可以參考[這篇](https://andy6804tw.github.io/2017/12/14/npm-tutorial/)教學。

##### 1.安裝 Firebase CLI
首先必須先下載 Firebase CLI Tools 到本機上，打開終端機並使用 npm 或 yarn 來安裝，安裝後就可以使用 firebase 指令了。

```bash
npm install -g firebase-tools
```

##### 2.登入 Firebase
這邊假設各位已經寫好一個靜態的網站名為 `index.html` 在根目錄當中，並且終端機的路徑位於該目錄資料夾中，接著初始化專案前要先做登入的動作，登入一開始會要求使用權限請輸入(y)來同意，接著就會跳出一個登入的瀏覽介面此時輸入你的 Google 帳號即可。

```bash
firebase login
```

##### 3.初始化專案
登入成功且確認身份後就可以為我們的專案做初始化的動作，首先他會問你要使用哪種功能這邊就選擇 Hosting，接著它會問你要加入在哪個專案中，若是首次使用可以在 Firebase 中新建一個專案或是選擇 create a new project，選擇完成後系統會在根目錄下自動生成 `firebase.json` 與 `.firebaserc` 設定檔。

<img src="/images/posts/web/2018/img1070129-1.png" width="600">
<img src="/images/posts/web/2018/img1070129-2.png" width="300">

```bash
firebase init
```

##### 4.設定 deploy 路徑
打開剛剛所自動生成的 `firebase.json` 輸入以下資訊：

```json
{
  "hosting": {
    "public": "",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

這支 JSON 檔是設定整個 deploy 上傳的路徑 public 為你要上傳的資料夾並且會自動偵測你的 index.html，由於 index.html 我是放在根目錄所以 public 為空。而 rewrites 設定是將你的所有網站內的路徑預先載入，不然單存進入該網址路徑下會有讀取不到的狀況發生。(ps.感謝Mars學長提供)

##### 5.發布網站
所有設定準備就緒後就可以開始上傳我們的網站囉！簡單的一條指令 Firebase 就會自動幫你 Deploy 到 Google 的 Firebase 遠端主機當中，每次更新修改後一樣輸入此指令依然會幫你覆蓋重新發布網站到遠端主機當中哦，此外你每次的發布紀錄 Firebase 都幫你記得清清楚楚而且還有復原的功能呢！

```bash
firebase deploy  
``` 

<img src="/images/posts/web/2018/img1070129-3.png">

發布完成後 Firebase 會自動產生網址連結，而且 Google 還很佛心得幫你用好了 HTTPS 安全性佳，此外還可以使用自己的網域更改 DNS 轉址的服務，這麼棒的服務不用真是可惜啊～下一篇就來教各位如何使用自己的網域綁定 DNS 吧。

<img src="/images/posts/web/2018/img1070129-4.png">
