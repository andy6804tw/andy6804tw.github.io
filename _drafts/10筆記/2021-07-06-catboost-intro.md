---
layout: post
title: 'CatBoost: 機器學習 boosting 算法神器'
categories: 'AI'
description:
keywords: Tensorflow
---

## 前言
近日在 Kaggle 打比賽偶然看見有人使用 CatBoost 方法取得不錯的成績，於是就來撰寫文章順便來瞧瞧它與其他 boosting 演算法不同之處。其中最特別的地方是 CatBoost 能夠處理非數值型態的資料，也就是説無需對數據特徵進行任何的預處理就可以將類別轉換爲數字。CatBoost 採用決策樹梯度提升方法並宣稱在效能上比 XGBoost 和 LightGBM 更加優化，同時支援 CPU 和 GPU 運算。與其他 boosting 方法相比 CatBoost 是一種相對較新的開源機器學習算法。該演算法是由一間俄羅斯的公司 Yandex 於 2017 年所提出，同時在 arxiv 有一篇 [CatBoost: unbiased boosting with categorical features](https://arxiv.org/pdf/1706.09516.pdf) 的論文，文中作者有說明 CatBoost 的方法與優點。

![](/images/posts/AI/2021/img1100706-1.png)

## CatBoost 優點
CatBoost 名稱源於 Category 和 boost 兩個單詞，承襲 boosting 的優點之外該演算法在類別型的特徵上做了一些更公平的特徵工程。訓練過程中允許沒有編碼的類別特徵，透過分類和數字特徵組合的各種統計量為類別型的特徵做編碼。不過在訓練前必須確保該特徵中無缺失值。其訓練資料若有缺失值 CatBoost 預設會將數值型的資料補上最小值，詳細內容可以[參考](https://catboost.ai/docs/concepts/algorithm-missing-values-processing.html#numerical-features)。另外對於 GPU 的使用者，它也能處理字串(類別)型態的特徵。

- 自動處理類別型的特徵
- 自動處理缺失值
- 可以處理各種數據類型，如音頻、文字、圖像
- 減少人工調參的需要，並降低了過擬合的機會


## CatBoost 安裝
CatBoost 演算法可以解決分類(CatBoostClassifier)和回歸(CatBoostRegressor)的問題。安裝的方式也非常簡單，使用 `pip` 就能輕鬆安裝。

```
pip install catboost
```


如果需要手動處理 Overfitting 問題可以參考這份官方[文件](https://catboost.ai/docs/features/overfitting-detector-desc.html) 


## Reference
- [Tutorial: CatBoost Overview](https://www.kaggle.com/mitribunskiy/tutorial-catboost-overview)
- [SHAP Catboost tutorial](https://shap.readthedocs.io/en/latest/example_notebooks/tabular_examples/tree_based_models/Catboost%20tutorial.html)