---
layout: post
title: '如何將 ONNX 模型打包成獨立 EXE'
categories: 'Python'
description: 'A quick guide to package ONNX models into standalone executable files.'
keywords: 'ONNX, executable, Nuitka, Python, packaging'
---

# 如何將 ONNX 模型打包成獨立 EXE
## 前言
許多開發者在完成模型訓練後，會面臨如何讓模型在各式平台上穩定運作的問題。本篇教學將以鳶尾花分類器為例，示範如何將 scikit-learn 訓練的模型轉換為 ONNX 格式，並利用 onnxruntime 撰寫一個互動式推論 App，最後透過 Nuitka 將整個應用程式打包成獨立的 EXE 檔案。

本教學的主要目標在於：
- **模型訓練與轉換**：教導你如何使用 scikit-learn 訓練一個簡單的鳶尾花分類器，再透過 skl2onnx 將模型轉換成 ONNX 格式，方便跨平台部署與效能優化。
- **推論應用實作**：透過 onnxruntime 撰寫一個互動式的 Python 應用程式，讓使用者能輸入四個特徵值，並即時獲得模型推論結果。
- **獨立應用程式打包**：說明如何使用 Nuitka 將 Python 應用程式打包成獨立的 EXE 檔案，確保應用程式在沒有安裝 Python 環境的電腦上也能運行。

透過這個完整流程，你將學習到從模型訓練、轉換、推論到應用程式打包的全套實作方法。

---

## 1. 訓練與轉換模型

使用 scikit-learn 訓練一個簡單的 LogisticRegression 模型，並利用 skl2onnx 轉換成 ONNX 模型。

建立 `train_and_convert.py`，內容如下：

```python
# train_and_convert.py
import numpy as np
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

# 載入鳶尾花數據集
iris = load_iris()
X, y = iris.data, iris.target

# 建立並訓練模型
model = LogisticRegression(max_iter=200)
model.fit(X, y)

# 定義模型輸入型態（4個特徵）
initial_type = [('float_input', FloatTensorType([None, 4]))]

# 將 scikit-learn 模型轉換成 ONNX 格式
onnx_model = convert_sklearn(model, initial_types=initial_type)

# 儲存 ONNX 模型
with open("iris.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())

print("ONNX 模型已產生：iris.onnx")
```

執行此程式後，會在目錄下產生 `iris.onnx` 模型檔。

---

## 2. 撰寫互動式推論 App
建立一個互動式推論應用程式 `app.py`，讓使用者輸入四個特徵，並用 onnxruntime 進行推論。由於為了簡單展示所以採用CMD介面進互動，你也可以使用 streamlit、tkinter等GUI框架進行應用。

```python
# app.py
import onnxruntime as ort
import numpy as np

def main():
    # 載入 ONNX 模型
    session = ort.InferenceSession("iris.onnx")
    input_name = session.get_inputs()[0].name

    # 讓使用者輸入四個特徵數值
    try:
        sepal_length = float(input("請輸入花萼長度："))
        sepal_width  = float(input("請輸入花萼寬度："))
        petal_length = float(input("請輸入花瓣長度："))
        petal_width  = float(input("請輸入花瓣寬度："))
    except ValueError:
        print("輸入錯誤！請輸入正確的數字。")
        return

    # 組成輸入資料（必須是 float32 型態）
    sample = np.array([[sepal_length, sepal_width, petal_length, petal_width]], dtype=np.float32)

    # 執行模型推論
    result = session.run(None, {input_name: sample})

    # 預設模型輸出第一個項目為預測類別
    predicted_class = result[0]
    print("預測結果：", predicted_class)

if __name__ == '__main__':
    main()

```

> **注意：**  
> 在打包時，由於使用 `--standalone` 模式，預設不會包含 `iris.onnx` 檔案。因此必須在打包時指定該檔案，也請使用者在執行時能正確找到模型檔。

---

## 3. 打包成 EXE 檔案

在確認 `app.py` 可以正常執行後，使用 Nuitka 打包成獨立的 EXE 檔案。請先安裝 Nuitka：

```bash
pip install nuitka
```

打包時，記得加入 `iris.onnx` 檔案，指令如下：

```bash
nuitka --standalone --onefile --include-data-files=iris.onnx=iris.onnx app.py
```

此指令會將 `iris.onnx` 加入打包結果，並且打包成單一 EXE 檔案，方便在沒有 Python 的電腦上執行。

---

## 小結
透過這個完整的範例，我們可以體驗如何從模型訓練、轉換成 ONNX，再到推論及打包成獨立應用程式的整個流程。

1. 執行 `train_and_convert.py` 來產生 `iris.onnx` 模型檔。
2. 撰寫並測試 `app.py`，利用 onnxruntime 載入模型並進行推論。
3. 使用 Nuitka 打包時，記得用 `--include-data-files` 將 `iris.onnx` 檔案加入，並透過程式取得正確路徑，確保打包後仍能正常載入模型。

