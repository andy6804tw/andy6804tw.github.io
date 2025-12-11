---
layout: post
title: 'Raspberry Pi 連接 ADXL345：I2C 接線與 Python 加速度讀取教學'
categories: 'Hardware'
description: 'A practical guide to connecting the ADXL345 accelerometer to a Raspberry Pi using I2C and reading X, Y, Z acceleration data with Python.'
keywords: 'ADXL345, Raspberry Pi, accelerometer, I2C, Python'
---


## 前言
ADXL345 是一顆三軸加速度感測器，支援 I²C 與 SPI。若你在 Raspberry Pi 上想量測馬達震動、設備傾斜或是做資料採集，用 ADXL345 是非常方便的選擇。

以下會一步一步帶你完成：

* ADXL345 的硬體接線
* 啟用 Raspberry Pi 的 I²C
* 使用 Python 程式讀取 X/Y/Z 三軸加速度

內容全程以 I²C 模式為主，因為接線最簡單、也最穩。但取樣率僅有 500 Hz 左右。

## 所需硬體

* Raspberry Pi 3 Model B（其他版本也可）
* ADXL345 模組（常見的紅色/藍色模組都行）
* 杜邦線
* 顯示器或 SSH 連線方式登入樹莓派

## 接線方式（I²C）

以下為 ADXL345 與 Raspberry Pi 的對應接法：

| ADXL345 腳位 | Raspberry Pi GPIO 腳位（功能） |
| ---------- | ------------------------ |
| GND        | GND（例如 pin 6）            |
| VCC        | 3.3V（pin 1）              |
| SDA        | SDA（pin 3）               |
| SCL        | SCL（pin 5）               |

請務必注意：**ADXL345 只能接 3.3V，不能接 5V，不然可能直接燒掉！**

## 啟用 Raspberry Pi 的 I²C 介面

在終端機輸入：

```
sudo raspi-config
```

進入設定選單後：

* 選「Interfacing Options」
* 找到「I2C」並啟用
* 重開機

## 安裝必要套件

安裝 I²C 工具和 Python smbus 套件：

```
sudo apt update
sudo apt install -y python3-smbus i2c-tools
```

## 確認 ADXL345 是否偵測到

輸入：

```
sudo i2cdetect -y 1
```

正常的 ADXL345 會出現在 **0x53** 位址，如：

```
     0 1 2 3 4 5 6 7 8 9 a b c d e f
00:          -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- 53 -- -- -- -- -- -- -- --
...
```

若沒有看到 53，請檢查：

* 接線是否正確
* I²C 是否真的有啟用
* 模組腳位是否有焊接（很多人遇到沒焊好腳位就讀不到）

## 安裝 ADXL345 的 Python 套件（Adafruit 版本）

```
pi3 install adafruit-circuitpython-adxl34x
```

## 撰寫 Python 程式讀取加速度

建立一個程式，例如：

```
vim adxl345_test.py
```

貼上以下程式碼：

```
import time
import board
import busio
import adafruit_adxl34x

# 初始化 I2C
i2c = busio.I2C(board.SCL, board.SDA)

# 初始化 ADXL345
accel = adafruit_adxl34x.ADXL345(i2c)

while True:
    x, y, z = accel.acceleration   # 單位：m/s^2
    print(f"X={x:.2f}, Y={y:.2f}, Z={z:.2f}")
    time.sleep(0.5)
```

執行：

```
python adxl345_test.py
```

如果一切正常，螢幕會持續顯示類似：

```
X=0.12, Y=0.30, Z=9.78
X=0.20, Y=0.22, Z=9.81
...
```

其中 **Z 約為 +9.8** 代表受到地心引力，表示此時感測器的 **Z 軸正方向朝下**，而重力方向與 Z 軸同向，因此讀到正的加速度值。

（注意：若 Z 軸正方向朝上，則會讀到約 -9.8；正負取決於感測器實際擺放方向。）

## 常見問題排查

### （1）i2cdetect 看不到 0x53

* 接線錯誤（最常見）
* 腳位沒焊接
* 用錯電壓（接 5V 會直接 GG）

### （2）Python 一直報錯

* 沒裝 adafruit-circuitpython-adxl34x
* 沒啟用 I²C
* 你使用的 I²C bus 不是 bus 1（大部分 Raspberry Pi 都是 1）

## 參考

[1] [https://pimylifeup.com/raspberry-pi-accelerometer-adxl345/](https://pimylifeup.com/raspberry-pi-accelerometer-adxl345/)

[2] [https://howtomechatronics.com/tutorials/arduino/how-to-track-orientation-with-arduino-and-adxl345-accelerometer/](https://howtomechatronics.com/tutorials/arduino/how-to-track-orientation-with-arduino-and-adxl345-accelerometer/)
