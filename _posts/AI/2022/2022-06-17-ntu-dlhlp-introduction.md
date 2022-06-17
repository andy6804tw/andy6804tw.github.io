---
layout: post
title: '[DLHLP 2020 筆記] 人類語言處理的深度學習（課程概述）'
categories: 'AI'
description: 'DLHLP 2020 筆記'
keywords: 'DLHLP 2020 筆記'
---

課程名稱：[深度學習與人類語言處理](http://speech.ee.ntu.edu.tw/~tlkagk/courses_DLHLP20.html)(Deep Learning for Human Language Processing)

## 前言
自然語言就是人類在自然的情境下，發展出來能夠互相溝通的語言。若是人類特意去創造的語言我們又稱為是程式語言。自然語言存在的形式可以分成語音和文字兩種。不過自然語言處理大多時候指的是文本處理，所以這門課的名字叫人類語言處理以便區分，因為這門課同時會提到語音和文本處理。

> 人類語言處理的終極目標：讓機器能夠聽懂人說的話，看懂人寫的句子，並有能力說出人聽得懂的話，寫出人看得懂的句子。

很多語言是沒有文字系統的，此外世界上只有 56% 的語言有文字系統，而且有些語言的文字系統未必被人們廣泛使用，因此必須透過語音的技術才能讓機器理解這些語言。

## 人類語言處理的困難之處
假設我們有一個音檔為 1 秒 16 kHz 的語音，這也意味著這段聲音訊號在1秒中有 16000 個採樣點並以數字(實數)表示。每個 sample points 包含 256 個可能的取值。此外在語音的世界中沒有人能夠說同一段話兩次，因為每次說的話語音的波形可能都不盡相同。

![](https://i.imgur.com/L0Prpln.png)
![](https://i.imgur.com/rqeJ70j.png)

## 人類語言處理包含的任務
由於深度學習的火熱，人類語言處理任務上結合深度神經網路，各種問題硬train一發就能搞定。

> 硬train一發是一種信念，是一種浪漫，是人類最原始的衝動，是人類亙古以來的目標。— 李宏毅

![](https://i.imgur.com/hXRcZL1.png)

### 聲音轉文字：語音辨識
傳統的語音辨識模型中需要有聲學模型、語言模型、字典以及一個好的特徵抽取方法。然而現今深度學習時代中，我們可以訓練一個 end-end 網路模型達到離線的辨識結果。Google pixel 4 首度將這個 end-end 模型放在手機裝置中，並無太多模組僅只有一個類神經網路，最終透過模型壓縮只需要80MB即可運行在手機上。

![](https://i.imgur.com/LdRkKbp.png)


[延伸閱讀：An All-Neural On-Device Speech Recognizer](https://ai.googleblog.com/2019/03/an-all-neural-on-device-speech.html)

### 文字轉聲音：語音合成
語音合成 TTS 使用深度學習雖然效果驚人，不過這種黑盒算法也會有一些問題待解決。雖然對於長句效果很好，不過對於短詞效果較差。

[![](https://i.imgur.com/BgF4WJu.png)](https://www.youtube.com/watch?v=EwbTlnUkctM)


### 聲音轉聲音：語音轉換
語音轉換的實務案例有很多，例如：人聲分離、聲音轉換、抗噪...等。人類會選擇性的關注想要聽的聲音這就是雞尾酒會效應。雞尾酒會效應是指人的一種聽力選擇能力，在這種情況下，注意力集中在某一個人的談話之中而忽略背景中其他的對話或噪音。

![](https://i.imgur.com/eaz0zZA.png)

聲音轉換的概念跟影像的風格轉換有異曲同工之妙。其目標就是把一個人說過的話做音色遷移，輸出的結果聽起來像是由另外一個人說出來的。

![](https://i.imgur.com/hyr8u20.png)

### 聲音轉類別
- 語者辨認
    - 一段語音，模型判斷是誰在說話。
- 關鍵詞檢測
    - Keyword spotting 技術，語音助理的喚醒。

![](https://i.imgur.com/6zJHP1L.png)

### 文字轉文字：文字處理
文字處理應用包括機器翻譯、文章摘要、對話機器人、QA問答...等。由於近年來 Transformer 的興起，自然語言在文字處理的應用進步神速。這多虧餘 BERT 的功勞，日後延伸出許多更強(巨)大的模型。 

![](https://i.imgur.com/SJPEty6.png)

> [延伸閱讀：Must-Read Papers on Pre-trained Language Models](https://github.com/thunlp/PLMpapers)

### 文字轉類別

- 情意分析
- 文章分類

![](https://i.imgur.com/pJwtDzK.png)


## Reference
- [影片](https://www.youtube.com/watch?v=nER51ZyJaCQ&list=PLJV_el3uVTsO07RpBYFsXg-bN5Lu0nhdG)
- [簡報](http://speech.ee.ntu.edu.tw/~tlkagk/courses/DLHLP20/Introduction%20(v9).pdf)