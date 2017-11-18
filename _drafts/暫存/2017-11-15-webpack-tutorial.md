---
layout: post
title: '[JS學習筆記] Webpack 與 babel 轉譯'
categories: '2018IT邦鐵人賽'
description: 'Webpack+babel'
keywords: JavaScript, ES6
---

## 什麼是 Webpack ?
[Webpack](https://zh.wikipedia.org/wiki/Webpack) 是一個開源的打包工具。Webpack 提供了開發缺乏的模組化開發方式，將各種靜態資源視為模組，並從它生成優化過的程式碼。 Webpack 可以從終端、或是更改 webpack.config.js 來設定各項功能。 要使用 Webpack 前須先安裝 [Node.js](https://nodejs.org/en/)。

## Webpack 與 Grunt 和 Gulp
其實這些東西類似不過還是有區別的不能與 Webpack 混為一體，原因是 Webpack 是將你的各種 assets 打包在一起，形成模組，而後兩者就是 Task Runner，你可以在 build process 中建立很多的任務。這篇[文章](https://survivejs.com/webpack/appendices/comparison/)分別介紹各種打包工具有興趣可以看看。
## 使用教學

##### 1. 安裝 Webpack 
在 package.json 中加入指令(只打包一個檔案)

```js
"scripts": {
    "build": "webpack src/js/main.js dist/bundle.js", //把maim.js產出bundle.js
    "build:prod": "webpack src/js/main.js dist/bundle.js -p" //同上只是檔案壓縮最小化
  }
```

##### 2. 同時打包很多檔案

安裝babel
```
$ yarn add -D babel-preset-env babel-plugin-transform-object-rest-spread
$ yarn add -D webpack babel-core babel-loader webpack-node-externals
```

新增 webpack.config.js  Webpack 的設定檔
```js
/* webpack.config.js ： Webpack 的設定檔 */

const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {   //設定你的檔案選項
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
}
```
修改 package.json 中加入指令(只打包一個檔案)
```js
"scripts": {
    "build": "webpack -w",
    "build:prod": "webpack -p",
    "start": "nodemon dist/index.bundle.js"
  }
```

