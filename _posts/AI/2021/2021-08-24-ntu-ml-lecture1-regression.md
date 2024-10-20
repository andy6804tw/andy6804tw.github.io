---
layout: post
title: '[AI學習筆記] ML Lecture 1: Regression - Case Study'
categories: 'AI'
description:
keywords: machine learning ntu
---

## Regression
機器學習要做的事情就是找出一個函數，而迴歸模型顧名思義就是要預測一個連續性的數值。或者說我們找到的函數，它的輸出是一個數值，這類型的任務就稱為迴歸。

![](https://i.imgur.com/6cDnDgp.png)

以下舉幾個關於回歸的例子：

- 股票市場的預測：找一個函數，其輸入是過去股票市場的變動情況，輸出是明天道瓊工業指數的數值。
- 駕駛無人車：找一個複雜函數，其輸入是無人車上的各個感受器收集的數據，輸出是方向盤角度。
- 商品推薦：找一個函數，其輸入是用戶A、商品B的各種特性，輸出是用戶A購買商品B的可能性。

## 第一步:尋找一個模型
我們知道迴歸問題就是要找一個 function，目標是預測的數值要與實際的值越接近越好。第一步，尋找一個模型。例如我們找一個線性模型，y=wx+b。為了要找到一個寶可夢 CP 值進化後的結果為何。

![](https://i.imgur.com/d3o5nAm.png)

## 第二步:判斷函數的好壞
有了訓練資料後我們就可以定義一個 function 的好壞。這另一個 function 我們稱 loss function。他是被用來評估我們定義的 function set 好壞，也就是衡量一組參數的好壞。那該如何定義 loss function 呢？其實這個 loss function 可以隨意自己定義一個合理的 function。我們把真實的y^減去模型預測出來的y之後再取平方，這就是一個最簡單估測的誤差。有幾筆訓練資料就將每一筆的誤差計算出來後相加，我們目標是要最小化我們的誤差。

![](https://i.imgur.com/5HsK5at.png)

這個圖上的每一個地方都代表是一個 function，顏色代表了根據我們定義的 loss function 它有多糟。其顏色越偏紅色代表數值越大，最好的 function 落在藍色的地方。

![](https://i.imgur.com/598oGW5.png)

## 第三步:根據定義的損失函數找到一組好的參數
我們已經定義好了 loss function 可以衡量一個模型裡面 function 的好壞。接下來我們要做的事情是，從這個 function set 裡面挑選一個最佳的 function。我們要做的事情是窮舉所有的 w 和 b ，看哪一組參數帶入 L(w, b)  可以讓 loss 值最小。

![](https://i.imgur.com/sQqXV2A.png)

### 梯度下降法的原理
我們可以透過 Gradient Descent 來找出一組最好的參數。它厲害的地方是，只要 loss function 是可以微分的，Gradient Descent 都可以拿來處裡這個 function 找出比較好的一組參數。這裡我們來看一下 Gradient Descent 是如何運做的。我們先假設一個簡單的任務，這個任務我們定義 loss function L(w) 僅有一個參數 w。那我們現在要解的問題是，找一個 w 讓 L(w) 最小。這件事情該怎麼做呢？其中暴力的方法就是窮舉所有 w 可能的數值，從負無限大到無限大每一個值都帶入到 loss function 裡面。試一下這個 loss function 輸出的值，我們就會知道哪一個 w 可以讓 loss 最小。但這樣做是非常沒有效率的，那該如何做比較好呢？這就是我們要提的 Gradient Descent。它的做法是首先隨機選取初始的點 w0，接下來在這個初始的 w0 位置計算參數 w 對 L(loss function) 的微分。簡單來說就是找一個 w0 的切線斜率，如果切線斜率是負的話顯然該點的左側 loss 是比較高的，右邊 loss 是比較低的。那我們要找一個 loss 較低的 function，所以我們應該增加 w0 值。反之如果今天算出來的斜率是正的，代表跟這條虛線反向也就是右邊高左邊低，那我們顯然應該要減少 w0 的值把參數往左邊移動。

![](https://i.imgur.com/vtXKozo.png)

那如果我們往右邊踏一步應該要踏多少呢？踏多少取決於兩件事情，第一件是現在的微分值有多大，如果微分值越大代表現在在一個非常陡峭的地方，那它的移動距離就越大。第二件事情是一個常數項 𝜂 稱為學習速率，它決定了我們對 w0 更新的幅度。如果學習速率設的比較大，參數更新的幅度就會比較大，反之參數更新幅度就比較小。簡而言之學習速率若設定大一點的話，相對的學習速度就比較快，但也不是越快越好如果設定太大可能會得到區域最佳解而不是全域的解。所以我們將原來的參數 w0 減去 𝜂 乘上 dL/dw ，這裡有一項減的原因是因為算出來微分的值與 loss 增加和減少是相反的所以要加上負號。簡單來就就是往切線斜率的反方向來更新我們的參數。

![](https://i.imgur.com/Vq2xZDS.png)

我們把 w0 更新之後得到 w1，接下來重複剛剛的步驟。重新計算在 w1 的地方所算出來的微分值並更新。這些步驟反覆不斷地執行下去，經過非常多次的迭代後進行很多次的參數更新，最終到了 local minimum 的地方。所謂  local minimum 的地方就是微分等於 0，因此參數就無法繼續更新了。那你可能會發現其實還有更好的地方使得 loss 可以更低，至於線性迴歸沒有這個問題因為它是沒有 local minimum 的。

![](https://i.imgur.com/ZjvY77F.png)

### 兩個待優化參數
我們剛剛是討論只有一個參數的情形，那如果有兩個參數以上其實方法也是一樣的。我們先隨機初始 w0 跟 b0，接下來計算在 w=w0 和 b=b0 的時候 w 對 loss 偏微分，以及在 w=w0 和 b=b0 的時候 b 對 loss 偏微分。接下來計算出來這兩個偏微分後，就分別去更新 w0 和 b0 這兩個參數。這個步驟就反覆地持續下去，一直更新參數最後就可以找到一個 loss 相對比較小的 w 和 b 值。所謂的 Gradient Descent 中的 Gradient 是∇ L，是對各個參數求偏微分後，所組成的向量。

![](https://i.imgur.com/xtRH4Oa.png)

上面兩個參數的迭代過程，可以透過下圖直觀地表達：縱軸為參數w的取值，橫軸為參數b取值，則圖中每一個點分別代表不同的( w , b )。圖中不同的顏色區域分別對應著損失函數的大小。越往中間（紫色部分），損失函數的值越小。其梯度的方向其實就等於等高線的法線方向。

![](https://i.imgur.com/ZXMN25e.png)

### 多個待優化參數
同樣地，可以推廣到用梯度下降法求解多個參數的情形。假設 θ 表示一個參數的集合，運用梯度下降法求解時，我們希望參數的每一次更新，都能使損失函數再降低一點：

![](https://i.imgur.com/1UI2FNC.png)

但正如前面所說，梯度下降法也有缺陷。在非線性模型中，選取不同的初始參數，最後可能抵達不同的局部最小值。而在線性回歸模型中，由於損失函數是一個凸函數，類似於碗的形狀，不存在多個最小值，因此從任何一個初始位置出發，最後都會回到唯一的最低點，所以能夠克服上述缺陷。

![](https://i.imgur.com/yJolHLR.png)

由上述觀念我們可以為一個簡單線性迴歸做一個公式的結論。經由定義損失函數，分別計算兩個偏微分。

![](https://i.imgur.com/SQYDatp.png)

我們可以設計更複雜的模型，讓預測有更好的結果，使得 error 更小。

![](https://i.imgur.com/4BunGmm.png)

從模型一到模型五，隨著模型結構越來越複雜，基於訓練集所求出來的平均誤差是逐漸降低的，而基於測試集的平均誤差則是先減小後增大，從第四個模型開始出現過擬合問題。一個複雜模型在訓練集上得到了比較好的性能，而在測試集上性能表現十分不理想，這就是過度擬合。

![](https://i.imgur.com/wc80qC9.png)

## 避免過度擬合(Regularization)
Regularization 要做的事情是重新定義了 loss function。原來的 loss function 只考慮了預測結果減掉正確答案的平方。那 Regularization 它就是為 loss function 加上一項額外的限制式，是由 λ 和所有權重參數 w 的平方和所構成的。其中 λ  是一個常數，由我們自己手動設定的超參數。它不僅要求原有的損失函數 L 最小化，還要求正則項也最小化。使原來的損失函數 L 最小化容易理解。但最小化正則項對於模型選擇有什麼幫助呢？或者說，加入正則項的意義是什麼？我們加上 Regularization 的時候就是預期我們找到的那一組的參數要越小越好。因為參數很小接近零意味著模型裡的函數是比較平滑的。所謂的平滑的意思是，當今天的輸入有變化的時候，輸出對輸入的變化是比較不敏感的。如果今天有一個比較平滑的 function，那平滑的  function 對輸入是比較不敏感的。所以當輸入被一些雜訊所干擾的話，相對的它會受到比較少的影響而得到較好的結果。

![](https://i.imgur.com/sruN3W6.png)

> 在做 regularization 是不考慮 bias 這項的，因為調整 bias 這項對於 function 的平滑程度是沒有關係的

𝜆 值越大代表考慮平滑的 Regularization 那一項圖的影想力越大。因此隨著 𝜆 越大，我們找到的 function 就越平滑。

![](https://i.imgur.com/6s6NQaE.png)

## Reference
[簡報-Regression (Case Study)](http://speech.ee.ntu.edu.tw/~tlkagk/courses/ML_2017/Lecture/Regression.pdf)

[影片-ML Lecture 1: Regression - Case Study](https://youtu.be/fegAeph9UaA)

> 本篇文章來至於台大李宏毅教授2017 機器學習課程[影片](https://www.youtube.com/playlist?list=PLJV_el3uVTsPy9oCRY30oBPNLCo89yu49)，記錄了課程重點與摘要。更多課程內容可以從[這裡](http://speech.ee.ntu.edu.tw/~tlkagk/courses_ML17_2.html)取得。

---

> 如果你對 AI 和深度學習有興趣，歡迎參考我的免費線上電子書《深度學習與神經網路》。這本書涵蓋了許多實用的深度學習知識與技巧，適合任何對此領域有興趣的讀者。內容集結了多位專家的教學資源，例如台大李弘毅教授的課程筆記。點擊下方連結即可獲取最新內容，讓我們一起探索 AI 的世界！
>
> 👉 [全民瘋 AI 系列《深度學習與神經網路》](https://andy6804tw.github.io/crazyai-dl) - 免費線上電子書  
> 👉 [其它全民瘋 AI 系列](https://andy6804tw.github.io/wiki) - 匯集多主題的 AI 免費電子書

---
