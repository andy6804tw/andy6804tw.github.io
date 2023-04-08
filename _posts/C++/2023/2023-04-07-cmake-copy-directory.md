---
layout: post
title: 'CMake 複製資料夾方法'
categories: 'C++'
description: 'cmake copy directory'
keywords: 
---

# CMake 複製資料夾方法
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
file 命令可以用來複製檔案或目錄。以下範例將 `${CMAKE_SOURCE_DIR}` 目錄下的所有檔案檔案複製到 `${CMAKE_BINARY_DIR}` 目錄中。

```cmake
project(main)
set(CMAKE_BUILD_TYPE "Release")
add_executable(${PROJECT_NAME} main.cpp)

file(COPY ${CMAKE_SOURCE_DIR}/data DESTINATION ${CMAKE_BINARY_DIR})
```

![](/images/posts/C%2B%2B/2023/img1120407-1.png)

## 方法二 添加自定義的命令(add_custom_command)
### 複製整個資料夾

```cmake
project(main)
add_executable(${PROJECT_NAME} main.cpp)

add_custom_command(
  TARGET main                     # 指定要添加自定義命令的目標
  POST_BUILD                      # 指定命令在編譯過程中的時機
  COMMAND ${CMAKE_COMMAND} -E copy_directory   # 指定自定義的命令，這裡是複製目錄
          "${CMAKE_SOURCE_DIR}/data"           # 指定源目錄
          "$<TARGET_FILE_DIR:main>/data"      # 指定目標目錄
)
```

- PRE_BUILD: 分別表示編譯之前執行命令
- PRE_LINK: 鏈接之前執行命令
- POST_BUILD: 生成目標文件後執行命令

![](/images/posts/C%2B%2B/2023/img1120407-2.png)

### 印出訊息
另外我們也可以透過 `add_custom_command` 印出訊息。

```cmake
project(main)
add_executable(${PROJECT_NAME} main.cpp)

add_custom_command(
  TARGET main
  COMMAND ${CMAKE_COMMAND} -E echo "Target file dir is: $<TARGET_FILE_DIR:main>"
)
```

編譯後在終端機結果:
```
Target file dir is: C:/Users/Desktop/cmake_tutorial/build/Debug
```

## [進階] 定義一個自定義的目標(add_custom_target)
以下方法比較進階，單純紀錄使用方法。並在編譯結果後印出訊息，當然也可以改成上面提到的複製檔案。

### 方法一
生成 add_custom_command 的依賴。

```cmake
project(test)
add_executable(${PROJECT_NAME} main.cpp)

add_custom_command(OUTPUT printlog 
        COMMAND ${CMAKE_COMMAND} -E echo "compile finish!"
        VERBATIM
)
add_custom_target(finish
                   DEPENDS printlog
)
```


### 方法二 單獨使用
cmake本身支持兩種目標文件：可執行程序（由 add_executable() 生成）和庫文件（由 add_library() 生成）。使用 add_custom_target 可添加自定義目標文件，用於執行某些指令。

```cmake
project(main)
add_executable(${PROJECT_NAME} main.cpp)

add_custom_target(finish 
        COMMAND ${CMAKE_COMMAND} -E echo compile finish
)
```

```sh
# 配置項目
cmake -S . -B build 
# 建構項目
cmake --build build --target finish
```