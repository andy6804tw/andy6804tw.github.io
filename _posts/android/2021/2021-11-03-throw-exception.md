---
layout: post
title: 'Android 拋出客製化例外事件'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
當在開發時想要測試某一段程式內容。定且透過 try...catch 來接收例外訊息。當你想實際測試模擬例外時發現沒有錯意可以丟，因此這篇文章教教你如何客製化一個例外事件。

## Java 版本
使用 Java 語言拋出錯誤訊息的方式很簡單。

```java
try {
  throw new Exception("Exception message");
}
catch(Exception e) {
  Toast.makeText(this, e.toString(), Toast.LENGTH_LONG).show();
}

```

## Kotlin 版本
Kotlin 的寫法就必須建立一個例外的函式並繼承。

```kt
class CustomException(message: String) : Exception(message)
try {
  throw CustomException("Error!")
}
catch(Exception e) {
  Toast.makeText(this, e.toString(), Toast.LENGTH_LONG).show()
}
```