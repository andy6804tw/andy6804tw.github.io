# Seq2seq
一般的 sequence to sequence 他裡面會分成兩塊，一塊是 Encoder 另一塊是 Decoder 所組成的。Seq2seq 模型起源於 2014 年 9 月，用在翻譯文章被放到 [Arxiv](https://arxiv.org/abs/1409.3215) 上，當時的架構是透過 RNN 的 LSTM 實作。但是現今所提到的 Seq2seq 模型通常是在說含有 self-attention 的 Transformer 架構。

![](https://i.imgur.com/1haQ3V0.png)

# Encoder
Seq2seq 模型 Encoder 要做的事情，就是給一排向量輸出另外一排向量。然而在 Transformer 的 Encoder 用的就是 self-attention。

![](https://i.imgur.com/5B8pf7h.png)

Encoder 裡面會分成很多的 block，每一個 block 都是輸入一排向量輸出一排向量。