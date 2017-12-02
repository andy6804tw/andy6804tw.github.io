---
layout: post
title: '[JS學習筆記] 使用Express建立路由'
categories: '2018iT邦鐵人賽'
description: 使用 joi 驗證變數並建立第一個路由
keywords: Express, MVC, Router, joi
---

## 這節將會學到
- 如何安裝 Express
- 使用 Express 建立路由
- 建置一個 MVC 中的 Module 與 Controller 環境
- `.env` 建立全域變數，並使用 joi 驗證


## 結構
繼承上次所完成 Webpack+Babel 設定，繼續在 src 資料夾中加入以下資料夾與檔案。

```bash
src
┌── config
│   ├── config.js  // joi驗證與匯出全域變數
│   └── express.js  // express與其他middleware設定
├── server
│   ├── controllers  // 處理控制流程和回應
│   ├── helper  // 處理例外Error
│   ├── modules // 後端資料庫進行運作
│   └── routes  // 各路徑的設定點
│       └── index.route.js  // 主路由
│
└── index.js  // 程式進入點
```

<img src="/images/posts/it2018/img1061225-1.png" width="300">


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


## 使用 Express

##### 1.安裝 express
  ```bash
  yarn add express
  ```
##### 2.解析 express.js

   這個檔案內包含 express 與其他 middleware 設定：

  - app.get()
    - 此方法是由 `express()` 所產生並使用 get 請求方式，內有兩個參數第一部分是路徑由單引號包起來 `'/'` 代表為當前預設路徑，所以程式執行後在瀏覽器輸入 `http://127.0.0.1:[你設定的PORT]` 就是該路徑了。
  - app.use()
    - 此方法是宣告使用一個路由，變數 index 就是引入 routers 資料夾裡的  index.route 檔案，該路徑詳細內容就在該文件中編輯。

  ```js
      /* express.js */
      import express from 'express';
      import config from './config';
      import index from '../server/routes/index.route';

      const app = express();

      /* GET home page. */
      app.get('/', (req, res) => {
        res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
      });

      app.use('/api', index);

      export default app;
  ```

##### 3.解析 index.route.js

這個檔案名稱有沒很熟悉，他早在 `express.js` 有出現過，在那個檔案內只有先定義說好我有一個位置叫 api 的路徑並引入進來，那真正的詳細作業內容就拉出來到一個 routes 資料夾中去做集中管理每個路徑檔，所以下就是教你怎去實作內容，各位可以發現 router 這個變數指定為 express.Router() ，代表的是宣告此變數是個路由經由 express 掌控，後面的方法有很多像是 get、post、put、delete......等


```js
import express from 'express';
import config from './../../config/config';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

export default router;

```

##### 4.解析 index.js

`index` 這個檔案為程式的進入點，為了保持乾淨所以我才另外建立 `express.js` 然後在這邊做引入的動作，這個檔案中有一個重點就是自架 server 所以使用 express 的監聽方法(listen)，`config.port` 就是我們自己先前在 `.env` 所設定的阜號，當時是一執行就會跑出裡面的 console.log() 來確定是否被正常執行。

 ```js
 import config from './config/config';
import app from './config/express';

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
  });
}

export default app;
```

## 執行

幫各位複習一下，先前有教各位在 `package.json` 這隻檔案裡設定 scripts 如下：

```js
"scripts": {
    "build": "webpack -w",
    "start": "nodemon dist/index.bundle.js"
  }
```

`build` 就是將我們的 ES6 語法利用 webpack+babel 轉成瀏覽器懂的語法，轉譯後再 `start` 啟動執行程式，所以第一步驟先利用 webpack 轉譯

```bash
yarn build
```

<img src="/images/posts/it2018/img1061225-2.png" >


第二步新增另一個終端機，在 VS Code 下方顯示列有個 + 點下去即可新增另一個新的終端機，旁邊的選單可以選取你所開過的歷史執行中終端機，接下來就來執行編譯好的程式囉！

```bash
yarn start
```
<img src="/images/posts/it2018/img1061225-3.png">

如果都正成執行沒跑出紅色一長串錯誤訊息代表恭喜你成功拉！之後可以立馬到瀏覽器上測試成果囉～

```
localhost:3000
```

<img src="/images/posts/it2018/img1061225-4.png" width="450">

```
localhost:3000/api
```

<img src="/images/posts/it2018/img1061225-5.png" width="400">
