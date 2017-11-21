---
layout: post
title: '[JS學習筆記] JavaScript基礎篇(3)'
categories: '2018IT邦鐵人賽'
description: '陣列物件介紹'
keywords: JavaScript, ES6
---

## 陣列 Array
這篇文章要來介紹容器，首先先來談談陣列，陣列是有順序地存放大量資料的結構，大多數程式語言都是 0 為起始點，例如 `arr[0]` ， JavaScript 也不例外，當然 JavaScript 的陣列也內建很多函式可以直接呼叫例如 length、match...等。

### 陣列的使用
陣列的初始化有兩種方式一種是立即給值，另一種是後續給值。

- 立即給值

```js
const arr = [1, 2, 3]
console.log(arr.length) // 3
```

- 後續給值

```js
const arr = []
arr[0] = 1
arr[1] = 2
arr[2] = 3
console.log(arr.length) // 3
```

### 展開(spread)運算子

展開運算值是 ES6 的一個新的特性，可以使用 `...` 代表陣列，以下用函式來做示範，當不知道引數有多少時可以很方便使用。

```js
const call = (...arr) => {
  console.log(arr); // [ 1, 2, 3 ]
};
call(1, 2, 3); 
```

## 物件 Object
物件是現今儲存資料最常見的一種型態，主要是以一個鍵 (key) 搭配一個值 (value) ，如下範例。

```js
const dog = {
      name: 'Tom',
      breed: 'Golden Retriever',
      weight: 60
    }
```

### 如何存取物件內的值

有兩種方法分別如下，第一種是利用 `物件名稱.key` 拿取值，第二種方法是利用陣列回傳方式 `物件名稱[key]` 取得相對應內容。

```js
console.log(dog.breed) // Golden Retriever
console.log(dog[breed]) // Golden Retriever
```

## 物件使用 forEach 方法
這邊介紹陣列的 forEach 方法，雖然 for...in 也是可以，但  ESLint 並不推薦你這樣做，所以就不再今天討論範圍囉！

```js
const dog = {
      name: 'Tom',
      breed: 'Golden Retriever',
      weight: 60
    };
    Object.keys(dog).forEach((key) => {
      console.log(dog[key]);
    });

  輸出：
        // Tom
        // Golden Retriever
        // 60
```

### 物件夾帶方法
是的沒錯在物件中不僅僅只儲存值方法也行，就把它想成一個 function 存在一個變數中就對了使用方法延伸上面的例子如下。

```js
const dog = {
      name: 'Tom',
      breed: 'Golden Retriever',
      weight: 60,
      breaks() {
        console.log('woof'); 
      }
    };
dog.breaks(); // woof
``` 
