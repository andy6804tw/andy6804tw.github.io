---
layout: post
title: 'macOS好用的終端機(iterm2+zsh+oh-my-zsh)'
categories: 'Tool'
description: ''
keywords: tool, iterm2
---


## 一、前言

從 macOS Catalina（10.15）開始，蘋果已將 **zsh** 設為預設登入與互動 Shell。
也就是說，若你使用的是 M1、M2 或 M3 晶片的 MacBook，大多數情況下已經不需要再額外安裝 zsh，只需進行美化與環境設定即可。

---

## 二、安裝 iTerm2（取代原生 Terminal）

[iTerm2]((https://www.iterm2.com/)) 是 macOS 上最受歡迎的終端機軟體之一，支援分頁、顏色主題與豐富的自訂功能。

```bash
brew install --cask iterm2
```

安裝完成後，可從 Launchpad 或 Spotlight 搜尋 iTerm2 啟動。

---

## 三、確認你的 Shell

檢查目前的 Shell 是否為 zsh：

```bash
echo $SHELL
```

若顯示結果為 `/bin/zsh`，表示系統已預設使用 zsh。
若仍為 bash，可執行以下指令修改：

```bash
chsh -s /bin/zsh
```

然後重新開啟 iTerm2。

---

## 四、安裝 Oh My Zsh

Oh My Zsh 是一套管理 zsh 設定與主題的框架，讓你的終端環境更強大又美觀。

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

執行後會自動建立以下檔案：

```
~/.oh-my-zsh/
~/.zshrc
```

若你想立即生效，執行：

```bash
source ~/.zshrc
```

---

## 五、安裝字型（Nerd Font）

Powerlevel10k 主題使用 Nerd Font 來顯示特殊圖示。
新版 Homebrew 已整合字體，不再需要 `homebrew/cask-fonts`。

推薦安裝 **Hack Nerd Font** 或 **JetBrains Mono Nerd Font**：

```bash
brew install --cask font-hack-nerd-font
# 或
brew install --cask font-jetbrains-mono-nerd-font
```

### 設定 iTerm2 字型：

1. 開啟 iTerm2 → Settings
2. 選擇 Profiles → Text
3. 點選 Font → 改為 `Hack Nerd Font`

<img src="/images/posts/tool/2018/img1070101-1.png">

---

### 設定 iTerm2 色系
##### 1. 修改 Report Terminal Type
點選左上角 `Settings > Profiles > Terminal > Report Terminal Type`，顏色設為 xterm-256color 色調較為飽滿，此外 iTerm2 會自動儲存你的設定哦。

<img src="/images/posts/tool/2018/img1070101-2.png">

##### 2. 修改 color scheme
想要有個人風格色調的 command line 就來這邊設定，或是到 iTerm2-Color-Schemes[GitHub](https://github.com/mbadolato/iTerm2-Color-Schemes) clone 或下載方式將整包下載下來裡面的 schemes 資料夾有很多配設風格，可以先在 README.md 先找找自己順眼的，確定後到 iterm2 的設定 `Settings > Profiles > Colors` 點選顏色風格，這邊我是選用內建提供的 `Solarized`。

<img src="/images/posts/tool/2018/img1070101-3.png">

## 六、安裝 Powerlevel10k 主題
Powerlevel10k 是 Powerlevel9k 的繼任者，支援 Apple Silicon，速度快又可視化效果佳。

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

修改主題設定：

```bash
open ~/.zshrc
```

找到：

```bash
ZSH_THEME="robbyrussell"
```

改成：

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

儲存後重新載入設定：

```bash
exec $SHELL
```

---

## 七、啟動 Powerlevel10k 設定精靈

第一次開啟 iTerm2 時，Powerlevel10k 會自動啟動互動式設定精靈。
若未出現，可手動執行：

```bash
p10k configure
```

依照指示設定外觀（建議如下）：

* 字型正確顯示圖示 → Yes
* 提示字顏色主題 → 選 “Rainbow” 或 “Lean”
* 顯示時間、Git 狀態 → 可依個人喜好
* 設定完成後會自動建立 `~/.p10k.zsh`

若想直接引用我的風格可以，直接參考我的[設定](https://gist.github.com/andy6804tw/98ef24e29740ee15168a32d016562c01)。直接複製貼上 `~/.p10k.zsh`

```
open ~/.p10k.zsh
```

改完之後：
```
echo $SHELL
```

此時你應該會看到色彩繽紛又乾淨的 Powerlevel10k 介面。
Git 分支、時間、資料夾、命令狀態都會即時顯示。

<img src="/images/posts/tool/2018/img1070101-4.png" width="600">


非常好 👏
你上傳的截圖顯示 VS Code 的字型設定方式很清楚，可以直接補充進你的文章。
以下是建議你加入在 **「五、安裝字型（Nerd Font）」章節底部** 的補充段落文字（已用台灣用語撰寫）：

---

### 後記： VS Code 內建終端機出現破圖的解決方式

如果你在 VS Code 的內建終端機（Terminal）中看到圖示顯示成方框或亂碼，
代表目前 VS Code 終端機的字型沒有設定為 **Nerd Font**。

解決方法如下 

1. 開啟 VS Code，點選左下角的齒輪 ⚙️ → **Settings（設定）**。
2. 搜尋關鍵字：

   ```
   terminal integrated font family
   ```
3. 在欄位中輸入：

   ```
   Hack Nerd Font
   ```

4. 儲存設定後重新啟動 VS Code。

這樣內建終端機的 Powerlevel10k 主題圖示就會恢復正常顯示 

<img src="/images/posts/tool/2018/img1070101-5.png" width="800">
