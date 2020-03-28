

## 何謂 Git flow

Git flow 腳本自動化流程能夠執行多個git指令

很多人開發就會有一個流程，Git flow是大家所訂定出來的規範

- master 分支

在 Git flow 主要有兩個分支，第一個是穩定的分支 `master` 也是最主要分支，此外在 git flow 中我們不能在 `master` 上做 `commit` 的動作，只允許做 `merge` 合併。

- develop 分支

第二個分支是 `develop` ，是由 master 分支分出來的，`develop` 分支專門合併整合即將發布的功能(feature)。

- feature 分支

開發中會有很多的分支我們稱它 `feature` 假如 `feature` 被完成了他就會被 merge 回 `develop` 分支，而 `develop` 分支就是來統整這些已完成的 `feature`。

- Release 發布
當 `develop` 內的功能已經完成的差不多而且是一個穩定版本了我們就可以將它進入 `release` 分支下做一個完整性的測試以及上版本紀錄，完成 `release` 後即可 merge 合併回 `develop` 與 `master` 分支，此外值得一提的是 `release` 是一次性的分支也就是說合併完成後該分支會自己消失。

- Hotfix 分支

此分支是由 `master` 主分支所分出來的，使用的時機是假使當你已經完成上線發佈了但遇到一個非常重大的bug時，這時我們就會開出一個 `hotfix` 分支出來來修復這個 bug，若完成修復後我們再 merge 合併回 `develop` 與 `master` 分支。

## 安裝 git flow

#### mac OS
使用 Homebrew 安裝

```bash
brew install git-flow-avh
```

#### Linux

```bash
apt-get install git-flow
```

#### Windows

```bash
wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash
```
