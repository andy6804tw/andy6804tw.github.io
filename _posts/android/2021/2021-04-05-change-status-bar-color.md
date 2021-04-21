---
layout: post
title: '[Android] 修改 status bar 顏色'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
本文將教您如何更改 APP 狀態欄顏色。

<img src="/images/posts/android/2021/img1100405-1.png" width="250px">

## MainActivity.java
開起 `MainActivity.java` 並加入以下幾行程式碼。透過 `this.getWindow()` 取得視窗物件，接著透過 `window.setStatusBarColor()` 來設定狀態列顏色。

```java
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
public class MainActivity extends AppCompatActivity {
   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      Window window = MainActivity.this.getWindow();
      window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
      window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
      window.setStatusBarColor(ContextCompat.getColor(MainActivity.this, R.color.colorAccent));
   }
}
```