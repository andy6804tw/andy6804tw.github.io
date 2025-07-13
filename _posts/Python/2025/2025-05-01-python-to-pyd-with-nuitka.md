---
layout: post
title: '將 Python 檔案編譯為 `.pyd` 二進位檔保護原始碼與提升效率'
categories: 'Python'
description: 'Compile Python code to `.pyd` with Nuitka for better protection and performance.'
keywords: 'Python, Nuitka'

---

## 前言

在實務專案開發中，有時我們並不希望自己的 Python 原始碼（`.py`）被直接查看或輕易地被他人反編譯。Python 提供了多種檔案格式，包括 `.py`、`.pyc`、`.pyo`、`.pyw`、`.pyd` 等等，其中只有 `.pyd` 格式不易被反編譯，因為它本質上是二進位檔案（Windows 平台的 Extension Module），且相較於一般的 Python 程式碼，經過編譯後的 `.pyd` 檔案還能提供更快的執行速度。

本文將詳盡介紹如何透過 Nuitka 工具將 `.py` 檔案轉換為 `.pyd` 格式，進一步保護程式原始碼並提高運行效能，並進一步介紹如何處理更進階的案例，例如將整個資料夾核心用 `.pyd` 包起來。

## Python `.pyd` 格式說明

Python 中的 `.pyd` 檔案是在 Windows 平台上使用的 Python 動態連結函式庫（Dynamic Link Library，DLL），通常是由 C、C++ 等編譯型語言所撰寫，編譯後提供給 Python 作為模組直接使用。

### `.pyd` 檔案特點及用途：

1. **用途與 DLL 類似**：
   - `.pyd` 本質上為特殊的 DLL 檔案，專供 Python 使用。
   - Python 可直接透過 `import` 指令載入 `.pyd` 模組。

2. **提升效能**：
   - 使用 `.pyd` 模組通常是為了解決純 Python 程式效能不足的問題，透過 C、C++ 等語言提供高效能函式。

3. **使用場景**：
   - 廣泛用於科學計算、影像處理、數值運算或資料庫連接。
   - 常見的 NumPy、SciPy、OpenCV 等函式庫中也經常包含 `.pyd` 檔案以增進效率。

4. **跨平台差異**：
   - Windows 使用副檔名為 `.pyd`。
   - Linux 或 macOS 則使用 `.so` (Shared Object)。

### 如何使用 `.pyd` 模組：

將 `.pyd` 檔案放在 Python 可存取的路徑（如當前工作目錄）中，透過以下方式匯入：

```python
import mymodule  # 檔案為 mymodule.pyd
```

即可於 Python 中直接使用。

---

## 1. Nuitka 工具介紹與安裝

Nuitka 是一款優秀的 Python 編譯器，能夠將純 Python 程式轉換成高效能的二進位執行檔或 Extension Module。它的使用非常簡單，並能有效地將 Python 程式碼轉換為二進位格式。

首先，安裝 Nuitka：

```bash
pip install nuitka
```

## 2. 建立要編譯的 Python 範例檔案

這裡我們以一個非常簡單的加法函式為例，新建一個名為 `add.py` 的 Python 檔案。

```python
# add.py
def add(a, b):
    return a + b
```

## 3. 將 `.py` 編譯成 `.pyd` 文件

在建立好範例檔案之後，開啟終端機，進入到 `add.py` 所在的目錄，執行以下指令：

```bash
nuitka --python-flag=no_warnings,-O,no_docstrings --remove-output --no-pyi-file --module add.py
```

編譯完成後，目錄中將會產生一個名為 `add.pyd` 的二進位檔案（Windows 平台）。此檔案不僅可有效保護你的原始碼，更能提高執行效能。

## 4. 如何載入並使用編譯後的 `.pyd` 模組

你可以透過一般的 `import` 語法來使用剛剛生成的 `.pyd` 檔案。建立另一個測試檔案 `test_add.py`，以驗證編譯的模組是否可正常運行。

```python
# test_add.py
import add

if __name__ == "__main__":
    x = 10
    y = 20
    result = add.add(x, y)
    print(f"{x} + {y} = {result}")
```

執行測試檔案：

```bash
python test_add.py
```

你將看到以下結果，表示模組運行成功：

```
10 + 20 = 30
```

## 5. 進階案例：將整個資料夾核心編譯成 `.pyd` 模組

實際的專案通常會包含多個 Python 檔案及資料夾，因此我們也需要了解如何將整個資料夾的核心程式碼編譯成單一 `.pyd` 檔案，以進一步保護專案的核心邏輯。

### 5.1 資料夾結構示範

```
app/
├── __init__.py
├── operations.py
└── utils/
    ├── __init__.py
    └── math_ops.py
```

### 5.2 建立每個檔案的內容

#### `app/__init__.py`
```python
from .operations import add
```

#### `app/operations.py`
```python
from .utils.math_ops import multiply

def add(a, b):
    result = a + b
    return multiply(result, 1)  # 範例中調用 multiply 進行示範
```

#### `app/utils/__init__.py`
```python
from .math_ops import multiply
```

#### `app/utils/math_ops.py`
```python
def multiply(a, factor):
    return a * factor
```

### 5.3 編譯指令

使用 Nuitka 編譯整個資料夾核心，可以使用以下指令：

```bash
nuitka --python-flag=no_warnings,-O,no_docstrings --remove-output --no-pyi-file --module app --include-package=app
```

編譯完成後，會產生 `app.pyd` 檔案。

### 5.4 測試編譯後的模組

建立測試檔案 `test_app.py`，確認編譯成功：

```python
# test_app.py
import app

if __name__ == "__main__":
    result = app.add(5, 15)
    print(f"5 + 15 = {result}")
```

執行測試檔案：

```bash
python test_app.py
```

成功時會顯示：

```
5 + 15 = 20
```

## 6. 注意事項與建議

- 雖然將 Python 檔案編譯成 `.pyd` 能有效地保護原始碼，然而要完全避免被反編譯的可能性，建議進一步配合其他加密或混淆技術（如 PyArmor）來提升安全性。
- 編譯後的模組通常與特定的 Python 版本、平台環境（如 Python 3.x 與 Windows x64）綁定，需注意跨平台或跨版本部署的兼容性。
- 在正式部署前，務必對編譯後的模組進行完整的測試，以確保所有功能都與原始 Python 檔案表現一致。
