---
layout: post
title: '[Mac系統] 安裝 MySQL 與解決 authentication 問題'
categories: 'Mac'
description:
keywords: 
---

## 前言
Mac OS 使用者安裝 MySQL 可至官方網站[下載](https://dev.mysql.com/downloads/mysql/) MySQL Community Server。接著按照步驟安裝，安裝成功後可能會遇到下圖問題，我是在 Node.js 環境下跟 MySQL 存取資料庫，發現會被擋。錯誤訊息大致是 authentication 驗證問題。因為在 MySQL8.0 修改了密碼加密方式，而連線不上的原因在於連線資料庫工具不支援該格式的密碼。

![](/images/posts/mac/2019/img1081026-1.png)

## 解決方式
我們需要修改加密方式。首先開啟終端機進入 `MySQL`，系統會要求輸入密碼請輸入 `MySQL` 安裝時所設定的密碼。

```bash
mysql -u root -p
```

![](/images/posts/mac/2019/img1081026-2.png)

成功後會進入 `MySQL` 的命令模式，就可以在這邊修改密碼加密的方式了，輸入以下指令(填上你的密碼)。

```bash
USE mysql 
ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "你的密碼";
```