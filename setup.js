const mysql = require('mysql2');

console.log('Setting up Database....');

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.execute('SHOW TABLES;', function(err, results, fields){
  console.log(err); 
  console.log(results); 
  console.log(fields); 
}); 