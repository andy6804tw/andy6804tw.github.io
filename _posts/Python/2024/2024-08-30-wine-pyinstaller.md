---
layout: post
title: '在 Linux 中使用 Wine 打包 Python Windows 可執行檔'
categories: 'Python'
description: 'How to cross-compile a Python script into a Windows executable on Linux'
keywords: 
---



## 前言
在Linux系統中，開發Python跨平台應用會面臨到一個問題：儘管PyInstaller是一個方便的工具來打包Python程式成為可執行檔（exe），但它無法直接在Linux環境下生成Windows的可執行檔。這是由於PyInstaller在打包過程中需要依賴系統相關的動態連結庫，而Linux與Windows的系統架構和函式庫明顯不同，導致無法跨平台進行編譯和打包。

為了解決這個問題，PyInstaller官方建議開發者在Linux中使用Wine來模擬Windows環境。Wine是一個開源的兼容層，可以讓Linux使用者執行Windows應用程式，藉此可以在模擬的Windows環境中進行打包作業。具體來說，使用者需要在Wine環境中安裝Windows版的Python，例如python-3.7.6-amd64，並在該環境下使用PyInstaller進行編譯，這樣才能成功生成適用於Windows的可執行檔。

接下來的部分將詳述如何在Linux中透過Wine安裝Windows版的Python，並使用PyInstaller打包Python程式為Windows的exe檔。

## 步驟一：安裝 Wine
Wine 是一個在 Linux 上執行 Windows 應用程式的開源工具。它不是一個虛擬機，而是允許直接在 Linux 上執行 Windows 應用程式。

```sh
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install wine wine32 wine64
```

## 步驟二：安裝Xvfb模擬X server
在Linux環境中，Wine有時需要X server來啟動圖形介面。為了避免直接連接到實際顯示器，這裡使用Xvfb來模擬一個虛擬的X server。
執行以下指令安裝Xvfb：


```sh
sudo apt install xvfb -y
```

安裝完成後即可啟動Xvfb，啟動一個虛擬X server，解析度設置為1024x768，並且色深設置為16位元：

```sh
Xvfb :0 -screen 0 1024x768x16 &
jid=$!
```

> 此命令將Xvfb以背景程序運行，jid=$!則會保存這個背景程序的進程ID，以便之後關閉。


## 步驟三：下載Windows版Python安裝程式
接下來，我們需要從Python官網下載對應的Windows版本安裝程式。這裡選擇python-3.7.6-amd64.exe：

```sh
wget https://www.python.org/ftp/python/3.7.6/python-3.7.6-amd64.exe
```

## 步驟四：設定Wine環境
使用Wine來模擬一個Windows環境。在這步驟，我們透過以下指令啟動並設定Wine的基本配置：

```sh
WINEPREFIX=~/.wine WINARCH=win64 winecfg
```

或是也可以下載 winetricks，安裝必要的字型（如corefonts）並將系統版本設置為Windows 10(此步驟非必要)。

```
WINEPREFIX=~/.wine WINARCH=win64 winetricks corefonts win10
```

## 步驟五：安裝Windows版Python
透過以下指令，在Wine環境中安裝Windows版的Python（靜默安裝並將Python加入系統路徑）：

```sh
DISPLAY=:0.0 WINEPREFIX=~/.wine wine cmd /c python-3.7.6-amd64.exe /quiet PrependPath=1 && echo "Python Installation complete!"
```

安裝完成後，您應該會看到「Python Installation complete!」的訊息。

## 步驟六：安裝PyInstaller
接下來，使用Wine中的Python來安裝PyInstaller。執行以下指令：

```sh
wine pip install pyinstaller
```

## 步驟七：使用PyInstaller打包Python程式
現在可以使用PyInstaller將您的Python程式打包為Windows可執行檔（exe）。假設您的Python程式檔案名稱為main.py，可以執行以下指令進行打包：

```sh
wine pyinstaller --onefile main.py
```

這將會在dist資料夾中生成一個單一的exe檔案。

### 完整指令
以下是完整的操作指令。透過這一系列步驟，您可以在Linux環境中使用Wine來模擬Windows環境，並成功將Python程式打包為Windows可執行檔。

```sh
# 安裝 Wine
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install wine wine32 wine64
# 安裝Xvfb
sudo apt install xvfb -y
Xvfb :0 -screen 0 1024x768x16 &
jid=$!
# 下載Windows版Python安裝程式
wget https://www.python.org/ftp/python/3.7.6/python-3.7.6-amd64.exe
# 設定Wine環境
WINEPREFIX=~/.wine WINARCH=win64 winecfg
# 安裝Windows版Python
DISPLAY=:0.0 WINEPREFIX=~/.wine wine cmd /c python-3.7.6-amd64.exe  /quiet  PrependPath=1  && echo "Python Installation complete!"
# 安裝PyInstaller並打包應用
wine pip install pyinstaller
wine pyinstaller --onefile main.py
```

## Reference
- [How to cross-compile a Python script into a Windows executable on Linux](https://andreafortuna.org/2017/12/27/how-to-cross-compile-a-python-script-into-a-windows-executable-on-linux/)
- [how to install python3 in wine?how to install python3 in wine?](https://askubuntu.com/questions/678277/how-to-install-python3-in-wine)