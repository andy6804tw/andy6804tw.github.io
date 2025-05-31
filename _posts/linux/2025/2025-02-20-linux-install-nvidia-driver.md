---
layout: post
title: 'Linux 安裝 NVIDIA GPU 驅動完整教學'
categories: 'Linux'
description: 'Comprehensive Guide to Installing NVIDIA GPU Drivers on Linux'
keywords: 
---

本篇教學將完整介紹 如何在 Linux 上安裝 NVIDIA 驅動，確保你的系統能夠順利偵測並使用 GPU，以便高效進行 AI 訓練、科學運算或圖形處理等工作。


## 步驟 1：檢查 GPU 是否被偵測到
在開始安裝 NVIDIA 驅動之前，先確認系統是否能夠偵測到 **NVIDIA GPU**。

### 1.1 使用 lspci 檢查 GPU
執行以下指令來確認是否偵測到 NVIDIA 顯示卡：

```sh
lspci | grep -i nvidia
```

如果有輸出類似以下內容：
```
01:00.0 VGA compatible controller: NVIDIA Corporation AD102 [GeForce RTX 4090] (rev a1)
```
表示 GPU 已被偵測到，可以繼續下一步。

如果沒有輸出，可能是：
- GPU 硬體未正確插入
- GPU 在 BIOS 中被禁用


## 步驟 2：檢查是否已安裝 NVIDIA 驅動
請執行以下指令來確認系統是否已經載入 NVIDIA 驅動：

```sh
lsmod | grep nvidia
```

如果沒有任何輸出，代表 NVIDIA 驅動 **尚未載入**，需要進行安裝。

你也可以檢查目前系統已安裝的 NVIDIA 驅動版本：

```sh
nvidia-smi
```

如果出現錯誤：

```
NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver.
```

表示驅動未安裝或未正確啟動，需要進一步處理。


## 步驟 3：安裝 NVIDIA 驅動
在安裝 NVIDIA 驅動前，請先確認你的 Linux 發行版，並按照對應的方法來安裝。


### 3.1 Ubuntu / Debian 安裝 NVIDIA 驅動
#### 3.1.1 查詢推薦的 NVIDIA 驅動版本
Ubuntu 提供了一個自動偵測工具 `ubuntu-drivers`，可以幫助我們找到最佳的 NVIDIA 驅動：

```sh
ubuntu-drivers devices
```

這將會顯示建議的驅動版本，例如：
```
driver   : nvidia-driver-550 - distro non-free recommended
```

若找不到指令請先安裝 `ubuntu-drivers-common`:

```sh
sudo apt update
sudo apt install ubuntu-drivers-common
```


#### 3.1.2 安裝 NVIDIA 驅動
執行以下指令來安裝 NVIDIA 驅動：

```sh
sudo apt update
sudo apt install -y nvidia-driver-550
```
> **注意**：請將 `550` 替換成 `ubuntu-drivers devices` 指令所推薦的版本。

完成後，請重啟系統：

```sh
sudo reboot
```


#### 3.1.3 驗證 NVIDIA 驅動是否成功安裝
系統重新啟動後，執行以下指令：

```sh
nvidia-smi
```

如果顯示 GPU 資訊，例如：
```
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.120                Driver Version: 550.120        CUDA Version: 12.4     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 4090        Off |   00000000:01:00.0 Off |                  Off |
|  0%   30C    P8              3W /  450W |       2MiB /  24564MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|  No running processes found                                                             |
+-----------------------------------------------------------------------------------------+
```
代表 NVIDIA 驅動已安裝成功。

## 補充 GPU & CPU 監控指令
你已經安裝完 NVIDIA GPU 驅動，現在可以使用 `watch -n 0.5 -d nvidia-smi` 來監控 GPU 狀態，每 0.5 秒 更新一次資訊。如果你想要監控 CPU 使用率，可以使用 `htop`。

### **分開開啟 GPU & CPU 監控**
直接在 **兩個終端視窗** 內執行以下指令：

#### **開啟 GPU 監控（每 0.5 秒更新）**
```bash
watch -n 0.5 -d nvidia-smi
```
這個指令會：
- **每 0.5 秒** 更新一次畫面
- **高亮顯示變動的數值**（`-d` 參數）

#### **開啟 CPU 監控**
在 **另一個終端** 執行：

```bash
htop
```


## 結論
這篇教學涵蓋了 **Linux 安裝 NVIDIA 驅動的完整步驟**，包含：
- **檢查 GPU 是否被偵測**
- **確認驅動是否載入**
- **安裝適當的 NVIDIA 驅動**

安裝完成後，你的系統應該能夠順利運行 **CUDA、機器學習、遊戲或 3D 渲染**。如果你仍然遇到問題，可以進一步檢查系統日誌或驅動相容性。
