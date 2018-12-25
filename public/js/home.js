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

    $('#fileUpload').change(function(){
      $('.custom-file-upload, #previewImg').toggle();
      $('#uploadBtn').removeClass('btn-disabled').addClass('btn-active').attr('disabled', false);
      readURL(this);
    });

    $('.clear-icon').click(function () {
      $('#fileUpload').val('');
      $('.custom-file-upload, #previewImg').toggle();
      $('#uploadBtn').removeClass('btn-active').addClass('btn-disabled').attr('disabled', true);
    });

    $('#imgUpload').validate({
        onkeydown: true,
        rules: {
            imgFile: {
                required: true,
            },
            parts: {
                required: true,
                number: true,
                min: 2,
            }
        },
        messages: {
          parts: "At least 2 parts"
        },
    });

    $('#imgUpload').submit(function (event) {
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
              $('.details-container').empty();
            },
            success: function (data) {
              $('#uploadBtn').removeClass('btn-active').addClass('btn-disabled').attr('disabled', true);
              $('.modules').show();
              $('.details').show();
              data.partsArr.forEach((item) => {
                $('.modules-container').append('<a href="'+data.publicPath+'/'+item+'"><img src="uploads/'+data.localPath+'/'+item+'" alt="parts"></a>');
              });
              $('.details-container').append(
                '<a href="'+data.publicPath+'/'+data.filename+'"><img src="uploads/'+data.localPath+'/'+data.filename+'" alt="full"></a>'
              );
            },
            error: function (e) {
              console.error("ERROR : ", e);
            }
        });
    });
});