---
layout: post
title: '[GCP教學-Python] #2 將臨時外部IP改為靜態IP位置'
categories: 'GCP'
description:
keywords: 
---

## 本文擬將會學到
- 在 GCP 中將臨時外部IP改為靜態IP位置

## 前言
使用GCP服務每一個虛擬主機都會配置一個臨時的外部IP，為什麼是臨時呢？臨時有什麼壞處？簡單來說臨時的IP在的主機被關閉後再重啟時，GCP會釋放掉原本的IP位置並另外配置一個新的臨時IP給你。如果你的服務是在監聽原本部署好的IP位置，卻因為重啟必須要在改一次IP豈不是麻煩。因此這篇文章教你如何將臨時外部IP改為靜態IP位置。

<iframe width="560" height="315" src="https://www.youtube.com/embed/nWDTNKKVTSQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

原始GCP會配置一個臨時外部IP給你
![](/images/posts/gcp/2020/img1090328-1.png)
如果把VM停止後你會發現外部IP會被釋放掉
![](/images/posts/gcp/2020/img1090328-2.png)
重啟VM後GCP會再另外配置一組新的外部IP你
![](/images/posts/gcp/2020/img1090328-3.png)

## 將臨時IP改為靜態IP
點選左邊導覽列尋找 VPC網路→外部IP位置

![](/images/posts/gcp/2020/img1090328-4.png)

在類型欄位將臨時更改為靜態就行囉！補充一下，把臨時IP開啟成靜態IP會額外收取一些費用哦！不過這樣做也帶給你方便，不用每次重開起VM時都重新設定新的外部IP。
![](/images/posts/gcp/2020/img1090328-5.png)
