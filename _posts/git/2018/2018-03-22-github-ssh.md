---
layout: post
title: '使用 SSH 金鑰與 GitHub 連線'
categories: 'Git'
description:
keywords: 
---

## 前言
在 GitHub 中有兩種存取資料的連線方式一種是 `https` 另一種是 `ssh`，兩者的差別在於 https 在每次 `git push` 前都要輸入密碼，而 ssh 相對的就不用輸入密碼即可立即上傳，若不想每次都輸入密碼可以參考 ssh 連線方式。

## SSH 連線運作方式
SSH(安全殼層協定，Secure Shell)，SSH 公開金鑰預設保存在帳戶的主目錄下的 ~/.ssh 目錄，包含一個公鑰與私鑰，運作方式可以看下面這張圖[(參考於)](http://sebastien.saunier.me/blog/2015/05/10/github-public-key-authentication.html)，這張圖的 Client 為我們使用者端而 Server 為 GitHub 伺服器，當本機端用戶 push 資料到遠端時，就會先發送 SSH 連線請求，然後 GitHub 就會隨機傳送一串訊息給本機端用戶電腦使用私密加密，加密後 GitHub 再利用公鑰解密在驗證解密後的訊息是否跟原先的吻合，若是的話則完成 SSH 驗證。
<img src="http://sebastien.saunier.me/images/posts/SSH%20Connection%20explained.png">
圖片來源: http://sebastien.saunier.me/blog/2015/05/10/github-public-key-authentication.html

- Client 端發送 SSH 連線請求
- Server 傳送隨機訊息
- Client 端使用私鑰加密，並回傳加密訊息回 Server 端
- Server 端使用公鑰解密，若訊息吻合代表用戶驗證成功

## 教學
#### 1. 產生金鑰
用 ssh-keygen 來建立。該程式在 Linux/Mac 系統上由 SSH 包提供，而在 Windows 上則包含在 MSysGit 包裡，輸入以下指令，來產生新的 SSH Key。

```bash
$ 	
ssh-keygen -t rsa -b 4096 -C "你的信箱"
```

它先要求你確認保存公開金鑰的位置（.ssh/id_rsa），然後它會讓你重複一個密碼兩次。

<img src="/images/posts/tool/2018/img1070322-1.jpg">

#### 2. 設定金鑰代理
如果沒設定代理每次上傳時還是會要求輸入密碼。

```bash
## 啟用 SSH 代理伺服器
$ eval "$(ssh-agent -s)"
## 將私鑰及加入到 SSH 代理上
$ ssh-add -K ~/.ssh/id_rsa
```

<img src="/images/posts/tool/2018/img1070322-2.png">

#### 3. 上傳公鑰至 GitHub
開啟終端機進入 `.shh` 資料夾，此資料夾為隱藏的在 Mac 內的個人目錄下可以找到，進入後可以看到 id_rsa、id_rsa.pub 兩個檔案分別為私鑰和公鑰，打開公鑰(id_rsa.pub)把全部複製起來，開啟瀏覽器進入 GitHub 頁面，Github > Settings > SSH and GPG keys 的設定頁面，選擇 New SSH Key，填入 Title 與 Key 後即可送出。

```bash
$ cd ../ssh
$ cat id_rsa.pub
```

<img src="/images/posts/tool/2018/img1070322-3.jpg">

完成後就可以測試上傳囉！此外後台也會看到最後一次連線存取的時間

<img src="/images/posts/tool/2018/img1070322-4.jpg">
