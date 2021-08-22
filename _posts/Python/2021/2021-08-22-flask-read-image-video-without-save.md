---
layout: post
title: 'Flask 接收圖片與影像檔案不儲存直接讀取'
categories: 'Python'
description: 'Python flask upload file but do not save and use'
keywords: 
---

## 前言
在實作 Flask 專案時，若需要從前端傳送圖片有兩種方法。其中一種方式是前端將圖片編碼成 base64 並以文字方式除送到後端 API 中，並將 base64 字串轉成 cv2 影像格式。另一種方式前端透過 form-data 格式傳給後端 API。此時後端 Flask 會遇到問題。該如何處理前端所傳送過來的檔案？最簡單方式是先將它存起來，之後再透過 OpenCV 讀取指定位置的圖片。如果你認為儲存動作是多餘的，不想佔用儲存的資源可以參考以下做法。此外本篇文章也提供影像讀取的方法，也不用需要儲存到伺服器中。

## 圖片直接讀取
以下範例前端透過 form-data 格式傳給後端 API。並透過 `read()` 取得二進位資料。並透過 `np.fromstring()` 轉成 ndarray 形式。最後再透過 `cv2.imdecode()` 將 ndarray 轉換成擁有 RGB 3 個 channel 的圖像矩陣格式。

```py
@demo.route('', methods=['POST'])
def imagePost():
  # load style image
  styleImage = request.files['imageFile'].read()
  styleImage = np.fromstring(styleImage, np.uint8)
  styleImage = cv2.imdecode(styleImage, cv2.IMREAD_COLOR)[:,:,::-1]
```

## 影像讀取
我們可以使用 `tempfile` 這個函式建立的臨時的檔案，關閉後會自動刪除。因此接收從前端傳送過來的影像檔案並放入暫存資料夾。透過兩種方法讀取影像中的每個 frame，以下提供 OpenCV 與 imageio 兩種影像讀取的方式。

#### - 使用 cv2
```py
@demo.route('', methods=['POST'])
def videoPost():
    # load video
    videoFile = request.files['file']
    tempVideoFile = tempfile.NamedTemporaryFile()
    tempVideoFile.write(videoFile.read())
    cap = cv2.VideoCapture(tempVideoFile.name)
    # Read until video is completed
    while(cap.isOpened()):
    # Capture frame-by-frame
    ret, frame = cap.read()
    if ret == True:
        # resulting frame
        print(frame.shape)
    # Break the loop
    else: 
        break
    # When everything done, release the video capture object
    cap.release()
```

#### - 使用 imageio
```py
# load video
videoFile = request.files['file']
# get file enxention
fileExtention = '.'+videoFile.filename.split('.')[1]
tempVideoFile = tempfile.NamedTemporaryFile()
tempVideoFile.write(videoFile.read())
reader = imageio.get_reader(tempVideoFile.name, fileExtention)
# read frames
for im in reader:
    print(im.shape)
```