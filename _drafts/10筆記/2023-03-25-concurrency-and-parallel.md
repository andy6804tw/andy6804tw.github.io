
# Concurrency vs Parallel
Python在3.5版本中開始支援使用協程(coroutines)來撰寫非同步(asynchronous)程式，並使用 async 和 await 語法來實現。coroutines 是由兩個單字合併而成的，分別是 cooperation + routine， cooperation 意指合作，routine 意指例行事件。這裡 routine 指得是程序中被呼叫的 function。將 function 協同其他更多的 function 共同作業這件事情稱為 coroutines。

> 在3.5版本之前通常都使用yield，但是此用法在3.8已經被棄用

Python 提供的協程機制可以讓你在等待 I/O bound 操作時，讓其他的程式碼可以被執行。使用 async 和 await 語法可以讓你的程式在等待時不會被鎖住，而是可以去做其他的事情，當等待的操作完成後，程式再回到該處繼續執行。在本文中，我們將逐一的解釋以下內容：

- Coroutines
- Asynchronous Code
- async and await

## Coroutines
協程是 Python 中用於實現非同步程式碼的機制，透過它可以創建非同步函式。協程的特點是可以暫停和恢復執行，這使得程式碼可以在等待 I/O 操作完成時繼續執行其他任務，從而提高了程序的效率。以下圖事件舉例，就們在 main thread 執行到 function A 需等待 IO thread 結果，此時程序先暫停 function A 並協調讓出 main thread 使 main thread 去執行其他的事情(例如UI的選染)，等到 IO thread 耗時的處理結束後，再使 function A 繼續執行得到最終結果。以上例子就是典型的 Coroutines 概念。

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*mxsd2CH9qLnycFyHT0EQrQ.png)

## 非同步程式機制 (Asynchronous)
當程式碼需要等待某些事情完成時，可以讓電腦去執行其他任務。這種等待通常是指等待較慢的 I/O 運算，例如等待資料透過網路傳送、等待讀取磁碟檔案、等待資料庫操作完成等。由於等待這些操作所花費的時間佔了大部分執行時間，所以這種操作被稱為「I/O bound」操作。非同步系統的優點是，當一個任務完成時，它不需要立即把結果傳回，而是可以在稍等一下之後，再回來繼續執行。反之，同步系統需要等待上一個任務完成才能繼續執行下一個任務。接著要介紹兩個新名詞，並發(concurrency)和平行(parallelism) 都是指一次處理多個任務的能力，但是兩者之間有所不同。間單來說，Concurrency 強調的是多任務之間的交替執行，而 Parallel 強調的是多任務之間的真正同時處理。因此，Concurrency 更加注重系統的效率和執行效果，而 Parallel 更加注重處理速度和性能。

### Concurrency
Concurrency 通常是指在同一個時間段內，有多個任務正在進行，但是這些任務之間可能是交替執行的，也可能是同時執行的，這取決於系統的調度和分配策略。Concurrency 的重點是讓多個任務交替進行，最終達到多任務並發的效果。例如，在瀏覽器中打開多個標籤頁時，這些標籤頁的載入和顯示是交替進行的，看起來好像是同時進行的。

## Parallel
Parallel 則是指同一個時間段內，有多個任務同時執行，每個任務都有一個獨立的執行緒或處理器核心進行處理。Parallel 的重點是實現真正的同時處理，從而加速任務的處理速度。例如，在計算機上使用多個處理器核心同時執行多個任務，可以大大加速處理速度。

