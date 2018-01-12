---
layout: post
title: '[Node.js打造API] (實作)使用JWT來存取API內容(總結)'
categories: '2018iT邦鐵人賽'
description: 'JSON Web Token'
keywords: api
---

## 本文你將會學到
- 實作一個 API 撈取並顯示自己所發佈過的文章
- 了解 JWT 和Bearer Token 的關係
- 


## JWT 和Bearer Token 的關係
要存取某 API 時，若要身份驗證則在 JWT 前面加上字符串 `Bearer` 再放到 HTTP 請求的 Header 中，這個值就是 `Bearer Token`，至於為什麼要這樣做？ HTTP 的認證「Authorization」方案有許多種格式，而 Bearer 就是其中一種且被定義在 Header 中的驗證方案，通常搭配於 JWT 上，Resource server 是資源服務器，即後端存放用戶生成的 API Token 的服務器。 Authorization server 的意思是認證服務器，即後端專門用來處理認證的服務器在我們系列實作是使用 JWT 機制，這些東西都是由 [OAuth 2.0](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html) 中所定義出來的，在定義中說明了 Client 如何取得 Access Token 的方法，在這篇文章稍微提到就好若要完整解釋可能就是另一個領域了，在這系列文中就不多贅述，本篇只會說明基本使用方法跟注意事項。

**Authentication schemes：**
- Basic [(RFC 7617)](tools.ietf.org/html/7617)
- Bearer [(RFC 6750)](https://tools.ietf.org/html/rfc6750)
- Digest [(RFC 7616)](https://tools.ietf.org/html/rfc7616)
- HOBA [(RFC 7486)](https://tools.ietf.org/html/rfc7486)
- [Mutual](https://tools.ietf.org/html/draft-ietf-httpauth-mutual-11)
- [AWS4-HMAC-SHA256](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html)

[參考](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

## 客戶端向後端出示API Token的方式
客戶端(Client)向後端(Server)出示 API Token 的方式分為三種。

#### 1. 放在 HTTP Header 裡面
此方法為 Resource Server 資源服務器，為本系列文中所實作的方式。

```bash
GET /api/article/personal HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6IkFuZHkxMCIsInVzZXJfbWFpbCI6ImFuZHlAZ21haWwuY29tIn0sImV4cCI6MTUxNTczODUxOSwiaWF0IjoxNTE1NzM3NjE5fQ.CLPeXhcxl2mdsL6-sUNFHFYABkTxmzx3YxEPyNih_FM
```


#### 2. 放在 Request Body 裡面
此方法也有人用，把 Token 放在 Body 傳送，本系列文中的 新增、修改內容都是使用此方式傳值。

```bash
GET /api/article/personal HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6IkFuZHkxMCIsInVzZXJfbWFpbCI6ImFuZHlAZ21haWwuY29tIn0sImV4cCI6MTUxNTczODUxOSwiaWF0IjoxNTE1NzM3NjE5fQ.CLPeXhcxl2mdsL6-sUNFHFYABkTxmzx3YxEPyNih_FM
```

#### 2. 放在 URI 裡(Query Parameter)
通常不建議這種方式因為你的資訊會被暴露在前端使用者上，雖然是亂碼但還是會被有心時是利用的風險，但還是有被使用的時候，像[中央氣象局](https://opendata.cwb.gov.tw/usages)的 API ，開發者必須先註冊後取得授權碼 API Token 後再將 API Token 放到網址上進行 Open Data 的存取

<img src="/images/posts/it2018/img1070114-1.png">


https://blog.yorkxin.org/2013/09/30/oauth2-6-bearer-token
http://ju.outofmemory.cn/entry/311681
