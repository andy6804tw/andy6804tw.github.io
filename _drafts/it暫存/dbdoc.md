- route

```js

```

- controll
```js

```

- module

```js
import jwt from 'jsonwebtoken';
/*  User GET (Login)登入取得資訊  */
const selectUserLogin = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // User撈取所有欄位的值組
          'SELECT * FROM User WHERE user_mail = ?',
          insertValues.user_mail, (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else if (Object.keys(result).length === 0) {
              resolve('信箱尚未註冊！');
            } else {
              const dbHashPassword = result[0].user_password; // 資料庫加密後的密碼
              const userPassword = insertValues.user_password; // 使用者登入輸入的密碼
              bcrypt.compare(userPassword, dbHashPassword).then((res) => { // 使用bcrypt做解密驗證
                if (res) {
                  const payload = {
                    user_id: result[0].user_id,
                    user_name: result[0].user_name,
                    user_mail: result[0].user_mail
                  };
                  const token = jwt.sign(payload, 'my_secret_key');
                  jwt.verify(token, 'my_secret_key', (err, data) => {
                    if (err) {
                      res.sendStatus(403);
                    } else {
                      console.log(data);
                    }
                  });
                  resolve(Object.assign({ code: 200 }, { message: '登入成功', token })); // 登入成功
                } else {
                  resolve('您輸入的密碼有誤！'); // 登入失敗
                }
              });
            }
            connection.release();
          }
        );
      }
    });
  });
};

```
