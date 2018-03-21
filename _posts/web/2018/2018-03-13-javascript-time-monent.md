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

### 取得目前時間

```js
const moment = require('moment');

// 取得時間
const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
console.log(currentDateTime);
```


### UTC 時間轉當地時間


```js
const moment = require('moment');
var localTime = moment.utc('2018-03-21 05:44:44').local().format('YYYY-MM-DD HH:mm:ss');
console.log(localTime)
```

## 時間格式

| 格式代碼 | 說明 |
| ------| ------ |
| M | 1~12月 |
| MM | 01~12月 |
| MMM | Jan到Dec |
| MMMM | 	January到December |
| Q | 四季1~4 |
| D | 日期1~31 |
| d | 0到6，0表示週日，6表示週六 |
| ddd | Sun到Sat |
| dddd | 從Sunday到Saturday |
| w | 如62：表示第62週 |
| YYYY | 	四位數字完整表示的年份 |
| YY | 兩位數字表示的年份 |
| A | 大寫的AM PM |
| a | 小寫的am pm |
| HH | 24小時制00到23 |
| H | 24小時制0到23 |
| hh | 12小時制00到12 |
| h | 12小時制0到12 |
| m | 分鐘數0到59 |
| mm | 分鐘數00到59 |
| s | 秒數1到59 |
| ss | 秒數01到59 |
| X | Unix時間戳計 |
