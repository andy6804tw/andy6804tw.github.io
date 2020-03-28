---
layout: post
title: '[React學習筆記] React Debug'
categories: 'React'
description: 
keywords: 
---


## 前言
一名工程師就是要善用除錯工具，有良好的重挫方式能快速的幫助你找到錯誤點不管是語意錯誤或是邏輯錯誤，這一篇文就是要來教你如何學會讀取 React 的錯誤訊息並且能夠有效率的解決問題。


## 建立自己的錯誤訊息
很簡單首先創立一個 `ErrorBoundary.js` 來客製化自己的錯誤訊息，做法內容跟建立一個元件一樣，繼承 `Component` 並使用 `componentDidCatch()` 方法來接收錯誤例外訊息，當無錯誤例外產生時回傳 `this.props.children` 繼續渲染子元件。

其中為了建立錯誤訊息我們在點擊按鈕時亂數產生一個 0~1 間的數字，若大於 0.7 就會拋出例外訊息。

- App.js

```jsx
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
// App.js 程式片段
let persons = null;
    if (this.state.showPerson) {
      const rnd = Math.random();
      if (rnd > 0.7) {
        throw new Error('Something went wrong');
      }
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                  name={person.name}
                  age={person.age}
                  click={() => this.deletePerson(index)}
                  changed={(event) => this.nameChange(event, person.id)} />
              </ErrorBoundary>)
          })}
        </div>
      );
      style.backgroundColor = 'green';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'white'
      }
    }
```

- ErrorBoundary.js (客製化錯誤訊息)

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component{
  state={
    hasError: false,
    errorMessage: ''
  }
  componentDidCatch=(error,info)=>{
    this.setState({hasError:true,errorMessage:error});
  }
 render(){
  if(this.state.hasError){
    return <h1>{this.state.errorMessage}</h1>;
  }else{
    return this.props.children;
  }
 }
}
export default ErrorBoundary;
```

由於目前是開發模式所以跳出的錯誤訊息是 React 自己產生的錯誤訊息，當專案發布成產品時自己客製化的錯誤訊息才會出現。

<img src="/images/posts/react/2018/img1070204-1.png">


## 推薦插件
這邊推薦一個 Chrome 的 React 開發模式的插件，可以很方便在瀏覽器上觀看程式內容以及可以很方便的使用 Debugging

下載：https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi



參考：https://reactjs.org/docs/error-boundaries.html
程式碼：https://github.com/andy6804tw/create-react-app/tree/Part9
