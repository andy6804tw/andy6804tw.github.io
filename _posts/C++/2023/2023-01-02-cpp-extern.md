---
layout: post
title: 'C/C++ extern 引用外部變數'
categories: 'C++'
description: 'C/C++ extern'
keywords: 
---

## 前言
假設今天我們有一個變數要在多個檔案之間共用，此時就可以用上 extern。關鍵字 extern 告訴編譯器這個變數的存在，但是並不是由當前這個檔案宣告，而是透過其他的檔案宣告並拿來共用。


## C++ extern 引用外部變數
以下範例在 `source.cpp` 中建立一個 a 變數並設定初值為279。接著在主程式 `main.cpp` 中透過 extern 關鍵字引用外部變數 a。因此可以在主程式直接跟 `source.cpp` 中的變數 a 共用存取。以下範例在主程式中將 a 變數加二因此最後輸出得到281。

```c
// source.cpp
int a=279;
```

```c
// main.cpp
# include<iostream>

extern int a;

int main(){
    a+=2;
    std::cout << a << std::endl;
}
```

```sh
g++ -o main -g source.cpp  main.cpp
./main
```

輸出結果：
```
281
```
