---
layout: post
title: '[Linux系統] 實體機利用iptable轉發PORT號'
categories: 'Other'
description: 
keywords:
---

## 前言
之前有一篇[[Linux系統] 利用iptable轉發PORT號]('/_posts/other/2018/2018-03-14-linux-iptable.md)已經說明如何在雲端虛擬機利用 `iptable` 轉監聽的 PORT 號。這一篇是要教你如何在實體機的 Linux 系統上做相同的事情，其實做法一樣也是利用 `iptable` 只是因為實體機可能會自己連到自己所以要做 OUTPUT 的規則，把從本機連到自己。


## 將 80 PROT 轉向 8000 PORT
假設你已經寫好一隻 server 並監聽 8000 PORT 後，接下來我們要利用 `iptables` 來將連接到 80 PORT 的連線轉送到 8000 PORT。

iptables 有內建連接埠轉送 (port forwarding) 的功能，輸入以下指令便可將 port 80 導到 port 8000：

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000
```

`PREROUTING` 規則會在封包進到介面卡的時候執行，也就是在從其他電腦連線進來的時候才會將外部要連到 80 PORT(--dport) 的連線轉送到 8000 PORT

上面指令是當外網連到主機時所進行的轉阜號動作，接下來要利用 OUTPUT 的規則，把從本機連到自己 (-d localhost)。

```bash
sudo iptables -t nat -A OUTPUT -p tcp -d localhost --dport 80 -j REDIRECT --to-ports 8000
```

ref: http://lzh9102.github.io/2013/10/22/iptables-port-forwarding/
