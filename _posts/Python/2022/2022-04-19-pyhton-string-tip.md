---
layout: post
title: '[Python 新手村] 基礎用法整理-字串 (String)'
categories: 'Python'
description: 'Python basic tip about String'
keywords: 
---

# 前言
Python 字串中有提供許多的內建方法呼叫。本篇文章將整理在 Python 語言中文字處理的一些小技巧。

## count() 計算字母出現次數
使用 `count()` 函式在 Python 中查詢字串中子字串的所有出現次數。並返回給定特定字串中子字串出現的數量或出現次數。此外，它還具有附加引數 start 和 end 來指定開始和結束位置的索引。

```py
str1 = 'An apple is an edible fruit produced by an apple tree.'

count1 = str1.count('apple')
print(count1) # 2

count2 = str1.count('a',0,10)
print(count2) # 1
```

## startswith() 得到指定字串起始位置
透過 `startswith()` 依序地去尋找子字串是否在指定索引的頭。例如以下範例會回傳 False，因為 index＝1 是 n。

```py
str1 = 'An apple is an edible fruit produced by an apple tree.'
str1.startswith('apple', 1) # False
```

若 index=3 時將會回傳 True，因為 index 從 3~7 剛好吻合指定的子字串。

```py
str1 = 'An apple is an edible fruit produced by an apple tree.'
str1.startswith('apple', 3) # True
```


```py
str1 = 'An apple is an edible fruit produced by an apple tree.'

result = [i for i in range(len(str1)) if str1.startswith('apple', i)]
print(result) # [3, 43]
```

