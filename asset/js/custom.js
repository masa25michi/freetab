var degree_default = localStorage.degree || '\u2103\u0020';
var sPositions = localStorage.positions || "{}",
    positions = JSON.parse(sPositions);

var dateFormat = 0; //0-> with second 1-> no second

$(document).ready(function() {

    initialize();

    window.setInterval(function(){
        var time = getTime();
        $("#time").html(time);
    }, 1000);

    $('body').on('click','.setting-check',function () {
        id = $(this).attr('id');

        if (id === 'date_button') {
            settingGeneral('#displaydate','show_date', {'display':'block'},{'display':'none'});
        } else if(id === 'weather_button') {
            settingGeneral('.weather-box','show_weather', {'display':'block'},{'display':'none'});
        } else if(id === 'search_button' ) {
            settingGeneral('.search','show_search', {'display':'block'},{'display':'none'});
        } else if(id === 'news_button' ) {
            settingGeneral('.news-box','show_news', {'display':'block'},{'display':'none'});
        } else if(id === 'todo_button' ) {
            settingGeneral('.todo-box','show_todo', {'display':'block'},{'display':'none'});
        } else if(id === 'quote_button' ) {
            settingGeneral('.quote-box','show_quote', {'display':'block'},{'display':'none'});
        }
        if(this.checked ) {
            $('#'+id).attr('checked', true);
        } else {
            $('#'+id).attr('checked', false);
        }

    });

    $('body').on('change','#changecolor',function (e) {
        colortheme_event(e);
    });

    $('body').on('change','#date-format-select',function (e) {
        dateFormat = parseInt($(this).val());
        console.log(dateFormat);

        localStorage.setItem('dateformat', JSON.stringify({ 'dateformat': dateFormat }));
    });

});

function colortheme_event(e){
    var color = e.currentTarget.value;
    changecolortheme(color);

    localStorage.setItem('color_theme', JSON.stringify({'color':color}));
}

function changecolortheme(color){
    $('body').css('color',color);
    $('button').css('color',color);
    $('a:link').css('color',color);
    $('a:visited').css('color',color);

}

function initializeLocalStorage()
{
    var masatab_date = localStorage.getItem("show_date");
    var masatab_weather = localStorage.getItem('weather');
    var masatab_show_weather = localStorage.getItem('show_weather');
    var masatab_search = localStorage.getItem('show_search');
    var masatab_colortheme = localStorage.getItem('color_theme');
    var masatab_news = localStorage.getItem('show_news');
    var masatab_todo = localStorage.getItem('show_todo');
    var masatab_quote = localStorage.getItem('show_quote');
    var masatab_items = localStorage.getItem("todo_items");
    var masatab_dateformat = localStorage.getItem("dateformat");

    if (masatab_weather != null) {
        var masatab_weather_arr = JSON.parse(masatab_weather);
        document.getElementById('weather').innerHTML = masatab_weather_arr['set'];
        var temp = '';
        if((degree_default)=='\u2103\u0020'){
            temp = masatab_weather_arr['temp_c'];
        }else{
            temp = masatab_weather_arr['temp_f'];
        }
        $('#weather_header').text(temp);
    }

    if (masatab_date != null) {
        var masatab_date_arr = JSON.parse(masatab_date);
        if(masatab_date_arr['set']==true){
            $("#displaydate").css("display", "block");
            $('#date_button').attr('checked',true);

        }else{
            $("#displaydate").css("display", "none");
            $('#date_button').attr('checked',false);
        }
    }else{
        settingGeneral("#displaydate", "show_date", {'display':'block'}, {});
        $('#date_button').prop('checked', true);
    }

    if(masatab_show_weather !=null){
        var masatab_show_weather_arr = JSON.parse(masatab_show_weather);
        if(masatab_show_weather_arr['set']==true){
            $(".weather-box").css("display", "block");
            $('#weather_button').attr('checked',true);
        }else{
            $(".weather-box").css("display", "none");
            $('#weather_button').attr('checked',false);
        }
    }else{
        $('#weather_button').prop('checked', true);
        settingGeneral(".weather-box", "show_weather", {'display':'block'}, {});
    }

    if(masatab_search !=null){
        var masatab_search_arr = JSON.parse(masatab_search);
        if(masatab_search_arr['set']==true){
            $(".search").css("display", "block");
            $('#search_button').attr('checked', true);

        }else{
            $(".search").css("display", "none");
            $('#search_button').attr('checked', false);
        }
    }else{
        $('#search_button').attr('checked', true);
        settingGeneral(".search", "show_search", {'display':'block'}, {});
    }

    if(masatab_news !=null){
        var masatab_news_arr = JSON.parse(masatab_news);
        if(masatab_news_arr['set']==true){
            $(".news-box").css("display", "block");
            $('#news_button').attr('checked', true);

        }else{
            $(".news-box").css("display", "none");
            $('#news_button').attr('checked', false);
        }
    }else{
        $('#news_button').attr('checked', true);
        settingGeneral(".news-box", "show_news", {'display':'block'}, {});
    }

    if(masatab_todo !=null){
        var masatab_todo_arr = JSON.parse(masatab_todo);
        if(masatab_todo_arr['set']==true){
            $(".todo-box").css("display", "block");
            $('#todo_button').attr('checked', true);

        }else{
            $(".todo-box").css("display", "none");
            $('#todo_button').attr('checked', false);
        }
    }else{
        $('#todo_button').attr('checked', true);
        settingGeneral(".todo-box", "show_todo", {'display':'block'}, {});
    }

    if(masatab_quote !=null){
        var masatab_quote_arr = JSON.parse(masatab_quote);
        if(masatab_quote_arr['set']==true){
            $(".quote-box").css("display", "block");
            $('#quote_button').attr('checked', true);

        }else{
            console.log('okok');
            $(".quote-box").css("display", "none");
            $('#quote_button').attr('checked', false);
        }
    }else{
        $('#quote_button').attr('checked', true);
        settingGeneral(".quote-box", "show_quote", {'display':'block'}, {});
    }

    if(masatab_colortheme !=null){
        var masatab_colortheme_arr = JSON.parse(masatab_colortheme);
        changecolortheme( masatab_colortheme_arr['color']);
    }else{
        changecolortheme('#f5eafa');
    }

    if(masatab_items !=null){
        var masatab_items_arr = JSON.parse(masatab_items);
        tmp_arr = masatab_items_arr['items'];

        var arrayLength = tmp_arr.length;
        for (var i = 0; i < arrayLength; i++) {
            $('#incomplete-tasks').append('<li>'+tmp_arr[i]+'<buttton class="delete-item"><i class="far fa-minus-square fa-1x"></i></buttton></li>');
        }
    }

    if (masatab_dateformat != null) {
        var masatab_dateformat_arr = JSON.parse(masatab_dateformat);
        dateformat_tmp = masatab_dateformat_arr['dateformat'];

        dateFormat = dateformat_tmp;
        $("#date-format-select option[value='"+dateFormat+"']").attr('selected', 'selected');

    } else {
        localStorage.setItem('dateformat', JSON.stringify({ 'dateformat': 0 }));
    }
}
function initialize()
{

    $('[data-toggle="popover"]').popover(
        {
            html: true,
            content: function() {
                return $('#popover-setting-content').html();
            }
        }
    );

    initializeLocalStorage();

    //time
    var time = getTime();
    $("#time").html(time);

    //date
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    $('#displaydate').html(output);

    //weather
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        var testObject = { 'lat': lat, 'long': long  };
        localStorage.setItem('location', JSON.stringify(testObject));// Put the object into storage

        loadWeather(lat+','+long); //load weather using your lat/lng coordinates
    });
}

function getTime(){
    var dt = new Date();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();

    if(parseInt(hour)<10){
        hour = "0"+hour;
    }
    if(parseInt(minute)<10){
        minute = "0"+minute;
    }
    if(parseInt(second)<10){
        second = "0"+second;
    }

    var time = hour + ":" + minute;

    if (dateFormat === 0) {
        time += ":" + second;
    }

    return time;
}

function loadWeather(location, woeid) {
    reallySimpleWeather.weather({
        wunderkey: '',
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function(weather) {
            var temp = weather.temp;
            if(degree_default!='\u2103\u0020'){
                temp = weather.alt.temp;
            }
            html = '<h2 id="weather_header">'+temp+' '+degree_default+'</h2>';
            html += '<p>'+weather.city+'&nbsp;&nbsp; ';
            switch (weather.code){
                case '0': html += "<i class='wi wi-tornado'></i>";break;
                case '1': html += "<i class='wi wi-storm-showers'></i>";break;
                case '2': html += "<i class='wi wi-hurricane'></i>";break;
                case '3': html += "<i class='wi wi-thunderstorm'></i>";break; //!!
                case '4': html += "<i class='wi wi-thunderstorm'></i>";break;
                case '5': html += "<i class='wi wi-snow-wind'></i>";break; //!!
                case '6': html += "<i class='wi wi-sleet'></i>";break; //!!
                case '7': html += "<i class='wi wi-snow'></i>";break; //!!
                case '8': html += "<i class='wi wi-raindrops'></i>";break; //!!
                case '9': html += "<i class='wi wi-raindrops'></i>";break;
                case '10': html += "<i class='wi wi-rain-wind'></i>";break;
                case '11': html += "<i class='wi wi-showers'></i>";break;
                case '12': html += "<i class='wi wi-showers'></i>";break;
                case '13': html += "<i class='wi wi-snow'></i>";break; //!!
                case '14': html += "<i class='wi wi-snow-wind'></i>";break;//!!
                case '15': html += "<i class='wi wi-snow-wind'></i>";break;//!!
                case '16': html += "<i class='wi wi-snow'></i>";break;
                case '17': html += "<i class='wi wi-hail'></i>";break;
                case '18': html += "<i class='wi wi-sleet'></i>";break;
                case '19': html += "<i class='wi wi-dust'></i>";break;
                case '20': html += "<i class='wi wi-fog'></i>";break;
                case '21': html += "<i class='wi wi-day-haze'></i>";break;
                case '22': html += "<i class='wi wi-smoke'></i>";break;
                case '23': html += "<i class='wi wi-windy'></i>";break;
                case '24': html += "<i class='wi wi-windy'></i>";break;
                case '25': html += "<i class='wi wi-snowflake-cold'></i>";break;
                case '26': html += "<i class='wi wi-cloudy'></i>";break;
                case '27': html += "<i class='wi wi-night-alt-cloudy'></i>";break;
                case '28': html += "<i class='wi wi-day-cloudy'></i>";break;
                case '29': html += "<i class='wi wi-night-alt-cloudy'></i>";break;
                case '30': html += "<i class='wi wi-day-cloudy'></i>";break;
                case '31': html += "<i class='wi wi-night-clear'></i>";break;
                case '32':html += "<i class='wi wi-day-sunny'></i>";break;
                case '33':html += "<i class='wi wi-night-clear'></i>";break;
                case '34':html += "<i class='wi wi-day-sunny'></i>";break;
                case '35':html += "<i class='wi wi-rain-mix'></i>";break;
                case '36':html += "<i class='wi wi-hot'></i>";break;
                case '37':html += "<i class='wi wi-thunderstorm'></i>";break;
                case '38':html += "<i class='wi wi-thunderstorm'></i>";break;
                case '39':html += "<i class='wi wi-thunderstorm'></i>";break;
                case '40':html += "<i class='wi wi-showers'></i>";break;
                case '41':html += "<i class='wi wi-snow'></i>";break;
                case '42':html += "<i class='wi wi-snow-wind'></i>";break;
                case '43':html += "<i class='wi wi-snow'></i>";break;
                case '44':html += "<i class='wi wi-cloudy'></i>";break;
                case '45':html += "<i class='wi wi-thunderstorm'></i>";break;
                case '46':html += "<i class='wi wi-snow-wind'></i>";break;
                case '47':html += "<i class='wi wi-thunderstorm'></i>";break;
            }
            // html += '<hr>';
            html += ' Humidity: '+weather.humidity+'%</p>';
            var tempobject = {
                'set': html,
                'unit': degree_default,
                'temp_c':' '+weather.temp+' '+'\u2103\u0020',
                'temp_f':' '+weather.alt.temp+' '+'\u2109\u0020'
            };
            localStorage.setItem('weather', JSON.stringify(tempobject));
            document.getElementById('weather').innerHTML = html;

            // masatab_colortheme = localStorage.getItem('masatab_colortheme');
            // if(masatab_colortheme !=null){
            //     var masatab_colortheme_arr = JSON.parse(masatab_colortheme);
            //     changecolortheme( masatab_colortheme_arr['color']);
            // }else{
            //     changecolortheme('#ffffff');
            // }
        },
        error: function(error) {// console.log(error);
        }
    });
}

function settingGeneral(display_element, localstorage_element, css_active, css_disactive){
    var localStorage_temp = localStorage.getItem(localstorage_element);
    if ( localStorage_temp === null) {
        $(display_element).css(css_active);
        localStorage.setItem(localstorage_element, JSON.stringify({ 'set': true }));
    }else{
        if(JSON.parse(localStorage_temp)['set']==true){
            $(display_element).css(css_disactive);
            localStorage.setItem(localstorage_element, JSON.stringify({ 'set': false }));
        }else{
            $(display_element).css(css_active);
            localStorage.setItem(localstorage_element, JSON.stringify({ 'set': true }));
        }
    }
}