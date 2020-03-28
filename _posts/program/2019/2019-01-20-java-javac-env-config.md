---
layout: post
title: '[JAVA筆記] Windows10 Javav 開發環境設定'
categories: 'Program'
description: 
keywords:
---

## 前言
一般開發者若要使用 JAVA 必須要先安裝 JDK(JAVA Development Kit) 才能安裝開發 JAVA 用的 IDE，而裡面已經包含 JRE(JAVA Runtime Environment) 目的是要讓 JAVA 能夠運行。

若開發者是使用像是 `Eclipse` 或 `Intelj` 的 IDE 都能正常的編譯與執行，但如果你想使用 `javac` 手動編譯 JAVA 檔案時出現 `javac' 不是內部或外部命令、可執行的程式或批次檔。` 該怎麼解決呢？

![](/images/posts/program/2019/img1080120-01.PNG)


## 進入Windows10的 「進階系統設定」
開啟我的電腦，然後按滑鼠右鍵，選擇`內容`便會進入`系統`。

![](/images/posts/program/2019/img1080120-02.PNG)

進入`系統`之後，起見左邊選項的最後一個`進階系統設定，`按下進入。然後選擇系`統內容`對話視窗中選擇`進階`這個頁籤。進入該頁後請點選下方的`環境變數`。

![](/images/posts/program/2019/img1080120-03.PNG)

## 設定環境變數 
進入`環境變數`對話視窗後，請在`系統變數`下方選按`新增`。按下新增後，請為變數取名為 CALSSPATH，`變數值`內容則請輸入:

```
.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
```

> 注意開頭有一個點 .

![](/images/posts/program/2019/img1080120-04.PNG)

輸入完後按「確定」儲存。接著開啟終端機輸入 `javac -version` 確認是否有設定成功，若出現版本資訊恭喜你以手動編譯 JAVA 檔案並且在終端機上運行程式了！

![](/images/posts/program/2019/img1080120-05.PNG)
