var express = require('express');
var router = express.Router();

var exports = {
	key: '/member/message',
	response: function(req, res) {
		var obj = {msg: [], page: ""}, i = 6;

		while(i-- > 0) {
			obj.msg.push({
				id: i,
				pic: '/img/member_icona.png',
				name: '黄小雄',
				title: '关于极动教室用户个人中心的问题',
				msgType: '私人消息',
				timestamp: '2014-5-1  10:00',
				desc: '我好想你啊，你啥时候教我钢琴啊？我好想你啊，你啥时候教我钢琴啊？我好想你啊，你啥时候教我钢琴啊？我好想你啊，你啥时候教我钢琴啊？我好想你啊，你啥时候教我钢琴啊？我好想你啊，你啥时候教我钢琴啊？我好想你啊，你啥时候教我钢琴啊？',
				replyUrl: '#',
				delUrl: '#'
			});
		}
        obj.page = '<span class="disabled">&lt;&lt;首页</span><span class="disabled">&lt;上一页</span><span class="current">1</span><a href="#">2</a><a href="#">3</a><a href="#">下一页&gt;</a><a href="#">尾页&gt;&gt;</a>';
		res.set('Content-Type', 'text/json');

		res.status(200).send(obj);
	  
	}
}

module.exports = exports;