---
layout: post
title: 'Flutter 中的 Isolate 非同步執行序'
categories: 'Flutter'
description: 'Multithreading in Flutter using Dart isolates'
keywords: 
---

## 前言
在 Flutter 中，Isolate 是一個獨立的運行環境，類似於獨立的執行緒。與 UI 執行緒相比，Isolate 運行在獨立的記憶體空間中，不會被 UI 執行緒阻塞或受到其他運行程序的影響。因此，Isolate 可以更有效地處理高併發或計算密集型的任務，例如圖像處理或數據庫的操作。

- 若執行負擔較小的任務可以直接利用 async function 把這件事延後到 event loop 後面。
- 若有複雜的計算，則是建議將它交給獨立的 isolate 處理完後，再送回主要的 UI 執行緒。


## 建立 Isolate 並接收 function 的回傳值
在 Flutter 中使用 Isolate.spawn 創建新的 Isolate 可以在獨立的執行緒中執行耗時任務的方法，這樣可以避免阻塞 UI 執行緒，使應用程序更加流暢。使用 Isolate 可以將一個函數運行在另一個執行緒中，並使用 SendPort 進行溝通。

以下範例中使用 Isolate 運行一個名為 runMyIsolate 的靜態函數，該函數將接收到的 SendPort 和兩個整數作為參數並解析。最後呼叫 `Isolate.exit` 方法，將計算結果 `a+b` 傳遞回主 Isolate。

```dart
class MyHomePage extends StatelessWidget {
  final String title;

  const MyHomePage({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: TextButton(
        child: const Text("Run Isolate"),
        onPressed: _onPressed,
      ));
    );
  }

  // Callback function for Text Button Event this should be a class member
  void _onPressed() async {
    var receivePort = ReceivePort();
    // Here runMyIsolate methos should be a top level function
    await Isolate.spawn(runMyIsolate, [receivePort.sendPort, 2, 3]);
    final int result = await receivePort.first;
    print('Result: $result');
  }
  
  // We declare a static function here for an isolated callback function
  static void runMyIsolate(List<dynamic> args) {
    var sendPort = args[0] as SendPort;
    final int a = args[1];
    final int b = args[2];
    print("In runMyIsolate");
    Isolate.exit(sendPort, a+b);
  }
}
```

執行結果：
```
I/flutter (12047): In runMyIsolate
I/flutter (12047): Result: 5
```


Isolate 的 callback 方法應該要被宣告在最外層函數或使用靜態(static)方法。不然會在 widget 中出現錯誤訊息。

```
Unhandled Exception: Invalid argument(s): Illegal argument in isolate message: (object extends NativeWrapper - Library:'dart:ui' Class: Path)
```


## 使用更簡單的 Compute 方法
Dart 提供了一個比較容易使用的 compute() function，幫開發者包裝自建 isolate 的繁雜流程。它實際上是對 isolate 之間通信的封裝，每次調用後都會執行 isolate.kill 方法。

```dart
class MyHomePage extends StatelessWidget {
  final String title;

  const MyHomePage({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: TextButton(
        child: const Text("Run Isolate"),
        onPressed: _onPressed,
      ));
    );
  }

  // Callback function for Text Button Event this should be a class member
  void _onPressed() async {
    final int result = await compute(runMyIsolate, [1, 2]);
    print('Result: $result');
  }
  
  // We declare a static function here for an isolated callback function
  static int runMyIsolate(List<dynamic> args) {
    final int a = args[0];
    final int b = args[1];
    print("In runMyIsolate");
    return a + b;
  }
}
```

執行結果：
```
I/flutter (12047): In runMyIsolate
I/flutter (12047): Result: 5
```

## 番外: 創建Future的另外一種方式：Completer
completer可以用來創建future，相比使用future，completer可以自己指定future的完成時機。它不是一個獨立的執行緒，而是用於在當前執行緒中創建一個 future 對象，用於異步操作的完成通知。由於 Completer 並不是一個獨立的執行緒，它運行在當前執行緒中，通常是 UI 執行緒中。

在以下例子中，我們首先創建了一個 Completer 對象，然後模擬了一個耗時的異步操作，3秒後通過 complete 方法返回了一個結果。最後，我們使用 await 關鍵字等待異步操作完成，並獲取結果。當異步操作完成後，Completer 對象會通過 future 屬性返回一個 future 對象，我們可以通過 await 來等待 future 對象的完成。
```dart
import 'dart:async';

void main() async {
  // 創建一個 Completer 對象
  final completer = Completer<String>();

  // 模擬一個異步操作，3秒後返回一個結果
  Future.delayed(Duration(seconds: 3), () {
    completer.complete('Hello, world!');
  });

  // 等待異步操作完成，並獲取結果
  final result = await completer.future;
  print(result);
}
```

> 如果在 Completer 中進行了耗時的操作，會導致 UI 阻塞，影響用戶體驗。為了避免這種情況，通常會將耗時的操作放到獨立的 Isolate 中進行，這樣可以避免 UI 阻塞，提高應用程序的性能和響應速度。

## 小結
簡單來說 Isolate 像是個單執行緒的程序，而 Flutter 主要的程序都是在 main isolate 中完成的。如果真的想要讓某些工作能夠同時進行，不要卡住 main isolate 的話，就要自己宣告新的 isolate 來執行。另外在 Ｆlutter 中可以直接使用更方便的 compute 函數實現 isolate 間的通信，來增加程式的可讀性。

## Reference
- [stackoverflow: illegal-argument-in-isolate-message](https://stackoverflow.com/questions/71406166/unhandled-exception-invalid-arguments-illegal-argument-in-isolate-message)
- [medium: Flutter 的 async 與 isolate](https://danielkao.medium.com/%E5%B9%BB%E6%BB%85-%E6%98%AF%E6%88%90%E9%95%B7%E7%9A%84%E9%96%8B%E5%A7%8B-flutter-%E7%9A%84-async-%E8%88%87-isolate-2f87321a7ba8)
- [flutter入門之理解Isolate及compute動畫範例展示](https://www.twitch.tv/38fish)