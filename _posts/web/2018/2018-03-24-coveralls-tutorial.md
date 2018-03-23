---
layout: post
title: '[Node.js] 計算程式覆蓋率並整合到 coveralls'
categories: 'Web'
description: 
keywords:
---

## 前言
上一篇 [[Node.js] 使用 istanbuljs/ync 計算程式覆蓋率](https://andy6804tw.github.io/2018/03/16/2018-03-21-coveralls-tutorial/)) 教各位如何在專案中計算程式覆蓋率，接著這篇我們要來實作程式覆蓋率(coverage)並且透過 [coveralls](https://coveralls.io/) 來做覆蓋率整合同時呈現在 GitHub 專案中的 README.md 文件中。

## 教學
[coveralls.io](https://coveralls.io/) 是一個將覆蓋率報告添加到您的 GitHub 的好工具，今天就來教各位使用它。
### 安裝 coveralls

使用 NPM 安裝 coveralls 套件。

```bash
npm install coveralls  --save-dev
```

### 修改 package.js
打開 `package.js` 檔案並修改 script 添加 `coverage` 指令如下：

```json
"scripts": {
    "test": "nyc mocha --timeout 1000 ",
    "coverage": "nyc report --reporter=text-lcov | coveralls"
  }
```

### 建立 `.coveralls.yml` 檔案
為了要與 coveralls 連動必須要取得使用授權，所以新增 `.coveralls.yml` 檔複製網頁上所提供的 

```
repo_token: xxxxxxxxxxxxxxxxxxxxxxxxx
```

### 修改 `.travis.yml` 檔案
因為計算覆蓋率必須要先跑過一次單元測試所以我們必須與 Travis-CI 做配合，當 Travis-CI 做完單元測試後再啟動 `npm run coverage` 將結果傳送到 coveralls 平台中顯示覆蓋率結果，執行此指令會產生 `.nyc_output` 的資料夾。

```yml
language: node_js
node_js:
    - "9"
    - "8"
    - "7"
    - "6"
after_success: npm run coverage
```

最後將你的程式碼 push 到遠端 GitHub 就會自動跑 Travis-CI 測試並且會回傳覆蓋率到 coveralls 平台囉！

<img src="/images/posts/web/2018/img1070324-1.png">

範例程式碼：https://github.com/andy6804tw/Mocha-Chai-tutorial
