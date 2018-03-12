$(function(){
    // $('.user-profile').hide();
    // $('.setting-table').hide();
    $('body').on('click','.tablink',function (e) {
        id = $(this).attr('id');

        $('.tablink').removeClass('active');
        $(this).addClass('active');

        if (id === 'general_tab') {
            $('#general_tab').addClass('active');
            hidealltab();
            $('.setting-table').show('slow');
        } else if(id === 'user_tab') {
            $('#user_tab').addClass('active');
            hidealltab();
            var masatab_user_name = localStorage.getItem("user_name");
            if(masatab_user_name === null) {
                $('.new-user-register').show('slow');
            } else
            {
                var masatab_user_name_arr = JSON.parse(masatab_user_name);
                console.log(masatab_user_name_arr['user_name']);

                $('.user_name').text(masatab_user_name_arr['user_name']);
                $('.user-profile').show('slow');
            }
        } else if(id === 'contact_tab') {
            $('#contact_info').addClass('active');
            hidealltab();
            $('.contact_info').show('slow');
        } else if(id === 'about_tab') {
            $('#about_tab').addClass('active');
            hidealltab();
            $('.about_info').show('slow');
        }
    });

});

function hidealltab()
{
    $('.setting-table').hide();
    $('.new-user-register').hide();
    $('.user-profile').hide();
    $('.contact_info').hide();
        $('.about_info').hide();
}

