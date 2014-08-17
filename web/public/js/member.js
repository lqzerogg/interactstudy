jQuery(function($) {
	var TPL = {
		rItemTpl: [
					'{{~it.datas :v:i}}',
                    '<div class="message">',
                      '<div class="m_box">',
                        '<div class="mes_1"><span><img src="{{=v.pic}}" width="36" height="36"></span><span>{{=v.name}}</span></div>',
                        '<div class="mes_2">{{=v.title}}</div>',
                        '<div class="mes_3">',
                          '<p class="mes_btn">私人消息</p>',
                        '</div>',
                        '<div class="mes_4">{{=v.timestamp}}</div>',
                        '<div class="mes_5">',
                          '<p class="mes_btn1"><a href="javascript:;">&nbsp;</a></p>',
                        '</div>',
                      '</div>',
                    '</div>',
                    '<div class="mes_show">',
                      '<p>{{=v.desc}}</p>',
                      '<p><a href="{{=v.replyUrl}}">回复</a><a href="{{=v.delUrl}}">删除</a></p>',
                    '</div>',
					'{{~}}'
				   ].join(''),
		cItemTpl: [			
			'{{~it.datas :v:i}}',
            '{{=v}}',
			'{{~}}'			
		].join('')
	}
	$.fn.messageList = function(options) {
		var rItemTpl = doT.template(TPL.rItemTpl),
			cItemTpl = doT.template(TPL.cItemTpl);

		$.get(options.dataUrl, options.params, function(json) {
			$('#msg-list').append(rItemTpl({
				datas: json.msg
			}));
            $('.digg').append(cItemTpl({
				datas: json.page
			}));
		}.bind(this));

		return this;
	}
});

jQuery(function($) {
	var setting = window.setting;
	$('#msg-list').messageList({
		dataUrl: setting.messageUrl,
		params: {
			type: 'notread',
			page: 1
		}
	});
});
