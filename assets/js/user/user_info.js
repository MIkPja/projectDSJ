$(function () {

   var form = layui.form;
   form.verify({
      nickname: function (value) {
         if (value.length > 6)  return '昵称只能6-12位之间';
      }
   })




   $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
         if (res.status !== 0) return;
         console.log(res);
         localStorage.setItem('id', res.data.id);
         $('#username').val(res.data.username);
         $('#nickname').val(res.data.nickname);
         $('#email').val(res.data.email);

         $('form').on('submit', function (e) {
            e.preventDefault();
            //获取用户id
            let id = localStorage.getItem('id');
            $.ajax({
               type: 'POST',
               url: '/my/userinfo',
               data: {
                  id: id,
                  nickname: $('#nickname').val(),
                  email: $('#email').val()
               },
               success: function (res) {
                  if (res.status !== 0) return '修改用户信息失败!'
                  console.log('修改成功');
               }
            })
         })



      }
   })












}) //end