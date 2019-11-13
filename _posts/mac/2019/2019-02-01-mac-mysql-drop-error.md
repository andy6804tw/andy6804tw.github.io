---
layout: post
title: '[Mac系統] MySQL刪除Database失敗ERROR 1010'
categories: 'Mac'
description:
keywords: 
---

## 前言
在刪除資料庫時若出現失敗資訊:

```
ERROR 1010 (HY000): Error dropping xxx@002dxxx@002dcxxx@002dxxx (can't rmdir './2019@002dfml@002dcompetition@002dtw', errno: 17)
``` 
可能的原因有很多，像我的電腦在建立資料庫時名稱為 `xxx-xxx-xxx-xxx`，錯誤訊息顯示 `xxx@002dxxx@002dcxxx@002dxxx` ，顯然是 `-` 字串在 mac系統上出現字元符號的問題(建議改用底線)。

## 解決方法
進入 MySql 的目錄資料夾當中，直接把資料庫對應的文件目錄刪除掉。

```bash
sudo rm -rf /usr/local/mysql/data/資料庫名稱
```

因此我的電腦要刪除的話後面加上我要刪除的資料庫名稱

```bash
sudo rm -rf /usr/local/mysql/data/2019@002dfml@002dcompetition@002dtw
```

移除後再刷新查看資料庫，你就會發現該資料庫已經不見了。

