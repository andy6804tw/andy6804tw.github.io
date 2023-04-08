
## FastAPI 如何達到高效能？
在 FastAPI 中，當你定義的路徑操作函式（path operation function）是 async def 時，FastAPI 會使用 concurrency（並發處理）來處理它。當請求到達伺服器時，FastAPI 會將這些 async def 函式放入事件循環（event loop）中執行，並且可以同時處理多個請求。由於 async def 是非同步的，所以當函式等待外部I/O 完成時，事件循環會繼續執行其他函式，以提高伺服器的效能和吞吐量。因此，當你需要處理需要等待 I/O-bound 完成的非同步任務時，使用 async def 是一個很好的選擇。唯一需要注意的是，當你在程式中使用 async def 創建的函式時，一定需要使用await 等待該函式的執行。

若你不確定的話也可以直接使用普通的 def 函式。該函式會在外部的線程池中運行，並且會被等待，而不是直接被呼叫，因此會使用Concurrency。這樣可以避免阻塞服務器，提高服務器的吞吐量。



## 總結
FastAPI 對於路徑操作函式和依賴進行了特別處理。當你將函式定義為 async 函式時，FastAPI 會將其放入事件迴圈(event loop)中執行非同步處理。而當你將函式定義為 def 函式時，FastAPI 會將其放入單獨的線程池中以非同步方式執行，這是 FastAPI 的優秀之處。如果你不確定函式中的呼叫是否為非同步的(能否使用await)，建議將其定義為普通函式(def)，FastAPI 會使用多線程處理。若亂用 async，而在 async 中有同步呼叫，則會變成串行，進而降低速度。

總之，無論你是否使用 async，FastAPI 都會以非同步的方式工作，以實現高速運行(Fast)。