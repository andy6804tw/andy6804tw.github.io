---
layout: post
title: '利用 WinPython 進行快速 Python 環境遷移與打包'
categories: 'Python'
description: 'Quickly build and package a portable Python environment using WinPython, Streamlit, and NSIS, ideal for deployment without requiring Python installation.'
keywords: 'Python, WinPython'
---

## 前言

在實際開發或部署 Python 應用程式的過程中，我們常常會遇到一個問題 **在沒有安裝 Python 的電腦上，該怎麼快速執行我們的程式？**

尤其當你要分享 Python 工具給客戶或同事、或是臨時換機器作開發測試，**重建 Python 環境是既耗時又容易出錯的事情**。

## 解決方案：使用可攜式 Python (WinPython)

這篇文章將介紹一個簡單實用的方式，利用：

- WinPython 可攜式環境
- NSIS 建立安裝程式
- Streamlit 做為範例應用

實現 **開箱即用的 Python 應用封裝流程**

## 什麼是 WinPython？

[WinPython](https://winpython.github.io/) 是一個 Windows 平台上的 **可攜式 Python 發行版**，主打「免安裝、開箱即用」，支援：

- Python 本體
- pip 套件管理工具
- Jupyter Lab / Notebook
- Spyder / VS Code
- 可自訂模組與虛擬環境

### WinPython 的版本選擇

我們可以根據需求選擇不同版本：

- `WinPython64-xxxdot`：最小化版本，不包含額外套件
- `WinPython64-xxxslim`：完整工具組合，內建常用套件（如 numpy, pandas, jupyter），適合開發使用

## 3. WinPython 教學

### 3.1 下載與解壓 WinPython
WinPython 有提供非常多版本的 Python，本教學將以 Python3.11作為範例。

選擇版本：  
[Winpython64-3.11.9.0dotb5](https://sourceforge.net/projects/winpython/files/WinPython_3.11/3.11.9.0/betas/)

解壓縮後的目錄結構：

```
WPy64-31190b5/
├─ python-3.11.9.amd64/
├─ scripts/
├─ notebooks/
├─ start_app.bat
├─ WinPython Powershell Prompt.exe
├─ Jupyter Lab.exe / VS Code.exe / SpyderShimmy.exe
...
```

- python-3.11.9.amd64/ 為 Python 主執行環境
- scripts/ 資料夾內含 pip 等工具
- notebooks/ 為預設工作資料夾


### 3.2 安裝 Streamlit 套件

打開 `WinPython Powershell Prompt.exe`，執行以下指令：

```bash
pip install streamlit
```

### 3.3 建立 Streamlit 應用程式
在 notebooks/ 資料夾中，建立一個名為 app.py 的檔案，其內容如下：

```python
import streamlit as st

st.title("Hello WinPython + Streamlit")
st.write("這是你的第一個 Streamlit 應用程式！")
```

### 3.4 建立啟動腳本 `start_app.bat`
為了方便日後快速啟動應用，我們可以寫一隻批次檔 start_app.bat。其範例內容如下，採用相對路徑的方式切換工作目錄，以確保不論從哪個位置啟動都能正確找到應用檔案。

在根目錄(WPy64-31190b5)下建立以下批次檔：

```bat
@echo off
cd /d "%~dp0notebooks"
REM 使用 WinPython 內建的 Python 啟動 Streamlit
..\python-3.11.9.amd64\python.exe -m streamlit run app.py
```

**解釋重點：**

- `%~dp0` 確保批次檔以所在位置作為起點。
- 使用 `cd /d` 切換到 notebooks 資料夾。

執行 `start_app.bat` 即可快速啟動應用程式。

## 4. 使用 NSIS 打包為安裝程式

[NSIS](https://nsis.sourceforge.io/) 是一款輕量級開源打包工具，我們可以將整個 WinPython 資料夾打包成可執行的安裝檔。請先到官網下載並完成安裝。

### 4.1 NSIS 打包腳本：installer.nsi
接下來，我們使用 NSIS 將整個 WinPython 環境（解壓縮後的資料夾名稱仍為 WPy64-31190b5）打包為安裝程式，並將軟體名稱改為 MyStreamlitApp。

以下是一個 NSIS 安裝腳本範例，存成 installer.nsi：

```nsi
!include "MUI2.nsh"

Name "MyStreamlitApp"
OutFile "MyStreamlitAppInstaller.exe"
RequestExecutionLevel admin
Unicode True

InstallDir "$PROGRAMFILES\MyStreamlitApp"
InstallDirRegKey HKLM "Software\MyStreamlitApp" "Install_Dir"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_COMPONENTS
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES

!define MUI_FINISHPAGE_RUN "$INSTDIR\start_app.bat"
!define MUI_FINISHPAGE_RUN_TEXT "執行 MyStreamlitApp"
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "TradChinese"

; ---- 主程式區 ----
Section "MyStreamlitApp (required)"
  SectionIn RO
  SetOutPath $INSTDIR
  File /r "WPy64-31190b5\*.*"

  WriteRegStr HKLM "Software\MyStreamlitApp" "Install_Dir" "$INSTDIR"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\MyStreamlitApp" "DisplayName" "MyStreamlitApp"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\MyStreamlitApp" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\MyStreamlitApp" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\MyStreamlitApp" "NoRepair" 1

  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

; ---- 桌面捷徑區 ----
Section "建立桌面捷徑"
  CreateShortcut "$DESKTOP\MyStreamlitApp.lnk" "$INSTDIR\start_app.bat"
SectionEnd

; ---- 開始選單捷徑區 ----
Section "建立開始選單捷徑"
  CreateDirectory "$SMPROGRAMS\MyStreamlitApp"
  CreateShortcut "$SMPROGRAMS\MyStreamlitApp\啟動應用程式.lnk" "$INSTDIR\start_app.bat"
  CreateShortcut "$SMPROGRAMS\MyStreamlitApp\解除安裝.lnk" "$INSTDIR\uninstall.exe"
SectionEnd

; ---- 卸載區 ----
Section "Uninstall"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\MyStreamlitApp"
  DeleteRegKey HKLM "Software\MyStreamlitApp"

  Delete "$INSTDIR\start_app.bat"
  Delete "$INSTDIR\uninstall.exe"
  Delete "$INSTDIR\*.*"

  Delete "$DESKTOP\MyStreamlitApp.lnk"
  Delete "$SMPROGRAMS\MyStreamlitApp\*.lnk"

  RMDir /r "$SMPROGRAMS\MyStreamlitApp"
  RMDir /r "$INSTDIR"
SectionEnd
```

**說明重點：**

- 安裝資料夾仍保留原始的 `WPy64-31190b5` 內容，透過 `File /r "WPy64-31190b5\*.*"` 將所有檔案打包。
- 安裝完畢後，使用者可從桌面或開始選單點選 `start_app.bat` 執行應用程式。
- NSIS 腳本同時設定了卸載功能，方便日後移除整個安裝資料夾。

使用 NSIS 編譯後，即可產生安裝包 `MyStreamlitAppInstaller.exe`

#### 這樣打包有什麼好處？

這樣打包流程具備：

- ✅ 自帶 Python 執行環境
- ✅ 具備 pip、Jupyter、Spyder 等工具
- ✅ 可當作內部開發工具或部署樣板

此外，因為保留完整 Python 執行環境，你仍可在安裝後使用 VS Code、Jupyter Lab 等工具進行二次開發與除錯。

#### 若要進一步壓縮或轉為單一執行檔
這些適合正式商用產品或需求高效能的場景。

- 使用 Nuitka：將 Python 編譯為 C 二進位，提高執行效能與安全性
- 使用 pystand / py2exe：將 Python 應用打包成單一 `.exe` (參考: [python-streamlit pystand 打包為獨立應用](https://www.bilibili.com/video/BV1v71yYuEse/?spm_id_from=333.788.player.switch)、[採用python embeddable的pystand打包](https://zhuanlan.zhihu.com/p/691339803))

> 若有打包收申需求可以使用[PythonSizeCruncher](https://github.com/mengdeer589/PythonSizeCruncher)

## 結語

這篇文章示範如何用 WinPython 建立一個免安裝的 Python 環境，並結合 Streamlit、NSIS 打包成安裝精靈，實現一套快速部署的流程。

非常適合開發者、教學用途，或需要跨機器分享 Python 工具的情境。

