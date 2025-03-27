---
layout: post
title: '打包 Conda 環境：conda env export 與 conda pack 教學'
categories: 'Python'
description: 'A comprehensive guide to packaging Conda environments using conda env export and conda pack, ensuring reproducibility and portability for both online and offline deployments.'
keywords: 'conda, conda env export, conda pack'
---

## 打包 Conda 環境：conda env export 與 conda pack 教學

在開發或部署專案時，環境的遷移與重現性非常重要。有時候我們需要將已建立好的 conda 環境移植到另一台電腦，或在沒有網路的環境下還原環境。本文將介紹兩種常用的方法：

- **conda env export**：適用於有網路環境下，透過匯出 YAML 檔案來描述環境，再在目標機器上根據此檔案重建環境。
- **conda pack**：適用於沒有網路的環境下，將整個 conda 環境打包成壓縮檔，方便離線遷移與備份。

---

## 方法一: conda env export

### 概述
`conda env export` 指令可以將當前環境中的所有套件（包括其版本與來源 channel）匯出成一個 YAML 格式的檔案。這份檔案描述了環境的完整配置，可在目標機器上使用 `conda env create` 指令來還原環境。

### 使用方法
首先確保終端機已經進入要備份的 conda 虛擬環境中。

- **匯出環境**

  ```  
  conda env export > environment.yml  
  ```

  此命令會產生一個 `environment.yml` 檔案，其中包含所有套件、版本與 channel 資訊。

- **還原環境**

  在目標機器上，只要有網路連線，透過下列指令即可根據 YAML 檔案建立環境：

  ```  
  conda env create -f environment.yml  
  ```

  我們也可以在執行指令時指定新的環境名稱。舉例來說，可以使用：

  ```
  conda env create -n myenv -f environment.yml
  ```

### 優缺點

- **優點**：
  - 操作簡單，易於版本控制與分享。
  - 可精準描述環境配置，適合多人協作或部署至雲端伺服器。
  - 可以跟 Docker 結合快速啟動環境。

- **缺點**：
  - 還原環境時需要網路連線，因為會從指定的 channel 下載套件。
  - 當某些套件在 channel 上更新或下架，可能會影響環境的還原。

---

## 方法二: conda pack

### 概述
`conda pack` 是一個用於打包整個 conda 環境的工具，它會將環境中所有的檔案與套件打包成一個壓縮檔（例如 tar.gz）。這樣的好處是可以在沒有網路的情況下，直接解壓縮並使用相同的環境。第一步先在 base 環境安裝 conda-pack。

```
pip install conda-pack
```

### 使用方法
此打包方式建議在預設的 base 環境下執行。

- **打包環境**

  假設你要打包名為 `myenv` 的環境，可以執行：

  ```  
  conda pack -n myenv  
  ```

  這個命令會產生一個 `myenv.tar.gz` 壓縮檔，包含整個環境的所有檔案。

- **解壓並使用環境**

  在目標機器上，先在conda安狀路徑下的envs資料夾中建立資料夾(名稱可以自取，等同環境名稱)，接著解壓縮該檔案：

  ```
  mkdir myenv  
  tar -xzf myenv.tar.gz -C myenv
  ```

  解壓後，你就可以直接使用這個環境，而不必重新下載套件。

### 優缺點

- **優點**：
  - 完整打包環境，適合離線部署或環境備份。
  - 不依賴外部網路，即使目標機器無法連線，也能還原環境。

- **缺點**：
  - 打包的壓縮檔可能會比較大，不便於網路傳輸。
  - 若目標機器的路徑與打包時不一致，可能需要執行 `conda-unpack` 來修正環境中的路徑。

---

## 總結
本篇文章介紹了兩種打包 Python 環境的技巧。根據不同的情境選擇合適的方法，能夠讓你的 conda 環境在遷移與備份上更為穩定與高效。

- **有網路環境下**：推薦使用 `conda env export` 方法。透過匯出 YAML 檔案，能夠輕鬆記錄並還原環境，但前提是目標環境必須有網路連線來下載套件。
- **無網路環境下**：則可使用 `conda pack` 將整個環境打包成壓縮檔，直接搬移與解壓使用，確保環境中的所有套件均被攜帶，不必依賴外部資源。

