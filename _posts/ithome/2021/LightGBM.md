LightGBM 是屬於 GDBT 家族中成員之一，相較於先前介紹的 XGBoost 兩者可以拿來做比較。簡單來說從 LightGBM 名字上觀察，我們可以看出它是輕量級(Light)的梯度提升機(GBM)的實例。其相對 XGBoost 來說它具有訓練速度快、記憶體佔用低的特點，因此近幾年 LightGBM 在 Kaggle 上也算是熱門模型一。
這兩種演算法都使用貪婪的方法來最小化損失函數的梯度來構建所有的弱學習器。其 tree-based 演算法所面臨的挑戰是如何挑選最佳的葉節點的切割方式，然而 LightGBM 和 XGBoost 分別使用不同的優化技術與方法來識別最佳的分割點。


## LightGBM 優點
LightGBM 由微軟團隊於 2017 年所發表的論文 [LightGBM: A Highly Efficient Gradient Boosting Decision Tree](https://papers.nips.cc/paper/6907-lightgbm-a-highly-efficient-gradient-boosting-decision-tree.pdf) 被提出。其主要想法是利用決策樹為基底的弱學習器，不斷地迭代訓練並取得最佳的模型。同時該演算法進行了優化使得訓練速度變快，並且有效降被消耗的資源。LightGBM 也是個開源專案大家可以在 [GitHub](https://github.com/microsoft/LightGBM) 上可以取得相關資訊。

在官方的文件中也條列了幾個 LightGBM 的優點：
- 更快的訓練速度和更高的效率
- 低記憶體使用率
- 更好的準確度
- 支援 GPU 平行運算
- 能夠處理大規模數據

### 使用 Leaf-wise 建構樹
LightGBM 使用 leaf-wise tree算法，因此在迭代過程中能更快地收斂；但leaf-wise tree算法較容易過擬合。