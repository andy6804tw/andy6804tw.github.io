---
layout: post
title: 'Python TensorFlow2 儲存自定義 Graph 模型並轉成 tfjs'
categories: 'AI'
description:
keywords: Graphing Model Created with Model Subclassing
---

## 前言
筆者最近有個專案使用 PyTorch 搭建自定義網路訓練模型，但最近業主想要模型在網頁上推論。這裡提供常見兩種做法，第一種是撰寫 API 將模型部署在伺服器。這種做法優點是快速簡單，直接透過 Python Flask 建立 API。並取得預測結果傳回前端使用者，其缺點是每筆 API Request 都是一筆花費。第二種方式就是將模型放在前端網頁的 JavaScript 中，透過使用者的裝置進行本地預測。如果要用網頁直接呼叫模型預測，最常見做法就是使用 `TensorFlow.js`。當然這也有 Python 與 JavaScript 轉換的坑(看本文就對了)。或是使用 PyTorch 訓練模型，並透過 `ONNX` 轉換格式並在網頁上使用 `onnx.js` 執行。

本篇文章將示範 Python TensorFlow 2 使用 `subclassing` 自定義(Graph)神經網路。並將模型打包成 `TensorFlow.js` 提供網頁進行模型載入與預測。

## 建立網路
由於我的網路架構與訓練都是在 PyTorch，因此可以直接將訓練結果的權重儲存下來。接著用 TensorFlow 重新搭建網路，接著將訓練好的權重匯入初始化。TensorFlow 這端就不需重新訓練了，直接在網路建立時初始化訓練好的權重。以下就簡單用一個線性回歸範例搭建神經網路。

```py
from tensorflow import keras
import tensorflow as tf
import numpy as np

tf.random.set_seed(0)

class network(keras.Model):
    def __init__(self):
        super(network,self).__init__()
        self.a = tf.Variable(tf.random.normal(shape=[2], stddev=1), name='slope')
        self.b = tf.Variable(tf.random.normal(shape=[1], stddev=1), name='intercept')
    def call(self,x):   
        self.out = tf.reduce_sum(self.a * x, 1) + self.b
        return self.out
```

> 筆者的環境是 TensorFlow 2.3.1

模型建立好後執行方式很簡單，建立一個 `network()` 實例 `net`。並將輸入直接放入 `net()` 中，即可觸發 `call()` 函式。記住回傳結果將會是 Tensor 型態，因此可以透過 `.numpy()` 轉回我們熟悉的矩陣型態。

```py
net = network()
net(np.array([[0.6, 0.2]], np.float32)).numpy()
```

這個網路是很簡單的線性方程式 `y=ax+b`，其中 a 是斜率 b 是截距式。因為輸入有兩個，因此可學習的參數有 2 個 a，1 個 b。簡單的計算方式如下圖：

![](/images/posts/AI/2021/img1100607-1.png)

## 儲存模型
模型儲存的方法有很多種，如果是建立 Keras 的網路可以參考這篇[Tensorflow Keras 模型儲存](https://andy6804tw.github.io/2021/03/29/tensorflow-save-model/)。因為我們是建立一個客製化的 `Subclassing` 網路，因此只能夠過 TensorFlow 提供的 `save()` 方法儲存成 pb 檔。

```py
tf.saved_model.save(net, 'checkpoint')
```

儲存後可以發現多了 `checkpoint` 資料夾，其內包含網路架構以及權重。

![](/images/posts/AI/2021/img1100607-2.png)

## 載入模型與測試
此步驟是確保剛剛儲存的模型是正常的。載入模型後試著丟同一筆測資，查看是否有相同結果。

```py
net_1 = tf.saved_model.load('checkpoint')
net_1(np.array([a[0.6, 0.2]], np.float32)).numpy()
```

```
# output
array([2.0581021], dtype=float32)
```

## 轉換成 tensorflowjs
此步驟將剛剛匯出的 TensorFlow 模型架構與權重轉換成 `Tensorflow.js` 格式。首先我們要安裝 tensorflowjs 套件，請開啟翁端機執行以下指令下載：

```bash
pip install tensorflowjs
```

下載完 tensorflowjs 套件後，請將終端機進入到主目錄資料夾。並輸入以下指令：

- `--input_format=tf_saved_model`
    - 指定欲轉換的模型格式
- 後面兩個路徑分別為
    - 欲轉換的模型資料夾
    - 轉換 tfjs 後的存放路徑

```bash
tensorflowjs_converter --input_format=tf_saved_model ./checkpoint ./tfjs_model
```

![](/images/posts/AI/2021/img1100607-3.png)

## 前端網頁載入 TensorFlow 模型
我們這裡需要建立一個靜態網頁，讀取剛剛所匯出的 `tfjs_model` 可以認得的模型架構與權重。此範例程式可以從[這裡](https://github.com/1010code/tefnorflow-graph-model-tutorial/tree/main/web-demo)取得。

### 載入 CDN
請在網頁的 `index.html` 的 body 內最後一行引入 `TensorFlow.js` 所需的函示庫。另外我們在 body 標籤中加入了 `<body onload="init()">`  onload 事件，代表網頁載入時會觸發 `init()` 函式並進行模型載入的動作。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>web-demo</title>
</head>
<body onload="init()">
    
    <h2>Tensorflow.js load model.</h2>
    Please press F12 to open Developer tools. And see inference result.

    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.7.0"></script>
    <script src="./js/index.js"></script>
</body>
</html>
```

### 前端 JavaScript
我們建立一個 `index.js` 來負責讀取模型以及推論。首先 `init()` 函式負責模型載入初始化。由於我們打包的模型是靜態圖架構，並非大家常見的 Keras 模型。因此載入一定要使用 `tf.loadGraphModel()` 才能成功載入。另外一個 `predict()` 函式是進行模型推論預測的動作。首先建立一個 `tensor` 變數並給予正確的輸入陣列。使用 `model.predict()` 進行預測，此時回傳結果會是一個張量的型態。因此可以透過 `dataSync()` 將預測結果取出來，此時就會得到一個陣列。

```js
async function init(){
    model= await tf.loadGraphModel('./tfjs_model/model.json');
    console.log('load model...');
    predict();
}

function predict(){
    let tensor=tf.tensor([[0.6, 0.2]]);
    // 預測 
    const pred = model.predict(tensor);
    const result = pred.dataSync();
    console.log(result[0])
}
```

![](/images/posts/AI/2021/img1100607-4.png)

完整 Code 可以從我的 [GitHub](https://github.com/1010code/tefnorflow-graph-model-tutorial) 中取得！