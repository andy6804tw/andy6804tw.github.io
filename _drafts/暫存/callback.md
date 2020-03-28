
## Callback

```js
const callbackFunc = (callback) => {
  setTimeout(() => {
    callback('done');
  }, 3000);
};

callbackFunc((result) => {
  console.log(result);
});
```


## Promise 

```js
const promiseFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done promise');
    }, 3000);
  });
};

promiseFunc().then((result) => {
  console.log(result);
});
```
