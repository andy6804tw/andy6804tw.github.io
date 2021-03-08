---
layout: post
title: 'Android 內建相機拍照實作'
categories: 'Android'
description: 
keywords: 'Android Developers'
---

## 前言
本文章教您如何透過呼叫內建相機拍攝一張照片，並回傳到自己的 App 並顯示在 ImageView 中。實作中需要注意的是進行影像存取前要先取得用戶相機權限，取得權限後就可以透過 Intent 呼叫啟動內建相機拍照，並改寫 `onActivityResult()` 函式取得內建相機拍攝的照片。

<img src="/images/posts/android/2021/img1100308-1.gif" width="250px">

## Request the camera feature
首先開啟 `AndroidManifest.xml` 加入相機的存取權限。

```xml
<manifest ... >
    <uses-permission android:name="android.permission.CAMERA"/>
    ...
</manifest>
```

## View
開啟 `activity_main.xml` 加入一個 ImageView 並將 id 命名為 `displayImageView` 與 Button 按鈕 id 命名 `cameraBtn`。

![](https://i.imgur.com/TmNCpD1.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/displayImageView"
        android:layout_width="300dp"
        android:layout_height="300dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.495"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.199"
        app:srcCompat="@drawable/ic_launcher_background" />

    <Button
        android:id="@+id/cameraBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="47dp"
        android:text="Camera"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/displayImageView" />

</androidx.constraintlayout.widget.ConstraintLayout>
```


## Take a photo with a camera app
開啟 `MainActivity` 來撰寫核心功能。分別建立 selectedImage 變數來控制 ImageView 顯示的圖片，以及 cameraBtn 按鈕提供點擊開啟內部相機。當點擊按鈕後會立即呼叫 `askCameraPermissions()` 要求使用者同意相機設備存取，當成功取得權限後會呼叫 `openCamera()` 開啟內建的相機。當內建相機拍攝完照片後會將圖片透過 Intent 的方式將影像資料回傳到 `MainActivity`，因此我們要改寫 `onActivityResult` 來接收回傳的影像並將收到的圖片轉成 Bitmap 格式顯示在 ImageView。

```java
public class MainActivity extends AppCompatActivity {

    public static final int CAMERA_PERM_CODE = 101;
    public static final int CAMERA_REQUEST_CODE = 102;
    ImageView selectedImage;
    Button cameraBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        selectedImage = findViewById(R.id.displayImageView);
        cameraBtn = findViewById(R.id.cameraBtn);
        // Open Camera
        cameraBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                askCameraPermissions();
            }
        });
    }
    private void askCameraPermissions() {
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this,new String[] {Manifest.permission.CAMERA}, CAMERA_PERM_CODE);
        }else {
            openCamera();
        }

    }

    private void openCamera() {
        Intent camera = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(camera, CAMERA_REQUEST_CODE);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == CAMERA_REQUEST_CODE){
            Bitmap image = (Bitmap) data.getExtras().get("data");
            selectedImage.setImageBitmap(image);
        }
    }

}
```

## Reference
[Android developer](https://developer.android.com/training/camera/photobasics)

完整 Code 可以從我的 [GitHub](https://github.com/1010code/Take-photos-Android) 中取得！