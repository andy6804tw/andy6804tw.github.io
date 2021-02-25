## [blockly] shadow blocks 的使用
Google blockly 提供使用者自定義積木，可以透過官方提供的 [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#) 來客製化自己的積木(也就是用積木來創造積木)。當我們做好積木後，想為空格的區域填上預設/提示的功能，可以使用`<shadow></shadow>`標籤來實現。如下圖是一個迴圈重複的積木，陰影積木裡面有個數字 `5`，在bolckly裡稱之為shadow block。

![](https://i.imgur.com/5eSYAi5.png)


程式時做如下，在 toolbox 的 xml 裡定義 block 的時候，可以手動加上`<shadow></shadow>`標籤。由於我們是要取得要重複幾次因此 shadow 需要以 `<value></value>` 標籤包起來， type 設定次數積木的 name 也就是 `TIMES`。

```xml
<xml id="toolbox">
    <block type="controls_repeat_ext">
        <value name="TIMES">
        <shadow type="math_number">
            <field name="NUM">5</field>
        </shadow>
        </value>
    </block>
</xml>
```