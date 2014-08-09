jQuery(function($) {
	/*验证码*/
	function changeCode() {
      $.get(setting.getCodeUrl, function(data) {
          if(data.result) {
            $('#identify-code').attr('src', data.src);            
          }

      });
    }
    $('#btn-change').on('click', function(e) {
      	e.preventDefault();      
      	changeCode();
    }).trigger('click');

    //验证字段
    /**
     * 验证在数组内的表单元素
     * @param eleArr
     * @returns {boolean}
     * @private
     */
    function checkField(eleArr) {
        var pass = true, _this = this, errorDesc = {
            required: '字段不能为空',
            pattern: '不符合规则'
        };
        function showError($ele, str) {
            $ele.closest('.text_box').addClass('error').find('.t_r').text(str);
        }
        $(eleArr.join(',')).each(function() {
            var $this = $(this);

            if($this.attr('required') && !$this.val()) {
                showError($this, errorDesc['required']);
                pass = false;
            }else if($this.attr('pattern') && !$this.val().match(new RegExp($this.attr('pattern')))) {
                showError($this, errorDesc['pattern']);
                pass = false;
            }else if($this.attr('remote') && !$this.data('pass')) {
                showError($this, $this.data('err'));
                pass = false;
            }else {
                var $desc = $this.closest('.text_box').removeClass('error').find('.t_r');
                $desc.text($desc.data('desc'));
            }
        });
        return pass;
    }
    //验证邮箱和用户名
    $('#email, #username, #verifypsw, #code').on('blur', function(e) {
    	var $this = $(this), param = {}, fields = ['#' + $this.attr('id')];

    	if(checkField(fields)) {
    		param[$this.attr('id')] = $this.val();
    		if($this.attr('id') === 'verifypsw') {	    		
	    		param['password'] = $('#password').val();
	    	}
    		console.log('check: ', fields);
	    	$.post(setting.checkUrl, param, function(data) {
	    		if(data.result) {
	    			$this.data('pass', true);
	    		}else {
	    			$this.data('pass', false)
	    			.data('err', data.error[$this.attr('id')]);
	    		}
	    		checkField(fields);
	    	});
    	}    	
    });

    //验证密码
    $('#password').on('blur', function(e) {
    	var $this = $(this), param = {}, fields = ['#' + $this.attr('id')];    	    	

    	checkField(fields);    	
    });
    //提交
    $('#submit').on('click', function(e) {
    	var pass = checkField(['#email', '#username', '#password', '#verifypsw', '#code']),
    		protocol = $('#protocol').attr('checked'),
    		params, tags = [];

    	e.preventDefault();

    	$('#protocol').closest('.text_box')[protocol? 'removeClass': 'addClass']('error');
    	if(pass && protocol) {
    		params = $('#form').serialize();
    		$('#myTags a').each(function(i, v) {
    			tags.push($(v).attr('title'));
    		});
    		params += '&tags=' + encodeURIComponent(tags.join(','));

    		console.log('submit: ', params);

    		$.post(setting.registerUrl, params, function(data) {
    			if(data.result) {
    				window.location = setting.linkAuthentication;
    			}else {
    				alert('系统出错,请稍后重试');
    			}
    		});
    	}

    });

    var optionTpl = doT.compile('{{~it.datas :v:i}}<option value="{{=v.value}}">{{=v.name}}</option>{{~}}');
    function getAddress($container, type, value) {
    	var param = {};
    	param[type] = value;
    	$.get(setting.getAddressUrl, param, function(data) {
    		if(data.result) {
    			data.datas.unshift({value: '', name: '请选择'});
    			$container.html(optionTpl(data));
    		}
    	});
    }

    var $city = $('#city');
    getAddress($city, '');

    $city.on('change', function(e) {
    	getAddress($('#district'), 'city', $(this).val());
    });
});