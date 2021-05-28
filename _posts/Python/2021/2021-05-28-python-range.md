---
layout: post
title: 'Python range() 函數介紹'
categories: 'Python'
description: 'Python Regular Expression'
keywords: 
---

## 前言
如果你需要 For 迴圈疊代一個數列的話，使用內建 `range()` 函式就很方便。如果需要建立一個有序的數列(ex: 1, 2, 3...)。就不適合用內建 `range()` 函式。那兩者關係為何？本篇文章就會帶給你一些對於 range 的基礎觀念。

### 內建 `range()`
我們可以看一下在內建 `range(start, stop, step)` 函式。裡面有一些參數可以設定:
- start: 計數從start 開始。預設是從0 開始。例如range（5）等價於range（0， 5）;
- stop: 計數到stop 結束，但不包括stop。例如：range（0， 5） 是[0, 1, 2, 3, 4]沒有5
- step：步長，預設為1。例如：range（0， 5） 等價於range(0, 5, 1)

```py
r=range(1,5)
print(type(r)) # <class 'range'>
```

如果想將 `range()` 值放在串列裡呈現可以使用一個 `tuple` 或 `list` 將 range 物件實例。

```py
tuple(range(1, 5)) # (1, 2, 3, 4)
list(range(1, 5)) # [1, 2, 3, 4]
```

內建 `range()` 函式使用時機大多數在迴圈上會看見。

```py
for i in range(3):
    print(i)
```

### 使用其他套件
我們可以使用 `numpy` 進行實作。

```py
import numpy as np

np.arange(1, 5) # array([1, 2, 3, 4])
np.arange(1, 5, .1) # array([1. , 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9])
```

## 小結
- range()返回的是range object，而np.nrange()返回的是numpy.ndarray()
- range僅可用於迭代，而np.nrange作用遠不止於此，它是一個序列，可被當做向量使用。
- range()不支援步長為小數，np.arange()支援步長為小數

