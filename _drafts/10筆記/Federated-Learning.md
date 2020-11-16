# Federated Learning
聯合學習是由 Google 團隊 McMahan 等人於 2016 年所提出的想法。目標是資料不需離開使用者設備，自在自己的設備訓練模型。並透過加密機制在雲端建立一個模型同步更新，提升使用者的使用品質。

- 聯合學習(FL)是一種機器學習環境
- 共同訓練模型，同時保持訓練數據的去中心化
- 降低傳統的集中式機器學習所導致的性隱私性及風險

### 傳統模型學習
- 訓練資料集中在一台機器或數據中心
- 資料共享
- 模型集中統一訓練與管理


## 聯合學習的過程 
1. Broadcast: 每個設備用戶使用相同的網路架構以及相同初始化權重。
2. Client computation: 每一個設備利用自己的資料訓練模型，各自計算梯度，再將加密過的梯度傳至伺服端。
3. Aggregation: 由伺服端整合所有設備端(user)的梯度並且更新模型。
4. Model update: 伺服端回傳模型更新後的梯度給各個用戶端並更新各自的模型。

典型的跨設備聯合學習應用程序的數量級大小:

| 名稱                       | 描述             |
|----------------------------|------------------|
| 總樣本大小                 | 10^6~10^10個設備 |
| 每輪訓練的設備數           | 50~5000          |
| 參與一個模型訓練的總設備數 | 10^5~10^7        |
| 模型收斂總回合數           | 5000~10000       |
| 訓練時間                   | 1~10天           |

## 聯合學習應用實例
#### 1. Google Gboard
Google 在 Android 的 Google Gboard 鍵盤中，採用了橫向聯盟式學習的技術。

資訊大爆炸時代，資料的取得容易。然而近年來各國越來越重視隱私權議題，紛紛開始制定隱私權條款。

因此在取得客戶端資訊做集中化訓練面臨一大瓶頸。

# MLOPS
台灣差不多在2010年左右就開始執行 MLOPS。在介紹 MLOPS 前先談談一個很相近的名詞，叫做: DevOps。他的概念就是每天都在更新新版內容，以微軟的 win10 來舉例。現在的 win10 版本很健全很少有出錯的地方，但是在跟四年前剛上線時整個骨架相差了將近四倍。也就是說微軟透過 DevOps 在這幾年來每天都會釋放新的功能以及安全性更新維持系統正常運作讓使用者有更好的體驗。那 DevOps 是怎麼做到的？當今天有新的功能計畫(Plan)出來時，團隊就會開始著手寫程式(Code)，程式寫完後會進行編譯(Build)系統可執行的二進制檔。接著我們會進行系統的測試(Test)，測試完成後我們會發布第一版(Release)以及部署應用 Deploy。最後就是維運(Operate)，接下來維護團隊會來觀察(Monitor)這個新功能在客戶端的使用狀況。如果發生問題就會開始計畫更新，或是使用者提出一個新的 issue 團隊經過討論後覺得可行就會進入下個階段著手計畫新的功能。DevOps 的迭代週期非常的快速，其優點是可以不斷的週期性更新功能越來越貼近使用者。這就是所謂的 DevOps 軟體開發流程。

其實我們做機器學習時也需要使用類似 DevOps 的運作概念。Google 宣稱在醫療上辨識糖尿病視網膜病變的模型準確率
可以打敗專業醫師。之後實際部署上線後發現一個嚴重問題。第一個是護理師在實際拍攝照片在低光源環境下進行導致某些病患影像無法正常的辨識，因巧要求重新掛號拍攝。第二點是醫院網路環境不佳導致系統操作上很不方便，需要等待過久時間。所以在 Google 宣稱可以打敗專業醫師的判斷，這是在實驗室裡所發生的。但是這些東西要實際落地時會發現，有許多的事情是在實驗室裡不會遇到的。從這案例中我們了解一個問題，就是在於實驗室和真實際應用的場合中間的差距是一開始無法預測的。

因此 MLOPS 就想解決這個問題。我們開始一個 ML 的專案的時候，起因是有一個商業問題待解決。接著會將此問題套用成 AI 可以解決的問題。接著會開始搜集資料做資料探索、增強、特徵工程...等。接著透過機器學習演算法訓練一個模型。訓練完成後要做模型評估與測試。最後我們會評估此模型是否符合我們的商業目標，如果可以的話就會將模型部署到實際應用場景。到這裡還沒結束！由於在時過程中我們可譨忽略了某些實際所會發生的事，因此上線後同步搜集新資料。接著重新訓練再重新跑以上流程。

![](https://i.imgur.com/b7VHXHC.png)

來源是真實世界的資料(Real Traffic)，當模型建置完成後上線我們要去監控模型的穩定度。因此透過 Result labeling。

> [safety net](https://www.hk01.com/即時國際/388047/波音試飛員3年前已警告-737-max防失速系統有問題)

![](https://i.imgur.com/TwvTc82.png)

### Build the infrastructure and data pipeline

![](https://i.imgur.com/cEs7IzL.png)

> https://papers.nips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf

以下討論兩個 MLOPS 兩個重要環節：
#### Monitoring system
在客戶發現問題之前我們就已經發現系統問題，或是客戶提交test檢測。

### 資料如何有效率的處理？
第一個面臨的問題是標籤該如何取得，因爲時間成本大導致資料無法所有都蒐集到。使用 data summary來代表整個資料集。一個常見的方式就是集群演算法。透過群心附近隨機抽樣幾筆出來表示這區域所有的資料，接著使用群集的技巧自動分群標記剩下的資料。

![](https://i.imgur.com/Fpukwlm.png)

## 為何模型犯錯？
當我們今天模型犯錯時，我們會想知道為什麼模型犯錯。這是在做 MLOPS 會使用到的工具。其原因如下：

- 資料看過但學錯
- 資料尚未看過

模型的解釋性，在影像部分可以使用 Grad-CAM 來判斷模型的解釋性。回歸模型可採用 SHAP 來判斷是哪一個特徵造成最後的結果判別以及特徵重要程度。

## Federated Learning
機器學習的專案要好需要執行 MLOPS 的流程，我們才能夠讓模型在實際應用場景越來越好真實地解決問題。但某些場景在模型上線後很難被解決，例如醫療和金融業的數據是有區域性或是有隱私性。這時候我們就能採用一個技術叫做 Federated Learning (聯合學習) 想辦法處理這類的事情。

## Distributed ML
聯合學習的念就是我們不需要有個中心訓練的地方也能完成模型的訓練。這個想法最初來至於分散式的機器學習，假設我今天有幾百萬億的訓練資料在一台電腦上會訓練很久。因此會想將資料切成好幾等分在不同電腦上分別做訓練，最後再將各組訓練結果合併。分散式學習簡單來來說就是將資料分散開來做平行的訓練。

![](https://i.imgur.com/MW0n02l.png)

## 傳統的機器學習
資料必須中心化集中儲存在雲端，假設今天資料分布在每一個設備中是否撈取資料集中會有隱私權問題？各位可能聽過 Edge Computing 他可以協助在每個終端設備上做預測，但是無法訓練。

![](https://i.imgur.com/3reid6z.png)

## 聯合學習架構
首先C.我們有個基底模型先把他部署在每個手機上面，根據使用者操作同時蒐集訓練資料以及行為然後直接在手機上做訓練。再將學習到的參數蒐集起來最後在雲端做聚合。然後再把各個手機上所學習到的東西去訓練一個全域的模型。這也是屬於 MLOPS 的循環。

![](https://i.imgur.com/cDKecox.png)

## 聯合學習步驟
首先把現有的初始化模型部署在每一個設備上。接著每依據每個使用者習性改善模型並重新訓練。將訓練結果彙整並回傳給雲端。最終雲端會集中各個設備的學習結果並訓練一個新的模型。從這個狀況下可以發現資料始終都在使用者設備上，且運算是在手機設備上。這也是聯合式學習一個重要特色。

![](https://i.imgur.com/WAZBDd6.png)

## GBoard
有兩個模型第一個是輸入一個字會建議你整串句子內容，另外一個真正的聯合學習是 Triggering Model，此模型是來判斷 GBoard 是否要顯示建議給使用者。

- Baseline model for query suggestion
- Triggering Model

## 聯合學習需求
以 GBoard 舉例：
1. 手機必須正在充電中以及WIFI/吃到飽網路，閒置狀態
2. 手機機必須要有 2GB 記憶體
3. 語言限制 en-US/en-CA
4. 一次訓練需要一百台設備加入
5. 至少有80台設備會回傳結果
6. 訓練過程五分

## 聯合學習優缺點
雖然聯合學習可以解決一些問題，但是在資料外洩上面還是有一些風險存在。
- 優點
    - 更多資料
    - 解決隱私權
    - 資料區域性
    - 邊緣設備加入訓練
- 缺點
    - 模型有風險
        - Model Stealing
        - Poisoning Attack
    -  資料從模型洩漏
        - Membership attack (1000人中有哪些在訓練資料裡)
        - Training data extraction (有模型就能重現訓練資料)

## 總結
- MLOPS 是在 AI 專案中重要的流程 
- 聯合學習可以解決數據管治和擁有的問題
- 數據隱私仍然要解決

## Reference
[Advances and Open Problems in Federated Learning](https://arxiv.org/abs/1912.04977?fbclid=IwAR1G1Uq_y0whcQDplpRNqPZAuv2an8mQhFkxUrS9f4-4hO4rs7_VsJ2dG60)

[Federated Machine Learning: Concept and Applications](https://arxiv.org/abs/1902.04885)

[Federated Learning Youtube](https://www.youtube.com/watch?v=xJkY3ehX_MI)
[Federated Learning slideshare](https://www.slideshare.net/Hadoop_Summit/federated-learning-137561677)

[TensorFlow Federated (TF Dev Summit ‘19)](https://www.youtube.com/watch?v=1YbPmkChcbo)

[聯合學習QA](https://www.ithome.com.tw/news/138577)

[AIA MLOPS](https://drive.google.com/file/d/13hblrOdk2g1n7GBH8rbMtx0rIwNujlb1/view)

[federated 漫畫](https://federated.withgoogle.com/)