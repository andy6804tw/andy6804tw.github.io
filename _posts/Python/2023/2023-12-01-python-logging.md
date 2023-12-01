---
layout: post
title: 'Python Logging 日誌管理教學數'
categories: 'Python'
description: 'python logging'
keywords: 
---

## 前言
在程式開發的初期，我們經常使用簡單的 print 方法來輸出訊息和進行除錯。這是一種快速而直接的方法，但當程式上線運行時，我們需要更多進階的工具來處理各種事件和特殊狀況，例如未預期的錯誤。這些狀態的紀錄對於日後的問題追蹤和系統分析來說非常重要。在這種情況下，簡單的 print 已經無法應對了。Python 提供了一個強大的 logging 方法，允許開發者靈活地管理和紀錄程式運行時的事件。

## Logging 分級
Logging 將訊息等級分為六個等級，分別是：NOTSET、DEBUG、INFO、WARNING、ERROR、CRITICAL。每個等級都有一個對應的數值，而 logging 只會紀錄等級數值大於或等於設定值的訊息。以下是每個等級的簡要描述：

- NOTSET: 未設定等級。
- DEBUG: 詳細的訊息，主要用於除錯。
- INFO: 一般訊息。
- WARNING: 警告訊息，表明某個已發生，但是可以繼續運行。
- ERROR: 錯誤訊息，由於軟體未預期的錯誤，不能執行某個功能。
- CRITICAL: 至關重要的訊息，表明程序已無法繼續執行。

## 使用 logging
首先載入內建的 logging 庫，接下來我們可以配置 logging，並使用各種不同等級的 logging 方法來記錄訊息。

```py
import logging

# 配置 logging，設定等級為 WARNING
logging.basicConfig(level=logging.WARNING)

# 使用不同等級的 logging 方法
logging.debug('這是一條 DEBUG 訊息')
logging.info('這是一條 INFO 訊息')
logging.warning('這是一條 WARNING 訊息')
logging.error('這是一條 ERROR 訊息')
logging.critical('這是一條 CRITICAL 訊息')
```

由於定義輸出等級為WARNING，因此僅有大於等於WARNING等級的 WARNING、ERROR、CRITICAL會有輸出顯示，下述為輸出結果。

```
WARNING:root:這是一條 WARNING 訊息
ERROR:root:這是一條 ERROR 訊息
CRITICAL:root:這是一條 CRITICAL 訊息
```

## 自定義 Logger 輸出格式
要使 logging 更詳細，可以添加其他相關的資訊，例如時間戳記、模組名稱、函數名稱等。這可以透過修改 logging 的格式來實現。此外之外我們也能將 log 訊息輸出成指定檔名的文字檔。須在 `logging.basicConfig()` 裡面的 filename 參數設定要儲存的日誌檔名，即可以將 logging 儲存起來。

- %(asctime)s: 記錄時間戳記
- %(filename)s: 執行程式檔名
- %(funcName)s: 呼叫函式的名稱
- %(levelname)s: 訊息等級
- %(lineno)d: 程式行數
- %(message)s: 實際的記錄訊息


```py
import logging
import sys
import time

# 取得當下系統時間
localtime = time.localtime()
# 處理 log 的基本設定
logging.basicConfig( 

	level = logging.INFO, 
	format = '%(asctime)s - %(levelname)s : %(message)s', 
	filename = './dev_log_' + time.strftime( "%Y_%m", localtime ) + '.txt' 

)

# 使用不同等級的 logging 方法
logging.debug('這是一條 DEBUG 訊息')
logging.info('這是一條 INFO 訊息')
logging.warning('這是一條 WARNING 訊息')
logging.error('這是一條 ERROR 訊息')
logging.critical('這是一條 CRITICAL 訊息')
```

實際輸出結果：
```
2023-12-01 21:14:07,546 - INFO : 這是一條 INFO 訊息
2023-12-01 21:14:07,546 - WARNING : 這是一條 WARNING 訊息
2023-12-01 21:14:07,546 - ERROR : 這是一條 ERROR 訊息
2023-12-01 21:14:07,546 - CRITICAL : 這是一條 CRITICAL 訊息

```