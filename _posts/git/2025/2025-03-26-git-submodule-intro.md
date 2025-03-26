---
layout: post
title: 'Git Submodule 進階教學：模組化管理外部依賴'
categories: 'Git'
description: 'An advanced tutorial on using Git submodules to modularly manage external dependencies in your projects.'
keywords: 'Git submodule'
---

## Git Submodule 進階教學：模組化管理外部依賴
## 前言
Git submodule 的主要優點在於 **模組化管理外部依賴**，既保有獨立版本控制，也能在主專案中統一追蹤特定版本，提升專案維護的靈活性與穩定性。

在大型專案或需要整合多個模組的專案中，常會遇到以下情境：

- **依賴管理：** 專案可能需要引入外部的第三方工具或函式庫（例如自動化機器學習模組、共用元件等），這些元件往往有獨立的 Git 倉庫。若將所有程式碼混在一起管理，容易導致版本混亂或更新困難。
- **版本隔離：** 使用 Git submodule 可以讓主專案固定依賴外部專案的特定 commit，確保各模組版本互不干擾，避免因外部更新而影響主專案穩定性。
- **多人協作：** 在團隊合作中，子模組可以讓專案管理者和開發者分工明確，管理者可以統一整合外部依賴，而開發者則依照主專案記錄的子模組版本進行開發。

---

## 專案管理者：如何建立 Submodule

作為專案管理者，你可能需要將外部依賴整合到主專案中，以下提供具體步驟：

### 步驟 1：進入主專案資料夾

請先確保你的主專案已經初始化為 Git 倉庫，然後在終端機切換至該資料夾：

```
cd path/to/your/mainproject
```

### 步驟 2：新增子模組至指定資料夾

假設你要引入的外部專案 Git 倉庫網址為 `https://github.com/username/subproject.git`，並且希望將其放置於主專案中的 `3rdparty/subproject` 資料夾，可以使用下列指令：

```
git submodule add -b main https://github.com/username/subproject.git 3rdparty/subproject
```

- `-b main` 表示以子模組的 `main` 分支作為初始內容，但主專案仍會記錄當前 commit，後續更新則需要手動處理。
- 新增後會在主專案根目錄自動產生一個 `.gitmodules` 檔案，裡面記錄了子模組的路徑與遠端 URL。

### 步驟 3：檢查狀態並提交變更

確認新增的檔案與變更：

```
git status
```

你應該可以看到 `.gitmodules` 以及 `3rdparty/subproject` 資料夾的新增狀態。接著加入 Git 並提交：

```
git add .gitmodules 3rdparty/subproject  
git commit -m "新增子模組：3rdparty/subproject"  
git push
```

---

## 專案開發者：如何使用 Submodule

### 情境一：初次 Clone 主專案時

直接使用 `--recursive` 參數一次下載主專案與所有子模組：

```
git clone --recursive <主專案的網址>
```

這樣 Git 會自動依據主專案中記錄的子模組 commit，將各個子模組一起下載下來。

### 情境二：已經 Clone 主專案，後續更新子模組

若你已經 clone 下來但發現子模組未初始化或需要更新，可在主專案目錄中依序執行：

```
git submodule update --init --recursive
```

此外，當你拉取主專案的最新更新時，若希望連帶更新子模組，可以使用：

```
git pull --recurse-submodules
```

---

## 補充：更新子模組至遠端最新版本

如果需要將子模組更新至其遠端分支的最新 commit（非主專案記錄的 commit），可以在主專案根目錄下執行：

```
git submodule update --remote
```

更新完成後，請記得在主專案中加入子模組更新的變更，並提交：

```
git add 3rdparty/subproject  
git commit -m "更新子模組至最新 commit"  
git push
```

**補充說明：**  
或是可以先進入子模組所在的資料夾，然後執行以下指令取得子專案的最新更新：

```
cd 3rdparty/subproject  
git fetch  
git pull origin main
```

※ 若需要更新到特定 commit 或 branch，可在此處使用：

```
git checkout <commit_or_branch>
```

---

## 小結

Git submodule 提供了一個有效的方式，讓你在專案中管理外部依賴，並確保每個依賴模組都能獨立追蹤版本。

- **專案管理者：** 使用 `git submodule add` 整合外部專案，透過 `.gitmodules` 記錄依賴與路徑。
- **專案開發者：** 使用 `--recursive` 或 `submodule update` 指令，確保子模組版本與主專案保持一致，避免環境差異造成問題。

希望這篇教學能幫助你與團隊更有效率地管理專案中的外部依賴，提升協作開發的穩定性與品質。
