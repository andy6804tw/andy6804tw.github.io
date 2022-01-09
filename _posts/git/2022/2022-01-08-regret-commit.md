---
layout: post
title: '[Git 疑難排解] GitHub 啟用二階段密碼驗證 Token authentication 設定'
categories: 'Git'
description: 'Use token to push some codes to github'
keywords: 
---

## 前言
在進行版本控制的時候若反悔剛剛 commit 的內容，這裏有兩種解決辦法。第一種可以參考這篇[文章](https://andy6804tw.github.io/2018/12/09/git-exceeds-size/)透過 `filter-branch` 將不要的檔案透過指令從 git 專案中移除。第二種是直接將剛剛 commit 的內容從 git 中移除。本篇教學將會記錄第二種方法的操作流程。

## 使用 reset 重新 Commit
假設我新增了一個 README 檔案並提交一個新的 commit 了。我們透過 `git log` 可以查看歷史的 commit 紀錄，可以發現有兩筆。

![](/images/posts/git/2022/img1100108-1.png)

但是我反悔了想重新修改對於上圖紅框的內容，此時可以透過 `reset` 返回上一個步驟。

```sh
git reset HEAD^
```

輸入完指令後再輸入 `git log` 可以發現原本的 commit 內容就不見了。

![](/images/posts/git/2022/img1100108-2.png)


## 不小心使用 hard 模式 Reset 了某個 Commit，救得回來嗎？
切記！使用 reset 時後面加上 `--hard` 時要確保資料已經備份，因為他會強制的將上次一更動的文件直接從專案中移除！不僅 Commit 看起來不見了，檔案也消失了。筆者建議初學者沒事別用這個指令。

> git reset --hard HEAD~1  (小心使用！！！)

若真的不幸輸入該指令某些重要文件直接被移除了。其實別擔心 git 只是暫時幫你搬到其他暫存地方隱藏起來。我們可使用 reflog 指令來看一下紀錄：

```sh
git reflog
```
> git log 如果加上 -g 參數，也可以看到 Reflog。

![](/images/posts/git/2022/img1100108-3.png)

因為不小心使用 --hard 將 `README.md` 整個讓檔案消失了。這時候透過 `reflog` 可以找到你要返回的雜湊編號(紅框)。接著透過 `reset --hard` 救回不見的資料。

```sh
git reset 56f4621 --hard 
```

- [參考](https://gitbook.tw/chapters/using-git/restore-hard-reset-commit)