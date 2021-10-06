## 今日學習目標

## 前言
現今機器學習演算法多樣

- 資料面
  - 資料收集不當
  - 訓練集與測試集的類別分佈不一致
  - 使用 LabelEcoder 為特徵編碼
  - 論特徵工程重要性

- 模型面
  - 小心使用 `fit` 與 `fit_transform`
  - 僅使用測試集評估模型好壞
  - 在沒有交叉驗證的情況下判斷模型性能
  - 分類問題僅使用準確率作為衡量模型的指標
  - 迴歸問題僅使用 R2 分數評估模型好壞
  - 任何事情別急著想用 AI 解決


## 2. 訓練集與測試集的類別分佈不一致
在分類的資料中，初學者常見的錯誤是忘記使用分層抽樣 (stratify) 來對訓練集和測試集進行切割。當測試集的分佈盡可能與訓練相同情況下，模型才更有可能得到更準確的預測。在分類的問題中，我們更關心每個類別的資料分佈比例。假設我們有三個標籤的類別，這三個類別的分佈分別有 0.4、0.3、0.3。然而我們在切割資料的時候必須確保訓練集與測試集需要有相同的資料比例分佈。

通常我們都使用 Sklearn 的 `train_test_split` 進行資料切割。在此方法中 Sklearn 提供了一個 `stratify` 參數達到分層隨機抽樣的目的。特別是在原始數據中樣本標籤分佈不均衡時非常有用，一些分類問題可能會在目標類的分佈中表現出很大的不平衡：例如，負樣本與正樣本比例懸殊(信用卡盜刷預測、離職員工預測)。以下用紅酒分類預測來進行示範，首先我們不使用 `stratify` 隨機切割資料並查看資料切割前後的三種類別比例。

```py
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split

X, y = load_wine(return_X_y=True)

# Look at the class weights before splitting
pd.Series(y).value_counts(normalize=True)
```

```
# 全部資料三種類別比例
1    0.398876
0    0.331461
2    0.269663
dtype: float64
```

```py
# Generate unstratified split
X_train, X_test, y_train, y_test = train_test_split(X, y)


# Look at the class weights of train set
pd.Series(y_train).value_counts(normalize=True)
# Look at the class weights of the test set
pd.Series(y_test).value_counts(normalize=True)
```

```
# 訓練集三種類別比例
1    0.390977
0    0.330827
2    0.278195
dtype: float64

# 測試集三種類別比例
1    0.511111
0    0.266667
2    0.222222
dtype: float64
```

從上面切出來的訓練集與測試集可以發現三個類別的資料分佈比例都不同。因此我們可以使用 `stratify` 參數再切割一次。

```py
# Generate stratified split
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y)

# Look at the class weights of train set
pd.Series(y_train).value_counts(normalize=True)
# Look at the class weights of the test set
pd.Series(y_test).value_counts(normalize=True)
```

```
# 訓練集三種類別比例
1    0.400000
0    0.333333
2    0.266667
dtype: float64

# 測試集三種類別比例
1    0.398496
0    0.330827
2    0.270677
dtype: float64
```

我們可以發現將 `stratify` 設置為目標 (y) 在訓練和測試集中產生相同的分佈。因為改變的類別的比例是一個嚴重的問題，可能會使模型更偏向於特定的類別。因此訓練資料的分佈必須要與實際情況越接近越好。

## 9. 迴歸問題僅使用 R2 分數評估模型好壞
在預測連續性數值輸出的迴歸模型中，大家往往會直接呼叫模型提供的評估方法直接計算 `score`。然而這個分數在迴歸模型中是計算 R2 分數，又稱判定係數 (coefficient of determination)。所謂的判定係數是輸入特徵 (x) 去解釋輸出 (y) 的變異程度有多少，其計算公式是：迴歸模型的變異量 (SSR)/總變異量 (TSS) 。用以下變異數分析表（ANOVA table）來說 TSS 就是計算總變異，把每個實際的 y 減去平均數的平方加總起來。而 SSR 就是把所有的模型預測 y 減去平均數的平方加總起來。如果 R2 分數很高越接近 1，表示模型的解釋能力很高。

![](./image/img27-9.png)

在學術研究上最直覺的觀念是 R2 分數愈接近 1 越好，也有些人透過一些手段來製造 R2 分數很高的假象，詳細內容可以參考這篇[文章](http://amebse.nchu.edu.tw/new_page_535.htm)。其實只透過 R2 個評估指標就來決定一個模型的好壞是不太好的習慣。更進一步可以使用 MSE、MAE 等殘差的評估值標來看每筆資料實際值與預測值的誤差。或是使用相對誤差來觀察預測模型的可信度。此外筆者還建議可以試著把每筆資料的真實 y 與模型預測的 ŷ 繪製出來，若呈現一條明顯的由左下到右上斜直線，則表示模型所預測的結果與真實答案很相近。

![](./image/img27-10.png)




離群值越大間接增大 X 之分佈，即增大Sxx值，對R2之影響也變大更接近 1。