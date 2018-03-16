---
layout: post
title: '[Node.js] mocha 單元測試並整合 Travis-CI'
categories: 'Web'
description: 
keywords:
---

## 前言
[Travis CI](https://travis-ci.org/)是提供 GitHub 專案持續整合的服務平台，且支援各種程式語言，間單來說使用 Travis CI 之後只要更新(Push)專案到 GitHub 就會自動進行測試，本篇教學就以 Node.js 下去做示範教學。

## 教學
通常 Travis CI 都搭配 mocha 做單元測試，本篇主要是教你如何部署 Travis CI 與 GitHub 連動，還沒寫好單元測試的朋友請先來看這篇教學哦！

### 與 GitHub 連動
首先進入[Travis CI](https://travis-ci.org/)並使用 GitHub 帳號連動，登入成功後找到你要做 CI 測試的專案按鈕點擊綠色代表連動。

<img src="/images/posts/web/2018/img1070316-1.png">

### 新增 `.travis.yml` 檔案
這隻檔案就是要讓 Travis CI 知道你的專案語言以及要被測試的版本。

```yml
language: node_js
node_js:
    - "9"
    - "8"
    - "7"
    - "6"
```

### 修改 `package.json`
在 `scripts` 中新增 `test` 的腳本並觸發 `mocha`，完成後就可以更新發布(Push) 專案到你的 GitHub 上囉！

```json
{
  "name": "mocha_chai_tutorial",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "mocha || true",
    "start": "nodemon app.js"
  },
  "dependencies": {
    "chai": "^4.1.2",
    "express": "^4.16.2",
    "mocha": "^5.0.4",
    "supertest": "^3.0.0"
  }
}
```

## 測試
將專案發佈到 GitHub 上

```bash
git push
```

發布完成後到 [Travis CI](https://travis-ci.org/) 就可以看檔你的專案自動跑測試了，測試完成後一片綠色打勾就代表無任何問題 `build/passing` 。

<img src="/images/posts/web/2018/img1070316-2.png">

此外最上有有個小圖點擊下去可以複製圖片的網址，你可以將它放到你的 README.md 檔案中，讓大家知道你的程式碼測試後是沒問題的。

[![Build Status](https://travis-ci.org/andy6804tw/Mocha-Chai-tutorial.svg?branch=master)](https://travis-ci.org/andy6804tw/Mocha-Chai-tutorial)
