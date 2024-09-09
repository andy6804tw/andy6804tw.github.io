---
layout: post
title: 'Linux 使用 Wine 執行 MinGW 編譯的 C++ .exe 檔案'
categories: 'C++'
description: 'Running MinGW-Compiled C++ .exe Files on Linux Using Wine'
keywords: 
---


## 前言
當你在 Windows 上開發應用程式並使用 MinGW 編譯 C++ 程式碼時，會生成一個 .exe 檔案。這些 .exe 檔案原本是為 Windows 系統設計的，無法直接在 Linux 系統上執行。不過，透過一些工具，我們可以在 Linux 上模擬或虛擬化 Windows 環境來執行這些檔案。這篇教學將介紹如何使用 Wine 和其他選項在 Linux 上執行 MinGW 編譯的 .exe 檔案。

## 步驟一：安裝 Wine
Wine 是一個在 Linux 上執行 Windows 應用程式的開源工具。它不是一個虛擬機，而是允許直接在 Linux 上執行 Windows 應用程式。

### 1. 更新系統軟體包 
在開始之前，請確保你的系統軟體包是最新的。打開終端機並輸入以下指令來更新系統：

```sh
sudo dpkg --add-architecture i386
sudo apt update
```

### 2. 安裝 Wine
接下來，安裝 Wine。根據你使用的 Linux 發行版本，指令可能略有不同。以 Ubuntu 為例：

```sh
sudo apt install wine wine32 wine64
```

### 3. 驗證 Wine 安裝
安裝完成後，輸入以下指令來確認 Wine 是否安裝成功：

```sh
wine --version
```

如果安裝成功，這個指令會顯示已安裝的 Wine 版本。


## 步驟二：執行 .exe 檔案
安裝完成 Wine 之後，就可以使用它來執行 MinGW 編譯的 .exe 檔案。

### 1. 確保系統安裝 mingw-w64
必須在Linux系統安裝

```
sudo apt-get install -y mingw-w64
```

### 1. 進入到 .exe 檔案所在目錄
使用終端機移動到 .exe 檔案所在的目錄。例如，如果檔案在 /home/user/program 資料夾中：

```sh
cd /home/user/program
```

### 2. 使用 Wine 執行 .exe 檔案
使用 Wine 執行該 .exe 檔案，指令如下：

```sh
wine your_program.exe
```

## 故障排除
有些時候，某些 Windows 程式可能無法在 Wine 上順利運行，若出現找不到 dll 時，請重新給予指定的環境變數。假設我的 exe 是一個 mingw64 編譯的執行檔，就必須在linux系統下安裝相對應的 toolchain。

```sh
export WINEPATH="/usr/x86_64-w64-mingw32/lib;/usr/lib/gcc/x86_64-w64-mingw32/10-posix"
```

請注意 `10-posix` 版本號根據當時系統安裝可能不一樣，所以ˇ建議輸入以下指令確認一下該目錄底下是否有`xx-posix`資料夾並填上正確路徑。

```sh
ls /usr/lib/gcc/x86_64-w64-mingw32/
```

在系統中應該會回傳:
```
10-posix
10-win32
```

設定好環境變數後，在執行 wine your_program.exe 應該就可以成功運行了。

## 後記

```sh
WINEARCH=win64 WINEPREFIX=~/.wines winecfg
WINEPREFIX=~/.wines wine ./unit_test.exe
```


範例程式可以從[GitHub](https://github.com/1010code/wine-mingw-linux-cpp)中取得！