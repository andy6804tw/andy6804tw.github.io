---
layout: post
title: '[Linux系統] ubuntu安裝MySQL'
categories: 'Linux'
description: 
keywords:
---

## 前言
這篇是教導如何使用 `apt` 指令來手動建置 MySQL 資料庫環境，並且做相關設定提供連線到我們所建立的資料庫環境中。

## 安裝 MySQL
這邊有三條指令請分別依序的安裝，分別為伺服端、客戶端以及開發中一些MySQL資料庫的函式庫，記得要在 `sudo` 管理者權限下才能安裝。

```bash
sudo apt-get install mysql-server
sudo apt install mysql-client
sudo apt install libmysqlclient-dev
```

## 測試資料庫是否安裝成功
這邊使用 `netstat` 指令來查看， `netstat` 的功用是顯示通訊協定統計資料以及目前的TCP/IP 網路連線，所以我們要使用它來查看已安裝好的 MySQL 是否有連線監聽。此指令要另外安裝，安裝指令如下：

```bash
sudo apt-get install net-tools
```

安裝完成後就能透過 `netstat` 指令來查看 MySQL 是否安裝成功：

```bash
sudo netstat -tap | grep mysql
```

## 設置 MySQL 允許遠端訪問

此設定是因為目前這台主機是固定IP且提供外部連線可以進入我的伺服器中進行資料庫存取，因此要設置 MySQL 允許遠端訪問。

#### 1. 編輯 `mysqld.cnf`
首先編輯 `mysqld.cnf` 文件這個文件定義了所有 `MySQL` 的配置參數。進入後將 `bind-address = 127.0.0.1 ` 註解起來，完成後鍵盤輸入 `:wq` 儲存並退出 vim。

```bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
```

![](/images/posts/linux/2019/img1080129-01.png)

若在進行 vim 修改文件的過程中方向鍵按下去後變成ABCD，刪除鍵無效時代表 vim 本身套件有問題，另一篇有教你如何解決。


#### 2. 進入 MySQL 服務
透過以下指令進入 `MySQL` 服務，中間的 root 即是你的資料庫的 `user` 名稱，輸入資後會要求你輸入密碼。若你當初安裝資料庫時系統沒提示你建立資料庫密碼的話別擔心，請參考[這篇](https://andy6804tw.github.io/2019/01/31/ubuntu-mysql-password/)，那篇會教你如何查詢你的資料庫的 `user` 和 `password`。

```bash
mysql -u root -p
```

輸入完成後看到 `mysql>` 就表示你成功進入`MySQL` 服務。

![](/images/posts/linux/2019/img1080129-02.png)

忘記密碼傳送門：https://andy6804tw.github.io/2019/01/31/ubuntu-mysql-password/

#### 3. 執行授權命令
在 `MySQL` 環境下執行授權命令(授權給遠程任何電腦登錄資料庫)，輸入以下指令：

```bash
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密碼' WITH GRANT OPTION;
```

上面指令中 `root` 為你的資料庫 `user`，此指令是透過 `*` 允許所有外部 IP 可以自由存取我這台 Server 的資料庫，但這有安全問題若是正式主機建議就輸入開發者的 IP 就好。


若有出現以下錯誤訊息是因為，MySQL8和5的密碼加密方式不同。所以即便輸入正確密碼依然無法正常登入。
```
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'IDENTIFIED BY 'root' WITH GRANT OPTION' at line 1.
```

解決辦法手動建立MySQL8的帳戶。
```
CREATE USER 'root'@'%' IDENTIFIED BY 'PASSWORD';
```

#### 4. 更新設定
全部設定完成後我們輸入以下指令進行刷新：

```bash
flush privileges;  
```

> 注意在 `MySQL` 服務中每個指令結尾要有分號！

#### 5. 退出 MySQL 服務
退出下 `exit` 關鍵字即可結束 `MySQL` 服務。

```bash
exit
```

## 重啟 MySQL
退出 `MySQL` 服務後我們也完成允許遠端訪問的設定，最後重啟 `MySQL` 即可完成並生效所有的設定。

```bash
service mysql restart
```

最後就可以通過我們電腦的資料庫視覺軟體(MySQL Workbench、Navicat...etc)連接上我們的資料庫了。


