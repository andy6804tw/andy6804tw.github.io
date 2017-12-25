---
layout: post
title: '[Node.js打造API] 設定joi與config dotenv環境參數'
categories: '2018iT邦鐵人賽'
description: 'config'
keywords: 
---

## 本章節會學到
- 了解 joi 是什麼
- 建立 dotenv 環境參數
- joi+dotenv 改寫 config.js 建立全域變數


## 設定全域變數

##### 1.安裝 dotenv
  ```bash
  yarn add dotenv
  ```

##### 2.建立 `.env` 檔
    
  dotenv 是將.env文件中的全域變數加載到 process.env。這個檔要建立在最外層資料夾，在其他文件中只要呼叫 `PROCESS.ENV.[變數名稱]` 就能將此全域變數撈出來了，通常還會搭配 joi 來做設定。

- 在這個檔案中初始化三個變數分別為 PORT(阜號)、 NODE_ENV(開發模式)、VERSION(版本)。

```js
/* .env 全域變數的設定檔 */
PORT=3000
NODE_ENV=development
VERSION=1.0.0
```

## 使用 joi 來驗證全域變數

##### 1.安裝 joi

  ```bash
  yarn add joi
  ```

##### 2.建立 `config.js` 檔

  在 `/src/config` 底下建立一個 `config.js` 裡面專門建立一個 config  物件變數並匯出，其中在變數產生時我們利用 joi 來驗證該變數是否符合格式規範，利如 PORT 只允許輸入數字若輸入字串就會被阻擋並取給他預設值 8080。

   ```js
   /* config.js */
    import Joi from 'joi';

    // require and configure dotenv, will load vars in .env in PROCESS.ENV
    require('dotenv').config();

    // 建立每個變數 joi 驗證規則
    const envVarSchema = Joi.object().keys({
      NODE_ENV: Joi.string().default('development').allow(['development', 'production']),
      PORT: Joi.number().default(8080),
      VERSION: Joi.string()
    }).unknown().required();

    // 撈取 .env 內的變數做 joi 驗證
    const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    const config = {
      version: envVars.VERSION, // 版本
      env: envVars.NODE_ENV,  // 開發模式
      port: envVars.PORT  // 阜號
    };

    export default config;  // 匯出共用

   ```

   joi 的 [GitHub](https://github.com/hapijs/joi/blob/v13.0.2/API.md) 官方文件中有很多關於變數的規範，有興趣可以看去看看。
