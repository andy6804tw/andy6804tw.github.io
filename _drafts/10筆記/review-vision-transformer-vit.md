# [論文導讀] Vision Transformer (ViT)
> An Image is Worth 16x16 Words Transformers for Image Recognition at Scale

Transformer 如今已經成為熱門的神經網路架構，並且已經大量的應用在自然語言(NLP)任務上。它的成功追朔於 2017 年 Google 所提出的 Attention Is All You Need。這樣的重大突破使得 Google 團隊將這一套 Transformer 架構中的 Encoder 抽離出來變成了 Vision Transformer (ViT) 應用在影像分類技術上。此外它拋棄了 CNN 層並以 self-attention 計算做取代，並在分類問題上取得不錯的成績。

![](https://1.bp.blogspot.com/-_mnVfmzvJWc/X8gMzhZ7SkI/AAAAAAAAG24/8gW2AHEoqUQrBwOqjhYB37A7OOjNyKuNgCLcBGAsYHQ/s16000/image1.gif)
> Google blog 

整體架構如動畫所示，該模型透過將一張影像切成多個 patch 並丟入模型中。接著進到 Transformer Encoder 對輸入的所有資訊進行特徵萃取，最後再經過一個全連接層進行影像分類。雖然講得很簡單(中間我省略很多細節)，但其實內部細節有很多直得討論的地方。接下來將會依序地為各位說明。

## Vision Transformer (ViT)

### 1. 將圖片轉成序列化資訊 (Split image)
為了將一張影像變成一串序列編碼，我們需要把 H×W×C 的影像變成 N×(P²×C)。以下圖為例，假設我們有一張寬(W)和高(H) 32 X 32 的彩色影像(C=3)。Patch size 表示為 (P, P) 範例中使用 4 X 4 大小的 patch。N 表示 pacth 的總數量，其計算方式為 N=HW/P²，在這個例子中我們將會得到 64 個 patches。

![](https://i.imgur.com/A6v7P5D.png)

而論文中範例原始圖片大小為 48 x 48 x 3，Patch Size=16 因此將會把一張圖片切成 9 個 patch，每個 patch 大小為 16 x 16 x 3。第一張 patch 稱為 x¹ₚ，依此類推最後一張為  x⁹ₚ。

![](https://i.imgur.com/KGoxc62.png)

### 1.1 Patch layer 實作
參考 Keras 官方 [ViT tutorial](https://keras.io/examples/vision/image_classification_with_vision_transformer) 的寫法，採用 `tf.image.extract_patches()` 依序地為整張影像進行 `patch_size*patch_size` 大小的切割。

```py
import tensorflow as tf
from tensorflow.keras import layers

class Patches(layers.Layer):
    def __init__(self, patch_size):
        super(Patches, self).__init__()
        self.patch_size = patch_size

    def call(self, images):
        batch_size = tf.shape(images)[0]
        patches = tf.image.extract_patches(
            images=images,
            sizes=[1, self.patch_size, self.patch_size, 1],
            strides=[1, self.patch_size, self.patch_size, 1],
            rates=[1, 1, 1, 1],
            padding="VALID",
        )
        patch_dims = patches.shape[-1]
        patches = tf.reshape(patches, [batch_size, -1, patch_dims])
        return patches
```

![](https://i.imgur.com/1UyoTRO.png)

[範例程式]()

### 2. Linear Projection
此步驟會將原本 N 個 patch 圖片映射成 N 個 D 維的向量。實際的作法是將每個 patch (x¹ₚ ~ xᴺₚ) 攤平(Flatten) 接著乘上一個透過訓練得到的 Linear Projection 稱為 E。E 是一個(P x P x C) x D的矩陣。D 的數字及代表將每個 patch 轉換後的維度(projection_dim)，這是一個可以自行控制的超參數。

![](https://i.imgur.com/2J4QZzb.png)

### 2.1 Linear Projection 實作

```py
class PatchEncoder(layers.Layer):
    def __init__(self, num_patches, projection_dim):
        super(PatchEncoder, self).__init__()
        self.num_patches = num_patches
        self.projection_dim = projection_dim
        self.projection = layers.Dense(units=projection_dim)

    def call(self, patch):
        encoded = self.projection(patch)
        encoded = tf.reshape(encoded, [-1, self.num_patches, self.projection_dim])
        return encoded
```

> 注意在 Keras blog 中 PatchEncoder 的寫法有同時處理 Position embedding，但在這範例中並無加入位置資訊(稍後會提到)。

### 3. Position embedding
由於每個 patch 在整張影像中是有順序性的，因此我們需要為這些 patch embedding 向量添加一些位置的資訊。如圖所示，將編號 0~9 的紫色框表示各個位置的 position embedding(編碼方式是透過神經網路學習)，而紫色框旁邊的粉色框則是上一部所提到的經過 linear projection 後的 patch embedding 向量。最後將每個 patch 的紫框和粉框相加後正式得到 Embadded Patches 的輸出。

![](https://i.imgur.com/zCbaI6h.png)

值得一提的是 ViT 巧妙的運用 learnable class token 學習每個 patch 和目標物的關聯性。因此在圖中的最左邊有一個 `*` 的 Patch Embedding 是透過訓練得到的 [CLS] Embedding。因此這裡的 x⁰ₚ 經過 encoder 後對應的結果作為整個圖的表示，因為在 Transformer Encoder 中會拿 x⁰ₚ 當 key 與每一個 patch 進行 query。

### 3.1 ClassToken 實作

```py
class ClassToken(tf.keras.layers.Layer):
    def build(self, input_shape):
        cls_init = tf.zeros_initializer()
        self.hidden_size = input_shape[-1]
        self.cls = tf.Variable(
            name="cls",
            initial_value=cls_init(shape=(1, 1, self.hidden_size), dtype="float32"),
            trainable=True,
        )

    def call(self, inputs):
        batch_size = tf.shape(inputs)[0]
        cls_broadcasted = tf.cast(
            tf.broadcast_to(self.cls, [batch_size, 1, self.hidden_size]),
            dtype=inputs.dtype,
        )
        return tf.concat([cls_broadcasted, inputs], 1)
```

### 3.2 Position embedding 實作

```py
class AddPositionEmbs(tf.keras.layers.Layer):
    def build(self, input_shape):
        
        self.position_embedding = layers.Embedding(
            input_dim=input_shape[1], output_dim=input_shape[2]
        )
        self.positions = tf.range(start=0, limit=input_shape[1], delta=1)

    def call(self, inputs):
        return inputs + self.position_embedding(self.positions)
```

以上 1~3 步驟結束後我們就得到了 Transformer 的 input：z₀。

![](https://i.imgur.com/6ef98kD.png)

## 4. Transformer Encoder
Transformer 觀念很推薦大家先去觀看[李宏毅課程 Transformer 機制解說](https://andy6804tw.github.io/2021/07/30/ntu-transformer(1)/#encoder)，筆者將它整理成筆記分享給各位。簡單來說一個 Transformer Encoder 是由多個 block 堆疊而成的。也就是下圖中灰色的區塊。

![](https://i.imgur.com/PatRcRw.png)

首先輸入 z₀ 以後先經過一層 Layer Normalization(LN)，接著進入由 Self-Attention 所組成的 Multiheaded Self-Attention(MSA)。此時得到的輸出再加上原本輸入的 z₀ 得到 z'ℓ，這一個動作也就是 residual connection。

![](https://i.imgur.com/st0seSC.png)


接下來再通過一層 LN 以及 MultiLayer Perceptron(MLP)，最後再 residual connection 一次得到得到第 ℓ 層的輸出 zℓ。值得一提的是這裡的 MLP 是由兩層的 Dense layer 全連接神經網路所組成，第一層的神經元的數量可以自行設定，通常是 `projection_dim*2` 接著第二層的神經元數一定要等於 projection_dim。另外 activation 在論文中是採用 `tf.nn.gelu` (TF 2.4 以上版本以上)。

![](https://i.imgur.com/sIwRKm1.png)

## 5. 輸出分類
經過 N 個 block 後得到

![](https://i.imgur.com/bkimi0i.png)
