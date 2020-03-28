---
layout: post
title: '[Mac系統] 啟動MySQL失敗解決'
categories: 'Mac'
description:
keywords: 
---

## 前言
Mac OS X 的升級或者其他原因可能會導致 ＭySQL 的操作面板上會提示 `“Warning:The /usr/local/mysql/data directory is not owned by the 'mysql' or '_mysql' ”`，此時該如何解決呢？

## 解決方法
我們要修改 `/usr/local/mysql/data` 路徑下資料夾權限，指令如下。

```bash
sudo chown -R mysql /usr/local/mysql/data
```

輸入完指令後就可以成功重啟 MySQL 服務。

![](/images/posts/mac/2019/img1080131-1.png)
