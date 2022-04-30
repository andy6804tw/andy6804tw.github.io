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
print(x) # [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## ndarray 副本 *n 次
如果我們有一個 list 需要重複 n 次，可以使用 `np.tile()` 進行拷貝。第一個欄位是欲複製的串列，後面是重複的次數，假設同時有維度限制可以用  tuple 包起來。

```py
import numpy as np

np.tile([1, 2, 3, 4], (3, 1)) # [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
```

或是可以使用 `np.vstack()` 實現。

```py
import numpy as np

X = np.array([1,2,3,4])
np.vstack([X]*3)
```

第三種方法是最簡單的，直接使用 `np.array()`。

```py
import numpy as np

X = np.array([1,2,3,4])
np.array([X]*3)
```

## ndarray 在每一列插入資料
下面為例想在每筆資料前插入 [1, 2] 可以透過 `np.column_stack()` 實現。


```py
import numpy as np

ini_array = np.array([[1, 2, 3], [45, 4, 7], [9, 6, 10]])

# printing initial array
print("initial_array : ", str(ini_array))
 
# Array to be added as column
column_to_be_added = np.array([[1,2],[1,2],[1,2]])
 
# Adding column to numpy array
result = np.column_stack((column_to_be_added, ini_array))
 
# printing result
print ("resultant array", str(result))
```

```
initial_array :  [[ 1  2  3]
 [45  4  7]
 [ 9  6 10]]
resultant array [[ 1  2  1  2  3]
 [ 1  2 45  4  7]
 [ 1  2  9  6 10]]
 ```

- [Ways to add row columns in numpy array](https://www.geeksforgeeks.org/python-ways-to-add-row-columns-in-numpy-array/)

