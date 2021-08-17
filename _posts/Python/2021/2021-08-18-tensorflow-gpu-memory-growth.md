---
layout: post
title: '如何在 Tensorflow 中自動選擇空閒 GPU 進行模型訓練？'
categories: 'Python'
description: 'TensorFlow GPU memory growth'
keywords: 
---

## 前言
當你的 TensorFlow 程式使用 GPU 訓練模型。程式執行期間若開啟其他含有 GPU 存取的程式將會發生下面錯誤訊息：

> ValueError: Memory growth cannot differ between GPU devices

其原因是原本的程式佔用了你的電腦中所有 GPU 資源，在預設情況下TensorFlow 會使用所有的 GPU，這時就需要合理分配顯卡資源。因此我們必須在每支程式中讓 TensorFlow 自動選擇空閒的 GPU。

## 解決方法
在程式的最上方加入以下幾行程式碼即可解決 GPU 被佔用問題。由於電腦中可能有多顆 GPU，因此我們透過迴圈去設置 GPU的使用與分配。可以透過 `tf.config.experimental.set_memory_growth` 將 GPU 的存取方式設置為 `僅在需要時申請使用空間`。


```py
import tensorflow as tf

gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)
```