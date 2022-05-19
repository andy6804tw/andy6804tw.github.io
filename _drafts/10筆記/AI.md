
1. Artificial intelligence has developed rapidly in the past ten years.
2. AI is essentially trying to mimic human beings. Think about all the amazing things we do as humans, and that AI is going to do some of those on our behalf.
3. AI learns to do generative work in the same way we do: we read a lot of documents, and assemble reason, deduction and extraction from that reading (AI怎麼學?)
4. 




## 2020筆記
1. We're going to see a lot of interesting applications that produce text or audio, but the producer might be the AI.
2. Given what has happened in 2020, we’ll have a lot more video data inputs, and not just text or images.
3. Humanity is plagued by bias, and with machine learning models bias is a similar problem.  (XAI)
4. In AI, bias can happen when all the data points fit in a certain direction, and you have never seen data outside that context.(XAI)
5. if you have bad data bias, you’ll get bad, biased outcomes.
6. Secondly there’s the issue of model drift, where the algorithm is supposed to produce a certain type of result but just starts heading in the wrong direction. (模型學習方向錯誤)
7. 中國在數據搜集上佔有優勢
8. 



Hello, thank you for taking the time to read, my name is Tsai, Yi-lin. Currently works as a part-time AI engineer in Taiwan AI Academy. I'm interesting in technology, also have my own blogs to share hands-on teaching, and like participate in technical meetup. In addition, I am a full stack engineer. In my spare time, I will build a side project to enhance my program skills. My motto is that “Coding is My Life” likes to explore the world from the perspective of information technology. Life is closely related to programs and technology.


## 染色機群對色分析(染整廠)
目標: 在特定配方下要找哪一個染機會使得對色率高

<!-- ![](https://i.imgur.com/BLF5IKj.png) -->

以上個流程圖是希望織布進入染整流程後(擴布、烘乾、預定型)該將放置到哪一個染色機台會使得最後染色出來的品質對色率要高。

- 透過客戶給的樣本再透過測色的機器(Datacolor)，來去比對測光的數值是否有跟客戶提供的一樣。
- 從布號與預計染色的色水編號(LABDIP)，提供染指派染機的優先順序建議。

- 機群編號的依據？要如何去分配說機群D6 要幾台？
- 相同的工單參數都一樣，不同的機台會產生不同結果
- 製程卡資訊 USERDEFINECOL04、USERDEFINECOL38 整欄不見了
- 染機資訊與染機運作資訊是透過染機名稱(EQUIPMENT)，但是兩者名字有差異
    - 染機資訊的染機名稱=>DYE2116
    - 染機運作資訊的染機名稱=>2116
- 秤藥單噴嘴(DATA5)資料顯示有問題，格式跑掉變成月份
- QUANTITY_y
- EQUIPMENT_x

## 胚布品質分析(織布廠)
- 胚布品質人工判斷判斷的標準不一，每一個機台都有一個人做檢驗

