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

    if (lat>0 && long >0 ){
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=6baf9f0c0f2e76f84d6ae6649fcfe9e3',
            success: function (data) {
                tmp = data['main']['temp'] - 273.15;
                if (degree_default === '\u2109\u0020')
                {
                    tmp = tmp * 1.8 + 32;
                }
                html = '<h3 id="weather_header">'+Math.round(tmp)+' <span class="degree_default_text">'+degree_default+'</span></h3>';
                html += '<p>'+data['name']+' , '+data['sys']['country']+'&nbsp; '+'<img src="http://openweathermap.org/img/w/'+data['weather'][0]['icon']+'.png" style="width:20%;height:20%;"> <br>';
                html += 'Humidity: '+data['main']['humidity']+'%</p>';
                //
                var tempobject = {
                    'set': html,
                    'unit': degree_default,
                    'temp':tmp,
                    'humidity': data['main']['humidity'],
                    'name': data['name'],
                    'country': data['sys']['country'],
                    'icon': data['weather'][0]['icon']
                };

                localStorage.setItem('weather', JSON.stringify(tempobject));
                document.getElementById('weather').innerHTML = html;

            }
        });
    }
}

function changeWeatherUnit(unit) {
    if (unit !== '\u2103\u0020' && unit !== '\u2109\u0020')
    {
        unit = '\u2103\u0020';
    }
    localStorage.setItem('degree_default', JSON.stringify({'degree_default':unit}));

    var weatherObject = localStorage.getItem('weather');

    if (weatherObject != null) {
        arr = JSON.parse(weatherObject);
        temp = arr['temp'];
        if (unit === '\u2103\u0020') {
            if (arr['unit'] === '\u2109\u0020') {

                temp = (temp-32) / (9/5);
            }
        } else {
            if (arr['unit'] === '\u2103\u0020') {
                temp = temp * 1.8 + 32;
            }
        }

        html = '<h3 id="weather_header">'+Math.round(temp)+' <span class="degree_default_text">'+unit+'</span></h3>';
        html += '<p>'+'&nbsp;'+arr['name']+' , '+arr['country']+'&nbsp; '+'<img src="http://openweathermap.org/img/w/'+arr['icon']+'.png" style="width:20%;height:20%;"> <br>';
        html += 'Humidity: '+arr['humidity']+'%</p>';

        var tempobject = {
            'set': html,
            'unit': unit,
            'temp':temp,
            'humidity': arr['humidity'],
            'name': arr['name'],
            'country': arr['country'],
            'icon': arr['icon']
        };


        localStorage.setItem('weather', JSON.stringify(tempobject));
        document.getElementById('weather').innerHTML = html;

    } else {
        getWeather();
    }


}