---
layout: post
title: '[Mac系統] command not found: conda 解決方式'
categories: 'Mac'
description:
keywords: 
---

## 前言
安裝 Anaconda 後在終端機下指令若出現 `zsh: command not found: conda` 的錯誤訊息代表你電所的終端機的環境變數並未設定，因此無法調用  Anaconda 和 Python 所提供的指令。

## 解決方式
以我的電腦為例我是安裝 Mac 的 zsh 所以他會將環境變數寫在 `.zshrc` 檔案中。他的位置在 `~/.zshrc` 你可以用 `vim` 開啟他，指令如下。

```bash
vim ~/.zshrc
```

![](/images/posts/mac/2019/img1080925-1.png)

vim 就是一個文字編輯器，我們必須在 `.zshrc` 中引入 anaconda3 的路徑，使用方向鍵將游標移動到空白處按下 `a` 插入，接著將下面路徑貼上(照片紅框處)。最後按下 `esc` 並輸入 `:wq` 存檔離開。

```bash
export PATH="/anaconda3/bin":$PATH
```
![](/images/posts/mac/2019/img1080925-2.png)

一切完成後重新開啟終端機並測試呼叫 Anaconda 和 Python 指令，若出現版本號代表環境變數引入成功囉！ 

![](/images/posts/mac/2019/img1080925-3.png)


