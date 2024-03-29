---
layout: post
title: 'macOS好用的終端機(iterm2+zsh+oh-my-zsh)'
categories: 'Tool'
description: ''
keywords: tool, iterm2
---


## 安裝 iTerm2
這裡有兩種安裝方式挑一個即可。

#### 1. 官網下載安裝
請到[這裡](https://www.iterm2.com/)點選下載來安裝，當然你也可以使用內建的終端機，iTerm2 僅是終端機(Terminal)集成多了一些好用的功能，還沒用的可以來試試看。

<img src="/images/posts/tool/2018/img1070101-1.png" width="600">

#### 2. 使用 Homebrew 來安裝
如果以下指令不能執行的話先執行這段指令看看 `brew tap caskroom/cask`。

```bash
brew cask instal iterm2 
```

## 設定 iTerm2

#### 1. 修改 Report Terminal Type
點選左上角 `Preferences > Profiles > Terminal > Report Terminal Type`，顏色設為 xterm-256color 色調較為飽滿，此外 iTerm2 會自動儲存你的設定哦。

<img src="/images/posts/tool/2018/img1070101-2.png">

#### 2. 修改 color scheme
想要有個人風格色調的 command line 就來這邊設定，或是到 iTerm2-Color-Schemes[GitHub](https://github.com/mbadolato/iTerm2-Color-Schemes) clone 或下載方式將整包下載下來裡面的 schemes 資料夾有很多配設風格，可以先在 README.md 先找找自己順眼的，確定後到 iterm2 的設定 `Preferences > Profiles > Colors` 點選 import 引入顏色風格，這邊我是選用 `Solarized Dark`。

<img src="/images/posts/tool/2018/img1070101-6.png">
<img src="/images/posts/tool/2018/img1070101-7.png">
<img src="/images/posts/tool/2018/img1070101-8.png">


#### 3. 修改字型
我們要來安裝包含 icon 的字體之後安裝 zsh 才能正常顯示不會破圖，所以現在就下載 nerd font 吧！首先下第一行指令建立字型的資料夾，才能用 homebrew 安裝字型，brew 上面也有很多字型可以挑，其中我是使用 `hack-nerd-font`。

```bash
brew tap homebrew/cask-fonts  
brew cask install font-hack-nerd-font
```

安裝後就到 Preferences > Profiles > Text > Change Font 來套用你剛下載的字型囉

<img src="/images/posts/tool/2018/img1070101-3.png">

## 安裝 zsh
Z Shell 是一種 Unix shell，它可以用作為交互式的登錄shell，也是一種強大的 shell 腳本命令解釋器。 zsh 可以認為是一種 Bourne shell 的擴展，帶有數量龐大的改進，包括一些 bash、ksh、tcsh 的功能，一樣用 homebrew 來安裝。

```bash
brew install zsh
```

## 安裝 oh-my-zsh
zsh 會快速火紅的原因是有大神寫出 oh-my-zsh 來方便管理 zsh 的設定像是 plugin、alias、theme...等，更多詳細的可以到他們的 [GitHub](https://github.com/robbyrussell/oh-my-zsh) 看，安裝後會是預設的 zsh 介面，可以發現多了 git 資訊。 

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

<img src="/images/posts/tool/2018/img1070101-4.png" width="550">


### 套用主題

##### 1. 開啟`.zshrc`設定檔
安裝 oh-my-zsh 後會在本地建立一個名為 `.zshrc` 的設定檔裡面可以快速做主題設定，首先開啟設定檔案 `vi  ~/.zshrc`。

```bash
## 使用 vim 編輯 .zshrc 設定檔
vi  ~/.zshrc
```

##### 2. 套用主題
進去設定檔後可以看到 `ZSH_THEME="robbyrussell"` 這是 zsh 的預設風格，將設定值改為 `agnoster`，若你想要其他主題也可以到[這裡](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)找一個適合你的。

```bash
## 使用agnoster主題預設為robbyrussell
ZSH_THEME="agnoster"
## 隱藏用戶名稱(user@hostname)
DEFAULT_USER=`id -un`
```
<img src="/images/posts/tool/2018/img1070101-5.png" width="600">

編輯結束後按下 `esc` 再鍵入 `:wq!` 退出編輯模式，重新開啟終端機或是鍵入 `exec $SHELL` 就會立即套用囉。

```bash
// 立即套用
exec $SHELL
```

<img src="/images/posts/tool/2018/img1070101-9.png" width="550">

### 下載powerlevel9k主題
powerlevel9k 風格是承襲 agnoster ，不同的地方是新增了一些小功能像是版控資訊、電池狀態、硬碟狀況、ip位置、時間、還有小圖icon ...等讓使用者自行設定。

##### 1. 安裝 powerlevel9k
由於 powerlevel9k 並非 oh-my-zsh 內建主題，所以要再下載至 `.oh-my-zsh/custom/themes/powerlevel9k` 的資料夾當中。

```bash
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

##### 2. 套用 powerlevel9k 主題

首先開啟設定檔案 `vi  ~/.zshrc`。

```bash
## 使用 vim 編輯 .zshrc 設定檔
vi  ~/.zshrc
```

```bash
# 使用powerlevel9k主題亦可選擇使用agnoster或預設robbyrussell
ZSH_THEME="powerlevel9k/powerlevel9k"
# 隱藏用戶名稱(user@hostname)
DEFAULT_USER=`id -un`
# 含有icon的字型
POWERLEVEL9K_MODE='nerdfont-complete'
# command line 左邊想顯示的內容(資料夾路徑、資料夾讀寫狀態、版本控制資訊)
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir dir_writable vcs) # <= left prompt 設了 "dir"
# command line 右邊想顯示的內容(狀態、時間)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status time)
```

編輯結束後按下 `esc` 再鍵入 `:wq!` 退出編輯模式，重新開啟終端機或是鍵入 `exec $SHELL` 就會立即套用囉，最後結果如下圖是不是更有質感了呢！

```bash
// 立即套用
exec $SHELL
```

<img src="/images/posts/tool/2018/img1070101-10.png" width="600">

