---
layout: post
title: '[Linux系統] ubuntu中VI方向鍵、刪除鍵問題'
categories: 'Linux'
description: 
keywords:
---

## 前言
最近在剛重灌好的 Linux 系統中使用 `vi` 編輯文件，發現不僅無法正常編輯資料使用方向鍵不會移動游標反而出現ABCD的文字，也無法使用 delete 刪除鍵。其原因是VI軟件本身的問題，解決方式重新安裝即可解決。

## 解決方式

### 移除vi
執行以下命令先將 `vim` 移除

```bash
sudo apt-get remove vim-common
```
### 安裝vi
執行以下命令重新安裝 `vim` 

```bash
sudo apt-get install vim
```

重新安裝完成後再測試看看應可以解決問題囉！
