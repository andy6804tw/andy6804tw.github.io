---
layout: post
title: 'Linux 系統 vim 右鍵貼上'
categories: 'Linux'
description: 'Disable vim automatic visual mode on mouse select'
keywords: 
---

## 問題
在 vim 編輯模式中如何直接用滑鼠右鍵貼上？

## 解決辦法
首先開啟終端機輸入以下指定開啟設定檔。

```sh
vim ~/.vimrc
```

貼上以下內容，並點選 esc 輸入 `!qa` 儲存檔案。

```
set mouse-=a
```

儲存完畢後重新開啟終端機就可以成功的在 vim 中盡情的右鍵貼上囉！

[參考](https://gist.github.com/u0d7i/01f78999feff1e2a8361)