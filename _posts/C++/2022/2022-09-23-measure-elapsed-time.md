---
layout: post
title: 'C++ 計算程式運行時間'
categories: 'C++'
description: 'C++ setInterval setTimeout'
keywords: 
---

## C++ 計時函式庫比較
本篇文章將提供 Windows 和 Linux 系統好用的時間計時方法。

![](/images/posts/C%2B%2B/2022/img1110923-1.png)

- 毫秒（millisecond） 10的負3次秒
- 微秒（microsecond）10的負6次秒
- 毫微秒（nanosecond）10的負9次秒


## 使用 Chrono 標準庫
在 C++11 中若要計算程式的執行時間，最佳方法是使用處理日期時間的 Chrono 標準庫，它的精度可達到毫微秒（nanosecond）。`steady_clock` 表示穩定的時間間隔。每次呼叫 now() 得到的時間總是比前一次的值大，因此每次 tick 都保證過了穩定的時間間隔。此外我們可以透過 `duration_cast` 轉換不同精度的時間單位。

```c
#include <stdio.h>
#include <chrono>
#include <unistd.h>

int main() {
    auto start = std::chrono::high_resolution_clock::now();

    sleep(3);

    auto finish = std::chrono::high_resolution_clock::now();
    printf("Elapsed time in nanoseconds: %ld ns\n", std::chrono::duration_cast<std::chrono::nanoseconds>(finish-start).count());
    printf("Elapsed time in microseconds: %ld µs\n", std::chrono::duration_cast<std::chrono::microseconds>(finish-start).count());
    printf("Elapsed time in milliseconds: %ld ms\n", std::chrono::duration_cast<std::chrono::milliseconds>(finish-start).count());
    printf("Elapsed time in seconds: %ld sec\n", std::chrono::duration_cast<std::chrono::seconds>(finish-start).count());
}
```

執行結果：
```
Elapsed time in nanoseconds: 3000115862 ns
Elapsed time in microseconds: 3000115 µs
Elapsed time in milliseconds: 3000 ms
Elapsed time in seconds: 3 sec
```

## 使用 Linux 系統時間
本方使用函數 gettimeofday 來得到程式執行前後的時間，是調用 `<sys/time.h>` 取得當前系統時間。gettimeofday 是符合 POSIX 標準的函式，用於檢索系統時鐘，精度可達到微秒（microsecond，即μs）。


```c
#include <stdio.h>
#include <sys/time.h>
#include <unistd.h>

int main() {
    struct timeval START,END;
    double timeuse;
    gettimeofday(&START,NULL);

    sleep(3);

    gettimeofday(&END,NULL);
    timeuse = (END.tv_sec - START.tv_sec) + (double)(END.tv_usec - START.tv_usec)/1000000.0;
    printf("Elapsed time in seconds: %lf sec\n", timeuse);
    printf("Elapsed time in milliseconds: %lf ms\n", timeuse*1000);
}
```

執行結果：
```
Elapsed time in seconds: 3.000074 sec
Elapsed time in milliseconds: 3000.074000 ms
```

## Windows 系統計時方法
透過 Windows 系統的高精度計時器 QueryPerformanceCounter 實現計時功能，精確度可達到微秒等級。

```c
#include <stdio.h>
#include<windows.h> 
#include <unistd.h>

int main() {
    double time = 0;
    LARGE_INTEGER nFreq, nBeginTime, nEndTime;
    QueryPerformanceFrequency(&nFreq);
    QueryPerformanceCounter(&nBeginTime);// 開始計時

    sleep(3);

    QueryPerformanceCounter(&nEndTime);// 停止計時  
    time = (double)(nEndTime.QuadPart - nBeginTime.QuadPart) / (double)nFreq.QuadPart; // 計算程式執行時間單位為s
    printf("Elapsed time in seconds: %lf s\n", time);
}
```

## Reference
- [Measure elapsed time of a C++ program using Chrono library](https://www.techiedelight.com/measure-elapsed-time-program-chrono-library/)
- [【C/C++】計時函數比較](https://blog.51cto.com/mengxianghn/1678667)




