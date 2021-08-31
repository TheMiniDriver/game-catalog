const mysql = require('mysql2');

console.log('Setting up Database....');

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.execute('SHOW TABLES;', function(err, results, fields){
  console.log(results); 
}); 

console.log('Creating tables...');
connection.execute(`CREATE TABLE 'Games'
    (
      'id' INT NOT NULL auto_increment,
      'title' VARCHAR(500) NOT NULL, 
      'platform' VARCHAR(500) NOT NULL,
      'year' INT,
      'publisher' VARCHAR(500) NOT NULL
    );
    `, 
    function(err, results, fields){
      console.log(results); 
      if (err) {
        console.error(err);
      }
  
}); 


connection.execute('SHOW TABLES;', function(err, results, fields){
  console.log(results); 
}); 
