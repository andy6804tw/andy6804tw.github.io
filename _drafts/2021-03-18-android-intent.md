---
layout: post
title: '[Android] Intent 跳頁＆傳遞資料'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
當 APP 有多個頁面就必需採用 Intent 來實現多個 activity 之間的跳換。當然除了頁面跳換，也能同時將值傳遞過去到新的 activity。本文章就來教各位如何實作兩個 activity 頁面的跳轉，以及傳遞數值。

## Intent 用法
我們可以透過建立一個 Intent 實例，裡面的初始值方別放入目前的頁面所在地以及欲跳轉過去的頁面。給予初始值後完後， `startActivity()` 即可啟動跳轉。

```java
Intent intent = new Intent(MainActivity.this, Main2Activity.class);
startActivity(intent);
```

## Intent 夾帶資料
假設我們要傳遞浮點數(float) weight 值，可直接使用 Intent 類別所提供的 `putExtra` 方法將數值夾帶。

```java
Intent intent = new Intent(MainActivity.this, Main2Activity.class);
float weight=55;
intent.putExtra("WEIGHT_VALUE", weight);
startActivity(intent);
```

## Intent 取值
傳值過去後，我們可以在轉換Activity後的目的地(Main2Activity)取得在前一個Activity己放入的資料。由於資料是放在 Intent 中，因此必須先呼叫 Activity 中的 `getIntent()` 方法來取得 Intent 物件。接下來再使用 Intent 類別的 `getXXExtra()` 方法取得其中所附帶的資料，如本例之前放入的是float型態的資料，在此就應使用 `getFloatExtra()` 方法。第一個參數為取得資料的標籤。第二個為預設初始值，假設無法取得該筆資料就會回傳預設值。

```java
Intent intent = getIntent();
float weight = intent.getFloatExtra("WEIGHT_VALUE", 0);
```

Intent類別提供了以下幾個常用取得資料的方法：

| 方法名稱                | 說明                         |
|-------------------------|------------------------------|
| getFloatExtra           | 取得float型態資料            |
| getIntExtra             | 取得int型態資料              |
| getLongExtra            | 取得long型態資料             |
| getBooleanExtra         | 取得boolean型態資料          |
| getCharExtra            | 取得char型態資料             |
| getStringExtra          | 取得String型態資料           |
| getStringArrayExtra     | 取得String陣列型態資料       |
| getStringArrayListExtra | 取得內含String的List集合資料 |