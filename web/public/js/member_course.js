jQuery(function($) {
	var TPL = {
		rItemTpl: [
					'{{~it.datas :v:i}}',
                        '<div class="wo_box">',
                          '<p class="wo1"><a href="{{=v.course_link}}">{{=v.course_name}}</a></p>',
                          '<p class="wo2"><a href="{{=v.train_link}}">{{=v.train_org}}</a></p>',
                          '<p class="wo3">{{=v.train_date}}</p>',
                          '<p class="wo4">{{=v.train_time}}</p>',
                          '<p class="wo5">{{=v.mobile}}<br>',
                            '{{=v.phone}}</p>',
                        '</div>',
					'{{~}}'
				   ].join(''),
		cItemTpl: [			
			'{{~it.datas :v:i}}',
            '{{=v}}',
			'{{~}}'			
		].join('')
	}
	$.fn.courseList = function(options) {
		var rItemTpl = doT.template(TPL.rItemTpl),
			cItemTpl = doT.template(TPL.cItemTpl);

		$.get(options.dataUrl, options.params, function(json) {
			$('#course-list').append(rItemTpl({
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
	$('#course-list').courseList({
		dataUrl: setting.courseUrl,
		params: {
			page: 1
		}
	});
});
