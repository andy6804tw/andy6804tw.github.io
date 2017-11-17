---
layout: post
title: '[JS學習筆記] JavaScript基礎篇(2)'
categories: '2018IT邦鐵人賽'
description: 控制流程、程式區塊、迴圈、箭頭涵式
keywords: JavaScript, ES6
---

## 控制流程
任何一種程式語言程式碼都是由上而下逐一執行的，此外有時候必須程式判斷依照不同的數值給予不同的路徑輸出，稱之為控制流程。

### 區塊(block)
ES6中新增了程式區塊是用大括號包起來的區域：
```js
{
  statement 1
  statement 2
  ...
  statement n
}
```
### if...esle 判斷式

if...else 是任何語言最常見的控制流程語句，他的概念非常簡單以下用 pseudo code 演示：
```js
if (今天天氣好) {

  出處走走

} else {
  
  關在家裡

}
```

此外在開發上若遇到大量的if、esle if、else 會造成程式冗長與不易閱讀，所以這時就可以使用 switch 判斷也可以達到相同效果。

```js
switch (expression) {
  case value1:
    //符合時執行語句
    break;
  case value2:
    //符合時執行語句
    break;
  ...
  default:
    //以上都無則進入此區域
    break;n
}
```
