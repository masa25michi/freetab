function getWeather() {
    var lat = 0;
    var long = 0;
    var html ='';
    degree_default!='\u2103\u0020';

    var retrievedObject = localStorage.getItem('location');

    if (retrievedObject != null) {
        var arr = JSON.parse(retrievedObject);
        lat = arr['lat'];
        long = arr['long'];
    }

    if (lat>0 && long >0 ){
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=6baf9f0c0f2e76f84d6ae6649fcfe9e3',
            success: function (data) {
                tmp = data['main']['temp'] - 273.15;
                html = '<h3 id="weather_header">'+Math.round(tmp)+' '+degree_default+'</h3>';
                html += '<p>'+'&nbsp;'+data['name']+' , '+data['sys']['country']+'&nbsp; '+'<img src="http://openweathermap.org/img/w/'+data['weather'][0]['icon']+'.png" style="width:20%;height:20%;"> <br>';
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

