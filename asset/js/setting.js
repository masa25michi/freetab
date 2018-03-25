$(function(){
    $('body').on('change','.select_button_class',function (e) {
        val_tmp = $(this).val();
        console.log(val_tmp);
        id = $(this).attr('id');

        ids = ['select_news_category', 'select_weather_unit'];

        if (jQuery.inArray( id, ids ) !==-1) {
            $("#"+id+" option:selected").removeAttr("selected");
            $("#"+id+" option[value="+val_tmp+"]").attr('selected', 'selected');

            if (id === 'select_weather_unit') {
                if (val_tmp === 'c') {
                    changeWeatherUnit('\u2103\u0020');
                } else {
                    changeWeatherUnit('\u2109\u0020');
                }
            } else if (id === 'select_news_category') {
                changeNewsCategory(val_tmp);
            }
        }
    });
});
