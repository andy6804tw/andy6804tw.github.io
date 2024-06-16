---
layout: post
title: '如何在網頁內嵌 Google 翻譯並客製化下拉選單'
categories: 'Web'
description: 'google translate'
keywords: 'google translate'
---

## 前言
Google 翻譯提供了一個方便的嵌入式翻譯小工具，但其預設的下拉選單樣式可能不符合您的網站設計。本文將教您如何使用 Google 翻譯功能並客製化下拉選單，使其符合您的網站風格。

### 前置作業
本範例將使用  Bootstrap5 和 FontAwesome 來幫助設計。

#### 在頁頭中嵌入 CSS
在 HTML 頁頭部分加入以下 CSS 及 JavaScript 引用：

```css
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
    integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
```

#### 在頁尾中嵌入 Google 翻譯用的 JavaScript
在頁面底部加載 Google 翻譯的 JavaScript 腳本。這個腳本會自動初始化翻譯小工具。

```js
<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
```

### 準備 HTML 結構
建立自定義的語言選擇下拉選單。我們將使用 Bootstrap 的下拉選單來創建一個自定義的語言選擇介面。當用戶選擇語言時，我們會更新 Google 翻譯小工具的語言。

```html
<section class="d-flex justify-content-center">
    <!-- 更換語言 -->
    <div class="language dropdown mx-3">
        <div class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-language fa-lg"></i>
            <span class="notranslate" id="current-language">繁體中文</span>
        </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item notranslate" data-value="zh-TW" href="#">繁體中文</a></li>
            <li><a class="dropdown-item notranslate" data-value="zh-CN" href="#">简体中文</a></li>
            <li><a class="dropdown-item notranslate" data-value="en" href="#">English</a></li>
            <li><a class="dropdown-item notranslate" data-value="ja" href="#">日本語</a></li>
            <li><a class="dropdown-item notranslate" data-value="ko" href="#">한국어</a></li>
        </ul>
    </div>
</section>
```

由於我們需要自定義語言選單，因此需要隱藏 Google 翻譯預設的下拉選單。

```html
<!-- 隱藏的 Google 翻譯元素 -->
<div id="google_translate_element" style="display: none">
```

### 初始化 Google 翻譯元素
創建一個 googleTranslateElementInit 函數來初始化 Google 翻譯元素，並設置我們想要的語言。

- pageLanguage: 是網頁的原始預設語言。
- includedLanguages: 是可以讓使用者選擇要翻譯的語言。

```js
// 初始化 Google 翻譯元素
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: "zh-TW",
        autoDisplay: false,
        includedLanguages: "zh-TW,zh-CN,en,ja,ko",
        layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
    }, "google_translate_element");
}
```

如何知道這些語言的編碼參數，像是en,ja去哪找?我們可以進到[Google翻譯網頁](https://translate.google.com/?hl=zh-TW&tab=TT)。並選擇要翻譯的語言，接著瀏覽器的網址列屆會立即出現翻譯的代碼。

![](https://cc.nchu.edu.tw/var/file/0/1000/img/1/Google001.png)

接著使用 JavaScript 為每個下拉選單項目添加點擊事件監聽器，當用戶選擇語言時更新 Google 翻譯下拉選單的值並觸發變更事件。

```js
// 取得所有下拉選單項目
const dropdownItems = document.querySelectorAll('.dropdown-item');
// 取得顯示當前語言的 span 元素
const currentLanguage = document.getElementById('current-language');

// 為每個下拉選單項目添加點擊事件監聽器
dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        // 取得翻譯語言編號
        const selectedLanguageValue = this.getAttribute('data-value');
        // 取得被點擊項目的文字
        const selectedLanguage = this.textContent;
        // 更新顯示當前語言的文字
        currentLanguage.textContent = selectedLanguage;

        // 更新 Google 翻譯下拉選單的值並觸發變更事件
        const translateCombo = document.querySelector('.goog-te-combo');
        translateCombo.value = selectedLanguageValue;
        // 觸發change事件
        const event = new Event("change");
        translateCombo.dispatchEvent(event);

    });
});
```

> 完整程式碼可以從 [GitHub](https://github.com/1010code/google-translate-flag-dropdown) 取得


## Reference
- [google-translate-flag-dropdown](https://github.com/hc0503/google-translate-flag-dropdown)
- [medium Google Translate翻譯套件實作](https://medium.com/@logichom/google-translate%E7%BF%BB%E8%AD%AF%E5%A5%97%E4%BB%B6%E5%AF%A6%E4%BD%9C-48feb3d8ab88)
- [w3schools howto_google_translate](https://www.w3schools.com/howto/howto_google_translate.asp)

