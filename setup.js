const mysql = require('mysql2');

console.log('Setting up Database....');

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.execute('SHOW TABLES;', function(err, results, fields){
  console.log(results); 
}); 

connection.execute(`CREATE TABLE 'Games's
    (
      'id' INT NOT NULL auto_increment,
      'title' VARCHAR(500) NOT NULL, 
      'platform' VARCHAR(500) NOT NULL,
      'year' INT,
      'publisher' VARCHAR(500) NOT NULL
    );
    `, function(err, results, fields){
  console.log(results); 
}); 


connection.execute('SHOW TABLES;', function(err, results, fields){
  console.log(results); 
}); 
