---
layout: post
title: 'Raspberry Pi 連線至隱藏網路'
categories: 'Linux'
description: 'How to auto-connect your Raspberry Pi to a hidden SSID wifi network'
keywords: 
---

## 前言
本篇文章將教各為如何在樹莓派 Linux 環境下進行網路設定，使的 Pi 能夠順利連接到隱藏網路。

## 確認連線國家
首先進入系統的`偏好設定 -> Raaspberry Pi 設定`。開始視窗後點選`在地化`，並找到`設定 WiFi 國家`選擇。

![](/images/posts/linux/2022/img1110926-1.png)

## 設定隱藏網路
接著輸入以下指令修改 `wpa_supplicant.conf` 檔案。

```sh
sudo vim /etc/wpa_supplicant/wpa_supplicant.conf
```

在該文件中加入以下內容，並在雙引號內填入你要連接的 WiFi 資訊。其中連接隱藏 WiFi 時需要指定 `scan_ssid=1` 為1。

```
network={
        ssid="wifi 的 SSID"
        scan_ssid=1
        psk="wifi 的密碼"
        key_mgmt=WPA-PSK
}
```


## Raference
- [How to auto-connect your Raspberry Pi to a hidden SSID wifi network](https://mahirmax.blogspot.com/2018/03/raspberry-pi-wifi-ssid-how-to-auto.html)
- [關於樹莓派 Pi 3A+ no wireless interface found 問題](http://yhhuang1966.blogspot.com/2020/05/pi-3a-no-wireless-interface-found.html)