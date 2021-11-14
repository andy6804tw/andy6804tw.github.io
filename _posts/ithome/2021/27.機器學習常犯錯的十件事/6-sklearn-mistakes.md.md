
Sklearn 很方便也很強大，該套件也集結了各式各樣的機器學習演算法與資料處理相關的工具。當你的語法錯誤的時候，時候 Sklearn 往往會吐出現一片紅色的錯誤訊息或是警告。這些訊息會提示你該如何去修正這些問題，筆者建議直接滑鼠滾到最後一行看錯誤訊息。如果對這些紅字毫無頭緒，通常將這些訊息複製到 Google 也能找到一些相關的解決方式。永遠記住 [Stack Overflow](https://stackoverflow.com/) 是工程師的好夥伴！

![](https://content.presspage.com/uploads/2658/c800_logo-stackoverflow-square.jpg?98978)

但是如果你都沒有收到任何錯誤或警告是代表都沒事嗎？不盡然。雖然 Sklearn 套件都已經幫你包裝好，只要詳細了解超參數的設定以及模型方法的使用基本上是沒問題的。但是一般人往往會犯一些邏輯上的小毛病，雖然表上面上訓練結果非常好但是背後可能造成資料洩漏(data leakage)的疑慮。尤其是在初學階段，因缺乏經驗往往會犯一些無可避免的錯誤。所以這篇文章將點出 6 個機器學習中常犯的隱形錯誤。


https://www.capitalone.com/tech/machine-learning/10-common-machine-learning-mistakes/










## 8. 使用準確度作為衡量分類器性能的指標
在預設的情況下所有 Sklearn 分類器在呼叫 `.score` 函數時都使用準確度作為評分方法。由於準確率的計算方式簡單與容易理解，因此經常會看到初學者廣泛使用它來判斷其模型的性能。不幸的是這種一般準確率的評估方式只對類別平衡的二元分類問題有用。

然而在其他的狀況下它是一個誤導性的指標，即使是表現最差的模型也可能背後隱藏著高準確度的分數。舉例來說有個偵測垃圾郵件的模型它的準確率 90%，但是實際上它根本無法偵測到垃圾郵件。這是為什麼？由於垃圾郵件並不常見，分類器可以檢測所有非垃圾郵件，即使分類器完全無法達到其目的這也可以提高其準確性。因為這個分類器僅可以分類這些正常郵件，稀少的垃圾郵件根本變認不出來。

對於多元類分類的問題更是應該注意你的模型評估指標。如果達到 80% 的準確率，是否意味著模型在預測類別1、類別2、類別3甚至所有類時一樣準確呢？一般的準確率永遠無法回答此類問題，但幸運的是其他分類指標提供了更多的訊息指標。它就是[混淆矩陣](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html)(confusion matrix)。

```py
from sklearn.metrics import confusion_matrix
y_true = [2, 0, 2, 2, 0, 1]
y_pred = [0, 0, 2, 2, 0, 2]
confusion_matrix(y_true, y_pred)
```

```
array([[2, 0, 0],
       [0, 0, 1],
       [1, 0, 2]])
```


組成混淆矩陣的四個元素分別有 TP、TN、FP、FN。基本上混淆矩陣會拿這四個指標做參考，同時算出來的分數也更能去評估你的模型訓練的結果。此外我們可以利用混淆矩陣來計算 Precision、Recall、Accuracy 等分數。

- TP(True Positive): 正確預測成功的正樣本，例如真實答案(Ground True)是貓，成功的把一張貓的照片預測成貓，即為TP
- TN(True Negative): 正確預測成功的負樣本，成功的把一張狗的照片標示成不是貓，即為TN
- FP(False Positive): 錯誤預測成正樣本，實際上為負樣本，例如：錯誤的把一張狗的照片預測成貓
- FN(False Negative): 錯誤預測成負樣本，實際上為正樣本，例如：錯誤的把一張貓的照片預測成不是貓

![](https://i.imgur.com/YrPOOJ0.png)