---
layout: post
title: '[mac系統] 清除系統上被佔用的Port'
categories: 'Mac'
description:
keywords: 
---


## 如何清除系統上被佔用的Port?
相信各位在 Server 系統上常會發生這個問題，常常要啟動某個 Port 時會出現無法監聽的情況，為什麼會這樣？原因在於可能先前你的執行環境中有執行監聽此 Port 號並無正確的釋放，例如程式 Crash 或是拋出例外 ......等，所以發生此問題時先查詢該 Port 所佔用的排程序號(PID)，再以這個序號清除資源就能解決此問題了。

- 查詢 PID 

```bash
// 查詢 Port:3000 狀態 
sudo lsof -i:3000 
```

在終端機輸入此指令後應該會出現下列格式資訊，其中 32952 為你的 PID。

```
COMMAND   PID     USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
vpnkit  32952    yilin   22u  IPv4 0xa7d3c3f8be099a63      0t0  TCP *:3000 (LISTEN)
vpnkit  32952    yilin   23u  IPv6 0xa7d3c3f8aa7a227b      0t0  TCP localhost:3000 (LISTEN)
```

- 清除 PID

使用 kill + PID 就能將此排程從背景釋放，就能解決 Port 被佔用的問題了！

```bash
kill 32952
```
