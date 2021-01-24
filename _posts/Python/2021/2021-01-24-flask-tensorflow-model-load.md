---
layout: post
title: '[Python Flask] keras/tensorflow 部署模型全域載入一次方法'
categories: 'Python'
description: 'flask load the model once'
keywords: 'is not an element of this graph'
---

## 前言
當要將訓練好的模型寫成 Python Flask API 時，第一個步驟載入模型並存成全域變數。每一次 Request 時就不必重新載入模型，即可立即 `model.predict()`。但是因為 Tensorflow session 問題會造成在每次呼叫時發生以下問題:

<img src="/images/posts/Python/2021/img1100124-1.png">

```
ValueError: Tensor Tensor(“xxx:0”, shape=(), dtype=float32) is not an element of this graph.
```

其原因是 Flask 或 Django 後端執行過後，會把一開始我們建立的 Tensorflow 後端靜態圖的內存清理。所以後來輸入靜態圖時 Tensorflow 會重新建立一個空靜態圖，與之前類初始化時創建好的靜態圖不同。因此我們要手動自己建立自己的後端靜態圖。

## 方法一
此方法是比較單純，無結構化寫法。支援 TF2.0以上。模型在初次啟動 API 時就已經將參數載入，可省去讀取的時間。剩下就等待若有新的請求預測時直接進行預測。

```py
import tensorflow as tf
from tensorflow.keras.backend import set_session

sess = tf.Session()
graph = tf.compat.v1.get_default_graph()
set_session(sess)
# 先載入是訓練的模型
model = "Your Model Network"
model.load_weights(model_path)

# 在 API  Router 中每次請求模型預測時
global sess
global graph
with graph.as_default():
    set_session(sess)
    model.predict()
```

## 方法二 (Class寫法)
此寫法將模型載入即預測包成一個類別並且做實例。其優點是程式碼好管理，容易掌握模型。這樣寫的好處是只需要一次把模型透過 class 載入到 keras 並帶入後端 Tensorflow 的靜態圖中。

```py
import tensorflow as tf
from tensorflow.keras.backend import set_session

class MyModel():
    def __init__(self):
        # init backend graph
        self.sess = tf.Session()
        self.GRAPH = tf.compat.v1.get_default_graph()
        set_session(self.sess)
        self.model = "Your Model Network"
        self.model.load_weights(model_path)

    def inference(self, input):
        # run model
        with self.GRAPH.as_default():
            set_session(self.sess)
            model.predict()

myModel = MyModel()
result = myModel.inference(input)
```