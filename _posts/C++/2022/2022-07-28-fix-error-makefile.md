---
layout: post
title: 'Vscode Makefile: *** missing separator 故障排除'
categories: 'C++'
description: 'How to Fix Error Makefile: *** missing separator. Stop'
keywords: Makefile
---

## 解決辦法
Makefile 文件必須要以 tab 鍵進行縮排，若 Vscode 預設是空白必須進行修改設定。開啟 Vscode 點選左下角齒輪選擇 Command Palette，輸入關鍵字 indentation 並選擇 `Convert Indentation to Tabs`。

![](/images/posts/C%2B%2B/2022/img1110728-1.png)

之後在終端機再輸入一次 make all 就能成功地被編譯了。