

你是否曾經覺得模型有太多的超參數而感到厭煩嗎?要從某一個演算法得到好的解必須要調整超參數，所謂的超參數就是控制訓練模型的一組神秘數字，例如學習速率就是一種超參數。你永遠都不知道 0~1 之間哪一個數字是最適合的，唯一的方法就是試錯(trial and error)。那萬一模型有多個超參數可以控制，豈不是就有成千上萬種組合要慢慢嘗試嗎？如果你有也這個問題，看這篇就對了！雖然你可能聽過 Sklearn 的 GridSearchCV 同樣也是暴力的找出最佳參數，或是使用 RandomizedSearchCV 指定超參數的範圍並隨機的抽取參數進⾏訓練，其它們的共同缺點是非常耗時與佔用機器資源。這裡我們要來介紹 Optuna 這個自動找超參數的方便工具，並且可以和多個常用的機器學習演算法整合。Optuna 透過調整適當的超參數來提高模型預測能力，此專案最初於 2019 發表於 arxiv 的一篇論文 [Optuna: A Next-generation Hyperparameter Optimization Framework](https://arxiv.org/abs/1907.10902) 同時開源在 GitHub 上免費提供大家使用。

![](https://i1.kknews.cc/SIG=ftds2a/ctp-vzntr/EbB3Zg26ECSuGg.jpg)