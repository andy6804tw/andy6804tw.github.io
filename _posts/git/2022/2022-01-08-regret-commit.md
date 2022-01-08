---
layout: post
title: '[Git 疑難排解] GitHub 啟用二階段密碼驗證 Token authentication 設定'
categories: 'Git'
description: 'Use token to push some codes to github'
keywords: 
---

## 前言
在進行版本控制的時候若反悔剛剛 commit 的內容，這裏有兩種解決辦法。第一種可以參考這篇[文章](https://andy6804tw.github.io/2018/12/09/git-exceeds-size/)透過 `filter-branch` 將不要的檔案透過指令從 git 專案中移除。第二種是直接將剛剛 commit 的內容從 git 中移除。本篇教學將會記錄第二種方法的操作流程。

## 
假設我剛剛新增了一個  README 檔案並 commit 了。透過 `git log` 可以查看歷史的 commit 紀錄，可以發現有兩筆。

![](/images/posts/git/2022/img1100108-1.png)

但是我反悔了想重新來過，此時可以透過 `reset` 返回上一個步驟。

```sh
git reset HEAD^
```

![](/images/posts/git/2022/img1100108-2.png)