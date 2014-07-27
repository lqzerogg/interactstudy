var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var router = require('./routes/router');
var fs = require('fs');
//debug
var util = require('util');
//debug


var app = express();

// view engine setup
app.engine('html', cons.hogan);
app.set('view engine', 'html');


app.set('views', path.join(__dirname, 'web/view'));

app.use(favicon());  
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/web/public')));

app.use('/', router);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render(pathName, json);
    });
}

// production error handler
// no stacktraces leaked to user
var errJson = {};
fs.readFile('./routes/page_json/error.json', function(err, data) {
    if(err) throw err;
    // console.log(v);
    // console.log('~~~~~~~');
    // console.log(data);
    errJson = JSON.parse(data);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', errJson);
});


module.exports = app;
