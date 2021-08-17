---
layout: post
title: '在 Jupyter Notebook 中播放影片'
categories: 'Python'
description:
keywords: 
---

# 前言
如果在雲端伺服器開發的時候，並無提供 GUI 介面來播放各種類型影片。僅有一個 Jupyter Lab 的視窗。如果要查看影片的時候通常都要將影片下載下來至本機中播放實在是非常的麻煩。因此本文將介紹幾個方法，使用者可以直接使用 Ipython notebook 當作播放影片的媒介。

## 方法一 (IPython.display)
第一種方法採用 IPython 內建的函式庫來顯示影片內容。使用方法很簡單，參考下面程式：

```py
from IPython.display import Video

Video("test.mp4")
```

![](/images/posts/Python/2021/img1100817-1.png)

## 方法二 (使用魔術指令)
另一種方法可以透過 IPython 提供的 `%%HTML` 魔術指令來撰寫 HTML 語法來顯示影片的內容。我們可以透過 `<video></video>` 標籤來播放想要的影片，同時也能設定影片尺寸以及其他設定。用法跟撰寫網頁幾乎差不多。

```py
%%HTML
<video width="320" height="240" controls>
  <source src="./output.mp4" type="video/mp4">
</video>
```

![](/images/posts/Python/2021/img1100817-2.png)

另外我們也可以透過 `<audio></audio>` 標籤來播放音訊檔案。

```py
%%HTML
<audio controls>
  <source src="./output.mp3">
</audio>
```

