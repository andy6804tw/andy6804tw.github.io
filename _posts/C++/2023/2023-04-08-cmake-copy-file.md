---
layout: post
title: 'CMake 複製檔案方法'
categories: 'C++'
description: 'cmake copy file'
keywords: 
---

# CMake 複製檔案方法
在 CMake 中，可以使用以下幾種方式來複製檔案:

1. file(COPY ...)
2. add_custom_command

## 如何在編譯 CMAKE File
在本教學中提供範例 `CMakeLists.txt` 之外，還必須在同一層路徑下建立 `main.cpp`。並執行以下指令才能正常編譯。

```sh
# 配置項目
cmake -S . -B build 
# 建構項目
cmake --build build
# 執行
./build/Debug/main.exe
```

## 方法一 file(COPY ...)
file 命令可以用來複製檔案或目錄。以下範例將 `${CMAKE_SOURCE_DIR}` 目錄下的 `file.txt` 檔案複製到 `${CMAKE_BINARY_DIR}` 目錄中。

```cmake
project(main)
set(CMAKE_BUILD_TYPE "Release")
add_executable(${PROJECT_NAME} main.cpp)

file(COPY ${CMAKE_SOURCE_DIR}/file.txt DESTINATION ${CMAKE_BINARY_DIR})
```

![](/images/posts/C%2B%2B/2023/img1120408-1.png)

## 方法二 添加自定義的命令(add_custom_command)
這個命令會在建置 main 目標之後執行，將 `${CMAKE_SOURCE_DIR}` 目錄下的 file.txt 檔案複製到 `$<TARGET_FILE_DIR:main>` 目錄中。

```cmake
project(main)
set(CMAKE_BUILD_TYPE "Release")
add_executable(${PROJECT_NAME} main.cpp)

add_custom_command(
  TARGET main                     # 指定要添加自定義命令的目標
  POST_BUILD                      # 指定命令在編譯過程中的時機
  COMMAND ${CMAKE_COMMAND} -E copy   # 指定自定義的命令，這裡是複製檔案
          "${CMAKE_SOURCE_DIR}/file.txt"           # 指定源檔案
          "$<TARGET_FILE_DIR:main>/file.txt"      # 指定目標檔案
)
```

從下圖可以看到 `$<TARGET_FILE_DIR:main>` 指向的是 build/bin/debug。

![](/images/posts/C%2B%2B/2023/img1120408-2.png)

> 以上測試都在 windows10 環境編譯