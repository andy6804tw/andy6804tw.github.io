---
layout: post
title: 'GitHub 提交 git push 卡住'
categories: 'Git'
description: 'git push hangs on chunked'
keywords: 
---

## 前言
在 GitHub 提交程式碼時，終端機顯示寫入成功，但是最後一直卡在了下面這裡沒有推送成功：

```
Enumerating objects: 19, done.
Counting objects: 100% (19/19), done.
Delta compression using up to 6 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (13/13), 3.94 MiB | 1.20 MiB/s, done.
Total 13 (delta 6), reused 0 (delta 0), pack-reused 0
```

若使用 `git push --verbose --progress` 上傳應該會得到以下訊息：
> POST git-receive-pack (chunked)

其主要原因是在使用https 傳輸時，如果上傳的內容大小超過了一個預設上限值時，git 會使用分塊編碼的方式將內容上傳。因為 Bug 的關係最終還是會上傳失敗。解決辦法是設置一個很大的上限值，使 git 不要對文件分塊。

```
git config --global http.postBuffer 524288000
```

[參考](https://stackoverflow.com/questions/10790232/hanging-at-post-git-receive-pack-chunked)