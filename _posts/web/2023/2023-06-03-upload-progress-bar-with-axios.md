---
layout: post
title: '使用 Axios 在網頁中實現檔案上傳進度條'
categories: 'Web'
description: 'Create an upload progress bar with Axios'
keywords: frontend
---

## 前言
本文將介紹如何使用 Axios 庫進行檔案上傳以及追蹤上傳進度。Axios 是一個流行的 JavaScript 庫，用於發送 HTTP 請求，它具有簡單易用的 API 和強大的功能。我們將透過範例程式碼來展示如何引入 Axios，建立包含檔案上傳功能的 HTML 表單，以及如何使用 onUploadProgress 來追蹤上傳進度。

### 載入 Axios
首先需要載入 Axios 的 CDN。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
```

### 建立帶有檔案上傳功能的 HTML 表單
為了進行上傳，需要建立一個表單，其中包含一個類型為 file 的 `<input>` 元素，以及一個提交表單的按鈕：

```html
<!-- 表單 -->
<form id="form">
    <input type="file" accept=".png, .jpg" id="file">
    <button type="submit">上傳檔案！</button>
</form>
```

接下來，建立進度條。這只是一個 `<progress>` 元素。可以使用標籤內的文字來顯示進度條的相關資訊：

```html
<!-- 進度條 -->
<div>
    <label for="progress-bar">0%</label>
    <progress id="progress-bar" value="0" max="100"></progress>
</div>
```

### 處理提交表單
在 JavaScript 中，可以透過 FormData 物件來處理表單提交內容。它首先獲取了表單元素和進度條 Dom，然後綁定了一個 submit 事件的監聽器。當使用者提交表單時，該事件觸發，並執行相應的處理程序。

```js
const form = document.getElementById('form');
const bar = document.getElementById('progress-bar');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData();
  const file = document.getElementById('file');
  const img = file.files[0];
  formData.append('image', img);

  // 這裡添加 POST 請求
})
```

接著可以使用 Axios 選擇圖像作為 POST 請求發送。

### 追蹤上傳進度
這段程式碼實現了檔案上傳功能，並通過追蹤上傳進度來更新使用者介面中的進度條。在檔案上傳過程中，使用者可以清楚地看到檔案上傳的進度。

```js
const form = document.getElementById('form');
const bar = document.getElementById('progress-bar');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData();
  const file = document.getElementById('file');
  const img = file.files[0];
  formData.append('image', img);

  // Axios
  const config = {
    onUploadProgress: function(progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      bar.setAttribute('value', percentCompleted);
      bar.previousElementSibling.textContent = `${percentCompleted}%`;
      if (percentCompleted === 100) {
        bar.previousElementSibling.textContent = `上傳完成！`;
      }
    }
  };

  axios.post('https://httpbin.org/post', formData, config)
    .then(res => console.log(res))
    .catch(err => console.log(err));
});
```
