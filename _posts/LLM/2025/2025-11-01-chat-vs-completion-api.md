---
layout: post
title: '一篇看懂 Chat API 與 Completion API 差在哪'
categories: 'LLM'
description: 'Learn the key differences between OpenAI Chat Completions and Completions APIs, including their evolution and use cases.'
keywords: 'OpenAI API, Chat Completions, Completions'
---

# 一篇看懂 Chat API 與 Completion API 差在哪
自 2020 年以來，OpenAI 的文字生成 API 一路從「文字補全」（Completion）進化到「多輪對話」（Chat Completion）架構。
在使用 OpenAI API 時，許多人會注意到有兩個看似相似的端點：

* **`/v1/completions`**
* **`/v1/chat/completions`**

乍看之下兩者都能生成文字，但它們其實代表了 **兩代不同的模型互動設計理念**。
本文將從結構、功能、適用情境與模型發展方向等面向，完整解析這兩個端點的核心差異。

---

## 歷史背景與設計理念

### `/v1/completions`：早期的文字補全模型

這個端點是最早期的 API 形式，源自 GPT-3 時代。
它的設計目標是「**給我一段文字，模型幫我續寫**」，
所以稱為 **Completion API** —— 文字補全。

它沒有「對話」的概念，也沒有角色區分；
所有的指令、上下文、語氣控制，都要由開發者自己寫在同一個 prompt 裡。

範例：

```python
response = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="請寫一首關於秋天的詩：",
    max_tokens=100
)
print(response.choices[0].text)
```

---

### `/v1/chat/completions`：新一代對話式模型

自 GPT-3.5（ChatGPT）與 GPT-4 起，OpenAI 改以「**多輪對話架構**」取代傳統文字補全。
這個設計讓模型能夠：

* 理解角色（system、user、assistant）
* 保持上下文記憶
* 執行 function calling（工具呼叫）
* 管理多模態輸入（文字、圖片、音訊）

範例：

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一位友善的助理"},
        {"role": "user", "content": "請寫一首關於秋天的詩"}
    ]
)
print(response.choices[0].message.content)
```

---

## 演進時間軸

| 時間              | 發展階段                | 代表模型                              | 主要端點                   | 說明                                 |
| --------------- | ------------------- | --------------------------------- | ---------------------- | ---------------------------------- |
| **2020 年 6 月**  | GPT-3 問世            | `davinci`、`curie`、`babbage`、`ada` | `/v1/completions`      | 最早的「文字補全」API。給定一段文字，模型負責續寫。        |
| **2021 年底**     | Instruct 系列推出       | `text-davinci-002`、`003`          | `/v1/completions`      | 加入「指令遵循」能力，能理解任務式語句而非單純續寫。         |
| **2022 年 11 月** | ChatGPT 上線          | `gpt-3.5-turbo`                   | `/v1/chat/completions` | 全新對話式格式，支援多輪互動與角色語境。               |
| **2023 年 3 月**  | GPT-4 發佈            | `gpt-4`、`gpt-4-turbo`             | `/v1/chat/completions` | 開始支援 Function Calling、長上下文、穩定多輪推理。 |
| **2024 年中**     | GPT-4o 問世           | `gpt-4o`                          | `/v1/chat/completions` | 跨文字、影像、音訊的多模態模型，Chat 架構正式成為主流。     |
| **2025 年**      | GPT-5 / o1 / o3 等模型 | `gpt-5`、`o1`、`o3`                 | `/v1/chat/completions` | 將所有生成、工具、推理任務統一於 Chat 端點。          |


從 2022 年底開始，**`/v1/chat/completions` 已取代舊有 `/v1/completions` 成為主力 API**，
後者現主要作為相容模式保留。

---

## 架構差異總覽

| 項目                         | `/v1/chat/completions`             | `/v1/completions`      |
| -------------------------- | ---------------------------------- | ---------------------- |
| **誕生時間**                   | 2022 年（隨 GPT-3.5 / ChatGPT 發佈）     | 2020 年（隨 GPT-3 發佈）     |
| **主要用途**                   | 對話式互動、Agent、RAG、工具整合               | 單次文字生成、模板補全            |
| **輸入格式**                   | `messages`（多輪訊息、具角色）               | `prompt`（單段文字）         |
| **角色設計**                   | `system`、`user`、`assistant`、`tool` | 無角色概念                  |
| **上下文記憶**                  | ✅ 支援多輪對話                           | ❌ 僅能單次生成               |
| **Function Calling / MCP** | ✅ 原生支援                             | ❌ 不支援                  |
| **多模態支援**                  | ✅ GPT-4o / GPT-5 可讀圖、聽音、分析影像       | ❌ 僅限文字                 |
| **輸出結構**                   | `choices[0].message.content`       | `choices[0].text`      |
| **代表模型**                   | GPT-3.5、GPT-4、GPT-4o、GPT-5、o1      | GPT-3、text-davinci-003 |
| **維護狀態**                   | ✅ 主流發展中                            | ⚠️ 僅相容維護中              |

---

## 輸入格式差異範例

### Chat API 輸入格式

```json
{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "你是一位資深Python工程師"},
    {"role": "user", "content": "請幫我寫一段程式，計算列表平均值"}
  ]
}
```

> 👉 模型會根據角色與上下文，自然理解需求、生成回應。

---

### Completion API 輸入格式

```json
{
  "model": "gpt-3.5-turbo-instruct",
  "prompt": "你是一位資深Python工程師，請幫我寫一段程式，計算列表平均值。",
  "max_tokens": 100
}
```

> 👉 沒有上下文或角色結構，模型只根據這一段 prompt 進行續寫。

---

## 功能與應用場景比較

| 使用情境                      | 推薦端點                            | 原因                                 |
| ------------------------- | ------------------------------- | ---------------------------------- |
| 聊天機器人 / 智慧客服              | `/v1/chat/completions`          | 支援多輪語境與角色語氣一致性                     |
| 文件問答 / RAG                | `/v1/chat/completions`          | 可注入外部知識並控制回應邏輯                     |
| Function Calling（呼叫外部API） | `/v1/chat/completions`          | 支援 structured output / JSON schema |
| 多模態輸入（圖像、音訊）              | `/v1/chat/completions`          | GPT-4o 原生支援                        |
| 一次性生成（例如 SQL、摘要、模板）       | `/v1/completions` 或 instruct 模型 | 單輪生成速度較快                           |
| 自動化腳本 / 程式碼生成             | `/v1/chat/completions`          | 可持續追問與重構程式                         |

---

## 回傳結構差異

### Chat API 回傳

```json
{
  "id": "chatcmpl-xxxx",
  "object": "chat.completion",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "秋天的詩如下..."
      }
    }
  ]
}
```

### Completion API 回傳

```json
{
  "id": "cmpl-xxxx",
  "object": "text_completion",
  "choices": [
    {
      "text": "秋天的詩如下..."
    }
  ]
}
```

> 兩者差異：Chat API 有「角色」結構；Completion 只有單純文字。

---

## 為何 OpenAI 推動 Chat 架構？

Chat API 並非只是為了「聊天」，
而是代表 **LLM 應用的統一介面標準**，原因如下：

1. **可延展性高**：支援多模態（文字、圖像、音訊）輸入。
2. **工具整合能力強**：支援 Function Calling，能呼叫外部 API。
3. **更符合人機互動設計**：有明確角色與上下文。
4. **通用於 Agent 應用**：成為智慧助理、RAG、流程機器人的基礎。

因此目前 GPT-4、GPT-4o、GPT-5、o1、o3 等最新模型 **皆使用 Chat API**，
舊的 Completion API 則僅保留給 instruct 系列模型作為過渡使用。

---

## 未來發展趨勢

| 年份                  | 重點                              | 說明                         |
| ------------------- | ------------------------------- | -------------------------- |
| **2023–2024**       | Function Calling 標準化            | 開始支援 JSON schema 與工具呼叫     |
| **2024–2025**       | MCP (Model Context Protocol) 問世 | Chat API 延伸支援外部 Agent 工具互通 |
| **2025 起**          | `/v1/completions` 漸停用           | 僅保留 instruct 模型相容性         |
| **GPT-5 / o1 / o3** | 全面採用 Chat 架構                    | 統一推論、推理與多模態應用介面            |

---

## 總結
隨著 GPT-4o 與 GPT-5 的推出，所有新模型、工具呼叫（Function Calling）、以及多模態應用都將以 **Chat Completion** 作為統一介面。

| 面向   | `/v1/completions`        | `/v1/chat/completions`      |
| ---- | ------------------------ | --------------------------- |
| 誕生時期 | 2020 (GPT-3)             | 2022 (GPT-3.5)              |
| 架構概念 | 單次文字補全                   | 多輪對話生成                      |
| 能力焦點 | 文本續寫                     | 理解語境與任務                     |
| 工具整合 | 無                        | Function / MCP / RAG        |
| 模型代表 | GPT-3 / text-davinci-003 | GPT-4 / GPT-4o / GPT-5 / o1 |
| 未來走向 | 向下相容、逐步淘汰                | 長期主流、功能擴展中                  |
