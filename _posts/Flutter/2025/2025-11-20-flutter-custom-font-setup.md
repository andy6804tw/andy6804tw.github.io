---
layout: post
title: '在 Flutter 中使用自訂字型'
categories: 'Flutter'
description: 'Flutter custom font setup guide.'
keywords: 'Flutter, fonts, GoogleFonts, UI, mobile'
---

## 前言
本篇文章將帶您一步步完成從 Google Fonts 下載您喜歡的字型，並在您的 Flutter 專案中進行設定與使用的完整流程。

#### 步驟一：從 Google Fonts 尋找與下載字型

Google Fonts 是一個龐大且免費的字型資源庫，是開發者的好朋友。

1.  **前往 Google Fonts 網站**：
    打開瀏覽器，進入 [https://fonts.google.com/](https://fonts.google.com/)

2.  **搜尋您喜歡的字型**：
    您可以使用上方的搜尋框尋找特定字型。在這篇文章中，我們以廣受歡迎的「**Noto Sans TC**」 (思源黑體 - 繁體中文) 作為範例。

3.  **下載字型家族 (Download Family)**：
    點擊進入字型頁面後，您會看到該字型的各種樣式（粗細、斜體等）。在頁面的右上角，會有一個「Download family」的按鈕，點擊它來下載整個字型家族的 `.zip` 壓縮檔。

4.  **解壓縮檔案**：
    下載完成後，將 `.zip` 檔案解壓縮。您會看到一系列 `.ttf` (TrueType Font) 或 `.otf` (OpenType Font) 結尾的檔案，這些就是我們需要的字型檔。通常檔名會標示字體的粗細，例如 `NotoSansTC-Regular.ttf`、`NotoSansTC-Bold.ttf` 等。

#### 步驟二：將字型檔案加入您的 Flutter 專案

接下來，我們需要將字型檔放到專案中，讓 Flutter 能夠找到它們。

1.  **在專案根目錄建立 `fonts` 資料夾**：
    這是一個約定俗成的做法，能幫助您更好地管理專案資源。您也可以命名為 `assets/fonts`。

2.  **複製字型檔案**：
    從剛剛解壓縮的資料夾中，挑選您需要的 `.ttf` 檔案，並將它們複製到您剛建立的 `fonts` 資料夾中。

    您的專案結構看起來會像這樣：
    ```
    your_flutter_project/
    ├── fonts/
    │   ├── NotoSansTC-Regular.ttf
    │   └── NotoSansTC-Bold.ttf
    ├── lib/
    ├── pubspec.yaml
    └── ... 其他檔案
    ```

#### 步驟三：在 `pubspec.yaml` 中註冊字型

為了讓 Flutter 知道這些字型檔案的存在以及如何使用它們，我們必須在 `pubspec.yaml` 這個重要的設定檔中進行宣告。

1.  **打開 `pubspec.yaml`**：
    這是您專案的命脈，掌管著所有依賴套件與資源設定。

2.  **找到 `flutter` 區塊**：
    在檔案中找到 `flutter:` 這個區塊。

3.  **加入 `fonts` 設定**：
    在 `flutter:` 區塊底下，仿照以下格式加入 `fonts` 的設定。

    > **⚠️ 特別注意**：`pubspec.yaml` 對縮排非常敏感！請務必使用**空格**而非 Tab，並確保縮排層級正確。`fonts:` 應與 `uses-material-design:` 對齊，`- family:` 比 `fonts:` 多兩個空格，`fonts:` (第二個) 又比 `- family:` 多兩個空格，`- asset:` 則與 `fonts:` (第二個) 對齊。

    ```yaml
    flutter:
      uses-material-design: true

      # ... 其他 assets 設定 ...

      # 註冊字型的區塊
      fonts:
        - family: Noto Sans TC
          fonts:
            - asset: fonts/NotoSansTC-Regular.ttf
            # 如果也想使用粗體，可以這樣設定
            - asset: fonts/NotoSansTC-Bold.ttf
              weight: 700 # 700 代表粗體 (bold)
    ```

    **設定說明**：
    *   `family`: 這是在 Dart 程式碼中將要使用的字型家族名稱，您可以自行命名，但建議使用字型本身的名稱以方便記憶。
    *   `asset`: 指向您放在專案中的字型檔案路徑。
    *   `weight`: (可選) 指定該字型檔案對應的粗細程度。Flutter 定義了從 100 到 900 的粗細值，其中 400 為 `normal`，700 為 `bold`。

    weight 不是隨便填的！ Flutter 採用標準字重表：

    | 字重        | 數值  |
    | --------- | --- |
    | Regular   | 400 |
    | Medium    | 500 |
    | SemiBold  | 600 |
    | Bold      | 700 |
    | ExtraBold | 800 |
    | Black     | 900 |
    
    如果你放了多個粗細，務必用 weight 讓 Flutter 正確對應，否則可能會出現 “假粗體（fake bold）”。

4.  **儲存檔案並取得依賴**：
    儲存 `pubspec.yaml` 後，您的 IDE (如 VS Code 或 Android Studio) 通常會自動執行 `flutter pub get`。如果沒有，請手動在終端機中執行此命令。

#### 步驟四：在 App 中使用字型

萬事俱備，只欠東風！現在我們可以在程式碼中套用新字型了。

##### 方法一：全域設定 (推薦)

最有效率的方式是將字型設定為整個 App 的預設字型。這樣一來，除非特別指定，所有文字都會使用您設定的字型。

在您的 `lib/main.dart` 中，找到 `MaterialApp` Widget，並在其 `theme` 屬性中設定 `fontFamily`：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Custom Fonts Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        // 在這裡設定全域字型！
        // 名稱必須與 pubspec.yaml 中定義的 family 名稱完全一致
        fontFamily: 'Noto Sans TC',
      ),
      home: const MyHomePage(),
    );
  }
}
```

##### 方法二：針對特定 Widget 設定

如果您只想在特定的地方（例如標題）使用自訂字型，可以在 `Text` Widget 的 `style` 屬性中單獨指定。

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text(
      '預設字體',
    ),
    SizedBox(height: 20),

    Text(
      'Noto Sans TC Regular 思源體一般',
      style: TextStyle(
        fontFamily: 'Noto Sans TC',
        fontWeight: FontWeight.w400, // Regular
        fontSize: 20,
      ),
    ),
    SizedBox(height: 20),

    Text(
      'Noto Sans TC Bold 思源體粗體',
      style: TextStyle(
        fontFamily: 'Noto Sans TC',
        fontWeight: FontWeight.w700, // Bold
        fontSize: 20,
      ),
    ),
  ],
);
```

#### 最後一步：重新啟動 App

在完成程式碼修改後，**請務必完全停止並重新啟動 (Hot Restart 或 Stop + Run) 您的 Flutter App**。僅使用熱重載 (Hot Reload) 可能無法讓字型設定生效。

<img src="/images/posts/Flutter/2025/img1141120-1.jpg" width="300">


## 常見問題（FAQ）

### ❓ Regular 一定要寫 weight: 400 嗎？

不一定，但如果你放多個字重（如 Regular + Bold），建議明確寫 weight，Flutter 才能正確匹配。

### ❓ weight 可以隨便寫嗎？

不能。
它必須對應標準字重表，否則 Flutter 無法選到正確的字型檔。

### ❓ 更新字型後，Hot Reload 為什麼沒效？

字型變更需要 **Hot Restart** 或 **Stop → Run** 才能生效。

---

## 小補充：更快的方法（GoogleFonts 套件）

如果你不想手動下載字型，也可以直接用套件：

```yaml
dependencies:
  google_fonts: ^6.0.0
```

使用方式：

```dart
Text(
  '使用 GoogleFonts 字型',
  style: GoogleFonts.notoSansTc(fontSize: 24),
);
```

但需要注意，這種用法會增加 App 的 bundle 大小。