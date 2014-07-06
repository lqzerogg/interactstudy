
var routes = require('./routes/index');
var users = require('./routes/users');

exports.init = function(app) {	
	app.use('/', routes);
	app.use('/users', users);
}
