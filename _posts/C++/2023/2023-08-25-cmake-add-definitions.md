---
layout: post
title: 'CMAKE 加入編譯選項 add_definitions 定義巨集'
categories: 'C++'
description: 'cmake add_definitions'
keywords: 
---

add_definitions 和 add_compile_definitions 都是在 CMake 腳本中用於定義編譯時期巨集的指令，但它們在 CMake 的不同版本中使用。

### add_definitions
在 CMake 3.11 及之前的版本中，可以使用 add_definitions 來定義編譯時期巨集，但此方法較不建議使用，因為它可能會對整個專案中的所有目標產生影響，而不僅僅是特定目標。

使用方式如下：

```
add_definitions("-D HELLO")
```

### add_compile_definitions
在 CMake 3.12 及其之後的版本中，推薦使用 add_compile_definitions 來定義編譯時期巨集。這個指令更加直觀且符合現代的寫法。
add_compile_definitions 可以用來添加編譯時期的巨集定義，這些定義在編譯過程中會被傳遞給編譯器。

使用方式如下：

```
target_compile_definitions(main PUBLIC HELLO)
```

## 設定 c_cpp_properties.json
1. 如果要讓 vs code 能夠辨識以連結的標頭檔，必須添加 includePath 指定路徑。這樣編輯器才不會在 include 時出現紅色波浪。
2. 透過 cmake toolchain 編出來的檔案中會在 build 資料夾下產生 `compile_commands.json`，這一份檔案中詳細記載了編譯資訊。主要是要讓 vs code 讀取到 define 這樣編輯器才會自動偵測並將有效的區塊程式碼高量顯示。 

```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**",
                "${workspaceFolder}/libs/My_library/include",
            ],
            "configurationProvider": "ms-vscode.cpptools",
            "compileCommands": "${workspaceFolder}/build/compile_commands.json",
            "defines": ["HELLO"] // 也可以手動給予巨集，vs code 就會自動高量顯示
        }
    ],
    "version": 4
}
```

> c_cpp_properties.json 由 vscode 自動生成，放置於 .vscode 資料夾下。


## 範例

首先我們建立一個 `main.cpp` 並且使用一個條件編譯指令，用於判斷是否定義了名為 HELLO 的符號。如果這個符號已經被定義，則編譯器會執行 #ifdef 到 #endif 之間的程式碼。如果 HELLO 沒有被定義，這段程式碼將被忽略。

```c
// main.cpp
#include <iostream>

int main()
{
#ifdef HELLO
    std::cout << "!!!@@@@!!!" << std::endl;
#endif
    std::cout << "Hello, world!\n";
}
```

接著我們可以在 CMake 文件中宣告定義巨集。這樣在編譯 main 時裡面的內容就會被編譯了。

```
# CMakeLists.txt
project (HELLO)

add_definitions("-D HELLO")
add_executable(main main.cpp)
```


執行編譯:
```sh
cmake -B build -G "MinGW Makefiles" -S .
cmake --build build
.\build\main.exe
```

由於我們在 CMake 定義了 HELLO，因此最後執行檔運行時將會輸出 "!!!@@@@!!!"。


## Refernece
- [c_cpp_properties.json reference](https://code.visualstudio.com/docs/cpp/c-cpp-properties-schema-reference)
- [VSCode IntelliSense cannot understand CMake add_definitions](https://stackoverflow.com/questions/74397633/vscode-intellisense-cannot-understand-cmake-add-definitions)