---
layout: post
title: 'Linux wget 指令下載檔案'
categories: 'Linux'
description: 
keywords: wget
---

## 前言
先前一篇[文章](https://andy6804tw.github.io/2022/03/14/linux-scp/)已經教各位如何透過 scp 指令進行 Linux 伺服器遠與本機端傳送檔案。然而在本文中再教各位如何透過終端指令直接下載指定連結檔案。

## Wget 用法介紹
若要下載網路上的檔案，可執行 wget 加上檔案的網址即可立即下載。指定下載檔案儲存在硬碟中的檔名，可以使用 -O 參數：

```sh
wget https://picsum.photos/200/300 -O demo.jpg
```

也可以指定路徑和檔名(指定的路徑資料夾必須事先建立)。
```sh
wget https://picsum.photos/200/300 -O ./test/demo.jpg
```

### 下載到指定資料夾
在指令加個 `-P` 代表 prefix 可以指定下載到某資料夾路徑中，以下範例將 zip 檔案下載至 `datasets` 資料夾中。

```sh
wget https://raw.githubusercontent.com/1010code/tensorflow-reproducibility/main/datasets/dog_cat.tar -P datasets
```

### 避免重複下載
若檔案已經成功下載了，如果再次執行下載指令會自動將後來下載檔案的檔名加上 .1、.2 等數字。避免相同檔案重複下載，可以在指令加個 `-c`。或是如果下載大型檔案中途斷線，檔案只下載了一部分這時候會從上次中斷的地方繼續下載。

```sh
wget -c https://raw.githubusercontent.com/1010code/tensorflow-reproducibility/main/datasets/dog_cat.tar -P datasets
```