---
layout: post
title: '[JS學習筆記] JavaScript基礎篇(1)'
categories: '2018IT邦鐵人賽'
description: 變數與常數、資料類型
keywords: JavaScript, ES6
---

## 變數與常數
JavaScript 在變數方面處理很特別，由於作者之前是學 C 與 Java 語言出生的，剛踏入 JavaScript 時發現變數命名竟然用 var 就可以了!? 相對的 python 也是如此，這就是所謂的動態型別的語言 (Dynamically Typed Language)。此外相信各位讀者在使用 JavaScript 時常發現一個問題就是 undefined ，這個夢魘相性各位也有經歷過，因為變數位置放置不對或是已經被重複命名當下都不了解，只能可憐的半夜抓蟲就為了變數這可惡的傢伙。然而 let 和 const 都是 ES6新版本所規範出來的，在這之前變數定義只能使用 var 。

let 和 const 都是為了彌補 var 的一些缺陷而新設計出來的，那他們到底有什麼差別呢？在官方文件和 Airbnb 的語法規範中都會建議你不要使用 var 來做宣告改請改用 let 或 const ，說了這麼多以下就開始介紹兩著的使用時機與差別。

#### 1. 宣告 let 
  - 使用 let 聲明的變量，其作用域為該語句所在的代碼塊內，使用時機例如: 陳述句(if、else)、迴圈(for)

```js
for (let i = 0; i < 10; i += 1) {
  console.log(`loop is run ${i} times`);
}
console.log(i); // ReferenceError: i is not defined
```

<img src="/images/posts/it2018/img1061217-1.png">

這邊來解釋上述的程式由於迴圈內的變數只有區域特性，跑出迴圈後就不會再使用到它了，所以這邊就只用 let 做變數宣告就行了，所以迴圈結束後再呼叫 i 會出現 i is not defined 的錯誤，此外 Airbnb 也建議別使用 i++ 雖然我也不解，聽說是效率上問題？最後 ES6 有多行字串功能眼細的讀者可以發現我是使用 \` 裡面可以直接使用 `${}` 來包入變數，以前的話還要用 + 相當麻煩。

#### 2. 宣告 const

  - 使用 const 聲明的是常量，在後面出現的代碼中不能再修改該常量的值。使用時機例如:不會變動的值

```js
const mName = 'Andy Tsai';
mName = 'Tsai Andy'; // TypeError: Assignment to constant variable.
console.log(mName);
```
<img src="/images/posts/it2018/img1061217-2.png">

由於我是宣告 const 常數故 mName 變數初始化後並不能再給值變動內容，所以第二行就會出現 `TypeError` 的錯誤。

## 資料型態

JavaScript分為很多種資料型態：
- 布林(Boolean)
- 數值(Number)
- 字串(String)
- 陣列(Array)
- 物件(Object)
- 空值(null)
- 未定義(undefined)
- 函式(Function)
- 符號(Symbol)


