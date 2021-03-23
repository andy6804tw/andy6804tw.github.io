---
layout: post
title: '機器學習資料前處理Scaler儲存'
categories: 'AI'
description:
keywords: sklearn preprocessing
---

## 前言
在機器學習模型訓練之前往往會先進行資料處理。常見的處理方式是採用 `sklearn.preprocessing` 的 API，裡面提供許多種資料前處理技巧。例如 StandardScaler、MinMaxScaler...等，更多詳細內容可以參考[這篇](https://ithelp.ithome.com.tw/articles/10240494)。然而在模型上線時，實際現場取得的資料要如何處理呢？想想看，我們為了讓模型有更好泛化能力，必須採用訓練集的資料的基準為新的一筆資料進行縮放前處理。因此我們可以先將 fit 好的 Scaler 模型儲存起來，如果每一筆新資料進來時就不用重新載入訓練集 `fit()` 一次 Scaler，而是直接載入  Scaler 後直接 `transform()`。

以下教學就來教各位如何將擬合好的 Scaler 儲存下來，並重新載入使用吧！

## 載入資料集
假設我們有一組訓練資料(X_train、y_train)，這些資料是會進入訓練階段的，因此我們會將這些資料一同進行前處理。而測試資料(X_test、y_test)是模擬現場實際取得的資料集，因此這些資料不參與訓練以及資料前處理的擬合。

- X_train、y_train 當作是訓練模型所用的資料
- X_test、y_test 當作是模型落地後實際場域收到的數值

## sklearn.preprocessing 資料前處理
這裡我們使用 Standardization 平均&變異數標準化

```py
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler().fit(X_train)
X_train_scaled = scaler.transform(X_train)

# scaled之後的資料零均值，單位方差  
print('資料集 X_train 的平均值 : ', X_train.mean(axis=0))
print('資料集 X_train 的標準差 : ', X_train.std(axis=0))

print('\nStandardScaler 縮放過後資料集 X_train 的平均值 : ', X_train_scaled.mean(axis=0))
print('StandardScaler 縮放過後資料集 X_train 的標準差 : ', X_train_scaled.std(axis=0))
```

```
資料集 X_train 的平均值 :  [5.827 3.035 3.742 1.194]
資料集 X_train 的標準差 :  [0.78049407 0.43066809 1.75272245 0.76181625]

StandardScaler 縮放過後資料集 X_train 的平均值 :  [-0. -0. -0.  0.]
StandardScaler 縮放過後資料集 X_train 的標準差 :  [1. 1. 1. 1.]
```