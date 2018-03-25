$(function(){

    $('#countdown_back_button').click(function(){
        $('#timer_div').hide();
        $('#count_div').hide();
        $('#time_content').fadeIn('2000');
    });

    $( ".datepicker" ).datepicker(
        {
            onSelect: function() {
                $('#select_count_down').hide();
                var dateObject = $(this).datepicker('getDate');
                localStorage.setItem('countdown_date', JSON.stringify({'countdown_date':dateObject.getDate(),'countdown_month':dateObject.getMonth(), 'countdown_year':dateObject.getFullYear() }));

                startCountDown();
            }
        }
    );

    $('#calendar_countdown_icon').click(function(e){
        startCountDown();
    });

});


function startCountDown()
{
    $('#show_count_down').hide();
    $('#select_count_down').hide();

    var masatab_countdown= localStorage.getItem("countdown_date");
    if(masatab_countdown === null) {

        $('#select_count_down').fadeIn('slow');
    } else {
        var masatab_countdown_arr = JSON.parse(masatab_countdown);

        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        var countDown = new Date(masatab_countdown_arr['countdown_year'],masatab_countdown_arr['countdown_month'],masatab_countdown_arr['countdown_date'],0,0,0,0).getTime();
        var x = setInterval(function() {
            $('.countdown_edit_button').click(function(){
                localStorage.removeItem('countdown_date');
                clearInterval(x);

                $('#show_count_down').hide();
                $('#select_count_down').fadeIn('slow');

            });

            var now = new Date().getTime();
            distance = parseInt(countDown - now);
            var days = Math.floor(distance / (day));
            var hours = Math.floor((distance % (day)) / (hour));
            var minutes = Math.floor((distance % (hour)) / (minute));
            var seconds = Math.floor((distance % (minute)) / second);

            if (days>=0 && hours >=0 &&minutes >=0 && seconds >=0) {
                $('#show_count_down').fadeIn();
                document.getElementById('days').innerText = days;
                document.getElementById('hours').innerText = hours ;
                document.getElementById('minutes').innerText = minutes;
                document.getElementById('seconds').innerText = seconds;

            } else {
                localStorage.removeItem('countdown_date');
                console.log('ok');
                clearInterval(x);
                $('#show_count_down').hide();
                $('#select_count_down').fadeIn('slow');
            }
        }, second)
    }

    $('#time_content').hide();
    $('#timer_div').hide();
    $('#count_div').fadeIn('1000');
}