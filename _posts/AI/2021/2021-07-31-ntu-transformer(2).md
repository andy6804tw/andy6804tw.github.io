---
layout: post
title: '[AI學習筆記] 李宏毅課程 Transformer 機制解說 (下)'
categories: 'AI'
description:
keywords: machine learning 2021 spring ntu
---

## Decoder
Decoder 最常見有兩種，首先我們先來看 Autoregressive 的 Decoder。以下以語音辨識做範例，所謂的語音辨識就是輸入一段聲音輸出一串文字。首先輸入語音訊號進入 Encoder 後，輸出是一排向量。接下來就進入 Decoder 運作，Decoder 的任務就是產生輸出。Decoder 該如何產生文字呢？首先給予一個開始的符號(Begin, BOS) 並用 one-hot 來表示起始字元。接著 Decoder 吃到起始符號後會吐出一個向量，他的長度跟你的詞彙長度是一樣的，也就是所謂字典數量。然後每一個中文字會對應到一個數值，因為有通過 softmax 因此輸出的向量加總等於一，同時代表每個字詞的機率。因此分數最高的那個字就是最終的輸出，以下範例第一個輸出為機。接下來再把機當作是 Decoder 新的輸入，此時將會有兩個輸入一個是起始符號以及機。再來就會根據這兩個輸入，得到一個輸出向量以此類推。 

![](https://i.imgur.com/TInhtdg.png)

由紅色虛線可以發現 Decoder 的輸入，其實是他前一個時間點自己的輸出。Decoder 會將自己的輸出當作接下來的輸入。這裡你可能會想說萬一中間有一個輸出錯誤，後面是不是也會跟著錯誤?(error propagation)。答案是有可能，稍後會提到處理方式。

![](https://i.imgur.com/Xa6IfHs.png)

這裡我們來看 Decoder 的內部結構。在 Transformer 中的 Decoder 結構如下圖所示。

![](https://i.imgur.com/56uDpYs.png)

這裡我們先來比較一下 Encoder 和 Decoder 兩者的差異，如下圖所示。你會發現將 Decoder 中間一部分蓋起來，其實兩者並無太大差別。唯一比較大的差別是 Decoder 在 Multi-Head Attention 加上了 Masked。

![](https://i.imgur.com/dWMxS69.png)

在討論 Masked Multi-Head Attention 前先看一下原本的 self-attention(圖左架構)。正常的 self-attention 是輸入一排向量輸出另一排向量，這一排向量的每個輸出都必須看過完整的輸入才做決定。也就是說輸出 b1 時必須先看過 a1~a4 資訊，輸出 b2 時也要看過 a1~a4 完整的資訊。當我們轉換成 Decoder 中的 Masked self-attention(圖右架構) 他的不同點在於，不需要完整看全部的 a1~a4 資訊。也就是產生 b1 的時候，我們只能考慮 a1 的資訊。產生 b2 的時候，只能考慮 a1 和 a2 的資訊。以此類推直到產生 b4 時才能考慮所有輸入資訊。

![](https://i.imgur.com/fmIAKY4.png)

更具體的說假設我們要產生 b2 時，需要拿 q2 去跟 k1 和 k2 計算 attention。由於是 Masked Multi-Head Attention 因此在計算 b2 時 k3 和 k4 就忽略，因為被遮起來了。為何需要加 masked 呢？因為在 Decoder 是一個一個輸出，因此會先有 a1 再有 a2 ... 直到 a4。而在原來 Encoder 的 self-attention 是一次 a1~a4 整個讀進去。

![](https://i.imgur.com/Sx8s2PE.png)

## Autoregressive
Decoder 必須自己決定輸出 sequence 的長度，因此我們必須在字典中新增結束的符號。下圖為典型的 Autoregressive 的 Decoder 運作模式。當輸入稻作後一個字時 Decoder 看到 Encoder 輸出的 Embedding 以及 Decoder 中的起始字元、機、器、學、習。看到這些資訊以後 Decoder 要知道這個語音辨識結果，已經結束了不需要再產生詞彙了。此時最後輸出的結束字元機率要最高。以上動作就是 Decoder 的 Autoregressive 運作模式。

![](https://i.imgur.com/HV8sqVh.png)
![](https://i.imgur.com/GQTAMTc.png)

## Non-autoregressive (NAT)
如下圖所示，Autoregressive 的運作模式是輸入一個起始字元(BEGIN)，輸出 w1。接著再把 w1 當作輸入得到 w2 輸出，直到輸出 END 為止。至於 Non-autoregressive 並非一次產生一個輸出，而是一次把整個句子輸出。他是吃一排 BEGIN Token，假設丟入四個 BEGIN 就會產生四個字的輸出。這裡你可能會有個疑問，通常不是不知道輸出的長度嗎？那這裡我們該如何知道要放多少的 BEGIN Token?最常見的做法是另外訓練一個 Classifier 吃 Encoder 的輸入，輸出是一個數字代表 Decoder 要輸出的長度。另一個方法是輸入一堆 BEGIN Token，假設有 300 個 BEGIN Token 接著從這 300 輸出種尋找是否有結束符號(END)。

- 該如何決定 Non-autoregressive 輸出的長度
    - 訓令一個神經網路預測輸出長度
    - 輸入一堆 BEGIN Token，尋找結束符號

Non-autoregressive 的優點是平行化。假設 Autoregressive 要輸出 100 個字的句子，就需要做 100 次的 Decode。但是 Non-autoregressive 的 Decoder 並非如此。NAT 不管句子長度如何都是一個步驟輸入一排 BEGIN Token，就輸出相對應的句子輸出。因此在速度上 NAT 的 Decoder 會跑的比 AT 快。自從有了 self-attention 後， NAT 的 Decoder 算是目前熱門的研究主題。最後一個 NAT 的好處是比較容易去控制輸出長度。

![](https://i.imgur.com/8ZBGMZt.png)

語音合成常見模型的 Encoder:
- Autoregressive
    - [[論文] Tacotron: Towards End-to-End Speech Synthesis](https://arxiv.org/abs/1703.10135)
- Non-autoregressive
    - [[論文] FastSpeech: Fast, Robust and Controllable Text to Speech](https://arxiv.org/abs/1905.09263)

因為 NAT 的 Decoder 它的 Performance 往往都不如 AT 的 Decoder，因此近期有很多研究試圖讓 NAT Decoder 的 Performance 越來越好。試圖逼近 AT 的 Decoder。為何 NAT 的 Decoder 訓練結果會比較差呢？這攸關到 Multi-modality 的問題，可以參考這部[影片](https://www.youtube.com/watch?app=desktop&v=jvyKmU4OM3c&feature=youtu.be)。

## Encoder-Decoder
接下來我們來探討 Encoder 和 Decoder 之間是如何傳遞資訊。也就是下圖中紅色那塊 Cross attention，它是連接 Encoder 和 Decoder 之間的橋樑。Cross attention 中有兩個輸入是來自於 Encoder，Decoder 提供一個輸入。

![](https://i.imgur.com/cJWdsGs.png)

首先 Encoder 輸入一個向量，然後輸出另一個向量 a1~a3。接下來輪到 Decoder 會先輸入一個起始字元(BEGIN) 進入 Self-Attention(Mask) 得到一個輸出向量，此時這個向量會乘上另一個矩陣做轉換得到一個 query(q)。我們會將 Decoder 產生的 q 與 Encoder 的 k1~k3 去計算 attention 分數，並做個 softmax 得到 a'1~a'3。接下來再將 a'1、a'2、a'3 乘上 v1~v3 再把它 waighted sum 加總起來得到 v。此時的 v 就會丟進全連接網路做接下來處理。以上步驟稱為 Cross attention，q 來自於 Decoder; k 和 v 來自 Encoder。Decoder 的 q 去 Encoder 中萃取資訊，當作 Decoder 裡面的 FC 網路的輸入。

![](https://i.imgur.com/VBRSVPu.png )

以下論文是最早提出 Cross attention 的方法應用在語音辨識，並使用 Seq2seq 模型並採用 LSTM 架構。

![](https://i.imgur.com/Pcdj3TV.png)

[[論文] Listen, attend and spell: A neural network for large vocabulary conversational speech recognition](https://ieeexplore.ieee.org/document/7472621)

Decoder 的每層輸出都是拿 Encoder 最後一層的輸出。在原始論文是這樣沒錯，也有其他論文嘗試不同的 Cross attention 方式。不一定要拿最後一層的 Decoder 做 attention。

![](https://i.imgur.com/KGEw3Tc.png)

[[論文] Layer-Wise Multi-View Decoding for Natural Language Generation](https://arxiv.org/abs/2005.08081)

## Transformer Training
接下來就要講 Transformer 是如何訓練的。如何讓機器學習到輸入一串音訊，就能吐出一串文字呢？首先需要進行資料標注動作，每一段音訊都要標注相對應的文字。假設我們在 Decoder 輸入一個起始字元，他的輸出的"機"這個字元的機率要越大越好。每次預測出來的一串機率都會與 Ground true 的 one-hot 向量進行 corss entropy 計算，目標使得 loss 越小越好。它的學習方法跟我們常見的分類器非常相似。每次在 Decoder 產生一個中文字的時候，其實就是做一次分類的問題。

![](https://i.imgur.com/LyZkwvg.png)

所以實際上訓練假設知道輸出是`機器學習`，我們在訓練過程中必須告訴 Decoder 四個輸出分別為`機器學習`這四個中文字的 one-hot 向量。我們希望 Decoder 的輸出要與這四個字的 one-hot 向量越接近越好，因此在訓練的時候每一個輸出都會計算 cross entropy。目標是希望這些輸出的 loss 總合要越小越好。除此之外我們還要考慮第五個斷句的符號，目標是輸出四個字後就停止。另外值得一提的是在訓練過程中將每次 Decoder 的輸入給予正確答案，這件事情稱作 Teacher Forcing。

![](https://i.imgur.com/G9yVfga.png)

## 訓練 Seq2seq 的 tips
### 1. Copy Mechanism
對很多任務而言也許 Decoder 沒有必要自己創造輸出，需要做的事情也許是從輸入裡面複製一些東西出來。像這種複製輸入的行為在哪些任務會用上呢？第一個例子是聊天機器人，也許輸入句子有包含未知的人名。Decoder 可以直接參考輸入句子並作適當的輸出。

![](https://i.imgur.com/CXC0SBx.png)

或者是做摘要的時候，模型讀一篇文章要產生整篇文章的重點。通常要訓練讓機器說出合理的句子，基本上要準備百萬篇的資料。這種摘要問題也是屬於 Copy Mechanism 問題，複製輸入文章進行篩選並改寫。

![](https://i.imgur.com/1ode858.png)

[[論文]  Get To The Point: Summarization with Pointer-Generator Networks](https://arxiv.org/abs/1704.04368)

早期從輸入的資料有複製能力的模型稱作 Pointer Network，可以參考以下影片資訊。後來有變形稱作 copy network，參考以下論文可以知道 Seq2seq 模型怎麼從輸入複製東西到輸出。

[影片: Pointer Network](https://www.youtube.com/watch?app=desktop&v=VdOyqNQ9aww&feature=youtu.be)
[[論文] Incorporating Copying Mechanism in Sequence-to-Sequence Learning](https://arxiv.org/abs/1603.06393)

### 2. Guided Attention
對語音辨識或語音合成 Guided Attention 是一個很重要的技術。有時候我們的輸入模型行在輸出中會被 miss 掉，我們能否強迫它將輸入的每一個東西都看過。Guided Attention 要做的就是，要求機器在 attention 的過程是有固定的方式。舉例來說在語音合成時我們想像中的 attention 是由左至右，透過 Guided Attention 可以讓 attention 有固定的樣貌。把 attention 由左至右的限制放進訓練模型裡面，要求機器學到 attention 就應該由左至右。相關的技術有 Montonic Attention 和 Location-aware attention。

![](https://i.imgur.com/gvN7woX.png)

### 3. Beam Search
這裡舉個例子，假設 Decoder 只能產生兩個字。在第一個時間點只能從 AB 中決定一個，決定 A 後將把當當輸入再進行 AB 選擇。每次 Decoder 都是選擇分數最高的那一個。每次都是找分數最高的稱作 Greedy Decoding，但是貪婪的方法不一定是最佳的。有時候可能在某些地方稍微捨棄選擇比較低的機率，往後的機率都是非常高的。因此可以比較紅色與綠色的走法，綠色的路雖然一開始第一個步驟選了比較差的輸出，但接下來的結果都是非常好的。要如何找出綠色比較好的路線呢？由於組合爆炸問題不可能暴力搜尋解來窮舉，因此有個演算法叫做 Bean Search 它用比較有效的方法找出一個近似解。

![](https://i.imgur.com/ryQXA0e.png)

Beam Search 有時候有用有時候無用。舉例以下論文中要做的是輸入半個句子，模型要完成剩下後面的句子。在此篇論文中表示用 Beam Search 會發生鬼打牆，不斷說出重複的話。如果加入一些隨機性，並一定非常好但結果看是普通。因此有時候 Decoder 沒有找出分數最高的路，反而結果是比較好的。假設一個任務答案非常明確，例如語音辨識，在這種情況下使用 Beam Search 效果較好。如果需要讓機器自己發揮創造力時，使用 Beam Search 可能稍微沒加成效果。另一個隨機的問題是，TTS 在模型訓練與測試時 Decoder 可以稍微加一些雜訊，和出來的聲音才會好。

![](https://i.imgur.com/qqzgpIq.png)

[[論文] The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)

> 要接受沒有事情是完美的，真正的美也許就在不完美之中。

### 4. Optimizing Evaluation Metrics?
訓練後的模型評估標準 bleu score 是將 Decoder 先產生一個完整的句子以後在跟正確的一整句答案比較計算。而在訓練的時候使每一個詞分開考慮計算 cross entropy。最小化 cross entropy 真的能最大化 bleu score 嗎？其實不一定，因為它們並無直接相關。因此我們在做驗證時並非拿 cross entropy 最小的當作最佳模型，而是挑 bleu score 最高的。因此在訓練過程中是看 cross entropy，但評估模型時採用 bleu score。那在訓練時可以將 bleu score 當作一個訓練目標嗎？答案是不行，因為他 bleu score 複雜且不可微分。遇到最佳化無法解決的問題，用 RL 硬 train 一發！遇到你無法Optimize 你的 loss function，把它當作是 RL 的 Reward，把 Decoder 當作 Agent。幫這個問題當成強化學習問題，可以解。可以參考以下論文。

[[論文] Sequence Level Training with Recurrent Neural Networks](https://arxiv.org/abs/1511.06732)

### 5. Schdduled Sampling
這裡我們來討論訓練跟測試所遇到的問題。測試的時候 Decoder 是看到自己的輸出，所以它可能有機會看到自己預測錯的輸出。但是在訓練的時候 Decoder 是完全看到正確的答案，這種不一至的現象稱 expourse bias。假設 Decoder 在訓練時只看正確的東西，那在測試時只要有個錯誤後面就會整個受影響。所以要怎麼解決這個問題？有一個可以思考的方向是，給 Decoder 的輸入加一些錯誤的東西。不要給 Decoder 都是正確的答案，偶爾給他一些錯誤的東西它反而會學得更好。

![](https://i.imgur.com/W2RmT9g.png)

這招叫做 Schdduled Sampling，在還沒有 Transformer 只有 LSTM 的時候就已經有 Schdduled Sampling。但是 Schdduled Sampling 這招會影響到 Transformer 的平行化能力。以下是相關的論文參考。

[[論文] Scheduled Sampling for Sequence Prediction with Recurrent Neural Networks](https://arxiv.org/abs/1506.03099)

[[論文] Scheduled Sampling for Transformers](https://arxiv.org/abs/1906.07651)

[[論文] Parallel Scheduled Sampling](https://arxiv.org/abs/1906.04331)

## Reference
[【機器學習2021】Transformer (上)](https://www.youtube.com/watch?v=n9TlOhRjYoc)

[【機器學習2021】Transformer (下)](https://www.youtube.com/watch?v=N6aRv06iv2g)

[簡報](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2021-course-data/seq2seq_v9.pdf)

---

> 如果你對 AI 和深度學習有興趣，歡迎參考我的免費線上電子書《深度學習與神經網路》。這本書涵蓋了許多實用的深度學習知識與技巧，適合任何對此領域有興趣的讀者。內容集結了多位專家的教學資源，例如台大李弘毅教授的課程筆記。點擊下方連結即可獲取最新內容，讓我們一起探索 AI 的世界！
>
> 👉 [全民瘋 AI 系列《深度學習與神經網路》](https://andy6804tw.github.io/crazyai-dl) - 免費線上電子書  
> 👉 [其它全民瘋 AI 系列](https://andy6804tw.github.io/wiki) - 匯集多主題的 AI 免費電子書

---
