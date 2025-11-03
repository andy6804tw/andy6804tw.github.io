---
layout: post
title: '打造屬於你的 OpenAI 相容 API：用 FastAPI 模擬 Chat Completions 服務'
categories: 'LLM'
description: 'Learn how to build an OpenAI-compatible Chat Completions API using FastAPI and Python.'
keywords: 'OpenAI API, FastAPI, Chat Completions, LLM, Python'
---

# 打造屬於你的 OpenAI 相容 API：用 FastAPI 模擬 Chat Completions 服務

## 為什麼要自己建 OpenAI 相容 API？
生成式 AI 爆發後，**OpenAI 的 API 幾乎成為業界標準**。
不論是客服機器人、程式助理還是知識問答系統，開發者都習慣透過 OpenAI 的 `/v1/chat/completions` 介面來呼叫 GPT 模型。

然而，並不是所有人都能或想使用 OpenAI 的雲端服務。
常見原因包括：

* **成本考量**：頻繁呼叫模型會帶來高昂 API 成本。
* **資料隱私**：內部敏感資料不允許傳送至外部雲端。
* **自有模型或開源替代方案**：想在內部部署 Llama、Qwen、Gemma 等開源模型。

這時，你就會遇到一個實際問題：

> 「很多現有應用（像 AI 助理或插件）**只支援 OpenAI API**，我能不能讓它們以為自己在跟 OpenAI 對話，其實是連到我的伺服器？」

答案是：可以！
透過 **FastAPI** 建立一個 **OpenAI 相容 API 伺服器**，你可以：

* 在本地或公司內網託管自己的模型；
* 使用同樣的 OpenAI 客戶端；
* 不改任何第三方應用程式碼。

當然，如果你只是想**快速部署**而不想自己從零手刻，現在也有許多開源方案可以直接使用：
像是 **Ollama** 就能在地端輕鬆載入與管理本地模型，
而較大型團隊或需要**同時管理多個 LLM／Embedding 模型**的情境，
則常會選擇 **vLLM** 或 **LiteLLM**
它們都能提供與 OpenAI 相容的 API 介面，並具備更完善的併發效能與模型路由管理。

不過，本篇文章將專注於「**手刻一個最小可用版本**」，
帶你一步步理解 OpenAI 相容 API 背後的運作邏輯，
幫助你未來能自由整合各種 LLM 架構。

## 我們要實作的目標
這篇教學將帶你從零開始建構一個最小可用的伺服器，**完全模擬 OpenAI 的 `/v1/chat/completions` 介面**。

它會回傳結構化 JSON（非串流）或串流 SSE（Streaming）格式，
讓官方 Python SDK（[openai](https://github.com/openai/openai-python)）或其他工具（如 LangChain、LlamaIndex）都能直接使用。


## 建構環境

請先建立虛擬環境並安裝依賴：

```bash
python -m venv venv
source venv/bin/activate      # Windows 用 venv\Scripts\activate
pip install fastapi uvicorn pydantic openai
```


## 核心程式：`app.py`

```python
import asyncio
import json
import time
from typing import List, Optional
from pydantic import BaseModel
from fastapi import FastAPI
from starlette.responses import StreamingResponse

app = FastAPI(title="OpenAI-compatible API")

# ---------- 定義資料模型 ----------
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: str = "mock-gpt-model"
    messages: List[ChatMessage]
    max_tokens: Optional[int] = 512
    temperature: Optional[float] = 0.1
    stream: Optional[bool] = False

# ---------- 串流輸出（模擬 token-by-token） ----------
async def _resp_async_generator(text_resp: str, model_name: str):
    for i, token in enumerate(text_resp.split(" ")):
        chunk = {
            "id": f"chunk-{i}",
            "object": "chat.completion.chunk",
            "created": int(time.time()),
            "model": model_name,
            "choices": [{"delta": {"content": token + " "}}],
        }
        yield f"data: {json.dumps(chunk)}\n\n"
        await asyncio.sleep(0.1)
    yield "data: [DONE]\n\n"

# ---------- Chat Completions 端點 ----------
@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    if request.messages:
        last = request.messages[-1].content
        resp_content = f"As a mock AI Assistant, I can only echo your last message: {last}"
    else:
        resp_content = (
            "As a mock AI Assistant, I can only echo your last message, but there wasn't one!"
        )

    # 串流模式
    if request.stream:
        return StreamingResponse(
            _resp_async_generator(resp_content, request.model),
            media_type="text/event-stream",
        )

    # 非串流模式
    return {
        "id": "mock-1337",
        "object": "chat.completion",
        "created": int(time.time()),
        "model": request.model,
        "choices": [
            {"message": {"role": "assistant", "content": resp_content}}
        ],
    }
```


### 程式結構解析

#### 1. `ChatCompletionRequest`

這是符合 OpenAI API 規格的輸入格式，包含：

* `model`：模型名稱（可隨意定義）
* `messages`：一段由多個 `{role, content}` 組成的對話歷史
* `stream`：決定是否使用串流回傳

---

#### 2. `_resp_async_generator()`

這個非同步生成器模擬「模型逐 token 回傳」的行為。
它把回覆拆成單字，逐一送出 SSE (Server-Sent Events) 片段。

> 注意：這裡的 `yield f"data: {...}\n\n"` 是 **OpenAI streaming API 的關鍵格式**。

---

#### 3. `/v1/chat/completions`

這是整個服務的主角端點。
它會根據 `stream` 參數選擇回傳：

* `StreamingResponse`（模擬 OpenAI 串流）
* 一次性 JSON（模擬一般回傳）

---

## 驗證伺服器

啟動伺服器：

```bash
uvicorn app:app --reload
```

### 方法一：用 curl 測試

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"mock-gpt-model","messages":[{"role":"user","content":"Hello"}]}'
```

輸出結果應如下：

```json
{
  "id": "mock-1337",
  "object": "chat.completion",
  "created": 1730000000,
  "model": "mock-gpt-model",
  "choices": [
    {"message": {"role": "assistant", "content": "As a mock AI Assistant, I can only echo your last message: Hello"}}
  ]
}
```


### 方法二：用 OpenAI SDK 驗證

官方 SDK 會自動呼叫 `/v1/chat/completions`。
只需設定 `base_url` 指向你的伺服器即可。

```python
from openai import OpenAI

client = OpenAI(
    api_key="fake-key",
    base_url="http://localhost:8000/v1"
)

resp = client.chat.completions.create(
    model="mock-gpt-model",
    messages=[{"role": "user", "content": "Say this is a test"}]
)

print(resp.choices[0].message.content)
```

若要測試串流：

```python
stream = client.chat.completions.create(
    model="mock-gpt-model",
    messages=[{"role": "user", "content": "stream please"}],
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
print()
```


如果一切正確，OpenAI SDK 或第三方工具都能「誤以為」你的伺服器就是 OpenAI。
這代表你已成功建立一個 **OpenAI 相容 API**。


## 延伸應用方向

1. **串接開源模型**
   將 `_resp_async_generator()` 改為呼叫本地 LLM（例如 Ollama、vLLM、Text-Generation-Inference）。
   只要最後輸出仍遵守 SSE 格式，即可保持相容性。

2. **新增 `/v1/models` 端點**
   模擬 OpenAI 模型清單：

   ```python
   @app.get("/v1/models")
   def models():
       return {"data": [{"id": "mock-gpt-model", "object": "model"}]}
   ```

3. **加入授權驗證**
   解析 HTTP Header 中的 `Authorization: Bearer <key>`，建立金鑰白名單。

4. **包裝成 Docker / 自訂部署**
   可快速整合到企業內部私有雲或 Kubernetes。


## 總結
這個範例展示了如何：

* 用 **FastAPI** 實作 `/v1/chat/completions`；
* 支援 **streaming SSE** 與非串流輸出；
* 讓 **OpenAI SDK 或其他依賴它的工具** 可以無痛接入。

透過這樣的方式，你能更深入理解 OpenAI API 的結構與運作機制，也能靈活擴充成自己的 LLM 服務。不過，如果你**不想花太多時間自行手刻或維護伺服器**，
也可以考慮使用現成的開源專案來管理地端模型，例如：

*  **Ollama**：快速在本地部署並呼叫開源模型；
*  **vLLM**：高效能推論伺服器，支援多模型與 OpenAI 相容端點；
*  **LiteLLM**：可作為多家 LLM 的統一代理層，整合 OpenAI、Anthropic、Gemini 等 API。

這些工具都能讓你更省時地建立起一個可與 OpenAI 相容的私有 API 環境，
同時保留靈活度與可擴充性。