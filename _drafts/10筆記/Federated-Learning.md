# Federated Learning
聯邦學習是由 Google 團隊 McMahan 等人於 2016 年所提出的想法。目標是資料不需離開使用者設備，自在自己的設備訓練模型。並透過加密機制在雲端建立一個模型同步更新，提升使用者的使用品質。

- 聯邦學習(FL)是一種機器學習環境
- 共同訓練模型，同時保持訓練數據的去中心化
- 降低傳統的集中式機器學習所導致的性隱私性及風險

### 傳統模型學習
- 訓練資料集中在一台機器或數據中心
- 資料共享
- 模型集中統一訓練與管理


## 聯邦式學習的過程 
1. Broadcast: 每個設備用戶使用相同的網路架構以及相同初始化權重。
2. Client computation: 每一個設備利用自己的資料訓練模型，各自計算梯度，再將加密過的梯度傳至伺服端。
3. Aggregation: 由伺服端整合所有設備端(user)的梯度並且更新模型。
4. Model update: 伺服端回傳模型更新後的梯度給各個用戶端並更新各自的模型。

典型的跨設備聯邦學習應用程序的數量級大小:

| 名稱                       | 描述             |
|----------------------------|------------------|
| 總樣本大小                 | 10^6~10^10個設備 |
| 每輪訓練的設備數           | 50~5000          |
| 參與一個模型訓練的總設備數 | 10^5~10^7        |
| 模型收斂總回合數           | 5000~10000       |
| 訓練時間                   | 1~10天           |

## 聯邦式學習應用實例
#### 1. Google Gboard
Google 在 Android 的 Google Gboard 鍵盤中，採用了橫向聯盟式學習的技術。

資訊大爆炸時代，資料的取得容易。然而近年來各國越來越重視隱私權議題，紛紛開始制定隱私權條款。

因此在取得客戶端資訊做集中化訓練面臨一大瓶頸。




## Reference
[Advances and Open Problems in Federated Learning](https://arxiv.org/abs/1912.04977?fbclid=IwAR1G1Uq_y0whcQDplpRNqPZAuv2an8mQhFkxUrS9f4-4hO4rs7_VsJ2dG60)

[Federated Machine Learning: Concept and Applications](https://arxiv.org/abs/1902.04885)

[Federated Learning Youtube](https://www.youtube.com/watch?v=xJkY3ehX_MI)
[Federated Learning slideshare](https://www.slideshare.net/Hadoop_Summit/federated-learning-137561677)