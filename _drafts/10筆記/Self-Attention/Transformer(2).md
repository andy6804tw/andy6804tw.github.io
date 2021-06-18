---
layout: post
title: '[學習筆記] 李宏毅課程 Transformer 機制解說 (下)'
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
![]https://i.imgur.com/GQTAMTc.png()

## Non-autoregressive (NAT)
如下圖所示，Autoregressive 的運作模式是輸入一個起始字元(BEGIN)，輸出 w1。接著再把 w1 當作輸入得到 w2 輸出，直到輸出 END 為止。至於 Non-autoregressive 並非一次產生一個輸出，而是一次把整個句子輸出。他是吃一排 BEGIN Token，假設丟入四個 BEGIN 就會產生四個字的輸出。這裡你可能會有個疑問，通常不是不知道輸出的長度嗎？那這裡我們該如何知道要放多少的 BEGIN Token?最常見的做法是另外訓練一個 Classifier 吃 Encoder 的輸入，輸出是一個數字代表 Decoder 要輸出的長度。另一個方法是輸入一堆 BEGIN Token，假設有 300 個 BEGIN Token 接著從這 300 輸出種尋找是否有結束符號(END)。

- 該如何決定 Non-autoregressive 輸出的長度
    - 訓令一個神經網路預測輸出長度
    - 輸入一堆 BEGIN Token，尋找結束符號

Non-autoregressive 的優點是平行化。假設 Autoregressive 要輸出 100 個字的句子，就需要做 100 次的 Decode。但是 Non-autoregressive 的 Decoder 並非如此。NAT 不管句子長度如何都是一個步驟輸入一排 BEGIN Token，就輸出相對應的句子輸出。因此在速度上 NAT 的 Decoder 會跑的比 AT 快。自從有了 self-attention 後， NAT 的 Decoder 算是目前熱門的研究主題。最後一個 NAT 的好處是比較容易去控制輸出長度。

![](https://i.imgur.com/8ZBGMZt.png)

語音合成常見模型的 Encoder:
- Autoregressive
    - [Tacotron: Towards End-to-End Speech Synthesis](https://arxiv.org/abs/1703.10135)
- Non-autoregressive
    - [FastSpeech: Fast, Robust and Controllable Text to Speech](https://arxiv.org/abs/1905.09263)

因為 NAT 的 Decoder 它的 Performance 往往都不如 AT 的 Decoder，因此近期有很多研究試圖讓 NAT Decoder 的 Performance 越來越好。試圖逼近 AT 的 Decoder。為何 NAT 的 Decoder 訓練結果會比較差呢？這攸關到 Multi-modality 的問題，可以參考這部[影片](https://www.youtube.com/watch?app=desktop&v=jvyKmU4OM3c&feature=youtu.be)。

## Encoder-Decoder
接下來我們來探討 Encoder 和 Decoder 之間是如何傳遞資訊。也就是下圖中紅色那塊 Cross attention，它是連接 Encoder 和 Decoder 之間的橋樑。Cross attention 中有兩個輸入是來自於 Encoder，Decoder 提供一個輸入。

![](https://i.imgur.com/cJWdsGs.png)