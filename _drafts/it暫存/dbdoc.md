- env
```js
PORT=3000
NODE_ENV=development
MYSQL_HOST=localhost
MYSQL_MYSQL=3306
MYSQL_USER=root
MYSQL_PASS=wjxeqbSeB7.1
MYSQL_DATABASE=Community
VERSION=1.0.0
```

- index.route
```js
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
  });
  connectionPool.getConnection((err, connection) => {
    if (err) {
      res.send(err);
      console.log('連線失敗！');
    } else {
      res.send('連線成功！');
      console.log(connection);
    }
  });
});
```
