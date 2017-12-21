---
layout: post
title: '[React學習筆記] 暸解狀態 state 與 setState'
categories: 'React'
description: '狀態 state 的使用'
keywords: React.js
---

## 前言
React 中有兩個東西會控制到元件分別是 props 和 state， props 是由父元件傳入，在 component 中，它是不會被改變的，而要改變的資料會放在我們今天要介紹的 state。


## React state

state 比較像是 component 內部的變數，是一個 JavaScript 物件保留字，雖然 props 允許您將數據傳遞到 component（並因此觸發UI更新），但狀態用於更改 component，以及從內部狀態。更改狀態也會觸發 UI 更新。

這裡 App 元件包含 state 。只有基於 `class` 的元件可以定義和使用 state。你當然可以把它們傳遞 state 給函式元件(function state)，但是這些組件不能直接修改。

- 主元件 app.js

```jsx
// app.js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons:[
      {name:"Andy","age":21},
      {name:"Jack","age":22}
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
      </div>

    );
  }
}

export default App;
```

- 子元件 Person.js (此檔案原封不動)

```jsx
import React from 'react';

const person = (props) => {
  return (
      <div>
        <p> I'm {props.name} and I'am {props.age} yesrs old.</p>
        <p>{props.children}</p>
      </div>
  )
};

export default person;

```

範例程式碼：https://github.com/andy6804tw/create-react-app/tree/Part2


##  按鈕呼叫函式修改 state

接連上一例子我們再加入 Button 來新增狀態事件，值得一提的是 `<button>` 在 JSX 當中的 onClick 事件 `C` 為大寫，此外要改變 state，必須使用 `setState()`，以下例子是利用按鈕點擊來修改 state 的內容。

- 主元件 App.js

```jsx
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons:[
      {name:"Andy","age":21},
      {name:"Jack","age":22}
    ]
  }
  call = ()=>{
    // 使用 this.setState() 修改狀態
    this.setState(
      {
        persons: [
          { name: "Andy2", "age": 21 },
          { name: "Jack2", "age": 22 }
        ]
      }
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <button onClick={this.call}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
      </div>

    );
  }
}

export default App;
```

- 子元件 Person.js (未更動)

```jsx
import React from 'react';

const person = (props) => {
  return (
      <div>
        <p> I'm {props.name} and I'am {props.age} yesrs old.</p>
        <p>{props.children}</p>
      </div>
  )
};

export default person;

```
