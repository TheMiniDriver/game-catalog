const mysql = require('mysql2');
var express = require('express');
const { route } = require('../app');
var router = express.Router();

const connection = mysql.createConnection(process.env.DATABASE_URL);

router.get('/', function(req, res, next){
  
  connection.query(
    `SELECT * FROM games`,
    queryResults
  ); 

  function queryResults(err, results, fields){
    if (err) return next(err); 
    return res.json(results); 
  }
});


router.post('/', function(req, res, next){

  connection.query(
    `INSERT INTO games
      (title, platform)
      VALUES (?, ?)`, 
      [req.body.title, req.body.platform],
    queryResults
  );

  function queryResults(err, results, fields){
    if (err) return next(err); 
    return res.json(results); 
  }

}); 


router.put('/:id', function(req, res, next){

  connection.query(
    `UPDATE games
      SET title = ?, platform = ?
      WHERE id = ?`, 
    [req.body.title, req.body.platform, req.params.id], 
    queryResults
  ); 

  function queryResults(err, results, fields){
    if (err) return next(err); 
    return res.json(results); 
  }

});


router.delete('/:id', function(req, res, next){
  
  connection.query(
    `DELETE FROM games
      WHERE id = ?`, 
    [req.params.id],
    queryResults
  )

  function queryResults(err, results, fields){
    if (err) return next(err); 
    return res.json(results); 
  }

});

module.exports = router;