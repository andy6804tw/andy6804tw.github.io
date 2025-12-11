---
layout: post
title: '什麼是「濾波器」？從概念到實務的完整介紹'
categories: 'Signal Processing'
description: 'A clear introduction to filters in signal processing, including filter types, practical concepts, and band-pass filter behavior with different orders.'
keywords: 'filter, signal processing, band-pass filter, cutoff frequency, filter order'
---


## 前言
在訊號處理（Signal Processing）中，「濾波器」（Filter）扮演著極為重要的角色。
簡單來說，濾波器的功能是：

> **保留你想要的頻率成分、濾除你不想要的頻率成分。**

要理解濾波器，我們可以從它的種類開始切入。


## 一、濾波器的四種類型

濾波器有四種典型形式，是所有濾波器的基礎：


### 1. 低通濾波器（Low-Pass Filter, LPF）

* 功能：
  **保留低於某個截止頻率 f_H 的訊號；濾除高頻成分。**

* 會保留：慢變化、平滑訊號

* 會濾掉：高速抖動、雜訊

常見用途：

* 消除高頻噪聲
* 電子電路中的整流與平滑


### 2. 高通濾波器（High-Pass Filter, HPF）

* 功能：
  **保留高於某個截止頻率 f_L 的訊號；濾除低頻成分。**

* 會保留：快速變化的成分

* 會濾掉：DC（直流偏移）、基座晃動、趨勢漂移

在振動分析（如 ISO 20816）中，HPF 特別重要：
低於 10 Hz（或 2 Hz）的訊號通常不代表設備異常，而是環境干擾。

### 3. 帶通濾波器（Band-Pass Filter, BPF）

* 功能：
  **只保留 f_L ~ f_H 之間的頻率，其他全部切除。**

也就是說：

| 被濾掉     | 原因                 |
| ------- | ------------------ |
| f < f_L | 太低頻，不重要或會造成 RMS 偏移 |
| f > f_H | 高頻雜訊，不屬於分析範圍       |

這也是 **ISO 20816（馬達震動評估）使用的濾波器**：

* 轉速 ≥ 600 rpm → 10~1000 Hz
* 轉速 < 600 rpm → 2~1000 Hz

### 4. 帶阻濾波器（Band-Stop Filter, BSF）

* 功能：
  **剛好與 Band-pass 相反：移除某段頻率區間，保留其餘部分。**

常見於：
去除「60 Hz 電力雜訊」（notch filter）。

## 二、理想與實際濾波器的差異

理論上的濾波器是「垂直切割」——完全保留通帶、完全消除阻帶。
但實務上做不到像漫畫一樣的直角切邊，因此會出現：

* 通帶與阻帶之間的**過渡區（transition band）**
* 截止頻率（cut-off frequency）需要定義
* 越陡的濾波器 → 階數 N 越高

濾波器的「階數 N」越高：

* **越接近理想直角濾波器（切得更乾淨）**
* **過渡區變得更窄**
* 但也可能造成「振鈴」（ringing）與數值不穩定

因此階數 N 的選擇是很重要的。

## 三、類比濾波器 vs 數位濾波器

濾波的方式可以分為兩種：

### 1. 類比濾波器（Analog Filter）

* 在訊號還是「類比信號」時就先濾掉雜訊
* 透過硬體（電路或感測器前端）進行濾波

優點：

* 先減少雜訊，避免 ADC 飽和
* 振動儀、DAQ 常內建

### 2. 數位濾波器（Digital Filter）

* 訊號經過 DAQ 變成數位後
* 透過程式進行濾波 → 又稱「軟體濾波」

優點：

* 彈性高
* 精確可控（如 Butterworth、Chebyshev…）
* 可搭配演算法（FFT、RMS、統計等）

在 ISO 20816 專案中，使用的就是 **數位濾波器**。

## 四、綜合整理：濾波器是什麼？
濾波器是一種：

> **能保留或消除指定頻率範圍的裝置（或演算法）。**

具備以下特性：

* 有四大類型：LPF、HPF、BPF、BSF
* 有理想 vs 實際濾波效果
* 有截止頻率（cut-off）與過渡區
* 可用硬體（類比）或軟體（數位）實現
* 階數 N 決定濾波器的陡峭程度與性能

## 五、深入理解「Band-pass Filter」
在 ISO 20816 中，我們想分析馬達或設備的「健康頻率」，
而不希望以下成分汙染 RMS：

* DC（0 Hz）
* 1~5 Hz 的基座晃動
* 高於 1000 Hz 的雜訊

所以標準要求：

| 轉速        | Band-pass 頻率   |
| --------- | -------------- |
| ≥ 600 rpm | **10~1000 Hz** |
| < 600 rpm | **2~1000 Hz**  |

這就是典型的 **Band-pass Filter（帶通濾波器）**。

## 六、濾波器的階數 N 為什麼重要？

階數 N 影響濾波器的「斜率」：

* **N 越低** → 切得慢、過渡區寬、低頻殘留更多
* **N=4（工業標準）** → 切得乾淨又不會振鈴
* **N 太高（像 8）** → 雖然很陡，但可能不穩定、邊界震盪（ringing）

在振動診斷領域（包含 ISO 20816），
**N=4 被視為最平衡、最可靠的選擇**。

## 七、使用 Python 實際比較 N=1, 2, 4, 8 的 Band-pass 濾波器

以下是一段可直接放進 Notebook 的完整示範，用來比較階數差異：

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import butter, sosfreqz

# === 基本設定 ===
fs = 8000.0
nyq = fs / 2

f_low = 10.0     # ISO 20816 常見低頻 cutoff
f_high = 1000.0  # ISO 20816 高頻 cutoff

orders = [1, 2, 4, 8]  # 要比較的階數

plt.figure(figsize=(12, 6))

for N in orders:
    sos = butter(
        N=N,
        Wn=[f_low / nyq, f_high / nyq],
        btype="band",
        output="sos"
    )
    
    w, h = sosfreqz(sos, worN=2000, fs=fs)
    
    plt.semilogx(w, 20*np.log10(np.abs(h)), label=f"N = {N}")

# cutoff 標示
plt.axvline(f_low, color='green', linestyle='--', alpha=0.7)
plt.axvline(f_high, color='red', linestyle='--', alpha=0.7)

plt.title("不同階數 N 的 Band-Pass Filter 頻率響應比較")
plt.xlabel("Frequency (Hz, log scale)")
plt.ylabel("Gain (dB)")
plt.legend()
plt.grid(True, which='both')
plt.ylim(-80, 5)
plt.show()
```

階數越高，轉折越陡、低頻漂移與高頻雜訊被壓得越乾淨；N=1 與 N=2 太鬆，N=4 剛好符合 ISO 20816 的實務需求，而到 N=8 雖然看起來超利落但容易帶來振鈴與穩定度問題，反而不實用。

| 階數 N         | 濾波器行為                  | 適用情境                   |
| ------------ | ---------------------- | ---------------------- |
| N=1          | 過渡區寬、切得不乾淨             | 非正式教學用、示範用             |
| N=2          | 還行但不夠乾淨                | 一般 MCU、低運算環境           |
| **N=4（最推薦）** | **切得乾淨、穩定、不振鈴 → 工業標準** | **ISO 20816、振動診斷、工程用** |
| N=8          | 極陡但容易振鈴                | 特殊用途，不建議用於 RMS 計算      |


## 最後整理

濾波器是用來：

* 保留／移除指定頻率
* 確保後續計算有意義

而 Band-pass Filter 是 ISO 20816 的核心濾波器，用來：

* 移除 DC、低頻漂移
* 移除高頻雜訊
* 保留設備健康資訊（10~1000 Hz）

階數 N 決定：

* 濾波器切頻的銳利程度
* 影響 RMS 的精準度
* 也影響數值穩定度

對震動診斷來說，**N=4 是最佳實務**。


