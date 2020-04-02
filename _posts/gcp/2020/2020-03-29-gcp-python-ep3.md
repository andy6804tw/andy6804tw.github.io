---
layout: post
title: '[GCP教學-Python] #3 利用iptable轉發PORT號'
categories: 'GCP'
description:
keywords: 
---

## 本文擬將會學到
GCP 雲端虛擬伺服器提供一個靜態IP然而預設是監聽 `80 PORT`，若今天我寫一支程式要來監聽 `8000 PORT`，直覺就是在我的IP位置後面加上 `:8000`。但在GCP上事情沒你想像中那麼順利，其原因是你沒有設定防火牆規則。為什麼呢？一方面是考慮到資安問題，如果任何 PORT 都對外開放豈不是就把你家門打開了嗎？因此建議有需要在把欲存取的 PORT 打開就好。

這系列影片將會提供兩種方式： 
1. 使用 iptable 指令 
2. 進入 GCP 的防火牆設定並新增規則。

然而本篇文章就來教你如何使用第一種方式快速的將指定的IP對外開放吧！

<iframe width="560" height="315" src="https://www.youtube.com/embed/-T2tTsWBzl0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 將 80 PROT 轉向 8000 PORT
以下指令是將預設的 `80 PORT` 自動導向到指定 PORT 號的指令，這裡以 8000 做示範。各位應該資料通常網路上 IP 位置應該都是預設 80 PORT 吧，更正確來說在 HTTP 連線狀態下是走 `80 PORT`，因此在你瀏覽器下輸入一組IP位置其實就是幫你連線到 `http://XX.XX.XX.XX`。此外在GCP的虛擬機設定應該也有看到下面這個設定吧？

![](/images/posts/gcp/2020/img1090329-1.png)

沒錯在建立虛擬機時我們已經允許 `80 PORT` 被開啟，這代表的是一般使用者只要知道主機位置就能直接做資料存取囉！通常 `80 PORT` 是拿來部署靜態網頁的，大家可能聽過[Nginx](https://www.nginx.com/)，藉由他來做Web伺服器以及反向代理伺服器。如果要部署 API 的朋友建議還是參考下一篇文章作法更好。(除非你這一台主機只執行你這一支API)

`iptables` 有內建連接埠轉送 (port forwarding) 的功能，輸入以下兩個指令便可將 `80 PORT`  導到指定 PORT 號：

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000
```

`PREROUTING` 規則會在封包進到介面卡的時候執行，也就是在從其他電腦連線進來的時候才會將外部要連到 `80 PORT`(--dport) 的連線轉送到 `8000 PORT`

上面指令是當外網連到主機時所進行的轉阜號動作，接下來要利用 OUTPUT 的規則，把從本機連到自己 (-d localhost)。

```bash
sudo iptables -t nat -A OUTPUT -p tcp -d localhost --dport 80 -j REDIRECT --to-ports 8000
```