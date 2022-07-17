# [論文導讀] 蒸餾版的 ViT: DeiT (Data-efficient image Transformers)
ViT 在電腦視覺領域中算是一個重大的突破，它拋棄了 CNN 僅用 Transformer 的 Encoder 即可得到不錯的結果。但是由於要訓練一個好的 Transformer 需要非常龐大的資料集。就如 ViT 最後實驗結果發現，必須要使用 Google 所收集的 JFT 幾億張龐大的資料集進行預訓練才能在下游任務上微調得到 SOTA 結果。因此 DeiT 的貢獻就是讓 Vision Transformer 變得更貼近我們一般人使用的需求。DeiT 的目標就是讓網路參數量減少(與 CNN 在同個水平上)、預訓練時需訓練資料集減少(不需要再 JFT 使用 ImageNet1K 即可)。而且不用 TPU 訓練，僅需要用 GPU 訓練三天就可以訓練不錯的預訓練模型。

![](https://i.imgur.com/8VB8gOz.png)
> neptune.ai

## 何謂 DeiT
DeiT 顧名思義就是在資料有限的狀況下，同時能夠保持跟 ViT 一樣的效果甚至比用 CNN 的網路還來得好。他的全名為 Training data-efficient image transformers & distillation through attention。這篇論文發表於 2021 ICML 會議上，並由 Facebook AI 團隊所提出。在這篇論文中 data efficient training 使用了目前在模型上常用的現有技術，大致分成三個部分：訓練網路的優化器、資料增強以及網路訓練的時候的正規化。以上提的這三點都採用現成的方法，因此本篇文章不會花太多時間說明每個的背後原理。而會深度探討如何透過蒸餾法(distillation)來為 DeiT 模型提升到另一個層次。

#### Data efficient training
- Optimization solver
    - AdamW [Loshchilov & Hutter, arXiv’17], Adam with weight decay
- Data augmentation
    - Rand-Augment [Cubuk et al. arXiv’19]
    - Mixup [Zhang et al. arXiv’17]
    - CutMix [Yun et al. arXiv’19]

- Regularization
    - Stochastic depth [Huang et al. ECCV’16]
    - Random erasing [Zhong et al. AAAI’20]
    - Repeated augmentation [Hoffer et al. CVPR’20]
#### Apply distillation to ViT 




## 模型比較
如下圖所示，論文中以 DeiT、ViT、EfficientNet(Noise student) 進行效能與準確度比較。X 軸表示一秒可以分類幾張影像，Y 軸表示模型在 top-1 的準確率，因此越靠近右上方代表越佳(速度又快、準確率又高)。這張圖上的所有模型都採用 ImageNet1K(約140萬張影像) 進行預訓練，而計算效能都採用 Nvidia v100 進行運算。我們可以發現這張圖表中 ViT 在左下腳，相較其他模型是又慢又不準。其不準的原因在一開始有說到 ViT 需要在非常龐大的資料及訓練下才能凸顯優勢，而這張圖的實驗僅使用在中小型的資料集。第二條淡紅色的線是代表僅使用 Data efficient training 技巧訓練模型，雖然明顯有提升一些，但是效果還是不及 CNN based 的 EfficientNet(途中黃色的線)。然而我們將 DeiT 加上蒸餾的技巧訓練模型(如圖紅線)，此時的結果優於 EfficientNet。因此接下來我們就來討論如何進行模型蒸餾技巧。

![](https://i.imgur.com/YAwCIjg.png)

## Distillation (蒸餾)
蒸餾法最初由 Geoffrey Hinton 所提出，而這篇論文將模型蒸餾的概念套用在 Transformer 模型上。然而典型的蒸餾法通常涵蓋兩個網路，分別為 teacher network 和 student network。通常會使用一個比較強大的網路當成 teacher network 來教導一個比較小型的 student network。其目的是讓 student network 模仿 teacher network，有種青出於藍的概念不僅讓模型變的更小同時表現得也很好。

![](https://i.imgur.com/pkgaOrG.png)
> image from [EscVM](https://github.com/EscVM)

在模型蒸餾過程中我們會同時看 teacher 和 student network 的輸出，假設有一個手寫數字的訓練資料同時會放到 teacher 和 student network。teacher network 是一個已經事先訓練好的網路，因此他會為每個類別預測機率(這裡的例子就是 0~9 每類的機率)。而較小的 student network 也會看相同的資料並預測 0~9 每類的機率並輸出。而訓練的 loss 將有兩個，一方面是希望對 Ground truth 越接近越好，因此採用 cross entropy。另外一方面希望 student 與 teacher 預測出來結果非常像，因此可以透過 KL divergence 衡量距離，使得 student 跟 teacher 預測分佈很像。

![](https://i.imgur.com/s7JMdbE.png)

## 兩種 Distillation 方法
蒸餾法的 loss 通常由兩項所構成，依據實作的方法有兩種不同的版本，分別有 soft distillation 和 hard distillation。以 soft distillation 來說左邊這項就是希望 student 預測的結果與 Ground truth 越接近越好(cross entropy loss)。而右邊那一項就是希望 student 和 teacher 的輸出分佈距離要越小越好(KL divergence loss)。其中我們必須透過 lambda(λ) 來控制這兩項彼此的重要性。而 hard distillation 將原本右邊 KL divergence loss 改成一樣用 cross entropy loss，僅學習 teacher 預測的該類別就好，預測其他類別的機率大小不重要只要預測正確即可。

Soft distillation:
- The teacher’s output is soft labels and the used loss is KL divergence.

![](https://i.imgur.com/GJXAUo6.png)

Hard distillation:
- The teacher’s output is hard labels and the used loss is cross entropy.

![](https://i.imgur.com/UnoRLzo.png)

## DeiT 如何讓 Transformer 進行蒸餾
接下來我們就來談談 DeiT 如何讓 Transformer 也能進行模型蒸餾。首先要選擇一個 teacher network 的模型(它可以是 CNN，也可以是 Transformer，最後會有實驗驗證哪個效果最好)，在論文中採用一個 ResNet 變形的 CNN 網路 RegNetY。雖然是採用 CNN 當作 teacher network 但是我們只是模擬它的行為好處，但是他的運作流程還是 Transformer 架構(如下圖所示)我們在 ViT 的基礎上，加上一個 distillation token。class token 的目標是跟真實的標籤(Ground truth)一致，而 distillation token 是要跟 teacher model 預測的標籤一致。

![](https://i.imgur.com/12OLexe.png)

## 為何使用 CNN 當作 teacher model?
其主要原因是因為在小型的資料集上 CNN 模型還是帶來比較好的預測結果。另外 CNN 是專門設計在處理影像任務上的，它的 inductive bias 如： local connectivity 和 weight sharing 具有對影像上的先備知識。因此很適合讓 student 模型進行知識蒸餾並且轉移到 Transformer 模型架構上。

## 實驗結果
DeiT 設計了三種不同大小的模型，實驗參數的設置如下圖表所示。DeiT-B 的參數量正好與 ViT-B 相同，並採用了 data-efficient training 與蒸餾技巧訓練模型。而 DeiT-S 和 DeiT-Ti 是透過漸少 embedding 的維度以及 heads 和 layers 層數，使得模型參數量更少。

![](https://i.imgur.com/JWs1ibc.png)

下圖是比較選擇不同模型當作 teacher model，在 student model 為 DeiT-B 所帶來的效益有多大。我們可以發現原先 teacher 為同樣的 Transformer based 的 DeiT-B 蒸餾效果有限(一樣的東西無互補性，因此沒什麼好學習)。但是如果 teacher model 選擇 CNN based(如 RegNetY) 在不同規模的模型下，大多在蒸餾到 DeiT-B 都有不錯的結果。這就是 inductive bias 融入到 Transformer 的最好證明。因為用 CNN 蒸餾的時候，Transformer 學到了 CNN 的 local connectivity 和 weight sharing 的好處。左邊的 DeiT-B 是訓練在 `224*224` 的影像上，而最右邊 384 代表是將輸入影像畫素提升到 `384*384` 蒸餾在 DeiT-B。從結果也可以發現，提升解析度準度也有明顯的改變。

#### Teacher model
- CNN: one of the four variants of RegNet
- Transformer: DeiT-B


![](https://i.imgur.com/A0SdSMv.png)

接著最後這一張圖是所有模型預訓練在 ImageNet1K 並預測在 ImageNet 上 top-1 的準確率。我們可以發現 DeiT-B 在 data efficient training 和蒸餾的方法上結果都優於 ViT-B。並且所有模型再提高解析度對於 DeiT-B 的模型蒸餾都得到更好的結果。此外拉大訓練的回合數(200->1000)能有效的提升 DeiT-B 準確度。並且能夠取得比當時 SOTA (EfficientNet)更好的的結果。

![](https://i.imgur.com/xUSpq8A.png)

## 結論
DeiT 在資料部分採用了一些數據增強並透過一些模型訓練技巧，例如 AdamW 優化器適當的衰減學習速率以及網路正規化的方法提升模型準確度。除此之外還透過蒸餾法在原先的 ViT-B 架構上添加 distillation token 並有效的學習 teacher model 上的知識。簡單來說 DeiT 就是改變訓練策略的 ViT，然後在 ImageNet 上進行預訓練並透過蒸餾法就能取得 SOTA 的結果。此外在蒸餾模型的部分 teacher model 可以是 CNN，也可是是 Transformer，實驗中CNN 作為 teacher model 的結果更好。