---
layout: post
title: '[React從零開始] 輕鬆使用 Create React app'
categories: 'React'
description: 'Create React app 使用介紹'
keywords: React.js
---

# Create React app
Create React app 是由 Facebook 自己所開源的 start kit 在 [GitHub](https://github.com/facebookincubator/create-react-app) 上可以下載下來使用，初學習 React 建議從這包工具開始下手，裡面是由官方和一些 React 的社群共同維護的專案包。

## 下載使用
在 clone 之前先確保你的電腦已安裝或更新 Node.js，下載完成後安裝 create-react-app 的全域變數。

#### 1. 安裝全域變數

```bash
  yarn global add create-react-app
  ```

#### 2. 初始化專案

```bbash
create-raect-app [專案名稱]
cd [專案名稱]
```

#### 3. 測試執行

開啟你熟悉的編譯器執行程式碼

```bash
yarn start
```

執行後你會發現它會自動幫你逮開瀏覽器並監聽 3000 port，此檔案會持續監聽當你有資料更改時會自動重新 reload 是不是很方便。

<img src="/images/posts/react/img1061213-1.png">

<img src="/images/posts/react/img1061213-2.png">

## Understanding the Folder Structure

```bash
┌── node_modules
├── public
│   ├── favicon.ico  // 網頁 icon
│   ├── index.html 
│   └── manifest.json // 網頁相關設定
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── registerServiceWorker.js
├── .gitignore
├── package.json // 管理整包來源的檔案
├── README.md
└── yarn.lock
```
