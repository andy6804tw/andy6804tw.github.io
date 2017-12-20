---
layout: post
title: '[React學習筆記] 使用 Props 傳遞數值'
categories: 'React'
description: '使用 props'
keywords: React.js
---

## React Props
在一般的 HTML 我們可以傳遞屬性，而在 React 中使用 Props 是固定不變的，它可以自定義變數傳入元件中並渲染出來 `{this.props.參數名稱}`，這邊定義一個外部函式元件然後在 app.js 中去調用它並動態給值，此外 props 允許您將數據從父（包裝）組件傳遞給子（嵌入）組件。

- 主元件 app.js

```jsx
// app.js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <Person name="Andy" age="21"/>
        <Person name="Jack" age="22"/>
      </div>

    );
  }
}

export default App;

```

- 子元件 Person.js 

#### 1. 函式元件寫法

在函式中定義一個接收的參數 props。

```jsx
// Person.js 函式元件，並給 app.js 使用
import React from 'react';

const person =(props)=>{
  return <p> I'm {props.name} and I'am {props.age} yesrs old.</p>
}

export default person;

```

#### 2. 類別元件寫法

```jsx
import React from 'react';

class person extends React.Component {
  render() {
    return (
      <p> I'm {this.props.name} and I'am {this.props.age} yesrs old.</p>
    );
  }
}

export default person;

```


## 傳入 Children Property

若我想在元件中加入子元件像是 `<Person>Hello</Person>` 可以使用 `{props.children}` 渲染出來，範例延續上一個注意我在最後一個標籤內坎入文字，若要顯示出來則要使用 `{props.children}`，觀察 Person.js 的變化。

- 主元件 app.js

```jsx
// app.js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World! React</h1>
        <Person name="Andy" age="21"/>
        <Person name="Jack" age="22">Hobby is coding</Person>
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
        <p> I'm {props.name} and I'am {props.age} yesrs old.</p>
        <p>{props.children}</p>
      </div>
  )
};

export default person;
```

<img src="/images/posts/web/img1061225-1.png">

範例程式碼：https://github.com/andy6804tw/create-react-app/tree/Part1
