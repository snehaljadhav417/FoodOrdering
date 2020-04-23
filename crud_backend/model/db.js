const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '****',
  database : 'CSE542_Project'
});

connection.connect(function(err){
    if (err) throw err
    console.log('connected')});

module.exports = connection;
