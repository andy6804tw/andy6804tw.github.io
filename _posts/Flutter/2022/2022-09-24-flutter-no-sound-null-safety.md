---
layout: post
title: 'Flutter 故障排除： dependencies not support null safety'
categories: 'Flutter'
description: 'Cannot run with sound null safety because dependencies don't support null safety'
keywords: 
---

## 前言
當執行舊版尚未支援 null safety 的 Flutter 專案時，跑出相依的檔案不支援 null safety：

```
Error: Cannot run with sound null safety, because the following dependencies
don't support null safety:
- XXX
- XXX

For solutions, see https://dart.dev/go/unsound-null-safety
Failed to compile application.
```

本篇文章提供三種解決辦法，並在 Android Studio 中能夠正常運行。

## 修改 Android Studio 配置文件
第一種方法直接在 Android Studio IDE 中的編譯配置文件中添加 `--no-sound-null-safety` 指令。使得程式在執行時會忽略檢查 null-safety。

![](/images/posts/Flutter/2022/img1110924-1.png)

![](/images/posts/Flutter/2022/img1110924-2.png)

## 在程式碼添加
第二種方法個人覺得最方便，直接在 `main.dart` 開頭添加 `// @dart=2.11` 就可以成功地被執行。因為在 Dart SDK 2.12 版後就是會預設開啟 Sound null safety。

```dart
// @dart=2.11
import 'package:flutter/material.dart';

void main() {
  //...
}
```

## 透過指令執行程式
第三種方法直接透過終端機輸入以下指令直接執行專案。輸入指令後會提示訊息要求你指定執行真錯的方式，例如 Chrome、Android 或 iOS 模擬器(要是先開啟才會被偵測到)。

```sh
flutter run --no-sound-null-safety
```

## Reference
- [Cannot run with sound null safety because dependencies don't support null safety](https://stackoverflow.com/questions/64917744/cannot-run-with-sound-null-safety-because-dependencies-dont-support-null-safety)