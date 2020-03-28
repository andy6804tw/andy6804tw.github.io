---
layout: post
title: '[JS學習筆記] 正規表達式'
categories: 'Web'
description: 正規表達式介紹
keywords: JavaScript
---

## 正規表達式
由於最近工作寫 API 動到 Router 的 param 發現必須使用到正規表達式(Regular Expression)才能解決問題所以就來寫這篇文章啦！

正規表達式是什麼？簡單來說他可以幫你定義好格式應用範圍很廣最常見的是在註冊頁面要判斷使用者是否認真乖乖的填入 E-mail 這時候就要有判斷式來檢查囉～

下面舉個例子:

| 字元      | 描述        | 字元                 
|----------|-------------|-------------|
Email	|[a-zA-Z0-9_]+@[a-zA-Z0-9._]+	|ccc@kmit.edu.tw
URL	|http://[a-zA-Z0-9./_]+	|http://ccc.kmit.edu.tw/mybook/

## 表達式一覽

| 字元           | 描述                   
|---------------|------------------|
   ^	     |比對字串開頭 (開始位置)。
   $	     |比對字串結尾 (結束位置)。
   *	     |零次或以上
   +	     |一次或以上
  [xyz]	   |包含 xyz 等字元。
  [^xyz]   |不包含 xyz 等字元。
  [a-z]	   |字元範圍 a-z。
  [^a-z]	 |不包含字元範圍 a-z。
  \d	     |比對數字符號。等價於 [0-9]。
  \D	     |比對非數字符號。等價於 [^0-9]。
  \w	     |比對「英文、數字或底線」。等價於 [A-Za-z0-9_]。
  \W	     |比對非「英文、數字或底線」的字元。等價於 [^A-Za-z0-9_]。
  `x|y`    |比對 x 或 y。

我這邊只列出常見使用到的表達，需要更詳細可以參考[這篇文件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)


## 範例
看了上面這麼多規則想定霧煞煞，下面就用js語法帶各位逐一解析，這邊會使用到 `.test(String)` 函示他會回傳true當字串符合正規表達時，反之。

#### Example 1

這個例子是判斷該字串是否為數字:
- 第一行只有 `[0-9]` 代表指檢查第一個故後面輸入字母也是會回傳 true
- 第二行各位可以發現 `[0-9]+` 多了一個 + 代表判斷串列數字是否出現一次或以上
- 第三行 `[^0-9]` 代表的是判斷該字串是否非數字
- 第四行與第三行相比較發現 `^` 擺放的位置不一樣了，放不同的地方就有不同的作用，代表的是字串`最前面`是否為數字串列，可以跟第六行相比對得正

```js
console.log(/[0-9]/.test('1abc')) // 回傳 true
console.log(/[0-9]+/.test('123')) // 回傳 true
console.log(/[^0-9]+/.test('123')) // 回傳 false
console.log(/^[0-9]+/.test('123')) // 回傳 true
console.log(/^[0-9]+/.test('a123')) // 回傳 false 
```
當然上述的 `[0-9]` 可以替換成 `\d` 與 `[＾0-9]`替換成 `\D`

#### Example 2

這個例子是判斷該字串是否為英文、數字或底線:
- 第一行比對該字串是否含有英文、數字或底線，等價於 [A-Za-z0-9_]
- 的二行可以發線 `W`變大寫，意思相反，等價於 [^A-Za-z0-9_]

```js
console.log(/\w/.test('1abc_d')) // 回傳 true
console.log(/\W/.test('1abc_d')) // 回傳 false
```

#### Example 3

這個例子是判斷段該字串是否有出現的字母:
- 第一行檢查該字串是否包含 j 或 a 或 v 或 a
- 第二行是檢查該字串第一個字是否包含 j 或 a 或 v 或 a，及第二個字是否包含數字(記住此組合是連續的故b2不符合)
- 第三行就是解決第二行例子故中間加一個 `.` ，這個帶俵可以讓中間有一個字母隨意
- 第四行與五可做相對應主要是允許中間有多個隨意字母輸入，第三行緊只能一個字母

```js
console.log(/[java]/.test('jack')) // 回傳 true
console.log(/[java]\d/.test('jb2')) // 回傳 false
console.log(/[java].\d/.test('jb2')) // 回傳 true
console.log(/[java].\d/.test('jbbb2')) // 回傳 false
console.log(/[java].+\d/.test('jbbb2')) // 回傳 true
```

#### Example 4

這個例子是 or 比對判斷，提供兩個正規表示其中一個成立即可:
- 第一行都沒有數字或字母故回傳 false
- 第二與第三行分別個出現數字和字母故回傳 true

```js
console.log(/[0-9]|[a-z]/.test('?')) // 回傳 false
console.log(/[0-9]|[a-z]/.test('?100')) // 回傳 true
console.log(/[0-9]|[a-z]/.test('?abc')) // 回傳 true
```
