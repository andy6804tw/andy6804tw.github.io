---
layout: post
title: '[Mac系統] command not found: conda 解決方式'
categories: 'Mac'
description:
keywords: 
---

## 前言
安裝 Anaconda 後在終端機下指令若出現 `zsh: command not found: conda` 的錯誤訊息代表你電所的終端機的環境變數並未設定，因此無法調用  Anaconda 和 Python 所提供的指令。

## 解決方式
以我的電腦為例我是安裝 Mac 的 zsh 所以他會將環境變數寫在 `.zshrc` 檔案中。他的位置在 `~/.zshrc` 你可以用 `vim` 開啟他，指令如下。

```bash
vim ~/.zshrc
```

![](/images/posts/mac/2019/img1080925-1.png)

vim 就是一個文字編輯器，我們必須在 `.zshrc` 中引入 anaconda3 的路徑，使用方向鍵將游標移動到空白處按下 `a` 插入，接著將下面路徑貼上(照片紅框處)。最後按下 `esc` 並輸入 `:wq` 存檔離開。

```bash
export PATH="/anaconda3/bin":$PATH
```
![](/images/posts/mac/2019/img1080925-2.png)

一切完成後重新開啟終端機並測試呼叫 Anaconda 和 Python 指令，若出現版本號代表環境變數引入成功囉！ 

![](/images/posts/mac/2019/img1080925-3.png)


## 後記
因為安裝 Anaconda 時會自動幫你在預設內建的終端機安裝環境路變數，因此你也可以進入 `.bash_profile` 來複製環境變數的設定內容。並貼到 `.zshrc` 中。

```bash
open ~/.bash_profile
```


```
# added by Anaconda3 2019.10 installer
# >>> conda init >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$(CONDA_REPORT_ERRORS=false '/Users/yilin/opt/anaconda3/bin/conda' shell.bash hook 2> /dev/null)"
if [ $? -eq 0 ]; then
    \eval "$__conda_setup"
else
    if [ -f "/Users/yilin/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/yilin/opt/anaconda3/etc/profile.d/conda.sh"
        CONDA_CHANGEPS1=false conda activate base
    else
        \export PATH="/Users/yilin/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda init <<<
```

接著打開 `.zshrc` 並貼上

```bash
open ~/.zshrc
```

最後要重新啟動 `iTerm`
```bash
source ~/.zshrc
```