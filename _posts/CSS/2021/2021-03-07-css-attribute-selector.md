---
layout: post
title: '[CSS學習筆記] CSS Attribute Selector 技巧'
categories: 'CSS'
description: 'CSS Attribute Selector'
keywords: CSS
---

# 前言
CSS 提供選擇器(Selector) 的方式操控每一個元素，大家可以參考[30個你必須記住的CSS選擇器](https://code.tutsplus.com/zh-hant/tutorials/the-30-css-selectors-you-must-memorize--net-16048)來了解 CSS 選擇器有些好處。其中我們今天要介紹使用 Attribute Selector 方式來控制 HTML 標籤 `[attribute ="value"]` 選擇器用於選擇具有指定屬性和值的元素。以下範例是選擇所有具有 `target ="_ blank"` 屬性的 `<a>` 元素：

```css
a[target="_blank"] {
  background-color: yellow;
}
```

我們今天就是要使用 CSS Attribute Selectors 來控制 HTML 標籤。下圖是完成結果。

![](/images/posts/css/2021/img1100307-1.gif)

## 實作
開啟你的 IDE 新建一個 `index.html` 在 `body` 標籤內自定義 `mode` 屬性名稱內容可以自己設定。這裡就提供 `maker` & `edit` 兩種模式。

```html
<body mode="maker">
    <header>
        <h4 class="mode-maker">Music Maker</h4>
        <h4 class="mode-edit">Music Maker Configuration</h4>
    </header>

    <main>
        <button class="mode-maker mdl-button" id="edit">Edit</button>
        <button class="mode-edit mdl-button mdl-js-button" id="done">Done</button>
        <p class="hint mode-edit">When complete, press Done.</p>
    </main>
</body>
```

CSS 部分很簡單，我們先將 `mode-edit` 和 `mode-maker` 隱藏起來 `display: none;`。接下來要透過 Attribute Selectors 來控制 HTML 標籤是否顯現，使用逗號方式可以共用內容當 `[mode="edit"] .mode-edit` 或 `[mode="maker"] .mode-maker` 其中一方成立，就會控制該標籤內的元素是否顯示 `display: block;` 。 `[mode="edit"] .mode-edit` 的意思就是當 body 內的 mode="edit" 時標籤 class="mode-edit" 就會被動觸發 `{}`  裡面的內容。

```css
<style>
    .mode-edit,
    .mode-maker {
        display: none;
    }

    [mode="edit"] .mode-edit,
    [mode="maker"] .mode-maker {
        display: block;
    }
</style>
```

接下我們要透過 `JavaScript` 來控制 HTML body 內的 mode，初始狀態 mode=maker，因此只會顯示 `class=mode-maker` 內容。當滑鼠點擊按鈕就會透過 JS 來修改 mode 成 `edit` 模式，並且會觸發 CSS Attribute Selector 來調動畫面。

```js
<script>
    function enableEditMode() {
        document.body.setAttribute('mode', 'edit');
    }
    function enableDoneMode() {
        document.body.setAttribute('mode', 'maker');
    }
    document.getElementById('edit').addEventListener('click', enableEditMode);
    document.getElementById('done').addEventListener('click', enableDoneMode);
</script>
```

Demo [網頁](https://1010code.github.io/css-attribute-selector/index)

 完整 Code 可以從我的 [GitHub](https://github.com/1010code/css-attribute-selector) 中取得！