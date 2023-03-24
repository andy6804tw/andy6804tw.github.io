---
layout: post
title: 'Linux指令：查看資料夾或檔案大小'
categories: 'Linux'
description: 'linux check disk space'
keywords: 
---

## Linux指令：查看資料夾或檔案大小
可以使用以下命令來查看Linux系統中的文件或文件夾的大小：
- ls -lh: 顯示當前目錄下所有文件和文件夾的大小。其中-l顯示以列顯示方式顯示文件信息，-h顯示以易讀的格式顯示文件大小，以方便更可視。
- du -sh foldername: 顯示指定文件夾的大，其中-s顯示顯示總大，-h顯示以易讀的格式顯示文件夾大。
- df 是一個在 Linux 和 Unix 系統中用來顯示檔案系統磁碟空間使用狀況的指令。

```sh
# 顯示當前目錄下所有文件和文件夾的大小
ls -lh
# 顯示當前目錄的總大小
du -sh .
# 顯示當前目錄底下各檔案資料夾的 size
du -sh ./*
# 列出系統上所有檔案系統的磁碟空間資訊
df -h
```

| Option  | Description  |
|---|---|
| –max-depth=<depth>  | 指定往下的目錄層數  |
| -s  | 等於 depth=0  |
| -c  | 最後多顯示一個 total 值  |
| -h  | 以人眼容易閱讀的方式加上單位顯示  |
| -b  | 以 byte 為單位顯示  |    
| -g  | 以 GB 為單位顯示  |
| -k  | 以 KB 為單位顯示  |    
| -m  | 以 MB 為單位顯示  |    
    
## 根據 size 由大到小排序
可以透過 sort 將顯示結果對檔案大小進行排序。

```sh
du -sh ./* | sort -hr
```

- sort -r 是倒序顯示的意思。
- sort -h 是指以數字化 (numerical) 判讀排序，而非字母。