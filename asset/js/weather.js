
function getWeather() {
    var lat = 0;
    var long = 0;
    var html ='';

    degree_default!='\u2103\u0020';

    var retrievedObject = localStorage.getItem('location');
    var degree_defaultObject = localStorage.getItem('degree_default');

    if (retrievedObject != null) {
        arr = JSON.parse(retrievedObject);
        lat = arr['lat'];
        long = arr['long'];
    }

    if (degree_defaultObject != null) {
        arr = JSON.parse(degree_defaultObject);
        degree_default = arr['degree_default'];
    }

    if (lat>0 && long >0 && weatherNeedsRefresh == true ){
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=6baf9f0c0f2e76f84d6ae6649fcfe9e3',
            success: function (data) {
                tmp = data['main']['temp'] - 273.15;
                tmp_max = data['main']['temp_max'] - 273.15;
                tmp_min = data['main']['temp_min'] - 273.15;
                if (degree_default === '\u2109\u0020')
                {
                    tmp = tmp * 1.8 + 32;
                    tmp_max = Math.round(tmp_max * 1.8 + 32);
                    tmp_min = Math.round(tmp_min * 1.8 + 32);
                }
                // var tempobject = {
                //     'set': '',
                //     'unit': degree_default,
                //     'temp':tmp,
                //     'humidity': data['main']['humidity'],
                //     'name': data['name'],
                //     'country': data['sys']['country'],
                //     'icon': data['weather'][0]['icon']
                // };
                //
                // localStorage.setItem('weather', JSON.stringify(tempobject));

                var html_header = '<h4 id="weather_header">'+Math.round(tmp)+' <span class="degree_default_text">'+degree_default+'</span></h4>';
                var html_content =
                    '<div style="word-wrap: break-word; margin-top:-12px;">' +
                    '<div class="weather_detail_content">' +
                    '       <h6 style="border-bottom:1px grey solid;">' +
                    '           <i class="fas fa-location-arrow fa-1x"></i>&nbsp;&nbsp;'+data['name']+
                            '</h6>'
                        +   '<p style="font-size:105%;"> '+data['weather'][0]['description']+' <img src="http://openweathermap.org/img/w/'+data['weather'][0]['icon']+'.png" style="width:40px;height:40px;"></p>'
                            +'<p>'+'Humidity: '+data['main']['humidity']+ '%</p>'+
                            '<p>'+'Winds: '+data['wind']['speed']+ ' m/s / Direction: '+ data['wind']['deg']+'&#176;</p>'+
                            '<p>'+'Max Temp: '+tmp_max+ '<span class="degree_default_text">'+degree_default+'</span></p>'+
                            '<p>'+'Min Temp: '+tmp_min+ '<span class="degree_default_text">'+degree_default+'</span></p>'+
                    '</div>' +
                    '</div>';

                $('#weather').html(html_header);

                if ($('.popover_weather_box_contents').length > 1) {
                    $('.popover_weather_box_contents').empty();
                    $('.popover_weather_box_contents').append(html_content);
                    weatherNeedsRefresh = false;
                }
            }
        });
    }
}

function changeWeatherUnit(unit) {
    if (unit !== '\u2103\u0020' && unit !== '\u2109\u0020')
    {
        unit = '\u2103\u0020';
    }
    weatherNeedsRefresh = true;
    localStorage.setItem('degree_default', JSON.stringify({'degree_default':unit}));

    getWeather();


}
