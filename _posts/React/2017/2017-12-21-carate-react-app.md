---
layout: post
title: '[React學習筆記] 輕鬆使用 Create React app'
categories: 'React'
description: 'Create React app 使用介紹'
keywords: React.js
---

更新時間: 2021/05/04
# Create React app
Create React app 是由 Facebook 自己所開源的 start kit 在 [GitHub](https://github.com/facebookincubator/create-react-app) 上可以下載下來使用，初學習 React 建議從這包工具開始下手，裡面是由官方和一些 React 的社群共同維護的專案包。

## 下載使用
在 clone 之前先確保你的電腦已安裝或更新 Node.js，新的版本不需安裝全域指令。如果先前電腦有安裝 `npm install -g create-react-app` 的讀者建議使用前先移除 `npm uninstall -g create-react-app` 確保接下來都是使用最新的內容。

#### 1. 透過 npm init 初始化專案
此用法跟初始化 Node.js 的 `package.json` 很相似，用法更簡單。`my-app` 可以自行更改成你要的專案名稱。

```bash
npm init react-app my-app
```

> npm init <initializer> is available in npm 6+

輸入上面指令後，會在當前目錄下建立 `my-app` 資料夾。在該資料夾裡，將自動生成初始專案結構，並安裝相關的 dependencies 套件。

#### 2. 測試執行
開啟你熟悉的編譯器進入該資料夾下並，輸入以下指令執行程式碼。

```bash
npm start
```

執行後你會發現它會自動幫你逮開瀏覽器並監聽 3000 port，此檔案會持續監聽當你有資料更改時會自動重新 reload 是不是很方便。

<img src="/images/posts/react/2017/img1061213-1.png">

<img src="/images/posts/react/2017/img1061213-2.png">

## 了解專案架構

```bash
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```

- index.js 渲染元件

在這支檔案你可以發現引入了 App.js 也就是 <App/> 元件，使用 `ReactDOM.render`  來渲染到前端網頁上，第一個參數是元件標籤 (JSX)，第二個參數是渲染到 `id = "root"` 的標籤上。

> React.render(React物件,DOM的位置);

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

```

- App.js 元件

此類別建立繼承 Component 記住類別名稱開頭一定要大寫，裡面有個 `render()` 方法中文翻譯就叫做渲染，他會回傳東西，裡面的東西類似 HTML 但不完全是，我們稱作 JSX (Javascript XML)



```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
      </div>
    );
  }
}

export default App;
```

渲染回傳等同於下列敘述

```js
...略
render() {
  return(React.createElement('div', {className: 'App'}, React.createElement('h1', null,'Hello World! React')));
);
...略
```

## 宣告元件

透過 React 建立元件有兩種方式，以下用 `<div id="root">` 做例子，上面所看到的 JSX 語法最後都會被程編譯成以下語法。

#### 1. React.DOM()

```js
React.DOM.div({id: 'root'}, 'Hello World! React');
```

#### 2. React.createElement()

- React.createElement( 標籤名稱, ReactClass名稱, 元素的子標籤)

```js
React.createElement('div', {id: 'root'},'Hello World! React');
```
