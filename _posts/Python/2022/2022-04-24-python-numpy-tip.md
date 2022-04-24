---
layout: post
title: '[Python 新手村] Numpy 基礎用法整理'
categories: 'Python'
description: 'Python numpy programming'
keywords: 
---

## 前言
本篇文章中將紀錄一些 numpy 套件中常用的方法與技巧。

## ndarray 插入數值
如果你習慣使用 python 的 list 方法插入數值，你會發現 Numpy 並無這樣的操作。

```
AttributeError: 'numpy.ndarray' object has no attribute 'append'
```

正確寫法應該是：

```py
import numpy as np

x = np.array([1, 2, 3])
x = np.append(x, 4)
print(x) [1 2 3 4]
```

如果要插入兩個以上的數值放到 x 串列中，可以這樣寫：

```py
import numpy as np

x = np.array([1, 2, 3])
x = np.append(x, [4, 5])
print(x) # [1 2 3 4 5]
```

> 當然你也可以使用 np.concatenate((a, b)) 合併兩個串列

另外當你的 ndarray 是個多維的情況下，若要插入數值時維度不正確會發生：


```
ValueError: all the input arrays must have same number of dimensions
```

正確寫法應該是：

```py
import numpy as np

x = np.array([[1, 2, 3], [4, 5, 6]])
x = np.append(x, [[7, 8, 9]], axis=0)
print(x) # [[1 2 3], [4 5 6], [7 8 9]]
```