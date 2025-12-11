---
layout: post
title: '離線電腦搬移 Conda 環境：工具無法執行的原因與修復方法（以 uvicorn 示範）'
categories: 'Python'
description: 'A guide to fixing broken CLI tools after offline Conda environment migration on Windows using uvicorn as an example.'
keywords: 'conda, offline environment, windows cli, uvicorn, environment migration'
---

## 前言
在某些專案或部署需求中，我們常會遇到必須將開發環境搬到一台**完全離線、無法連網的 Windows 電腦**的情境。
因無法使用 pip install 或 conda install，最常見的做法就是：

> 將舊電腦的 Conda 虛擬環境資料夾
> `C:\ProgramData\miniforge3\envs\<env_name>`
> 壓縮後複製到新電腦直接使用。

這方法整體上可行，但在 Windows 上常會遇到一個問題：

> 原本環境裡某些工具（例：uvicorn）在新電腦上無法啟動。

其實最簡單的解法是**確保新電腦安裝的 Conda 路徑與舊電腦完全一致**

如果舊電腦的 Conda 位於：

```
D:\software\miniforge3\
```

那新電腦也必須用相同的路徑安裝。
這樣 `.exe` 裡寫死的 Python 路徑就能正常找到，問題也不會發生。

但如果新電腦無法維持相同路徑（例如根本沒有 D 槽），
那麼你可以參考以下兩種離線可行的方法來修復工具。


## 為什麼環境搬家後工具會故障？

Windows 版本的 pip／conda 在安裝某些工具時，會在：

```
C:\ProgramData\miniforge3\envs\<env_name>\Scripts\
```

生成 `.exe` 啟動器。

這些 `.exe` 在建立時會**寫死當時 Python 的絕對路徑**，例如：

```
"D:\software\miniforge3\envs\myenv\python.exe" "...\uvicorn-script.py"
```

當環境被搬到新的位置或新電腦上時：

* Python 路徑改變
* `.exe` 仍引用舊路徑
* 工具就會找不到 Python → 直接無法啟動

這不是工具本身的 bug，而是 Windows 路徑綁定的行為。

## 離線條件下最有效的兩種修復方式（以 uvicorn 示範）


### 方法一：改用 `python -m` 執行（最快速、最簡單）

避開壞掉的 `.exe`，直接用 Python 執行模組本體。

例如：

```
python -m uvicorn app.main:app --reload
```

能正常運作代表環境中的套件功能都還在，只是啟動器失效而已。


### 方法二：建立 `.cmd` 檔覆蓋舊啟動器（離線環境中最推薦）

這方法能讓你繼續用短指令（如 `uvicorn`）啟動工具。

#### ① 查出環境中 Python 的正確路徑：

```
where python
```

假設輸出：

```
C:\ProgramData\miniforge3\envs\myenv\python.exe
```

#### ② 到環境主資料夾建立 `.cmd` 啟動器

進到：

```
C:\ProgramData\miniforge3\envs\myenv\
```

新增檔案：

```
uvicorn.cmd
```

內容：

```bat
@echo off
"C:\ProgramData\miniforge3\envs\myenv\python.exe" -m uvicorn %*
```

#### ③ 之後就能直接使用：

```
uvicorn app.main:app --reload
```

#### 為什麼 `.cmd` 要放在環境主資料夾而不是 Scripts？

因為 Conda activate 後 PATH 會變成：

```
C:\ProgramData\miniforge3\envs\myenv\           ← 第一順位
C:\ProgramData\miniforge3\envs\myenv\Scripts\
...
```

也就是：

* 主資料夾永遠優於 Scripts
* 你建立的 `.cmd` 會比壞掉的 `.exe` 更早被找到
* 不需要重裝、不依賴網路，就能立即修復

這是離線環境最穩定、最容易維護的方法。


## 結語

在無網路的 Windows 環境中搬移 Conda 虛擬環境時，工具無法執行的根本原因通常是：

> 啟動器 `.exe` 裡綁死的 Python 路徑與新電腦不一致。

最簡單的解法是：**讓新電腦的 Conda 安裝位置與舊電腦完全一致**

若無法達成，則可以使用以下兩種方式修復：
1. 使用 `python -m` 直接呼叫工具
2. 建立 `.cmd` 啟動器覆蓋壞掉的 `.exe`

在完全離線的狀況下，這兩種方式都能快速而有效地讓工具恢復正常運作。

