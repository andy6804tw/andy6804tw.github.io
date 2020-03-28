---
layout: post
title: '[Linux系統] ubuntu安裝MySQL時未提示輸入密碼'
categories: 'Linux'
description: 
keywords:
---

## 前言
ubuntu 安装 MySQL 個過程中若系統沒要求你設置 MySQL 密碼時該怎麼辦？此篇文教教你如何查詢本機上預設的資料庫用戶名稱和密碼。

## 開啟debian.cnf
使用以下指令開啟 MySQL 的 debian.cnf 檔案，指令如下：

```bash
sudo vim /etc/mysql/debian.cnf
```

此檔案開啟後可以很快速的看到 MySQL 預設的用戶名稱和密碼，最最重要的是用戶名的不是 root，而是debian-sys-maint，如下所示。

![](/images/posts/linux/2019/img1080131-01.png)

## 登入MySQL服務
要進入MySQL服務的話使用以下指令，中間部分是要填入你本機中 MySQL 的用戶名。

```bash
mysql -u debian-sys-maint -p
```

輸入後接著會要你輸入密碼，此時輸入剛剛查到的預設密碼即可完成登入 MySQL 服務。
