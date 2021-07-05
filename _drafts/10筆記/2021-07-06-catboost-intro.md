---
layout: post
title: 'CatBoost: 機器學習 boosting 算法神器'
categories: 'AI'
description:
keywords: Tensorflow
---

## 前言
近日在 Kaggle 打比賽偶然看見有人使用 CatBoost 方法取得不錯的成績，於是就來撰寫文章順便來瞧瞧它與其他 boosting 演算法不同之處。CatBoost 採用決策樹梯度提升方法並宣稱在效能上比 XGBoost 和 LightGBM 更加優化，同時支援 CPU 和 GPU 運算。與其他 boosting 方法相比 CatBoost 是一種相對較新的開源機器學習算法。由一間俄羅斯的公司 Yandex 於 2017 年所提出，同時在 arxiv 有一篇 [CatBoost: unbiased boosting with categorical features](https://arxiv.org/pdf/1706.09516.pdf) 的論文，文中作者有說明 CatBoost 的方法與優點。

![](/images/posts/AI/2021/img1100706-1.png)

## 

