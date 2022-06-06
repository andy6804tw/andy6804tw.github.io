---
layout: post
title: 'Linux 壓縮與解壓縮常用指令'
categories: 'Linux'
description: 
keywords: zip tar
---

### tar 打包
在 Unix 系統中 `tar` 是文件打包功能，若要實現壓縮功能需使用 `gzip`。至於為何要先 tar 打包再 gzip 壓縮，就是 Unix 系統的設計理念了。

常用參數：
- -c 打包檔案
- -x 解開壓縮檔
- -v 顯示執行過程
- -f 指定壓縮檔的檔案名稱

#### 打包

```sh
tar cvf archive.tar ./target/directory
```

#### 解包

```sh
tar xvf archive.tar
```

#### 解壓縮到指定資料夾

```sh
tar xvf archive.tar -C ./target/directory
```

### zip 壓縮

#### 打包

```sh
zip -r archive.zip ./target/directory
```

#### 解包

```sh
unzip archive.zip
```


