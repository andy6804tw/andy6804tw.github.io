---
layout: post
title: '如何讓 Ollama 服務允許遠端設備存取'
categories: 'Linux'
description: 'Learn how to configure Ollama service with systemd to allow remote access by setting it to listen on 0.0.0.0:11434.'
keywords: 'Ollama, Linux, systemd, remote access, listen 0.0.0.0, enable external access, Ollama configuration'
---

# 如何讓 Ollama 服務允許遠端設備存取
## 前言
Ollama 預設僅允許本機存取 (`127.0.0.1`)，如果你希望讓遠端設備也能連線到 Ollama 服務，就需要修改 systemd 設定，讓其監聽 `0.0.0.0:11434`。

本教學將指導你如何修改 `ollama.service` 讓它可以被任何 IP 存取。

---

## 步驟 1：編輯 systemd 服務設定
首先，使用 Vim 或其他編輯器開啟 `ollama.service` 設定檔：
```bash
sudo vim /etc/systemd/system/ollama.service
```
> 💡 **注意**：如果 `/etc/systemd/system/ollama.service` 檔案不存在，請確認 Ollama 是否已安裝。如果仍然找不到，你可能需要手動建立此檔案。

---

## 步驟 2：修改 `[Service]` 區塊
在 `ollama.service` 檔案內，找到 `[Service]` 區塊，確保它包含以下內容：

```ini
[Service]
.
.
...略
Environment="OLLAMA_HOST=0.0.0.0:11434"
...

```
### 🔍 說明
- `Environment="OLLAMA_HOST=0.0.0.0:11434"`  
  - 設定 Ollama 監聽所有 IP，而不只是本機 (`127.0.0.1`)。

---

## 步驟 3：儲存並離開 Vim
在 Vim 中：
1. 按下 `Esc` 進入普通模式
2. 輸入 `:wq` 並按 `Enter`（儲存並退出）

如果你使用 `nano`，則按 `Ctrl + X` → `Y` → `Enter` 來儲存並退出。

---

## 步驟 4：重新載入 systemd 配置
儲存修改後，需要讓 systemd 重新讀取服務設定：
```bash
sudo systemctl daemon-reload
```

---

## 步驟 5：重啟並啟動 Ollama
執行以下指令讓修改生效：
```bash
sudo systemctl restart ollama
```
如果希望 Ollama 服務在開機時自動啟動，則執行：
```bash
sudo systemctl enable ollama
```

---

## 步驟 6：確認 Ollama 是否成功監聽 0.0.0.0:11434
執行以下指令：
```bash
ss -tulnp | grep 11434
```
如果輸出結果包含 `*:11434`，表示 Ollama 已成功監聽所有 IP，遠端設備可以存取。


> 🔗 **參考資料**：
> - [官方 Ollama Linux 文件](https://github.com/ollama/ollama/blob/main/docs/linux.md)
> - [Ollama 官方 FAQ](https://github.com/ollama/ollama/blob/main/docs/faq.md#faq)

---

這樣就完成了！現在你的 Ollama 服務已開放給外部設備存取，並確保它可以在系統重啟後自動啟動 
