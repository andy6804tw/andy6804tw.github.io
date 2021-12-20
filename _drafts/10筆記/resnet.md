
## 前言
穩文將要介紹的是2015年 ILSVR 競賽冠軍的 ResNet(Residual Neural Network, 殘差網路)。ILSVR 是由 ImageNet 所舉辦的年度大規模視覺識別挑戰賽，自從2010年 開辦以來全世界的人都想訓練一個影像分類器打敗人類的 5% 錯誤率的極限。值得一提的是2012年 AlexNet 問世後，開啟了卷積神蹟網路在深度學習的時代。之後的競賽大家都已深度學習網路為主，不斷地挑戰人類的 5% baseline。ResNet 是由微軟研究團隊所開發，它的特點是神經網路的輸入是可以跳耀式的傳遞到深層網路，這也間接的允許我們可以建立更深的神經網路使得模型能學習到更多特徵。

![](https://i.imgur.com/vOOGMhR.png)

## ResNet 簡介
ResNet 主要是解決當神經網路疊的越深直到層數增加到某種程度時，模型的準確率不升反降。這也間接說明了深度模型所造成的模型退化（degradation）情況，因此在不做任何技巧下模型準確率會先上升然後達到飽和，再持續增加深度時則會導致準確率下降。其原因不是過度擬合，而是增加訓練的網路層反而帶來的 training errors。如下圖 CIFAR-10 資料及訓練，在 train 或 test 情況下，56層會比20層產生更多的 error。

![](https://i.imgur.com/8eie43U.png)

透過 Residual block，梯度值可以直接跳回到前幾層的layer有效的減低了消失的問題，所以構建層次更深效率更好的網路model對於ResNet不再是難事，例如2015年初露頭角的ResNet其深度是152層，足足是GoogLeNet 22層的七倍，但Top-5 error rate卻大幅降低了47%。