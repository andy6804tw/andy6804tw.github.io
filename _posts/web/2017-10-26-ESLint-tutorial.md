---
layout: post
title: 淺入淺出 ESLint 與實作
categories: Web
description: some word here
keywords: Node.js, ESLint, Airbnb
---

## 何謂 ESLint ?
 ESLint支援ES6與JSX語法，具高度設定彈性與擴充性的檢查語法工具，可提供程式開發者在語法上的錯誤警告，此篇教學我所使用的是Airbnb的規範，簡單來說ESLint就是可以規範整個開發團隊中的coding style。

<img src="https://es6.io/images/eslint.png"> <img src="https://a0.muscache.com/airbnb/static/logos/belo-200x200-4d851c5b28f61931bf1df28dd15e60ef.png">

## 事前準備
- Visual Studio Code
- 安裝 Node.js

需要準備的工具有 [Visual Studio Code](https://code.visualstudio.com/) 當然你也可以用你熟悉的開發環境例如 ： [Sublime](https://www.sublimetext.com/) 

## 教學
1. 初始化node
```
$ npm init -y
```
這邊會產出一個package.json,這個檔案專門管理node的各種套件

2. 安裝eslint與babel-eslint 
```
$ npm install eslint babel-eslint --save-dev
```

3. 使用 eslint-airbnb-base
這邊可以參考至 [Airbnb](es6+的eslint-rules) 的GitHub
```
$ npm install eslint-config-airbnb-base eslint-plugin-import eslint --save-dev
```

4. 建立 .eslintrc 檔案並貼上下列程式
```js
{
  "parser": "babel-eslint", //parser: 指的是剖析器，如果你有用babel編譯器，就是設定"babel-eslint"
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "airbnb-base",
  "rules": {
    "semi": [2, "never"],
    "arrow-body-style": ["error", "always"],
    "comma-dangle": ["error", "never"], //該規則強制使用對象和數組文字中的逗號
    "no-console": 0 //關掉console.log()錯誤
  }
}
```
5. 接下來使用 Visual Studio Code 的看過來，請記得到擴充套件內下載SLint的擴充套件才會即時顯示錯誤哦

<img src="/images/posts/web/img1061026-1.png">

## 結果

最後你可以發現你的程式碼出現紅紅的底線囉！他代表你的程式碼不符合規範哦叫你馬上修正，你可以按下左邊燈泡點選 Fix all 它會一次幫你修正所有對問題，是不是很方便～此外最下面終端機中點選問題可以詳細知道所有的問題，例如要空白、結尾不能有分號、最後一行要換行......等，懶得看也沒關係，他只是提醒你某行程式碼寫這樣不符合規範，程式碼還是可以執行滴。

<img src="/images/posts/web/img1061026-2.png">
<img src="/images/posts/web/img1061026-3.png">


最後附上程式碼 clone 下來 再npn i 就可以執行囉！喜歡的話按顆星星吧～ [Source Code](https://github.com/andy6804tw/ESLint_tutorial)

裡面分別有兩隻js檔index.js是錯誤並且跳出警示的寫法，correct.js是依照規範修改後正確的寫法你可以相對照看看
