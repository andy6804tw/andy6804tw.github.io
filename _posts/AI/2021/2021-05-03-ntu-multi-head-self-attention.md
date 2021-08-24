---
layout: post
title: '[AI學習筆記] 李宏毅課程 Multi-head Self-Attention 機制解說'
categories: 'AI'
description:
keywords: machine learning 2021 spring ntu
---

## 前言
本篇文章來至於台大李宏毅教授2021機器學習課程影片，記錄了課程重點與摘要。更多課程內容可以從[這裡](https://speech.ee.ntu.edu.tw/~hylee/ml/2021-spring.html)取得。


# multi-head-self-attention
self-attention 有一個進階的版本叫做 multi-head self-attention。這個 head 的數量為超參數，需要自己去調。那為什麼我們需要比較多的 head 呢？我們在做 self-attention 的時候，就是用 q 去找相關的 k。但是相關這件事情有很多不同的形式，所以也許我們不能只有一個 q。我們應該要有多個 q，不同的 q 負責不同種類的相關性。以下解釋兩個 multi-head 的 self-attention 運作模式。首先跟原本一樣把 a 乘上一個矩陣得到 q，接下來再把 q 乘上另外兩個矩陣，分別得到 q1 跟 q2 代表我們有兩個 head。我們認為這個問題有兩種不同的相關性，所以我們要產生兩種不同的 head 來找兩種不同的相關性。既然 q 有兩個，那 k 與 v 也會有兩個。因此 q k v 得到後各乘上兩個矩陣得到不同的 head。最後 q k v 得到兩組後，計算 self-attention 的方式跟之前一樣。1 那一類的一起做，2 那一類的一起做 self-attention。所以 qi1 跟 ki1 算 attention，qj1 跟 kj1 算 attention，也就是算 dot product 得到 attemtion 分數。計算出來兩個 attention 分數後乘上 vi1 與 vj1 計算加權和得到 bi1。這邊目前只得到其中一個 head 結果，那我們另一個 head 也是做相同的計算。q2 跟 k2 做 attention，另外它們只對 v2 做加權和得到 bi2。

![](https://i.imgur.com/0rhHZDx.png)
![](https://i.imgur.com/3n8xNLP.png)

接下來我們會把 bi1 跟 bi2 把它接起來，然後再通過一個 transform 也就是在乘上一個矩陣得到 bi，然後再送到下一層去。這個就是 multi-head attention，一個 self-attention 的變形。

![](https://i.imgur.com/4jfotwi.png)

到目前為止你可能會發現 self-attention 的 layer 它少了一個很重要的資訊，就是位置。對 self-attention 而言，輸入 sequence 的 a1~a4 的順序完全沒任何差別，因為他是各自獨立運算。對模型來說 a1 和 a4 的距離並沒有特別遠的意義，所有的位置距離都是一模一樣的。但這樣的的設計可能會發生一些問題，因為有時候位置的資訊也很重要。舉例來說我們在做 POS tagging(詞性標記)，也許你知道動詞比較不容易出現在句首。所以在做 self-attention 的時候，如果你覺得位置的資訊是一個很重要的事情，那你可以將位置的資訊加進去。怎麼把位置的資訊加進去呢？這邊就要用到一個叫做 positional encoding 的技術。為每一個位置設定一個向量，這裡用 ei 表示。每一個不同的位置就有不同的向量，再把 ei 加到 ai 上就可以了。每一個位置都有專屬的 e，希望夠過給予每一個不同位置的 e，模型在處理輸入的時候就能知道他的位置資訊。這裡的 positional 向量是人工設定的。在 attention is all you need 這邊論文 positional vector 是透過 sin cos 的 function 所產生的。這個 positional encoding 能然是一個尚待研究的問題，甚至可以透過資料學習。

![](https://i.imgur.com/QYpn2J3.png)

positional encoding 可以參考 [[論文] Learning to Encode Position for Transformer with Continuous Dynamical Model](https://arxiv.org/abs/2003.09229) 這篇文獻。裡面比較跟提出新的 positional encoding。如下圖每一個位置都是 row 橫著看，每個 row 代表一個位置 (a) 為透過 sin function 所產生的 (b) 是透過神經網路學習出來的 (c) 為本論文提出的 FLOATER 特別的網路學習 (d) 透過 RNN 學習。

![](https://i.imgur.com/1sNzVDe.png)

## self-attention 應用於語音處理
[Transformer](https://arxiv.org/abs/1706.03762) 和 [BERT](https://arxiv.org/abs/1810.04805) 是大家耳熟能詳的透過 self-attention 在 NLP 上的應用。但是 self-attention 不只能用在 NLP 相關的應用上。比如說在做語音的時候，也能用 self-attention。但是由於聲音訊號資料量太大，造成 sequence 過長不容易訓練。因此在做語音的時候有一招叫做 [Truncated self-attention](https://arxiv.org/abs/1910.12977)，也就是在做 self-attention 時不需要看整個 sequence，也許看一小範圍左右就好，至於這個範圍要多大就是由人設定。

![](https://i.imgur.com/YTpfya3.png)


## self-attention 與 CNN 比較
除此之外 self-attention 也能被應用在影像上。其實一張圖片也能看作是一個 vector set。這裡舉個例子假設我們有一張 5*10 解析度的圖片，這張圖片可以看過是一個 5*10*3 的 RGB 張量。我們可以把每一個位置的 pixel 看作是一個三維的向量，那整張圖片其實就是 5*10 個向量。

![](https://i.imgur.com/6XDNsNF.png)

這裡舉兩個應用將 self-attention 用在影像處理上。我們可以比較 self-attention 跟 CNN  之間有什麼樣的差異與關聯。如果我們今天用 self-attention 來處理一張圖片一個 pixel 產生 query，其他的 pixel 產生 key。在進行 inner product 時候不是考慮一個小的區域而是整張的資訊。而 CNN 會畫出一個 receptive field 每一個 filter 只考慮 receptive field 範圍裡面的資訊。所以我們可以說 CNN 是一種簡化版的 self-attention，因為在做 CNN 的時候我們只考慮 receptive field 裡面的資訊。而在做 self-attention 的時候我們是考慮整張圖片的資訊。或是你也可以認為 self-attention 是複雜化的 CNN。而對 self-attention 而言我們用 attention 去找出相關的 pixel，就好像是 receptive field 是被自動學出來的。網路自己決定以這個 pixel 為中心，哪些 pixel 是我們真正需要考慮的，哪些 pixel 是相關的。

![](https://i.imgur.com/qKrDBTM.png)

以上 self-attention 跟 CNN 的關係可以從一篇論文得知 [[論文] On the Relationship between Self-Attention and Convolutional Layers](https://arxiv.org/abs/1911.03584)。它會用數學的方式嚴謹的方式告訴你，其實 CNN 就是 self-attention 的特例。self-attention 只要設定合適的參數，他會做到跟 CNN 一模一樣的事情。所以 self-attention 只要透過某些設計與限制，它就會變成 CNN。既然 CNN 是 self-attention 的一個子集，self-attention 比較 flexibel。

![](https://i.imgur.com/OlFoSkK.png)

如果我們今天用不同的資料量訓練 CNN 跟 self-attention 可以發現以下現象。flexibel 的模型需要比較多的資料，如果資料不夠就可能 overfitting(如self-attention)。而比較有限制的模型(如CNN)它適合在資料量較少的時候，比較不會 overfitting。下圖實驗結果來至於 [[論文] An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/pdf/2010.11929.pdf)，這個是 Google 所發表的論文把 self-attention 複製到影像上面。把一張影像拆解成 16*16 個 patch。把每一個 patch 就想像成一個 word。下圖橫軸是訓練的影像量從1000萬張圖到3億張。在這實驗中比較了 self-attention 是淺藍色這一條線，與 CNN 是深灰色那條線。你會發現隨著資料量越多 self-attention 的結果就會越來越好。最終在資料最多的時候 self-attention 可以超越 CNN。但在資料量少的時候 CNN 可以比 self-attention 得到更好的結果。那為何會這樣？就可以從 self-attention 跟 CNN 彈性加以解釋，self-attention 彈性較大因此比較需要較多訓練資料，訓練資料較少的時候就會 overfitting。而 CNN 他彈性比較小，在訓練資料比較少的時候結果比較好，但訓練資料多的時候，CNN 沒辦法從更大的訓練資料得到好處。事實上 CNN 跟 self-attention 可以合併使用稱作 [[論文] conformer](https://arxiv.org/abs/2005.08100)。

![](https://i.imgur.com/imz2DZp.png)

## self-attention 與 RNN 比較
以下來比較 self-attention 與 RNN。RNN 跟 self-attention 一樣都是要處理輸入是一個 sequence 的情況。每個 RNN 的 Block 吃上一次的記憶也就是 hidden state 以及當前的輸入。然後再輸出一個東西為隱藏曾輸出，最終進到一個全聯階層網路得到一個輸出。接下來第二個 Block 做一樣事情，輸入上一個時間點的隱藏層狀態以及第二個時間點的輸入。你會發現 RNN 與 self-attention 做的事情也非常像，輸入都是一個序列。self-attention 是輸出另一個序列，這每一個輸出的序列都有完整考慮過每個時間點的輸入。而 RNN 的輸出序列只考慮當前所輸入的內容，並不像 self-attention 一次看過所有輸入。當然可以用雙向的 RNN 也可以表示每個輸出看過了所有的輸入。但是假設我們把 RNN 和 self-attention 的最後一個輸出做比較的話。就算使用雙向的 RNN 兩者還是有差別的。因為若最後一個時間點的 RNN 要考慮到最一開始的輸入，必須將第一個時間點的隱藏狀態儲存慢慢地傳給最後一個並且不能忘記。那對 self-attention 來說只要給一個 query 和 key 就能快速的在序列上非常遠的向量中取到想要的資訊。另外還有更重要的是 RNN 在處理時並不能平行化，要產生第一個時間點的向量才能產上第二個時間的向量。但 self-attention 的優勢他可以平行處理所有的輸出。因此在運算速度上，self-attention 比 RNN 更有效率。如果想更近一步了解 RNN 與 self-attention 的關係可以參考這一篇 [[論文] Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention](https://arxiv.org/abs/2006.16236)。此篇論文會告訴你 self-attention 加上什麼東西以後其實就變成了 RNN。

![](https://i.imgur.com/oslsKWu.png)

[RNN 課程](https://youtu.be/xCGidAeyS4M)

## self-attention 應用於 Graph
最後 self-attention 其實也能應用在 Graph 上，我們可以將 Graph 看作是一堆向量。如果是一堆的向量就能用 self-attention 來處理。但是 self-attention 應用在 Graph 上有著特別的地方。其中在 Graph 上不僅只有 Node，每一個 Node 可以表示成向量除此之外還有 Edge 的資訊。我們知道哪些 Node 之間是有相連的，也就是哪些向量間彼此間相關。之前我們在做 self-attention 時他的關聯性是透過神經網路所找出來的。那現在 Graph 既然有了 Edge 資訊，那麼關聯性也許就不需要透過機器自動找出來。圖中的所有 Edge 同時暗示著 Node 與 Node 之間的關聯性。所以我們今天將 self-attention 應用在 Graph 上的時候，在做 Attention Matrix 計算時可以只計算有 Edge 相連的 Node 就好。因為這個 Graph 人為經過領域知識建立出來的，那麼專家已經說了這某兩個向量間彼此無關聯。我們就不必另外去學習沒有相連的 Edge 就直接將那些沒連線的位置設為 0，即表示兩點間沒有關聯性。那其實我們將 self-attention 按照剛上述所講的限制用在 Graph 上面時，其實就是一種圖神經網路(GNN)。

![](https://i.imgur.com/WQAoOfk.png)

[GNN 課程](https://youtu.be/eybCCtNKwzA)

## To Learn More
其實 self-attention 他有非常多的變形。你可以看這一篇論文[Long Range Arena: A Benchmark for Efficient Transformers](https://arxiv.org/abs/2011.04006)比較了各種不同的 self-attention 的變型。因為 self-attention 最大的問題就是運算量非常的大，所以怎麼樣減少 self-attention 的運算量是一個未來的重點。self-attention 最早是用在 Transformer 上因此廣義的 Transformer 其實就是在說 self-attention。所以日後的 self-attention 變型都稱為 XXformer。我們可以從圖中發現日後的變型雖然運算速度加快，但是預測結果相對降低。到底怎麼樣的 Attention 才能又快又好，這還是個尚待研究的問題。還有另一篇論文[Efficient Transformers: A Survey](https://arxiv.org/abs/2009.06732)也是在探討 self-attention 的變型提供大家參考。

![](https://i.imgur.com/5W6v0Jo.png)

## Reference

[【機器學習2021】自注意力機制 (Self-attention) (下)](https://www.youtube.com/watch?v=gmsMY5kc-zw)

[簡報](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2021-course-data/self_v7.pdf)