---
layout: post
title: '使用 Axios 進行 HTTP 請求'
categories: 'Web'
description: 'HTTP Request'
keywords: frontend
---

## 前言
網頁前端最常見遇到要透過 HTTP Request 撈取 API 的資料。本文將會介紹 axios 這個套件，並透過 async 非同步技巧且將 GET 到的資料儲存到全域變數。

## 載入套件
axios 是一個非常流行的 JavaScript 函式庫，前端網頁可以透過 CDN 方式載入。

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## GET 請求
axios 回傳的物件是 Promise，所以我們可以用 `.then` 和 `.catch` 去處理成功和失敗結果。我的習慣會將它包成一個函式稱 `getData()` 並透過建立一個 Promise 回傳(resolve)撈到的結果。最後在主程式中透過 async 方式等待這段函式(`getData()`)完成後在往下繼續執行。

```js
// 全域變數
let data = [];
// 透過 axios 撈取 API 資料
function getData() {
    return new Promise((resolve, reject) => {
        axios('https://api.toys/api/iso_3166-1').then(
            (response) => {
                // GET response
                const dataObject = response.data;
                resolve(Object.assign(dataObject));
            },
            (error) => {
                const message = error.response;
                //  erroe message.
                console.log(message);
                reject(message);
            }
        );
    });
}
// 非同步方式等待取得資料
(async () => {
    data = await getData();
    console.log(data);
    // 成功撈取資料以下繼續做其他事件...
})();
```

如果出現以下錯誤，就必須透過上面寫法才能解決。

```
Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules
```

## Reference
- [Save Async/Await response on a variable](https://localcoder.org/save-async-await-response-on-a-variable)