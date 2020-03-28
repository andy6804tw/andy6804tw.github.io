---
layout: post
title: '[React學習筆記] 在JSX中加入判斷式'
categories: 'React'
description: 'Create React app 使用介紹'
keywords: React.js
---

## 前言
首先我們先將原本按鈕改點擊顯示資料的功能，首現在 state 新增一個 `showPerson: false` 的參數，當 button 點擊變為 true，但顯示隱藏要如何實作呢？接著就把腦筋動到 JSX 身上顯示資料的部分是 `<Person>` 將這些元件用一個 `<div>` 包起來接著就用判斷式判斷囉假如 showPerson 為真就顯示資料假就隱藏，以下有兩種方法來實作第一種是跟 JSX 寫在一起，第二種是由外部判斷並存入變數再經由變數將資料塞進去。

## 在return中加入判斷式
，、如果你有寫過 vue.js 你寫能會直接在 div 標籤寫 if 判斷像這樣 `<div v-if="showPerson">...</div>`，但在 React 中並不是這樣而是使用一個區塊程式 (block) 搭配問號運算子來實作，當按鈕點擊下去原本真改成假假改成真，這裡要記得修改 state 參數要使用 `this.setState()` 來修改狀態，問號運算元很好理解，`？` 左邊就是判斷式右邊就是執行，其中又以冒號 `:` 分開來，其當真時執行冒號左手邊，假時執行冒號右手邊。

- 一般 `if、else` 判斷式

```js
let showPerson=false;
let num=0;
if(showPerson){
  num=10;
}else{
  num=20;
}
console.log(num);
```

> output: 20

- 問號運算子

```js
let showPerson = false;
let num = 0;
showPerson ? num = 10 : num = 20;
console.log(num);
```

> output: 20


- 主元件App.js(新增showPerson()與state變數)

```jsx
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons:[
      {name:"Andy","age":21},
      {name:"Jack","age":22}
    ],
    showPerson: false
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

  showPerson=()=>{
    const bool=this.state.showPerson;
    this.setState({ showPerson: !bool});
  }

  render() {
    const style={
      backgroundColor: 'white',
      font:'inherit',
      border: '1px solid blue',
      padding:'8px',
      cursor:'pointer'
    };
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <button 
        style={style}
          onClick={this.showPerson}>Switch Name</button>
        {/* 按鈕顯示資料使用問號運算子判斷 */}
        { this.state.showPerson === true ?
          <div>
            <Person
              name={this.state.persons[0].name}
              age={this.state.persons[0].age}
              click={() => this.call("new Andy2")}
              changed={this.nameChange} />
            <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
          </div>:null
        }
      </div>

    );
  }
}

export default App;
```

- 子元件 Person.js (未變動)

```jsx  
import React from 'react';
import './Person.css'

const person = (props) => {
  return (
      <div className="Person">
        <p onClick={props.click}> I'm {props.name} and I'am {props.age} yesrs old.</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
      </div>
  )
};
export default person;
```


## 使用 JavaScript 方式
這個方法就是將判斷是寫在 return 外，當然可以正常執行 JavaScript，寫法就跟你一般攥寫 JavaScript 的 `if、else` 一樣囉，先創立一個空變數，若為就把 `<Person>` 那些 JSX 資料用變數包起來並在你要渲染地地方利用大括號放回變數。

- 主元件App.js

```jsx
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons:[
      {name:"Andy","age":21},
      {name:"Jack","age":22}
    ],
    showPerson: false
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

  showPerson=()=>{
    const bool=this.state.showPerson;
    this.setState({ showPerson: !bool});
  }

  render() {
    const style={
      backgroundColor: 'white',
      font:'inherit',
      border: '1px solid blue',
      padding:'8px',
      cursor:'pointer'
    };

    let persons=null;
    if(this.state.showPerson){
      persons=(
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
            click={() => this.call("new Andy2")}
            changed={this.nameChange} />
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <button 
        style={style}
          onClick={this.showPerson}>Switch Name</button>
        {/* 按鈕顯示資料使用問號運算子判斷 */}
        {persons}
      </div>

    );
  }
}

export default App;
```

- 子元件 Person.js (未變動)略

## 結論

第二主寫法個人比較推，一方面是簡單另一方面是簡潔不會污染 JSX 內容，各有各的好處可以視情況來做使用。

範例程式碼：https://github.com/andy6804tw/create-react-app/tree/Part6
