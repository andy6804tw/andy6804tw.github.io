---
layout: post
title: '[Node.js打造API] Article修改、刪除'
categories: '2018iT邦鐵人賽'
description: '教導如何攥寫修改、刪除'
keywords: api
---

## 本文你將會學到
- 如何修改資料庫一筆文章資料
- 如何刪除資料庫一筆文章資料
- 使用Postman測試PUT與DELETE

## 前言
昨天已經將資料庫欄位都建立好了，今天要教導各位如何使用 JavaScript 與 MySQL 串接資料庫欄位並實作新增(INSERT)、修改(UPDATE)、刪除(DELETE)、顯示(SELECT)，在開始之前請先分別建立 `article.controller.js` 在 `controllers` 資料夾以及建立 `article.module.js` 在 `modules` 資料夾還有建立 `article.route.js` 在 `routes` 資料夾，今天實作會動到這三支檔案。

## 設定路由
`index.route.js` 是管理所有路由的地方， article 裡面有新增、修改、刪除、顯示的路徑，首先引入 `article.route` 的檔案儲存為一個名為 `article` 的變數，然後新增一個路由路徑為 `/article` ，後面的參數 `article` 表示引用 `article.route.js` 內所有的路由動作(GET、POST、PUT、DELETE)。

- index.route.js

```js
// Router
import article from './article.route';

/** Article Router */
router.use('/article', article);
```

## 新增(Article)

- article.module.js

module 檔案是最終與資料庫做存取的地方，傳入值 `insertValues` 是使用者要新增的資料為一個物件 Object 型態，這個變數是由 `article.controller.js` 傳過來的。

`connection.query()` 是一個方法，能夠直接在裡面撰寫 sql 語法來做資料庫的存取。

```js
import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});
/* Article  POST 新增 */
const createArticle = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Article SET ?', insertValues, (error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ article_id: ${result.insertId}`); // 寫入成功回傳寫入id
          }
          connection.release();
        });
      }
    });
  });
};
```

- article.controller.js


```js
import articleModule from '../modules/article.module';

/*  Article GET 取得  */
const articleGet = (req, res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};
```

- article.route.js

```js
import articleCtrl from '../controllers/article.controller';

router.route('/').post(articleCtrl.articlePost); /** 新增 Article 值組 */
```

<img src="/images/posts/it2018/img1070103-1.png">
<img src="/images/posts/it2018/img1070103-2.png">


## 顯示(Article)

- article.module.js

```js
import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});
/*  Article GET 取得  */
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          `SELECT
            *
          FROM
            Article`
          , (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error);
            } else {
              resolve(result);
            }
            connection.release();
          }
        );
      }
    });
  });
};
```

- article.controller.js

```js
import articleModule from '../modules/article.module';

/*  Article GET 取得  */
const articleGet = (req, res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};
```

- article.route.js

```js
import articleCtrl from '../controllers/article.controller';

router.route('/')
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */
  .post(articleCtrl.articlePost); /** 新增 Article 值組 */
```
