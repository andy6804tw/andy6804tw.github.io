---
layout: post
title: '使用 Gulp 4.0 新的(CLI)命令行界面'
categories: 'Tool'
description: 'Gulp與專案管理'
keywords: Node.js, Gulp
---

## 何謂Gulp 
隨著前端世界的演進衍伸出許多語言框架像是光 CSS 就有 LESS、SCSS、Sass、Stylus、PostCSS，HTML 有 Haml、hbs、pug、Slim、Markdown，而 JavaScrypt 則有 CoffeeScript、LiveScrypt、TypeScrypt、Bable，對於這些程式碼的打包其實非常的重要而 gulp 就是在做這件事，此外與 gulp 相類似的打包工具就是 grunt，grunt 對於資深的工程是一定不陌生，他是最古老的打包工具近幾年 gulp 出現使用者慢慢轉移使用 gulp 了，而在 2018 年 1 月 gulp 也終於正式釋出地4版了。

## 安裝 gulp-cli
在 gulp 的 [GitHub](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) 的官方文件中有提到要使用4.0.0版本前若你的本機先前已安裝過 gulp 的 global 全域必須先移除並重新安裝 `gulp-cli`，想知道更多可參考[這篇](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)。 

##### 1. 檢查版本
安裝前先檢查本機是否存在 gulp 以及版本號，若不是 `CLI` 版本的按照下列步驟移除重新安裝 gulp。

```bash
gulp -v
```

<img src="/images/posts/tool/2018/img1070123-1.png" width="600">

##### 2. 移除舊版 gulp

```bash
npm rm --global gulp
```

##### 3.安裝 gulp-cli
之前 CLI 和 library 都安裝於 gulp 中，新版的 gulp 把 Command Line Interface 額外移出來，相關指令可以[查閱](https://www.npmjs.com/package/gulp-cli)。

```bash
npm install --global gulp-cli
```

安裝完成後再執行一次 `gulp -v` 此時你的版本應該為 `CLI Version ` 最新狀態了。


## 實作教學

##### 1. 初始化專案
首先建立一個資料夾並將此專案初始化產出一個 Node.js 的 `package.json`。

```bash
npm -init -y
```

##### 2. 安裝 gulp
再來我們要安裝 gulp 的 Node.js 套件到我們們專案 dev 中。

```bash
npm install --save-dev gulp@next
```

##### 3. 建立 gulpfile.js
在專案根目錄底下建立一個 `gulpfile.js` 的檔，gulp 執行執行所有指定的任務都在這支檔案中來攥寫。
首先引入 `gulp` 之後建立一個任務 task()，此方法有兩個參數第一個為 gulp 的 script 執行指令，這邊可以依照自己習慣命名，`default` 為預設所以在終端機輸入 gulp 就會執行該任務內容，第二個參數為一個 function 裡面設定你所要執行的任務。我們先寫一個 `log()` 印出訊息，流程結束記得要回傳 done() 告知結束中止此任務。

```js
// gulpfile.js
const gulp = require('gulp');

gulp.task('default', defaultTask);

function defaultTask(done) {
  // place code for your default task here
  console.log('Hello World!');
  done();
}
```
完成後在終端機輸入 `gulp` 就可以正常執行囉！

<img src="/images/posts/tool/2018/img1070123-2.png" width="600">


## 常用的gulp套件
gulp 所提供的 Plugins 有非常多，目前為止有多達三千多種，有興趣可以來[這裡](https://gulpjs.com/plugins/)挖寶找看看有沒適合你的流程管理套件，其中在這篇文章中我介紹幾個我常用的套件。

- gulp-uglify 
  - 壓縮 javascript ，最小化 javascript
- gulp-babel
  - 使用babel將ES6語法轉成瀏覽器所看的懂的JavaScript
- gulp-nodemon
  - 使用nodemon監聽指定的程式碼

##### 1. 安裝套件
安裝的東西有點多下面來一一解釋安裝內容：

- babel 編譯套件
  - babel-core、babel-preset-env、babel-register
- gulp 套件
  - gulp@next
  - gulp-babel
  - gulp-nodemon
  - gulp-uglify
- 其他套件
  - express 框架(撰寫Node.js環境測試)
  - del 可刪除某資料夾所有檔案

```bash
npm install --save-dev babel-core babel-preset-env babel-register del express gulp@next gulp-babel gulp-nodemon gulp-uglify
```

##### 2.建立`.babelrc`
安裝完成後建立 `.babelrc` 來設定設定 babel 的轉碼規則，將此檔案存放在項目的根目錄下，Babel是一個廣泛使用的轉碼器，可以將ES6代碼轉為ES5代碼。

```js
// .babelrc
{
  "presets": [
    "env"
  ]
}
```

##### 3. 建立 gulpfile.js
在專案根目錄底下建立一個 `gulpfile.js` 的檔案，之後就來開始攥寫流程囉！官方的建議寫法是把所有的流程用 function 寫好，所以我們這邊寫三個 function。

第一個函式為 `clean()` 使用 `del` 套件在每次執行 gulp 前先將 dist 出來的資料刪除以免新版跟舊版程式碼搞混覆蓋後而出問題。

第二個函式為 `scripts()` 使用 `pipe` 管線方式依序執行 `babel()` 轉成瀏覽器所看的懂的JavaScript、`ugly()` 將程式碼壓縮成一行，最後在產出到指定資料夾中。

第三個函式為 `nodemons()` 使用nodemon監聽指定的程式碼並持續監聽指定目錄下的檔案，若偵測到程式碼病棟就自動重新執行 `tasks: ['default']` 指定的任務。

最後使用 `gulp.series()` 來打包任務囉，此寫法也是最新版才出現的其中最特別的是 `gulp.parallel()` 能夠在非同步狀態下同時進行此任務，因為在目前專案中還不須用到平行執行，但為了示範我還是想上去，該方法內可以放置多個你要同時被執行的流程。

任務打包之後就可以使用 `gulp.task()` 來建立任務腳本囉，此方法有兩個參數第一個為 gulp 的 script 執行指令，這邊可以依照執行項目命名，第二個參數就是你所要執行的內容囉！這邊建立兩個 gulp 的腳本第一個為 `default` deploy 編譯後產出 dist 資料夾，第二個腳本為 `serve` 為開發階段可以使用 nodemon 邊開發邊執行監聽編譯程式碼。

```js
// gulpfile.js
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
//const concat = require('gulp-concat'); // 合併檔案
const del = require('del');

const paths = {
  src: 'src/**',
  dest: 'dist/'
};

// 每次編譯前先移除原有檔案
function clean() {
  return del(['dist']);
}
function scripts() {
  return gulp.src(paths.src, { sourcemaps: true })
    .pipe(babel()) // 使用babel轉成瀏覽器所看的懂的JavaScript
    .pipe(uglify()) // 將程式碼壓縮成一行
    //.pipe(concat('index.min.js')) // 合併所有檔案
    .pipe(gulp.dest(paths.dest)); // 編譯後產出到指定資料夾中
}
function nodemons(done) {
  nodemon({
    script: 'dist/index.js' // 使用nodemon監聽指定的程式碼
    , ext: 'js' // 監聽JavaScript
    , watch: paths.src // watch ES2015 code
    , tasks: ['default'] // compile synchronously onChange
    , env: { 'NODE_ENV': 'development' }
  })
  done();
}

const build = gulp.series(clean, gulp.parallel(scripts));
const serve = gulp.series(clean, scripts, nodemons);

// deploy product
gulp.task('default', build);

// development 開發模式
gulp.task('serve', serve);

```

##### 4. 使用Express建立路由
gulp 都已經準備就緒接下來撰寫一個簡易的 HTTP 連線吧！想了解更詳細內容可以參考這篇[[Node.js打造API] 使用Express建立路由](https://andy6804tw.github.io/2017/12/26/express-mvc-tutorial/)。

- 建立資料夾

筆者是以 MVC 架構來開發整個專案所以依序建下列檔案和資料夾。

```bash
┌───────────src┌── config
│              │   ├── config.js  // joi驗證與匯出全域變數
├──.babelrc    │   └── express.js  // express與其他middleware設定
├──gulpfile.js ├── server
└──package.json│   └── routes  // 各路徑的設定點
               │       └── index.route.js  // 主路由
               └── index.js  // 程式進入點
```

<img src="/images/posts/tool/2018/img1070123-3.png" width="300">

- config.js

```js
// config.js
const config = {
  version: '1.0.0',
  env: 'development',
  port: '3030'
};

export default config;
```

- express.js

```js
// express.js
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

- index.route.js

```js
// index.route.js
import express from 'express';

import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

export default router;
```

- index.js

```js
// index.js
import config from './config/config';
import app from './config/express';

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on  post http://127.0.0.1:${config.port} (${config.env})`);
  });
}

export default app;
```

- package.json

在 `package.json` 文件中新增下咧兩個 npm 的腳本分別執行 gulp 中的 `default` 和 `serve`。

```json
"scripts": {
    "start": "gulp serve",
    "build": "gulp"
  }
```

## 測試

- deploy

執行該指令會自動編譯後並產出一個dist資料夾。

```bash
npm run build
```
<img src="/images/posts/tool/2018/img1070123-4.png" width="600">

- 開發模式

使用nodemon監聽dist資料夾內的程式，若程式碼有變動就立即重新編譯。

```bash
npm run build
```
<img src="/images/posts/tool/2018/img1070123-5.png" width="600">


打開 dist 資料夾內的任一支程式碼你會發現所有檔案都被babel編譯成 ES5 語法了，而且程式碼也被壓縮成一行了。

<img src="/images/posts/tool/2018/img1070123-6.png">

在瀏覽器輸入 `http://localhost:3030/api` 可立即觀Express所建立的路由。

<img src="/images/posts/tool/2018/img1070123-7.png">
