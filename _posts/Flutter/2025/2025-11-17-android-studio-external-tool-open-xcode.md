---
layout: post
title: '在 Android Studio 建立 External Tool 一鍵開啟 Xcode'
categories: 'Flutter'
description: 'Setup an Android Studio external tool to launch Xcode.'
keywords: 'AndroidStudio, Xcode, Flutter, iOS, ExternalTool'
---

## 前言
在新版的 Android Studio 裡，原本用來直接開啟 iOS 模組的功能（如 *Open iOS module in Xcode*）已經不再穩定存在，許多開發者在 Flutter 專案中想切換到 Xcode 進行 iOS 設定時，往往得手動打開 Finder、一路點到 `ios/Runner.xcworkspace` 才能開啟，流程相當不方便。

為了讓跨平台開發的流程更順手，本篇文章將示範如何在 Android Studio 裡建立一個 **External Tool**，只要按一下就能立即啟動 Xcode，開啟 Flutter 專案的 iOS 工程。這樣不僅能加速日常開發，也能避免切換工具時的繁瑣步驟，讓你在 macOS 上處理 Flutter + iOS 的工作流程更有效率。

## 在 Android Studio 新增 External Tool

![](/images/posts/Flutter/2025/img1141117-1.png)

#### **1. 開啟設定**

macOS：

```
Android Studio → Settings
```


#### **2. 前往 External Tools**

左側選單：

```
Tools → External Tools
```

點右上角 **＋ Add**



#### **3. 填寫 External Tool 內容**

請依照以下設定：

##### **Name**

```
Open iOS in Xcode
```

##### **Program**

macOS 的 `open` 指令：

```
open
```

##### **Arguments**

使用 `$ProjectFileDir$` 指向當前開啟的專案路徑：

```
-a Xcode $ProjectFileDir$/ios/Runner.xcworkspace
```

#### **Working directory**

```
$ProjectFileDir$
```


其他選項都保持預設即可。設定完成後按下 OK，就代表你已經在 Android Studio 裡建立好一個可用來啟動 Xcode 的外部工具。下來你只要在 Android Studio，在 Project 模式下找到 ios 資料夾點選`右鍵->External Tools -> Open iOS in Xcode`。此時 Xcode 就會自動開啟你的 Flutter iOS 專案。

![](/images/posts/Flutter/2025/img1141117-2.png)

## 遇到的常見錯誤

#### **1. 打不開 xcworkspace？**

確認 `Pod install` 已執行：

```
cd ios
pod install
```


#### **2. 出現模組不存在錯誤？**

先跑：

```
flutter clean
flutter pub get
cd ios
pod repo update
pod install
```

