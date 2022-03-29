---
layout: post
title: 'Tensorflow Keras 模型儲存'
categories: 'AI'
description: Tensorflow Keras save model
keywords: Tensorflow Keras
---
# 前言
Tensorflow 有三種模型儲存方式。第一種是存成 checkpoint 檔(.ckpt)，使用時機是訓練過程中欲保存目前 session 狀態。第二種是存成 pb 檔(.pb)，如果模型架構已確定或是訓練已結束，準備匯出應用時，可以直接存成 pb 檔。第三種是 Keras (目前已合併到 TF2.0) 的 `save()` 直接存成 HDF5 檔(.h5)，HDF 是設計用來儲存和組織大量資料的一組檔案格式，其內容包含了模型架構與權重。本篇文章透過波士頓房價預測資料集，訓練一個 DNN 模型並示範如何匯出與載入 `.pb` 和 `.h5` 模型檔。


## 建構模型
首先我們使用 Tensorflow Keras API 建立一個 Sequential Model，共有兩個隱藏層分別有 16 和 8 個神經元，且都使用 relu 作為激發函數。最後一層輸出層神經元個數為 1 為房價預測輸出，並使用線性作為激發函數。

```py
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential()
model.add(layers.Dense(16, activation='relu',
                       input_shape=(x_train.shape[1],)))
model.add(layers.Dense(8, activation='relu'))
model.add(layers.Dense(1, activation='linear'))
```

模型架構建立好之後，接著設定模型的優化器以及一些超參數。完成後即可編譯模型進行權重初始化，最後再呼叫 `fit()` 進行模型的訓練。


```py
# 編譯模型用以訓練 (設定 optimizer, loss function, metrics, 等等)
model.compile(loss='mse', optimizer=keras.optimizers.Adam(learning_rate=0.05))

# 設定訓練參數
batch_size = 32  # 每次看 batch_size 筆的資料就更新權重
epochs = 50      # 一個 epoch 會看過一次所有的資料

# 訓練模型
model_history = model.fit(x=x_train, y=y_train,
                          batch_size=batch_size,
                          epochs=epochs,
                          validation_data=(x_valid, y_valid),
                          shuffle=True)
```

## 儲存模型
模型訓練完就可以將模型儲存模型囉！上面的範例是建立一個 DNN 的回歸模型，當然 Tensorflow Keras 的任何模型都能適用下面的模型儲存方法，例如 CNN、Simple-RNN、LSTM、GRU...等。以下就提供兩種模型除存的方式：
- HDF5 檔
- pb 檔

#### HDF5 檔
```py
model.save('./weights/boston_model.h5') 
```

![](/images/posts/AI/2021/img1100329-1.png)

#### pb 檔
```py
model.save('./checkpoints/boston_model.pb')
```

![](/images/posts/AI/2021/img1100329-2.png)

> model.save 會保存網絡結構，可以直接載入並預測。
> model.saveweights 只保存權重，需要重新構建網絡，才能加載權重。

## 載入模型
#### HDF5 檔
```py
myModel = keras.models.load_model('./weights/boston_model.h5')
```

#### pb 檔
```py
myModel = keras.models.load_model('./checkpoints/boston_model.pb')
```

## 故障排除
### 問題1
若出現下面錯誤訊息。有些模式下給予儲存的資料夾路徑就可以了，不一定要指向到該檔案。

```
OSError: SavedModel file does not exist at: ./save/model/s/{saved_model.pbtxt|saved_model.pb}
```

```py
# 解決辦法
myModel = keras.models.load_model('./weights')
```
### 問題2
下面錯誤指出，保存的模型裡並沒有保存任何參數設置，例如optimizer的選擇、learning rate ...等。

```
WARNING:tensorflow:No training configuration found in save file, so the model was *not* compiled. Compile it manually.
```

由於推論過程並不需要進行訓練，因此載入模型時加上 `compile=False` 即可。

```py
# 解決辦法
myModel = keras.models.load_model('./weights', compile=False)
```


完整 Code 可以從我的 [GitHub](https://github.com/1010code/tensorflow-save-model) 中取得！