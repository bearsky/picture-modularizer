$(document).ready(function () {
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#previewImg').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#fileUpload").change(function(){
      $('.custom-file-upload').hide();
      $('#previewImg').show();
      $('#uploadBtn').removeClass('btn-disabled').addClass('btn-active').attr('disabled', false);
      readURL(this);
    });

    $("#imgUpload").submit(function (event) {
        event.preventDefault();
        var form = $('#imgUpload')[0];
        var data = new FormData(form);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/upload",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            beforeSend: function(){
              $('.modules-container').empty();
            },
            success: function (data) {
              $('.modules').show();
              data.partsArr.forEach((item) => {
                $('.modules-container').append('<img src="uploads/'+data.publicPath+'/'+item+'" alt="parts">');
              });
            },
            error: function (e) {
              console.error("ERROR : ", e);
            }
        });
    });
});