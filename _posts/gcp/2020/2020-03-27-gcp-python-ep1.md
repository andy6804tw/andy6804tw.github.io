---
layout: post
title: '[GCP教學-Python] #1 部署第一個Python Flask API程式'
categories: 'GCP'
description:
keywords: 
---

## 本文擬將會學到
如何在 GCP 中的 Compute Enging 建立 VM 執行個體，並部署 Python Flask API 服務。

<iframe width="560" height="315" src="https://www.youtube.com/embed/z3bU_MYPlOs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 建立一個虛擬機器
每個Google帳號都有免費一年300美金額度的試用，啟用後首先一開始點選 Compute Enging 並新增建立 VM 執行個體。

![](/images/posts/gcp/2020/img1090327-1.png)

新建一個虛擬機需要注意以下幾個事情：
1. 主機區域 (通常主機離你越遠相對的費用就會比較便宜，相對的速度會比較慢)
2. 機器規格設定 (各位可以依據需求配置你的虛擬機)
3. 系統 (今天的範例使用 Ubuntu18.04 LTS)
4. 防火牆 (開啟 HTTP 流量，也就是 80 PORT 被允許存取)

![](/images/posts/gcp/2020/img1090327-2.png)
![](/images/posts/gcp/2020/img1090327-3.png)

## SSH 進入虛擬主機
這邊教學使用 Google 瀏覽器開啟 SSH 進入虛擬機的方式，一方面也比較簡單，若你是長期使用的資深的玩家可以考慮利用金鑰的方式直接從本機電腦的終端機進行連線存取雲端伺服器的方式。

![](/images/posts/gcp/2020/img1090327-4.png)
![](/images/posts/gcp/2020/img1090327-5.png)

輸入以下指令安裝 Python 以及 PIP 管理工具。

```
sudo apt-get update
sudo apt-get install python-setuptools python-dev build-essential
sudo apt install python-pip
```

## 建立第一支 Flask API
這篇文章就不多贅述 Flask，若各位有興趣我之後會拍攝相關的教學片，再請各為期待囉！下面範例程式是開啟一個 80 PORT 監聽，並且在主路徑會回傳 `hello !` 字串。

首先輸入 `vim run.py` 建立一個檔案，並將下面範例程式碼貼上。最後按 esc `:wq` 儲存並離開。
```
vim run.py
```

```
from flask import Flask
app=Flask(__name__)
@app.route('/')
def hello():
    return 'hello !'
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
```

第一支程式建立完成後，我們要來安裝相關的套件。我們要透過 `pip` 來安裝 `flask` 套件。什麼是 `pip` 呢？間單來說它是一個 `Python` 的套件管理器。如果有寫過 `Node.js` 的朋友一定知道 `npm` 道理是一模一樣的。

```
pip install flask
```

## 執行程式
以上都準備就緒後我們就能執行範例程式囉！由於我們是設定 80PORT 因脞們動程式時必須要在管理者權限下執行。

```
sudo python run.py
```

![](/images/posts/gcp/2020/img1090327-6.png)

執行成功後，可以到你的 VM主控台查看你的外部IP位置。並點開應該就能看到你剛剛部署的第一支程式正在運作囉！當然你可能會想如果我想執行在 8000PORT該怎麼辦？我要怎麼讓他不間斷地持續背景執行呢？放心後續教學你就會學到囉！

![](/images/posts/gcp/2020/img1090327-7.png)


## 後記
如果想將系統 Python 指令執行到 Python3 版本可以參考以下設定。

首先查看系統裡目前有安裝版本多少的 Python。
```
ls /usr/bin/python*
```

![](/images/posts/gcp/2020/img1090327-8.png)

我的系統裡有 Python3.6的版本，所以我可以開啟 `.bashrc` 設定檔將 Python3.6 環境變數加入。

```
vim ~/.bashrc
```

```
# 將此內容貼到 .bashrc
alias python='/usr/bin/python3.6'
alias pip='pip3'
```

修改後儲存並重新載入 `.bashrc`
```
source ~/.bashrc
```

由於我還尚未安裝 `pip3`，因此輸入以下指令來安裝。

```
sudo apt install python3-pip
```

以上設定就緒後就能輸入以下只贈來查看目前 Python 以及 pip 的版本囉！

```
python -V
pip -V
```

![](/images/posts/gcp/2020/img1090327-9.png)


Reference: https://cloud.google.com/python/setup?hl=zh-tw#linux