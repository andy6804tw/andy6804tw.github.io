---
layout: post
title: '使用 GitLab CI/CD 自動編譯、測試及發布 C++ 專案的完整流程'
categories: 'DevOps'
description: 'GitLab CI/CD'
keywords: 
---

## 前言
在軟體開發流程中，利用 GitLab CI/CD 的自動化 Pipeline，可以大幅提高編譯與發布的效率。本篇文章將介紹如何針對 C++ 專案設置 `.gitlab-ci.yml` 文件，以實現多平台自動化編譯與發布。我們將展示五種情境，包含：

1. **在 x86_64 平台編譯 C++**：生成適用於 Intel 架構的 Linux 可執行檔。
2. **跨平台編譯 Aarch64 C++**：在 x86_64 平台生成適用於 ARM 架構的 Linux 可執行檔。
3. **跨平台編譯 MinGW C++**：在 x86_64 平台生成 Windows 可執行檔，並透過 Wine 在 Linux 上運行進行單元測試。
4. **在 Aarch64 平台編譯並打包 C++ 專案**：適用於 ARM 架構的 Linux 環境。


> 第一次接觸 GitLab CI/CD 的讀者可以先閱讀 [初探GitLab CI/CD](https://andy6804tw.github.io/2024/09/14/gitlab-cicd/)，了解基礎的 .yml 語法與流程。

## 前置作業：範例專案介紹
此[範例專案](https://gitlab.com/1010code/cpp-cross-compile)為一個以 C++ 撰寫的簡單程式，包含主程式 (main) 和單元測試架構。專案目錄結構如截圖所示，其中包含：

- **src 資料夾**：儲存主程式碼。
- **test 資料夾**：包含使用 Google Test 撰寫的單元測試程式。
- **CMakeLists.txt**：CMake 配置文件，用於編譯專案。

這個範例還包含兩個跨平台編譯設定檔案：
- `toolchain-aarch64.cmake`：用於 ARM 架構的交叉編譯配置，使專案能夠在 x86_64 平台上編譯出適用於 Aarch64 的可執行檔。
- `toolchain-mingw64.cmake`：用於 Windows 平台的交叉編譯配置，利用 MinGW 生成 Windows 可執行檔，即使在非 Windows 環境下也能進行編譯。

此專案設計適合以 GitLab CI/CD 建構和測試 C++ 應用程式，並在 test 階段運行 Google Test。

## 在 x86_64 平台編譯 C++ 並生成 Artifacts
由於 GitLab 的預設 Runner 為 Ubuntu x86_64 (AMD64) 架構，因此可以直接使用 `gcc` Docker 映像進行編譯，簡化了環境配置。要在 GitLab CI/CD 上進行編譯，只需在專案根目錄新增 `.gitlab-ci.yml` 文件，即可自動執行 C++ 編譯流程，並透過 Artifacts 保留編譯結果，以便於後續測試和發布。


```yml
image: gcc  # 使用 gcc 的官方 Docker 映像
before_script:
  - apt-get update --yes
  - apt-get install --yes cmake  # 安裝 CMake 作為構建工具

stages:
  - build
  - test

build:
  stage: build
  script:
    - ls
    - mkdir build
    - cd build
    - cmake ..  # 配置構建
    - make      # 編譯專案
  artifacts:
    paths:
      - build  # 保留編譯生成的 artifacts

test:
  stage: test
  dependencies:
    - build  # 指定依賴 build 階段的輸出
  script:
    - ls
    - cd build/test
    - ./unit_test  # 執行單元測試
```

檔案建立完成後即可透過 `git push` 到遠端 GitLab，此時就會自動觸發 GitLab CI/CD。這個範例設定包含兩個階段（`stages`）：`build` 和 `test`，我們可以從 GitLab 的 [Pipelines](https://gitlab.com/1010code/cpp-cross-compile/-/pipelines/1521270961) 觀察運行階段。

```sh
git add .
git commit -m 'commit project'
git push
```

![](/images/posts/devops/2024/img1131031-1.png)

**配置說明**

1. **build 階段**：首先使用 `gcc` 的 Docker 映像，並在 `before_script` 中安裝 CMake 作為構建工具。`build` 階段的主要任務是編譯專案程式碼和 Google Test。編譯完成後，生成的文件會被保存在 `artifacts` 中，供後續使用。

2. **test 階段**：`test` 階段依賴於 `build` 階段的輸出，並會進入 `build/test` 資料夾執行 `unit_test`。這一步主要用於運行 Google Test 進行單元測試，以驗證程式的正確性。

進入 [test job](https://gitlab.com/1010code/cpp-cross-compile/-/jobs/8235317938) 即可觀察自動化運行 Google test 單元測試結果。

![](/images/posts/devops/2024/img1131031-2.png)


從 GitLab 的 Jobs 頁面可以查看運行結果的[結果](https://gitlab.com/1010code/cpp-cross-compile/-/jobs/8235317937)，包括編譯和測試的輸出訊息。此外，右側顯示了 Job 生成的最新 artifacts，並提供 Download 和 Browse 選項，方便檢視和下載相關檔案。

![](/images/posts/devops/2024/img1131031-3.png)


在 GitLab CI/CD 中，Artifacts 是在 pipeline 中生成並保存的檔案或資料夾，例如編譯後的二進制檔案、日誌或測試報告。Artifacts 可以在 build 階段中設定，並供後續階段（如 test 或 deploy）使用，確保每個階段都能取得前一階段的輸出結果。Artifacts 功能非常適合保存關鍵檔案，使整個 CI/CD 流程更具連貫性並易於追蹤。

## 在 x86_64 平台生成適用於 ARM 架構的 Linux 可執行檔
為了在官方的 GitLab Runner 編譯 ARM 可執行檔，我們將使用 AArch64 交叉編譯工具。由於 GitLab 的 Runner 運行於 Ubuntu x86_64 環境，因此我們無法直接運行編譯後的 ARM 架構程式，因此此設定跳過了運行 test 階段(因為不同架構的GPU不能運行)。

```yml
stages:
  - build

# 使用 AArch64 交叉編譯工具進行編譯
build_aarch64:
  stage: build
  image: gcc:latest  # 使用 gcc 最新版 Docker 映像
  script:
    - apt-get update --yes
    - apt-get install --yes cmake gcc-aarch64-linux-gnu g++-aarch64-linux-gnu
    - mkdir build
    - cd build
    - cmake -DCMAKE_TOOLCHAIN_FILE=../toolchain-aarch64.cmake ..
    - make
  artifacts:
    paths:
      - build/  # 保存編譯生成的文件
```

這樣配置可以在 x86_64 環境中生成適用於 ARM 平台的可執行檔，並保存在 artifacts 中供日後使用。

## 在 MinGW 平台生成適用於 ARM 架構的 Linux 可執行檔
此範例使用 MinGW 編譯工具生成適用於 Windows 的執行檔，並透過 GitLab CI/CD 配置兩個階段：build 和 test。

```yml
stages:
  - build
  - test

# 使用 MinGW 編譯，針對 Windows 平台
build_mingw:
  stage: build
  image: gcc:latest  # 使用 gcc 的官方 Docker 映像
  script:
    - apt-get update --yes
    - apt-get install --yes cmake  # 安裝 CMake 作為構建工具
    - apt-get install -y mingw-w64  # 安裝 MinGW 用於編譯 Windows 可執行檔
    - mkdir build
    - cd build
    - cmake -DCMAKE_TOOLCHAIN_FILE=../toolchain-mingw64.cmake ..  # 指定工具鏈文件進行交叉編譯
    - make  # 編譯專案
  artifacts:
    paths:
      - build/  # 保存編譯生成的檔案

# 測試 MinGW 編譯的結果
test_mingw:
  stage: test
  image: gcc:latest
  dependencies:
    - build_mingw  # 指定依賴 build_mingw 階段的 artifacts
  before_script:
    - dpkg --add-architecture i386  # 增加 i386 架構支援
    - apt-get update && apt-get install -y --no-install-recommends mingw-w64 wine wine32 wine64 xvfb  # 安裝 Wine 及所需依賴
    - wine --version  # 確認 wine 安裝成功
    - Xvfb :0 -screen 0 1024x768x16 &  # 啟動虛擬顯示器
    - jid=$!
    - WINEARCH=win64 WINEPREFIX=~/.wine winecfg  # 設定 Wine 執行環境
    - export WINEPATH="/usr/x86_64-w64-mingw32/lib;/usr/lib/gcc/x86_64-w64-mingw32/12-posix"  # 設定 Windows 路徑
  script:
    - cd build/test/
    - wine unit_test.exe  # 使用 Wine 運行 Windows 可執行檔進行測試
  artifacts:
    paths:
      - build/test/  # 保存測試結果
```

**配置說明**

- **build_mingw 階段**：使用 MinGW 編譯工具生成適用於 Windows 的可執行檔案，並將生成的 build 資料夾作為 artifacts 保留。
- **test_mingw 階段**：在 Linux 系統中使用 Wine 運行 Windows 可執行檔 (unit_test.exe) 進行測試。

![](/images/posts/devops/2024/img1131031-4.png)

由於作業系統不同，無法直接運行 Windows 檔案，但藉由 Wine 可以在 Linux 環境下模擬 Windows 執行環境來完成測試。

> 詳細的設定與運行方法，請參考另一篇「[Linux 使用 Wine 執行 MinGW 編譯的 C++ .exe 檔案](https://andy6804tw.github.io/2024/08/31/wine-mingw-linux-cpp/)」，以獲得更多技術細節。

這個設定使用 MinGW 交叉編譯工具，在非 Windows 環境下生成 Windows 可執行檔（.exe）。雖然編譯的程式適用於 Windows 平台，但無法直接在 Linux 上運行。我們可以利用 Wine 在 Linux 環境中模擬 Windows，執行生成的 .exe 檔案。一樣可以從 Jobs 頁面中找到 test_mingw 的[運行結果](https://gitlab.com/1010code/cpp-cross-compile/-/jobs/8235914311)。

![](/images/posts/devops/2024/img1131031-5.png)

## 在 Aarch64 平台編譯並發布 C++ 專案版本
在前述範例中，我們已展示了如何使用 GitLab CI/CD 編譯並執行測試。接下來，我們將介紹如何在編譯完成後將檔案上傳至 GitLab 並發布新版本。本範例會編譯 Aarch64 平台的 C++ 專案，並透過打包的 artifacts.zip 作為發布的資產，使用 GitLab 的 release-cli 工具自動創建版本標籤 (git tag) 並發布到 GitLab 頁面上。

```yml
stages:
  - build
  - package
  - release

# 編譯 Aarch64 平台的可執行檔
build_aarch64:
  stage: build
  image: gcc
  before_script:
    - apt-get update -y
    - apt-get install -y cmake gcc-aarch64-linux-gnu g++-aarch64-linux-gnu zip  # 安裝所需工具和依賴
  script:
    - mkdir build
    - cd build
    - cmake .. -DCMAKE_TOOLCHAIN_FILE=../toolchain-aarch64.cmake  # 指定 Aarch64 工具鏈
    - make  # 編譯專案
    - zip -r artifacts.zip bin  # 將編譯結果壓縮成 zip
  artifacts:
    paths:
      - build/  # 保存編譯產物

# 上傳打包好的檔案
upload_package:
  stage: package
  image: curlimages/curl:latest
  needs:
    - job: build_aarch64
      artifacts: true  # 需要使用 build_aarch64 階段的 artifacts
  rules:
    - if: $CI_COMMIT_TAG  # 僅在建立標籤時運行
  script:
    - 'curl --header "JOB-TOKEN: $CI_JOB_TOKEN" --upload-file build/artifacts.zip "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/myapp/${CI_COMMIT_TAG}/artifacts-${CI_COMMIT_TAG}.zip"'  # 上傳檔案至 GitLab Packages
    - echo "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/myapp/${CI_COMMIT_TAG}/artifacts-${CI_COMMIT_TAG}.zip"  # 顯示上傳的 URL

# 發布新版本
release_aarch64:
  stage: release
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  needs:
    - job: upload_package  # 依賴 upload_package 階段
  rules:
    - if: $CI_COMMIT_TAG  # 僅在有 Git 標籤時運行
  script:
    - echo "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/myapp/${CI_COMMIT_TAG}/artifacts-${CI_COMMIT_TAG}.zip"  # 顯示發布的 URL
  release:
    name: "Release $CI_COMMIT_TAG"  # 設定版本名稱
    tag_name: '$CI_COMMIT_TAG'  # 使用 Git 標籤作為版本標籤
    description: "Release created using the release-cli. Release $CI_COMMIT_TAG"  # 發布描述
    assets:
      links:
        - name: "artifacts-${CI_COMMIT_TAG}.zip"
          url: "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/myapp/${CI_COMMIT_TAG}/artifacts-${CI_COMMIT_TAG}.zip"  # 提供下載連結
```

> - 此方法參考來源： [Add a specific file of a project into the release GitLab](https://forum.gitlab.com/t/add-a-specific-file-of-a-project-into-the-release-gitlab/82124)
> - 另外其他方法可以[參考](https://gitlab.com/1010code/cpp-cross-compile/-/blob/main/CICD-config/gitlab-ci(art%E7%89%88%E6%9C%AC).yml?ref_type=heads) artifacts 發布方式。

![](/images/posts/devops/2024/img1131031-7.png)

**配置說明**
- **build_aarch64 階段**：使用 Aarch64 工具鏈進行編譯，將生成的執行檔壓縮為 `artifacts.zip`，並作為 artifacts 保存。
- **upload_package 階段**：在建立 Git 標籤時，將編譯產物上傳至 GitLab Packages，生成下載連結，方便後續存取。
- **release_aarch64 階段**：使用 `release-cli` 在 GitLab 上創建版本發布，並附上上傳的 artifacts 下載連結，使使用者能夠直接取得編譯後的可執行檔案。

設定完成後，當專案開發完成並準備發布新版本時，可以透過 Git 創建並發布一個新的標籤（tag）。這樣做會觸發 GitLab CI/CD pipeline 進行自動化的編譯、打包和發布流程。假設目前想發布 `v1.0.0` 版本。

```sh
# 創建一個標籤
git tag v1.0.0
# 推送標籤到遠端
git push origin v1.0.0
```

上傳成功後，至 GitLab 專案頁面即可看到剛剛發佈的標籤。

![](/images/posts/devops/2024/img1131031-6.png)

若需要撤回已發布的標籤，可以執行以下指令：

```sh
# 刪除本地的標籤
git tag -d v1.0.0
# 刪除遠端的標籤
git push origin --delete v1.0.0
```


設定完成後，當在 GitLab 中創建新的 Git 標籤時，GitLab CI/CD 會自動執行構建流程，並將打包結果附加到 [Package registry
](https://gitlab.com/1010code/cpp-cross-compile/-/packages)上，提供下載鏈接。這樣的設定方便使用者在 GitLab 的 Release 頁面直接下載已構建好的文件，提升發布流程的便利性並讓使用者更容易取得最新版本。

![](/images/posts/devops/2024/img1131031-8.png)
![](/images/posts/devops/2024/img1131031-9.png)

在 GitLab 的 [Release 頁面](https://gitlab.com/1010code/cpp-cross-compile/-/releases)，可以看到 CI/CD Pipeline 根據設置的三個階段，其中 `release_aarch64` Job 根據指令自動發布版本。此 Job 會依照創建的 Git 標籤發布相應的版本號，並將打包好的 artifacts 文件（如 `artifacts-v1.0.2.zip`）作為附件提供，方便使用者下載最新的編譯成果。

![](/images/posts/devops/2024/img1131031-10.png)

## 小結
本篇文章介紹如何利用 GitLab CI/CD 自動化 C++ 專案的編譯、測試和版本發布過程。我們逐步展示在不同平台（如 x86_64、ARM 和 MinGW）上的編譯配置，並說明如何使用 GitLab 的 release_aarch64 階段自動發布版本。此流程使專案版本管理和發布更為高效、便捷，也使最終使用者可以輕鬆下載最新的編譯成果。


範例程式可以從[GitLab](https://gitlab.com/1010code/cpp-cross-compile)中取得！

## Reference
- [Add a specific file of a project into the release GitLab](https://forum.gitlab.com/t/add-a-specific-file-of-a-project-into-the-release-gitlab/82124)
- [How do I add the GitLab project’s artifacts to the release section?](https://forum.gitlab.com/t/how-do-i-add-the-gitlab-projects-artifacts-to-the-release-section/94853/5)