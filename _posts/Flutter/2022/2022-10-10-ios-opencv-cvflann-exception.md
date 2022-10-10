---
layout: post
title: 'Flutter 故障排除: libc++abi: terminating with uncaught exception of type cvflann'
categories: 'Flutter'
description: 'libc++abi: terminating with uncaught exception of type cvflann::anyimpl::bad_any_cast'
keywords: 
---

## 問題
最近正開發 Flutter 使用 Dart FFI 呼叫 OpenCV C++ 程式。並實作 Features2D-Homography 物件匹配，專案中並使用到 SIFT 特徵點提取言算法以及透過 knnMatch 計算兩張圖片相近的特徵點。只不過開發在電腦的 Android 與 iOS 模擬器運行都一切正常，但是在 iOS 實機運行時有閃退問題。在 Xcode 編譯器上提示這一行程式碼導致運行中斷：

```
matcher->knnMatch( descriptors1, descriptors2, knn_matches, 2 );
```

詳細 log 錯誤訊息如下：
```
libc++abi: terminating with uncaught exception of type cvflann::anyimpl::bad_any_cast
```


## 解決辦法
在 c++ 檔案中必須移除 `#import opencv2/opencv.hpp` 標頭，並手動添加專案中需要用到的標頭檔。在 SIFT 例子中需要引入：

```
#import <opencv2/imgcodecs.hpp>
#import <opencv2/calib3d.hpp>
#import <opencv2/features2d.hpp>
#import <opencv2/imgproc/imgproc.hpp>
```

> OpenCV 版本 4.5.2

- GitHub: [cpp-Features2D-Homography](https://github.com/1010code/cpp-Features2D-Homography)

## Reference
- [Opencv feature matching breaks on iPhone but not on simulator](https://stackoverflow.com/questions/55572773/opencv-feature-matching-breaks-on-iphone-but-not-on-simulator)