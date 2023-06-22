---
layout: post
title: 'Python 程式效能分析:量測運行時間'
categories: 'Python'
description: 'Python time profiler'
keywords: 
---

## 前言
本篇文章將提供四種方法，在 Python 環境中測量程式碼運行時間。

### 方法一(內建 time 函式庫)
Python 內建的 time 函式庫提供非常多的時間函式可以呼叫。其中 `time.time()` 提供1秒的精度，若需要量測極為精細的運行時間可以採用 `time.perf_counter_ns()`。該方法返回時間為納秒，用於測量較短持續時間的具有最高有效精度的時鐘。它會包括睡眠狀態所消耗的時間並且作用於全系統範圍。

```py
#coding:utf8
import numpy as np
import time
start = time.perf_counter_ns()

a = np.arange(10000000)
a = a**2

timeuse = time.perf_counter_ns() - start
print(f'Elapsed time in nanoseconds: {timeuse} ns')
print(f'Elapsed time in microseconds: {timeuse / 1000} μs')
print(f'Elapsed time in milliseconds: {timeuse / 1000000} ms')
print(f'Elapsed time in seconds: {timeuse / 1000000000} s')
```

輸出結果:
```
Elapsed time in nanoseconds: 22091600 ns
Elapsed time in microseconds: 22091.6 μs
Elapsed time in milliseconds: 22.0916 ms
Elapsed time in seconds: 0.0220916 s
```

另外還可以使用 time.process_time()，主要的差異在於 time.perf_counter() 會計算 sleep() 的時間，而 time.process_time() 不會。

> 該方法實現於 Python 3.7 或以上

### 方法二(內建 timeit 函式庫)
timeit 是 Python 的一個模組，可以用來測量執行某段程式碼的時間。

```py
import timeit
import numpy as np

start_time = timeit.default_timer()

a = np.arange(10000000)
a = a**2

end_time = timeit.default_timer()

timeuse = end_time - start_time

print(f'Elapsed time in nanoseconds: {timeuse*1000000000} ns')
print(f'Elapsed time in microseconds: {timeuse*1000000} μs')
print(f'Elapsed time in milliseconds: {timeuse*1000} ms')
print(f'Elapsed time in seconds: {timeuse } s')
```

輸出結果:
```
Elapsed time in nanoseconds: 23822599.99999997 ns
Elapsed time in microseconds: 23822.599999999973 μs
Elapsed time in milliseconds: 23.822599999999973 ms
Elapsed time in seconds: 0.02382259999999997 s
```

需要注意的是，為了獲得更準確的結果，通常需要多次執行相同的程式碼並計算平均運行時間，可以使用 timeit 模組提供的 repeat() 方法實現這一點。

### 方法三(第三方庫 line_profiler)
line_profiler 是 Python 的一個性能分析工具，可以用來分析 Python 程式碼的效能，查看哪些函數、行程式碼執行時間長，以及哪些函數、行程式碼被調用次數多，可以用來找出程式的瓶頸，提升程式執行效能。

首先使用指令安裝 line_profiler 庫

```sh
pip install line_profiler
```

編寫要測量的 Python 程式碼，並在函數上添加 @profile 裝飾器。最後將它儲存成 `.py` 檔。
```py
#coding:utf8
from line_profiler import LineProfiler
import numpy as np

@profile
def call():
    a = np.arange(10000000)
    a = a**2

if __name__=='__main__':
    call()
```

使用 line_profiler 庫測量 Python 程式碼的性能，使用以下命令：
```sh
kernprof -l -v my_script.py
```

這條命令將使用 line_profiler 測量 Python 每行程式碼的性能，並在終端顯示詳細訊息。
輸出結果:
```
Total time: 0.0215657 s
File: .\time_profiler_test.py
Function: call at line 22

Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
    22                                           @profile
    23                                           def call():
    24         1       9447.7   9447.7     43.8      a = np.arange(10000000)
    25         1      12118.0  12118.0     56.2      a = a**2
```

在 line_profiler 的性能分析結果中，常見的列名和其意義如下：

- Line #：程式碼行數。
- Time：該行程式碼所花費的時間，單位為微秒。
- Per Hit：平均每次呼叫該行程式碼所花費的時間，單位為微秒，等於 Time 除以該行程式碼的呼叫次數。
- % Time：該行程式碼所花費的時間在整個程式執行過程中所佔用的百分比。
其中，Time 和 % Time 是常見的性能分析指標。當某行程式碼的 Time 和 % Time 非常高時，表示該行程式碼的效能不佳，可能需要進一步優化；而當某行程式碼的 Per Hit 非常高時，表示該行程式碼被呼叫的次數較多，可能也需要進一步優化。


### 方法四(內建 cProfile)
另一個常用的性能測量方法是使用 Python 的 cProfile 模組。與 line_profiler 類似，cProfile 可以提供程式碼中每個函數的執行時間和調用次數。相比於 line_profiler，cProfile 的輸出結果更加精簡和易於閱讀。

```py
#coding:utf8
import cProfile
import numpy as np

def call():
    a = np.arange(10000000)
    a = a**2

if __name__=='__main__':
    # 使用 cProfile 運行函數
    cProfile.run('call()')
```

將上述程式碼儲存成 `.py` 格式，並在終端機輸入以下指令:
```sh
python .\my_script.py
```

輸出結果:
```
         5 function calls in 0.024 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.003    0.003    0.024    0.024 <string>:1(<module>)
        1    0.012    0.012    0.021    0.021 time_profiler_test.py:35(call)
        1    0.009    0.009    0.009    0.009 {built-in method numpy.arange}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

在 cProfile 的性能分析結果中，常見的列名和其意義如下：

- ncalls：函式被呼叫的次數。
- tottime：函式本身的執行時間（不包括函式內呼叫其他函式所花費的時間）。
- percall：平均每次函式呼叫所花費的時間，等於 tottime 除以 ncalls。
- cumtime：函式被呼叫及其所有被呼叫函式所花費的總時間。
- percall：平均每次函式呼叫及其所有被呼叫函式所花費的時間，等於 cumtime 除以 ncalls。
其中，tottime 和 cumtime 是常見的性能分析指標。當 tottime 非常高時，表示該函式本身的效能不佳，可能需要進一步優化；而當 cumtime 非常高時，表示該函式及其所呼叫的函式在整個程式執行過程中所佔用的時間較多，也可能需要進一步優化。

## 結論
- 如果想要測量程式碼中每行的執行時間，那麼使用 line_profiler 或 cProfile 是一個不錯的選擇，它能夠告訴你哪些行程式碼需要更多時間來執行，以便協助你找到需要優化的部分。
- 如果只想知道整個程式的執行時間，那麼使用 `time.perf_counter_ns()` 方法是一個簡單而有效的方法，它可以快速測量整個程式的運行時間，以便與其他版本進行比較。


```
import time

start_time = time.perf_counter()

# 在這裡執行要測量運行時間的代碼

end_time = time.perf_counter()

elapsed_time = end_time - start_time

cpu_speed = 1.2  # CPU 時脈速度，單位是 GHz
cpu_cycles = elapsed_time * cpu_speed * 1e9  # 將時間換算為 CPU cycle 數

print("運行時間（秒）：", elapsed_time)
print("CPU cycle 數：", cpu_cycles)
```