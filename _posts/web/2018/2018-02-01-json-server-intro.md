---
layout: post
title: '使用 JSON Server 快速模擬 Restful API'
categories: 'Web'
description: 
keywords: DNS、Nameserver、URL Forwarding
---

##  前言
在公司開發中往往分為前端與後端，當前端頁面與資料規劃完成了需要串接 API 時就必須等待後端開發者的進度了，此時為了省去這些浪費的時間就可以使用 JSON Server 這個套件，宣稱可以 30 秒可以立即模擬一個假的 Restful API 並且支援開發中最常用的 GET、POST、PUT、PATCH、DELETE、OPTIONS 等 request method，真的那麼神嗎？不多說我們繼續看下去！

## 教學

### 安裝 JSON Server

使用 NPM 安裝 JSON Server 套件並且安裝在全域環境中。

```bash
npm install -g json-server
```

### 新增與啟動 JSON Server 檔案

首先開啟一個空的資料夾並在裡面建立一個 `db.json` 的檔案，或是你也可以直接在終端機輸入 `json-server db.json` 系統會自動生成一個範例的檔案外加執行 Server，你會發現會自動監聽 3000 PORT 且有三條預設的 API 路徑，你可以試著將連結放到瀏覽器上執行看看結果是不是跟 `db.json` 裡所設定的內容一樣呢。

```bash
json-server db.json
```

<img src="/images/posts/web/2018/img1070201-1.png">


### 測試 JSON Server

首先在瀏覽器開啟 `http://localhost:3000` 會出現整個 JSON Server 主控頁面，記住此頁面會跟路徑 `./public/index.html` 的檔案有所衝突所以要注意一下避免被覆蓋，從畫面中可以得知目前有幾條 API 和幾筆資料記錄以及可以使用 GET、POST、PUT、PATCH、DELETE、OPTIONS 等 request method。

<img src="/images/posts/web/2018/img1070201-2.png">

以下測試我們就拿 posts 路徑來測吧！

#### GET (取得資料)

開啟 Postman 選取 GET 並在網址列輸入 `http://localhost:3000/posts` 後 Send 送出，你會發現成功取得回傳資料。 

```
GET /posts HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

<img src="/images/posts/web/2018/img1070201-3.png">

#### POST (新增資料)

開啟 Postman 選取 POST 並在網址列輸入 `http://localhost:3000/posts` 接下來是要放入 POST 的內容，Body > raw > 選擇 JSON(application/json)，將所有要新增的資料寫成 JSON 格式在下面空白處如下圖(id沒輸入沒關係系統會幫你自動遞增產生)，最後再點選 Send 送出，最下面就會回傳你的新增結果囉！

```json
  {
    "id": 2,
    "title": "My test",
    "author": "10codeing"
  }
```

```
POST /posts HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

<img src="/images/posts/web/2018/img1070201-4.png">

#### PUT (更新完整資料)

開啟 Postman 選取 PUT 並在網址列輸入 `http://localhost:3000/posts/2` ，各位有沒有發現我的網址列最後出現了一個數字，沒錯這就是你要修改的 id，接下來是要放入修改的內容(全部欄位必放)，Body > raw > 選擇 JSON(application/json)，將所有要新增的資料寫成 JSON 格式在下面空白處如下圖，最後再點選 Send 送出，最下面就會回傳你的修改結果囉！

使用 PUT 要注意的是送出修改內容時要將無修改的資料一樣寫上去不然會被洗掉哦！


```json
  {
    "title": "My test2",
    "author": "10codeing2"
  }
```

```
PUT /posts HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

<img src="/images/posts/web/2018/img1070201-5.png">

#### PATCH (更新部分資料)

步驟跟 PUT 一模一樣開啟 Postman 選取 PATCH 並在網址列輸入 `http://localhost:3000/posts/2` ，再來放入修改的內容(可只放修改的欄位)，Body > raw > 選擇 JSON(application/json)，將所有要新增的資料寫成 JSON 格式在下面空白處如下圖，最後再點選 Send 送出，最下面就會回傳你的修改結果囉！

使用 PATCH 就能解決 PUT 的問題可以只修改部分的資料。


```json
  {
    "title": "My test3"
  }
```

```
PATCH /posts/2 HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

<img src="/images/posts/web/2018/img1070201-6.png">


#### DELETE (刪除資料)

開啟 Postman 選取 PUT 並在網址列輸入 `http://localhost:3000/posts/2` ，網址最後面的 id 就是你要刪除的那筆資料，最後再點選 Send 送出，資料就會被成功的刪除囉！


```json
  {
    "title": "My test3"
  }
```

```
DELETE /posts/2 HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

<img src="/images/posts/web/2018/img1070201-7.png">


## 修改監聽 PORT 號
在相同的資料夾內新增一個 `json-server.json` 的檔案，在裡面改寫 PORT 號如下，修改完成後一樣輸入 `json-server db.json` 啟動執行。

```json
{
  "port": 3020
}
```

<img src="/images/posts/web/2018/img1070201-8.png">

## 結論
JSON Server 是一個非常棒的套件尤其是在 API 還尚未開發完成時可以用來做前端的假資料模擬，此外你也可以搭配 ngrok 可以開起來讓外部的人做連線，免建立資料庫只要有支 JSON 的檔案就能快速建議一個 Restful API，而且此套件開源在 [GitHub](https://github.com/typicode/json-server) 上並且有其他很多的功能可以使用，有興趣的朋友可以來試試看。
