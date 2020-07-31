$(function () {

   var layer = layui.layer;
   // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
   }

   // 1.3 创建裁剪区域
   $image.cropper(options)


   //选择图片
   $('#btnImgFile').on('click', function () {
      $('#file').click();
   });


   // 文件框绑定change事件
   $('#file').on('change', function (e) {
      var filelist = e.target.files;
      if (filelist.length === 0) {
         return layer.msg('未选择头像文件');
      }
      // 文件上传之后是上传到内存中


      // var file = e.target.file[0];
      // var imgURL = URL.createObjectURL(file);

      var newImgURL = URL.createObjectURL(this.files[0]);
      //把获取到的最新的图片路径替换原始图片
      $image
         .cropper('destroy')  //销毁旧的裁剪区
         .attr('src', newImgURL) // 重新设置图片路径
         .cropper(options)  // 重新初始化裁剪区域
   })


   // 确认上传

   $('#btnImgEnter').on('click', function () {
      var dataURL = $image
         .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
         })
         .toDataURL('image/png')
      $.ajax({
         type:'POST',
         url:'/my/update/avatar',
         data: {
            avatar:dataURL
         },
         success:function(res){
               if (res.status != 0) return layer.msg('上传头像失败!');
               window.parent.getUserInfos();
         }
      })

   })



})