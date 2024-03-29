---
layout: post
title: '[React學習筆記] input呼叫事件變動state的資料'
categories: 'React'
description: '狀態 state 的使用'
keywords: React.js
---

## 前言
這個範例是在 Person 這個元件中新增一個 `input` 標籤並使用 `onChange` 監聽事件並呼叫 nameChange 函式，你可以發現該函式有個傳入值叫 event 此外要取得裡面的值為 `event.target.value` ，最後觸發此事件直接 `this.nameChange` 就行了。

- 主元件 App.js (在 Person 加入 changed 傳入 props)

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
  call = (newName)=>{
    // 使用 this.setState() 修改狀態
    this.setState(
      {
        persons: [
          { name: newName, "age": 21 },
          { name: "Jack2", "age": 22 }
        ]
      }
    );
  }
  nameChange=(event)=>{
    this.setState(
      {
        persons: [
          { name: event.target.value, "age": 21 },
          { name: "Jack2", "age": 22 }
        ]
      }
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <button onClick={this.call.bind(this,"new Andy")}>Switch Name</button>
        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}
        click={()=>this.call("new Andy2")}
        changed={this.nameChange}/>  
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
      </div>

    );
  }
}

export default App;
``` 

- 子元件 Person.js (新增input)

```jsx
import React from 'react';

const person = (props) => {
  return (
      <div>
        <p onClick={props.click}> I'm {props.name} and I'am {props.age} yesrs old.</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
      </div>
  )
};
export default person;

```


https://github.com/andy6804tw/create-react-app/tree/Part5
