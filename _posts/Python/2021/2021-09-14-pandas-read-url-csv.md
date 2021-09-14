---
layout: post
title: 'Pandas 套件讀取 URL 檔案'
categories: 'Python'
description: 'Python setInterval'
keywords: 
---

## 前言
在進行機器學習時常常需要透過 pandas 讀取本機中的 csv 檔案。若當你的檔案是放在雲端的時候可以直接讀取網址並下載並轉成 dataframe 格式嗎？答案是可以的。在本篇文章將教各位兩種讀取放在 Google Drive 與 GitHub 上的 csv 檔案。

## 方法一：使用 Pandas

### 讀取 Google Drive 檔案
首先將 csv 檔案上傳至 Google 雲端硬碟中。並且右鍵點選取得連結，並將權限開啟`知道連結的使用者`。接著把連結中的 ID 複製下來，如下圖中紅色底線部分。


![](/images/posts/Python/2021/img1100914-1.png)
![](/images/posts/Python/2021/img1100914-2.png)

接著將複製的 ID 貼到程式中的 `id` 變數中。並直接使用 pandas 的 `read_csv()` 方法讀取檔案。 

```py
import pandas as pd

id='1Aq9WYVS_8ZZ9i77PqJZ6bJFuHBs-Je1n'
url= f"https://docs.google.com/uc?id={id}&export=download"
raw_dataset = pd.read_csv(url)
raw_dataset
```

若有出現資料即代表資料匯入成功！
![](/images/posts/python/2021/img1100914-3.png)

另外讀取 GitHub 的 csv 檔案也很簡單：

```py
import pandas as pd

url='https://github.com/1010code/iris-dnn-tensorflow/raw/master/data/Iris.csv'
raw_dataset = pd.read_csv(url)
raw_dataset
```

## 方法二：透過 request 下載
此方法基本上可以被第一種方法取代。他是先過 `request` 套件將指定的網址內容下載並透過 `io` 編碼成 utf-8 格式

```py
import pandas as pd
import io
import requests

url = 'https://github.com/1010code/iris-dnn-tensorflow/raw/master/data/Iris.csv'
s=requests.get(url).content
df_data=pd.read_csv(io.StringIO(s.decode('utf-8')))
df_data
```