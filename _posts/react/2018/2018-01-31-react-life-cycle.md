---
layout: post
title: '[React學習筆記] React Component的生命週期'
categories: 'React'
description: '元件的生命週期'
keywords: React.js
---

## 前言
React 的出現就顛覆了傳統網頁設計概念，出現了 Virtual DOM 這個名詞，不僅提升渲染的效能也能夠將所有畫面做元件化，而產生出 WEB APP 的名詞出現，在這章節中我們就來討論 React 的生命週期。

## 兩種元件渲染方法
這邊來複習一下在 React 中有兩種元件建立的方式一種是 Class Component 寫法而另一種是 Functional Component 寫法，兩者使用時機也不盡相同，簡單來說 Class 寫法可以進行比較複雜的操作和元件生命週期的控制，而 Functional 寫法沒有內部狀態、沒有實作物件和 ref，也沒有生命週期函數，相對的 Functional 會是比較好的效能，然而不能馬上下定論說效能好必定是最好的當然我們要使用的的方法運用在對的事物上才能發揮它原有的效能。

##### 1. Class Component

```jsx
class MyComponent extends React.Component {
	// render 為渲染整個元件的方法
	render() {
		return (
			<div>Hello, {this.props.name}</div>
		);
	}
}
// PropTypes 的驗證，若傳入的 props 不符合自訂的格式規範將會報錯
MyComponent.propTypes = {
	name: React.PropTypes.string,
}
// 若對應 props 沒傳入值將會使用 default 預設值
MyComponent.defaultProps = {
 	name: 'default name',
}
// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
ReactDOM.render(<MyComponent name="Andy"/>, document.getElementById('app'));
```

##### 2. Functional Component (stateless components)

```jsx
const MyComponent = (props) => (
  return (
    <div>Hello, {props.name}</div>
  )
);
// PropTypes 的驗證，若傳入的 props 不符合自訂的格式規範將會報錯
MyComponent.propTypes = {
	name: React.PropTypes.string,
}
// 若對應 props 沒傳入值將會使用 default 預設值
MyComponent.defaultProps = {
	name: 'default name',
}
// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
ReactDOM.render(<MyComponent name="Andy"/>, document.getElementById('app'));
```
