---
layout: post
title: '[Mac系統] 利用 Anaconda 建立 Python 虛擬環境'
categories: 'Mac'
description: 'Anaconda Python'
keywords:
---

## 安裝 Anaconda
若有 Python 機器學習上的執行需求 Anaconda 可以快速的在電腦本機上建置環境，並且擁有 conda 可以輕鬆做套件的管理及 Linux、OSX、Windows 系統上皆能輕鬆建立虛擬環境，算是入門 Python 及資料科學領域的人很好的一個工具。可以透過[官方網站](https://www.anaconda.com/products/individual)選取想要的版本並且下載。

## 建立虛擬環境
安裝完成後可以透過 GUI 介面來新增虛擬環境。

![](/images/posts/mac/2022/img1110216-1.png)

## 啟動虛擬環境
我們可以透過 anaconda 應用程式介面來查看目前系統中的虛擬環境。令我也能透過指令來查詢本機中有哪些環境。

```
conda env list
``` 

假設我建立了一個 test 的虛擬環境，若要啟動該虛擬環境在終端機輸入以下：

```
source activate test
```

進入虛擬環境後就可以自由地在該環境中建立轉案所需的環境。

```
套件安裝指令：
conda install packagename
pip install packagename
```

## 其他常用指令

```
# 查看目前環境套件
conda list
# 離開虛擬環境(自動回base)
conda deactivate
# 新建環境
conda create --name test1 python=3.6.13
# 移除環境
conda env remove --name test1
```

其他更多的指令可以透過官方查詢：[Conda指令](https://docs.conda.io/projects/conda/en/latest/index.html)