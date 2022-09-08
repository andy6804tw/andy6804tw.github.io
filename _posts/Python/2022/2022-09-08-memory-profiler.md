---
layout: post
title: 'Python 記憶體監測 memory_profiler'
categories: 'Python'
description: 'Python memory_profiler'
keywords: 
---

## 前言
今日要介紹在 Python 語言中非常好用的記憶體監測套件 memory_profiler。我們可以透過它來分析執行每行程式碼的記憶體使用情況。

## 安裝 memory_profiler
memory_profiler 是用 Python 編寫的，可以用 pip 安裝。

```
pip install memory_profiler
```

## 使用方法
建立一個 `py` 文件，並在函式開頭定義 `@profile`。

```py
# memory_profiler_test.py
from memory_profiler import profile

@profile
def my_func():
    a = [1] * (10 ** 6)
    b = [2] * (2 * 10 ** 7)
    del b
    return a

if __name__ == '__main__':
    my_func()
```

接著在終端機輸入以下指令執行文件。

```sh
python memory_profiler_test.py
```

輸出結果:
```
Line #    Mem usage    Increment  Occurrences   Line Contents
=============================================================
     4     40.2 MiB     40.2 MiB           1   @profile
     5                                         def my_func():
     6     47.8 MiB      7.7 MiB           1       a = [1] * (10 ** 6)
     7    200.5 MiB    152.6 MiB           1       b = [2] * (2 * 10 ** 7)
     8     47.9 MiB   -152.6 MiB           1       del b
     9     47.9 MiB      0.0 MiB           1       return a
```

若不想在終端機中印出結果，可以在原本程式中增加引數，以下範例中修改了浮點數顯示的精度，以及將評估結果輸出到指定路徑中。

```py
@profile(precision=4,stream=open('memory_profiler.log','w+'))
```

同樣在執行一次指令可以發現，在該目錄資料夾下會多出 `memory_profiler.log` 文件。裡面記載了程式碼逐行的記憶體使用量。

## 輸出圖片分析
該套件也能將分析的結果輸出成一個 dat 文件，並透過 `mprof` 指令，。

指令說明:
- mprof run memory_profiler_test.py
    - 分析結果會保存到一個 .dat 格式文件中
- mprof plot 
    - 把結果以圖片到方式顯示出來 (在該專案目錄下執行此命令，會自動找出 .dat 文件)
- mprof clean
    - 清空所有 .dat 文件
    
```sh
mprof run memory_profiler_test.py
mprof plot
mprof clean
```

## 後記
若要計算程式執行時間可以試試 line_profiler。它會告訴你每一行花了多少時間，而 memory_profiler 告訴你每一行分配了多少記憶體。


## Reference
- [memory_profiler 的使用](https://www.cnblogs.com/rgcLOVEyaya/p/RGC_LOVE_YAYA_603days_1.html)
- [Profiling and Timing Code](https://jakevdp.github.io/PythonDataScienceHandbook/01.07-timing-and-profiling.html)
- [使用line_profiler查看api接口函數每行代碼執行時間](https://www.cnblogs.com/rgcLOVEyaya/p/RGC_LOVE_YAYA_603days.html)