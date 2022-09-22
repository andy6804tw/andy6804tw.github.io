---
layout: post
title: 'Flutter 實現定時器功能'
categories: 'Flutter'
description: 'Flutter App stuck at Running Gradle task assembleDebug'
keywords: 
---

## 前言
本篇文將將教各位如何在 Flutter 透過 Timer 實現定時功能。

### 倒數指定時間後執行動作
以下範例倒數三秒後，執行`{}`內的程式碼，印出字串。

```dart
Timer(Duration(seconds: 3), () {
  print("This line is printed after 3 seconds");
});
```

### 定時重複事件
以下範例每五秒印出目前當下時間。

```dart
Timer.periodic(Duration(seconds: 5), (timer) {
  print(DateTime.now());
});
```

## 後記
Timer 的程式碼必須放在可執行區塊，以下範例寫在一個元件的建構子當中。僅會在第一次被執行時執行。

```dart
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  _MyAppState() {
    Timer _timer = new Timer(const Duration(milliseconds: 800), () {
      print("refresh!");
      setState(() {});
    });
  }
  @override
  void initState() {
    super.initState();
  }
  ...略
}
```

## Reference
- [How to run code after some delay in Flutter?](https://stackoverflow.com/questions/49471063/how-to-run-code-after-some-delay-in-flutter)