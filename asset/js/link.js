$(function(){
    link_flag = false;
    $('#link_icon').click(function(){
        if (link_flag ) {
            $('#popover-link-box').fadeOut('2000');
            $('.link-box-item').fadeOut('2000;')
            link_flag = false;
        } else {

            $('#popover-link-box').show();
            $('.link-box-item').fadeIn('3000;')
            link_flag = true;

        }

    });
});