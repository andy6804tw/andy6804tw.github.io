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

SE block 就是一個型的 channel attention。如果以一個通用的式子表示將會長這樣：

![](https://i.imgur.com/wM9kMaf.png)


## SE block 結合經典模型
SENet 就是在通道引入注意力機制 (SE block)，並且可以再多種經典模型中被引入的一個機制。其中最著名的是 Mobilenet v3 不僅使用了 Google AutoML 搜索神經網路架構外，還引用了 SE block 提升模型準確率。除此之外在物件偵測任務上 Yolo v4 也在卷積層中使用此技巧。論文中 SE 開頭的深度網路名稱，例如： SE-ResNet 或 SE-Inception，便知道那是 ResNet 或 GoogLeNet 與 SeNet 整合的模型。透過實驗比較是否加入 SE block 對於預測準確度是否提升。

![](https://i.imgur.com/DxYcvge.png)

下圖分別說明 SE block 是如何嵌入到主流網絡(Inception和ResNet)中的，Global Pooling 就是 squeeze操作，FC+ReLu+FC+Sigmoid 就是excitation 操作，具體過程就是首先通過一個全連接層(FC)，將特徵維度降低到原來的 1/r，然後經過ReLu激活函數再通過一個全連接層(FC)生回到原來的特徵維度 C，然後通過 Sigmoid 函數轉化成一個 0~1 的正規化權重。這裡全連結層參數隨着 loss 不斷地迭代更新。

![](https://i.imgur.com/njP84HI.png)

## 論文實驗
關於 SENet 結構作者在論文中分別進行多項實現，並比較在哪種網路架構下能得到更好的結果。

#### Squeeze 結構中哪種池化方式較好？
Ans: 全局平均池化 (GAP)

![](https://i.imgur.com/5d56M53.png)

#### Excitation 結構中 reduction 值設置多少比較好？
在 Excitation 中是一個 Bottleneck 結構的全連階層，首先降維到一個尺度再升維回去原來的 C。這個降維到多少就是一個超參數，在論文實驗中分別對 r 設定 2, 4, 8, 16, 32。

Ans: r=16 (在精度和模型尺寸取得平衡)

![](https://i.imgur.com/SeIhZgl.png)

#### Excitation 結構中哪種激發函數較好？
這裡可能很多人會納悶計算 Attention 分數為何不用 Softmax 正規化 0~1 之間，同時可以解釋關注該通道的機率大小為何。但是以實驗結果來說 Sigmoid 效果是比較好的。關於論點說明可以參考[這篇](https://amaarora.github.io/2020/07/24/SeNet.html)文章。裡面說到如果用 Softmax 即代表是觀察所有的 feature map 並篩選重要的那一張，但是這個缺點就是訊息丟失會變得非常嚴重。而採用 Sigmoid 的含義就是以每一張的 feature map 為單位，計算看該張特徵圖訊息的重要程度為多少。因此每一張的 feature map 關注分數都是獨立計算效果會比較好。

> Sigmoid layer makes so much sense rather than Softmax(which would generally impose importance on only one of the channels). A Sigmoid function (which is also used in multi-label classification)

Ans: Sigmoid

![](https://i.imgur.com/y5Yily8.png)

#### ResNet50 中在哪幾個 block 加入 SE block 效果較好？
本論文提出的 SE block 可以靈活的加入在各種經典 CNN 網路當中。作者使用 ResNet50 進行實驗分別在每一層加入，最後結果是在每一層都加上 SE block 效果最好。

Ans: 每個 block 都加最好

![](https://i.imgur.com/vscs2px.png)

#### 將 SE block 放在殘差結構的哪個位置較好？
透過不同的組合我們可以發現 SE-PRE 效果是最佳的。

Ans: SE-PRE 最好

![](https://i.imgur.com/TPc71QQ.png)

[【CV中的注意力機制】SENet](https://www.bilibili.com/video/BV1QA411F7rR/?spm_id_from=333.788.recommend_more_video.10)