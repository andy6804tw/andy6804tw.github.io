---
layout: post
title: '從 RNN 到 Attention 演進'
categories: 'AI'
description:
keywords:
---

## Many to one
輸入是一個序列，輸出是一個單獨的值。通常處理序列的分類問題，如識別一段文字是否褒貶，或者文字的感情傾向，判斷一段影片的類別等等。

![](https://pic3.zhimg.com/80/v2-f6a78faca0ef59617d01d402fd74ddc2_720w.jpg)

## One to Many
由一個輸入當作起始點，序列開始並進行輸入計算，最終輸出為一個序列。

![](https://pic4.zhimg.com/80/v2-fb27f5a15b3406d4aaa2873f45ed7413_1440w.jpg)

還有一種結構把輸入 x 作為每個階段的輸入。

![](https://pic1.zhimg.com/80/v2-bac5bf8fa22b5f82f4f6668109299500_1440w.jpg)

這種結構一般處理從圖像生成文字、文章生成、詩詞生成或是從類別生成音樂等。

## Many to Many (Seq2seq)
這種結構又叫Encoder-Decoder模型。先將輸入編碼(Encoder)為一個向量c，c的計算方式有很多。

![](https://pic4.zhimg.com/80/v2-83c05998ddeb4b2272e9706d3f15addf_1440w.jpg)

接下來對 c 做解碼(Decoder)，即將 c 當做解碼部分的 `h0` 輸入到Decoder。

![](https://pic1.zhimg.com/80/v2-8ddc61785356dde25346f792914e920c_1440w.jpg)

還有一種做法是將 c 當做每一步輸入。

![](https://pic1.zhimg.com/80/v2-ab5b09e8c34442c47af22357aa12e300_1440w.jpg)

Encoder-Decoder 結構應用範圍主要有:
- 機器翻譯
- 語音識別
- 閱讀理解

## Attention機制
在 Encoder-Decoder 中，Encoder 編碼得到序列特徵 c，這組 c 包含序列中所有重要的訊息。當輸入序列較長時，意味著訊息資料量較多。一個向量 c 可能保存所有輸入的重要訊息，因此 c 的長度就成了限制模型的瓶頸，這樣可能會造成欠擬合發生。舉個例子，在機器翻譯中 "I am a boy." 的 "I" 對 target 中 "我" 的結果影響很大，而其他單詞的影響基本上沒有。因此 Attention 機制在 Decoder 部分每個時間序列輸入不同的 c 解決這個問題。

![](https://pic2.zhimg.com/80/v2-bfdbc3edd116106d6b50bb1a1bd7dde1_720w.jpg)

# Reference
[RNN 知乎](https://zhuanlan.zhihu.com/p/95278797)

## 下篇文章
[[AI學習筆記] 李宏毅課程 Self-Attention 機制解說](https://andy6804tw.github.io/2021/05/02/ntu-self-attention/)