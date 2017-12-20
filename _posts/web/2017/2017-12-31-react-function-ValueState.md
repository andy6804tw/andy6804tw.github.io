---
layout: post
title: '[React學習筆記] 利用函式傳值並修改 state'
categories: 'React'
description: '狀態 state 的使用'
keywords: React.js
---

## 函式傳值並修改 state
上一篇教你如何建立函式並使用按鈕出發呼叫 function，這一章節要教你如何將值傳入函式並呼叫，如果你想說 `this.call('name')` 算對一半， React 有兩種方法可以傳遞數值進入方法，第一種是使用 `this.call.bind(this,"new Andy")` 使用 `bind` ，那第二種發法上面有提到過但他的寫法是要再家箭頭函式包起來，這就能解釋第一種方法為什麼要用 this 了 `{()=>this.call("new Andy2")}`，所以以下範例我在 `<button>` 標籤內示範第一種寫法而在 `<Person>` 內寫第二種箭頭函式寫法。

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

  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <button onClick={this.call.bind(this,"new Andy")}>Switch Name</button>
        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}
          click={()=>this.call("new Andy2")}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hobby is coding</Person>
      </div>

    );
  }
}

export default App;
```

- 子元件 Person.js (未變動)

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

## 結論

這教你利用兩種方法呼叫函式並且帶值，其中第二種箭頭韓式方法效率較為差，不建議使用，建議第一種方法 `bind` 來取代。

https://github.com/andy6804tw/create-react-app/tree/Part4
