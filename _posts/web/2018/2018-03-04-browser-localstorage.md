---
layout: post
title: 'localStorage 基本使用方法'
categories: 'Web'
description: 
keywords:
---

## 前言
Web Storage 為 HTML5 標準中新加入的技術，主要分兩種一個是 sessionStorage，另一個是 localStorage，兩者差別就差在生命周期的不同而已，而早期瀏覽器要儲存暫存的資料會使用 cookie，而不管你使用哪個暫存你網頁的資料都要注意該筆資料是否敏感數據，因為只要打開控制台，你就隨意修改它們的值，而有心人士就可以利用此方式來做 XSS 攻擊，那今天我們就來談談如何使用 localStorage 吧！

## 基本使用方法
從 [MDN官方](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 可以查到此方法的文件，今天就照著上面說明簡單示範給各位看。


### 讀取 Storage
取得 localStorage 內的內容，我的習慣是會在 data 容器中存入多筆 JSON 物件。

```js
localStorage.getItem();
```

### 更新 Storage
這裡的更新就等於新增，每次呼叫就等於將資料暫存的內容重新刷新一次。

```js
localStorage.setItem();
```

### 刪除 Storage
將整個暫存刪掉。

```js
localStorage.removeItem();
```

## 實作練習
首先我們先宣告一個容器 data 為陣列裡面可以存在很多個物件，我們就以 todolist 作為示範，todo 代表儲存多筆待辦事項資料，一開始先用問號運算子來判斷瀏覽器是否存在 `todoList` 若無我們就初始化並新增一個 todo 容器，反之若有則使用 `getItem()` 方法將值從瀏覽器中撈出來。

```js
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: []
};
```

### 將資料存入 Storage

```js
data.todo.push('task 1');
localStorage.setItem('todoList', JSON.stringify(data));
```

<img src="/images/posts/web/2018/img1070304-1.png">

你可以試者把圖中第四行註解起來，可以發現資料成功地被存在瀏覽器了，此外可以試著繼續新增多筆資料。

## 刪除其中一筆資料
接下來我們要來刪除其中一筆資料，使用 `splice` 方法去除物件中某筆位置的資料，取出某筆資料的位置就使用 `indexOf()` 方法。

```js
data.todo.splice(data.todo.indexOf('task 3'), 1);
```

<img src="/images/posts/web/2018/img1070304-2.png">

## 刪除整個 Storage
若想將整個 Storage 從瀏覽器刪除可以使用 `removeItem()` 方法，或是直接手動清除瀏覽器中的 cache。 

```js
localStorage.removeItem("todoList");
```
