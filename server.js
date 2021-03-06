var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var posts = require('./routes/Posts');
var users = require('./routes/Users');
var categories = require('./routes/Categories');

var app = express();
var cors = require('cors');
// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cors({
  origin: true,
  credentials: true

}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static('/uploads/'));

/*app.use('/resources',express.static(__dirname + '/images'));
So now, you can use http://localhost:5000/resources/myImage.jpg to serve all the images instead of http://localhost:5000/images/myImage.jpg. */
app.use('/Api/posts',posts);
app.use('/Api/users',users);
app.use('/Api/categories',categories);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

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
