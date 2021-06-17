---
layout: post
title: '[學習筆記] 李宏毅課程 Transformer 機制解說 (下)'
categories: 'AI'
description:
keywords: machine learning 2021 spring ntu
---

## Decoder
Decoder 最常見有兩種，首先我們先來看 Autoregressive 的 Decoder。以下以語音辨識做範例，所謂的語音辨識就是輸入一段聲音輸出一串文字。首先輸入語音訊號進入 Encoder 後，輸出是一排向量。接下來就進入 Decoder 運作，Decoder 的任務就是產生輸出。Decoder 該如何產生文字呢？首先給予一個開始的符號(Begin, BOS) 並用 one-hot 來表示起始字元。接著 Decoder 吃到起始符號後會吐出一個向量，他的長度跟你的詞彙長度是一樣的，也就是所謂字典數量。然後每一個中文字會對應到一個數值，因為有通過 softmax 因此輸出的向量加總等於一，同時代表每個字詞的機率。因此分數最高的那個字就是最終的輸出，以下範例第一個輸出為機。接下來再把機當作是 Decoder 新的輸入，此時將會有兩個輸入一個是起始符號以及機。再來就會根據這兩個輸入，得到一個輸出向量以此類推。 

![](https://i.imgur.com/TInhtdg.png)

由紅色虛線可以發現 Decoder 的輸入，其實是他前一個時間點自己的輸出。Decoder 會將自己的輸出當作接下來的輸入。這裡你可能會想說萬一中間有一個輸出錯誤，後面是不是也會跟著錯誤?(error propagation)。答案是有可能，稍後會提到處理方式。

![](https://i.imgur.com/Xa6IfHs.png)

這裡我們來看 Decoder 的內部結構。在 Transformer 中的 Decoder 結構如下圖所示。

![](https://i.imgur.com/56uDpYs.png)

這裡我們先來比較一下 Encoder 和 Decoder 兩者的差異，如下圖所示。你會發現將 Decoder 中間一部分蓋起來，其實兩者並無太大差別。唯一比較大的差別是 Decoder 在 Multi-Head Attention 加上了 Masked。

![](https://i.imgur.com/dWMxS69.png)

在討論 Masked Multi-Head Attention 前先看一下原本的 self-attention(圖左架構)。正常的 self-attention 是輸入一排向量輸出另一排向量，這一排向量的每個輸出都必須看過完整的輸入才做決定。也就是說輸出 b1 時必須先看過 a1~a4 資訊，輸出 b2 時也要看過 a1~a4 完整的資訊。當我們轉換成 Decoder 中的 Masked self-attention(圖右架構) 他的不同點在於，不需要完整看全部的 a1~a4 資訊。也就是產生 b1 的時候，我們只能考慮 a1 的資訊。產生 b2 的時候，只能考慮 a1 和 a2 的資訊。以此類推直到產生 b4 時才能考慮所有輸入資訊。

![]()