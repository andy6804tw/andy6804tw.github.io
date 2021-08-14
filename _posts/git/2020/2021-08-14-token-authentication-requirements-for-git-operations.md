





```
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: unable to access 'https://github.com/XXX/XXXX.git/': The requested URL returned error: 403
```

## 解決辦法
首先開啟 GitHub 並點選選右上角進入 `Settings > Developer settings > Personal access tokens`。之後後點選 `Generate new token` 按鈕建立一個 Personal token。

![](/images/posts/git/2021/img1100814-1.png)

大家可以依據需求開啟需要的權限，如果你只要使用終端機進行 git 操作的話只要將 `repo` 的選項打勾即可。選擇好後點選最下面的 `Generate token` 即可產生一組個人的 token，這一組 token 必須放到你的電腦當中。才有權限做 Git 上傳的操作。

![](/images/posts/git/2021/img1100814-2.png)

![](/images/posts/git/2021/img1100814-4.png)

> 注意！這組 token 跟你的密碼是一樣重要的，如果流出去可能會有被盜用的疑慮。


建立好一組個人的 token 後即可匯入到你的電腦當中。以下分為 MacOS 與 Windows 用戶來教大家如何修改原先的設定的 GitHub 密碼。

## MacOS 
開啟主選單並找到內建 `鑰匙圈存取 (Keychain Access)` 的設定程式。鑰匙圈存取是一個 macOS App，可儲存你的密碼和帳號資訊，並做一個集中式轉裡。

![](/images/posts/git/2021/img1100814-3.png)

進入該程式後點選旁邊的選單 `login` 並找到 `github.com` 的內容。點擊兩下將會跳出視窗，接著把剛剛在 GitHub 取得的 token 貼上作為密碼。藉由此方式本機上的終端機就能夠過這組 token 進行 git repo 的存取。

![](/images/posts/git/2021/img1100814-5.png)

MacOS 操作流程：
1. 在系統中搜尋`鑰匙圈存取 (Keychain Access)`的應用程式
2. 尋找 `github.com` 類型為 `Internet Password`
3. 點擊兩下進入將 token 貼上密碼欄位


## 偷吃步方法
此種方法必須要記住 token。每次新的 repo 建立時必須輸入以下設定，將 token 放置以下連結中。

```sh
git remote set-url <stream> https://<token>@github.com/<username>/<repo>
```

## 小結
上述方法是採用 https 方法進行 git 的操作，每一次可能都要手動輸入帳號或密碼。如果覺得這樣很麻煩的話也推薦大家使用 SSH 方式設定金鑰來進行 git 版本控制。詳細的操作內容可以參考[使用 SSH 金鑰與 GitHub 連線](https://andy6804tw.github.io/2018/03/22/github-ssh/)
