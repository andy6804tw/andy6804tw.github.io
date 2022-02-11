## 前言
CBAM 為提出 BAM 架構的原班人馬，主要是改善原先在 SKNet 上僅使用 GAP 來萃取通道資訊資訊量遺失太多問題以及透過結合通道域和空間域的概念將兩個模塊串連起來形成 CBAM 模型。雖然 BAM 與 CBAM 都被稱為混合域(Channel & Spatial Attention)的代表方法，但是我們也可以說 CBAM 做了不同實驗改善了 BAM 架構。

![](https://i.imgur.com/se8pdv3.png)

- 論文： [CBAM: Convolutional Block Attention Module](https://arxiv.org/abs/1807.06521) (ECCV 2018)
- 程式碼： [GitHub](https://github.com/Jongchan/attention-module)