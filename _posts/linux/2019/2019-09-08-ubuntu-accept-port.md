---
layout: post
title: '[Linux系統] Ubuntu 新增開放端口號'
categories: 'Linux'
description: 
keywords:
---

## 前言
為了安全起見，部分Linux系統使用者會關閉所有對外開放的PORT號連接，需要使用時再開啟。以下教學透過指令方式開啟你的PORT允許外部訪問。

### 命令行方式
例如今天想要開放8080PORT的訪問權限輸入以下指令即可。

```bash
sudo iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
```

### 查看端口是否開放

```bash
iptables -L -n
```
