---
layout: post
title: '[AI學習筆記] ML Lecture 3-1: Gradient Descent'
categories: 'AI'
description:
keywords: machine learning ntu
---

## 回顧 Gradient Descent
在機器學習第三個步驟，我們要找一個最好的 function，是要解一個 optimization 的問題。也就是我們在第二步我們先定義 loss function。目的是要找一組參數讓這個 loss function 越小越好。我們可以採用 Gradient Descent，假設現在 θ 是一個參數的集合。做法是隨機選一組起始的參數值，減去 learning rate 乘上 loss function 對 θ 的偏微分，就可以得到下一組 θ。

![](https://i.imgur.com/09DT8kl.png)

如果我們將 Gradient Descent 視覺化的話他會長得像這樣。假設我們現在有兩個參數 𝜃1 與 𝜃2 ，並隨機的選一個初始位置 𝜃0 。接下來計算在 𝜃0 這個點它的參數對 loss function 的偏微分。假設參數對 loss function 的斜率是同中紅色的箭頭。更新參數的方式是，將梯度乘上學習速率再加上一個負號就是圖中藍色的箭頭。再將計算出來的結果加上 𝜃0  就會得到更新的參數 𝜃1。以上步驟反覆地持續進行下去，算一梯度更新一次方向直到收斂。

![](https://i.imgur.com/wBW4AWb.png)

## Tip 1: Tuning your  learning rates
第一個要點是小心調整學習速率。有時候學習速率會產生一些問題。舉例來說，假設這個是我們的 loss function 的曲線長這個樣子。如果今天學習率設定的剛剛好的話，會照紅色的路徑一路下降到最低點。如果今天學習速率調太小的話，就如藍色的路徑收斂非常慢。只要給他夠多的迭代次數，他終究還是會走到谷底。如果今天學習速率調整有一點大，就如圖中的綠色的箭頭，每次更新的步伐過大導致永遠在山谷的口上面來回震盪而無法走到特別低的地方。甚至如果學習速率調一個非常大的話，如綠色箭頭所示，更新步伐太大沒辦法有效收斂。

![](https://i.imgur.com/WVA8rGU.png)

調一個好的學習速率並不是一個簡單的事情，我們每次學習必須要將每個迭代的 loss 曲線繪製出來才能評估模型收斂情形。有些自動的方法可以幫我們調整學習速率。通常我們希望隨著更新迭代次數越多而學習速率會逐漸越小。因為當我們從一開始隨機起點的時候，最好的一組解通常離最低點是比較遠的。因此一開始的更新步伐希望踏大一點，才能更快接近最低點。但是經過好幾次參數更新後，已經離目標很接近了，所以此時應該降低學習速率使得模型能夠收斂在最低點的地方。

![](https://i.imgur.com/pHpyyZw.png)

### Adagrad
Adagrad 的方式是採用每一個學習的參數都有各自獨立的學習速率。進行梯度下降的時候，每個參數的學習速率都會除上先前算出來的微分值的平方根。
𝜎𝑡是過去所有微分的值再加上均方根，這一個值對每個參數是不一樣的，因此每個學習速率都會不同。

![](https://i.imgur.com/QYdk4L7.png)

這裡實際舉個例子來看看 Adagrad 是如何實作的。假設現在的初始值是 w0，接下來在 w0 那點進行微分(g0)，至於學習數率是 𝜂0/𝜎0。其中 𝜂 是一個依賴於時間參數，那 𝜎 會計算過去所有微分值的均方根。

![](https://i.imgur.com/PZBrTkZ.png)

由於分子分母都有根號 t+1 因此可以互相抵銷。

![](https://i.imgur.com/AwbRcV7.png)

Adagrad 參數更新整體而言是會越來越慢的，因為他有加上時間依賴。自適應調整學習速率有很多種方法，其中 Adagrad 僅是其中一種。
Gradiant Descent 的參數更新，要看微分的值，越大更新越快。在 Adagrad 的公式裡面，分子紅色部分是微分越大，參數 update 的步伐越大。但是分母藍色部分的效果，影響當微分越大，參數  update 步伐越小，跟分子的影響衝突。

![](https://i.imgur.com/jw9nKiE.png)

因此有這麼一個說法。Adagrad 所表示的是梯度的反差。假設有個參數，他算到其中一個點算出來特別大或是算到某一次出現特別小的值 adagrad 利用過去 gradiant 的平均來看反差的效果。

![](https://i.imgur.com/6wLpfGG.png)

## Tip 2: Stochastic  Gradient Descent
我們可以使用 Stochastic Gradient Descent 使我們訓練速度變快。一般的梯度下降 loss function 會考慮所有資料集，再以所有資料集的總誤差來計算梯度下降，但 Stochastic Gradient Descent(隨機梯度)只考慮一筆資料誤差，梯度也只考慮該筆資料。也就是每看完一筆資料就更新一次參數。

![](https://i.imgur.com/Xm3Fmtj.png)


隨機梯度下降與梯度下降的最大差異在於，梯度下降每次的迭代更新都會計算一次所有的資料誤差再做梯度下降，而隨機梯度下降則是每次的迭代都只計算一筆的誤差並且更新。因此可以發現隨機梯度的收斂無法像梯度下降一樣很穩定的往最佳解前進，它的求解過程中較為震盪。

![](https://i.imgur.com/ZVmrIXG.png)

## Tip 3: Feature Scaling
假設一個迴歸的模型有兩個特徵 x1  和  x2  若這兩個特徵的分布很不一樣，那我們要透過 scaling 讓他們兩個分布一致。從上圖我們可以知道 X2 的分佈遠比 X1 大，建議最好將 x2 進行特徵縮放讓 x2 與 x1 的分佈是一致的。

![](https://i.imgur.com/K0caqtI.png)

我們為什麼希望不同的特徵它們的 scale 是一樣的呢？以下舉個簡單例子，假設有一個迴歸的 function。若不做 feature scaling 的情況下，如果特徵間的差異過大，會呈現橢圓型。因為 w1 對於 loss 的影響比較小而 w2 對於 loss 的影響比較大 。在經過縮放之後會他們的影響關係是呈現正圓，因此收斂方向可以很明確地往圓心走讓梯度下降更有效率。

![](https://i.imgur.com/0Hna6Xy.png)

以一般的標準正規化來說，我們可以計算每個特徵在資料集中的平均值與變異數，將所有特徵縮放為均值為0，方差為1。

![](https://i.imgur.com/hFfEGkP.png)

## Reference
[簡報-Gradient Descent](http://speech.ee.ntu.edu.tw/~tlkagk/courses/ML_2016/Lecture/Gradient%20Descent%20(v2).pdf)

[影片-ML Lecture 3-1: Gradient Descent](https://www.youtube.com/watch?v=yKKNr-QKz2Q&list=PLJV_el3uVTsPy9oCRY30oBPNLCo89yu49&index=7)

> 本篇文章來至於台大李宏毅教授2017 機器學習課程[影片](https://www.youtube.com/playlist?list=PLJV_el3uVTsPy9oCRY30oBPNLCo89yu49)，記錄了課程重點與摘要。更多課程內容可以從[這裡](http://speech.ee.ntu.edu.tw/~tlkagk/courses_ML17_2.html)取得。

---

> 如果你對 AI 和深度學習有興趣，歡迎參考我的免費線上電子書《深度學習與神經網路》。這本書涵蓋了許多實用的深度學習知識與技巧，適合任何對此領域有興趣的讀者。內容集結了多位專家的教學資源，例如台大李弘毅教授的課程筆記。點擊下方連結即可獲取最新內容，讓我們一起探索 AI 的世界！
>
> 👉 [全民瘋 AI 系列《深度學習與神經網路》](https://andy6804tw.github.io/crazyai-dl) - 免費線上電子書  
> 👉 [其它全民瘋 AI 系列](https://andy6804tw.github.io/wiki) - 匯集多主題的 AI 免費電子書

---
