---
layout: post
title: 'Firebase Hosting 連結網域服務'
categories: 'Web'
description: 
keywords: DNS、Nameserver、URL Forwarding
---

## 前言
上一篇教學[Firebase Hosting 靜態網站部署](https://andy6804tw.github.io/2018/01/29/firebase-hosting-deploy/)教你如何使用 Firebase Hosting 來發布自己的靜態網站，發布成功後會自動生成一個 Firebase 專屬的網域給你例如：`fir-3e184.firebaseapp.com`，此外 Firebase 也很佛心的提供 DNS 轉址服務，能夠設定屬於自己的域名，在看這篇教學的讀者們若你還尚未有自己的網域又不想付費購買的話[此篇](https://andy6804tw.github.io/2018/01/30/freenom-tutorial/)文章非常適合你！

## 何謂 DNS ?
全名 Domain Name Server(DNS)能夠作領域名稱(Domain name)與位址(IP address)相互之間的轉換，簡單來說 IP address 是電腦在記的而人記的就是 Domain name，網路系統會自動把我們人所輸入的 Domain name 自動轉換成 IP address，所以簡單來說 DNS 的作用就是容易記住的主機名稱轉譯成為電腦所熟悉的 IP 位址而已。

## 什麼是 Domain Name ?
因為 IP 位址是由一大串的數字組成所以很難記憶，因此我們常利用一組較有意義的英文縮寫來代表 IP Address，這就是Domain Name，其組成可分成四部份：

- 主機名稱：www為全球資訊網
- 機構名稱：通常為公司行號或是學校名稱
- 機構類別：學術單位edu、公司行號com、政府單位gov
- 地區名稱：台灣tw、日本jp、美國us

## Firebase Hosting 連結網域服務

##### 1. 開啟 Firebase Hosting

至 [Firebase Console](https://console.firebase.google.com/) 開啟你所建立的專案並選擇 Hosting 功能，並點擊連結網域。

<img src="/images/posts/web/2018/img1070131-1.png">

##### 2. 新增網域

這邊就是輸入你自己的網域亦可輸入子網域皆可。

<img src="/images/posts/web/2018/img1070131-2.png" width="550">

##### 3. 驗證擁有權

接下來會看到 Firebase 提供兩個 A紀錄類型分別有主機名稱與IP位址，請開啟 [Freenom](http://www.freenom.com/en/index.html?lang=en) 的後台 Services > My Domains > Manage Domain > Manage Freenom DNS 依序的將兩個紀錄填入並儲存送出。

<img src="/images/posts/web/2018/img1070131-3.png" width="550">
<img src="/images/posts/web/2018/img1070131-4.png">

##### 4. 完成

若完成上述步驟可以稍等幾分鐘 Firebase 自動會幫你做轉址的服務，至於一開始會有不安全的警示是正常的再過一陣子等憑證生效你的網站就有 HTTPS 的服務囉！

<img src="/images/posts/web/2018/img1070131-5.png">
