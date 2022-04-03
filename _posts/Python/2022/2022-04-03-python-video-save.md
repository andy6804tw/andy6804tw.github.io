---
layout: post
title: 'Python '
categories: 'Python'
description: 'Loading and saving mp4 video file with imageio library'
keywords: 
---

## 前言
Python 進行影像處理有很多種套件，今天要介紹的是 Imageio 這個函式庫。提供了一個簡單的接口來讀取和寫入各種圖像數據，包括動畫圖像、影片...等。

## 安裝
安裝方式很簡單，如下：

```
pip install imageio
```

如果要輸出影像必須還要安裝下面這個套件：

```
pip install imageio-ffmpeg
```

## 採用 imageio 輸出影像
由於 cv2 在讀某些檔案會偵測不到正確 FPS，因此可以使用 imageio 解決。

- 編碼方式: H.264
- mp4 檔

```py
import imageio
# load video
reader = imageio.get_reader('./data/demo.mp4')
# get video fps
fps = reader.get_meta_data()['fps']
writer = imageio.get_writer('./output.mp4', fps=fps)

print(f'video info: {reader.get_meta_data()}')
for img in reader:
    writer.append_data(img)
writer.close()
```

完整 Code 可以從我的 [GitHub](https://github.com/1010code/video-convert) 中取得！