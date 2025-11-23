---
layout: post
title: 'Flutter 專案 + OpenCV 與 Android 16KB Page Size 的那點事'
categories: 'Flutter'
description: 'Building OpenCV for Android from Source (with Extra Modules and 16KB Page Size Support)'
keywords: 'Flutter, OpenCV, Android'
---

## 前言
近來在做一個 **Flutter** 專案，需要用到 **OpenCV** 做影像處理。考量到既有程式碼與套件相容性，我採用 **OpenCV 4.5.2**（老版本）。但 2025 年 Google 的新政策正式上路：**自 2025/11/01 起，只要你的 App 上架 Google Play 且 target Android 15（API 35）以上，就必須支援 16KB page size**。也就是說，App 內所有 **native .so** 都要能在 4KB/16KB page size 的機制下正常載入。

![](https://github.com/1010code/opencv-android-build/blob/main/Screenshot/img1141122-1.png?raw=true)

## 背景與目標

* **情境**：Flutter App 透過自製 plugin 呼叫 C++（JNI），在 Android 裝置上執行 OpenCV 影像演算法。
* **限制**：既有模組沿用 **OpenCV 4.5.2**。
* **規範**：Google Play 自 2025/11/01 起，target API 35+ 的 App **必須支援 16KB page size**。
* **目標**：產出 **支援 Flexible Page Size（含 16KB）** 的 OpenCV **動態庫（.so）**，能直接被 Flutter plugin 連結使用。

---

## 核心觀念先講清楚

1. **Flutter 不需要 `libopencv_java4.so`**
   Flutter plugin 走的是 **Dart →（Java/Kotlin 僅作橋接）→ JNI → C++**。
   也就是你真正用到的是 **OpenCV 的 C++ API** 對應的 `.so`（例如 `libopencv_world.so` 或各模組的 `.so`），**不是** Android Java API 的 `libopencv_java4.so`。

   > 結論：**不要把時間卡在編 `libopencv_java4.so`**。在新環境（NDK r27 / 新 SDK）上，OpenCV 4.5.2 的 Java 綁定系統已經過時，容易失敗，而且你其實用不到。

2. **支援 16KB 的關鍵是「Flexible Page Size」**
   只要在編譯 OpenCV 時開啟
   `ANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON`
   並用 NDK r27 的 toolchain 產出 `.so`，即可符合 Google 未來要求。

---

## 我的編譯環境（macOS）

* CMake **3.22.1**（Android SDK 內附）
* Ninja **1.10.0**
* Python **3.13.2**
* Java **17.0.12**（僅供環境完整；本文路線**不**需要 Java 綁定）
* Android SDK（Android Studio Meerkat 2024.3.1）
* Android NDK **r27**（27.2.12479018）

**Android SDK Tools（建議在 Android Studio → SDK 工具確認）**

* Android SDK Build-Tools **36.x**
* NDK **27.2.12479018**
* CMake **3.22.1**

---

## Step1. 下載原始碼版本
可以透過用 git 方式下載並進入分支。

```
git clone -b 4.5.2 https://github.com/opencv/opencv.git
git clone -b 4.5.2 https://github.com/opencv/opencv_contrib.git
```

* [opencv-4.5.2](https://github.com/opencv/opencv/releases/tag/4.5.2)
* [opencv_contrib-4.5.2](https://github.com/opencv/opencv_contrib/releases/tag/4.5.2)


> 用舊版是為了與既有邏輯相容；若能升級新版 OpenCV，建議優先評估，但本文聚焦「舊版也要上線」的實務場景。


## Step2. 建立配置檔與腳本

* 編譯組態（開啟 Flexible Page Sizes，並**關閉 Java 綁定**，專注 C++ .so）
  **ndk-27.config.py**

```py
ANDROID_NATIVE_API_LEVEL = int(os.environ.get('ANDROID_NATIVE_API_LEVEL', 21))
cmake_common_vars = {
    'BUILD_SHARED_LIBS': 'ON',
    'BUILD_ANDROID_PROJECTS': 'OFF',
    # 'BUILD_JAVA': 'ON',
    # 'BUILD_opencv_java': 'ON',

    'WITH_TBB': 'OFF',
    'BUILD_opencv_img_hash': 'OFF',
    'ANDROID_COMPILE_SDK_VERSION': os.environ.get('ANDROID_COMPILE_SDK_VERSION', 34),
    'ANDROID_TARGET_SDK_VERSION': os.environ.get('ANDROID_TARGET_SDK_VERSION', 34),
    'ANDROID_MIN_SDK_VERSION': os.environ.get('ANDROID_MIN_SDK_VERSION', ANDROID_NATIVE_API_LEVEL),
    'ANDROID_GRADLE_PLUGIN_VERSION': '8.4.1',
    'GRADLE_VERSION': '8.6',
    'KOTLIN_PLUGIN_VERSION': '1.9.22',
    'ANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES': 'ON',
}
ABIs = [
    ABI("2", "armeabi-v7a", None, ndk_api_level=ANDROID_NATIVE_API_LEVEL, cmake_vars=cmake_common_vars),
    ABI("3", "arm64-v8a",   None, ndk_api_level=ANDROID_NATIVE_API_LEVEL, cmake_vars=cmake_common_vars),
    ABI("5", "x86_64",      None, ndk_api_level=ANDROID_NATIVE_API_LEVEL, cmake_vars=cmake_common_vars),
    ABI("4", "x86",         None, ndk_api_level=ANDROID_NATIVE_API_LEVEL, cmake_vars=cmake_common_vars),
]

```

* 一鍵建置腳本（呼叫官方 `build_sdk.py`，帶入 config 與 contrib 模組路徑）
  **opencv_android_build.sh**

```sh
OPENCV_SRC=$PWD/opencv
OPENCV_CONTRIB=$PWD/opencv_contrib
OPENCV_BUILD=$PWD/opencv-android-build  # output folder
ANDROID_SDK=$HOME/Library/Android/sdk
ANDROID_NDK=$ANDROID_SDK/ndk/27.0.12077973  # change to your ndk folder  ls ~/Library/Android/sdk/ndk/
CONFIG_FILE=$PWD/ndk-27.config.py  # adjust to match your NDK version

mkdir -p $OPENCV_BUILD
cd $OPENCV_BUILD

if [ -d "$ANDROID_SDK/cmdline-tools/latest" ]; then
  if [ ! -d "$ANDROID_SDK/tools" ]; then
    echo "Creating symlink for cmdline-tools"
    ln -s "$ANDROID_SDK/cmdline-tools/latest" "$ANDROID_SDK/tools"
  fi
fi

python3 $OPENCV_SRC/platforms/android/build_sdk.py \
    $OPENCV_BUILD \
    $OPENCV_SRC \
    --ndk_path $ANDROID_NDK \
    --sdk_path $ANDROID_SDK \
    --extra_modules_path $OPENCV_CONTRIB/modules \
    --config $CONFIG_FILE \
    --use_android_buildtools \
    --no_samples_build
```

> 備註：`build_sdk.py` 是 OpenCV 專案官方提供的 Android SDK 建置腳本

## Step3. 編譯 OpenCV Android SDK
最後就可以運行腳本編譯：

```
chmod +x opencv_android_build.sh
./opencv_android_build.sh
```

編譯完成後就可以在 `OpenCV-android-sdk` 找到標頭檔和動態連結庫。此時會發現我們產出的是 `libopencv_world.so` 而不是 `libopencv_java4.so`。但還是可以正常使用，但是就要稍微修改原始 Flutter 專案的 CMakeLists.txt。

Flutter 專案重新編譯後可以用下面這個檢查腳本來驗證你的 APK / AAB：

📄 [check_elf_alignment.sh](https://gist.github.com/NitinPraksash9911/76f1793785a232b2aa2bc2e409873955) 

使用方式如下：

```
chmod +x check_elf_alignment.sh
./check_elf_alignment.sh build/app/outputs/apk/release/app-release.apk
```

跑完腳本會顯示每一個 .so 是否符合 16KB page size 的規則。

![](https://github.com/1010code/opencv-android-build/blob/main/Screenshot/img1141122-2.png?raw=true)

**為什麼我捨棄 `libopencv_java4.so`？**

* **技術面**：OpenCV 4.5.2 的 Java 綁定在 2024–2025 新版 SDK/NDK/Gradle 上常常因 toolchain/Ant/JDK 舊相依而卡關。
* **需求面**：Flutter 的 plugin 只要能連到 **C++ 的 `.so`** 就好，**不需要** Java OpenCV API。
* **合規面**：Google 的 16KB 規範檢查的是 **native shared libraries** 的 page size 相容性；我們產出的 **`libopencv_world.so`**（或各模組 `.so`）只要支援 flexible page size 就合規。

完整程式碼可以參考[GitHub](https://github.com/1010code/opencv-android-build/tree/main)