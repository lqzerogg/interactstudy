var express = require('express');
var router = express.Router();
var fs = require('fs');
var json = "";

fs.readFile('./routes/index.json', function (err, data) {
  if (err) throw err;
  json = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res) {	
	console.log(json);
  res.render('index', json);
});

module.exports = router;
