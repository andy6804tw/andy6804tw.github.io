---
layout: post
title: '解決 HuggingFace 模型下載時的磁碟空間不足問題'
categories: 'Python'
description: 'A simple guide to solving HuggingFace model download failures caused by insufficient disk space.'
keywords: 'huggingface, disk space'
---

## 前言
在 AWS EC2 機器上開發 AI 應用時，若使用 HuggingFace 模型（例如 `intfloat/multilingual-e5-large`）搭配 FastAPI，可能會遇到兩個常見錯誤：

* `OSError: [Errno 28] No space left on device`
* `OSError: PermissionError at ~/.cache/huggingface/hub`

這些錯誤通常是因為模型快取資料預設會儲存在 `/home/ubuntu/.cache/huggingface`，而 EC2 的根磁碟（通常是 `/dev/root`）空間不足，或該快取資料夾權限錯誤所致。以下是完整的處理與遷移流程：

---

## 問題徵兆

執行以下程式時，模型無法正常下載：

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("intfloat/multilingual-e5-large")
```

終端機出現錯誤訊息類似：

```
OSError: [Errno 28] No space left on device
PermissionError at /home/ubuntu/.cache/huggingface/hub when downloading intfloat/multilingual-e5-large
```

使用 `df -h` 可發現根目錄已滿：

```
/dev/root        6.8G  6.7G  8.0K 100% /
```

---

## 解法：改將快取資料存放到大容量磁碟 `/mnt/agentdata`

### 步驟一：刪除舊快取與鎖檔

```bash
rm -rf /home/ubuntu/.cache/huggingface
```

若你已經改過快取位置，也請清掉殘留鎖檔：

```bash
rm -rf /mnt/agentdata/huggingface_cache/*/*.lock
```

---

### 步驟二：建立新快取目錄

```bash
mkdir -p /mnt/agentdata/huggingface_cache/hub
mkdir -p /mnt/agentdata/huggingface_cache/models
sudo chown -R ubuntu:ubuntu /mnt/agentdata/huggingface_cache
sudo chmod -R 755 /mnt/agentdata/huggingface_cache
```

---

### 步驟三：設定環境變數（推薦方式）

你可以將快取目錄設定為環境變數：

```bash
export HF_HOME=/mnt/agentdata/huggingface_cache/hub
export TRANSFORMERS_CACHE=/mnt/agentdata/huggingface_cache/models
```

如果你使用 `uvicorn`，啟動指令如下：

```bash
HF_HOME=/mnt/agentdata/huggingface_cache/hub \
TRANSFORMERS_CACHE=/mnt/agentdata/huggingface_cache/models \
uvicorn app:app --host 0.0.0.0 --port 8002
```

若你希望永久生效，可寫入 `~/.bashrc` 或系統服務設定檔。

---

### （可選）使用符號連結替代環境變數

若你不想改動環境變數設定，也可將舊目錄導向新磁碟區：

```bash
ln -s /mnt/agentdata/huggingface_cache/hub /home/ubuntu/.cache/huggingface
chown -h ubuntu:ubuntu /home/ubuntu/.cache/huggingface
```

---

### 步驟四：測試權限是否正常

```bash
touch /mnt/agentdata/huggingface_cache/models/test.txt
echo ok > /mnt/agentdata/huggingface_cache/models/test.txt
cat /mnt/agentdata/huggingface_cache/models/test.txt
rm /mnt/agentdata/huggingface_cache/models/test.txt
```

---

### 步驟五：重新執行模型下載

確認應用程式現在可以順利下載並儲存模型快取到指定目錄。

---

## 小結

| 問題類型      | 解法                                             |
| --------- | ---------------------------------------------- |
| 根目錄空間不足   | 將 HuggingFace 快取資料夾改到大容量磁碟，例如 `/mnt/agentdata` |
| 權限錯誤、鎖檔殘留 | 移除 `.lock` 檔並確保擁有者與權限正確                        |
| 無法寫入新路徑   | 使用 `chown -R` 與 `chmod -R` 重新設置權限              |

這種問題在 HuggingFace 或其他會下載大型模型的 AI 專案中很常見，只要記得將快取移到空間夠大的地方、搭配正確權限與環境變數，便能避免中斷執行。
