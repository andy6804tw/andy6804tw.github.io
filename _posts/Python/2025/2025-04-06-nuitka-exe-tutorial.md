---
layout: post
title: 'Nuitka 打包工具教學：把 Python 程式變成獨立的執行檔'
categories: 'Python'
description: 'A simple guide to convert Python scripts into standalone executables using Nuitka.'
keywords: 'Python, Nuitka, packaging, executable, compiler'
---

## 前言
對許多 Python 新手來講，一直都有個疑問──「我寫好的程式怎麼才能讓沒安裝 Python 的朋友也能直接執行呢？」  
不像 C++ 可以編譯成 exe 或是 JS 直接在瀏覽器執行，Python 程式必須靠 Python 解釋器來運行，而大部分作業系統預設都沒有安裝 Python。這時候，打包工具就登場啦！

## 為什麼要打包？

一般分享 Python 程式，除了要求對方先安裝好 Python 解釋器外，還得考慮相依性問題。打包工具可以：

- 將 Python 解釋器與程式碼一起打包
- 自動收集程式所需的第三方模組和資源
- 讓生成的執行檔在沒有安裝 Python 的電腦上也能執行

## Python 打包執行檔工具比較：Nuitka、PyInstaller 與 cx_Freeze

在 Python 應用程式的發佈流程中，將原始碼打包成獨立執行檔是常見需求。目前市面上常見的打包工具主要有 **Nuitka**、**PyInstaller** 與 **cx_Freeze**。  
**Nuitka** 不僅是一個打包工具，更是一個真正的 Python 編譯器，它會將 Python 程式轉譯成 C/C++ 代碼，再編譯成原生機器碼，藉此達到一定的效能提升與程式碼保護，但使用上設定較複雜且編譯時間較長。  
相比之下，**PyInstaller** 則是較受歡迎的工具之一，它能自動分析程式的相依性，將 Python 直譯器及所有必需的模組打包成一個單一或多檔案的執行檔，操作簡單且跨平台支援完善，但產生的執行檔通常較大且效能與原生 Python 相似。  
**cx_Freeze** 也屬於打包工具，它將程式碼和相依庫整理成一個資料夾或執行檔，設定上較為簡單且穩定，但在處理複雜相依性時有時候需要額外調整，功能與社群支援則稍遜於 PyInstaller。

| 工具名稱      | 打包方式與運作原理                                    | 是否轉譯成原生機器碼            | 依賴性及獨立性                             | 平台支援               | 優點                                                         | 缺點                                                         |
|---------------|-------------------------------------------------------|---------------------------------|-------------------------------------------|------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| **Nuitka**    | 將 Python 程式轉譯成 C/C++ 代碼，再由編譯器生成原生執行檔  | 部分轉譯：大部分程式碼編譯成機器碼，但部分仍依賴 Python 標準庫 | 可產生獨立執行檔，但需要 C/C++ 編譯器及較多設定 | Windows、Linux、macOS  | 效能提升、保護原始碼、最終產品可達獨立執行檔              | 使用門檻較高、設定複雜、編譯時間較長                         |
| **PyInstaller** | 分析相依性，將 Python 原始碼、直譯器及模組打包成單一或多檔執行檔 | 否：以 Python bytecode 執行       | 內嵌 Python 直譯器，不需要使用者另外安裝 Python | Windows、Linux、macOS  | 設定簡單、使用方便、跨平台支援廣、社群資源豐富              | 執行檔體積大、效能與原生 Python 相同、偶有相依性偵測問題       |
| **cx_Freeze** | 將程式碼與相依庫打包成一個資料夾或可執行檔               | 否：依然執行 Python bytecode      | 封裝所有必需檔案，不需另外安裝 Python       | Windows、Linux、macOS  | 設定較簡單、打包結果穩定、可調整性佳                         | 功能不如 PyInstaller 完善、文件與社群資源稍遜、較大型應用需額外調整 |

以下是針對這三個工具的使用時機簡單總結：

- **Nuitka**：  
  適合在發佈階段需要較高效能與較嚴謹原始碼保護的情境，當你希望把 Python 程式轉譯成接近原生的執行檔，而且不介意較複雜的設定與較長的編譯時間時，Nuitka 是不錯的選擇。

- **PyInstaller**：  
  適合希望快速、簡單地封裝應用程式，讓終端使用者免除安裝 Python 環境的需求。它操作簡便、跨平台支援廣，但執行檔體積較大，適合不強調效能而重視部署方便的場合。

- **cx_Freeze**：  
  適合對打包結果穩定性與可調整性有需求的情境。若你的應用程式相依性較簡單，並希望打包過程更為輕量化，同時接受文件與社群資源可能不如 PyInstaller 豐富的情況下，cx_Freeze 是一個實用的選擇。


## Nuitka 是什麼？

Nuitka 是一個將 Python 程式碼轉換成 C 語言，再透過 C 編譯器編譯成機器碼的工具。它不僅僅是打包工具，還能夠利用 C 編譯器優化程式執行效率。使用 Nuitka 有以下幾個優點：

- **獨立性**：利用 `--standalone` 參數，把所有依賴都打包進去，讓執行檔可以在沒安裝 Python 的系統上運行。
- **單檔封裝**：使用 `--onefile` 參數，將所有文件合併成一個 exe 檔，更方便發佈。
- **效能提升**：由於底層轉成 C 語言再編譯，所以在 CPU 密集型運算上會有明顯加速效果。

## 基本安裝與使用

首先，要先用 pip 安裝 Nuitka：

```bash
pip install nuitka
```

安裝完畢後，打包指令就很簡單，例如要打包 `your_program.py`：

```bash
nuitka --standalone --onefile your_program.py
```

這樣生成的 exe 程式會包含 Python 解釋器與所有依賴檔案，可以在其他沒有安裝 Python 的 Windows 系統上直接執行。

> **小提醒**：如果你的程式中有使用到外部資源（例如圖片、音樂檔案等），記得使用 `--include-data-files` 或 `--include-data-dir` 等參數，讓這些檔案也能被正確打包進去。

以下整理常用的參數:

| 參數                         | 說明                                                                                             | 舉例                                                         |
|------------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| `--standalone`               | 建立獨立環境，使打包結果具有可攜性，可在沒有 Python 環境的電腦上運行。                           | N/A                                                          |
| `--onefile`                  | 將所有檔案打包為單一的 exe 檔案，方便分發與部署。                                               | N/A                                                          |
| `--show-progress`            | 顯示編譯過程中的進度資訊，便於了解打包進程。                                                     | N/A                                                          |
| `--remove-output`            | 打包完成後自動刪除產生的臨時檔案，保持輸出目錄的整潔。                                           | N/A                                                          |
| `--windows-disable-console`  | 去除 Windows 執行時的 CMD 視窗，適用於 GUI 應用程式。                                           | N/A                                                          |
| `--follow-import-to=`        | 指定要包含的資料夾，將相關依賴一起打包。                                                         | N/A                                                          |
| `--include-package-data=`    | 包含指定套件名稱中的資料檔案。當 Nuitka 無法正確解析某些 Python 套件所需的資料檔案時使用。         | `--include-package-data=ultralytics`                         |
| `--include-data-files=`      | 按檔案名包含資料檔案。格式為 `<SRC=DEST>`，其中 SRC 為來源路徑，DEST 為檔案在打包結果中的相對路徑。 | `--include-data-files=/Users/admin/Downloads/yolo.onnx=./yolo.onnx` |
| `--include-data-dir=`        | 包含指定資料夾中的所有資料檔案。                              | --include-data-dir=image                                                         |


## Python 範例示範打包：互動式加法應用

這裡我們提供一個範例程式，包含一個 `add` 函式，並透過互動方式要求使用者輸入兩個數值後計算其總和。程式內容如下：

```python
# add.py
def add(a, b):
    return a + b

def main():
    try:
        num1 = float(input("請輸入第一個數字："))
        num2 = float(input("請輸入第二個數字："))
    except ValueError:
        print("輸入錯誤！請輸入正確的數字。")
        return

    result = add(num1, num2)
    print(f"計算結果：{num1} + {num2} = {result}")

if __name__ == '__main__':
    main()
```

### 打包步驟

1. **撰寫程式**：將上述程式碼存成 `add.py` 檔案。

2. **打包指令**：在命令提示字元或終端機中執行以下指令：

   ```bash
   nuitka --standalone --onefile add.py
   ```

3. **生成執行檔**：等待打包完成後，會生成一個獨立的執行檔（例如在 Windows 上就是 `add.exe`），直接執行該檔案，即可啟動互動式加法程式。

## 進階使用與注意事項

- **跨平台支援**：  
  Nuitka 不只支援 Windows，還可以在 macOS 上打包成 .app 應用程式。若要設定 macOS 的應用圖示，可加入參數如 `--macos-appicon=your_icon.icns`，並使用 `--macos-create-appbundle` 等參數來建立應用程式包。

- **錯誤排查**：  
  如果打包過程中遇到錯誤（例如找不到某些資源檔案），請檢查：
  - 程式本身能否正確執行
  - 所有用到的資源檔案是否都有正確指定路徑並加以包含

- **效能優化**：  
  Nuitka 的原理與其他打包工具（如 PyInstaller、cx_Freeze）不同，因為它是先將 Python 轉成 C，再經過編譯，這對需要大量數學運算的程式會有較明顯加速效果。

- **GUI 輔助工具**：  
  由於 Nuitka 的參數非常豐富，市面上也有一些 GUI 輔助工具，讓打包參數設定變得更簡單直覺，適合不熟悉命令列的使用者。

## 小結

Nuitka 是一個功能強大的 Python 打包工具，除了能夠將程式打包成獨立的執行檔，還能藉由轉譯成 C 語言來提升執行效能。不論是簡單的小工具，或是需要處理大量計算的程式，Nuitka 都提供了不錯的解決方案。若在打包過程中遇到困難，也可以試試其他工具（如 PyInstaller），選擇最適合自己需求的方案。
