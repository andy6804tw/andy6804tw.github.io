---
layout: post
title: 'configure_file CMake 自動生成巨集定義'
categories: 'C++'
description: 'CMake generate a configure file in c++'
keywords: 
---

## 前言 
通常在撰寫程式的時候需要依據不同硬體或 toolchain 產生相對應的巨集定義，如果每一次編譯程式都要手動的去修改 define 太麻煩了。因此在 CMake 中可以使用 configure_file 將一份文件（.in）從某位置複製到另一個位置，並且替代掉 CMake 的設置變數。

## 範例
這裡舉一個例子。假設我想設定一個版本號的巨集定義，並透過 CMake 編譯時將版本號動態的配置在 `define.h`。文件目錄結構如下:

```
.
├── CMakeLists.txt
├── define.h.in
└── main.cpp
```

我們可以在 `CMakeLists.txt` 中設定變數先定義好版本號。接著使用 configure_file 命令來配置一個文件。它的作用是將 define.h.in 文件中的內容複製到 define.h 文件中，並將其中的CMake變數替換為它們的實際值。@ONLY 選項表示僅替換 define.h.in 中使用@符號包圍的變數。這通常用於生成配置文件，例如本範例將版本號嵌入到程式碼中。

```txt
# CMakeLists.txt
project(Demo)

set(BUIDL_VERSION 1.1.0)
configure_file("${PROJECT_SOURCE_DIR}/define.h.in"
"${PROJECT_SOURCE_DIR}/define.h" @ONLY)

add_executable(main main.cpp)
```

接著在主程式中引入自動生成的定義檔 `define.h`，並且把版本號印出來。
```c
// main.cpp
#include <iostream>
#include "define.h"

int main() {
    std::cout << "BUIDL_VERSION: "<< BUIDL_VERSION << std::endl;
}
```

## configure_file 參數介紹
以下是 configure_file 命令的主要參數：

```
configure_file(<input> <output>
               [NO_SOURCE_PERMISSIONS | USE_SOURCE_PERMISSIONS |
                FILE_PERMISSIONS <permissions>...]
               [COPYONLY] [ESCAPE_QUOTES] [@ONLY]
               [NEWLINE_STYLE [UNIX|DOS|WIN32|LF|CRLF] ])
```


- 源文件 (input_file)：這是要配置的源文件的路徑。通常，它是一個具有變數的樣板文件，這些變數將被替換為它們的實際值。
- 目標文件 (output_file)：這是生成的目標文件的路徑，其中包含已配置的內容。CMake將根據源文件的內容和變數的值生成此目標文件。
- @ONLY：這是一個選項，指定是否僅替換使用 @ 符號包圍的變數。如果指定了 @ONLY，那麼只有那些被 @ 包圍的變數才會被替換，其他格式的變數不會被處理。
- COPYONLY：這是另一個選項，它指定 configure_file 命令應該只是複製源文件到目標文件，而不進行任何變數替換。這在需要複製檔案而不進行配置的情況下很有用。
- ESCAPE_QUOTES：這是一個選項，用於指定是否應該將配置文件中的雙引號進行轉義。如果設置為 ESCAPE_QUOTES，則雙引號將被轉義，以避免可能引起問題的格式問題。
- NEWLINE_STYLE：此選項可用於指定生成的目標文件的換行符風格。可以使用 UNIX、WIN32 或 LF（Unix 樣式的換行符）等值。這可用於確保生成的文件在不同平台上具有一致的換行符風格。

## 小結
使用 `configure_file()` 指令可以減少在 `CMakeLists.txt` 文件中使用 `add_compile_options()` 等指令的需要。只需在 `CMakeLists.txt` 文件中定義變數，然後在 `.h.in` 文件中使用@@符號進行引用即可。這樣可以更簡單地生成配置文件並將變數的值注入到程式碼中。