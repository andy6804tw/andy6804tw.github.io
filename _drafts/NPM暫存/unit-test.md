Chai 只是提供 BDD 語法的測試用的 斷言 函數庫（assert library），什麼是斷言呢，英文是 assert，例如明確知道某個函數的結果是什麼，把他說出來，就是斷言，如果結果和說的不一樣，就是測試到錯誤

Mocha 則是 Test Framework，用來組織和管理你的測試的程式碼，Mocha 本身的設計是不含 assert library，所以可以自己挑選喜歡的 assert library，只要它在出錯誤時會 throw error 就好


## Unit Testing (單元測試)
單元測試可以明確的找出問題點且能將問題範圍縮小。

- 針對程式的最小測試單位
- 測試對象為單一函式(function)
- 獨立且不會與你寫的後端程式碼衝突

```js
function addTwo(num) {
  return num + 2;
};
describe('測試 addTwo', function () {
  it('1加2等於3', function () {
    expect(addTwo(1)).toBe(3);
  })
})
```

## End to End Testing
E2E 是測試所有程式碼(function)合在一起後所遇到的問題。

- 模擬使用者與軟體的互動
- 測試整個大群組(行為流程)

```js
describe('購物平台', function () {
  it('測試購物流程', function () {
    // 購買商品測試
    // 購物車測試
    // 結帳測試
  })
})
```
