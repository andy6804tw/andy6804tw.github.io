---
layout: post
title: '使用 Git LFS 上傳大型檔案'
categories: 'Git'
description: 'git push hangs on chunked'
keywords: 
---

## 前言
Git LFS（Large File Storage）是一種用於處理大型檔案的工具。傳統的 Git 主要設計用於處理文字檔案，因此在處理大型二進位檔案時效能較差。當其他開發者從遠端倉儲 Clone 專案時，預設情況下 Git 會下載所有歷史版本和檔案，這可能導致儲存空間浪費和效能下降。為了解決這個問題，GitHub 建議使用 Git LFS 來管理大型檔案。Git LFS 可以將大型檔案存儲在遠端服務器上，僅在需要時才下載。GitHub 建議將檔案大小超過50MB的檔案轉換為 Git LFS 跟蹤，以提高效能並節省儲存空間。

> GitHub免費帳戶提供一個月上限1GB的LFS額度

## 安裝 Git LFS
根據不同作業系統可以參照[官網](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage?platform=mac)的說明安裝 Git LFS。

### Linux 安裝

```sh
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install
```

### MacOS 安裝

```sh
brew install git-lfs
git lfs install
```

### Windows 安裝

下載安裝 [Git Large File Storage (LFS)](https://git-lfs.com/)
執行安裝檔，安裝完畢後，回到專案終端機，輸入以下指令讓你的 git 支援 lfs。

```sh
git lfs install
```


切記安裝完成後一定要輸入 `git lfs install` 並確保回傳以下訊息，即代表成功。

```
Updated Git hooks.
Git LFS initialized.
```

## Git LFS 用方式
### 初始化 Git LFS
首先進入專案資料夾先為你的轉案進行 Git 的初始化。

```sh
git init
```

### 指定 LFS 檔案
接著假設在專案資料夾下有一個 `model.onnx` 容量很大的模型。我們想為他宣告為 LFS 檔案。

```sh
git lfs track model.onnx
git add .
git commit -m 'add onnx model'
```

### 確認專案的 LFS 配置
在上述範例中，只有第一行是新認識的，其他都是一般的 Git 指令。只要將您想要追蹤的大型檔案加入追蹤列表中即可。此時在你的專案資料夾下會自動產生一個 `.gitattributes` 描述檔，它是用來告訴 Git 此專案要使用 LFS 的使用條件。如果你使用 VSCode 開啟 `.gitattributes` 將會看到裡面的描述。

```
model.onnx filter=lfs diff=lfs merge=lfs -text
```

其實 git lfs track 指令只需新增一行到 .gitattributes，這樣 Git 就知道該檔案必須使用 LFS 處理，也就是以二進位方式處理，亦即不作任何處理。上面的描述內容就是告訴 Git 在處理 filter、diff、merge 時將 `model.onnx` 透過 lfs 的方式處理。而 `-text` 就是告訴Git 不要將該文件當作文字檔處理。

### 其他 Git LFS 使用技巧
另外想設定某個副檔名的所有文件都要加入 LFS 處理。可以使用 `*` 表示全部。

```sh
git lfs track *.onnx
```

要查看目前正在使用 Git LFS 追蹤的檔案，可以執行以下指令。

```sh
git lfs track
```

若想要取消追蹤某些檔案，可以執行以下指令。

```sh
git lfs untrack model.onnx
```

> 記住 LFS 管理大型檔案後，繼續執行 git add -> git commit -> git push 命令即可推送到雲端。


## 拉取 LFS 檔案
當想在另一台電腦下載 LFS 檔案，在 git clone 專案後。執行以下命令以確保下載 LFS 檔案：

```sh
git lfs pull
```