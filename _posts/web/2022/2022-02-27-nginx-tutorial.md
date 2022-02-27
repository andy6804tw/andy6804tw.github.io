---
layout: post
title: '反向代理 Nginx 伺服器架設'
categories: 'Web'
description: 'Node.js Nginx'
keywords: Nginx
---

## 前端
Nginx 是一個免費開源且穩定高效的網頁伺服器，擁有反向代理以及負載平衡的功能，經常作為伺服器架站的統一入口。假設我今天使用 Node.js 撰寫兩個後端 API 分別監聽 8001 與 8002 PORT。為了避免讓使用者輸入 IP 與 PORT 號，最常見的最法式購買網域。假設你電腦的 IP 是 10.10.10.10，你就要在你買網域的地方的後台設定把 myapp.com 指到 10.10.10.10。這樣子當使用者輸入 myapp.com 的時候，其實就是連到 10.10.10.10 了。此外系統的預設 PORT 是 80，因此當你在瀏覽器輸入 myapp.com 等於會連到 10.10.10.10:80。但問題來了，假設我在一台主機上面想要跑兩個網站 myapp1.com 跟 myapp2.com 雖然都設定好連到 10.10.10.10，可是 80 PORT 只有一個該怎麼導到指定的端口呢？就是樣使用我們今天介紹的 Nginx 進行代理伺服器管理。要管理我們的 proxy 有很多種方式例如： Nginx、node-http-proxy、vhost middleware、[bouncy](https://andy6804tw.github.io/2018/03/14/bouncy-tutorial/)。

![](https://i.imgur.com/ZR6sWbJ.png)
> Image [from](https://www.youtube.com/watch?v=x1fnOJsX6wE)

## 安裝 Nginx
本文章將介紹 Mac 和 Linux 系統如何運行 Nginx。

### Mac 架設 Nginx 伺服器
Mac 的安裝方法非常簡單。

```
brew install nginx
```

安裝完後在終端機輸入以下指令啟動 Nginx。

```
nginx
```

> 此時服務就順利跑起來了，打開瀏覽器 http://localhost:8080/。

如果要是在 mac 用 brew 裝的話，在 `/usr/local/etc/nginx/nginx.conf` 這邊可以設定 nginx 的一些環境。

![](/images/posts/web/2022/img1110227.png)

開啟 `nginx.conf` 在最後一行有個 `include servers/*;`，代表會把 `servers` 資料夾下面的設定檔全部都引入。因此我們可以在 `servers` 資料夾底下開一個 `server.conf`。

### Ubuntu 架設 Nginx 伺服器
要在 Ubuntu Server 上安裝 Nginx 伺服器，可以直接參考[官方](https://nginx.org/en/linux_packages.html#Ubuntu)安裝教學並在終端機中執行指令。


安裝成功後輸入以下指令檢查 nginx 是否成功執行 80 PORT。

```
sudo netstat -tlnp | grep nginx
```

如下圖如果有看到 TCP 有在監聽 80 PORT，就表示 Nginx 安裝成功了！

![](https://i.imgur.com/IxiTuF0.png)

Nginx 之所以會去監聽任意網路介面上的 80 PORT，是因為預設的設定檔 (`/etc/nginx/sites-available/default`) 中預設 80 PORT 監聽任意網路介面。若要編輯設定檔可以輸入以下指令。

```
sudo vim /etc/nginx/nginx.conf
```

開啟 `nginx.conf` 在前面幾行有個 `include /etc/nginx/modules-enabled/*.conf;`，代表會把 `modules-enabled` 資料夾下面的設定檔全部都引入。因此我們可以在 `modules-enabled` 資料夾底下開一個 `server.conf`。


## Nginx 常用指令

```
# 啟動
sudo nginx
# 停止
sudo nginx -s stop
sudo pkill nginx
# 重啟
sudo nginx -s reload
# 檢查設定檔是否無誤(套用新設定時先檢查)
sudo nginx -t 
```