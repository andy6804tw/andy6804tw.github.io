---
layout: post
title: '[JS學習筆記] js'
categories: Web
description: ''
keywords: JavaScript, ES6
---

- CommonJS
  - 是一個JavaScript模塊化的規範
  - CommonJS 所定義的規範是以同步的方式一個一個檔案的載入方式，確保所有相依模組的檔案都載入後才執行。

  ```js
    // a.js
    var x = 5;
    var addX = function (value) {
      return value + x;
    };
    module.exports.x = x;
    module.exports.addX = addX;

    // main.js
    var a = require('./a.js');
    console.log(example.x); // 5
    console.log(example.addX(1)); // 6
  ```

- Require.js
  - RequireJS 提供一種稱為「非同步模組定義 (Asynchronous Module Definition)」( 簡稱為 AMD ) 的模組載入方式，這種方式可以同時間讀取所有引用和相依的模組，不需等待所有模組載入完就能先執行。


http://www.jianshu.com/p/55ae17fd1666
