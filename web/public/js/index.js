jQuery(function($) {
	var TPL = {
		itemTpl: ['{{~it.datas :v:i}}',
					'<li class="item">',
						'<div class="image-wrapper">',
							'<a target="_blank" href="{{=v.link}}">',
								'<img src="{{=v.src}}" alt="{{=v.name}}">',
							'</a>',
							'<div class="name clearfix">',
								'<a href="{{=v.link}}">',
									'<span class="text">{{=v.name}}</span>',
									'<span class="stars stars-{{=v.stars}} clearfix">',
										'<span class="star-black glyphicon">star</span>',
										'<span class="star-yellow glyphicon">star</span>',
									'</span>',
								'</a>',
							'</div>',
						'</div>',
						'<div class="desc">',
							'<p class="teacher">授课老师：{{=v.teacher}}</p>',
							'<p class="stu-num">报名人数：<span>{{=v.number}}</span>人</p>',
						'</div>',
					'</li>',
				'{{~}}'].join(''),
		categoryTpl: ['<ol class="category">',
							'{{~it.categories :v:i}}',
							'<li class="c-item {{? i === 0 }}active{{?}}"><a href="#" data-cat="{{=v.cat}}">{{=v.name}}</a></li>',							
							'{{~}}',
						'</ol>'].join('')
	}		
	$.fn.itemList = function(options) {
		var $cItem = $(this).find('.item-list .c-item'),
			params = {},
			getData = function (param) {
			$.get(options.dataUrl, param, function(json) {
				this.find('.i-list').html(itemTpl({
					datas: json.datas
				}));
			}.bind(this));
		}.bind(this);

		var categoryTpl = doT.template(TPL.categoryTpl),
			itemTpl = doT.template(TPL.itemTpl);

		// $(this).find('.i-list').append(itemTpl(obj));
		
		this.find('.category-wrapper .caption').text(options.cName);		

		params[options.keyName] = $cItem.eq(0).addClass('active').find('a').data('value');
		getData(params);
		
		this.find('.category').on('click', '.c-item a', function(e) {
			e.preventDefault();

			var $this = $(this), params = {};

			if(!$this.parent().hasClass('active')) {				
				$this.parent().addClass('active').siblings().removeClass('active');

				params[options.keyName] = $this.data('value');
				getData(params);
			}

		}).find('.more a').click(function(e) {
			e.stopPropagation();
		});

		return this;
	};
});
jQuery(function($) {
	var TPL = {
		rItemTpl: [
					'{{~it.datas :v:i}}',
					'<li class="">',
						'<span class="index">{{=i}}.</span>',
						'<a target="_blank" href="{{=v.link}}" class="course">{{=v.name}}</a>',
						'<span class="num">(<span>{{=v.number}}</span>)人</span>',
					'</li>',
					'{{~}}'
				   ].join(''),
		cItemTpl: [			
			'{{~it.datas :v:i}}',
			'<li><a target="_blank" href="{{=v.link}}">{{=v.name}}</a></li>',
			'{{~}}'			
		].join(' ')
	}
	$.fn.rankingList = function(options) {
		var rItemTpl = doT.template(TPL.rItemTpl),
			cItemTpl = doT.template(TPL.cItemTpl);

		$(this).find('.caption').text(options.caption);

		$.get(options.dataUrl, options.params, function(json) {
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
jQuery(function($) {
	var TPL = {
		imgTpl: [
					'{{~it.datas :v:i}}',
					'<li><img src="{{=v.src}}" alt="{{=v.name}}"></li>',
					'{{~}}'
				]
	}
});
jQuery(function($) {
	// var $searcherBtn = $('.searcher-button');
	// $('.searcher').find('.nav-tab').on('click', 'li a', function() {
	// 	var $this = $(this), params = {};
	// 	params[$this.data('key')] = $this.data('value');

	// 	$searcherBtn.data('params', params);
	// });
	// $searcherBtn.click(function(e) {
		
	// });
});

jQuery(function($) {
	var setting = window.setting;

	$('.recommander').itemList({
		cName: '课程推荐',
		dataUrl: setting.courseUrl,
		keyName: 'courseType'
	}).find('.ranking-list').rankingList({
		caption: '热门课程排行',
		dataUrl: setting.courseRankingUrl,
		params: {
			type: 'course'
		}
	});	

	$('.organization').itemList({
		cName: '极动社团',
		dataUrl: setting.comunityUrl,
		keyName: 'type'
	}).find('.ranking-list').rankingList({
		caption: '精彩主题讨论',
		dataUrl: setting.courseRankingUrl,
		params: {
			type: 'discussion'
		}
	});	
});
