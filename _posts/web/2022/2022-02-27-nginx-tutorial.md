---
layout: post
title: '反向代理 Nginx 伺服器架設'
categories: 'Web'
description: 'Node.js Nginx'
keywords: Nginx
---

## 前言
Nginx 是一個免費開源且穩定高效的網頁伺服器，擁有反向代理以及負載平衡的功能，經常作為伺服器架站的統一入口。至於正向代理和反向代理的區別，很推薦各位可以先來看這篇[文章](https://kknews.cc/zh-tw/tech/k66p2gb.html)，裡面清楚解釋正向代理和反向代理。

![](https://i.imgur.com/ZR6sWbJ.png)
> Image [from](https://medium.com/starbugs/web-server-nginx-2-bc41c6268646)

假設我今天使用 Node.js 撰寫兩個後端 API 分別監聽 8001 與 8002 PORT。為了避免讓使用者輸入 IP 與 PORT 號，最常見的最法式購買網域。假設你電腦的 IP 是 10.10.10.10，你就要在你買網域的地方的後台設定把 myapp.com 指到 10.10.10.10。這樣子當使用者輸入 myapp.com 的時候，其實就是連到 10.10.10.10 了。此外系統的預設 PORT 是 80，因此當你在瀏覽器輸入 myapp.com 等於會連到 10.10.10.10:80。但問題來了，假設我在一台主機上面想要跑兩個網站 myapp1.com 跟 myapp2.com 雖然都設定好連到 10.10.10.10，可是 80 PORT 只有一個該怎麼導到指定的端口呢？就是樣使用我們今天介紹的 Nginx 進行代理伺服器管理。要管理我們的 proxy 有很多種方式例如： Nginx、node-http-proxy、vhost middleware、[bouncy](https://andy6804tw.github.io/2018/03/14/bouncy-tutorial/)。

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

```
# 進入 nginx 資料夾
cd /usr/local/etc/nginx/
# 使用 vscode 開啟
code .
```

![](/images/posts/web/2022/img1110227-1.png)

開啟 `nginx.conf` 在最後一行有個 `include servers/*;`，代表會把 `servers` 資料夾下面的設定檔全部都引入。因此我們可以在 `servers` 資料夾底下開一個 `server.conf`。進行反向代理的一些設定(後面將陸續介紹使用方法)。

### Ubuntu 架設 Nginx 伺服器
要在 Ubuntu Server 上安裝 Nginx，可以直接參考[官方](https://nginx.org/en/linux_packages.html#Ubuntu)文件，首先必須使用終端機透過指令安裝一些相依套件以及系統設定最後才會使用 apt 安裝 Nginx。

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

開啟 `nginx.conf` 在前面幾行有個 `include /etc/nginx/conf.d/*.conf;`，代表會把 `conf.d` 資料夾下面的設定檔全部都引入。因此我們可以在 `conf.d` 資料夾底下開一個 `server.conf`。

## 情境1：部署靜態網站
當你寫好一個前端網頁時想部署在 Server 上，可以透過 Nginx 監聽 80 PORT 並指定專案路徑。進入 `/etc/nginx` 開啟 `nginx.conf`。

Mac:
```
sudo vim /etc/nginx/nginx.conf
```

Ubuntu 系統必須到 `/etc/nginx/sites-available` 資料夾中的 `default` 檔案中進行修改。 

Ubuntu:
```
sudo vim /etc/nginx/sites-available/default
```

打開文件後找到找到原先預設的 80 PORT 路徑並將 location 內的 root 更改成你的靜態網站的主入口(我習慣使用 public 裡面可以分很多子資料夾代表不同專案)。

```
location / {
            root   /Users/public;
            index  index.html index.htm;
        }
```

![](/images/posts/web/2022/img1110227-2.png)

修改後在終端機先輸入 `sudo nginx -t` 此動作是檢查你剛剛設定的內容是否有語法錯誤之類的，每次跟新設定檔後最好先用以下指令檢查設定檔是否無誤，避免 Nginx 伺服器因為設定檔錯誤而中斷服務。

```
sudo nginx -t
```

出現此字串代表設定檔都沒問題，可以放心的重啟哦。
> nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful


接著再執行以下指令來重新載入 Nginx 的設定檔。

```
sudo nginx -s reload
```

接著使用你常用的編輯器在剛剛的指定路徑 `/Users` 建立一個 `public` 資料夾。在此資料夾內都可以任意放你你的靜態網頁，以下範例我在最外層建立一個 `index.html` 以及一個子資料夾 `project1` 裡面一樣新增 `index.html`。

![](/images/posts/web/2022/img1110227-3.png)

修改完成後打開瀏覽器輸入剛剛建立的網頁路徑就會看到網站已經成功被部署在 80 PORT 囉。
![](/images/posts/web/2022/img1110227-4.png)

## 情境2：網域使用 Nginx 控制 PORT 號服務
簡單來介紹整個服務的流程，假設一下情境目前有兩個專案分別監聽 8001 及 8002。透過 Nginx 反向代理依據不同的網域名稱自動跳轉到不同的 PORT 號服務。
### 建立測試專案
使用 Node.js 很快地建立監聽事件的路由，新增一個 `index.js` 分別監聽 8001 與 8002 PORT。模擬公司內有兩個運行中的 API。

```js
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Enter api http://api.1010code.tk/  PORT 8001");
  response.end();
}).listen(8001);

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("nter api http://api.1010code.tk/  PORT 8002");
  response.end();
}).listen(8002);
```

接著在終端機執行以下指令開啟 API。

```
node index.js
```

接著在瀏覽器分別輸入 `localhost:8001` 與 `localhost:8001` 確定兩隻模擬的 API 是否正常運行。

![](/images/posts/web/2022/img1110227-5.png)

接著開啟 `server.conf`(此檔案是自己建立的 Mac 跟 Linux 放在不同地方，文章最前面有提到) 並輸入以下設定。

```
server {
        listen       80;
        server_name  api1.1010code.tk;
        
        # 把 request 轉給 localhost 的 8001 port
        location / {
            proxy_pass http://127.0.0.1:8001;
        }
    }

server {
        listen       80;
        server_name  api2.1010code.tk;
        
        # 把 request 轉給 localhost 的 8001 port
        location / {
            proxy_pass http://127.0.0.1:8002;
        }
    }
```

更改了 nginx 的設定檔，所以需要重新啟動一下 nginx。一樣先檢查檔案是否正常，之後重啟 nginx。

```
# 檢查設定檔是否無誤(套用新設定時先檢查)
sudo nginx -t 
# 重啟
sudo nginx -s reload
```

一切設定好後接著到你網域所註冊的地方或是 DNS 所代管的地方，我這邊是使用 CloudFlare 平台，基本上任何平台做的事情都一樣，我們要新增 DNS 並使用 A 紀錄 填上你所想要的子域名，最後指向的 IP 為你雲端伺服器的靜態 IP 位址。

![](https://andy6804tw.github.io/images/posts/web/2018/img1070314-3.jpg)

若沒有購買網域也沒關係，以自己 mac 本機為例，我們可以在 mac 系統用戶增加域名白名單。可以指定你要讓哪一個 domain 連去哪邊，此外這邊的設置優先層級會最高。

```
sudo vim /etc/hosts
```

打開文件後並加入以下設定：

```
127.0.0.1 api1.1010code.tk
127.0.0.1 api2.1010code.tk
```

設定完後開啟瀏覽器並輸入你指定的網域就可以成功的被 Nginx 代理轉發到指定的 PORT 囉！

![](/images/posts/web/2022/img1110227-6.png)

## 情境3：所有 PORT 由 80 代理
當開發者設定了兩個 API 入口： `127.0.0.1:8001` 與 `127.0.0.1:8002` 但這樣記住 PORT 太蠻煩了。是否可以直接統一由 80 PORT 管理分別在指定的路徑 `127.0.0.1/apis1` 與 `127.0.0.1/apis2` 取代呢？但是可以的，我們可以透過 Nginx 監聽 80 PORT 並將指定的路徑反向代理到指定的 API PORT。

```
server {
        listen       80;
        server_name 127.0.0.1;

        # 把 request(路徑 http://127.0.0.1/apis1) 轉給 localhost 的 8001 port
        location /api1 {
            proxy_pass http://127.0.0.1:8001;
        }
        # 把 request(路徑 http://127.0.0.1/apis2) 轉給 localhost 的 8002 port
        location /api2 {
            proxy_pass http://127.0.0.1:8002;
        }
    }
```

接著再執行以下指令來重新載入 Nginx 的設定檔。

```
sudo nginx -t 
sudo nginx -s reload
```

成果～這樣子同樣都是輸入 127.0.0.1 就可以透過不同的 router 指到對應的 API 端口服務了。

![](/images/posts/web/2022/img1110227-7.png)

## Nginx 常用指令

```
# 啟動
sudo nginx
# 停止
sudo nginx -s stop
sudo pkill nginx
# 檢查設定檔是否無誤(套用新設定時先檢查)
sudo nginx -t 
# 重啟
sudo nginx -s reload
```


## 相關資源
- [使用Ubuntu Server架設Nginx伺服器](https://magiclen.org/ubuntu-server-nginx/)
- [俄羅斯不愧是戰鬥民族：nginx](https://ithelp.ithome.com.tw/articles/10188498)
- [Nginxconfig：自動產生 Nginx 設定檔的線上工具](https://noob.tw/nginxconfig/)
- [Serving multiple proxy endpoints under location in Nginx](https://serverfault.com/questions/650117/serving-multiple-proxy-endpoints-under-location-in-nginx)