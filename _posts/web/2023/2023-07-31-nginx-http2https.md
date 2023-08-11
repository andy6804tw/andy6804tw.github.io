---
layout: post
title: '使用 Nginx 為你的網站加入 SSL 憑證'
categories: 'Web'
description: 'Configuring HTTPS servers'
keywords: Nginx
---

## 前言
在現代網絡世界中，保障用戶數據的安全性和隱私已經變得至關重要。網站的 SSL 憑證是實現這一目標的關鍵元素之一。在本文中，我們將探討如何使用 Nginx 這個廣泛應用的 Web 伺服器來為你的網站加入 SSL 憑證。

> 尚未安裝 Nginx 可以參考 [反向代理 Nginx 伺服器架設](https://andy6804tw.github.io/2022/02/27/nginx-tutorial/)

## Nginx 監聽 443 ssl
我們可以監聽443PORT也就是網址輸入的https就能轉址到8002PORT。實際上使用者在瀏覽器輸入 https://example.com 自動會連線到 https://127.0.0.1:8002 的 API 服務。

```
server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate     /path/to/ssl_certificate.cer;
    ssl_certificate_key /path/to/ssl_certificate.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    location / {
        proxy_pass https://127.0.0.1:8002;
        proxy_set_header Host $host;
    }
}
```

> 8002 PORT 的 API 必須先掛上憑證。

加設我使用 Python 架設一個 FastAPI，可以使用 gunicorn 或是 uvicorn 來啟動。並同時加上 ssl 憑證

```
gunicorn -w 2 -b 0.0.0.0:8001 run:app -k uvicorn.workers.UvicornWorker -t 0 --keyfile=/etc/ssl/example.com.key --certfile=/etc/ssl/example.com.crt --daemon
```

```
uvicorn run:app --reload --host 0.0.0.0 --port 8001 --ssl-keyfile=/etc/ssl/example.com.key --ssl-certfile=/etc/ssl/example.com.crt
```

## Nginx 監聽 8001 ssl
以下設定一個情境題。首先撰寫一個 API 並且佔用 8002 PORT。接著我們可以透過 8001 Nginx 監聽並掛上 ssl 憑證，並且透過 proxy_pass 反向代理，將請求轉發到 8002 PORT。實際上使用者在瀏覽器輸入 https://example.com:8001 自動會連線到 127.0.0.1:8002 的 API 服務。

```
server {
    listen 8001 ssl;
    server_name example.com;

    ssl_certificate /path/to/ssl_certificate.cer;
    ssl_certificate_key /path/to/ssl_certificate.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:8002;
        proxy_set_header Host $host;
    }
}
```

## 某個 PORT 轉址到其他網站
在這個設定中，Nginx 會監聽8002端口，並將請求路由到對應的服務器。這個設定的目的是將所有請求重新導向到 `https://tw.yahoo.com` 這個網址。

首先，listen 指令指定 Nginx 監聽的端口為8002。這意味著當用戶通過訪問這個伺服器的IP地址或域名的8002端口時，Nginx 會處理這些請求。接下來，server_name 指令定義了這個虛擬主機的名稱。在這個例子中，它指定了兩個值："192.168.xx.xx"和"example.com"。這意味著當請求到達伺服器時，如果域名或IP地址與這些值之一匹配，Nginx 將使用這個設定來處理請求。最後，location / 塊定義了對根路徑的處理方式。在這個設定中，它使用了 return 301 指令，將所有到這個虛擬主機的請求都重定向到"https://tw.yahoo.com"。這意味著無論用戶訪問這個伺服器的哪個URL，Nginx 都會返回 301 Moved Permanently 狀態碼並將客戶端重定向到 Yahoo 首頁。

```
server{
        listen 8002;
        server_name 192.168.xx.xx example.com;
        location / {
              return 301 https://tw.yahoo.com;
        }
}
```


```
server{
        listen 8002 ssl;
        ssl_certificate     /etc/ssl/example.com.cer;
        ssl_certificate_key /etc/ssl/example.com.key;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        ssl_ciphers         HIGH:!aNULL:!MD5;
        server_name example.com;
        location / {
              return 301 https://tw.yahoo.com;
        }
}
```

上述範例中 location 可以使用 proxy_pass 或 return，然而兩者使用時機不同。

- proxy_pass：這個指令用於反向代理，將請求轉發到指定的目標服務器。
- return：這個指令用於處理 HTTP 回應。可用於重定向客戶端到另一個 URL，或返回特定的 HTTP 狀態碼和內容。

此外在使用 return 時候格式如下：

- 301 Redirect
  - 使用時機：想要“永久”將舊網址轉移至新網址
  - 不僅是網址的跳轉，其中還包括網站排名、PageRank（頁面權重）、流量
- 302 Redirect
  - 使用時機：活動頁面跳轉
  - 不會將 A 網域的所有權重全數移轉給 B 網域
  - 302 重定向只會轉移「流量」
  - 保留舊網站的 PageRank 與網站排名




## Reference
- [NGINX http 轉址 https 教程(使用docker)](https://jerry12122.github.io/Tutorial/nginx-http2https/)
- [在Nginx上為你的網站加入Https(含檢測教學)](https://medium.com/@zneuray/%E5%9C%A8nginx%E4%B8%8A%E7%82%BA%E4%BD%A0%E7%9A%84%E7%B6%B2%E7%AB%99%E5%8A%A0%E5%85%A5https-32af0223283a)
- [Apache Nginx上安裝 TWCA憑證](http://www.alvinchen.club/2018/09/27/apache-nginx%E4%B8%8A%E5%AE%89%E8%A3%9D-twca%E6%86%91%E8%AD%89/)
- [申請 SSL 憑證啟用網站 HTTPS 安全連線](https://medium.com/wenchin-rolls-around/%E7%94%B3%E8%AB%8B-ssl-%E6%86%91%E8%AD%89%E5%95%9F%E7%94%A8%E7%B6%B2%E7%AB%99-https-%E5%AE%89%E5%85%A8%E9%80%A3%E7%B7%9A-3ead285b6ee8)