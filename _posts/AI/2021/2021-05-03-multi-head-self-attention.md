---
layout: post
title: '[學習筆記] 李宏毅課程 Multi-head Self-Attention 機制解說'
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

到目前為止你可能會發現 self-attention 的 layer 它少了一個很重要的資訊，就是位置。對 self-attention 而言，輸入 sequence 的 a1~a4 的順序完全沒任何差別，因為他是各自獨立運算。對模型來說 a1 和 a4 的距離並沒有特別遠的意義，所有的位置距離都是一模一樣的。但這樣的的設計可能會發生一些問題，因為有時候位置的資訊也很重要。舉例來說我們在做 POS tagging(詞性標記)，也許你知道動詞比較不容易出現在句首。所以在做 self-attention 的時候，如果你覺得位置的資訊是一個很重要的事情，那你可以將位置的資訊加進去。怎麼把位置的資訊加進去呢？這邊就要用到一個叫做 positional enciding 的技術。為每一個位置設定一個向量，這裡用 ei 表示。每一個不同的位置就有不同的向量，再把 ei 加到 ai 上就可以了。每一個位置都有專屬的 e，希望夠過給予每一個不同位置的 e，模型在處理輸入的時候就能知道他的位置資訊。這裡的 positional 向量是人工設定的。在 attention is all you need 這邊論文 positional vector 是透過 sin cos 的 function 所產生的。這個 positional enciding 能然是一個尚待研究的問題，甚至可以透過資料學習。

![](https://i.imgur.com/QYpn2J3.png)

positional enciding 可以參考 [[論文] Learning to Encode Position for Transformer with Continuous Dynamical Model](https://arxiv.org/abs/2003.09229) 這篇文獻。裡面比較跟提出新的 positional enciding。如下圖每一個位置都是 row 橫著看，每個 row 代表一個位置 (a) 為透過 sin function 所產生的 (b) 是透過神經網路學習出來的 (c) 為本論文提出的 FLOATER 特別的網路學習 (d) 透過 RNN 學習。

![](https://i.imgur.com/1sNzVDe.png)

Transformer 和 BERT 是大家耳熟能詳的透過 self-attention 在 NLP 上的應用。但是 self-attention 不只能用在 NLP 相關的應用上。比如說在做語音的時候，也能用 self-attention。但是由於聲音訊號資料量太大，造成 sequence 過長不容易訓練。因此在做語音的時候有一招叫做 Truncated self-attention，也就是在做 self-attention 時不需要看整個 sequence，也許看一小範圍左右就好，至於這個範圍要多大就是由人設定。

![](https://i.imgur.com/YTpfya3.png)

除此之外 self-attention 也能被應用在影像上。其實一張圖片也能看作是一個 vector set。這裡舉個例子假設我們有一張 5*10 解析度的圖片，這張圖片可以看過是一個 5*10*3 的 RGB 張量。我們可以把每一個位置的 pixel 看作是一個三維的向量，那整張圖片其實就是 5*10 個向量。

![](https://i.imgur.com/6XDNsNF.png)

這裡舉兩個應用將 self-attention 用在影像處理上。我們可以比較 self-attention 跟 CNN  之間有什麼樣的差異與關聯。如果我們今天用 self-attention 來處理一張圖片一個 pixel 產生 query，其他的 pixel 產生 key。在進行 inner product 時候不是考慮一個小的區域而是整張的資訊。而 CNN 會畫出一個 receptive field 每一個 filter 只考慮 receptive field 範圍裡面的資訊。所以我們可以說 CNN 是一種簡化版的 self-attention，因為在做 CNN 的時候我們只考慮 receptive field 裡面的資訊。而在做 self-attention 的時候我們是考慮整張圖片的資訊。或是你也可以認為 self-attention 是複雜化的 CNN。而對 self-attention 而言我們用 attention 去找出相關的 pixel，就好像是 receptive field 是被自動學出來的。網路自己決定以這個 pixel 為中心，哪些 pixel 是我們真正需要考慮的，哪些 pixel 是相關的。

![](https://i.imgur.com/qKrDBTM.png)

以上 self-attention 跟 CNN 的關係可以從一篇論文得知 [[論文] On the Relationship between Self-Attention and Convolutional Layers](https://arxiv.org/abs/1911.03584)。它會用數學的方式嚴謹的方式告訴你，其實 CNN 就是 self-attention 的特例。self-attention 只要設定合適的參數，他會做到跟 CNN 一模一樣的事情。所以 self-attention 只要透過某些設計與限制，它救會變成 CNN。既然 CNN 是 self-attention 的一個子集，self-attention 比較 flexibel。

![](https://i.imgur.com/OlFoSkK.png)

如果我們今天用不同的資料量訓練 CNN 跟 self-attention 可以發現以下現象。flexibel 的模型需要比較多的資料，如果資料不夠就可能 overfitting(如self-attention)。而比較有限制的模型(如CNN)它適合在資料量較少的時候，比較不會 overfitting。下圖實驗結果來至於 [[論文] An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/pdf/2010.11929.pdf)，這個是 Google 所發表的論文把 self-attention 複製到影像上面。把一張影像拆解成 16*16 個 patch。把每一個 patch 就想像成一個 word。下圖橫軸是訓練的影像量從1000萬張圖到3億張。在這實驗中比較了 self-attention 是淺藍色這一條線，與 CNN 是深灰色那條線。你會發現隨著資料量越多 self-attention 的結果就會越來越好。最終在資料最多的時候 self-attention 可以超越 CNN。但在資料量少的時候 CNN 可以比 self-attention 得到更好的結果。那為何會這樣？就可以從 self-attention 跟 CNN 彈性加以解釋，self-attention 彈性較大因此比較需要較多訓練資料，訓練資料較少的時候就會 overfitting。而 CNN 他彈性比較小，在訓練資料比較少的時候結果比較好，但訓練資料多的時候，CNN 沒辦法從更大的訓練資料得到好處。事實上 CNN 跟 self-attention 可以合併使用稱作 [[論文] conformer](https://arxiv.org/abs/2005.08100)。

![](https://i.imgur.com/imz2DZp.png)

以下來比較 self-attention 與 RNN。RNN 跟 self-attention 一樣都是要處理輸入是一個 sequence 的情況。

## Reference

[【機器學習2021】自注意力機制 (Self-attention) (下)](https://www.youtube.com/watch?v=gmsMY5kc-zw)

[簡報](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2021-course-data/normalization_v4.pdf)