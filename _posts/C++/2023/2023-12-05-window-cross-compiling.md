---
layout: post
title: '從 Windows 進行跨平台編譯至 aarch64'
categories: 'C++'
description: 'Cross-compiling from Windows to aarch64'
keywords: 
---

## 前言
本篇文章將深入介紹如何在Windows上設定開發環境，以實現從Windows到aarch64的跨平台編譯。
MinGW 是一個用於 Windows 平台的開發工具套件，其目的是提供一個在 Windows 上使用類 Unix 工具（如 GCC 編譯器）的環境，以便開發者能夠輕鬆地在 Windows 上進行跨平台的程式碼開發。 以下是 MinGW 的主要特點和組成部分：

- Minimalist GNU for Windows： MinGW 是「Minimalist GNU for Windows」的縮寫，它提供了一個最小化、輕量級的 GNU 工具集合，主要包括 GCC 編譯器、GNU Binutils 工具、以及相關的庫和頭文件。
- GCC 編譯器： MinGW 的核心是 GCC（GNU Compiler Collection），它是一個強大的開源編譯器，支援多種程式語言，包括 C、C++、Fortran 等。在 MinGW 中，GCC 主要用於將源代碼編譯成可執行文件。
- GNU Binutils： 這是一個包含了各種二進位工具的軟體包，包括連接器（ld）、目標轉換器（objcopy）、反彙編工具（objdump）等。這些工具協助在編譯和連接過程中處理二進位文件。
- MSYS（Minimal SYStem）： MinGW 通常與 MSYS 搭配使用，這是一個提供類 Unix 環境的工具，包括一個 Bash shell 和一些基本的 Unix 工具，使得在 Windows 上進行類 Unix 開發更加方便。
- 簡單安裝： MinGW 的安裝相對簡單，開發者可以通過下載安裝管理器進行工具的安裝和更新。這使得在 Windows 上建立開發環境變得容易。
- 支援跨平台開發： 使用 MinGW，開發者可以在 Windows 上開發跨平台的應用程式，而無需依賴於 Microsoft Visual Studio 的編譯器。Minimalist GNU for Windows： MinGW 是「Minimalist GNU for Windows」的縮寫，它提供了一個最小化、輕量級的 GNU 工具集合，主要包括 GCC 編譯器、GNU Binutils 工具、以及相關的庫和頭文件。

## 設定開發環境
在開始之前，我們需要確保Windows上安裝了適當的交叉編譯工具鏈。這包括編譯器、連結器和其他相關工具。我們可以依照需求安裝Cygwin、MinGW或其他工具，以便支援aarch64的交叉編譯。

- 安裝[gcc-linaro-7.5.0-2019.12-i686-mingw32_aarch64-linux-gnu](https://releases.linaro.org/components/toolchain/binaries/latest-7/aarch64-linux-gnu/)
- 安裝[x86_64-8.1.0-release-posix-seh-rt_v6-rev0](https://releases.linaro.org/components/toolchain/binaries/latest-7/aarch64-linux-gnu/)

安裝完工具後，設定環境變數是確保系統能夠找到這些工具的關鍵步驟。在Windows環境中，這可能包括修改系統的PATH變數以包含交叉編譯工具的路徑。這確保了在命令提示字元或其他開發環境中能夠正確調用這些工具。

## 撰寫和編譯程式碼
在這一部分，我們將進一步探討如何設定CMake和編譯程式碼的步驟，以實現從Windows到aarch64的跨平台編譯。

### 建立 CMakeLists.txt
首先讓我們來看一下CMakeLists.txt文件的內容。這個文件是使用CMake進行專案管理的配置文件。在這裡我們設定了交叉編譯所需的參數。

```cmake
# CMakeLists.txt
set(CMAKE_SYSTEM_PROCESSOR arm)
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_C_COMPILER "aarch64-linux-gnu-gcc-7.5.0.exe")
set(CMAKE_CXX_COMPILER "aarch64-linux-gnu-g++.exe")

project(hello_world)

add_executable(main main.cpp)
```

這個`CMakeLists.txt`文件告訴CMake使用`aarch64-linux-gnu-gcc-7.5.0.exe`和`aarch64-linux-gnu-g++.exe`作為交叉編譯工具，並建立一個名為`main`的可執行檔案。

## 建立 main.cpp
接下來我們來看一下`main.cpp`文件的內容。這是一個簡單的C++應用程式，只是輸出一個 "hello world" 的訊息。

```c++
// main.cpp
#include <iostream>

int main(){
  std::cout <<  "hello word" << std::endl;
}
```

接著我們可以直接在編譯器(ex: VSCode)點選 Build 按鈕，VSCode 會自動偵測 CMakeLists 內容並編譯執行檔。


又或者可以輸入以下指令手動觸發 cmake。第一條指令是配置項目，CMake將根據CMakeLists.txt文件和項目的結構生成構建系統所需的文件。第二條指令是根據前一步的配置訊息，使用構建系統(make)進行實際的項目構建。

```sh
# 配置項目
cmake -S . -B build -G "MinGW Makefiles"
# 建構項目
cmake --build build
```

如果不想用 cmake 編譯可以直接使用 `aarch64-linux-gnu-g++` 編譯執行檔。

```sh
aarch64-linux-gnu-g++ -o main .\main.cpp
```

## 補充功能
在 VSCode 中如果有安裝 CMake 擴充套件，可以使用快捷鍵建立一個 CMake C++ 板模。注意請在 windows 系統環境變數先配置好 mingw toolchain。

1. 按下ctrl+shift+P選擇CMake: Quick Start
2. 選擇 toolchain
3. 輸入專案名稱
4. 選擇專案型態，library/executable


> 範例程式可以從[GitHub](https://github.com/1010code/cpp-cross-compile)取得！