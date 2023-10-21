---
layout: post
title: '使用 Google App Script 將 Google 試算表變成資料庫'
categories: 'Web'
description: 
keywords:
---


## 前言
此篇教學使用 Google App Script，將前端的表單資料寫入雲端硬碟中的 Google Sheets 當中。透過此方法我們就不需要建立後端資料庫來儲存這些表單資料。

![](https://i.imgur.com/uEvWR8o.png)

## 建立 Google 雲端試算表
首先開啟[雲端硬碟](https://drive.google.com/)建立一個空白的試算表。在空白處點選右鍵即可新增一個Excel試算表。

![](/images/posts/web/2020/img20200804-1.png)

這邊範例為GAS表單測試。可以在第一行寫入你要收集資料的欄位名稱，這裏的範例是要搜集使用者的`姓名`和`信箱`。

![](/images/posts/web/2020/img20200804-2.png)

## 建立 Google App Script
首先可以先進入到 [Google Apps Script](https://script.google.com/home/start) 服務(以下簡稱 GAS)。服務介面類似於 Google 雲端硬碟。在這邊就可以撰寫你的 GAS 函式並部署執行。簡單來說 GAS 是一種serverless服務，即 Google 會在服務背後提供伺服器運行。使用者只要撰程式碼並部署，即可在一個獨立的伺服器上運行你的程式。

![](/images/posts/web/2020/img20200804-3.png)

點選新的空白專案就會開啟 GAS 的編輯界面。就可以來撰寫API囉，首先函數名稱設為 `doPost` 代表 API method 爲 Post。接著我們要使用 SpreadsheetApp 類別初始化試算表，在圖片灰色框框輸入你的試算表 id。id 就是 Google Sheet 網址列 https://docs.google.com/spreadsheets/d/ 以後至 edit 中間的代碼。

![](/images/posts/web/2020/img20200804-4.png)

```js
function doPost(e) {
  // 取得輸入參數
  let params = e.parameter; 
  let name = params.name;
  let mail = params.mail;
 
  // 初始化試算表
  let SpreadSheet = SpreadsheetApp.openById("輸入你的試算表 id");
  let Sheet = SpreadSheet.getSheets()[0]; // 指定第一張試算表
  let LastRow = Sheet.getLastRow(); // 取得最後一列有值的索引值

  // 寫入試算表
  Sheet.getRange(LastRow+1, 1).setValue(name);
  Sheet.getRange(LastRow+1, 2).setValue(mail);
  
  // 回傳結果
  return ContentService
  .createTextOutput(JSON.stringify({ result: '成功', version: '1.0' }))
      .setMimeType(ContentService.MimeType.JSON); 
}
```

程式撰寫完畢後就能部署我們的 GAS。點選發布→部署為網頁應用程式。將具有應用程式存取權的使用者改爲 `任何人，甚至是匿名使用者`。

![](/images/posts/web/2020/img20200804-6.png)

## 使用 Postman 測試
Postman 是一個能夠模擬 HTTP Request 的工具能夠讓你簡單快速的測試你的 API。此工具內建包含很多 HTTP 的請求方式，例如常見的的 GET(取得)、POST(新增)、PUT(修改)、DELETE(刪除)。GAS 發布後會給你一串 API 網址，這個網址就能拿來做存取。

![](/images/posts/web/2020/img20200804-5.png)

![](/images/posts/web/2020/img20200804-7.png)

## 讀取 sheet 所有資料
剛剛已經成功地將資料透過 POST 方法將每一筆資訊塞入 Google Sheet 當中。接著我們可以透過 Get 方法將所有的資料讀取出來。此功能就類似於 SQL 中的 Select() 表格。在這個方法當中我們在該 Sheet 建立了一個 `tabel1` 的頁籤，因此可以透過 `getSheetByName` 取得該頁面的所有內容。或是可以仿造上面 Post 的寫法 `let Sheet = SpreadSheet.getSheets()[0];` 直接指定第一個頁面的內容。

```js
function doGet() {
    // 1. SpreadsheetApp -> Spreadsheet 
    var id = '10HBDXodn4MDqcfJ6Tq8zHVeQY-BoBNp6s3ZXEoDQRIc';
    var spreadsheet = SpreadsheetApp.openById(id);
    // 2. Spreadsheet -> Sheet 
    var name = 'table1';
    var sheet = spreadsheet.getSheetByName(name);
    // retrieve the first row as the header containing item name 
    // 3. + 4. Sheet -> Range -> Value 
    var item_range = sheet.getRange('1:1')
        .getValues();
    // retrieve the first column as the list of keys of each data row 
    // 3. + 4. Sheet -> Range -> Value 
    var key_range = sheet.getRange('A2:A')
        .getValues();
    var items = [];
    var keys = [];
    for (var idx in item_range[0]) {
        // neglect if the value is an empty string
        if (item_range[0][idx] == '') {
            break;
        }
        items.push(item_range[0][idx]);
    }
    for (var idx in key_range) {
        // neglect if the value is an empty string // @ts-ignore 
        if (key_range[idx] == '') {
            break;
        }
        keys.push(key_range[idx]);
    }
    // the number of data rows 
    var row_number = keys.length;
    // the number of items in data rows 
    var column_number = items.length;
    // get the data excluding the first row (as the item field names) 
    // 3. Sheet -> Range 
    var range = sheet.getRange(2, 1, row_number, column_number);
    var data = [];
    // 4. Range -> Value 
    var values = range.getValues();
    // transform into JSON-like array 
    for (var row = 0; row < row_number; ++row) {
        var row_object = {};
        for (var col = 0; col < column_number; ++col) {
            var item = items[col];
            row_object[item] = values[row][col];
        }
        data.push(row_object);
    }
    // 回傳結果 
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}
```

此寫法會逐一地走訪每個欄位的內容與值，並且轉換成 Json 格式。最終會逐一的存放在變數 `data` 之中。