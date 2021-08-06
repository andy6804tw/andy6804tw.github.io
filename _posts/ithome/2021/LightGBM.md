LightGBM 是屬於 GDBT 家族中成員之一，相較於先前介紹的 XGBoost 兩者可以拿來做比較。簡單來說從 LightGBM 名字上觀察，我們可以看出它是輕量級(Light)的梯度提升機(GBM)的實例。其相對 XGBoost 來說它具有訓練速度快、記憶體佔用低的特點，因此近幾年 LightGBM 在 Kaggle 上也算是熱門模型一。

LightGBM 使用 leaf-wise tree算法，因此在迭代過程中能更快地收斂；但leaf-wise tree算法較容易過擬合。