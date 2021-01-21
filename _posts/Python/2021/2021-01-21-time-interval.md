---
layout: post
title: '[Python 常用] 實現 setInterval 定時器圈呼叫函式功能'
categories: 'Python'
description: 
keywords: 
---

## 前言
在 JavaScript 中有個 setInterval() 是在每隔指定的毫秒數迴圈呼叫函式。然而在 Python 中若要實現此功能可以用哪些方法呢？本篇文章就提供了兩種技巧復刻此功能。

## 使用 threading
透過 Python 的 threading 模組建立一個線程，並採用 `threading.Timer` 定時器達到指定時間去執行某件事情。 `set_interval()` 是我們自定義的計時器函示指定時間到了就會重複呼叫指定函示。 `call()` 為自定義欲執行的函式。

```py
import threading

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

def call():
    print('hello!')

set_interval(call, 3)
```

## 遞迴呼叫法
此方法搭配 Python 原生的 time.sleep() 函式延遲執行，接著再透過遞迴區叫函式的方法模擬定時器迴圈呼叫的功能。

```py
import time
def setInterval(func, sec):
    time.sleep(sec)
    func()
    setInterval(func(), sec)

def call():
    print('hello!')

setInterval(call, 3)
```
