## 前言
SKNet 可以說是 SENet 的孿生兄弟。SENet 採用通道注意力機制，一張特徵圖有多少通道數(c)就分成多少的 1*c 向量(每張圖透過全局平均池話)，然後通過注意力機制，使得每個通道的重要性程度不一樣。


- 論文： [Selective Kernel Networks](https://arxiv.org/abs/1903.06586) (CVPR 2019)
- 程式碼： [GitHub](https://github.com/implus/SKNet)




## 實驗結果
作者以 ResNeXt 作為 Backbone 嵌入不同注意力機制模塊進行網路對比。本篇論文提出來的方法雖然在準確路上面有得到重大的創舉。但是讓我們知道可以從例外一個角度使用注意力解決電腦視覺上的問題。

![](https://i.imgur.com/eApGDNn.png)