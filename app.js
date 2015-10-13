var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var late = require('late');
var https = require('https');
var routes = require('./routes/index');

var app = express();
var connectionString = 'postgres://pfswqkxqtxkgre:8mEq-8_QcqoDkg9CZ7xMeuInzy@ec2-54-225-201-25.compute-1.amazonaws.com:5432/deg7cmst5oa3fg?ssl=true';
var client = new pg.Client(connectionString);

client.connect(function(err){
  if(err) {
    console.log(JSON.stringify(err));
  }
});

var matches = require('./routes/matches')(client);
var update = require('./routes/update')(client);
var post = require('./routes/post')(client);
var edit = require('./routes/edit')(client);
var teams = require('./routes/teams')(client);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/team', teams);
app.use('/edit', edit);
app.use('/matches', matches);
app.use('/update', update);
app.use('/post', post);

//var sched = later.parse.text('every 1 min');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
