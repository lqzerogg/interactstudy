var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var router = require('./router');
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

router.init(app);   
app.use('/get_courses', require('./routes/get_courses'));
app.use('/get_comunities', require('./routes/get_comunities'));
app.use('/get_course_ranking', require('./routes/get_course_ranking'));
app.use('/get_comunity_ranking', require('./routes/get_comunity_ranking'));

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
