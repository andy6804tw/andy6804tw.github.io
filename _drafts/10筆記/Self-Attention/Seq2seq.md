---
layout: post
title: '[學習筆記] 李宏毅課程 Transformer 機制解說'
categories: 'AI'
description:
keywords: machine learning 2021 spring ntu
---

## 前言
Transformer 跟 Bert 很有關係，他是用來處理自然語言的模型。簡單來說 Transformer 就是一個 Seq2seq 的模型。輸入是一個 sequence，輸出是一個未知的長度 sequence 由機器自行判斷。常見的例子有:

- 語音辨識
    -  一串語音訊號 ➞ 辨識的文字
- 機器翻譯
    - 中文句子 ➞ 英文句子
- 語音翻譯
    - 英文語音訊號 ➞ 中文句子

![](https://i.imgur.com/5QxI3eg.png)

最常見例子閩南語、台語語音辨識，輸出中文字:

![](https://i.imgur.com/Tb2Vx21.png)

## Seq2seq 應用舉例
台語語音合成，是輸入一串中文句子輸出一串語音訊號(TTS)。以下實驗將中文文字轉成台羅拼音，再將拼音轉成聲音訊號。

![](https://i.imgur.com/HgGvhHr.png)

在文字上也有廣泛使用 Seq2seq 模型，例如對話機器人。輸入一句話，經過模型判斷吐出回應的句子。

![](https://i.imgur.com/va2TCD5.png)

Seq2seq 在自然語言處理的領域使用的非常廣泛。我們可以將所有自然語言的問題想像成 QA 問答系統，例如句子翻譯、摘要重點、情意分析...等。然而 QA 的問題往往都以 Seq2seq 形式來解。至於該如何解呢？以下舉個範例，輸入有一個問題以及一串文字，輸出就是問題的答案。


![](https://i.imgur.com/Oh9tINh.png)

> [深度學習與人類語言處理 NTU 2020 Spring](https://speech.ee.ntu.edu.tw/~hylee/dlhlp/2020-spring.html)

# Seq2seq
一般的 sequence to sequence 他裡面會分成兩塊，一塊是 Encoder 另一塊是 Decoder 所組成的。Seq2seq 模型起源於 2014 年 9 月，用在翻譯文章被放到 [Arxiv](https://arxiv.org/abs/1409.3215) 上，當時的架構是透過 RNN 的 LSTM 實作。但是現今所提到的 Seq2seq 模型通常是在說含有 self-attention 的 Transformer 架構。

![](https://i.imgur.com/1haQ3V0.png)

# Encoder
Seq2seq 模型 Encoder 要做的事情，就是給一排向量輸出另外一排向量。然而在 Transformer 的 Encoder 用的就是 self-attention。

![](https://i.imgur.com/5B8pf7h.png)

Encoder 裡面會分成很多的 block，每一個 block 都是輸入一排向量輸出一排向量給另一個 block，直到最後一個 block 輸出最終的 vector sequence。至於每一個 block 其實並不是神經網路的一層。這邊之所以不稱說每一個 block 是一個 layer，是因為每一個 block 裡面的的事情是好幾個 layer 在做的事情。在 Transformer 的 Encoder 裡面，每一個 block 做的事情大約如下。輸入一排向量以後先做一個 self-attention 考慮整個 sequence 的資訊，輸出另一排向量。接下來這一排向量會丟到全連接層的網路，再輸出另外一排向量。此時的向量就是 block 的輸出。

![](https://i.imgur.com/xlZJYjf.png)

事實上在原來的 transformer 裡面他做的事情是更複雜的。輸入一排向量經過 self-attention 後輸出的向量它是考慮所有的輸入以後所得到得結果。在 Transformer 裡面他加入了一個設計，我們不只輸出這個向量，我們同時還要把這個向量加上他原來的輸入當作是新的輸出。這樣的網路架構稱作 residual connection，他會把輸入和輸出加起來得到新的輸出。得到 residual 結果以後，再做 layer normalization。layer normalization 做的事情是輸入一個向量後輸出另外一個向量，這裡不需要考慮 batch 資訊只考慮當前的向量。他會去計算這組輸入向量的 mean 跟 standard deviation。計算出來後就可以做一個 normalize，得到 layer normalization 的輸出。此時的輸出才是全連接網路的輸入，而全連階層網路這邊也有 residual 的架構。所以我們會把全連接網路的輸入跟它的輸出加起來做一下 residual。得到新的輸出這個才是 Transformer Encoder 裡面一個 block 的輸出。


## Reference
[【機器學習2021】Transformer (上)](https://www.youtube.com/watch?v=n9TlOhRjYoc)

[【機器學習2021】Transformer (下)](https://www.youtube.com/watch?v=N6aRv06iv2g)

[簡報](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2021-course-data/seq2seq_v9.pdf)