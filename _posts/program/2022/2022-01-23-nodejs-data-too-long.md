---
layout: post
title: '[MySQL 報錯] Data too long for column 與 request entity too large'
categories: 'Program'
description: 'MySQL報錯：Data too long for column 與 request entity too large'
keywords:
---

## 前言
當進行 `Node.js` 搭建 API 並與資料庫串接的時候。出現以下錯誤訊息：

```
1406 - Data too long for column 'XXXX' at row 1
```

```
PayloadTooLargeError: request entity too large
```

其原因是前端送的訊息太大導致後端 `Node.js` 接收被拒絕。其解決的方法就是要調大解析訊息的限制。

## 解決方法
首先我們先了解資料庫寫入資料的限制。第一個發現 MySQL 1406 的錯誤訊息是資料庫設定的欄位限制寫入的訊息。通常我們都會使用 TEXT 的格式，但是他並非無限制長度。各位可以參考下面的 Type 與相對應的儲存上限：

- TINYTEXT	    256 bytes	 
- TEXT	        65,535 bytes	    約64kb
- MEDIUMTEXT	    16,777,215 bytes	    約16MB
- LONGTEXT	    4,294,967,295 bytes	    約4GB

調大資料庫欄位後再試一次，將資料透過 POST 寫入資料庫。若又發現在 `Node.js` 端顯示 `request entity too large`。這個問題就是一開始所提到的後端預設可以接收的訊息量大小太小了。如果是採用 Express 框架的可以加入以下程式碼，同時在大括號內添加 `limit` 並設定適當的上限大小。第一行程式是限制 JSON 訊息的大小，第二行程式是當你是透過 `x-www-form-urlencoded` 傳送資料時將設定他的可接收訊息的限制。

```js
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ limit: '15kb', extended: true }));
```
## Reference
https://stackoverflow.com/questions/19917401/error-request-entity-too-large