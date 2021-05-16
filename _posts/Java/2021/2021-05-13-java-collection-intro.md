---
layout: post
title: '[Java筆記] Java Collection 介紹'
categories: 'Java'
description:
keywords: Java Collection
---

## 前言
在Java中可以幫我們處理一筆資料的除了陣列外，就非Collection API中的元件莫屬了。集合(Collection)就是設計來群組多個資料物件使用，存放在集合中的物件則可以稱為這個集合的元素(Elements)。

## Java 的 Collection 介面
在程式運作中，有時候會需要有地方可以暫時儲存產生出來的物件，我們稱之為 Container(容器)。然而在 `java.util.Collection` 介面中定義了所有集合最基本的存取方式如下圖:

![](/images/posts/Java/2021/img1100513-1.jpeg)

Collection介面下又分別繼承了三個介面翻別是Set集合、List、Queue佇列也有提供API讓開發者直接使用它是利用LinkList來實作List介面的，當然你能有聽過Map它是以key-value存在並沒有在Collection介面下實作詳細內容接下來幾篇文章會陸續提到。

另外根據使用者的需求，在容器的選擇上也有所不同，下面有簡單的解釋：
- List：循序索引的串列結構 
    - ex:ArrayList、LinkedList
- Set：不允許相同物件存在的集合結構
    - ex:HashSet、TreeSet
- Map：使用 Key-Value(鍵-值) 方式儲存的結構
    - ex:HashMap、TreeMap


> 上述所以到的容器後續文章中會一一的做說明解釋。