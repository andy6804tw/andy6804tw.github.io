---
layout: post
title: 'Flutter 使用 Dart FFI 呼叫 C/C++ 函式'
categories: 'Flutter'
description: 'Binding to native Android code using dart:ffi'
keywords: 
---

## 前言
我們在開發跨平台 Flutter APP 的時候，會依賴第三方套件進行實作。例如影像辨識會使用 OpenCV 所提供的影像處理方法，當然它有提供各種平台的動態連結庫提供 Linux、Windows、Andorid、iOS...等。然而在開發 Flutter 時可以直接透過 `dart:ffi`(foreign function interface) 呼叫原生的 C APIs。如此一來各種平台統一維護一份 C/C++ 程式碼即可，最後再由 ffi 去呼叫外部定義好的函式。關於 FFI 可以參考[這篇](https://www.gushiciku.cn/pl/gKwF/zh-tw)文章，寫得蠻清楚的。

## 實作
這次範例透過建立一個 C++ BMI 計算的方法，讓 Flutter 呼叫並取得結果。

![](https://github.com/1010code/flutter_native_c/blob/main/screenshot/demo.gif)

### 0. 建立專案
首先開啟 Android Studio 先建立一個空專案 `flutter_native_c`。

### 1. 建立 plugin
建立一個 Flutter plugin 名稱為 `native_bmi` 來專門管理與連結 C code。開啟終端機進入 `flutter_native_c` 資料夾後，輸入以下指令建立 Plugin。

```
flutter create --platforms=android,ios --template=plugin native_bmi
```

接著在 `flutter_native_c` 最外層專案下的 `pubspec.yaml` 添加相依套件： ffi 與剛建立的 plugin (native_bmi)。
```
dependencies:
  native_bmi:
    path: native_bmi
  ffi: ^2.1.4
```

![](/images/posts/Flutter/2022/img1111011-1.png)

### 2. 建立 C/C++ 檔案
將寫好的 C/C++ 放置在 `native_bmi/ios/Classes` 資料夾中，並命名為 `native_bmi.cpp`。我們在程式內加上 `extern "C"` 使系統函式庫兼容 C/C++，詳細內容可以參考這篇[文章](https://hackmd.io/@rhythm/HyOxzDkmD)。簡單來說 g++ 在編譯 C++ 程式時，會對符號(變數與函數名稱等等)進行符號修飾(name mangling)，導致鏈接器在鏈接時找不到對應的符號名稱。若你是撰寫 C 且檔名為 `XXX.c` 就沒這問題了。

在這份 C++ 程式中建立了四個不同的函式，分別為：

- 取得年齡 `getAge()`
- 計算 BMI `calculateBMI(double weight, double height)`
  - 需要傳入體種與身高回傳BMI計算結果
- `getResult(double weight, double height)`
  - 傳入體種與身高回傳文字評斷結果
- `getVersion()`
  - 取得版本號字串

```c++
#include <cmath>
using namespace std;

// Avoiding name mangling
extern "C" {

    int getAge(){
      return 25;
    }

    double calculateBMI(double weight, double height)
    {
      return weight / pow(height / 100, 2);
    }

    char *getResult(double weight, double height)
    {
        double _bmi = weight / pow(height / 100, 2);
        if (_bmi >= 25) {
          return "Overweight";
        } else if (_bmi > 18.5) {
          return "Normal";
        } else {
          return "Underweight";
        }
    }

    char *getVersion()
    {
        return "v1.0.0";
    }
}
```

剛剛步驟就已經完成 ios 的設定，接著在 Android 中也要去指向到那份 C++ 程式。在 `native_bmi/android` 手動建立 `CMakeLists.txt`，並指向到剛剛建立的 `native_bmi.cpp`。

```
cmake_minimum_required(VERSION 3.4.1)

add_library(
            native_bmi
            SHARED
            ../ios/Classes/native_bmi.cpp
)
```

接著在 `native_bmi/android/build.gradle` 中添加 cmake 路徑。

```
android {
  // ...
  externalNativeBuild {
    // Encapsulates your CMake build configurations.
    cmake {
      // Provides a relative path to your CMake build script.
      path "CMakeLists.txt"
    }
  }
  // ...
}
```

### 3. 使用 FFI 庫載入 Native code
在 `flutter_native_c/lib` 資料夾下建立 `ffi_bridge.dart`，並建立一個 `FFIBridge` 類別封裝。

- DynamicLibrary 動態庫連結 (Android 與 iOS)。
- 建立 C & Dart function signatures
- Flutter 建立函式透過 FFI 呼叫 Native code

完整程式碼：
```dart
import 'dart:ffi';
import 'dart:io';
import 'package:ffi/ffi.dart';

/** C & Dart function signatures */
// 取得年齡(回傳整數)
typedef getAgeFunction = Int Function();
typedef getAgeFunctionDart = int Function();
// 計算 BMI 數值(回傳浮點)
typedef calculateBMIFunction = Double Function(Double weight, Double hight);
typedef calculateBMIFunctionDart = double Function(double weight, double hight);
// 評估結果(回傳字串)
typedef getResultFunction = Pointer<Int8> Function(Double weight, Double hight);
typedef getResultFunctionDart = Pointer<Int8> Function(
    double weight, double hight);
// 取得版本(回傳字串)
typedef getVersionFunction = Pointer<Int8> Function();
typedef getVersionFunctionDart = Pointer<Int8> Function();

/** 封裝 */
class FFIBridge {
  late getAgeFunctionDart _getAge;
  late calculateBMIFunctionDart _calculateBMI;
  late getResultFunctionDart _getResult;
  late getVersionFunctionDart _getVersion;

  FFIBridge() {
    // Getting a library
    final dl = Platform.isAndroid
        ? DynamicLibrary.open('libnative_bmi.so')
        : DynamicLibrary.process();
    // Looking for the functions
    _getAge = dl.lookupFunction<getAgeFunction, getAgeFunctionDart>('getAge');
    _calculateBMI =
        dl.lookupFunction<calculateBMIFunction, calculateBMIFunctionDart>(
            'calculateBMI');
    _getResult = dl
        .lookupFunction<getResultFunction, getResultFunctionDart>('getResult');
    _getVersion = dl.lookupFunction<getVersionFunction, getVersionFunctionDart>(
        'getVersion');
  }

  // Flutter 建立函式透過 FFI 呼叫 Native code
  int getAge() => _getAge();
  double calculateBMI() => _calculateBMI(50, 170);
  String getResult() => _getResult(50, 170).cast<Utf8>().toDartString();
  String getVersion() {
    return _getVersion().cast<Utf8>().toDartString();
  }
}
```

最後在 `flutter_native_c/lib/main.dart` 就能夠透過按鈕觸發並呼叫 Native code。詳細內容可以參考 [GitHub](https://github.com/1010code/flutter_native_c/blob/main/lib/main.dart)，以下大致寫出關鍵內容呼叫取得年齡。

```dart
final FFIBridge _ffiBridge = FFIBridge();
_ffiBridge.getAge()
```

下面是同樣內容、但語氣更順、更符合台灣用語的版本（中文維持繁體）：

---

## 後記（支援 16KB page size）

Google 已經宣布：
從 **2025/11/1 起，只要你的 App 在 Google Play 上架，且 target Android 15（API 35）以上，就一定要支援 16KB page size**。

要符合這項要求，官方給的建議如下：

1. **Android Gradle Plugin 使用 8.5.1 以上版本**（通常會搭配 Gradle 8.x）。
2. **NDK 建議使用 r28 或更新版本**，因為 r28 起就預設支援彈性 page size（包含 16KB）。
3. 如果你目前用的是 **NDK r28 以下**，那就需要在 `native_bmi/android/build.gradle` 裡手動加入這個參數：

   ```groovy
    android {
        defaultConfig {
            externalNativeBuild {
                cmake {
                    arguments '-DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON'
                }
            }
        }
    }
   ```

   這樣才能確保你的 native .so 具備 16KB 相容性。


### 如何確認自己的 App 是否真正支援？

由於這篇文章本身有用到 C++ 來編譯自訂的 native `.so`，
你可以用下面這個檢查腳本來驗證你的 APK / AAB：

📄 **check_elf_alignment.sh**
[https://gist.github.com/NitinPraksash9911/76f1793785a232b2aa2bc2e409873955](https://gist.github.com/NitinPraksash9911/76f1793785a232b2aa2bc2e409873955)

使用方式如下：

```bash
chmod +x check_elf_alignment.sh
./check_elf_alignment.sh build/app/outputs/apk/release/app-release.apk
```

跑完腳本會顯示每一個 `.so` 是否符合 16KB page size 的規則。

![](/images/posts/Flutter/2022/img1111011-2.png)


- 完整程式碼參考: [GitHub](https://github.com/1010code/flutter_native_c)

## Reference
- [官方文件 Binding to native iOS code using dart:ffi](https://docs.flutter.dev/development/platform-integration/ios/c-interop)
- [官方文件 Binding to native Android code using dart:ffi](https://docs.flutter.dev/development/platform-integration/android/c-interop)
- [Calling Native Libraries in Flutter with Dart FFI](https://www.raywenderlich.com/21512310-calling-native-libraries-in-flutter-with-dart-ffi)
- [[Flutter] 使用 Dart FFI 呼叫 C 程式](https://cg2010studio.com/2022/01/08/flutter-%E4%BD%BF%E7%94%A8-dart-ffi-%E5%91%BC%E5%8F%AB-c-%E7%A8%8B%E5%BC%8F/)
- [16KB Compatibility Warning on Google Play: Fix for Flutter & Android Apps](https://dev.to/zaid_syni_05ff81fb2cce5e1/fixing-the-app-isnt-16kb-compatible-warning-on-google-play-console-flutter-android-2p7e)