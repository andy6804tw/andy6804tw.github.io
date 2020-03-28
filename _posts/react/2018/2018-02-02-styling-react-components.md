---
layout: post
title: '[React學習筆記] React Component的inline style'
categories: 'React'
description: '元件的生命週期'
keywords: React.js
---


## inline style
記得在 Functional Component 寫法中撰寫 CSS inline style 的參數是寫在 `render()` 方法中直接建立一個 style 變數裡面存著 CSS 參數，最後在 JSX 中直接嵌入，其中也可以動態的修改 style 的樣式，像範例中是點擊按鈕會變換 style 中的 backgroundColor 背景顏色為紅。

此外 `<h1>` 標籤是使用動態的類別名稱來定義 inline style，此類別名稱(red 與 bold)已事先定義好在外部的 CSS 檔案中，然而在 JSX 中可以動態的 push 類別名稱到陣列中，最後使用 join 將陣列字串化且以空白區隔，所以最後會變成 `className= 'red  bold'`。

-HTML

```html
<div id="app"></div>
```

- CSS

```css
.red{
  color: red;
}
.bold{
  font-weight: bold;
}
```

- JSX

```jsx
class App extends React.Component {

  state = {
    showPerson: false
  }
  showPerson= ()=> {
    this.setState({showPerson:!this.state.showPerson});
  }

  render() {
    const style = {
      backgroundColor: 'red',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    
    const classes=['bold'];
    if(this.state.showPerson){
      classes.push('red');
    }
    
    
    let persons = null;
    if (this.state.showPerson) {
      persons = (
        <h1 className={classes.join(' ')}>Hello World! Andy</h1>
      );
      style.backgroundColor='green';
    }
    
    return (
      <div className="App">
         <button
          style={style}
          onClick={this.showPerson}>Switch Name</button>
        {/* 按鈕顯示資料使用js判斷 */}
        {persons}
      </div>

    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
```


<p data-height="265" data-theme-id="0" data-slug-hash="EoQJQg" data-default-tab="result" data-user="andy6804tw" data-embed-version="2" data-pen-title="EoQJQg" class="codepen">See the Pen <a href="https://codepen.io/andy6804tw/pen/EoQJQg/">EoQJQg</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## inline style 使用 media 和 :hover
在 inline style 中無法使用 CSS 一些功能像是響應式(media)或滑鼠懸浮(hover)的事件偵測，解決方法有兩種一種是使用外掛套件(radium)或是修改 React 參數使用 CSS Modules。

#### radium 套件

<img src="/images/posts/react/2018/img1070202-1.png">
<img src="/images/posts/react/2018/img1070202-2.png">

#### CSS Modules

<img src="/images/posts/react/2018/img1070202-3.png">


參考：https://github.com/andy6804tw/create-react-app/tree/Part8
