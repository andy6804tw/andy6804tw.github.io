---
layout: post
title: 'Flutter 專案如何在 macOS 上正確執行 iOS'
categories: 'Flutter'
description: 'Guide to running Flutter iOS apps on macOS'
keywords: 'Flutter,iOS,macOS,Xcode,Simulator'
---

## 前言
在 macOS 上開發 Flutter 時，許多開發者會先在 Android Studio 建立專案，接著希望能直接測試 iOS。但在新版 Android Studio 對於 iOS 相關操作的整合度已降低，不再在介面中提供明顯的『開啟 Xcode 模組』按鈕，因此原本依賴這個入口的流程就無法像過去一樣直接在 IDE 內完成。

> 有一部分人也習慣全部都在 VScode 上開發，兩者都行，就大家可以找出最舒適的開發方式。本文將以 Android Studio 的開發 Flutter 的使用者做解說。

### Android Studio 的 iOS 操作選項為什麼會消失？

許多工程師反映：

* 右鍵點 `ios/` → Flutter → 「Open iOS module in Xcode」不見了
* 或是只有在某些版本的 Android Studio 會出現

原因：

1. Flutter Plugin 版本變更
2. Android Studio 將 iOS 模組整合度降低
3. 官方傾向開發者使用 Xcode 處理 iOS 設定與編譯
4. 部分版本是 bug（官方 issue tracker 有列出）

**結論：新版 Android Studio 不再是控制 iOS 的核心工具。
iOS 相關流程應該全部使用 Xcode。**

## 環境需求

開始前請確認以下環境：

* macOS（Intel 或 Apple Silicon）
* 已安裝 Android Studio（含 Flutter/Dart 套件）
* 已安裝 Xcode（從 App Store）
* Flutter 環境已完成安裝

先用下面指令確認 Flutter 是否偵測到 iOS 工具鏈：

```bash
flutter doctor
```

看到：

```
[✓] Xcode - develop for iOS and macOS
```

代表環境正常。

若出現 license 警告，請執行：

```bash
sudo xcodebuild -license
```

## 在 iOS 模擬器執行 Flutter

iOS 模擬器不需要 Apple ID、不需要證書、不需要真機，只要能跑起來就可以測。以下提供在終端機執行的指令：

### **步驟 1：開啟模擬器**
請開啟終端機輸入以下指令啟動模擬器。

```bash
open -a Simulator
```

或從 Xcode：

> Xcode → Window → Devices and Simulators → 選一台 simulator → Open Simulator

---

### **步驟 2：進入 Flutter 專案並執行**

在專案根目錄：

```bash
cd /先進入到Flutter專案資料夾/
flutter run
```

或指定 iOS：

```bash
flutter run -d ios
```

Flutter 會直接用模擬器執行 App。

## 使用 Xcode 開啟 iOS 專案

新版 Android Studio 將「Open iOS module in Xcode」這個功能取消，因此無法直接透過內建 IDE 按鈕開啟 iOS 專案。因此**官方推薦方式**是直接用命令列或 Finder 開啟 Xcode 專案。

### **步驟 1：前往 iOS 資料夾**

在專案目錄輸入：

```bash
cd ios
pod install
cd ..
```

接著用 Xcode 開啟 Flutter 的 iOS 專案：

```bash
open ios/Runner.xcworkspace
```

這是 Flutter iOS 的正規入口，不要用 `.xcodeproj`。


## 如需真機測試（免費 Apple ID 即可）
若你想在自己的 iPhone 上測試 App，請依以下步驟：


### **步驟 1：用 USB 連接 iPhone**

打開：

> Xcode → Window → Devices and Simulators

確認有偵測到 iPhone。


### **步驟 2：在 Xcode 開啟你的專案**

```bash
open ios/Runner.xcworkspace
```


### **步驟 3：設定簽名（Signing）**

點選：

> Runner → Signing & Capabilities → Team

選擇你的 Apple ID（不用付錢的帳號即可）。


### **步驟 4：修改 Bundle Identifier**

因為不能跟任何 App 衝突，請改成你自己的像：

```
com.example.flutterdemo
```


### **步驟 5：按 Run**

Xcode 會自動編譯並推到你的 iPhone。

第一次執行會跳出「未受信任開發者」。


### **步驟 6：在 iPhone 上信任開發者**

iPhone：

> 設定 → 一般 → 裝置管理 → 點你的 Apple ID → 信任

完成後就能重跑 App。


##  結論
以下推薦最穩定的工作流程，給Flurter的新手快速參考

#### **Android 開發：**

用 Android Studio → 直接 Run

#### **iOS 開發：**
Android Studio 在 Flutter 專案中的定位是主要開發工具(或是使用VScode直接開發)，但 iOS 的編譯、簽名、模擬器與真機跑 App，都應該透過 Xcode 與命令列處理。

1. 用 Android Studio 寫 Flutter 程式
2. 用 Xcode 負責 iOS 設定、簽名、真機部署
3. 用 Terminal 執行 iOS 模擬器

```bash
open -a Simulator
flutter run
```



