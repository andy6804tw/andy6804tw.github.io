---
layout: post
title: '[Android] Intent跳頁＆傳遞資料'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
當 APP 有多個頁面就必需採用 Intent 來實現多個 activity 之間的跳換。當然除了頁面跳換，也能同時將值傳遞過去到新的 activity。本文章就來教各位如何實作兩個 activity 頁面的跳轉，以及傳遞數值。

## Intent 用法
我們可以透過建立一個 Intent 實例，裡面的初始值方別放入目前的頁面所在地以及欲跳轉過去的頁面。給予初始值後完後， `startActivity()` 即可啟動跳轉。

```java
Intent intent = new Intent(MainActivity.this, MainActivity2.class);
startActivity(intent);
```

## Intent 夾帶資料
假設我們要傳遞浮點數(float) weight 值，可直接使用 Intent 類別所提供的 `putExtra` 方法將數值夾帶。

```java
Intent intent = new Intent(MainActivity.this, MainActivity2.class);
float weight=55;
intent.putExtra("WEIGHT_VALUE", weight);
startActivity(intent);
```

參考 MainActivity.java [傳送門](https://github.com/1010code/android-intent/blob/main/app/src/main/java/com/example/androidintent/MainActivity.java)

## Intent 取值
傳值過去後，我們可以在轉換Activity後的目的地(Main2Activity)取得在前一個Activity己放入的資料。由於資料是放在 Intent 中，因此必須先呼叫 Activity 中的 `getIntent()` 方法來取得 Intent 物件。接下來再使用 Intent 類別的 `getXXExtra()` 方法取得其中所附帶的資料，如本例之前放入的是float型態的資料，在此就應使用 `getFloatExtra()` 方法。第一個參數為取得資料的標籤。第二個為預設初始值，假設無法取得該筆資料就會回傳預設值。

```java
Intent intent = getIntent();
float weight = intent.getFloatExtra("WEIGHT_VALUE", 0);
```

參考 MainActivity2.java [傳送門](https://github.com/1010code/android-intent/blob/main/app/src/main/java/com/example/androidintent/MainActivity2.java)


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

## 補充
如果我們使用 Intent 方式傳遞值，假設需要將資料從頁面A傳遞到B，然後再傳遞到C。我們可以發現在B的頁面我們需要將這些值全部讀取出來再透過 `putExtra` 的方式將資料逐一塞進去傳到C頁面。這樣看起來會非常麻煩。而使用 `Bundle` 的話，在B頁面可以直接取出傳輸的Bundle物件然後傳輸給C頁面。

如果有多種類的資料需要傳遞，可使用Bundle類別。他可以像是包裹一樣把所有數值包裝起來再透過 Intent 傳送打包出去。使用方式如下：

```java
Intent intent = new Intent(MainActivity2.this, MainActivity3.class);
Bundle bundle = new Bundle();
bundle.putFloat("WEIGHT_VALUE",weight);
bundle.putFloat("HEIGHT_VALUE", height);
bundle.putFloat("BMI_VALUE", bmi);
intent.putExtras(bundle);
startActivity(intent);
```
參考 MainActivity2.java [傳送門](https://github.com/1010code/android-intent/blob/main/app/src/main/java/com/example/androidintent/MainActivity2.java)

透過 Intent 取得 Bundle 物件內容:

```java
Intent intent = getIntent();
float weight = intent.getExtras().getFloat("WEIGHT_VALUE", 0);
float height = intent.getExtras().getFloat("HEIGHT_VALUE", 0);
float bmi = intent.getExtras().getFloat("BMI_VALUE", 0);
```
參考 MainActivity2.java [傳送門](https://github.com/1010code/android-intent/blob/main/app/src/main/java/com/example/androidintent/MainActivity3.java)

## 總結
Bundle 可對物件進行操作，而 Intent 是不可以。少資料時可以使用 Intent，多筆資料時可以採用 Bundle。但是 Bundle 也還是需要透過Intent 才能完成資料傳遞功能。總之 Bundle 是一種儲存打包資料的方式，而 Intent 主要負責發送。

完整 Code 可以從我的 [GitHub](https://github.com/1010code/android-intent) 中取得！