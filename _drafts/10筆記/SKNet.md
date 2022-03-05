## 前言
SKNet 可以說是 SENet 的孿生兄弟。首先 SENet 採用通道注意力機制，一張特徵圖有多少個通道(c)就分成多少的 1*c 向量(每張圖透過全局平均池化)，然後通過注意力機制，使得每個通道的重要性程度不一樣。然而 SKNet 主要是是結合 Inception 和 ResNeXt 的優點並加入了 SENet 對於通道注意力的想法。間單來說此論文提出的 SK block 是在 ResNeXt block 的基礎之上，並加上多分支與注意力機制。SKNet 可以說是啟發自皮質神經元根據不同的刺激可動態調節其自身的感受野。

- 論文： [Selective Kernel Networks](https://arxiv.org/abs/1903.06586) (CVPR 2019)
- 程式碼： [GitHub](https://github.com/implus/SKNet)

## 解析 Selective Kernel Unit（SK block）
SKNet 在一篇電腦視覺注意力機制總結的[論文](https://arxiv.org/abs/2111.07624)中被歸類為分支注意力機制(Branch Attention)的應用。目的是讓神經網路自適應調整感受野，動態的去重組這些特徵，並不像 Inception 一樣去拼接很多特徵圖。一個 SK block 網路主要分成三個步驟：Split、Fuse 、Select。

![](https://i.imgur.com/m3ODi9x.png)

### 1. Split
這一步驟主要是透過不同的卷積核對相同的輸入進行卷積得到不同的特徵圖。首先給定一個輸入 X (特徵圖)，並執行兩個卷積轉換 (Transformation)。其中一個卷機核為 3 另一個為 5，經過卷積過後分別得到 U~ 與 U^ 兩個特徵圖。使用兩種不同 kernel 大小的卷積的含義即有不同的感受野，而隨後的 Fuse 就是參考 SENet 通道注意力的概念萃取重要的資訊。當然分支的數量可以不限，論文中也有進行四個分支的實驗，但實驗結果表明兩個分支數就有不錯的效果了。另外值得一提的是此步驟的卷積操作是採用 Grouped/depthwise/dilated convolutions，為了近一步提升效率這裡的 5*5 卷積核用 dilation=2 的空洞卷積代替。

![](https://i.imgur.com/7MgZWX0.png)

### 2. Fuse
第二步驟為動態的調整感受野，一個直接的想法是用門控 (Gate) 來控制多分支的訊息流。所以在調整之前，應該先將多分支的訊息進行整合。我們已經透過前一個步驟得到 `3*3` 與 `5*5` 的感受野並且透過 element wise summation 相加融合到到一個特徵圖 U。

![](https://i.imgur.com/wddlOTR.png)

將多路分支的特徵圖進行融合之後得到一個特徵圖 U，對整合後的訊息對通道維度使用全局平均池化。接下來的步驟有點類似 SKNet 通道注意力的計算方式，但最後計算注意力分數的方式將稍微不同。在這一步驟對特徵圖 U 做一個全局平均池化得到一個 S 的一維向量(此步驟跟 SENet 的 Excitation 一樣)。之後再對 S 過一個全連接層，先進行 batch normalization 再過 relu 激發最後得到一個 c/r 的降維向量 z (最大維度=32)。

![](https://i.imgur.com/LZAdc3I.png)

### 3. Select
原始的 SENet 是經過兩個全連接層先降維再升維至原來大小(`1*1*c`)最後是用 sigmoid 來計算每個通道的注意力分數。然而在 SKNet 中需要把這個降維後的 z 向量計算注意力向量。因為有兩路分支因此會有 ａ和 b 兩個注意力向量，分別代表應該關注原特徵圖 U~ 和 U^ 的哪些內容。這裡 ac 和 bc 就是 𝑼~ 和 𝑼^ 對應的注意力向量(兩兩一組)，其中 a𝒄 代表第 C 行，也就是 ac 是 a 的第 C 個元素。因此 a1+b1=1、a2+b2=1 所以這也就是為何要採用 softmax 原因，因為要確保同一維度的注意力分數加總要等於1。兩路分支的注意力分數計算完畢後就可以對各自原圖進行 element-wise multiplication 得到分支的注意力特徵圖，最後再 element-wise summation 融合起來得到最終的輸出 V。此時的 V 是對輸入 X 進行自適應調節，得到一個更精確的感受野資訊。

![](https://i.imgur.com/EG30taR.png)

> 大家可以參考[範例程式碼](https://liaowc.github.io/blog/SKNet-structure/)，該文中使用 PyTorch 搭建一個 SK block。

## 實驗結果
作者以 ResNeXt 作為 Backbone 嵌入不同注意力機制模塊進行網路對比。本篇論文提出來的方法雖然在準確路上面有得到重大的創舉。但是讓我們知道可以從例外一個角度使用注意力解決電腦視覺上的問題。

![](https://i.imgur.com/eApGDNn.png)

經過分析作者發現在大多數通道中，當目標物增大時(2.0x) 5*5 卷積核相對所佔的權重也會增加。因為較大的卷積核視野比較大，因此實驗結果也符合我們預期。另外一個發現是，上述的現象只發生在中淺層網路中。然而在深層網路中這個現象中似乎消失了。這是因為在深層網路中對於原始的影像尺度逐漸消失了，因此對於物體的 pattern 也相對應更模糊難以表徵原始的樣貌。因此對於大物體來說中後期的網路層對於大的卷積核的現象不復存在了。作者表示在深層的網路中，特徵的多尺度訊息會被分解，所以對於1.0×、1.5×、2.0× 等不同尺度的目標對象，SKNet 沒有明確的傾向去選擇更大或更小的 kernel。

![](https://i.imgur.com/Atpx7Yy.png)

> 這讓我們審思是否在進行模型研究時，專注於模型淺層的設計會快速達到效果？

## Reference
- [（SKNet）Selective Kernel Network 解析](https://zhuanlan.zhihu.com/p/357206967)
- [SK-Net (Selective Kernel Networks) 架構介紹](https://liaowc.github.io/blog/SKNet-structure/)