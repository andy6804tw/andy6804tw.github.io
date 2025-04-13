---
layout: post
title: '透過乙太網路線連接 Jetson Nano Orin 並使用 SSH 存取'
categories: 'Linux'
description: 'Connect Jetson Nano Orin via Ethernet and access it using SSH with a static IP.'
keywords: 'Jetson Nano Orin, Ethernet, SSH, static IP, point-to-point'
---

## 前言
本教學將協助你透過一條網路線，直接將 Jetson Nano Orin 與你的電腦建立「點對點（P2P）」乙太網路連線，並以固定 IP 模式登入裝置，適用於開發測試環境、無 Wi-Fi 的場景。

## 前置準備

- 你的電腦（Windows / macOS / Linux）
- 一條 RJ-45 網路線
- 一台 Jetson Nano Orin（已安裝 JetPack，建議有螢幕/鍵盤先做初始設定）



## IP 規劃

| 裝置        | IP 位址         | 說明             |
|-------------|------------------|------------------|
| 電腦         | 192.168.1.1       | 手動設定          |
| Jetson Nano | 192.168.1.10      | 手動設定          |



## 步驟說明

### 步驟 1：用網路線將 Jetson Nano Orin 接上電腦

請直接使用網路線（非經由 Router），將 Jetson Nano Orin 直接接到你的電腦的乙太網路孔。



### 步驟 2：設定 Jetson Nano 的 IP 為 `192.168.1.10`

1. 在 Jetson Nano 上開啟終端機（或使用螢幕/鍵盤登入）
2. 查詢網路裝置名稱（例如 `enP8p1s0`）：

```bash
nmcli connection show
```

會顯示類似：

```
NAME                UUID                                  TYPE      DEVICE
Wired connection 1  e4327a1d-314f-3002-a469-630ca260022d  ethernet  enP8p1s0
```

3. 設定靜態 IP 為 `192.168.1.10`：

```bash
sudo nmcli connection modify "Wired connection 1" ipv4.addresses 192.168.1.10/24
sudo nmcli connection modify "Wired connection 1" ipv4.method manual
sudo nmcli connection up "Wired connection 1"
```

> 如果找不到名稱，也可以用裝置名稱（如 enP8p1s0）取代。

**設定完成後的檢查：**

```
ip addr show enP8p1s0
```

你應該會看到類似這樣的結果：

```
inet 192.168.1.10/24
```


### 步驟 3：設定電腦端 IP 為 `192.168.1.1`

#### Windows 設定方式：

1. 開啟「控制台」 >「網路和共享中心」>「變更介面卡設定」
2. 找到「乙太網路」> 右鍵 >「內容」
3. 點選「IPv4」>「內容」
4. 選擇「手動設定」，輸入：

   - IP 位址：`192.168.1.1`
   - 子網路遮罩：`255.255.255.0`

#### macOS 設定方式：

1. 前往「系統設定」>「網路」
2. 選擇乙太網路（或 USB LAN）
3. 設定為「手動」，輸入：

   - IP 位址：`192.168.1.1`
   - 子網路遮罩：`255.255.255.0`

#### Linux (Ubuntu) 設定方式：

```bash
sudo ip addr add 192.168.1.1/24 dev eth0
```

（或使用 Network Manager GUI 設定固定 IP）


### 步驟 4：測試連線與 SSH
這時候就可以從你的電腦端（設成 192.168.100.1）來 ping 這台 Jetson：

在電腦終端機中執行：

```bash
ping 192.168.1.10
```

成功的話，就能使用 SSH 登入 Jetson：

```bash
ssh ubuntu@192.168.1.10
```