var express = require('express');
var router = express.Router();

var exports = {
	key: '/member/setup',
	response: function(req, res) {
		var obj = {msg: '保存成功', code: 1};
        var pic = req.pic;
        var username = req.username;
        var realname = req.realname;
        var sex = req.sex;
        var city = req.city;
        var area = req.area;
        var street = req.street;
        var num = req.num;
        var tag = req.tag;
        //保存这些资料
        //save()
		res.status(200).send(obj);
	  
	}
}

module.exports = exports;