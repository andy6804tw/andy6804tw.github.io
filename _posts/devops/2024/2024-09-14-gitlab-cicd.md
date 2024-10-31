---
layout: post
title: '初探GitLab CI/CD'
categories: 'DevOps'
description: 'GitLab CI/CD'
keywords: 
---

## 前言 
在軟體開發過程中，經常需要不斷進行測試和程式更新。然而，面對需求變更甚至新功能的開發，如何讓工程師能夠更專注於「coding」，並節省測試和人工部署的時間呢？因此，近年來軟體業界提出了「CI / CD」的概念，透過自動化的方式來減少開發過程中的成本，降低人工操作的負擔。本篇文章將介紹如何使用「GitLab-CI」作為自動化工具，並撰寫 GitLab-CI 腳本，在每次 Push Commit 時觸發 CI 事件，實現網頁服務的自動建置與部署。

## GitLab 簡介
GitLab 是一個整合了版本控制、CI/CD、自動化部署和專案管理的開源平台。它不僅提供 Git 儲存庫功能，還包括強大的協作工具，適合開發者和團隊進行軟體開發和交付的全流程管理。許多知名的開源專案都在 GitLab 上託管，例如 [Inkscape](https://gitlab.com/inkscape)，這是一款開源的向量圖形編輯器，支援 SVG 格式，廣泛應用於設計和插畫領域，深受設計師社群的喜愛。

![](https://miro.medium.com/v2/resize:fit:942/1*3stkQyMCIZHjDII0dUOaJw.png)

> GitLab 提供了靈活的工作流程，使開發者能夠在同一平台上進行從程式碼管理到產品交付的所有操作。


## 何謂 CI / CD？
CI（持續整合，Continuous Integration）與 CD（持續交付/持續部署，Continuous Delivery/Continuous Deployment）是現代軟體開發流程中重要的自動化概念。

- **CI（持續整合）**：指的是開發者頻繁地將程式碼變更整合到主分支中，並且每次整合後都會自動進行測試。這樣可以及時發現並解決程式碼中的問題，確保每次提交的程式碼都保持高品質並可順利運行。
- **CD 有兩種形式**：
    - **持續交付（Continuous Delivery）**：在這個過程中，經過測試和驗證的程式碼變更會被自動準備好部署，但仍需要手動確認或批准後才進行部署。
    - **持續部署（Continuous Deployment）**：相比之下，持續部署會將每個通過測試的程式碼變更自動部署到生產環境中，完全不需要手動干預。
    
    
> CI / CD 透過自動化的流程，減少人工操作的風險，縮短軟體的發布周期，讓開發團隊可以更快、更可靠地將新的功能或修正推送至使用者端。
 
 
## 常見的 CI 工具
選擇適合的 CI 工具應該根據團隊的開發環境、所使用的語言、專案規模以及對自動化流程的需求來決定。對於已經使用 GitLab 或 GitHub 進行版本控制的團隊，內建的 CI 工具（如 GitLab CI/CD、GitHub Actions）可能是最佳選擇。而對於大規模、複雜的專案，Jenkins 可能提供最靈活的擴展性。此外，如果團隊對於 CI/CD 流程的效能有高需求，CircleCI 也是值得考慮的選擇。

- **Jenkins** 是一個開源的 CI 工具，以高度擴展性著稱，支援多種語言和自動化流程，適合需要客製化的大型專案。
- **GitLab CI/CD** 與 GitLab 完美整合，內建於平台中，適合使用 GitLab 進行版本控制的團隊，支援簡單的自動化腳本撰寫。
- **GitHub Actions** 是 GitHub 提供的 CI/CD 工具，深度整合 GitHub，可自動化工作流程，適合使用 GitHub 的開發團隊。
- **CircleCI** 是雲端化的 CI/CD 工具，以高效能和易於配置著稱，適合容器化開發的團隊，支援 Docker 與 Kubernetes。
- **Travis CI** 與 GitHub 深度整合，設定簡單，適合開源專案與小型專案，提供免費計劃。


## GitLab CI/CD 流程簡介
### 持續整合 CI(下圖左側)
專案處於開發階段時，代碼被存放在 GitLab 的 Repository 中。開發人員每天推送新的程式碼，GitLab 的持續整合 CI 會自動依照設定的腳本進行建構與測試，減少錯誤發生的可能性。這種自動化流程稱為持續整合，針對每次提交或開發分支的變更，系統會自動進行建構和測試，確保新變更符合專案的測試要求。

### 持續部署 CD(下圖右側)
持續部署讓專案的部署過程自動化，不再需要手動操作，完全無需人工干預。這不僅加快了部署速度，還大幅減少了人為錯誤的發生。透過這種方式，開發團隊能更專注於編寫程式碼，提升工作效率，並確保每次更新都能順利且無縫地推送到生產環境。

![](https://pin-yi.me/git-or-cicd/gitlab-cicd/cicd.jpg)

## What is `.gitlab-ci.yml`?
`.gitlab-ci.yml` 是 GitLab CI/CD 的配置檔案，放置在專案的根目錄，用來決定 GitLab CI 的工作內容。當你每次推送專案時，GitLab 會自動讀取此檔案，並使用 GitLab Runner 來執行 pipeline。這個檔案使用 YAML 語言來定義執行的階段、規則與任務，類似 Python 的縮排代表層級關係。

### `.gitlab-ci.yml` 檔案結構

```yml
stages:
    - stage_1
    - stage_2
		
image: alpine:latest
```
- stages：定義 Pipeline 中的階段與執行順序。
- image：指定執行環境，這裡使用輕量化的 Linux 映像檔（Alpine）。

```yml
job_A:
    stage: stage_1
    script:
        - touch hello.txt
        - echo 'Hello world!' > hello.txt
    artifacts:
        paths:
            - hello.txt
```

- script：設定此 Job 的執行內容。
artifacts: 當 stage 結束時會保留的檔案，以便別的 job 取用。

```yml
job_B:
    stage: stage_1
    script:
        - exit 1
    allow_failure: true
```

- allow_failure：允許此 Job 失敗，後續階段仍會執行。

> exit 1  強制設定 job 為 failed (0 為 success)

#### 其他參數

| 參數          | 說明                                                           |
| ------------- | -------------------------------------------------------------- |
| `tags`        | 用來選擇與 GitLab 註冊的自架 Runner                            |
| `dependencies`| 設定 Job 之間的依賴關係                                         |
| `cache`       | 儲存所需套件，過去未使用 Cache 時會將其放在 `artifacts` 中       |
| `before_script`| 在每次 Job 執行前的設置，如 Docker 登入或安裝依賴              |
| `only`        | 定義 Job 只在特定分支上執行                                     |
| `except`      | 定義 Job 不會在特定分支上執行                                   |
| `retry`       | 設置當 Job 失敗時的重試次數，最多可設為 2                       |



#### Cache vs Artifacts

| Cache | Artifacts |
| ----- | --------- |
| 透過 `key` 辨識，同樣的 `key` 會被後來執行的 Job 覆蓋 | 無覆蓋問題，同樣的檔案可被多個 Job 取用 |
| 只存在同一個 Runner，不同標籤的 Job 無法共享 | 生成後，後續所有 Job 都能取用 |


## 一個完整的 `.gitlab-ci.yml` 撰寫
GitLab CI/CD 的運作原理是，在專案根目錄中新增一個名為 .gitlab-ci.yml 的文件，這是設定建構、測試和部署流程的腳本。該文件可以定義執行命令的順序、部署位置、以及是否自動或手動觸發等規則。當這個文件被放入 Repository 後，GitLab 會自動啟動 GitLab Runner 工具，依照腳本來執行指定流程。接下來，我們將介紹 .gitlab-ci.yml 文件的基本編寫方式與運行流程。

```yml
stages:
  - build
  - test
  - deploy

cache:
  paths:
    - config/

build-job:
  stage: build
  script:
    - echo "Hello, $GITLAB_USER_LOGIN!"

test-job1:
  stage: test
  script:
    - echo "This job tests something"

test-job2:
  stage: test
  before_script:
    - echo "This job tests something, but takes more time than test-job1."
  script:
    - echo "After the echo commands complete, it runs the sleep command for 20 seconds"
    - echo "which simulates a test that runs 20 seconds longer than test-job1"
    - sleep 20

deploy-prod:
  stage: deploy
  script:
    - echo "This job deploys something from the $CI_COMMIT_BRANCH branch."
```

這份 .gitlab-ci.yml 檔案定義了 CI/CD 的多個階段和工作：

- **stages**：設定了三個階段：build、test 和 deploy。這是 CI/CD 流程中的主要步驟。
- **cache**：將 config/ 路徑下的文件緩存，避免每次重新構建都重新下載或處理同一批文件，節省時間。
- **build-job**：屬於 build 階段，執行腳本會顯示訊息 `"Hello, $GITLAB_USER_LOGIN!"`，其中 `$GITLAB_USER_LOGIN` 是變數，顯示推送者的名稱。
- **test-job1**：屬於 test 階段，執行簡單的測試，顯示訊息 `"This job tests something"`。
- **test-job2**：也是 test 階段，但相較於 test-job1，增加了 before_script，執行前的設定指令，並且增加了延遲 20 秒的測試模擬。
- **deploy-prod**：屬於 deploy 階段，負責將來自特定分支的內容部署，顯示訊息 `"This job deploys something from the $CI_COMMIT_BRANCH branch."`，其中 `$CI_COMMIT_BRANCH` 代表當前分支。
- **before_script**：這部分用來執行需要在主要指令前運行的指令，通常用來進行環境設定或安裝依賴項目。
- **script**：主要指令區塊，這裡會執行實際的腳本，通常包含多行指令，依序執行。

> 在 GitLab CI/CD 的設定中，stages 和 job 名稱可以任意命名。



當我們將 .gitlab-ci.yml 文件與專案一同推送到 GitLab 後，系統會自動開始執行其中所寫的腳本，並顯示整個執行過程的詳細狀況。


## GitLab CI Runner
GitLab CI Runner 是 GitLab CI/CD 用來執行工作任務的工具。當 GitLab CI 要執行腳本時，Runner 會負責在指定的環境中執行這些指令。根據需求，GitLab 提供兩種 Runner：

- 共享 Runner (Shared Runners)：由 GitLab 提供，所有專案可共享使用，適合一般開發需求。
- 自架 Runner (Specific Runners)：由使用者自行架設，只能用於特定專案，適合需要自訂環境或資源的情境。

### 共享 Runner (Shared Runners) 
由 GitLab 提供的 Runner，適用於整個 GitLab 平台上的所有專案。這些 Runner 由 GitLab 主動管理和維護，用戶無需自行設置或配置。它們非常適合於快速上手、或小型專案，不需要專屬的執行環境。共享 Runner 可以自動調度，當有多個專案需要使用時，GitLab 會負責資源分配與執行，不過因為是共用資源，可能會有排隊等待的情況。可以在 repository Settings → CI / CD → Runners 中找到。


### 自架 Runner (Specific Runners) 
是由使用者自行設置的 GitLab Runner，專門用於特定的專案或群組。當公司自行架設 GitLab 時，除了 GitLab Server，還需要額外配置一台電腦或伺服器作為 Runner 來執行 CI/CD 任務。自架 Runner 提供了更高的靈活性，可以針對特定的硬體需求、軟體環境或資源進行最佳化設定，適合需要自訂 CI/CD 流程的企業或大型專案。這使得專案執行更具控制性和效率。

> 詳細自建 Runner 可以參考: [GitLab Runner 開始跑吧!](https://medium.com/@martin87713/cicd-gitlab-runner-%E9%96%8B%E5%A7%8B%E8%B7%91%E5%90%A7-4c26f1501a1a)
> Windows自價 Runner 可以參考 [如何使用 GitLab CI](https://medium.com/@mvpdw06/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-gitlab-ci-ebf0b68ce24b)
> 也推薦觀看高見龍系列的教學[為你自己學 GitLab CI/CD](https://ithelp.ithome.com.tw/articles/10291801)



## Reference
- [如何從頭打造專屬的 GitLab CI/CD](https://pin-yi.me/blog/git-or-cicd/gitlab-cicd/#%e6%8c%81%e7%ba%8c%e6%95%b4%e5%90%88-ci)
- [GitLab CI / CD 實踐](https://hackmd.io/@ncnu-opensource/r10ikTDFI)
- [GitLab CI系列文](https://medium.com/@wasd2030980)