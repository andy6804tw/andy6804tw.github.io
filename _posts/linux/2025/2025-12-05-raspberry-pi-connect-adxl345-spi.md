---
layout: post
title: 'Raspberry Pi 連接 ADXL345 加速度計 (SPI介面)'
categories: 'Hardware'
description: 'A practical guide to connecting the ADXL345 accelerometer to a Raspberry Pi via SPI for higher sampling rates and reliable vibration measurements.'
keywords: 'ADXL345, Raspberry Pi, SPI, accelerometer, vibration'
---


## 前言
在進行動態量測或震動監控時，ADXL345 加速度計常因為體積小、設定彈性高而成為許多開發者的首選。不過，當以 Raspberry Pi 搭配 I²C 介面讀取資料時，受限於匯流排速度與封包處理延遲，整體取樣率往往無法滿足較高速的量測需求。為了提升資料擷取的即時性與穩定度，改用 SPI 介面成為更有效率的解決方案。透過 SPI 的較高資料傳輸頻寬與穩定訊號時序，我們可以大幅改善 ADXL345 的讀取速度，讓後續的分析與應用表現更加流暢可靠。

## ADXL345（Raspberry Pi）I²C / SPI 比較

| 項目             | I²C                    | SPI                                    |
| -------------- | ---------------------- | -------------------------------------- |
| 介面速度           | 100–400 kHz（較慢）        | 2–5 MHz（非常快）                           |
| 最高穩定取樣率（ODR）   | 約 100–400 Hz（高一點容易掉封包） | 最高可設 3200 Hz（晶片規格）                     |
| Python 實務可達取樣率 | 約 100–200 Hz           | 約 400–800 Hz（寫得好可到 ~1600 Hz，但會有漏樣）     |
| C 實務可達取樣率      | 約 200–400 Hz           | 800–1600 Hz 穩定 → 若 SPI 寫法高效可接近 3200 Hz |
| 資料同步性          | 中等                     | 高，同步性佳                                 |
| 抗干擾能力          | 中等（長線路容易雜訊）            | 高（訊號乾淨）                                |
| 需要接線數量         | 4 條線（VCC、GND、SDA、SCL）  | 6 條線（VCC、GND、SCLK、MISO、MOSI、CS）        |
| 多裝置擴充性         | 優秀（同一匯流排可掛多個 I²C 產品）   | 一般（每多一個裝置要多一條 CS）                      |
| 操作難度           | 簡單                     | 中度（接線多）                                |
| 適合用途           | 姿態、傾斜、一般加速度            | 高速震動、FFT、馬達監測、機台診斷                     |

## 前置作業：開啟 SPI 介面

在樹莓派終端機輸入：

```bash
sudo raspi-config
```

選：

* Interface Options
* 找到 SPI → 選 Enable

存檔離開後，建議重開機：

```bash
sudo reboot
```

## 硬體接線（Raspberry Pi ↔ ADXL345）

`adxl345spi` 專案 README 裡有 Fritzing 圖，並且標出 SPI 對應腳位：

* CS : SPI_CE0_N (pin 24)
* SDO : SPI_MISO (pin 21)
* SDA : SPI_MOSI (pin 19)
* SCL : SPI_CLK (pin 23)

你可以這樣接（以 Raspberry Pi 40pin header 為例）：

| ADXL345 腳位 | Raspberry Pi 腳位 | 說明        |
| ---------- | --------------- | --------- |
| VCC / 3V3  | 1（3.3V）         | 一定要 3.3V  |
| GND        | 6（GND）          | 任一 GND 皆可 |
| CS         | 24（CE0）         | SPI 片選 0  |
| SDO        | 21（MISO）        | SPI MISO  |
| SDA        | 19（MOSI）        | SPI MOSI  |
| SCL        | 23（SCLK）        | SPI CLK   |

有些 ADXL345 模組 VCC 會寫 3V3，意思就是只能吃 3.3V，不要接 5V。

## 安裝 adxl345spi 工具

在樹莓派上執行以下指令（README 直接給的安裝步驟，專案在 GitHub）：

```bash
git clone https://github.com/nagimov/adxl345spi
cd adxl345spi
sudo make
sudo make install
```

說明一下：

* `sudo make`：會編譯程式，順便安裝 pigpio 等相依套件（所以需要 sudo）
* `sudo make install`：把編譯好的 `adxl345spi` 放到 `/usr/local/bin`，之後在任何路徑都可以直接叫

## 基本測試：先看有沒有資料

直接執行：

```bash
sudo adxl345spi
```

README 說明，這是一個 command line 工具，會持續把時間 + 三軸加速度印出來：

格式大概像這樣：

```text
time,     x,     y,     z
 0.0,  10.0,   0.0, -10.0
 0.1,   5.0,  -5.0,  10.0
 ...
```

其中：

* `time` 是從開始量測後經過的秒數
* `x, y, z` 是各軸加速度，單位是 g 的倍數（fraction of g）

你可以邊看輸出邊用手轉動感測器，看數值會不會跟著變化；若完全不變或都是 0，可能是接線或 SPI 沒開好。

## 設定量測時間、取樣率、存成 CSV

工具的使用方式寫在 README 的 Usage 區塊（GitHub）。

支援的主要參數：

* `-t, --time TIME`：量測多久（秒），預設 5 秒
* `-f, --freq FREQ`：取樣率（Hz），1～3200，預設 5 Hz
* `-s, --save FILE`：把資料存成指定檔案（CSV），不給就印在螢幕上
* `-r, --range RANGE`：設定靈敏度 ±RANGE g => 2, 4, 8, 16，預設 16g

例如，你想用 1600 Hz 取樣 10 秒，存成 `data.csv`：

```bash
sudo adxl345spi -t 10 -f 1600 -s data.csv
```

結束後，資料會是標準 CSV 格式，第一行有欄位名稱：

```text
time,x,y,z
0.0000, ...
0.000625, ...
...
```

你可以用 Python / Excel / pandas 去開來處理。

如果想指定 g 值範圍可以：

```bash
sudo adxl345spi -r 4 -t 10 -f 1600 -s data.csv
```

## 量測範圍參數與程式碼片段說明

由於官方沒有提供更改範圍功能，所以必須參考以下程式：

```c
// adxl345spi.c

#include <stdio.h>
#include <pigpio.h>
#include <time.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>

#define DATA_FORMAT   0x31  // data format register address
#define READ_BIT      0x80
#define MULTI_BIT     0x40
#define BW_RATE       0x2C
#define POWER_CTL     0x2D
#define DATAX0        0x32

const char codeVersion[3] = "0.4";  // code version number
const int timeDefault = 5;  // default duration of data stream, seconds
const int freqDefault = 5;  // default sampling rate of data stream, Hz
const int freqMax = 3200;  // maximal allowed cmdline arg sampling rate of data stream, Hz
const int rangeDefault = 16;  // default measurement range, g
const int speedSPI = 2000000;  // SPI communication speed, bps
const int freqMaxSPI = 100000;  // maximal possible communication sampling rate through SPI, Hz (assumption)
const int coldStartSamples = 2;  // number of samples to be read before outputting data to console (cold start delays)
const double coldStartDelay = 0.1;  // time delay between cold start reads
const double tStatusReport = 1;  // time period of status report if data read to file, seconds

// Function to get DATA_FORMAT byte and conversion factor based on range
void getRangeSettings(int range, char *dataFormatByte, double *conversion) {
    // ADXL345 Full Resolution Mode Scale Factor is fixed at ~3.9 mg/LSB
    // (4mg is often used for simplicity, but 3.90625mg is precise for 13-bit over 16g)
    double scale_factor = 0.00390625;

    switch(range) {
        case 2:
            *dataFormatByte = 0x08;  // +/- 2g range, Full Res
            break;
        case 4:
            *dataFormatByte = 0x09;  // +/- 4g range, Full Res
            break;
        case 8:
            *dataFormatByte = 0x0A;  // +/- 8g range, Full Res
            break;
        case 16:
            *dataFormatByte = 0x0B;  // +/- 16g range, Full Res
            break;
        default:
            *dataFormatByte = 0x0B;  // default to 16g
            break;
    }

    // In FULL_RES mode, conversion factor is constant regardless of range setting
    // The range setting only determines when data clipping occurs
    *conversion = scale_factor;
}

void printUsage() {
    printf( "adxl345spi (version %s) \n"
            "License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>\n"
            "\n"
            "Usage: adxl345spi [OPTION]... \n"
            "Read data from ADXL345 accelerometer through SPI interface on Raspberry Pi.\n"
            "Online help, docs & bug reports: <https://github.com/nagimov/adxl345spi/>\n"
            "\n"
            "Mandatory arguments to long options are mandatory for short options too.\n"
            "  -s, --save FILE     save data to specified FILE (data printed to command-line\n"
            "                      output, if not specified)\n"
            "  -t, --time TIME     set the duration of data stream to TIME seconds\n"
            "                      (default: %i seconds) [integer]\n"
            "  -f, --freq FREQ     set the sampling rate of data stream to FREQ samples per\n"
            "                      second, 1 <= FREQ <= %i (default: %i Hz) [integer]\n"
            "  -r, --range RANGE   set the measurement range to ±RANGE g\n"
            "                      valid values: 2, 4, 8, 16 (default: %i g) [integer]\n"
            "\n"
            "Data is streamed in comma separated format, e. g.:\n"
            "  time,     x,     y,     z\n"
            "   0.0,  10.0,   0.0, -10.0\n"
            "   1.0,   5.0,  -5.0,  10.0\n"
            "   ...,   ...,   ...,   ...\n"
            "  time shows seconds elapsed since the first reading;\n"
            "  x, y and z show acceleration along x, y and z axis in fractions of <g>.\n"
            "\n"
            "Exit status:\n"
            "  0  if OK\n"
            "  1  if error occurred during data reading or wrong cmdline arguments.\n"
            "", codeVersion, timeDefault, freqMax, freqDefault, rangeDefault);
}

int readBytes(int handle, char *data, int count) {
    data[0] |= READ_BIT;
    if (count > 1) data[0] |= MULTI_BIT;
    return spiXfer(handle, data, data, count);
}

int writeBytes(int handle, char *data, int count) {
    if (count > 1) data[0] |= MULTI_BIT;
    return spiWrite(handle, data, count);
}

int main(int argc, char *argv[]) {
    int i;

    // handling command-line arguments

    int bSave = 0;
    char vSave[256] = "";
    double vTime = timeDefault;
    double vFreq = freqDefault;
    int vRange = rangeDefault;

    for (i = 1; i < argc; i++) {  // skip argv[0] (program name)
        if ((strcmp(argv[i], "-s") == 0) || (strcmp(argv[i], "--save") == 0)) {
            bSave = 1;
            if (i + 1 <= argc - 1) {  // make sure there are enough arguments in argv
                i++;
                strcpy(vSave, argv[i]);
            }
            else {
                printUsage();
                return 1;
            }
        }
        else if ((strcmp(argv[i], "-t") == 0) || (strcmp(argv[i], "--time") == 0)) {
            if (i + 1 <= argc - 1) {
                i++;
                vTime = atoi(argv[i]);
            }
            else {
                printUsage();
                return 1;
            }
        }
        else if ((strcmp(argv[i], "-f") == 0) || (strcmp(argv[i], "--freq") == 0)) {
            if (i + 1 <= argc - 1) {
                i++;
                vFreq = atoi(argv[i]);
                if ((vFreq < 1) || (vFreq > 3200)) {
                    printf("Wrong sampling rate specified!\n\n");
                    printUsage();
                    return 1;
                }
            }
            else {
                printUsage();
                return 1;
            }
        }
        else if ((strcmp(argv[i], "-r") == 0) || (strcmp(argv[i], "--range") == 0)) {
            if (i + 1 <= argc - 1) {
                i++;
                vRange = atoi(argv[i]);
                if ((vRange != 2) && (vRange != 4) && (vRange != 8) && (vRange != 16)) {
                    printf("Wrong measurement range specified! Valid values: 2, 4, 8, 16\n\n");
                    printUsage();
                    return 1;
                }
            }
            else {
                printUsage();
                return 1;
            }
        }
        else {
            printUsage();
            return 1;
        }
    }

    // reading sensor data

    // Get range settings
    char dataFormatByte;
    double accConversion;
    getRangeSettings(vRange, &dataFormatByte, &accConversion);

    // SPI sensor setup
    int samples = vFreq * vTime;
    int samplesMaxSPI = freqMaxSPI * vTime;
    int success = 1;
    int h, bytes;
    char data[7];
    int16_t x, y, z;
    double tStart, tDuration, t;
    if (gpioInitialise() < 0) {
        printf("Failed to initialize GPIO!");
        return 1;
    }
    h = spiOpen(0, speedSPI, 3);
    data[0] = BW_RATE;
    data[1] = 0x0F;
    writeBytes(h, data, 2);
    data[0] = DATA_FORMAT;
    data[1] = dataFormatByte;  // Use the range-specific data format byte
    writeBytes(h, data, 2);
    data[0] = POWER_CTL;
    data[1] = 0x08;
    writeBytes(h, data, 2);

    double delay = 1.0 / vFreq;  // delay between reads in seconds

    // depending from the output mode (print to cmdline / save to file) data is read in different ways

    // for cmdline output, data is read directly to the screen with a sampling rate which is *approximately* equal...
    // but always less than the specified value, since reading takes some time

    if (bSave == 0) {
        // fake reads to eliminate cold start timing issues (~0.01 s shift of sampling time after the first reading)
        for (i = 0; i < coldStartSamples; i++) {
            data[0] = DATAX0;
            bytes = readBytes(h, data, 7);
            if (bytes != 7) {
                success = 0;
            }
            time_sleep(coldStartDelay);
        }
        // real reads happen here
        tStart = time_time();
        for (i = 0; i < samples; i++) {
            data[0] = DATAX0;
            bytes = readBytes(h, data, 7);
            if (bytes == 7) {
                x = (data[2]<<8)|data[1];
                y = (data[4]<<8)|data[3];
                z = (data[6]<<8)|data[5];
                t = time_time() - tStart;
                printf("time = %.3f, x = %.3f, y = %.3f, z = %.3f\n",
                       t, x * accConversion, y * accConversion, z * accConversion);
                }
            else {
                success = 0;
            }
            time_sleep(delay);  // pigpio sleep is accurate enough for console output, not necessary to use nanosleep
        }
        gpioTerminate();
        tDuration = time_time() - tStart;  // need to update current time to give a closer estimate of sampling rate
        printf("%d samples read in %.2f seconds with sampling rate %.1f Hz (range: ±%dg)\n",
               samples, tDuration, samples/tDuration, vRange);
        if (success == 0) {
            printf("Error occurred!");
            return 1;
        }
    }

    // for the file output, data is read with a maximal possible sampling rate (around 30,000 Hz)...
    // and then accurately rescaled to *exactly* match the specified sampling rate...
    // therefore, saved data can be easily analyzed (e. g. with fft)
    else {
        // reserve vectors for file-output arrays: time, x, y, z
        // arrays will not change their lengths, so separate track of the size is not needed
        double *at, *ax, *ay, *az;
        at = malloc(samples * sizeof(double));
        ax = malloc(samples * sizeof(double));
        ay = malloc(samples * sizeof(double));
        az = malloc(samples * sizeof(double));

        // reserve vectors for raw data: time, x, y, z
        // maximal achievable sampling rate depends from the hardware...
        // in my case, for Raspberry Pi 3 at 2 Mbps SPI bus speed sampling rate never exceeded ~30,000 Hz...
        // so to be sure that there is always enough memory allocated, freqMaxSPI is set to 60,000 Hz
        double *rt, *rx, *ry, *rz;
        rt = malloc(samplesMaxSPI * sizeof(double));
        rx = malloc(samplesMaxSPI * sizeof(double));
        ry = malloc(samplesMaxSPI * sizeof(double));
        rz = malloc(samplesMaxSPI * sizeof(double));

        printf("Reading %d samples in %.1f seconds with sampling rate %.1f Hz (range: ±%dg)...\n",
               samples, vTime, vFreq, vRange);
        int statusReportedTimes = 0;
        double tCurrent, tClosest, tError, tLeft;
        int j, jClosest;

        tStart = time_time();
        int samplesRead;
        for (i = 0; i < samplesMaxSPI; i++) {
            data[0] = DATAX0;
            bytes = readBytes(h, data, 7);
            if (bytes == 7) {
                x = (data[2]<<8)|data[1];
                y = (data[4]<<8)|data[3];
                z = (data[6]<<8)|data[5];
                t = time_time();
                rx[i] = x * accConversion;
                ry[i] = y * accConversion;
                rz[i] = z * accConversion;
                rt[i] = t - tStart;
            }
            else {
                gpioTerminate();
                printf("Error occurred!");
                return 1;
            }
            tDuration = t - tStart;
            if (tDuration > tStatusReport * ((float)statusReportedTimes + 1.0)) {
                statusReportedTimes++;
                tLeft = vTime - tDuration;
                if (tLeft < 0) {
                    tLeft = 0.0;
                }
                printf("%.2f seconds left...\n", tLeft);
            }
            if (tDuration > vTime) {  // enough data read
                samplesRead = i;
                break;
            }
        }
        gpioTerminate();
        printf("Writing to the output file...\n");
        for (i = 0; i < samples; i++) {
            if (i == 0) {  // always get the first reading from position 0
                tCurrent = 0.0;
                jClosest = 0;
                tClosest = rt[jClosest];
            }
            else {
                tCurrent = (float)i * delay;
                tError = fabs(tClosest - tCurrent);
                for (j = jClosest; j < samplesRead; j++) {  // lookup starting from previous j value
                    if (fabs(rt[j] - tCurrent) <= tError) {  // in order to save some iterations
                        jClosest = j;
                        tClosest = rt[jClosest];
                        tError = fabs(tClosest - tCurrent);
                    }
                    else {
                        break;  // break the loop since the minimal error point passed
                    }
                }  // when this loop is ended, jClosest and tClosest keep coordinates of the closest (j, t) point
            }
            ax[i] = rx[jClosest];
            ay[i] = ry[jClosest];
            az[i] = rz[jClosest];
            at[i] = tCurrent;
        }
        FILE *f;
        f = fopen(vSave, "w");
        fprintf(f, "time, x, y, z\n");
        for (i = 0; i < samples; i++) {
            fprintf(f, "%.5f, %.5f, %.5f, %.5f \n", at[i], ax[i], ay[i], az[i]);
        }
        fclose(f);
    }

    printf("Done\n");
    return 0;
}
```

