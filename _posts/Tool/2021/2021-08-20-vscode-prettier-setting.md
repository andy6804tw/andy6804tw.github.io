---
layout: post
title: 'VSCode Prettier 自動排版設定'
categories: 'Tool'
description: 'VSCode Prettier'
keywords:
---

## 前言
在程式開發的時候往往希望有良好的排版，開發者也看得舒服。慶幸的是 VSCode 編輯器有提供不錯的一鍵排版功能就是 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。由於筆者是撰寫 Node.js 以 JavaScript 為基底的後端語言，通常搭配 ESLint 來檢視程式風格。最近發現一鍵調整排版後出現一些破壞原先設定風格的內容，例如原本的單引號(')自動變成雙引號(")、或是物件型態的變數內容尾段都會自動補上逗號(,)。以下文章就教導各位如何關閉這些設定吧。

## Prettier 開啟單引號
開啟 VSCode 進入設定後可以看到左側有擴充套件，點擊後應該會看到 `Prettier`。或是直接利用 Ctrl(Command)+F 快速搜尋 `Single Quote`，並將兩個選項都打勾。

![](/images/posts/tool/2021/img1100820-1.png)
![](/images/posts/tool/2021/img1100820-2.png)

## Prettier 關閉句尾逗號
一樣在設定搜尋 `trailing comma` 並將設定改為 none 即可。

![](/images/posts/tool/2021/img1100820-3.png)