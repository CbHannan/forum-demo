var mysql = require('mysql');



var connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hannan666',
  database: 'Socialdb'
});
module.exports=connection;