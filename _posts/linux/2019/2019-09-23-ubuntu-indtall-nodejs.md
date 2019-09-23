---
layout: post
title: '[Linux系統] Ubuntu 安裝 Node.js'
categories: 'Linux'
description: 
keywords:
---

## 前言
Linux 使用者通常都會使用指令安裝所需套件 `apt` 想必應該不陌生吧？今天就要教各位如何在 Ubuntu 環境下安裝 Node.js。

### 安裝 Node.js
開啟 Terminal 輸入下方指令安裝 Node.js

```bash
sudo apt-get install -y nodejs
```

安裝完成後可以確認一下 Node.js 版本，並檢查是否成功安裝。

```bash
node -v
```

### 安裝 NPM
npm 全名為 Node Package Manager，是 Node.js 的套件（package）管理工具，npm 可以讓 Node.js 的開發者，直接利用、擴充線上的第三方套件庫（packages registry），加速軟體專案的開發。

開啟 Terminal 輸入下方指令安裝 NPM

```bash
sudo apt-get install npm
```

安裝完成後可以確認一下 NPM 版本，並檢查是否成功安裝。

```bash
npm -v
```

