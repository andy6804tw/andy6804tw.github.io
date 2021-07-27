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
這裡來思考一個問題。當我們把 RNN 去掉只保留 Attention，僅利用 Attention 搭建一個神經網路用來取代 RNN。那我們該怎麼做呢？接下來我們會來詳細討論，從零開始基於 Attention 搭建一個神經網路的整個流程。首先在本篇文章我們先將之前學過的 RNN + Attention 開始入手，在抽取掉 RNN 保留 Attention。然後搭建一個 Attention 與 self-attention 網路層。下一篇文章會再將這些概念組裝起來，搭建一個深度的 Seq2seq 模型。搭出來的模型就是當今最紅的 Transformer。

