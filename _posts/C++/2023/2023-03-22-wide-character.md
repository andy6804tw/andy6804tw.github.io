---
layout: post
title: 'C 語言中的 wide character(如何在 wchar_t 加入變數)'
categories: 'C++'
description: 'C/C++ wide character'
keywords: 
---

## 前言
在 C 語言中，字元（character）通常被視為一個 8 位元組（byte）的整數，可以表示 ASCII 碼表中的 128 個字元。然而，在許多語言中，特別是亞洲語言，需要表示更多的字元，例如中文字，而這些字元無法用單一的 8 位元組表示。為了解決這個問題，C 語言提供了 wide character 的概念，也就是寬字元(擴充字元)。寬字元是一個 16 位元組（即 2 個 byte）的整數，可以表示更多的字元，包括 Unicode 碼表中的所有字元。在 C 語言中，寬字元的型別為 wchar_t，通常使用 L 前綴表示。寬字元的使用通常需要特別的函數和庫支援，例如 wprintf 和 wcscmp 等函數，這些函數可以處理寬字元的輸入輸出和比較等操作。

- char 是單字符類型，長度為一個字節。
- wchar_t 是寬字符類型，長度為兩個字節，主要用在國際 Unicode 編碼中。

```c
#include <Windows.h>
#include <iostream>
#include <string>

int main()
{
    std::string message = "Hello, World!"; // 使用 ANSI 字符集的字串
    int length = MultiByteToWideChar(CP_ACP, 0, message.c_str(), -1, NULL, 0); // 計算轉換後的字串長度
    wchar_t* wideMessage = new wchar_t[length]; // 分配空間
    MultiByteToWideChar(CP_ACP, 0, message.c_str(), -1, wideMessage, length); // 轉換字串
    
    MessageBoxW(NULL, wideMessage, L"Message", MB_OK); // 使用 Unicode 版本的 MessageBox 函數
    std::wcout<< "Result: "<< wideMessage << " \n"; // 使用 wcout 在終端機印出訊息
    std::cout<< "Size: "<< sizeof(wideMessage) <<" Length: "<< length << " \n";
    delete[] wideMessage; // 釋放分配的空間

    return 0;
}
```

輸入以下指令編譯並執行:
```sh
g++ -o main ./main.cpp -std=c++17
./main.exe
```

輸出結果:
```
Result: Hello, World! 
Size: 8 Length: 14
```

## wide character 中 L 跟 LR 差別
在 C 語言中，L 和 LR 均與寬字符有關但它們有不同的含義。L 是 C 語言中用於表示寬字符常量的前綴，通常用於表示一個 Unicode 字符。例如，L'字'表示一個 Unicode 字符 '字' 的寬字符常量。LR 是 Windows API 中的一個標誌符號，代表“long pointer to a resource”，用於訪問 Windows 資源文件中的資源。在 Windows API 中，資源文件是一個二進制文件，其中包含程序使用的各種資源，例如圖像、文本、字符串等。LR 可以用於訪問這些資源中的字符串資源。因此，L 和 LR 的含義和用途不同，L 用於表示寬字符常量，而 LR 用於訪問 Windows 資源文件中的字符串資源。

> 以下範例在 Windows ONNX Runtime 會使用到，必須輸入模型路徑。

```c
#include <Windows.h>
#include <iostream>
#include <string>

int main()
{
    /** 方法一 */
    const wchar_t *myWString = LR"(./data/svm.onnx)";
    std::wcout << "Path: " << myWString << " \n"; // 使用 wcout 在終端機印出訊息

    /** 方法二 使用string變數初始化wchar_t */
    std::string message = "./data/xgb.onnx";
    int length = MultiByteToWideChar(CP_ACP, 0, message.c_str(), -1, NULL, 0); // 取得字串長度
    wchar_t *wideMessage = new wchar_t[length];
    MultiByteToWideChar(CP_ACP, 0, message.c_str(), -1, wideMessage, length); // 字串轉換為寬字符
    std::wcout << "Path: " << wideMessage << " \n";
    delete[] wideMessage; // 釋放分配的空間

    return 0;
}
```

輸出結果:
```
Path: ./data/svm.onnx 
Path: ./data/xgb.onnx
```

MultiByteToWideChar 是 Windows API 中的一個函數，用於將多字節（multi-byte）字符轉換為寬字符（wide character）。其函數原型如下：
```
int MultiByteToWideChar(
  UINT     CodePage,
  DWORD    dwFlags,
  LPCSTR   lpMultiByteStr,
  int      cbMultiByte,
  LPWSTR   lpWideCharStr,
  int      cchWideChar
);
```

函數的主要作用是將一個以指定字符集（CodePage）編碼的多字節字符串（lpMultiByteStr）轉換為 Unicode 寬字符字符串（lpWideCharStr）。該函數返回轉換後的寬字符字符串長度，如果轉換失敗則返回 0。

MultiByteToWideChar 函數的參數解釋如下：

- CodePage：指定多字節字符串的編碼格式，例如 CP_UTF8、CP_ACP 等。其中 CP_ACP表示使用當前 Windows 的 ANSI 編碼格式（一般是 Windows-1252）。
- dwFlags：指定轉換選項，例如 MB_PRECOMPOSED、MB_ERR_INVALID_CHARS 等。 0 表示使用默認轉換選項。
- lpMultiByteStr：指向待轉換的多字節字符串的指針。
- cbMultiByte：指定待轉換的多字節字符串的長度，如果為 -1，則表示 lpMultiByteStr 為 NULL 結尾字符串，函數會自動計算字符串長度。
- lpWideCharStr：指向轉換後的寬字符字符串的指針。
- cchWideChar：指定轉換後的寬字符字符串的最大長度，如果轉換後的寬字符字符串長度超過了 cchWideChar，則函數會截斷字符串。

使用 MultiByteToWideChar 函數可以方便地實現多字節字符和 Unicode 字符之間的轉換，常見的應用場景包括讀取多語言文本文件、解析網絡協議報文等。

## 故障排除
若 Windows 下 c++ 編譯後出現以下錯誤訊息:

```
error C2872: 'byte': 模稜兩可的符號
message : 可能是“unsigned char byte”
message : 或    “std::byte”
```

原因是 c++17 引入了類型 std::byte，與原來的 C++ 定義的 unsigned char byte 重名衝突。因此程式碼中如果使用 `using namespace std;` 或者其他導致重名衝突的做法，都會出現編譯錯誤。其解決方法就是修改代碼使得符合 C++17 標準，去掉 `using namespace std;`。