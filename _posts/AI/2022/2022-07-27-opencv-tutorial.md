---
layout: post
title: 'Python OpenCV 基礎用法整理'
categories: 'AI'
description: 
keywords: 'OpenCV'
---

## 安裝
OpenCV 對於影像處理領域的人應該不陌生，他的安裝方式如下：

```sh
pip install opencv-python
```

若想使用更進階的功能，必須安裝下面套件取得更多的影像辨識方法。

```sh
pip install opencv-contrib-python
```

安裝完成後可以試試載入套件。

```py
import cv2
import matplotlib.pyplot as plt
```

## 讀取照片
首先給予圖片路徑，OpenCV 將會讀取指定路徑的圖片。一張全彩的影像有三個通道 (R、G、B)，直得注意的是 OpenCV 內建預設讀取出來的影像通道順序是 BGR。因此我們透過 matplotlib 顯示影像時顏色會有點奇怪。

```py
img_path= './cat.png' # 照片路徑
cv_img = cv2.imread(img_path) # 讀取照片
plt.imshow(cv_img) # 顯示圖像
```

![](https://github.com/1010code/opencv-tutorial/raw/main/screenshot/demo01.png)

我們可以透過 `cvtColor()` 方法將 BGR 影像轉成一般我們常見的 RGB 影像。

```py
rgb_img = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)
plt.imshow(rgb_img)
```

![](https://github.com/1010code/opencv-tutorial/raw/main/screenshot/demo02.png)

另一種方法是透過矩陣索引的方式將通道反轉過來。

```py
rgb_img = cv_img[:, :, ::-1]
```

## 影像縮放
透過 `resize()` 方法可以將輸入的影像解析度放大或縮小。`interpolation` 是插值的方法，OpenCV 提供多種插值方法可以實現。
 
```py
resize_img = cv2.resize(origin_img, (64, 64), interpolation=cv2.INTER_AREA)
plt.imshow(resize_img)
```

![](https://github.com/1010code/opencv-tutorial/raw/main/screenshot/demo03.png)

## 影像二值化
cv2.threshold 最主要的功能是能夠幫助我們將一張圖片做二值化，二值化的意思是圖片只會剩下兩個值，通常是黑(255)與白(0)。

[參考](https://www.wongwonggoods.com/python/python_opencv/opencv-threshold/)

```py
blurred_image = cv2.GaussianBlur(rgb_img, (5,5), 0)

gray = cv2.cvtColor(blurred_image, cv2.COLOR_BGR2GRAY)
_, threshold = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)

plt.imshow(threshold, cmap='gray')
```

透過 `cv2.THRESH_BINARY_INV` 可以讓黑白顛倒。

```py
_, threshold = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY_INV)

plt.imshow(threshold, cmap='gray')
```

[範例程式](https://github.com/1010code/opencv-tutorial/blob/main/tutorial.ipynb)