var express = require('express');
var router = express.Router();

var exports = {
	key: '/member/getCourse',
	response: function(req, res) {
		var obj = {msg: [], page: ""}, i = 6;

		while(i-- > 0) {
			obj.msg.push({
				id: i,
				course_link: '#',
				course_name: '儿童钢琴课程',
				train_link: '#',
				train_org: '刘诗昆钢琴艺术中心',
				train_date: '2014-5-1',
				train_time: '10：00-11：00',
				mobile: '13912345678',
				phone: '020-875589899'
			});
		}
        obj.page = '<span class="disabled">&lt;&lt;首页</span><span class="disabled">&lt;上一页</span><span class="current">1</span><a href="#">2</a><a href="#">3</a><a href="#">下一页&gt;</a><a href="#">尾页&gt;&gt;</a>';
		res.set('Content-Type', 'text/json');

		res.status(200).send(obj);
	  
	}
}

module.exports = exports;