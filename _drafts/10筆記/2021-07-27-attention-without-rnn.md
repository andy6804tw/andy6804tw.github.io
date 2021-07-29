---
layout: post
title: '[Transformer系列] Attention without RNN'
categories: 'AI'
description:
keywords: 'Attention without RNN'
---

## 前言
Transformer 完全基於 Attention 注意力機制的架構。Attention 原先是被應用在 RNN，之後 Google 所提出的 Transformer 保留了原先 Attention 的優勢並移除了 RNN 的架構。Transformer 是一個蠻新的模型，最先由 2017 年被 Google 所提出一篇叫 Attention is all you need 的論文。

![](/images/posts/AI/2021/img1100727-1.png)

Transformer 是一種 Seq2seq 的模型，他有一個 Encoder 和 Decoder 並且非常適合做機器翻譯。另外在 Transformer 中拋棄了 RNN 循環神經網路的架構。Transformer 僅保留了 Attention 機制以及全連接層網路，實驗結果並優於 RNN+Attemtion 的架構。目前最新的機器翻譯研究已經很少人用 RNN 模型了，當今業界大多使用 Transformer + Bert 模型。

- Transformer is a Seq2Seq model.
- Transformer is not RNN.
- Purely based attention and dense layers.
- Higher accuracy than RNNs on large  datasets.

## 重新審視 Attention + RNN
這裡來思考一個問題。當我們把 RNN 去掉只保留 Attention，僅利用 Attention 搭建一個神經網路用來取代 RNN。那我們該怎麼做呢？接下來我們會來詳細討論，從零開始基於 Attention 搭建一個神經網路的整個流程。首先在本篇文章我們先將之前學過的 RNN + Attention 開始入手，再抽取掉 RNN 保留 Attention。然後搭建一個 Attention 與 self-attention 網路層。下一篇文章會再將這些概念組裝起來，搭建一個深度的 Seq2seq 模型。搭出來的模型就是當今最紅的 Transformer。

## Attention for Seq2Seq Model
### RNN 的 Attention Ｑ、K、V 計算
在[前篇](https://andy6804tw.github.io/2021/05/01/rnn-to-attention/)文章有提到 RNN 模型的進化，最終使用 Attention 機制來改善 RNN Seq2seq 的模型。所謂的 Seq2seq 是指有一個 Encoder 和一個 Decoder。Encoder 的輸入是有 m 個時間點的輸入X<sub>1</sub>~X<sub>m</sub>，每個一個輸入都是經過編碼過後的向量。Encoder 把這些輸入的訊息壓縮到隱藏狀態向量 h 中，其最後一個狀態 h<sub>m</sub> 是看過所有的輸入後所壓縮的訊息。Decoder 所做的事情取決於你的任務是什麼，例如文字生成器。在 Decoder 中會依序產生出狀態 s，每個時間點會根據狀態生成一個文字。我們在把輸出的文字作為下一次的輸入x<sup>‘</sup>，如果有 Attention 機制的話還需要計算 context vector(c)。每當計算出一個狀態 s 就要計算一次 c。

![](/images/posts/AI/2021/img1100727-2.png)

context vector(c) 計算方式是，首先將 Decoder 當前狀態 s<sub>j</sub> 與 Encoder 所有狀態 h<sub>1</sub>~h<sub>m</sub> 做對比並用 align() 函數計算彼此間的相關性。把算出的 𝛼<sub>ij</sub>  作為注意力的分數。 每計算一次 context vector 就要計算出 m 個分數，其表示 𝛼<sub>1j</sub> ~ 𝛼<sub>mj</sub> 。

![](/images/posts/AI/2021/img1100727-3.png)

每一個  𝛼 對應一個狀態 h，以下我們具體的來看一下分數 𝛼 是如何被計算出來的。分數的計算是 h<sub>i</sub>  和 s<sub>j</sub> 的函數，首先我們必須計算 Q 和 K。把向量 h<sub>i</sub> 乘上一個矩陣 W<sub>K</sub> 得到 k<sub>i</sub>。 另外把向量 s<sub>j</sub> 乘上一個矩陣 W<sub>Q</sub> 得到 q<sub>j</sub>。這裡的矩陣 W<sub>K</sub> 與 W<sub>Q</sub> 是 align() 函數中可以學習的權重，必須經由訓練資料中去學習的。我們必須把 s<sub>j</sub> 這一個向量與 Encoder 中的所有 h 去計算對比。有 m 個 h 向量因此會有 m 個 k，我們可以將 k<sub>1</sub>~k<sub>m</sub> 組成一個 K 矩陣。我們可以發現圖中綠色的 k<sub>i</sub> 向量為 K 的每一行(row)。

![](/images/posts/AI/2021/img1100727-4.png)

計算矩陣 K，需要將 K 進行轉置並與 q<sub>j</sub> 進行矩陣相乘的運算。輸出會是一個 m 維的向量。最後再使用一個 Softmax 函數將這些輸出的數值映射到 0~1 之間，並且這 m 個數值加總必為 1。此時的 𝛼<sub>1j</sub>~ 𝛼<sub>mj</sub> 為最終 q<sub>j</sub>  所對輸入有感興趣的地方的分數。

![](/images/posts/AI/2021/img1100727-5.png)

剛才已經將 Decoder 狀態 s<sub>j</sub> 還有 Encoder 狀態 h<sub>i</sub> 分別做線性轉換，得到一組向量 q<sub>j</sub>(Query) 與 m 個 k<sub>i</sub>(Key)。我們拿一個 q<sub>j</sub> 向量去對比所有 Key(K)，算出 m 個分數，這 m 個 𝛼 分數表示了 Query 與每一個 Key 的匹配程度。其匹配程度越高 𝛼 分數越大，同時也代表著模型需要更關注這些內容。除此之外我們還需要計算 Value，將 h<sub>i</sub> 乘上一個矩陣 W<sub>V</sub> 上 就能得到 v<sub>1</sub>~v<sub>m</sub>。這些合併起來就能用 V 表示，另外這裡的 W<sub>V</sub> 也是可以透過機器學習的。

![](/images/posts/AI/2021/img1100727-6.png)

### 實際範例 Attention for Seq2Seq Model
剛剛已經講了 Q、K、V 這三種向量 在 RNN 架構中是如何被計算出來的。我們再回過頭看一下這個例子。首先我們先把 Decoder 目前狀態 s<sub>j</sub> 乘上一個 W<sub>Q</sub> 得到 q<sub>j</sub>。

![](/images/posts/AI/2021/img1100727-7.png)

然後把 Encoder 所有 m 個狀態 h<sub>1</sub>~h<sub>m</sub> 乘上 W<sub>K</sub> 映射到 Key 向量。

![](/images/posts/AI/2021/img1100727-8.png)

用矩陣 K 與向量 q<sub>j</sub> 計算出 m 維的分數向量。a<sub>1j</sub>~a<sub>mj</sub> 對應每個 Encoder 的 h 向量。最後還要經過一個 Softmax() 即代表對輸入 x<sub>1</sub>~x<sub>m</sub> 所需要關注的分數。

![](/images/posts/AI/2021/img1100727-9.png)

接下來計算 Value 向量 v<sub>i</sub>，我們拿 Encoder 第 i 個狀態向量 h<sub>i</sub> 與一個權重 W<sub>V</sub> 做一個線性轉換得到 v<sub>i</sub>。每一個 v<sub>i</sub> 對應一個隱藏狀態 h。最終我們將會得到 m 個 𝛂 與 v，並做加權平均得到一組新的 context vector(c)。c<sub>j</sub> 等於 𝛼<sub>1j</sub> 乘上 v<sub>1</sub> 一直加到 𝛼<sub>mj</sub> 乘上 v<sub>m</sub>。 這種計算分數 𝛼 和 context vector(c) 的方法就是 Transformer 用的機制。

![](/images/posts/AI/2021/img1100727-10.png)

## Attention without RNN
接下來我們來討論捨棄 RNN 只保留 Attention 的 Transformer，並得到一個 Attention 與 self-attention Layer。
