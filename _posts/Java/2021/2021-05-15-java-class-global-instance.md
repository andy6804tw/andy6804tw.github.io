---
layout: post
title: '[Java筆記] 全域變數 Global instances of class'
categories: 'Java'
description:
keywords: Java Collection
---

## 前言
本篇文章教教您如何透過建立一個 class 物件，並建立 Global instances。使得每一個 class 都能呼叫此變數。

## MyClass.java
在這支檔案當中能夠自由管理所有的全域變數，以下範例中建立一個字串型態的 `myName` 變數。並提供 `setName()` 修改以及 `getName()` 取值兩種方法。

```java
// MyClass.java
class MyClass {
    private String myName = null;
    private static final  MyClass instance = new MyClass();
    public static MyClass getInstance() {
        return instance;
    }
    public void setName(String myName) {
        this.myName = myName;
    }
    public String getName() {
        return this.myName;
    }
}
```

在其他檔案中欲修改和取值可以參考以下寫法：

```java
// Main.java
public class Main {

	public static void main(String[] args) {
        // 呼叫setName()修改數值
		MyClass.getInstance().setName("Andy");
        // 呼叫getName()取值
        System.out.println(MyClass.getInstance().getName());
	}

}
```