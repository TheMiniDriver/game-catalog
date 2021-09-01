var express = require('express');
const mysql = require('mysql2');

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


router.post('/', [addNewGame, returnGameById]); 


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

function addNewGame(req, res, next){
  connection.query(
    `INSERT INTO games
      (title, platform, year)
      VALUES (?, ?, ?)`, 
      [req.body.title, req.body.platform, req.body.year],
    queryResults
  );

  function queryResults(err, results, fields){
    if (err) return next(err); 
    req.body.id = results.insertId
    return next(); 
  }
}

function returnGameById(req, res, done){
  connection.query(`
    SELECT * FROM games
    WHERE id = ?
    `,
    [req.body.id],
    queryResults
  ); 

  function queryResults(err, results, fields){
    if (err) return next(err); 
    return res.json(results); 
  }
}

module.exports = router;