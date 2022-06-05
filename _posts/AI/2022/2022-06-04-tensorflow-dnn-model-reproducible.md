---
layout: post
title: 'TensorFlow 模型重現實驗結果'
categories: 'AI'
description:
keywords:  Reproducible Results with TensorFlow Keras
---

## 前言
大家都說神經網路是個黑盒子，由於演算法的關係需要為所有的神經元給予初始值。然而這些初始值是透過隨機亂數產生的，因此造就了每次訓練結果都會產生不一樣的結果，雖然這些每次執行結果的差距不會倒非常的大，但是對於實驗研究的朋友應該困擾許多。本篇文章就要教各位如何在模型中鎖定亂數種子，實現模型再現性。

## 為何每次訓練結果都不同？
我們寫的一隻訓練 AI 模型的程式可能都有使用到亂數的時機，例如：

- 切割訓練集與測試集 sklearn 的 train_test_split
- TensorFlow ImageDataGenerator 載入圖片
- 神經網路初始權重 kernel_initializer
- 神經網路 dropout 機制

雖然透過隨機性能夠更有效的展示模型的能力並找到一組最佳參數。但是在平常模型實驗中我們會希望不同的架構或方法都要使用同一組權重或是訓練集，這時候就凸顯了模型再現性必要。

## 實現模型再現性
亂數種子是一種產生亂數的一種規律，如果不鎖住亂數種子的數值，則每次執行結果會因為系統時間的變動性而產生不同的結果。在程式語言當中會有許多套件或函式庫會使用到亂數的機制。

```py
# 設定亂數種子數值
seed_value= 4
# 1. 設定 Python 環境變數亂數種子
import os
os.environ['PYTHONHASHSEED']=str(seed_value)
# 2. 設定 Python 內建亂數生成器亂數種子
import random
random.seed(seed_value)
# 3. 設定 Numpy 亂數種子
import numpy as np
np.random.seed(seed_value)
# 4. 設定 TensorFlow 亂數種子
import tensorflow as tf
tf.random.set_seed(seed_value)
```

筆者為各位做了兩份範例程式分別是 DNN 與 CNN [範例](https://github.com/1010code/tensorflow-reproducibility)。

## 已設定亂數種子為何還是跑出不同結果？
首先要確保你的環境關閉 GPU 計算。在使用 GPU 訓練模型時，硬體平行加速可能會有一些隨機性的產生。因此若要重現模型實驗結果必須關閉 GPU。

```py
# disable GPU
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
```

確保是否有成功關閉 GPU，可以透過以下程式碼偵測系統目前是否有吃到 GPU：

```py
import tensorflow as tf
# 拿取 GPU 資源
physical_devices = tf.config.experimental.list_physical_devices('GPU')
if len(physical_devices) > 0:
    for i in range(len(physical_devices)):
        tf.config.experimental.set_memory_growth(physical_devices[i], True)
print(len(physical_devices), 'devices detect')
```


## Reference 
- [How to Get Reproducible Results with Keras](https://machinelearningmastery.com/reproducible-results-neural-networks-keras/)
- [Keras model的實驗再現性](https://bc165870081.medium.com/keras-model%E7%9A%84%E5%AF%A6%E9%A9%97%E5%9C%A8%E7%8F%BE%E6%80%A7-f0c926af4634)
- [stackoverflow](https://stackoverflow.com/questions/50659482/why-cant-i-get-reproducible-results-in-keras-even-though-i-set-the-random-seeds)
