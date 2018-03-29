---
layout: post
title: '[Node.js] 使用Bitbucket與CircleCI做多版本單元測試'
categories: 'DevOps'
description: 'npm管理工具介紹'
keywords: Node.js, npm
---

## 前言
先前幾篇文章介紹了如何使用 GitHub 搭配 Travis CI 做單元測試並計算程式覆蓋率把結果上傳到 Coveragealls，如下：

[[Node.js] mocha 單元測試並整合 Travis-CI](https://andy6804tw.github.io/2018/03/16/travis-ci-tutorial/)
[[Node.js] 計算程式覆蓋率並整合到 coveralls](https://andy6804tw.github.io/2018/03/24/coveralls-tutorial/)

因為 Travis CI 只提供 GitHub 的服務，所以今天就來介紹另一家連續整合的平台 [CircleCI](https://circleci.com/)CircleCI 比 Travis CI 多了 Bitbucket 和 GitLab 的服務，並且提供 Linux 與 OS X 的環境測試(OS X 需付費)，此外 Linux 僅提供一個免費容器使用。

## 教學

### 與 Bitbucket 專案連動
首先進入[CircleCI](https://circleci.com/)與你的 Bitbucket 連動，再選擇你要執行自動化測試的專案，選擇後會到另一個初始化的畫面，你必須在裡面設定系統與執行環境，我們今天所測試的專案是 Node.js 所以程式語言請選他。

<img src="/images/posts/devops/2018/img1070329-1.png">
<img src="/images/posts/devops/2018/img1070329-2.png">

## 在專案裝加入設定檔
在專案最外層建立 `.circleci` 資料夾並新增 `config.yml` 檔案(所以檔案路徑為 `.circleci/config.yml`)，之後寫入設定檔這邊是要求執行 Node.js 7、8、9 版本的容器測試，並直行單元測試 `yarn test` (必須先將測試寫好)。

```yml
workflows:
  version: 2
  node-multi-build:
    jobs:
      - node-v7
      - node-v8
      - node-v9

version: 2
jobs:
  node-base: &node-base
    docker:
      - image: node
    working_directory: ~/working_directory
    steps:
      - run:
          name: Versions
          command: |
            yarn versions
            echo "npm: $(npm --version)"
      - checkout
      - restore_cache:
          keys:
            - v{{ .Environment.CIRCLE_CACHE_VERSION }}-yarn-lock-{{ .Branch }}-{{ .Environment.CIRCLE_JOB }}-{{ checksum "yarn.lock" }}
            - v{{ .Environment.CIRCLE_CACHE_VERSION }}-yarn-lock-master-{{ .Environment.CIRCLE_JOB }}-{{ checksum "yarn.lock" }}
            - v{{ .Environment.CIRCLE_CACHE_VERSION }}-yarn-cache-{{ .Branch }}-{{ .Environment.CIRCLE_JOB }}
            - v{{ .Environment.CIRCLE_CACHE_VERSION }}-yarn-cache-master-{{ .Environment.CIRCLE_JOB }}
      - run:
          name: Install dependencies
          command: yarn install
      - run:
          name: Test
          command: yarn test
      - save_cache:
          key: v{{ .Environment.CIRCLE_CACHE_VERSION }}-yarn-lock-{{ .Branch }}-{{ .Environment.CIRCLE_JOB }}-{{ checksum "yarn.lock" }}
          paths:
            - node_modules
      - save_cache:
          key: v{{ .Environment.CIRCLE_CACHE_VERSION }}-yarn-cache-{{ .Branch }}-{{ .Environment.CIRCLE_JOB }}-{{ checksum "yarn.lock" }}
          paths:
            - /usr/local/share/.cache/yarn
            - /root/.cache/yarn
      - run:
          # Variables are not available in `path` or `paths`
          # https://discuss.circleci.com/t/can-i-use-variables-in-cache-paths/11393
          name: Check `yarn cache dir`
          command: |
            CACHE_DIR=$(yarn cache dir)
            echo "yarn cache dir: ${CACHE_DIR}"
            # v0.x or v1.x
            if [[ "$CACHE_DIR" != /usr/local/share/.cache/yarn* && "$CACHE_DIR" != /root/.cache/yarn/* ]]; then
                exit 1
            fi
  node-v7:
    <<: *node-base
    docker:
      - image: node:7
  node-v8:
    <<: *node-base
    docker:
      - image: node:8
  node-v9:
    <<: *node-base
    docker:
      - image: node:9
```

## 測試
完成設定檔後就可以試著把專案 push 到 Bitbucket 囉！上傳至 Bitbucket 後在來到 CircleCI 主控頁面可以發現它會自動地幫你跑測試，測試成功後是綠色的若失敗則為紅色。

<img src="/images/posts/devops/2018/img1070329-4.png">
<img src="/images/posts/devops/2018/img1070329-3.png">


範例程式碼：https://bitbucket.org/ab24627375/circle-ci-demo/src/9eaf15b2f1287957ec67ad88c16b91fe8bdac0e7?at=master
