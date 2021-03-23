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
這裡我們使用 Standardization 平均&變異數標準化。我們可以先檢查 X_train 的原先分布狀況，輸入共有四個特徵因此會有四組平均值與標準差。接著我們採用 StandardScaler 來為這些資料進行平均值=0、標準差=-1的資料縮放。可以看到我們先透過 `StandardScaler().fit(X_train)` 以訓練資料集擬合做一個標準化的 `scaler`。接著透過 `scaler.transform(X_train)` 來為我們的目標資料也就是 `X_train` 進行轉換， `X_train_scaled` 即是標準化過後的訓練資料。同樣的我們可以透過 `X_train_scaled` 來查看平均值與標準差，可以發現由於是以 `X_train` 為基準縮放出來的資料所有特徵的平均值都為 0、標準差為 1。

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

## 儲存Scalar
pickle 是一個 Python 壓縮/保存/提取文件的函式庫。我們可以透過它來儲存擬合好的 Scaler。載入 `pickle` 套件後使用 `dump()` 函式來儲存，輸出以 X_train 為基準的 Scalar。檔名為 `scaler.pkl`。

```py
from pickle import dump

# save the scaler
dump(scaler, open('scaler.pkl', 'wb'))
```

## 載入Scalar
如果其他檔案需要進行資料前處理可以直接透過 `pickle` 中的 `load()` 函式來載入 `scaler.pkl`。載入以 X_train 為基準的 Scalar，當有新的資料要測試時，資料前處理可以載入先前轉換好的Scalar直接進行transform。

```py
from pickle import load

# load the scaler
myScaler = load(open('scaler.pkl', 'rb'))
```

#### 驗證載入的Scalar在訓練資料集的轉換
可以發現透過 pickle 載入 scaler.pkl 轉換後的 X_train 平均值與標準差分別為 0 與 1。跟先前一模一樣，此步驟是確保先前 fit 的 StandardScaler參數是否有缺失。

```py
X_train_scaled = myScaler.transform(X_train)

# scaled之後的資料零均值，單位方差  
print('資料集 X_train 的平均值 : ', X_train.mean(axis=0))
print('資料集 X_train 的標準差 : ', X_train.std(axis=0))

print('\nStandardScaler 縮放過後資料集 X 的平均值 : ', X_train_scaled.mean(axis=0))
print('StandardScaler 縮放過後資料集 X 的標準差 : ', X_train_scaled.std(axis=0))
```

```
資料集 X_train 的平均值 :  [5.827 3.035 3.742 1.194]
資料集 X_train 的標準差 :  [0.78049407 0.43066809 1.75272245 0.76181625]

StandardScaler 縮放過後資料集 X 的平均值 :  [-0. -0. -0.  0.]
StandardScaler 縮放過後資料集 X 的標準差 :  [1. 1. 1. 1.]
```

#### 測試資料進行轉換
我們可以發現以 X_train 為基準的 Scaler 在測試資料集 X_test 中轉換後的平均值與標準差都分別趨近於 0 與 1。

```py
X_test_scaled = myScaler.transform(X_test)

# scaled之後的資料零均值，單位方差  
print('資料集 X_test 的平均值 : ', X_test.mean(axis=0))
print('資料集 X_test 的標準差 : ', X_test.std(axis=0))

print('\nStandardScaler 縮放過後資料集 X 的平均值 : ', X_test_scaled.mean(axis=0))
print('StandardScaler 縮放過後資料集 X 的標準差 : ', X_test_scaled.std(axis=0))
```

```
資料集 X_test 的平均值 :  [5.876 3.092 3.792 1.208]
資料集 X_test 的標準差 :  [0.90742713 0.43259219 1.76961465 0.75811345]

StandardScaler 縮放過後資料集 X 的平均值 :  [0.06278075 0.13235251 0.02852705 0.01837713]
StandardScaler 縮放過後資料集 X 的標準差 :  [1.16263167 1.00446771 1.00963769 0.99513951]
```

## 結語
機器學習模型保存常見的套件有 pickle、joblib 這兩種。pickle 是可移植的，且可以在 Linux 下建立一個 pickle，然後將它傳送到在 Windows 或 Mac OS 下執行的 Python 程式執行。如果內容是複雜物件時，可能會遇到一些問題。joblib 相對的透過二進位編碼，優點是效率很高，讀取速度也相對 pickle 快。如果資料及過於龐大狀態下建議可以採用 joblib 套件進行資料的模型存取。

完整 Code 可以從我的 [GitHub](https://github.com/1010code/learn-sklearn-preprocessing) 中取得！