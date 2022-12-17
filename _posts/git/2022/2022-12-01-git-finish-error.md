---
layout: post
title: 'Git Flow: Finish Feature 錯誤'
categories: 'Git'
description: 'git push hangs on chunked'
keywords: 
---

## 前言
在進行 git flow 流程中要結束 `feature/version2` 功能分支時出現以下錯誤訊息：

```
Fatal: The base `feature/version1` doesn't exists locally or is not a branch. Can't finish the feature branch `feature/version2`.
```

因為在新增 `feature/version2` 功能時沒有在 develop 分支下建立，不小心在 `feature/version1` 下建立功能分支。但是 `feature/version1` 提早結束合併到了 develop 自然的會移除該分支。因此導致 `feature/version2` 要結束分支時找不到原先 version1 的 Base 分支。

## 解決辦法
在專案目錄資料夾下進入 `.git` 隱藏檔 config 文件修改 `feature/version2` 分支的 Base 名稱。

```
cd .git
vim config
```

然後，找到 [gitflow "branch.feature/version2"]，修改 Base 的值。

```
[gitflow "branch.feature/version2"]
         base = develop
```

最後 `:!wq` 儲存退出，問題就解決了。