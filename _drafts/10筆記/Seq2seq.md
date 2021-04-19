# Seq2seq
一般的 sequence to sequence 他裡面會分成兩塊，一塊是 Encoder 另一塊是 Decoder 所組成的。Seq2seq 模型起源於 2014 年 9 月，用在翻譯文章被放到 [Arxiv](https://arxiv.org/abs/1409.3215) 上，當時的架構是透過 RNN 的 LSTM 實作。但是現今所提到的 Seq2seq 模型通常是在說含有 self-attention 的 Transformer 架構。

![](https://i.imgur.com/1haQ3V0.png)

# Encoder
Seq2seq 模型 Encoder 要做的事情，就是給一排向量輸出另外一排向量。然而在 Transformer 的 Encoder 用的就是 self-attention。

![](https://i.imgur.com/5B8pf7h.png)

Encoder 裡面會分成很多的 block，每一個 block 都是輸入一排向量輸出一排向量給另一個 block，直到最後一個 block 輸出最終的 vector sequence。至於每一個 block 其實並不是神經網路的一層。這邊之所以不稱說每一個 block 是一個 layer，是因為每一個 block 裡面的的事情是好幾個 layer 在做的事情。在 Transformer 的 Encoder 裡面，每一個 block 做的事情大約如下。輸入一排向量以後先做一個 self-attention 考慮整個 sequence 的資訊，輸出另一排向量。接下來這一排向量會丟到全連接層的網路，再輸出另外一排向量。此時的向量就是 block 的輸出。

![](https://i.imgur.com/xlZJYjf.png)

事實上在原來的 transformer 裡面他做的事情是更複雜的。輸入一排向量經過 self-attention 後輸出的向量它是考慮所有的輸入以後所得到得結果。在 Transformer 裡面他加入了一個設計，我們不只輸出這個向量，我們同時還要把這個向量加上他原來的輸入當作是新的輸出。這樣的網路架構稱作 residual connection，他會把輸入和輸出加起來得到新的輸出。得到 residual 結果以後，再做 layer normalization。layer normalization 做的事情是輸入一個向量後輸出另外一個向量，這裡不需要考慮 batch 資訊只考慮當前的向量。他會去計算這組輸入向量的 mean 跟 standard deviation。計算出來後就可以做一個 normalize，得到 layer normalization 的輸出。此時的輸出才是全連接網路的輸入，而全連階層網路這邊也有 residual 的架構。所以我們會把全連接網路的輸入跟它的輸出加起來做一下 residual。得到新的輸出這個才是 Transformer Encoder 裡面一個 block 的輸出。
