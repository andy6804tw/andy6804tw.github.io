---
layout: post
title: '[Linux系統] 利用iptable轉發PORT號'
categories: 'Linux'
description: 
keywords:
---
## 前言
雲端虛擬伺服器提供一個靜態 ip `35.224.176.88` 然而預設是監聽 80 PORT，若今天我寫一支程式監聽 8000 PORT 就必須要像下面這樣輸入：

```
35.224.176.88:8000
```

那有辦法把 8000 PORT 隱藏嗎？答案是可以我們利用 iptable 將預設的 80 PORT 轉到 8000 PORT 即可。

## 將 80 PROT 轉向 8000 PORT

```bash
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
```


## 取消監聽 8000 PORT

### 方法一
第一種方法跟原先監聽指定 PORT 號類似，將 -A(Add) 改成 -D(Delete) 即可。 

```bash
sudo iptables -t nat -D PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
```

### 方法二
第二種方法是查詢目前區域內轉向的狀態，

```bash
sudo iptables -t nat -L --line-numbers
```

結果：
```
Chain PREROUTING (policy ACCEPT)
num  target     prot opt source               destination         
1    REDIRECT   tcp  --  anywhere             anywhere             tcp dpt:http redir ports 8000
```

經由指令查詢可看到有一個狀態，編號為 1 我們就指定編號移除它。

```bbash
sudo iptables -t nat -D PREROUTING 1
```

## 方法三
重新開機
