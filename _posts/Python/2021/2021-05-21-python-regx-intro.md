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
看了上面這麼多規則想定霧煞煞，下面就用 Python 語法帶各位逐一解析，這邊會使用到 `re.search(String)` 函示他會回傳比對結果。在 Python 語言中記得要引入 re 的內建函式庫。

```py
import re
```

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

#### Example 3

這個例子是判斷段該字串是否有出現的字母:
- 第一行檢查該字串是否包含 p 或 v 或 t 或 h 或 o 或 n
- 第二行是檢查該字串第一個字是否包含 p 或 v 或 t 或 h 或 o 或 n，及第二個字是否包含數字(記住此組合是連續的故b2不符合)
- 第三行就是解決第二行例子故中間加一個 `.` ，這個帶俵可以讓中間有一個字母隨意
- 第四行與五可做相對應主要是允許中間有多個隨意字母輸入，第三行緊只能一個字母

```py
print(re.search('[python]', 'pca')) # 回傳 <re.Match object; span=(0, 1), match='p'>
print(re.search('[python]\d', 'pb2')) # 回傳 None
print(re.search('[python].\d', 'pb2')) # 回傳 <re.Match object; span=(0, 3), match='pb2'>
print(re.search('[python].\d', 'pbbb2')) # 回傳 None
print(re.search('[python].+\d', 'pbbb2')) # 回傳 <re.Match object; span=(0, 5), match='pbbb2'>
```

#### Example 4

這個例子是 or 比對判斷，提供兩個正規表示其中一個成立即可:
- 第一行都沒有數字或字母故回傳 false
- 第二與第三行分別個出現數字和字母故回傳 true

```py
print(re.search('[0-9]|[a-z]', '?')) # 回傳 None
print(re.search('[0-9]|[a-z]', '?100')) # 回傳 <re.Match object; span=(1, 2), match='1'>
print(re.search('[0-9]|[a-z]', '?abc')) # 回傳 <re.Match object; span=(1, 2), match='a'>
```

#### Example 5 
最後一個範例我們要將一個字串中的所有常數提取出來。

```py
# 方法一
print(re.findall('[-\d]+', '12and-3or456'))
```

```py
# 方法二
print(re.findall('[^a-z]+', '12and-3or456'))
```

```py
# 方法三
replaced_string = re.sub(r'[a-zA-Z]', ' ', '12and-3or456')
replaced_string.split()
```

```py
# 輸出結果
['12', '-3', '456']
```