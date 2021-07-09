---
layout: post
title: '[機器學習] 交叉驗證 K-fold Cross-Validation'
categories: 'AI'
description:
keywords: K-fold Cross-Validation
---

## 前言



- K-Fold Cross-Validation
- Nested K-Fold Cross Validation
- Repeated K-Fold
- Stratified K-Fold
- Group K-Fold


## K-fold Cross-Validation
上一個方法雖然簡單，但是在訓練過程中僅切一份驗證集往往不能夠代表全部。因此我們可以透過一些技巧切割驗證集，使得訓練過程中有一個更公正的評估方式。K-Fold 的方法中 K 是由我們自由調控的，以下圖為例：假設我們設定 K=10，也就是將訓練集切割為十等份。這意味著相同的模型要訓練十次，每一次的訓練都會從這十等份挑選其中九等份作為訓練資料，剩下一等份未參與訓練並作為驗證集。因此訓練十回將會有十個不同驗證集的 Error，這個 Error 通常我們會稱作 loss 也就是模型評估方式。模型評估方式有很多種，以回歸問題來說就有 MSE、MAE、RMSE...等。最終把這十次的 loss 加總起來取平均就可以當成最終結果。透過這種方式，不同分組訓練的結果進行平均來減少方差，因此模型的性能對數據的劃分就不會那麼敏感。

![](/images/posts/AI/2021/img1100708-3.png)

[參考](https://www.datavedas.com/k-fold-cross-validation/)