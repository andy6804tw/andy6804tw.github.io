---
layout: post
title: '[Docker] 在 DockerHub 上分享自己的 image'
categories: 'DevOps'
description: 
keywords:
---

## 前言
[Docker Hub](https://hub.docker.com/explore/) 是官方提供的 Docker Registry，也就是說我們開發者可以將我們自己製作的 docker image 上傳到平台和大家分享，跟 NPM Registry 的概念差不多。


## 教學
在開始時做之前尚未註冊 [Docker Hub](https://hub.docker.com/explore/)  的讀者可以先去註冊，在此平台中免費只提供一個私有專案，若還需要的的就必須付費。

### Build Image(製作映像檔)
我們使用 `docker-node-demo` 當作範例來製作 Image，若對 Dockerfile 還很陌生的讀者可以先來參考這篇文章。

在專案目錄下跑 `docker build -t User_Name/專案名稱 .` (注意後面有`.`)就會根據 Dockerfile build 出你自己的 image，因為要上傳到 Docker Hub，所以在 build 時要加上自己的帳號名稱。

```bash
docker build -t User_Name/專案名稱 .
```

build 完後你可以使用 `docker image` 來檢查電腦中所有的 images

```bash
docker image
```

```
REPOSITORY                    TAG                 IMAGE ID            CREATED              SIZE
andy6804tw/docker-node-demo   latest              07c96b7cc073        About a minute ago   676MB
node                          latest              814364d36f69        23 hours ago         673MB
```

### 上傳 Image 至 Docker Hub
首先要登入你的 Docker Hub 在終端機鍵入 `docker login` 輸入你的帳號與密碼。

```bash
docker login
```

登入成功後就能將 Image push 至 Docker Hub 了～

```bash
docker push User_Name/專案名稱
```

## Automated Build 設定
如果覺得要每次手動 build image 並自己上傳到 Docker Hub 很麻煩的話，官方有提供 Automated Build 的功能，能夠與 GitHub 或 BitBucket 連動專案並偵測若有新的提交(push) Docker Hub 就會自動幫你 build image 並且發布。
