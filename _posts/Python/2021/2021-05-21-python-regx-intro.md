---
layout: post
title: 'Python Regular Expression 正規表達式'
categories: 'Python'
description: 'Python Regular Expression'
keywords: 
---

## 前言
正規表達式是什麼？簡單來說他可以幫你定義好格式，像是註冊表單中的信箱、手機、地址...等。也就是說在 Python 中的 RegEx 可以當作格式驗證以及字串的提取功能。

下面舉個例子:

| 字元      | 描述        | 字元                 
|----------|-------------|-------------|
Email	|[a-zA-Z0-9_]+@[a-zA-Z0-9._]+	|andy6804tw@gmail.com
URL	|https://[a-zA-Z0-9./_]+	|https://andy6804tw.github.io/

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

我這邊只列出常見使用到的表達，需要更詳細可以參考[這篇文件](https://www.w3schools.com/python/python_regex.asp)

## 範例
看了上面這麼多規則想定霧煞煞，下面就用 Python 語法帶各位逐一解析，這邊會使用到 `re.search(String)` 函示他會回傳比對結果。

#### Example 1

這個例子是判斷該字串是否為數字:
- 第一行只有 `[0-9]` 代表指檢查第一個故後面輸入字母也是會回傳 true
- 第二行各位可以發現 `[0-9]+` 多了一個 + 代表判斷串列數字是否出現一次或以上
- 第三行 `[^0-9]` 代表的是判斷該字串是否非數字
- 第四行與第三行相比較發現 `^` 擺放的位置不一樣了，放不同的地方就有不同的作用，代表的是字串`最前面`是否為數字串列，可以跟第六行相比對得正

```py
print(re.search('[0-9]', 'abc')) # 回傳 None
print(re.search('[0-9]', '123')) # 回傳 <re.Match object; span=(0, 1), match='1'>
print(re.search('[^0-9]+', '123')) # 回傳 None
print(re.search('^[0-9]+', '123')) # 回傳 <re.Match object; span=(0, 3), match='123'>
print(re.search('^[0-9]+', 'a123')) # 回傳 None
```

> .string 可以取得結果字串

#### Example 2

這個例子是判斷該字串是否為英文、數字或底線:
- 第一行比對該字串是否含有英文、數字或底線，等價於 [A-Za-z0-9_]
- 的二行可以發線 `W`變大寫，意思相反，等價於 [^A-Za-z0-9_]

```py
print(re.search('\w+', '1abc_d')) # 回傳 <re.Match object; span=(0, 1), match='1'>
print(re.search('\W+', '1abc_d')) # 回傳 None
```