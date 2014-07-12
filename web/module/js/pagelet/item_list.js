// define("pagelet/b", function(require) {
//         console.log('bbbbbbb');
//    }
// );
jQuery(function($) {
	var TPL = {
		itemTpl: ['{{~it.datas :v:i}}',
					'<li class="item">',
						'<a class="image-wrapper" href="{{=v.link}}">',
							'<img src="{{=v.src}}" alt="{{=v.name}}">',
							'<div class="name clearfix">',
								'<span class="text">{{=v.name}}</span>',
								'<div class="stars stars-1 clearfix">',
									'<div class="star-yellow"></div>',
									'<div class="star-black"></div>',
								'</div>',
							'</div>',
						'</a>',
						'<div class="desc">',
							'<p class="teacher">授课老师：{{=v.teacher}}</p>',
							'<p class="stu-num">报名人数：<span>{{=v.number}}</span>人</p>',
						'</div>',
					'</li>',
				'{{~}}'].join(''),
		categoryTpl: ['<p class="caption">{{=it.cName}}</p>',
						'<ol class="category">',
							'{{~it.categories :v:i}}',
							'<li class="c-item {{? i === 0 }}active{{?}}"><a href="#" data-cat="{{=v.cat}}">{{=v.name}}</a></li>',							
							'{{~}}',
						'</ol>'].join('')
	}		
	$.fn.itemList = function(options) {
		var categoryTpl = doT.template(TPL.categoryTpl),
			itemTpl = doT.template(TPL.itemTpl);

		$(this).find('.category-wrapper').append(categoryTpl(options));

		var obj = {datas: []}, i = 10;

		while(i-- > 0) {
			obj.datas.push({
				src: 'http://img.yacol.com/export/sites/yacol/life/images/bjjy1.jpg',
				name: '梵高教你星夜' + i,
				teacher: '黄小雄' + i,
				number: Math.floor(23333 / (i + 1)),
				link: '#'
			});
		}

		$(this).find('.i-list').append(itemTpl(obj));

		$.post(options.url, function(json) {
			$(this).find('list').append(itemTpl({
				datas: json
			}));			
		});

		return this;
	};
});