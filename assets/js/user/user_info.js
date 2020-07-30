$(function () {
   //渲染资料页面数据
   $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
         if (res.status !== 0) return;
         localStorage.setItem('id', res.data.id);
         layui.form.val('fUInfo',res.data);  //快速赋值
         $('form').on('submit', function (e) {
            e.preventDefault();
            //限制用户输入昵称长度
            layui.form.verify({
               nickname: function (value) {
                  if (value.length > 6) return '昵称只能6-12位之间';
               }
            });
            let id = localStorage.getItem('id');
            $.post('/my/userinfo',{id:id,
               nickname: $('#nickname').val(),
               email: $('#email').val()})
         })
      }
   })
}) //end