---
layout: post
title: 'Google colab 指令下載 drive 檔案'
categories: 'Program'
description: 'Google Drive direct download for big files'
keywords:
---

## 前言
當在 Google colab 使用 `wget` 指令下載 Google drive 檔案時若檔案太大或是特定格式的檔案會因為格式無法被防毒掃描導致下載失敗。

```
--2022-02-20 13:02:41--  https://docs.google.com/uc?export=download
Resolving docs.google.com (docs.google.com)... 173.194.196.138, 173.194.196.139, 173.194.196.101, ...
Connecting to docs.google.com (docs.google.com)|173.194.196.138|:443... connected.
HTTP request sent, awaiting response... 400 Bad Request
2022-02-20 13:02:42 ERROR 400: Bad Request.
```

## 解決辦法
### 方法一：使用 wget
在網址中添加 `confirm=no_antivirus` 繞過掃描直接跳出下載對話框。除此之外使用 wget 下載這類型檔案必須在後面加上 `--no-check-certificate` 。

```
!wget -O utils.py --no-check-certificate "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1Lu9SOxTKimEW-KNFqPqWuqQcBpWQDo78"
```


### 方法二：使用 gdown

```
!gdown "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1Lu9SOxTKimEW-KNFqPqWuqQcBpWQDo78"
```