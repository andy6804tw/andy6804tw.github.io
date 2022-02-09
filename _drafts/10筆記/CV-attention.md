
人類可以自然且有效地在復雜的場景中察覺到突出的區域。受到這一點的啟發，注意機制被引入到電腦視覺中，其目的是模仿人類視覺系統。這種注意機制可以看作是一個基於輸入圖像特徵的動態權重調整過程。注意機制在圖像分類、目標檢測、語義分割、影片理解、圖像生成、3D 視覺、多模態任務和自監督學習等視覺任務中取得了巨大的成功。本篇文章參考這篇論文： [Attention Mechanisms in Computer Vision: A Survey](https://arxiv.org/abs/2111.07624.pdf) 總結了電腦視覺中的各種注意機制，並對所有 CV Attention 研究進行分類，例如：通道注意力、空間注意力、時間注意力和分支注意力。相關的論文研究整理也能參考 GitHub 上的 repo： [Awesome-Vision-Attentions
](https://github.com/MenghaoGuo/Awesome-Vision-Attentions) 原作者統整了目前電腦視覺領域中各種注意力機制的研究。

論文首先將基於注意力的模型在計算機視覺領域中的發展歷程大致歸為了四個階段：

1. 將循環神經網路與注意力機制相結合。代表方法為 [RAM](https://www.cnblogs.com/wangxiaocvpr/p/5537454.html)。
2. 透過注意力機制將原始圖片中的空間訊息變換到另一個空間中並保留了關鍵訊息。代表性方法為 STN。
3. 使用通道注意力網路自適應地採樣重要特徵。代表方法為 SENet。
4. 自注意力機制

![](https://i.imgur.com/nj2bZgD.png)


## 為什麼需要視覺注意力？
電腦視覺中的注意力機制的基本概念就是讓機器學會注意力，並能夠忽略無關的訊息從而關注重點訊息。至於為什麼要忽略無關的訊息呢？

## 模型結構簡介 (注意力分類)
就注意力關注的域來分，大致可以分成以下五種：

- 通道注意力 (Channel Attention)
- 空間注意力 (Spatial Attention)
- 時間注意力 (Temporal Attention)
- 分支注意力 (Branch Attention)
- 通道空間注意力 (Channel & Spatial Attention)
- 時空注意力 (Spatial & Temporal Attention)

![](https://i.imgur.com/TeJD9QY.png)

### 1. 通道注意力 (Channel Attention)
在卷積神經網絡中，每一張圖片初始會由 (R，G，B)三通道表示出來，之後經過不同的捲積核之後，每一個通道又會生成新的特徵圖 (feature map)，比如圖片特徵的每個通道使用16核卷積，就會產生16個新通道的矩陣 (H,W,16)，其中 H,W 分別表示圖片特徵的高度和寬度。每個通道的特徵其實就表示該圖片在不同卷積核上的分量，而這裡面用卷積核的捲積類似於信號做了傅立葉變換，從而能夠將這個特徵一個通道的訊息給分解成16個卷積核上的信號分量。既然每個信號都可以被分解成核函數上的分量，產生的新的16個通道對於關鍵訊息的貢獻肯定有多有少，如果我們給每個通道上的信號都增加一個權重，來代表該通道與關鍵訊息的相關度的話，這個權重越大，則表示相關度越高，也就是我們越需要去注意的通道。

![](https://i.imgur.com/sAVqRZc.png)

> 這種結構的原理是想通過控制 scale 的大小，把重要的特徵增強，不重要的特徵減弱，從而讓提取的特徵指向性更強。

#### 1.1 SENet
SENet 就是在通道引入注意力機制 (SE block)，並且可以再多種經典模型中被引入的一種方法。SENet 主要是學習了 feature maps 中 channel 之間的關聯性，並篩選出針對通道的注意力，雖然此方法稍微增加了一點計算量，但是在許多經典網路中進一步提高了辨識準確率。關鍵的兩個操作是 squeeze 和 excitation。其中第一個 squeeze 就是採用全局平均池化為每張 feature map 提取出一個關鍵特徵足以表徵該張圖的內容。接著透過 excitation 通過自動學習的方式，獲取到每個通道特徵的重要程度。最後再用這個重要程度去給每一個特徵通道賦予一個權重值，從而讓神經網路關注某些特徵通道。

![](https://i.imgur.com/Gr6mBUR.png)
![](https://i.imgur.com/uHcxPV8.png)

此中方法也有存在不足的地方，例如像是在 squeeze 模塊中採用全局平均池化過於簡單，無法捕捉複雜的全局訊息。另外在 excitation 模塊中使用全連接層增加了模型複雜性。因此後續的研究中有為此方法做進一步的改善，例如 GSoP-Net 提高 squeeze 模塊的輸出，或是 ECANet 通過改進 excitation 模塊來降低模型的複雜性。又或是同時改善兩者的 SRM。

#### 1.2 GSop-Net
Global Second-order Pooling Convolutional Networks 發表於 CVPR 2019，透過 GSoP 可以充分利用到圖像中的二階統計量以捕捉更多的訊息量。與 SEnet 中的一階注意力機制最大的區別是，本方法提出了2維平均池化透過協方差矩陣差來計算通道之間的關係。

![](https://i.imgur.com/BeHsYFn.png)

`Conv()` 減少了通道數量， `Cov()` 計算協方差，`RC()` 表示行卷積。通過使用二階池化，塊提高了原先在 SE block 上萃取特徵的能力。

![](https://i.imgur.com/veuydLb.png)

#### 1.3 SRM
SRM: A Style-based Recalibration Module for Convolutional Neural Networks 發表於 CVPR 2019。SRM 同時改善了 squeeze 和 excitation 模塊，並提出了一種基於 style 的重新校準模塊 (SRM)。其中 Style Pooling 是 avgpool 和 stdpool 的拼接，而 Style Intergration 就是一個自適應加權融合。

![](https://i.imgur.com/VrBIhZe.png)

#### 1.4 ECANet
ECA-Net: Efficient Channel Attention for Deep Convolutional Neural Networks 發表於 CVPR 2020。與 SENet 相比 ECANet 改進了 excitation 模塊，並且將原有的全連接層替換成 1D CNN，透過共享權重的方式大幅減少參數量。其中 1D CNN 涉及到超參數 k 即為卷積和大小。

![](https://i.imgur.com/qfiWxSo.png)

通道注意力的各種模型比較：

![](https://i.imgur.com/dLnoIuL.png)
![](https://i.imgur.com/oi6mpnN.png)

### 2. 空間注意力 (Spatial Attention)
空間注意力可以被看作是一種自適應的空間區域選擇機制。此方法主要分成四大類：
- RNN-based attention
- Predict the relevant region explicitly
- Predict a soft mask implicitly
- Self-attention based

![](https://i.imgur.com/pccogU0.png)


#### 2.1 Recurrent Models of Visual Attention (RAM)
[RAM](https://www.twblogs.net/a/5b7f308e2b717767c6ae375f) 將循環神經網路與注意力機制相結合，透過硬注意力將重點集中在關鍵區域，從而減少計算量。在此方法中一次在一張圖像中處理不同的位置，逐漸的將這些部分的訊息結合起來，來建立一個該場景或者環境的動態間隔表示。執得一提的是硬注意力的學習過程是不可微的，訓練過程需要透過強化學習來完成。

![](https://i.imgur.com/5Jez7Lx.png)

#### 2.2 Spatial Transformer Networks (STN)
Spatial Transformer Networks (STN) 模型發表於2015年NIPS，此方法透過注意力機制，將原始圖片中的空間訊息變換到另一個空間中並保留了關鍵訊息。先前有些方法透過 max pooling 或 average pooling 將圖片訊息壓縮，減少運算量提升準確率。但作者認為這些 pooling 方法過於暴力，直接將訊息合併會導致關鍵訊息無法識別出來。所以提出了一個叫空間轉換器 (spatial transformer) 的模塊，將圖片中的的空間域訊息做對應的空間變換，從而能將關鍵的訊息提取出來。

![](https://i.imgur.com/OIJOlnq.png)

#### 2.3 GENet
SENet 的原作者隔年發表了 GENet (Exploiting Feature Context in Convolutional Neural Networks)。其中 SENet 是 GENet 的特殊情況，當selection operator 的範圍是整個 feature map 的時候，形式就和 SENet 一樣的，是對一個 channel 裡的所有點都施加一樣的權重。在該論文中提出了 Gather-Excite 兩個模塊。並充分利用空間注意力來更好的挖掘特徵之間的上下文信息。

- Gather 負責聚合每個特徵圖的大鄰域的上下文訊息，用於從局部的空間位置上提取特徵。本質上就是在輸入 x 上進行卷積或者池化操作生成維度減小的 feature map。
- Excite 用於將特徵縮放至原始尺寸。將輸入 feature map x 經過 εG 之後得到的 X̂，使用Nearest Neighbor interpolation（最近鄰插值方法）resize 到 x 相同 shape，經過 sigmoid 後做點積運算。

![](https://i.imgur.com/wHDQrDT.png)

### 2.4 Non-local
Non-local Neural Networks 發表於 CVPR 2018，是第一篇將自注意力機制引入圖像領域的研究。文中提出了經典的 Non-Local 模塊，通過 Self-Attention 機制對全局上下午進行建模，有效地捕獲長距離的特徵依賴。後續許多基於自注意力的方法都是根據 Non-Local 來改進的。

![](https://i.imgur.com/WcPiGEK.png)

空間注意力不同方法實例比較：
![](https://i.imgur.com/P1eFSa8.png)

### 3. 時間注意力 (Temporal Attention)
時間注意力可以被看作是一種動態的時間選擇機制，決定了何時進行注意，因此通常用於影片處理。

![](https://i.imgur.com/scaevKa.png)

### 4. 分支注意力 (Branch Attention)
分支注意可以被看作是一種動態的分支選擇機制，通過多分支結構決定去注意什麼。

![](https://i.imgur.com/LHpkIBI.png)

### 5. 通道空間注意力 (Channel & Spatial Attention)
空間域的注意力是忽略了通道域中的訊息，將每個通道中的圖片特徵同等處理，這種做法會將空間域變換方法局限在原始圖片特徵提取階段，應用在神經網絡層其他層的可解釋性不強。而通道域的注意力是對一個通道內的訊息直接全局平均池化，而忽略每一個通道內的局部訊息，這種做法其實也是比較暴力的行為。所以結合兩種思路，就可以設計出混合域的注意力機制模型。

![](https://i.imgur.com/3BafqVa.png)

### 6. 時空注意力 (Spatial & Temporal Attention)
時空注意力機制可以自適應地選擇重要區域和關鍵幀。

![](https://i.imgur.com/iAqMVxO.png)

## Transformer 為何比 CNN 好？
Transformer 在 NLP 中取得成功，其中 attention 是重要的關鍵元素。更重要的是它丟棄了原先 RNN seq2seq 的架構，並採用 self-attention 在 seq2seq 架構上學習。從最終的訓練結果來看 Transformer 對於大數據的適應能力非常強。這一點非常重要，因為當電腦視覺特別是 CNN 發展到一定階段會遇到一些瓶頸。這些瓶頸來至於訓練的 data scale，因為現在很多 CNN 的模型都是採用於監督式學習。當 CNN 模型採用大量的資料學習以後，我們會發現模型會對資料的適應能力沒有想像中的好。此時 Transformer 的橫空出世將 NLP 任務上得到的經驗套用在電腦視覺領域上面並有不錯的效果。我們能明顯看到隨著數據的增加他的效能可以繼續的成長。至於為何 Transformer 這麼強大呢？其中關鍵因素是它的每個注意力分數是可以動態的，而 CNN 很多學習的參數一但學完以後他就是 fixed 住不動了。

因此這個動態的注意力參數就很厲害了，因為這個模型隨著每次看這個圖會計算一個注意力分數。並透過這組分數幫助模型更關注重點。這也是為什麼最近在 CNN 研究中有個叫 Dynamic Network，其就是引入了這個思想運用在卷積層或是激發層例如：dynamic convolution、dynamic relu。

Attention 其實更關注特徵彼此之間的相互關係。在早期的圖像匹配中最經典的方法是 SIFT 利用特徵點描述及比對來間接兩張圖的關聯性。SIFT 的 interest point 實際上可以學到圖中的哪些點是更突出具有代表性的。CNN 這種模型其實圖過級聯的關係可以學到不同尺度上的資訊，就好比影像中的 interest point。至於 Transformer 考慮了這個特徵學完以後跟另一個特徵他們之間有什麼相對關係。所以從這個角度來看這個模型的適應能力會更好，因為它不完全依賴於數據本身。因此輸入的影像畫素值變的不是非常重要，反而它更關注了物體之間的相互關聯性。然後還有一個事情就是 Transformer 的注意力機制可以不僅僅關注 local 的訊息，它從 local 到 global 這樣一個擴散的機制去尋找表徵。除此之外其實 Transformer 是非常暴力的，它從低階的特徵開始就可以看全局的資訊，並建立與全局關鍵點之間的關聯性。當隨著層數加深這些 local 的點就會聚成了一些 corner point，接著再透過這些內容去找彼此間的關聯性。

![](https://i.imgur.com/K55ywle.png)

話又說回來 CNN 也是有他的可用之處，例如平移、縮放不變性。那將這件事情放到 Transformer 機制上其實是不具備的。因此最簡單的 Transformer 應用到視覺上例如像是目標檢測會出現問題的。因此有相研究將卷積與 Transformer 結合，有一系列的研究例如： Swin、CvT、CSwin、Focal Transformer 等。


[參考](https://www.bilibili.com/video/BV1L3411x7hw/?spm_id_from=trigger_reload)


