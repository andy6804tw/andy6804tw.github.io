---
layout: post
title: '使用bouncy控制PORT號服務'
categories: 'Web'
description: 
keywords:
---

## 前言
在產品上線時同一個雲端虛擬機中，也許會監聽很多 PORT 號來執行各種不同的專案，比如後端 API、前端頁面、後台管理系統...等，我們可以下指令來監聽某一個 PORT 號，此方法只能同時監聽一個服務，要管理我們的 proxy 有很多種方式例如： [Nginx](https://stackoverflow.com/questions/5009324/node-js-nginx-what-now/5015178#5015178)、[node-http-proxy ](https://github.com/nodejitsu/node-http-proxy)、[vhost middleware](http://www.senchalabs.org/connect/vhost.html) 以及今日所要介紹的 [bouncy](https://github.com/substack/bouncy)。

## 運作方式
簡單來介紹整個服務的流程，假設一下情境目前有兩個專案分別監聽 8001 及 8002，我們要再寫一隻 bouncy 的檔案監聽 8000 PORT，在 bouncy 這隻檔案內我們就要來判斷使用者所請求的主機名稱(host)，依據不同的名字自動跳轉到不同的 PORT 號，這就是我們今天所要實作的。

## 安裝 bouncy
使用 NPM 安裝 `bouncy.js` 套件。

```bash
npm install --save bouncy
```

## 建立 bouncy 檔案
這隻檔案會監聽 headers 的 host 網址，依照不同網址對應到不同的 PORT 號。

```js
var bouncy = require('bouncy');
var server = bouncy(function (req, res, bounce) {
  if (req.headers.host === 'api.1010code.tk') {
    bounce(8001);
  }
  else if (req.headers.host === 'api2.1010code.tk') {
    bounce(8002);
  }
  else {
    res.statusCode = 404;
    res.end('no such host');
  }
});
server.listen(8000, () => {
  console.log(`server started on 8000`);
});
```

## 將 80 PROT 轉向 8000 PORT
由於我的 bouncy 是監聽 8000 PORT，然而主機預設的 ip 是監聽 80 PORT 所以我們需要下指令來把 8000 PORT 取代 80 PORT 監聽，記住這部分很重要！

```bash
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
```

## 建立測試專案
使用 Node.js 很快地建立監聽事件的路由。

- 第一隻 API

```js
// api/index.js

var http = require('http');
http.createServer(function (req, res) {
  res.end('Enter api http://api.1010code.tk/  PORT 8001');
}).listen(8001);
```

利用 forever 啟動第一隻 API

```bash
forever start ./api/index.js
```

- 第二隻 API

```js
// api2/index.js

var http = require('http');
http.createServer(function (req, res) {
  res.end('Enter api http://api.1010code.tk/  PORT 8002');
}).listen(8002);
```

利用 forever 啟動第二隻 API

```bash
forever start ./api2/index.js
```

## 設定 DNS
這個步驟也很重要，首先到你網域所註冊的地方或是 DNS 所代管的地方，我這邊是使用 CloudFlare 平台，基本上任何平台做的事情都一樣，我們要新增 DNS 並使用 A 紀錄 填上你所想要的子域名，最後指向的 IP 為你雲端伺服器的靜態 IP 位址。

<img src="/images/posts/web/2018/img1070314-3.jpg">

## 測試
最後一步我們利用 forever 來啟動 bouncy 這隻檔案吧！

```bash
forever start ./bouncy/index.js
```

- http://api.1010code.tk/

<img src="/images/posts/web/2018/img1070314-1.png">

- http://api2.1010code.tk/

<img src="/images/posts/web/2018/img1070314-2.png">
