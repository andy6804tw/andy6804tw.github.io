---
layout: post
title: 'Python 使用 matplotlib 繪圖時顯示繁體中文'
categories: 'AI'
description: 'Colab 進行 matplotlib 繪圖時顯示繁體中文'
keywords: 'Python'
---

## 前言
由於 Colab 預設環境中並沒有中文字型，因此我們可以透過上傳一個中文字型。然後把這字型加入 matplotlib 字型家族中。以下範例使用台北黑體([翰字鑄造JT Foundry](https://sites.google.com/view/jtfoundry/))新增並指定字體後，即可正常顯示中文字。


## 下載字體與設定
```python
# 下載台北思源黑體
!wget -O TaipeiSansTCBeta-Regular.ttf https://drive.google.com/uc?id=1eGAsTN1HBpJAkeVM57_C7ccp7hbgSz3_&export=download
import matplotlib as mpl
import matplotlib.pyplot as plt 
from matplotlib.font_manager import fontManager

fontManager.addfont('TaipeiSansTCBeta-Regular.ttf')
mpl.rc('font', family='Taipei Sans TC Beta')
```

## matplotlib 顯示中文

```python
import numpy as np

x = np.linspace(-2*np.pi, 2* np.pi, 200)
y = np.sin(x)

plt.title('標題測試')
plt.plot(x,y)
```

![](https://i.imgur.com/xlUnrCR.png)

## Reference
- [Colab 進行matplotlib繪圖時顯示繁體中文](https://colab.research.google.com/github/willismax/matplotlib_show_chinese_in_colab/blob/master/matplotlib_show_chinese_in_colab.ipynb#scrollTo=-V2uiORvNza7)
- [蔡炎龍老師分享 colab99_在_matplotlib_中使用中文.ipynb](https://nbviewer.org/github/yenlung/Deep-Learning-Basics/blob/master/colab99_%E5%9C%A8_matplotlib_%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%B8%AD%E6%96%87.ipynb?fbclid=IwAR0qEzwT_62unuwy2aAs5-E5HOVsFus8OZY_b4E0BIjDqPS4vcnEutEMpok)