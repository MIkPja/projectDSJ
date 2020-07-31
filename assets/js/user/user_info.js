$(function () {
   //渲染资料页面数据
   setAjax();
   function setAjax() {
      $.ajax({
         type: 'get',
         url: '/my/userinfo',
         success: function (res) {
            if (res.status !== 0) return;
            localStorage.setItem('id', res.data.id);
            layui.form.val('fUInfo', res.data);  //快速赋值

         }
      });
   };
   $('form').on('submit', function (e) {
      e.preventDefault();
      //限制用户输入昵称长度
      layui.form.verify({
         nickname: function (value) {
            if (value.length > 6) return '昵称只能6-12位之间';
         }
      });
      let id = localStorage.getItem('id');
      $.post('/my/userinfo', {
         id: id,
         nickname: $('#nickname').val(),
         email: $('#email').val()
      }, function (res) {
         if (res.status !== 0) return layer.msg('修改失败!');
         layer.msg('修改成功!');
         var name = $('#nickname').val();
         window.parent.getName(name)
      });
   });

   $('#resets').on('click', function (e) {
      e.preventDefault();
      setAjax();
   });
}) //end