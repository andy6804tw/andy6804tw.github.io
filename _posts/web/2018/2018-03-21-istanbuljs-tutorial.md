---
layout: post
title: '[Node.js] 使用 istanbuljs/nyc 計算程式覆蓋率'
categories: 'Web'
description: 
keywords:
---

## 前言
上一篇 [[Node.js] mocha 單元測試並整合 Travis-CI](https://andy6804tw.github.io/2018/03/16/travis-ci-tutorial/) 已經教你如何自動化單元測試並且整合到 Travis-CI 達到自動化測試效果，這篇就來介紹計算覆蓋率，這與單元測試試相依的，因為我們做完單元測試後可以利用覆蓋率來檢視我們的測試是不是做的很全面徹底。

## 何謂程式覆蓋率(coverage)？
單元測試不是有做就好，我們可以透過計算程式覆蓋率來得知目前專案中，有多少程式被測試過，讓開發者或是用戶能很快地得知此專案的品質。

然而在 Node.js 中計算程式覆蓋率的套件有很多，有以下這些：

- [istanbuljs](https://github.com/istanbuljs/istanbuljs)
  - [istanbuljs/nyc](https://github.com/istanbuljs/nyc)
- [jscoverage](https://github.com/fishbar/jscoverage)

前兩個是一體的許多大型專案都是使用 istanbuljs 來做覆蓋率計算，然而 istanbuljs 團隊也有開發 istanbuljs 的命令列介面(CLI/command-line interface) 名稱叫做 `nyc` 至於為啥不直接取 `istanbuljs-cli` 個人覺得這樣感覺會比較清楚，第三個今天就不討論有興趣朋友可以去玩玩看，而今天就以 `nyc` 來計算程式覆蓋率給各位看。

## 程式覆蓋率教學

### 安裝 nyc
使用 NPM 安裝 nyc 套件。

```bash
npm install nyc --save-dev
```

## 修改 package.json
這邊先假設各位都已經將單元測試內容用(mocha)寫完了，我們打開 package.json 在 `scripts` 修改 test 的執行指令。

```json
"scripts": {
    "test": "nyc mocha --timeout 1000 "
  }
```

## 測試
修改完後即可以在終端機輸入指令測試了，計算覆蓋率是搭配 mocha 的測試所計算出來的結果。

```bash
npm run test
```

<img src="/images/posts/web/2018/img1070321-1.png">


這邊來介紹 coverage 的種類，這邊就來介紹圖片裡所出現的種類：

#### 1. Line Coverage
以行數為單位，檢測每行否都有被測試程式執行到。

10/10 => Line Coverage = 100%

5/10 => Line Coverage = 50%

#### 2. Statement Coverage
比起 Line Coverage 來說 Statement Coverage 計算得更細，以下面的例子：

```js
const num=0;
if (num) { num++; } else { num--; }
```

Line Coverage = 100%

Statement Coverage = 50%

從上面結論可以得知，當一行裡面擁有多個 statement，在測試程式中只有檢測到其中一個statement 時 line coverage 就表示已完成測試，而 statement coverage 卻可以抓出其中涵蓋度不足的部分。

#### 3. Branch Coverage
Branch Coverage 又稱為 Decision Coverage 有判斷決策的概念，他又比 Branch Coverage 更嚴謹，有多嚴謹呢？

```js
const num=0;
if (num == 0 || num == 1) { 
  num++; 
  } 
else { 
  num--; 
  }
```

跟上一個相比較會發現多了邏輯運算子，對沒錯 Branch Coverage 就會判斷你是否把每個邏輯判斷都測試到，若要達到 Branch Coverage 等於 100% 時可能就要測試 num = 0 、num = 1 、num = 2 這三個了。


#### 4. Function Coverage
Function Coverage 就是以函式為單位，架設我有 10 個 function，只有 1 個被測試過，那 Function Coverage 就是 10%。


## 結論
一般做完單元測試後會在計算程式覆蓋率，此用意是為了讓使用這專案的人了解此專案是正常可運作的，並把結果上傳至 GitHub 中讓大家知道，下一篇就教各位如何使用 `coveralls` 搭配 Travis-CI 自動化的呈現程式覆蓋率。


範例程式碼：https://github.com/andy6804tw/Mocha-Chai-tutorial
