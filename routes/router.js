var express = require('express');
var router = express.Router();
var fs = require('fs');
var json = "";

//页面请求初始化
fs.readdir('./routes/page_json', function(err, files) {
	if(err) throw err;

	var jsons = files.filter(function(v) {
		return v.indexOf('.json') > 0;
	});

	jsons.forEach(function(v, i) {
		var json, pathName = v.split('.')[0];
		//分配路径
		if(pathName === 'index') {
			router.get('/', function(req, res) {
				res.render(pathName, json);
			});
		}else if(pathName === 'error') {
			
		}else {
			router.get('/' + pathName, function(req, res) {
				res.render(pathName, json);
			});
		}
		
		//读取json文件		
		fs.readFile('./routes/page_json/' + v, function(err, data) {
			if(err) throw err;
			// console.log(v);
			// console.log('~~~~~~~');
			// console.log(data);
			json = JSON.parse(data);
			json.path = '';
		});

	});
});

//ajax初始化
fs.readdir('./routes/ajax', function(err, files) {
	if(err) throw err;

	var ajax = files.filter(function(v) {
		return v.indexOf('.js') > 0;
	});

	ajax.forEach(function(v, i) {
		var name = v.split('.')[0];		
		var action = require('./ajax/' + v);
		router.get(action.key, action.response);		
		router.post(action.key, action.response);		
	});
});
// ajax请求初始化

module.exports = router;