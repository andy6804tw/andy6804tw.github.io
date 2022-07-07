# [論文導讀] Vision Transformer (ViT)
> An Image is Worth 16x16 Words Transformers for Image Recognition at Scale

Transformer 如今已經成為家喻戶曉的神經網路架構，並且已經大量的應用在自然語言(NLP)任務上。它的成功追朔於 2017 年 Google 所提出的 Attention Is All You Need。這樣的重大突破使得 Google 團隊將這一套 Transformer 架構中的 Encoder 抽離出來變成了 Vision Transformer (ViT) 應用在影像分類技術上。此外它拋棄了 CNN 層並以 self-attention 計算做取代，並在分類問題上取得不錯的成績。


## Vision Transformer (ViT)
整個架構如下圖所示，該模型透過將一張影像切成多個 patch 並丟入模型中。

![](https://1.bp.blogspot.com/-_mnVfmzvJWc/X8gMzhZ7SkI/AAAAAAAAG24/8gW2AHEoqUQrBwOqjhYB37A7OOjNyKuNgCLcBGAsYHQ/s16000/image1.gif)
> Google blog 

為了將一張影像變成一個序列編碼，我們需要把 H×W×C 的影像變成 N×(P²×C)。以下圖為例，假設我們有一張寬高 32 X 32 的彩色影像(C=3)。Patch size 表示為 (P, P) 範例中使用 4 X 4 大小的 patch。N 表示 pacth 的總數量，其計算方式為 N=(HW/P)²，在這個例子中我們將會得到 64 個 patches。

