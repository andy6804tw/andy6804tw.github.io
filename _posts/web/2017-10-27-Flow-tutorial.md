---
layout: post
title: 淺談 Flow 與實作
categories: Web
description: Flow可以在程式碼運行前對類型錯誤進行檢查
keywords: Node.js, ESLint, Airbnb
---

## 何謂 Flow 
- Flow可以在程式碼運行前對類型錯誤進行檢查，包括：
  - 類型錯誤
  - 對null 的引用
  - 以及可怕的 “undefined is not a function” flow允許我們給變量添加類型
    - boolean、number、string、null、void

<img src="http://www.theodo.fr/uploads/blog//2016/11/flow-og-image.png" width="440">

## 事前準備
- Visual Studio Code
- 安裝 Node.js

需要準備的工具有 [Visual Studio Code](https://code.visualstudio.com/) 當然你也可以用你熟悉的開發環境例如 ： [Sublime](https://www.sublimetext.com/) 

## 教學
##### 1. 修改VS Code設定檔

由於VS Code本身就帶有JavaScript與TypeScript檢查的功能，會與Flow相衝到所以我們要關閉VS Code的檢查功能，在使用者設定中(喜好設定->設定)，加上下面這行設定值以免衝突
```js
"javascript.validate.enable": false
```
<img src='https://github.com/andy6804tw/Flow_tutorial/blob/master/ScreenShot/img01.png?raw=true'>
##### 2. 安裝Flow

```
$ npm install --save-dev flow-bin  
  或
$ npm install --global flow-bin
```
##### 3. 初始化專案將會建立一個.flowconfig檔案
```
$ flow init
```
##### 4. 在程式碼檔案中加入要作類型檢查的註解
```
// @flow
   或
/* @flow */
```
##### 5. 若您的編譯環境無安裝Flow外掛套件可輸入以下命令進行檢查
```
$ flow check
```
##### 6. 轉換(編譯)有Flow標記的程式碼

在開發的最後階段要將原本有使用Flow標記，或是有類型註釋的程式碼，進行清除或轉換。
使用babel編輯器如果以命令列工具為主，可以使用下面的指令來安裝在全域中:
```
$ npm install -g babel-cli
```
##### 7. 加裝額外移除Flow標記的npm套件在你的專案中
```
$ npm install --save-dev babel-plugin-transform-flow-strip-types
```
##### 8. 建立一個 .babelrc 的設定檔，內容如下
```js
{
  "plugins": [
    "transform-flow-strip-types"
  ]
}
```

##### 9. 打包輸出移除Flow標記

完成設定後，之後babel在編譯時就會一併轉換Flow標記。下面的指令是把src目錄的檔案編譯到dist目錄中
```
$ babel src -d dist
```
筆者開發環境是使用VScode記得安裝 Flow Language Support的擴充套件才會即時顯示錯誤哦

<img src="/images/posts/web/img1061027-1.png">

最後附上程式碼 clone 下來 再npn i 安裝 package 就可以執行囉！喜歡的話按顆星星吧～ [Source Code](https://github.com/andy6804tw/Flow_tutorial)
