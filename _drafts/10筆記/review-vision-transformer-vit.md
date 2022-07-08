# [論文導讀] Vision Transformer (ViT)
> An Image is Worth 16x16 Words Transformers for Image Recognition at Scale

Transformer 如今已經成為家喻戶曉的神經網路架構，並且已經大量的應用在自然語言(NLP)任務上。它的成功追朔於 2017 年 Google 所提出的 Attention Is All You Need。這樣的重大突破使得 Google 團隊將這一套 Transformer 架構中的 Encoder 抽離出來變成了 Vision Transformer (ViT) 應用在影像分類技術上。此外它拋棄了 CNN 層並以 self-attention 計算做取代，並在分類問題上取得不錯的成績。

![](https://1.bp.blogspot.com/-_mnVfmzvJWc/X8gMzhZ7SkI/AAAAAAAAG24/8gW2AHEoqUQrBwOqjhYB37A7OOjNyKuNgCLcBGAsYHQ/s16000/image1.gif)
> Google blog 

整體架構如動圖所示，該模型透過將一張影像切成多個 patch 並丟入模型中。接著進到 Transformer Encoder 對輸入的所有資訊進行特徵萃取，最後再經過一個全連接層進行影像分類。雖然講得很簡單(中間我省略很多細節)，但其實內部細節有很多直得討論的地方。接下來將會依序地為各位說明。

## Vision Transformer (ViT)

### 1. 將圖片轉成序列化資訊 (Split image)
為了將一張影像變成一串序列編碼，我們需要把 H×W×C 的影像變成 N×(P²×C)。以下圖為例，假設我們有一張寬(W)和高(H) 32 X 32 的彩色影像(C=3)。Patch size 表示為 (P, P) 範例中使用 4 X 4 大小的 patch。N 表示 pacth 的總數量，其計算方式為 N=HW/P²，在這個例子中我們將會得到 64 個 patches。

![](https://i.imgur.com/A6v7P5D.png)

而論文中範例原始圖片大小為 48 x 48 x 3，Patch Size=16 因此將會把一張圖片切成 9 個 patch，每個 patch 大小為 16 x 16 x 3。第一張 patch 稱為 x¹ₚ，依此類推最後一張為  x⁹ₚ。

![](https://i.imgur.com/KGoxc62.png)

### 2. Linear Projection
此步驟會將原本 N 個 patch 圖片映射成 N 個 D 維的向量。實際的作法是將每個 patch (x¹ₚ ~ xᴺₚ) 攤平(Flatten) 接著乘上一個透過訓練得到的 Linear Projection 稱為 E。E 是一個(P x P x C) x D的矩陣。D 的數字及代表將每個 patch 轉換後的維度，這是一個可以自行控制的超參數。

![](https://i.imgur.com/2J4QZzb.png)

### 3. Position embedding
由於每個 patch 在整張影像中是有順序性的，因此我們需要為這些 patch embedding 向量添加一些位置的資訊。如圖所示，將編號 0~9 的紫色框表示各個位置的 position embedding(編碼方式是透過神經網路學習)，而紫色框旁邊的粉色框則是上一部所提到的經過 linear projection 後的 patch embedding 向量。最後將每個 patch 的紫框和粉框相加後正式得到 Embadded Patches 的輸出。

![](https://i.imgur.com/zCbaI6h.png)