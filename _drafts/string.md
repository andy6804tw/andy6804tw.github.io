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


## 聊天機器人

- Dialogflow(可自己產生Webhook)
https://ithelp.ithome.com.tw/articles/10195879


## Yahoo

最多人瀏覽：https://tw.news.yahoo.com/_td-news/api/resource/IndexDataService.getMostPopular;component=t;count=10;name=%E5%85%A8%E7%AB%99;uuid=%5B%22%E5%85%A8%E7%AB%99%22%5D?bkt=news-TW-zh-Hant-TW-def&device=desktop&feature=videoDocking&intl=tw&lang=zh-Hant-TW&partner=none&prid=0oek7rdd7q3rb&region=TW&site=news&tz=Asia%2FTaipei&ver=2.0.929&returnMeta=true

各家新聞：https://tw.news.yahoo.com/_td-news/api/resource/IndexDataService.getExternalMediaNewsList;count=12;newsTab=%E6%9C%80%E6%96%B0?bkt=news-TW-zh-Hant-TW-def&device=desktop&feature=videoDocking&intl=tw&lang=zh-Hant-TW&partner=none&prid=0oek7rdd7q3rb&region=TW&site=news&tz=Asia%2FTaipei&ver=2.0.929&returnMeta=true

新聞：https://tw.news.yahoo.com/_td-news/api/resource/content;fetchNewAttribution=true;getDetailView=true;getFullLcp=false;imageResizer=null;relatedContent=%7B%22enabled%22%3Atrue%7D;site=news;uuids=%5B%22be5382fa-64e3-3d5f-95e5-e8982f6f7fb1%22%2C%22c94b480b-b91c-30fe-992a-54d2848d6c10%22%2C%2283913e76-a69f-37bb-9d11-72cc585f93b7%22%2C%22dae8b797-e67b-3ac3-8a43-36eb63bec0dc%22%2C%22c63e5fee-ebb8-35ca-8a57-0b3b5983ab8a%22%2C%22a2ecdf7a-03f5-353b-b9fc-c8cd5d09e6fb%22%2C%22b8c5228f-9323-3a8d-b689-91b322ee0486%22%2C%2217bddd30-a5f7-3cf9-b227-a9735f147578%22%2C%228264f7db-685c-382b-99ce-1235e3c9c584%22%2C%22f86e752e-26a7-34ab-b301-5fc9f7e97408%22%2C%22d9a1821e-8acf-3fa0-a502-1f0e9e66916b%22%2C%22b053ac4c-4e36-37fc-acc0-3adc2dfed5ea%22%2C%2283913e76-a69f-37bb-9d11-72cc585f93b7%22%2C%223ad7c726-00bb-3202-a3b8-517aa430158e%22%2C%22c09ef0c3-370d-3e85-8261-d8df2bca8f99%22%2C%22ba506918-4fba-34a0-96cb-29f59f908490%22%2C%2293f1861a-1220-3ea2-89a4-cd411f5dba9b%22%2C%227de36a8a-a079-3aff-aad9-afa32a2765e0%22%2C%22b8e3fd2c-eb1c-3658-bedb-9f50375dd4e9%22%2C%2227320d4e-5594-3a4c-bb84-a0c8cee6284a%22%5D?bkt=news-TW-zh-Hant-TW-def&device=desktop&feature=videoDocking&intl=tw&lang=zh-Hant-TW&partner=none&prid=0oek7rdd7q3rb&region=TW&site=news&tz=Asia%2FTaipei&ver=2.0.929&returnMeta=true

新聞：https://tw.news.yahoo.com/_td-news/api/resource/content;fetchNewAttribution=true;getDetailView=true;getFullLcp=false;imageResizer=null;relatedContent=%7B%22enabled%22%3Atrue%7D;site=news;uuids=%5B%2288106816-f993-3635-a793-9abd854f63e1%22%2C%2245b574be-445f-34dc-a7d7-c506fb7fd295%22%2C%22481c4514-f84e-3ed2-9e1d-31ebd056bd82%22%2C%22386ee0cd-455c-3c86-b959-8b22c7d9ff3b%22%5D?bkt=news-TW-zh-Hant-TW-def&device=desktop&feature=videoDocking&intl=tw&lang=zh-Hant-TW&partner=none&prid=0oek7rdd7q3rb&region=TW&site=news&tz=Asia%2FTaipei&ver=2.0.929&returnMeta=true


## imgur
http://blog.codylab.com/imgur-imgbed/


## async 教學
http://blog.csdn.net/marujunyy/article/details/8695205

