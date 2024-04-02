---
layout: post
title: '[Mac系統] Mac外接硬碟突然讀不到'
categories: 'Mac'
description: 'Mac外接硬碟讀不到怎麼辦？｜不小心不正確退出就再也抓不到的救法'
keywords:
---

## 前言
平常我習慣使用外接硬碟，但某次電腦休眠後重新開機時，外接硬碟突然無法被識別。透過內建的硬碟工具程式觀察，我發現雖然系統偵測到了外接硬碟，但其名稱以灰色字體顯示。然而，即使在等待一段時間後，桌面上仍未出現外接硬碟的資料夾圖示。我在網路上找到了一些解決方案，參考來源如下。

- [[Youtube] Mac外接硬碟讀不到怎麼辦？｜不小心不正確退出就再也抓不到的救法【阿宅爸爸】](https://www.youtube.com/watch?v=ADdq262DHW4)
- [Mac 無法掛載外接硬碟的救法](https://medium.com/@danielsst/mac-%E7%84%A1%E6%B3%95%E6%8E%9B%E8%BC%89%E5%A4%96%E6%8E%A5%E7%A1%AC%E7%A2%9F%E7%9A%84%E6%95%91%E6%B3%95-4dc0989d3d6)

## 解決方法
首先，檢查這個外接硬碟是否被 fsck 指令佔用了。 請在終端機中輸入以下指令進行檢查。

```sh
ps aux | grep fsck
```

從輸出結果中可以看到，rdisk2s2 現在被 fsck_exfat 指令佔用了，因此處於忙碌狀態，無法進行掛載(mount)。
```
root              4345   3.2  0.0 33751240   4352   ??  U     7:49PM   0:00.74 /System/Library/Filesystems/exfat.fs/Contents/Resources/./fsck_exfat -y /dev/rdisk2s2
```

解決方法是終止該程序(process)。在這個例子中，查詢到的程序 ID 是 4345。這個數值是根據當下使用者電腦隨機生成的編號，所以一旦找到了該 PID，就可以使用以下指令終止該程序。

```sh
sudo kill -9 4345
```

刪除程序後，就可以成功地掛載外接硬碟了。但此時可能只能進行讀取操作，無法進行寫入操作。使用磁碟工具程式進行修復後，就能恢復正常，可以進行寫入操作了。