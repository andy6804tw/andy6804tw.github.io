---
layout: post
title: '[Node.js] 計算程式覆蓋率並使用 Bitbucket 整合到 codecov'
categories: 'DevOps'
description: 
keywords:
---

## 前言
上一篇[[Node.js] 使用 Bitbucket 與 CircleCI 做多版本單元測試]()教你如何利用 Bitbucket 建立 CircleCI 自動化測試環境，測試完之後我們可以來計算程式覆蓋率(code coverage)，然而計算覆蓋率的平台有很多第一個為 coveralls 之前有篇[教學](https://andy6804tw.github.io/2018/03/24/coveralls-tutorial/)教你如何將它整合至 GitHub，今天我們改使用 codecov 這個計算覆蓋率報告的平台吧。

## 教學
[codecov](https://codecov.io/bb) 是一個將覆蓋率報告添加到您的 GitHub 的好工具，首先各位請先自行註冊並連動 Bitbucket，進入後你可以選擇要連動的專案。

### 安裝 codecov
使用 NPM 安裝 [codecov](https://codecov.io/) 套件。

```bash
npm install codecov  --save-dev
```

### 修改 `config.yml` 檔案
開啟 `.circleci` 檔案並加入下面指令，詳細的設定可看[此篇](https://andy6804tw.github.io/2018/03/28/bitbucket-circleci/)教學。

```yml
- run:
    name: Code Coverage
    command: yarn report-coverage
```

<img src="/images/posts/devops/2018/img1070329-1.png">


### 修改 package.js
打開 `package.js` 檔案並修改 script 添加 `report-coverage` 指令如下：

```json
"scripts": {
    "test": "nyc mocha --timeout 1000 ",
    "start": "nodemon app.js",
    "report-coverage": "nyc report --reporter=text-lcov > coverage.lcov && codecov -t 你的repository-token"
  }
```

這裡直得注意的是指令後面要放上你在 CircleCI 上所得到的專案你的 repository-token

<img src="/images/posts/devops/2018/img1070329-2.png">


範例程式碼：https://bitbucket.org/ab24627375/circle-ci-demo/src
