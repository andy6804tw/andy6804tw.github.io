---
layout: post
title: '[Git筆記] GitHub更新remote位置'
categories: Git
description: 
keywords: git,remote,origin
---

## 前言
當你的GitHub上的專案修改repo的名稱時，本機端的專案若push到遠端時會出現 `remote: This repository moved. Please use the new location [new location]` 的警示。因為你的git連結位置有變動因此要修改本機端的git remote位置。

## 解決方法
重新設定 remote url。

```bash
git remote set-url origin https://XXX.git
```

修改完成後可以檢查 remote url 查看是否有設定成功。

```bash
git remote -v
```