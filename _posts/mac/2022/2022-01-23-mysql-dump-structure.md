---
layout: post
title: '[Mac系統] MySQL 指令匯出資料庫'
categories: 'Mac'
description: 'MySQL 資料庫匯出'
keywords:
---

## 從資料庫匯出 SQL 檔案
將資料庫 test_db 匯出到 `./Desktop/test.sql` 檔案中。其中 `localhost` 可以替換成主機真實 IP。`root` 為 MySQL 的使用者名稱。`test_db` 為欲匯出的資料庫名稱。最後一個是匯出的檔案路徑。

```sql
mysqldump -h localhost -u root -p test_db > ./Desktop/test.sql
```

若只想匯出資料庫結構可以在指令中加入 `--no-data`。差別在於資料庫內的資料不會被打包，僅會匯出欄位。

```sql
mysqldump -h localhost -u root -p test_db --no-data > ./Desktop/test.sql
```

> 輸入指令後系統會要求使用者輸入密碼，此時必須輸入 MySQL 的密碼！

