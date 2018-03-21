---
layout: post
title: '[Node.js] 計算程式覆蓋率並整合到 coveralls'
categories: 'Web'
description: 
keywords:
---

## 前言

上一篇 [[Node.js] 使用 istanbuljs/ync 計算程式覆蓋率](https://andy6804tw.github.io/2018/03/16/2018-03-21-coveralls-tutorial/)) 教各位如何在專案中計算程式覆蓋率，接著這篇我們要來實作程式覆蓋率(coverage)並且透過 [coveralls](https://coveralls.io/) 來做覆蓋率整合同時呈現在 GitHub 專案中的 README.md 文件中。


## 安裝 coveralls
coveralls.io 是一個將覆蓋率報告添加到您的GitHub項目的好工具。
使用 NPM 安裝 coveralls 套件。

```bash
npm install coveralls  --save-dev
```

## 修改 package.js
打開 `package.js` 檔案並修改 script 添加 `coverage` 指令如下：

```json
"scripts": {
    "test": "nyc mocha --timeout 1000 ",
    "coverage": "nyc report --reporter=text-lcov | coveralls"
  }
```

## 建立 `.coveralls.yml` 檔案

```
repo_token: ihfn7RyWguxfwMaXHwSemoaY9tG5ZS8Of
```

## 修改 `.travis.yml` 檔案

```yml
language: node_js
node_js:
    - "9"
    - "8"
    - "7"
    - "6"
after_success: npm run coverage
```
