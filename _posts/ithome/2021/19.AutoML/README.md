# AutoML


## AutoML 動機
大家還記得在 [[Day 5] 機器學習大補帖](https://ithelp.ithome.com.tw/articles/10265942) 中有提到完整的機器學習流程大致分成八個步驟。然而模型的訓練與超參數調整僅扮演其中的一環，選擇一個好的模型事件重要的事情。想必大家在訓練模型時一定會遇到一個棘手的問題，就是該如何正確選擇模型以及超參數？隨著越來越多的演算法不斷地被開發出來，要從茫茫大海中挑選一個合適的模型是件耗時的事。因此自動化機器學習 (Automated Machine Learning ,AutoML) 可以幫助我們在有限的時間內找出一個適合的模型。在近年來有許多人開始研究這類的問題，筆者彙整了幾個 Python 常見的 AutoML 開源套件：

- [AutoGluon](https://www.automl.org/automl/#:~:text=AutoML%20packages%20include%3A-,AutoGluon,-is%20a%20multi)
- [Auto-sklearn](https://automl.github.io/auto-sklearn/master/)
- [FLAML](https://github.com/microsoft/FLAML)
- [H2O AutoML](http://docs.h2o.ai/h2o/latest-stable/h2o-docs/automl.html)
- [LightAutoML](https://github.com/sberbank-ai-lab/LightAutoML)
- [Pycaret](https://pycaret.org/)
- [MLJAR](https://mljar.com/)
- [TPOT](https://github.com/EpistasisLab/tpot)
- [MLBox](https://github.com/AxeldeRomblay/MLBox)
- [Auto-PyTorch](https://github.com/automl/Auto-PyTorch)
- [AutoKeras](https://autokeras.com/)
- [talos](https://github.com/autonomio/talos)

## AutoML 扮演的角色
自動化機器學習提供了一系列的方法和自動化的學習流程，以提高機器學習的效率並加速機器學習的研究。透過 AutoML 集結專家的先驗知識，大幅降低了機器學習建模的困難度。雖然領域專家與 AI 工程師必然扮演重要的角色，但是近年來 `No Code` 無程式碼開發平台形成一股潮流。AI 再也不是需要資訊背景的人才能做的事，目的是讓大家不用透過寫程式也能快速地進行資料探索與建立預測模型。然而近年來許多企業開發了各種需求的 AutoML 平台，如雨後春雨般的出現：

- Google: Cloud AutoML
- Microsoft: Azure Machine Learning
- Amazon: SageMaker Autopilot
- Landing AI: LandingLens
- Chimes AI: tukey

