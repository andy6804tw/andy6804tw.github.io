---
layout: post
title: 'RWD 網頁起手式'
categories: 'Web'
description: 
keywords: 
---

## 前言
現今網頁設計開發，最基本地要求就是符合響應式網頁設計 (RWD, Responsive Web Design)。如果你聽到這個名詞，就表示你的網頁必須要支援跨平台(手機、電腦、平板...)，能夠自適應不同的設備大小。

## 如何判斷是否支援 RWD
如果你逛一個網站，你可以從開發人員模式中查看網頁程式碼。從標頭`<head></head>`中找出下面這段程式:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

如果有看到上述 viewport 語法，代表此網頁支援 RWD。 

- width=device-width
    - 自適應手機螢幕寬度
- initial-scale 到 minimun-scale=1.0
    - 伸縮比及最大最低的伸縮比都為1倍