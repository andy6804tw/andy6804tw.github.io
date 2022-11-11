---
layout: post
title: 'C語言亂數生成'
categories: 'C++'
description: 'generate a random int in C'
keywords: 
---

## 前言
本篇文章將介紹 C 中使用 rand 函數產生亂數的方法，並且提供各種常用的範例程式碼。由於本方法使用到餘數運算，因此會有分佈不均的問題。C++ 11 可以使用標準中內建的亂數函式庫 `random` 產生各種機率分布的隨機亂數。

## 特定範圍整數亂數
C 語言中若要產生亂數，可以使用 `stdlib.h` 中的 rand 函數。而在呼叫 rand 函數之前，要先使用 srand 函數設定初始的亂數種子。rand 所產生的亂數是一個整數，其值介於 0 到 RAND_MAX 之間（最小是 0，最大則為 RAND_MAX）。以下展示產生指定範圍內的整數。

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(){
    // 設定亂數種子
    srand(time(NULL));
    // 指定亂數範圍
    int min = 0;
    int max = 10;
    // 產生 [min , max] 的整數亂數
    int x = rand() % (max - min + 1) + min;
    printf("x = %d\n", x);
}
```


## 特定範圍浮點數亂數
若要產生特定範圍的浮點數亂數，可以這樣寫：

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(){
    // 設定亂數種子
    srand(time(NULL));
    // 指定亂數範圍
    double min = 0;
    double max = 10;
    // 產生 [min , max] 的浮點數亂數
    double x = (max - min) * rand() / (RAND_MAX + 1.0) + min;
    printf("x = %f\n", x);
}
```