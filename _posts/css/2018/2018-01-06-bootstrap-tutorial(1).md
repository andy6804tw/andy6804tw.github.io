---
layout: post
title: '[CSS學習筆記] Bootstrap4 布局與欄位的使用'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---


## 本文你將會學到
- 開始使用 Bootstrap4.0
- 布局頁面：Container


## 開始使用 Bootstrap4.0
首先到[官方網站](https://getbootstrap.com/docs/4.0/getting-started/introduction/)複製入門板模到你的 index.html 中，將所有會用到的套件引入，或是使用 https://codepen.io/ 在 css 視窗新增 Bootstrap 的 lib。

<img src="/images/posts/css/2018/img1070106-1.png">
<img src="/images/posts/css/2018/img1070106-15.png">

## 佈局

### 使用 container
容器是 Bootstrap 中最基本的佈局元素，容器 container 會預設的當你自適應寬跟高（意味著 max-width 在每個螢幕大小的變化），只要使用 div 標籤 class 名稱為 container 就會載入框架了。

```html
<div class="container">
    <h1>Hello, world!</h1>
</div>
```

你會發現標籤 `<h1>` 會自動給你寬跟高，這是因為外面包了一個 container 的容器，Bootstrap 在 css 的 @media 設定了幾個預設的螢幕大小，其中他會自適應你的螢幕給予不同的寬跟高。

<img src="/images/posts/css/2018/img1070106-2.png">

至於在後面添加 `-fluid` 代表的容器佔整個螢幕 100%。 

```html
<div class="container-fluid">
    <h1>Hello, world!</h1>
</div>
```

<img src="/images/posts/css/2018/img1070106-3.png">


### Row 與 Column 樣式
在 Bootstrap 中還有欄跟列的佈局樣式一樣在 class 分別設定 col(欄) row(列) 他自己會變成表格樣式，其中是使用 flex 的佈局自動將畫面切為12等分去去做平分，我這邊新增3個row代表每一個寬度為(3/12)等分，以下我套用 css 屬性將它上顏色讓各位好分別他的欄位分佈。

```html
<div class="container">
  <div class="row">
    <div class="col"><span>1</span></div>
    <div class="col"><span>2</span></div>
    <div class="col"><span>3</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-4.png">

#### 設定 col 等分
設定 col 等分直接在後面寫上數字例如6就是(6/12)，其餘得就是分配為(3/12)等分

```html
<div class="container">
  <div class="row">
    <div class="col-6"><span>1</span></div>
    <div class="col"><span>2</span></div>
    <div class="col"><span>3</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-5.png">

#### 垂直對齊方式

- row 垂直對齊

預設的 row 是上方垂直對齊 `align-items-start` 若想在容器的底部可以改成 `align-items-end`，若若想置中則 `align-items-center`。

- 垂直置中
  - align-items-center
- 垂直置頂(預設)
  - align-items-start
- 垂直置底
  - align-items-end

```html
<div class="container">
  <div class="row align-items-end">
    <div class="col"><span>1</span></div>
    <div class="col"><span>2</span></div>
    <div class="col"><span>3</span></div>
  </div>
</div>
```
<img src="/images/posts/css/2018/img1070106-6.png">

- col 垂直對齊

其中 col 也能設定自己的對齊方式跟 row 使用方式一樣只是中間改成 `self` 就行了，下面範例是將 row 置中另外三個 row 分別對應佈局的上中下。

- 垂直置中
  - align-self-center
- 垂直置頂(預設)
  - align-self-start
- 垂直置底
  - align-self-end

```html
<div class="container">
  <div class="row align-items-center">
    <div class="col align-self-start"><span>1</span></div>
    <div class="col"><span>2</span></div>
    <div class="col align-self-end"><span>3</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-7.png">

#### 水平對齊方式

- row 水平對齊
在 row 平對齊中使用 flex 中的 justify-content 屬性來控制水平對齊方式。

- 水平置中
  - justify-content-center
- 水平靠左(預設)
  - justify-content-start
- 水平靠右
  - justify-content-end
- 水平靠左右
  - justify-content-between
- 水平左右平分置中
  - justify-content-around

```html
<div class="container">
  <div class="row justify-content-end">
    <div class="col-4"><span>1</span></div>
    <div class="col-4"><span>2</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-8.png">
<img src="/images/posts/css/2018/img1070106-9.png">
<img src="/images/posts/css/2018/img1070106-10.png">

#### 水平垂直置中

```html
  <div class="row justify-content-center align-items-center">
    <div class="col-4"><span>1</span></div>
    <div class="col-4"><span>2</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-11.png">

#### 欄位排序
使用 `order` 能設定欄位的順序，總共分為12個。

```html
<div class="container">
  <div class="row justify-content-center align-items-center">
    <div class="col order-3"><span>1</span></div>
    <div class="col order-2"><span>2</span></div>
    <div class="col order-1"><span>3</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-12.png">

#### 欄位偏移
欄位偏移使用 offset 來位移欄位，可以開啟開發者模式觀看 css style 可以發現原來 offset 是利用 `margin-left` 來做位移量。

```html
<div class="container">
  <div class="row justify-content-center align-items-center">
    <div class="col offset-2"><span>1</span></div>
    <div class="col"><span>2</span></div>
    <div class="col"><span>3</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-13.png">

#### 欄位的響應式

Bootstrap 規定了幾種不同的尺寸，小於 576px 稱為 Extra small devices 為大部分手機預覽狀態用(xs)表示，大於等於 576px 為 Small devices 用(sm)表示，大於等於 768px 為 Medium devices 用(md)表示，大於等於 992px 為 Large devices 用(lg)表示，大於等於 1200px 為 Extra large devices 用(xl)表示表示，若想將欄位在不同的螢幕尺寸做不同顯示欄位的數量可以用以下方法。

- `< 576px Extra small devices(手機直式螢幕稱)`
- `>= 576px Small devices(手機橫式螢幕)`
- `>= 768px Medium devices(平板)`
- `>= 992px Large devices(一般電腦螢幕)`
- `>= 1200px Extra large devices(大尺寸電腦螢幕)`

```html
<div class="container">
  <div class="row justify-content-center align-items-center">
    <div class="col-sm-6 col-md-3"><span>1</span></div>
    <div class="col-sm-6 col-md-3"><span>2</span></div>
    <div class="col-sm-6 col-md-3"><span>3</span></div>
    <div class="col-sm-6 col-md-3"><span>3</span></div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070106-14.gif">


> 版主10在2020年首次開設YouTube頻道，嘗試拍攝教學。喜歡的歡懇請訂閱就是最大的支持～如果想學其他什麼內容也歡迎許願XD

<a href="https://www.youtube.com/channel/UCSNPCGvMYEV-yIXAVt3FA5A">
    <img src="https://media0.giphy.com/media/KFnSuizdGVCtkVFOXM/source.gif" width="15%"></a>