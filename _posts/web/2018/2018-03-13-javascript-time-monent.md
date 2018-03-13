---
layout: post
title: 'Moment.js 取得現在時間'
categories: 'Web'
description: 
keywords:
---

## 前言
雖然原生 JavaScript 就有提供 Date() 的時間函式，但難免會有需要客製化的時間格式或是時區轉換的需求，`Moment.js` 的函式庫強大正可以符合我們的需求，今天就來介紹如何利用它來取得時間。

## 安裝 Moment.js
使用 NPM 安裝 `Moment.js` 套件。

```bash
npm install --save moment
```

## 使用
首先引入 `moment` 的函式庫，其中可以使用 `format()` 方法來依照你的需求來指定時間的格式，更多詳細用法可以參考[官方文件](https://momentjs.com/)。


```js
const moment = require('moment');

// 取得時間
const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
console.log(currentDateTime);
```
