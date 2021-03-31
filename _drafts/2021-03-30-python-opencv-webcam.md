
## 擷取 webcam 串流影像
我們可以透過 `cv2.VideoCapture` 建立一個 VideoCapture 物件。並設定它的參數來指定要使用哪一隻攝影機 (0 代表電腦內建的視訊鏡頭)。建立好 VideoCapture 物件之後，就可以使用 `read()` 方法來擷取一張張連續的影像。此外如果要修改影像的大小可以透過  `imutils` 來將每個影像 `frame` 進行影像縮放。

```py
import cv2
import imutils

cap = cv2.VideoCapture(0)


while(True):
  ret, frame = cap.read()
  # 影像縮放
  frame = imutils.resize(frame, width=320)
  # 鏡像
  frame = cv2.flip(frame,180)
  cv2.imshow('frame', frame)
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()
```

#### 查詢影像大小
我們可以透過以下程式來查詢，影像預設的尺寸大小。

```py
# 取得影像的尺寸大小
width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
```