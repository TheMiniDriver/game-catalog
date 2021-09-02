var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');  
const BasicStrategy = require('passport-http').BasicStrategy; 

passport.use(new BasicStrategy(
  function(username, password, done) {
    if (username === process.env.USERNAME && password === process.env.PASSWORD){
      return done(null, {username: process.env.USERNAME }); 
    }
    else {
      return done(null, false, {message: "Incorrect username or password"}); 
    }
  })
);

var gamesRouter = require('./routes/games');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/games', [passport.authenticate('basic', {session: false}), gamesRouter]); 
app.use('/games', [gamesRouter]); 

module.exports = app;
