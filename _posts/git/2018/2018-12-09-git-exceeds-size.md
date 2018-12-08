---
layout: post
title: '[Git筆記] exceeds GitHub's file size 解決'
categories: Git
description: exceeds GitHub's file size solution
keywords: exceeds GitHub's file size
---

## 前言
當你上傳檔案到 GitHub 時若檔案超過 102Mb GitHub 就會出現上傳失敗訊息如下：

```
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: ********
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File ******** is 102.00 MB; this exceeds GitHub's file size limit of 100.00 MB
```

這個 commit 提交紀錄會儲存著所以當你每次有更新內容， Git 還是會將上傳(push)失敗的資料補上傳，當然還是會一直顯示檔案過大錯誤，所以我們要使用過濾將過去提交紀錄中超出限制大小的檔案移除。

## 解決方法
單引號內的 `path/to/your/file` 就是要填入你當時專案中超出限制大小的檔案路徑。

```bash
git filter-branch --tree-filter 'rm -rf path/to/your/file' HEAD
git push
```
