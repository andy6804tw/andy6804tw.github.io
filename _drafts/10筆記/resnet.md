
## 前言
本文將要介紹的是2015年 ILSVR 競賽冠軍的 ResNet(Residual Neural Network, 殘差網路)。ILSVR 是由 ImageNet 所舉辦的年度大規模視覺識別挑戰賽，自從2010年 開辦以來全世界的人都想訓練一個影像分類器打敗人類的 5% 錯誤率的極限。值得一提的是2012年 AlexNet 問世後，開啟了卷積神蹟網路在深度學習的時代。之後的競賽大家都已深度學習網路為主，不斷地挑戰人類的 5% baseline。ResNet 是由微軟研究團隊所開發，它的特點是神經網路的輸入是可以跳耀式的傳遞到深層網路，這也間接的允許我們可以建立更深的神經網路使得模型能學習到更多特徵。當年冠軍的 ResNet 其深度是152層，約莫是 GoogLeNet 22層的七倍，但Top-5 error rate卻大幅降低了47%。

![](https://i.imgur.com/vOOGMhR.png)

## ResNet 簡介
ResNet 主要是解決當神經網路疊的越深直到層數增加到某種程度時，模型的準確率不升反降的問題。這也間接說明了深度模型所造成的模型退化(degradation)情況。因此在不做任何技巧下模型準確率會先上升然後達到飽和，再持續增加深度時則會導致準確率下降。其原因不是過度擬合，而是增加訓練的網路層反而帶來的 training errors。如下圖 CIFAR-10 資料及訓練，在 train 或 test 情況下，56層會比20層產生更多的 error。

![](https://i.imgur.com/8eie43U.png)

## Residual Learning 主要解決什麼問題？
從上面那張實驗圖可以得知擁有56層網路錯誤率遠遠比20層還來得大。這很明顯不是過度擬合所造成的。另外梯度的爆炸/消失的問題通常都使用 Bacth Normalization 來解決。至於模型退化的主因是，非線性的激發函數 Relu 的存在，使得每次輸入到輸出的過程都幾乎是不可逆的造成資訊損失。因此殘差學習的初衷，其實是讓模型的內部結構至少有恆等對映(identity mapping)的能力。以保證在堆疊網路的過程中，網路至少不會因為繼續堆疊而產生退化。


## Residual Block 結構
Residual block 透過 shortcut connection 實現，如下圖所示使用 shortcut 將這個 block 的輸入和輸出進行一個 element-wise 的相加，這個簡單的加法並不會給網路增加額外的參數。當模型的層數加深時，這個簡單的結構能夠很好的解決退化問題。如果把網路設計為 H(x) = F(x) + x，即直接把恆等對映作為網路的一部分 。就可以把問題轉化為學習一個殘差函式F(x) = H(x) - x.

![](https://i.imgur.com/XbmFMhL.png)

假設 Residual Block 的輸入為 x，則輸出 y 等於以下公式(左)。其中 F 是學習的目標，即輸出輸入的殘差。殘差部分是中間有一個 Relu 雙層權重(w1, w2)，即公式(右)。

![](https://i.imgur.com/YTwItvt.png)

下圖為殘差網絡的結構，以 ResNet18 為例：
- ResNet18、34 都是由 BasicBlock 組成的，並且從表中也可以得知，50層(包括50層)以上的 ResNet 才由 Bottleneck 組成。
- 有類型的 ResNet 卷積操作的通道數(無論是輸入通道還是輸出通道)都是64的倍數
- 所有類型的 ResNet 的卷積核只有3x3和1x1兩種
- 除了公共部分(conv1)外，都是由4大塊組成(con2_x,con3_x,con4_x,con5_x,)

![](https://i.imgur.com/fOVxW2n.png)
![](https://i.imgur.com/UOR4lCx.png)

眼尖的你可能會發現這些殘差網路有實線與虛線。這些虛線的代表這些 Block 前後的維度不一致，因為 ResNet18 參照了 VGG 經典的設計，每隔x層，空間上/2（downsample）但深度翻倍。為了解決深度不一致問題，論文中採用 1*1 的卷積層進行升維。

殘差網絡一般就是由下圖這兩個結構組成的。ResNet18、34 都是由 BasicBlock 組成的。50層以上的 ResNet 才由 Bottleneck 組成。兩者差別在於當有 1x1 卷積核的時候，我們稱 bottleneck。

![](https://i.imgur.com/rw9OHd5.png)

## Reference
- [1] Kaiming He et all.,"[Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)", CVPR 2016.


https://meetonfriday.com/posts/7c0020de/ 白話介紹
