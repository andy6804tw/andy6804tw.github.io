https://chentsu.wordpress.com/2014/03/04/javascript-%E6%AD%A3%E8%A6%8F%E8%A1%A8%E9%81%94%E5%BC%8F-regexp-%E6%87%89%E7%94%A8%EF%BC%88string-regexp-method%EF%BC%89/


網頁
http://blog.kdchang.cc/2016/11/05/how-to-establish-modern-front-end-development-environment-tutorial/

JS中的關係比較與相等比較運
http://eddychang.me/blog/javascript/101-equality-relational-comparison.html

Error
http://es6.ruanyifeng.com/#docs/class-extends

資料庫
http://note.drx.tw/2012/12/mysql-syntax.html
http://expressjs.com/zh-tw/guide/database-integration.html
https://dotblogs.com.tw/explooosion/2016/07/18/010601

ES6
http://blog.jsdc.tw/2016/08/20/node_v6_and_es6


陣列
https://coldfunction.com/p/6p


## 自動化測試
https://medium.com/@yurenju/%E8%87%AA%E5%8B%95%E8%BB%9F%E9%AB%94%E6%B8%AC%E8%A9%A6-tdd-%E8%88%87-bdd-464519672ac5


## 面試履歷
https://blog.m157q.tw/posts/2016/01/22/how-to-write-a-resume-for-programming-jobs/

## Bot
https://simonhsu.blog/2017/01/25/%E4%B8%8D%E5%BF%85%E7%9C%9F%E7%9A%84%E6%9E%B6%E7%AB%99%E4%B9%9F%E8%83%BD-5-%E5%88%86%E9%90%98%E5%AF%A6%E6%A9%9F%E9%AB%94%E9%A9%97-line-bot-message-api-%E6%87%89%E7%94%A8-by-node-js-ngrok/


## GCP 
ssl憑證
https://sammy197.tw/4076/gwp-%E5%9C%A8google-cloud-platform%E8%A3%A1%E4%BD%BF%E7%94%A8ssl%E6%86%91%E8%AD%89/

srv
https://forum.gamer.com.tw/Co.php?bsn=18673&sn=789461

https://www.4rbj4.com/230

https://opensertkblog.wordpress.com/2017/05/03/%E3%80%90%E5%9C%96%E6%96%87%E6%95%99%E5%AD%B8%E3%80%912017%E6%9C%80%E6%96%B0%E7%89%88-%E5%BB%BA%E8%A8%AD%E5%9F%BA%E6%9C%AC%E4%BC%BA%E6%9C%8D%E5%99%A8-%E9%96%8B%E6%9C%8D%E6%95%99%E5%AD%B8%EF%BC%88-3/

如果有需要用上domain的話，可以執行下面的 commad 把預設的 80 port 轉址到專案的 port :
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port xxxx

ref: http://www.checkme.tw/wordpress/deploy-google-cloud-platform-node-js/
```
