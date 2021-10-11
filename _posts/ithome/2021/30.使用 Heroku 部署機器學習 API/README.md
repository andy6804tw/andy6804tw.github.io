# 使用 Heroku 部署機器學習 API

## 今日學習目標
- 動手部署自己的機器學習 API
- 使用 Heroku 免費雲端平台部署應用程式

## 前言
開發的最後一哩路`部署應用`。部署 API 必須在一個穩定的伺服器上運行，大多數企業可能會租用雲端的虛擬伺服器。常見的雲端平台三巨頭有 Google Cloud Platform (GCP)、Amazon Web Service (AWS) 以及 Microsoft Azure。以上三家供應商都有提供免費的試用額度以及部署的教學，另外雲端伺服器計費的方式是採用多少付多少的概念收費。若有 GCP 使用需求可以參考我過去所錄製的系列教學影片 [GCP教學-Python](https://www.youtube.com/watch?v=z3bU_MYPlOs&list=PLXSkku8eiD-hcW9N9A6M8Y6Hma8DHBsEJ)。假設你只有自用需求，或是正在尋找免費的雲端伺服器，這一篇文章可以幫助到你。

## Heroku 雲端平台
[Heroku](https://www.heroku.com) 是一個支援多種程式語言的雲平台即服務。並且提供一個免費的雲端服務，這個雲端平台一個帳號可以免費建立五個專案，雖然是免費當然也有使用上的限制。例如：(1) 超過`30分鐘`閒置將會進入睡眠狀態，之後重新啟動 API 時會需要等待一些時間才有回應。(2) `500MB`的儲存空間限制。當然 Heroku 也提供多種語言的部署環境像是 Ruby、Node.js、PHP 、 Go、Python ...等。本篇文章會教你如何部署 Python 的 Flask API。



## 1. 前置作業
### 1.1) 範例程式碼


> 以下簡單說明專案內部署 Heroku 的重要檔案。

### 1.2 Procfile 設定檔
Procfile 這個檔案是要告訴 Heroku 要如何啟動這個 web app，在 Heroku 裡，執行 Python 要使用 Gunicorn 來啟動 web server。所以在 requirements.txt 裡，請記得要輸入 gunicorn。Procfile 檔案，的內容如下：

```sh
web gunicorn run:app
```

## 2. 部署Heroku專案
### 2.1 在Heroku建立應用程式
建立帳號後右上角「 New 」中的「 Create new app 」建立第一個應用程式：


### 2.2 專案與GitHub連動
這一步驟是將 GitHub 上的專案直接與 Heroku 做連動，你也可以直接 Fork 這個專案直接實作 heroku-flask-api-example。

點選 Enable Automatic Deploys 連動後可以選擇自動部署。當你GitHub專案的程式碼有更新時他會自動幫你把更新的程式部署到Heroku中。


## 部署專案
確認以下事情都完成後就可以部署程式囉！記得我們有跟GitHub連動，當你的專案git push後Heroku就會幫你自動部署了。你可以從Activity內看到部署狀態，也能從右上角 More -> View logs 觀看後台Log訊息。或者你也可以從Deploy內手動部署也行。

- Python Flask API 程式撰寫 ✅
- 專案內建立 Procfile ✅
- Heroku 建立專案 ✅
- Heroku 與 GitHub連動 ✅

部署完成後你可以在 Settings 內的 Domains 看到你的雲端連結，這個連結點下去就能看到我們的API囉！
