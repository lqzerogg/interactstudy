//下拉菜单

$(function(){

	$(".select1").each(function(){
		var s=$(this);
		var z=parseInt(s.css("z-index"));
		var dt=$(this).children("dt");
		var dd=$(this).children("dd");
		var _show=function(){dd.slideDown(100);dt.addClass("cur");s.css("z-index",z+1);};   //展开效果
		var _hide=function(){dd.slideUp(100);dt.removeClass("cur");s.css("z-index",z);};    //关闭效果
		dt.click(function(){dd.is(":hidden")?_show():_hide();});
		dd.find("a").click(function(){dt.html($(this).html());_hide();});     //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
		$("body").click(function(i){ !$(i.target).parents(".select1").first().is(s) ? _hide():"";});
	})
})




//价格排序

$(function(){ 
$(".j").click(function(){ 
$(".j").toggleClass('j1') 
}); 
}); 





//筛选功能

        (function ($) {

            var $s1 = $('#s1'),
                $s2 = $('#s2'),
                $emptySelector = $('#emptySelector'),
                $alreadySelected = $('#alreadySelected dl'),
                template = $('#scopeTemplate').html();

            // 扩展 jQuery 增加获取去除首尾空白文本的方法 
            $.fn.extend({
                trimText: function () {
                    return $.trim(this.text());
                }
            });

            // 模版内容编译
            function compile(template, data) {
                return (template + "").replace(/\{\{=([a-zA-Z_0-9]+)\}\}/ig, function (varCode, varName) {
                    return data[varName];
                })
            }


            // 如果已选中列表为空则显示消息
            function displayTipsIfEmpty() {
                if ($alreadySelected.find('dd').length === 1) {
                    $emptySelector.show();
                }
            }

            // 缓存类别与文本
            $('.select-list dt').each(function () {
                var $dt = $(this);
                $dt.siblings('dd').each(function () {
                    var $dd = $(this);
                    $dd.attr('data-type', $dt.trimText())
                       .attr('data-text', $dd.trimText());
                });
            });

            //注册事件
            $(document)
            .on('click.selectItem', '.select-list dd', function () {
                var $this = $(this),
                    type = $this.data('type'),
                    $existItem = $alreadySelected.find('dd[data-type="' + type + '"]');

                // 移除已选中同类型
                if ($existItem.length > 0) {
                    $existItem.remove();
                }

                // 移除空提示
                $emptySelector.hide();

                // 清除同类别选中项
                $this.siblings('dd.selected').removeClass('selected');

                // 标识选中
                $this.addClass('selected')

                // 将选中加到选择区
                if ($this.text() !== '全部') {
                    $this.clone().data('source', $this).appendTo($alreadySelected);
                }

                displayTipsIfEmpty();

            })
            .on('click.addItem', '#s3', function () {
                $alreadySelected.find('dd[data-type="课程学费："]').trigger('click');
                $(compile(template, { type: '课程学费：', min: $s1.val(), max: $s2.val() })).insertAfter($emptySelector);
                $emptySelector.hide();
            })
            .on('click.deleteItem', '#alreadySelected dd:not(#emptySelector)', function () {
                var $this = $(this),
                    $source = $this.data('source');

                // 清除关连选中状态
                $source && $source.removeClass('selected');

                // 移除自身
                $this.remove();

                displayTipsIfEmpty();
            })

        })(jQuery);
		
$(function(){ 
$("#select4 dd").click(function(){ 
$(".show").show()
}); 
}); 

$(function(){ 
$(".hide").click(function(){ 
$(".show").hide()
}); 
}); 
				
		
	


//标签


var FancyForm=function(){
	return{
		inputs:".FancyForm input, .FancyForm textarea",
		setup:function(){
			var a=this;
			this.inputs=$(this.inputs);
			a.inputs.each(function(){
				var c=$(this);
				a.checkVal(c)
			});
			a.inputs.live("keyup blur",function(){
				var c=$(this);
				a.checkVal(c);
			});
		},checkVal:function(a){
			a.val().length>0?a.parent("li").addClass("val"):a.parent("li").removeClass("val")
		}
	}
}();

$(document).ready(function() {
	FancyForm.setup();
});

var searchAjax=function(){};
var G_tocard_maxTips=30;

$(function(){(
	function(){
		
		var a=$(".plus-tag");
		
		$("a em",a).live("click",function(){
			var c=$(this).parents("a"),b=c.attr("title"),d=c.attr("value");
			delTips(b,d)
		});
		
		hasTips=function(b){
			var d=$("a",a),c=false;
			d.each(function(){
				if($(this).attr("title")==b){
					c=true;
					return false
				}
			});
			return c
		};

		isMaxTips=function(){
			return	
			$("a",a).length>=G_tocard_maxTips
		};

		setTips=function(c,d){
			if(hasTips(c)){
				return false
			}if(isMaxTips()){
				alert("最多添加"+G_tocard_maxTips+"个标签！");
				return false
			}
			var b=d?'value="'+d+'"':"";
			a.append($("<a "+b+' title="'+c+'" href="javascript:void(0);" ><span>'+c+"</span><em></em></a>"));
			searchAjax(c,d,true);
			return true
		};

		delTips=function(b,c){
			if(!hasTips(b)){
				return false
			}
			$("a",a).each(function(){
				var d=$(this);
				if(d.attr("title")==b){
					d.remove();
					return false
				}
			});
			searchAjax(b,c,false);
			return true
		};

		getTips=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("title"))
			});
			return b
		};

		getTipsId=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value"))
			});
			return b
		};
		
		getTipsIdAndTag=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value")+"##"+$(this).attr("title"))
			});
			return b
		}
	}
	
)()});

// 更新选中标签标签
$(function(){
	setSelectTips();
	$('.plus-tag').append($('.plus-tag a'));
});
var searchAjax = function(name, id, isAdd){
	setSelectTips();
};
// 搜索
(function(){
	var $b = $('.plus-tag-add button'),$i = $('.plus-tag-add input');
	$i.keyup(function(e){
		if(e.keyCode == 13){
			$b.click();
		}
	});
	$b.click(function(){
		var name = $i.val().toLowerCase();
		if(name != '') setTips(name,-1);
		$i.val('');
		$i.select();
	});
})();
// 推荐标签
(function(){
	var str = ['展开推荐标签', '收起推荐标签']
	$('.plus-tag-add a').click(function(){
		var $this = $(this),
				$con = $('#mycard-plus');

		if($this.hasClass('plus')){
			$this.removeClass('plus').text(str[0]);
			$con.hide();
		}else{
			$this.addClass('plus').text(str[1]);
			$con.show();
		}
	});
	$('.default-tag a').live('click', function(){
		var $this = $(this),
				name = $this.attr('title'),
				id = $this.attr('value');
		setTips(name, id);
	});
	// 更新高亮显示
	setSelectTips = function(){
		var arrName = getTips();
		if(arrName.length){
			$('#myTags').show();
		}else{
			$('#myTags').hide();
		}
		$('.default-tag a').removeClass('selected');
		$.each(arrName, function(index,name){
			$('.default-tag a').each(function(){
				var $this = $(this);
				if($this.attr('title') == name){
					$this.addClass('selected');
					return false;
				}
			})
		});
	}

})();
// 更换链接
(function(){
	var $b = $('#change-tips'),
		$d = $('.default-tag div'),
		len = $d.length,
		t = 'nowtips';
	$b.click(function(){
		var i = $d.index($('.default-tag .nowtips'));
		i = (i+1 < len) ? (i+1) : 0;
		$d.hide().removeClass(t);
		$d.eq(i).show().addClass(t);
	});
	$d.eq(0).addClass(t);
})();

