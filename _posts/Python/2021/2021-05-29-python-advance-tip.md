---
layout: post
title: '[Python 新手村] 進階用法整理'
categories: 'Python'
description: 'Python advance tip'
keywords: 
---

# 前言

## 串列 (List)
常數串列轉成字串型態

```py
myLlist = [1, 2, 3]
newList = [str(i) for i in myLlist]
newList # ['1', '2', '3']
```

字串類型 List 轉成整數List

```py
myLlist = ['1', '2', '3']
newList = [int(i) for i in myLlist]
newList # [1, 2, 3]
```

字串類型 List 轉成字串變數

```py
myLlist = ['1', '2', '3']
newString = ''.join(myLlist)
newString # '123'
```

字串類型 List 轉成整數變數

```py
myLlist = ['1', '2', '3']
newNumber = int(''.join(myLlist))
newNumber # 123
```

整數翻轉

```py
x = 123
myStr = str(abs(x))
reverse =  myStr[::-1] # 321
```

### List 快速取值

```py
myList = ['Andy', 18]
name, age = myList
print(f'Name: {name}, Age: {age}') # Name: Andy, Age: 18
```

### Python List extend()方法
extend() 函數用於在列表末尾一次性追加另一個序列中的多個值（用新列表擴展原來的列表）。

```py
aList = [123, 'xyz', 'zara', 'abc', 123]
bList = [2009, 'manni']
aList.extend(bList) 

print("Extended List : ", aList) # Extended List :  [123, 'xyz', 'zara', 'abc', 123, 2009, 'manni']
```

## 其他

### 條件(三元) 運算子
條件運算子常常被用來當作 if...else 的簡潔寫法。在一個條件後面會跟著一個問號 (?)，如果條件是 True，在冒號(:)前的表達式會被執行，如果條件是 False，在冒號後面的表達式會被執行。在 C/C++ 裡以 ?: (問號冒號)表示。在 python 中則以 x if y else z 表示。


```py
x = True if 'a' == 'a' else False
#意思同於
if 'a' == 'a':
    x = True
else:
    x = False
```



### Swap Two Variables

```py
# 方法一
a= 5
b=10
a, b = b ,a
print(f'a: {a}, b: {b}') # a: 10, b: 5
```

```py
# 方法二
a= 5
b=10
temp = a
a = b
b = temp
print(f'a: {a}, b: {b}') # a: 10, b: 5
```