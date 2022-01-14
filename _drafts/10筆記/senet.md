[CNN 經典模型] 通道域注意力機制 (SENet)

SENet 的全名是 Squeeze-and-Excitation Networks，該論文於 2018 CVPR 由一家自駕車公司(Momenta)與牛津大學共同發表。在發表之前 SENet 贏得了 ImageNet 最後一屆（2017年）的圖像識別冠軍。SENet 主要是學習了 feature maps 中 channel 之間的關聯性，並篩選出針對通道的注意力，雖然此方法稍微增加了一點計算量，但是在許多經典網路中進一步提高了辨識準確率。

- 論文： [Squeeze-and-Excitation Networks](https://arxiv.org/abs/1709.01507)
- 程式碼： [GitHub](https://github.com/hujie-frank/SENet)


## Squeeze-and-Excitation Blocks
此篇論文的重點就是在通道維度增加注意力機制，關鍵的兩個操作是 squeeze 和 excitation，因此作者將這個 attention 結構命名為 SE block，其目地是要篩選 feature maps 中重要的特徵圖。其中 excitation 就是說通過自動學習的方式，獲取到每個通道特徵的重要程度，然後用這個重要程度去給每一個特徵通道賦予一個權重值，從而讓神經網路關注某些特徵通道，即提升對當前任務有用的特徵通道並抑制對當前任務用處不大的特徵通道。

![](https://i.imgur.com/Gr6mBUR.png)

通道注意力的具體流程如上圖所示。一開始是基本的 CNN 給定一個輸入 x 其特徵通道數為 C'，通過一系列卷積(F<sub>tr</sub>)變換後得到一個特徵通道為 C 的 feature maps 特徵。這裡與傳統 CNN 不一樣的是，接下來將通過三個步驟來重新篩選前面得到的特徵圖。

第一個步驟： Squeeze(F<sub>sq</sub>)，透過全局池化(Global Pooling)，將每個通道的二維特徵(HxW)壓縮成一個實數，經過實驗論文最後使用 global average pooling 的方式實現。此做法屬於空間維度的一種特徵壓縮，因為這個實數是根據所有特徵值計算出來的，所以在某種程度上具有平均感受野，最後保持通道數不變，所以通過 squeeze 操作後變為 1x1xC：

![](https://i.imgur.com/WJpZdi2.png)

第二個步驟： Excitation(F<sub>ex</sub>)，通過參數來為每個特徵通道生成一個權重值。論文是通過兩個全連接層組成一個 Bottleneck 結構去建模通道間的相關性，首先降維至原來輸入的 r 分之一，接著再升維到原始長度(c)輸出特徵數通道的權重值。

![](https://i.imgur.com/Hn4ZfIa.png)

第三個步驟： Scale(F<sub>sacle</sub>)，將前面得到的權重加權到每個通道的特徵上。論文中的方法是採用乘法，每個通道乘以權重，完成在通道維度上引入 attention 機制。


## SE block 結合經典模型
SENet 就是在通道引入注意力機制 (SE block)，並且可以再多種經典模型中被引入的一個機制。其中最著名的是 Mobilenet v3 不僅使用了 Google AutoML 搜索神經網路架構外，還引用了 SE block 提升模型準確率。除此之外在物件偵測任務上 Yolo v4 也在卷積層中使用此技巧。論文中 SE 開頭的深度網路名稱，例如： SE-ResNet 或 SE-Inception，便知道那是 ResNet 或 GoogLeNet 與 SeNet 整合的模型。透過實驗比較是否加入 SE block 對於預測準確度是否提升。

下圖分別說明 SE block 是如何嵌入到主流網絡(Inception和ResNet)中的，Global Pooling就是squeeze操作，FC+ReLu+FC+Sigmoid就是excitation操作，具體過程就是首先通過一個全連接層(FC)，將特徵維度降低到原來的1/r，然後經過ReLu激活函數再通過一個全連接層(FC)生回到原來的特徵維度C，然後通過Sigmoid函數轉化成一個0~1的正規化權重。這裏全連接層參數隨着loss不斷迭代更新。

![](https://i.imgur.com/njP84HI.png)