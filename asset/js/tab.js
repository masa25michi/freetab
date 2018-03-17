$(function(){
    $('body').on('click','.tablink',function (e) {
        id = $(this).attr('id');
        hidealltab();

        $('.tablink').removeClass('active');
        $(this).addClass('active');

        if (id === 'general_tab') {
            $('#general_tab').addClass('active');
            $('.setting-table-div').show('slow');

        } else if(id === 'user_tab') {
            $('#user_tab').addClass('active');

            var masatab_user_name = localStorage.getItem("user_name");
            if(masatab_user_name === null) {
                $('.new-user-register').show('slow');
            } else
            {
                var masatab_user_name_arr = JSON.parse(masatab_user_name);

                var today = new Date();
                var curHr = today.getHours();
                var greeting_words = '';

                if (curHr < 12) {
                    greeting_words = 'Good Morning';
                } else if (curHr < 18) {
                    greeting_words = 'Good Afternoon';
                } else {
                    greeting_words = 'Good Evening'
                }

                $('.greeting_in_user_profile').text(greeting_words);
                $('.user_name').text(masatab_user_name_arr['user_name']);
                $('.user-profile').show('slow');
            }
        } else if(id === 'contact_tab') {
            $('#contact_info').addClass('active');

            $('.contact_info').show('slow');
        } else if(id === 'about_tab') {
            $('#about_tab').addClass('active');

            $('.about_info').show('slow');
        }
    });

});

function hidealltab()
{
    $('.setting-table-div').hide();
    $('.new-user-register').hide();
    $('.user-profile').hide();
    $('.contact_info').hide();
    $('.about_info').hide();
}

