---
layout: post
title: '[Git筆記] 如何移除 remote origin'
categories: Git
description: 
keywords: git,remote,origin
---

## 前言
當你將本機端的 Git 加入到遠端的 repository 像是 GitHub ...等，若之後你又另外建立新的的 repository 或是要將它搬移至其他遠端數據庫例如 GitLab。此時要刪除原本的 remote origin 該怎麼做？

## 解決方法

1. Change the URI (URL) for a remote Git repository
第一個方法直接用指令修改 remote 遠端數據庫的位置(URL)

```bash
git remote set-url origin git://new.url.here
```

2. Delete remove origin
使用指令刪除舊有的 remote

To remove a remote:
```bash
git remote remove origin
```

To add a remote:
```bash
git remote add origin yourRemoteUrl
```
Finally
```bash
git push -u origin master
```
