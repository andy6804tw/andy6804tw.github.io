---
layout: post
title: 'MySQL 常用指令大全'
categories: 'Linux'
description: 
keywords:
---

### 進入 MySQL
在進行任何 mysql 操作都要先進入 mysql 命令列模式才能完成任何動作。以下指令中 `debian-sys-maint` 可替換成使用者名稱，例如 root。

```sh
mysql -u debian-sys-maint -p
```

並輸入資料庫相對應的密碼。若忘記密碼可以使用 sudo 來找尋資料庫密碼。(無需進入 mysql 模式)

```sh
sudo cat /etc/mysql/debian.cnf
```

### 新增 MySQL 用戶
以下指令在  mysql 命令模式中新增用戶。

```sh
mysql -u debian-sys-maint -p
CREATE USER 'user'@'localhost' IDENTIFIED BY 'admin';
CREATE USER 'user'@'%' IDENTIFIED BY 'admin';
GRANT ALL ON *.* TO 'user'@'%';
flush privileges; //刷新配置
退出 mysql: exit
然後重啟服務：sudo service mysql restart
```

> grant all on *.* to root@'%' identified by '你的密碼' with grant option;

若要移除指定用戶

```sh
DROP USER 'user'@'%';
```

### 查詢 MySQL 目前用戶

```sh
SELECT User, Host, plugin FROM mysql.user;
```

## Reference
- [報錯:1130-host ... is not allowed to connect to this MySql server 開放 mysql 遠端連線不使用 localhost](https://www.cnblogs.com/xyzdw/archive/2011/08/11/2135227.html)
- [MySQL ERROR 1698 (28000) 錯誤](http://www.cnblogs.com/leolztang/p/5094930.html)