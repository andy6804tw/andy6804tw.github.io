
self-attention 要解決什麼問題呢？到目前為止我們所遇到的神經網路的輸入都是一個向量，不管是數值型預測、影像...等。然而輸出可能是一個連續數值(Regression)或是類別(Classfication)。假設我們遇到更複雜的問題，他的輸入是一排向量，而且輸入的向量數目是會改變的呢(sequence的長度數目不一樣)？

![](https://i.imgur.com/eiJmkK0.png)

這裡舉一個輸入是一個 Sequence 而且長度會改變的例子，文字處理。假設我們的網路的輸入是一個句子，每一個句子詞彙數目不同。如果我們把每個詞彙都描述成一個向量表示，那我們的veter set大小就會不一樣。那怎麼把一個詞彙表示成一個向量呢？最簡單的方式是 One-Hot 的 Encoding，這向量的長度也就是世界上所有的詞彙。但是這樣的表示方式會有一個非常嚴重的問題，假設所有的詞彙彼此之間都是沒有關係的。從這個向量中我們無法得到任何語意資訊。有另一種方法叫做 Word Embedding，所謂的 Word Embedding 就是我們會給每一個詞彙一個向量。而這個向量是有語意資訊的，如果你將 Word Embedding 後的結果畫出來，你會發現所有相同類別的會聚集成一團。 

![](https://i.imgur.com/I9TKig1.png)

另一個例子是音訊處理，一段聲音訊號其實就是一排向量。我們會把一段聲音訊號擷取一個範圍，這個範圍我們稱之為 window。我們將每一個 window 資訊描述成一個向量，這個向量稱之為 Frame。我們會有各式各樣的方法，可以用一個向量來描述，一小段 25 個 Millisecond 裡面的語音訊號。

![](https://i.imgur.com/LBBne3k.png)

還有什麼東西是一堆向量呢？一個圖(Graph)也是一堆向量，在 Social Network上面每一個節點就是一個人，節點與節點之間代表就有關係。而每一個節點就可以看作是一個向量，包含每個人的性別、年齡、工作...等，把這些資訊用一個向量來表示。所以一個 Social Network 也可以看作是一堆的向量所組成。

![](https://i.imgur.com/C82SFe5.png)

還有什麼是與 Graph 有關的呢？舉例來說一分子，他也能看作是一個 Graph。每個分子上面的球也就是原子，就是一個向量。

![](https://i.imgur.com/GgbGwJb.png)

我們剛才已經看了輸入是一堆向量的例子了，他可以是文字、語音或圖。那這個時候我們可能會有什麼輸出呢？這裡有三種可能性，第一種每一個向量都有一個對應的標籤。也就是說當你的模型到四個輸入向量的時候，他就要輸出四個標籤。最常見的例子就是 POS Tagging 詞性標注，要讓機器自動決定每一個詞彙他是什麼樣的詞性。

![](https://i.imgur.com/LDe7mjQ.png)

第二種可能的輸出是我們一整個 Senquence 只需要輸出一個標籤就好。舉例來說如果是文字的語意分析，透過給定一串文字，來判定這一句話是正面還是負面。或是聽一段聲音判斷是誰講的話。如果是Graph的話，今天我們給予一個分子，接著要預測這個分子是否有毒性。

![](https://i.imgur.com/Mr4anpp.png)

第三種輸出是我們不知道應該輸出多少個標籤，藉由機器自己決定應該要輸出多少標籤。這種任務又稱為 sequence to sequence 的任務。最簡單的例子就是機器翻譯，或是機器對答系統。

![](https://i.imgur.com/aQ8KKaC.png)

## Sequence Labeling(幾個輸入對應幾個輸出)
Sequence Labeling 要給定 Sequence 裡面的每一個向量都給予一個標籤。最直捷的方法就是建立一個 Fully connected 網路，雖然輸入是一個 sequence，把每個向量分別輸入到全連接層的神經網路裡面，然後各自得到相對應輸出。但這會出現一些問題，如果輸入一個句子辨識詞性，在全連接模型網路無法評估前後文做出比較好的輸出。

![](https://i.imgur.com/U8hViQZ.png)

有沒有可能讓 Fully connected 網路考慮上下文的Context的資訊呢？我們把前後幾個向量串起來一起丟入 Fully connected 網路就可以了。但是我們能考慮整個 input sequence 的資訊嗎？這就要用到 self-attention 這個技術。

self-attention 的運作方式是模型會吃一整個 Sequence 的資訊，輸入幾個向量它就輸出幾個向量。這幾個輸出的向量都是考慮一整個 Sequence 以後才得到的。我們再把這個有考慮整個句子的向量丟入 Fully connected 網路，然後再來決定他應該是什麼樣的結果。有關 self-attention 最知名的相關文章，就是 Attention is all you need。在這篇論文裡 Google 提出了 Transformer 這樣的網路架構。然而 Transformer 裡面一個最重要的 Module 就是 self-attention。最早提出的相關是 self-maching。

![](https://i.imgur.com/AOKB8Vx.png) 

self-attention 的輸入是一串的向量，這些向量可能是整個網路的輸入，也可能是某個 Hidden Layer 的輸出。輸入一排a向量後，self-attention 要輸出涼一排b向量。至於每一個b都是考慮了所有a才生成出來的。

![](https://i.imgur.com/eHrS2zO.png)

接下來要說明怎麼產生 b1 向量。第一個步驟是根據 a1 找出這個 sequence 裡面，跟 a1 相關的其他向量。做 self-attention 的目的就是為了要考慮整個 sequence，但是我們又不希望把整個 sequence 的所有資訊都包在一個 window 裡面。因此我們有特別的機制是根據a1向量，找出整個很長的 sequence 裡面有哪些部分是重要的。每一個向量跟a1的關聯程度我們用一個數值 α 表示，那要如何去計算 a1跟a2~a4的 α 呢？

![](https://i.imgur.com/E1lYpP2.png)

這裡我們就必須要有一個計算 attention 的模組。它就是拿兩個向量作為輸入，然後他就直接輸出 α 那個數值作為兩個向量的關聯程度。計算 α 數值有很多種方法，比較常見的做法就是 dot product，左邊的向量乘上wq矩陣右邊乘上wk矩陣得到q和k向量。之後qk進行 dot product 也就是做 element wise 的相乘在全部相加起來就會得到 α。另一種 Additive 的計算方式是計算得到 qk 並將它串起來進入一個激發函數接著近一個轉換輸出得到 α。

![](https://i.imgur.com/27Y4sNx.png)