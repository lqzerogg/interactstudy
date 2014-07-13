jQuery(function($) {
	var TPL = {
		rItemTpl: [
					'{{~it.datas :v:i}}',
					'<li class="">',
						'<span class="index">{{=i}}.</span>',
						'<a href="{{=v.link}}" class="course">{{=v.name}}</a>',
						'<span class="num">(<span>{{=v.number}}</span>)人</span>',
					'</li>',
					'{{~}}'
				   ].join(''),
		cItemTpl: [			
			'{{~it.datas :v:i}}',
			'<li><a href="{{=v.link}}">{{=v.name}}</a></li>',
			'{{~}}'			
		].join(' ')
	}
	$.fn.rankingList = function(options) {
		var rItemTpl = doT.template(TPL.rItemTpl),
			cItemTpl = doT.template(TPL.cItemTpl);

		$(this).find('.caption').text(options.caption);

		$.get(options.dataUrl, function(json) {
			$(this).find('.r-list').append(rItemTpl({
				datas: json.rankingDatas
			})).end().find('.c-list').append(cItemTpl({
				datas: json.categories
			}));	;			
		}.bind(this));

		// $(this).find('.r-list').append(rItemTpl({
		// 	datas: options.rankingList
		// }));


		// $(this).find('.c-list').append(cItemTpl({
		// 	datas: options.cList
		// }));

		return this;
	}
});