---
layout: post
title: 'Java打包jar與exe可執行檔'
categories: 'Windows'
description: 
keywords:
---

## 前言
Java程式語言撰寫後正常有三種執行方式:

1. 在編譯器上執行 ex: Eclipse、IntelliJ
2. 使用 javac 編譯成 class 最後再用 java 指令在終端機執行
3. 打包成JAR檔案格式再用指令執行

前兩種執行概念是一樣的都必須要先經過編譯才能執行。第三種方法是把程式碼壓縮成jar格式然後使用JDK內建的jar命令建立或執行jar檔案。

然而你可能會想，Java能包成一個可執行檔嗎？答案是可以！網路搜尋會有許多第三方軟體來幫你打包成可執行檔。本篇文章會先簡單示範上述所有Java語言不同的執行方式。最後再使用Launch4j第三方軟體來打包成exe執行檔。

### 使用 javac 編譯並執行
在 `main.java` 檔案目錄下執行以下指令來編譯 `.java` 檔案。

```
#編譯
javac -encoding UTF-8 main.java
```

輸入以下執行指令執行程式。

```
#執行
java main
```

![](/images/posts/windows/2020/img20200604-1.png)



### 使用包裝檔 jar 執行
包裝jar檔時需要建立一個 `MANIFEST.MF` 檔案。記得要多留最後一行，不然執行時可能會有問題。

```
# MANIFEST.MF
Main-Class: main

```

輸入以下指令編譯jar檔。

```
jar -cvfm main.jar  MANIFEST.MF ./
```
編譯完成後會在目錄資料夾底下看到一個`main.jar`，輸入以下指令即可執行程式。
```
java -jar main.jar
```
![](/images/posts/windows/2020/img20200604-2.png)



### 使用 Launch4j 將 jar 包成 exe 檔
這裡使用`launch4j`第三方軟體來編譯jar檔並產生出exe的Java執行檔。首先指定`Output File`的資料夾與檔名(記得要打.exe)，接著放入要轉成exe的jar程式。

![](/images/posts/windows/2020/img20200604-3.png)

接著輸入`Min JRE version` 可支援的最低版本。

![](/images/posts/windows/2020/img20200604-4.png)

最後再設定exe的執行方式。因為我沒有寫GUI介面所以就點選console(終端機)的執行方式。設定在`Header`選項內。

![](/images/posts/windows/2020/img20200604-5.png)

最後在點選上排工具列的齒輪會先儲存一個 xml 設定檔，這也方便稍後修改設定重新產生 exe 檔，不用重新做設定。接著目錄資料夾底下就會產生出一個exe執行檔囉。

![](/images/posts/windows/2020/img20200604-6.png)

[GitHub](https://github.com/1010code/java-exe-deploy)