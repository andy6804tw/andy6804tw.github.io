---
layout: post
title: '[React學習筆記] 父子元件傳遞函式'
categories: 'React'
description: '狀態 state 的使用'
keywords: React.js
---


# 兩個元件傳遞函式
父函式可以跟子函式共用傳遞方法，由以下例子可以發現 `<Person/>` 中多了 `click={this.call}` 的 props 傳遞到子元件中，在遊子元件中的標籤渲染做 `<p onClick={props.click}/>` 的觸發。

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
        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}
        click={this.call}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
      </div>

    );
  }
}

export default App;
```

- 子元件 Person.js

```jsx
// Person.js
import React from 'react';

const person = (props) => {
  return (
      <div>
        <p onClick={props.click}> I'm {props.name} and I'am {props.age} yesrs old.</p>
        <p>{props.children}</p>
      </div>
  )
};

export default person;
```

https://github.com/andy6804tw/create-react-app/tree/Part3
