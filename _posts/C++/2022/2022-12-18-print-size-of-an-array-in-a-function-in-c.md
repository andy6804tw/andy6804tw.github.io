---
layout: post
title: 'C語言取得陣列長度大小'
categories: 'C++'
description: 'print size of my array in C'
keywords: 
---

## 前言
一般要在 C 或 C++ 中測量陣列的大小通常會使用 `sizeof()` 方法。以下範例分別在主程式 main 量測與呼叫自定義函式傳入陣列並量測大小。

```c
#include <iostream>
using namespace std;
  
void findSize(int arr[])
{
    cout << sizeof(arr) << endl;
}
  
int main()
{
    int a[10];
    cout << sizeof(a) << " ";
    findSize(a);
    return 0;
}
```

輸出結果：
```
40 8
```

明明都是對同一個陣列大小長度 10 的 int 陣列進行量測為何兩邊算出來的數值會不同。其實正確答案是 40 沒錯(4*10)，因為 int64_t 在系統中佔有 4 bytes。而呼叫函式計算 sizeof 回傳 8 的原因是，在 x64 系統中指標是 8 bytes。

從這點就可以發現自定義函式 `findSize(int arr[])` 傳遞其實是指標的形式，因此實際上等同於 `findSize(int *arr)`。這也就是為何在函式中會被計算成 8 bytes，因為傳入了一個指標位置。

## 如何在函式正確計算陣列大小
我們可以傳遞 reference 到陣列中。並使用 C++ 的樣板 templates。

```c
#include <iostream>
using namespace std;
  
template <size_t n>
void findSize(int (&arr)[n])
{
    cout << sizeof(int) * n << endl;
}
  
int main()
{
    int a[10];
    cout << sizeof(a) << " ";
    findSize(a);
    return 0;
}
```

輸出結果：
```
40 40
```

我們也可以撰寫通用的樣板，使得傳入的型態可以不受限。

```c
#include <iostream>
using namespace std;
  
template <typename T, size_t n>
void findSize(T (&arr)[n])
{
    cout << sizeof(T) * n << endl;
}
  
int main()
{
    int a[10];
    cout << sizeof(a) << " ";
    findSize(a);
  
    float f[20];
    cout << sizeof(f) << " ";
    findSize(f);
    return 0;
}
```

輸出結果：
```
40 40
80 80
```

## Reference

- [How to print size of array parameter in C++?](https://www.geeksforgeeks.org/how-to-print-size-of-an-array-in-a-function-in-c/)