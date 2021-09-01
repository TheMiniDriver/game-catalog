var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');  
const BasicStrategy = require('passport-http').BasicStrategy; 

passport.use(new BasicStrategy(
  function(username, password, done) {
    return done(null, {name: "bradley"}); 
    // db.users.findByUsername(username, function(err, user) {
    //   if (err) { return cb(err); }
    //   if (!user) { return cb(null, false); }
    //   if (user.password != password) { return cb(null, false); }
    //   return cb(null, user);
    // });
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
