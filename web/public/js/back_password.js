jQuery(function($) {
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

    $('#btn-send').on('click', function(e) {
      e.preventDefault();

      var param = {
            code: $('#code').val(),
            mail: $('#mail').val()
          },
          mailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;      
      if(!mailReg.test(param.mail)) {
        alert('邮箱地址有问题，请重新输入');
        return;
      }      

      $.post(setting.sendMailUrl, param, function(data) {
        if(data.result) {
          location.href = data.url;
        }else {
          alert(data.errorDesc);
        }
        
      });

    });
});
