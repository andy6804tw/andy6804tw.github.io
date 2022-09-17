---
layout: post
title: 'C++ 透過系統指令實現 HTTP Request'
categories: 'C++'
description: 'HTTP request in c++'
keywords: 
---

## 前言
此方法透過 system 的方法呼叫 CURL 實現 HTTP Request GET 通訊協定。並將回應結果透過文件寫檔輸出一個名為 `data.txt` 的文件。最後在透過 `getline` 方法讀檔取得 API 回應的結果。

## 實作
你可以在 url 變數雙引號內貼上想要存取的 API 路徑。本範例中使用一個公開的測試 API(擲骰子)。透過 GET 協定存取該 API 將會回傳隨機 1~6 的數值作為回應結果存在文件中。

```c
#include <iostream>
#include <fstream>
#include <string>

using namespace std;
int main() {
  string text;
  string url;
  url = "curl -o data.txt \"https://api.toys/api/dice_roll\"";
  system(url.c_str());// 執行系統指令
  string res;
  ifstream file("data.txt");// 讀取 data.txt 取得回應資訊
  while (getline (file, res)) {
    cout << res << endl;
  }
  file.close(); 
  remove("data.txt");// 移除檔案
  cout << "Done\n";
}
```

將上述程式碼放在 `main.cpp` 中，並使用以下指令進行編譯：

```
g++ -o main main.cpp
```

編譯完成後將會看到 `main`(Windows 會看到 main.exe)。

執行結果：

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    25    0    25    0     0     18      0 --:--:--  0:00:01 --:--:--    18
{"dice":"d6","rolls":[1]}
Done
```

若想實現 POST 通訊協定，各位不妨可以在撰寫 API 時一樣的用 GET 路由，並採用 `url parameter` 去接收參數資料。例如：

```
http://127.0.0.1:3000/predict?age=21&phone=123456
```

## Reference
- [How to make an HTTP request in c++ within 20 lines of code.](https://replit.com/talk/learn/How-to-make-an-HTTP-request-in-c-within-20-lines-of-code/120930)