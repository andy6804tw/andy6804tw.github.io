---
layout: post
title: '[Mac系統] 解決 dlib 無法安裝問題'
categories: 'Mac'
description:
keywords: 
---

## 前言
在 Mac OS 環境下在安裝到到dlib時候遇到錯誤 `CMake must be installed to build the following extensions: dlib` 。該如何解決呢？錯誤訊息是要求使用者先安裝 CMake 才能建構 dlib。

![](/images/posts/mac/2019/img1081009-1.png)

### 環境
- python 3.7.4
- MacBook Pro

## 解決方法
下載並安裝 [Cmake](https://cmake.org/download/) 工具。CMake是個一個開源的跨平台自動化建構系統，用來管理軟體建置的程式。簡單來說 CMake 是一個跨平台的編譯(Build)工具，可以用簡單的語句來描述所有平台的編譯過程。

進入 [Cmake](https://cmake.org/download/) 官網後選擇相對應的系統進行安裝，安裝之後再用 pip 安裝 dlib 依舊報錯誤訊息。

我們需要再做最後一步驟將環境路徑指定:
```bash
sudo "/Applications/CMake.app/Contents/bin/cmake-gui" --install
```

![](/images/posts/mac/2019/img1081009-2.png)

上述步驟完成後再試一次安裝應該就沒問題囉！

參考: https://zhuanlan.zhihu.com/p/41228260
