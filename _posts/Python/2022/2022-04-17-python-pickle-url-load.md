---
layout: post
title: 'Python 透過 google drive url 載入 pickle 模型'
categories: 'Python'
description: 'google drive url load pickle model'
keywords: 
---

## 前言
常見的儲存模型的套件有 [pickle](https://docs.python.org/3/library/pickle.html) 與 [joblib](https://joblib.readthedocs.io/en/latest/)。雖然在今天的教學中則使用另一種方法 pickle 來儲存模型。執得一提的是，在 Python 官方文件中有警告絕對不要利用 pickle 來 unpickle 來路不明的檔案。因為透過 pickle 打包模型會有安全性疑慮，包括 `arbitrary code execution` 的問題，詳細內容可以參考這篇[文章](http://www.benfrederickson.com/dont-pickle-your-data/)。


## 使用 pickle 儲存模型

```py
import pickle
with open('model.pickle', 'wb') as f:
    pickle.dump(model, f)
```

## 載入本機 pickle 模型

```py
with open('model.pickle', 'rb') as f:
    model = pickle.load(f)
```

## 載入雲端 pickle 模型
首先將你的 `.pickle` 模型上傳到 Goodle Drive 雲端硬碟中，並設定權限公開。接著複製連結上的 ID 並取代下面 `url` 字串中的 `XXXX_YOUR_ID_XXXX` 即可。

```py
import urllib.request
import pickle

def fetchPickleFileFromHttp(pickle_file_url, timeout_s=1):
    try:
        if pickle_file_url:
            data = urllib.request.urlopen(pickle_file_url, timeout=timeout_s)
            return pickle.load(data)
        else:
            return []
    except Exception as error:
        print('讀取失敗', error)
        return []

url = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=XXXX_YOUR_ID_XXXX'
 
xgbModel = fetchPickleFileFromHttp(url)
```