---
layout: post
title: '[Node.js打造API] (實作)JWT取代傳統token驗證使用者身份'
categories: '2018iT邦鐵人賽'
description: 'JSON Web Token'
keywords: api
---

## 本文你將會學到
- 了解 JWT 運作原理 
- 實作使用者登入成功並取得一組 Token


## 前言
為什麼要有 API Token 呢？各位可以想想若今天我要存取特別資料例如交易紀錄或是發文紀錄，這些資料都有獨特性也就是這些資料只有你能做存取與修改，所以在訪問某些重要的 API 前就必須要有一個 API Token 驗證妳是否有權限來訪問裡面的資料。

## 何謂 JWT
JWT 是 JSON Web Token 的縮寫，通常用來解決身份認證的問題，JWT 是一個很長的 base64 字串在這字串中分為三個部分別用點號來分隔，第一個部分為 `header` ，裡面分別儲存型態和加密方法，通常系統是預設 `HS256` 雜湊演算法來加密，官方也提供許多演算法加密也可以手動更改加密的演算法，第二部分為 payload，它和 session 一樣，可以把一些自定義的數據存儲在 payload 裡，例如像是用戶資料，第三個部分為 signature，為檢查碼是為了預防前兩部分被中間人偽照修改或利用的機制。

- Header(標頭): 用來指定 hash algorithm(預設為 HMAC SHA256)
- Payload(內容): 可以放一些自己要傳遞的資料
- Signature(簽名): 為簽名檢查碼用，會有一個 serect string 來做一個字串簽署

把上面三個用「.」接起來就是一個完整的 JWT 了！

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmR5MTAiLCJ1c2VyX21haWwiOiJhbmR5QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJwYXNzd29yZDEwIiwiaWF0IjoxNTE1MTQwNDg0fQ.P41UlFdYNIho2EA8T5k9iNK0EMC-Wn06RKk_0FFNjLo
```

流程： 使用者登入 -> 產生 API Token -> 進行 API 路徑存取時先 JWT 驗證 -> 驗證成功才允許訪問該 API
