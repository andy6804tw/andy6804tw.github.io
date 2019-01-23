---
layout: post
title: '[Linux系統] ubuntu利用SSH安全加密連線遠程登錄'
categories: 'Other'
description: 
keywords:
---

## 前言
ssh–secure shell(SSH)，提供安全的遠程登錄。缺點只在於他是個終端介面的遠端連線，並沒有一個GUI介面進行操作，不過既然都使用 Linux 系統了就來享受打指令的世界吧！哈。此外使用 SSH 優點在於他是在安全加密的狀況下進行傳輸，相對於其他第三方鏡像遠端桌面控制軟體更來的安全。

## 安裝 openssh-server
如果你只是想登陸別的機器的 SSH 只需要安裝 `openssh-client`（ubuntu有默認安裝），如果要使本機開放SSH服務就需要安裝openssh-server。

查看當前的ubuntu是否安裝了ssh 服務。

```bash
dpkg -l | grep ssh
```

![](/images/posts/other/2019/img1080123-01.png)

ubuntu 通常會默認安裝 `openssh-client`，若無則使用以下指令安裝:

```bash
sudo apt-get install openssh-client
```

若要讓其他電腦連線到你的 ubuntu 系統就必須安裝 `openssh-server` 服務，以下指令安裝：

```bash
sudo apt-get install openssh-server
```

都安裝好後再次再次查看安裝的服務：

```bash
dpkg -l | grep ssh
```
安裝好後你會發現多了 `openssh-server`

![](/images/posts/other/2019/img1080123-02.png)

最後確認ssh-server是否啟動了：

```bash
ps -e | grep ssh
```

![](/images/posts/other/2019/img1080123-03.png)

如果看到sshd那說明ssh-server已經啟動了。
如果沒有則可以輸入以下指令啟動：

```bash
sudo /etc/init.d/ssh start
或
sudo service ssh start 
```

## 測試登陸SSH
測試環境為 MacOS 使用 SSH 服務進入到我的遠端 Linux 主機中。指令為以下範例，你要更換成你的 username 與 IP 位置。首次登入會要求你產生 SHA256 指紋作為辨識用戶裝置的憑證。完成後就能成功連線到遠端主機中囉！若要離開輸入 `exit` 即可。

```bash
ssh username@192.168.1.2 
```

![](/images/posts/other/2019/img1080123-04.png)
