
/*https://scotch.io/tutorials/use-the-html5-file-api-to-work-with-files-locally-in-the-browser
*/
var clicked = false; 	//if setting menu is selected then true.
						//it is for determining whether to close setting
						//when user clicks outside of the setting menu

var randomArrNumber;
var active_navmenu;
var active_navmenu_button;
var sPositions = localStorage.positions || "{}",
		positions = JSON.parse(sPositions);
var degree_default = localStorage.degree || '\u2103\u0020';

$( document ).ready(function() {
	// localStorage.clear();
	initialize();

	window.setInterval(function(){
		var time = getTime();
		$("#time").html(time);
	}, 1000);

	//drag and drop comment

    $( "#draggable" ).draggable({
	    scroll: false,
	    stop: function (event, ui) {
	        positions[this.id] = ui.position
	        localStorage.positions = JSON.stringify(positions)
	    }
		});
		$.each(positions, function (id, pos) {
		    $("#" + id).css(pos);
		});

	//reset memo's positions
	$("#draggable").dblclick(function(){
		var resetposition = {'top':'0px','left':'0px'};
		$(this).css(resetposition);
		localStorage.positions = JSON.stringify(resetposition)
	});

	//change color input
	$("#changecolor").change('input',function(e){
		colortheme_event(e);
	});

	//change degree
	$('.select-degree').change(function(){

		var str = '';
		var temp = '';
    $( ".select-degree option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });


	    if((str)=='\u2103\u0020'){
				degree_default = '\u2103\u0020';

			}else{
				degree_default = '\u2109\u0020';

			}
			var masatab_weather = localStorage.getItem('masatab_weather');
			if(masatab_weather!=null){
				var masatab_weather_arr = JSON.parse(masatab_weather);
				if((degree_default)=='\u2103\u0020'){
					temp = masatab_weather_arr['temp_c'];
				}else{
					temp = masatab_weather_arr['temp_f'];
				}
				$('#weather_header').text(temp);
			}
			localStorage.degree = degree_default;

	} );
	$('.select-degree-size').change(function(){

		var str = '';
		var temp = '';
	    $( ".select-degree-size option:selected" ).each(function() {
	      str += $( this ).text() + " ";
	    });
		localStorage.degree_size = str;
		$('.weather').css('font-size',str);
		// $('#weather_header').css('font-size',str);
	} );

	$('#refresh_weather_button').click(function(){
		$('#weather').text('loading...It may take few mins...');
		// localStorage.removeItem('masatab_user');
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;

			var testObject = { 'lat': lat, 'long': long  };
			localStorage.setItem('masatab_user', JSON.stringify(testObject));// Put the object into storage

			loadWeather(lat+','+long); //load weather using your lat/lng coordinates

		});
	});


	//upload image
	$('#upload_image_input').change('input', function(e){
		inputimage(e);
	});

	//hover setting
	$(".sidebar-div").hover(function(e) {
        e.preventDefault();

        $("#wrapper").toggleClass("toggled");
        $(".sidebar-menu").toggleClass("toggled");

        // $('i').css('color','white');
    });
		//close setting when mouse is not at sidebar-div
	$(document).mouseup(function (e)
	{
	    var container = $(".sidebar-div");
	    if (!container.is(e.target) &&container.has(e.target).length === 0&&$("#wrapper").hasClass("toggled"))
	    {
				$("#wrapper").toggleClass("toggled");
				$(".sidebar-menu").toggleClass("toggled");
	    }
	});

    $('.btn-toggle').click(function() {
	    if ($(this).find('.btn-success').size()>0) {
	    	$(this).find('.btn').toggleClass('btn-success');
	    }
	    $(this).find('.btn').toggleClass('btn-default');
	});

	$('.color_button').click(function(){
		var color = event.target.id;
		$('.btn-sm').css('color',color);
		$('#time').css('color',color);
		$('#displaydate').css('color',color);
		$('#weather').css('color',color);
	});

	$('#comment_button').click(function(){
		// $('#comment').toggleClass('.comment-display');
		settingGeneral("#comment", "masatab_show_note", {'display':'block'}, {'display':'none'});
	})

	$('#slideshow_button').click(function(){
		settingGeneral("#slideshow","masatab_slideshow",{'display':'block'},{'display':'none'});
	});

	$('#weather_button').click(function(){
		settingGeneral('.weather','masatab_show_weather', {'display':'block'},{'display':'none'});
	});

	$('#blur_button').click(function(){
		settingGeneral('.background-image','masatab_blur',{'filter':'blur(4px)'}, {'filter': 'blur(0px)'});

	});

	$('#date_button').click(function(){
		settingGeneral('#displaydate','masatab_date', {'display':'block'},{'display':'none'});
	});

	$('#comment').change(function () {
		var contents = $.trim($('#comment').val());
    	var testObject = { 'set': contents };
		localStorage.setItem('masatab_note', JSON.stringify(testObject));
  });

  $('#search_button').click(function(){
  	settingGeneral('.search','masatab_search', {'display':'block'},{'display':'none'});
  })

	$('#reset').click(function(){
		$(".background-image").css("filter", "blur(0px)");
		$("#displaydate").css("display", "none");
		$('#comment').val('');
		localStorage.removeItem('masatab_user');
		localStorage.removeItem('masatab_blur');
		localStorage.removeItem('masatab_date');
		localStorage.removeItem('masatab_note');
		localStorage.removeItem('masatab_show_weather');
	});

	$('#own_images_dummy').click(function(){
		var dataImage = localStorage.getItem('elephant');

		if(dataImage!=null){
			changebackground(dataImage);
			localStorage.setItem('masatab_back', JSON.stringify({'set':dataImage}));
		}
	});

	$('.check_image').click(function(){
		changebackground($(this).attr('src'));
		localStorage.setItem('masatab_back', JSON.stringify({'set':$(this).attr('src')}));
	})

	$('#background_button').click(function(){
		navSetting($(this), $('.nav-background'));

	});
	$('#help_button').click(function(){
			navSetting($(this), $('.nav-help'));
	});
	$('#general_button').click(function(){
		navSetting($(this), $('.nav-general'));
	});
	$('#feedback_button').click(function(){
		navSetting($(this), $('.nav-feedback'));
	});

	if (localStorage.getItem("masatab_user") === null) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;

			var testObject = { 'lat': lat, 'long': long  };
			localStorage.setItem('masatab_user', JSON.stringify(testObject));// Put the object into storage

			loadWeather(lat+','+long); //load weather using your lat/lng coordinates

		});
	}else{
		var retrievedObject = localStorage.getItem('masatab_user');
		var arr = JSON.parse(retrievedObject);
		loadWeather(arr['lat']+','+arr['long']);
	}

});

function initialize(){
	// localStorage.clear();
	//show back images in sidebar

	showImages_default();
	// $('#second').css('display', 'none');

	//add disable class
	$('.nav-background').css('display','none');
	$('.nav-feedback').css('display','none');
	$('.nav-help').css('display','none');
	active_navmenu = $('.nav-general');
	active_navmenu_button = $('#general_button');

	//Show background image
	randomArrNumber = [];
	var dataImage = localStorage.getItem('elephant');

	while(randomArrNumber.length < 3){
	    var randomnumber = Math.ceil(Math.random()*7);
	    if(randomArrNumber.indexOf(randomnumber) > -1) continue;
	    randomArrNumber[randomArrNumber.length] = randomnumber;
	}

	var filename = '../asset/img/back'+randomArrNumber[0]+'.jpg';

	if(localStorage.getItem('masatab_back')!=null){
		var temp = localStorage.getItem('masatab_back');
		var temp_arr = JSON.parse(temp);
		filename = temp_arr['set'];
	}


	if(dataImage!=null){
		var bannerImg = document.getElementById('own_images_dummy');
		bannerImg.src = dataImage;
		// console.log(bannerImg.src);
		bannerImg.setAttribute("src", dataImage);
		$('#own_images_dummy').height(120);
		$('#own_images_dummy').width(120);
	}

	changebackground(filename);

	//change weather font-size
	var font_size = localStorage.degree_size;
	if(font_size!=null){
		$('.weather').css('font-size',font_size);
		// $('#weather_header').css('font-size',font_size);
	}

	$('.dot').click(function(event){

		// var randomN = (Math.floor(Math.random() * 10) + 1);
		var index = event.target.id;
		var currentdisplayindex = 0;

		// var filename = '../asset/img/back'+randomArrNumber[index]+'.jpg';
		//
		// $(".background-image").css({
		// 	"background": "url("+filename+") no-repeat center center",
		// 	"background-size": "cover",
		// 	"opacity": "0.8",
		// 	"position": "fixed",
		// 	"width": "100%",
		// 	"height": "100%",
		// 	"top": "0",
		// 	"left": "0",
		// 	"z-index": "-1"
		// });
		if($('#main').css('display') == 'none')
		{
			currentdisplayindex = 1;
		}else{
			currentdisplayindex = 0;
		}
		if(! currentdisplayindex == index){
			$('#second').toggleClass('page-display');
			$('#main').toggleClass('page-display');
		}

		localStorage.setItem('dotpage', index);

		// if(index==1){
		// 	$('#second').css('display','block');
		// 	$('#main').css('display','none');
		// }else{
		// 	$('#second').css('display','none');
		// 	$('#main').css('display','block');
		// }

		$('.dot').removeClass('active'); //remove all the active first
		$('#'+index).addClass('active'); //then add specific dot as active
	});

	//Time
	var time = getTime();
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + '/' +
	    (month<10 ? '0' : '') + month + '/' +
	    (day<10 ? '0' : '') + day;

	$("#time").html(time);
	$('#displaydate').html(output);

	var masatab_blur = localStorage.getItem("masatab_blur");
	var masatab_date = localStorage.getItem("masatab_date");
	var masatab_note = localStorage.getItem("masatab_note");
	var masatab_weather = localStorage.getItem('masatab_weather');
	var masatab_show_weather = localStorage.getItem('masatab_show_weather');
	var masatab_slideshow = localStorage.getItem('masatab_slideshow');
	var masatab_search = localStorage.getItem('masatab_search');
	var masatab_colortheme = localStorage.getItem('masatab_colortheme');
	var masatab_show_note= localStorage.getItem('masatab_show_note');

	var dotpageIndex = localStorage.getItem('dotpage');

	//display main page
	if(dotpageIndex!=null ||dotpageIndex !== ''){
		if(dotpageIndex==0){
			$('#second').toggleClass('page-display');
			//set dot image
			$('#0').addClass('active');
		}else{
			$('#main').toggleClass('page-display');
			$('#1').addClass('active');
		}
	}else{
		$('#second').toggleClass('page-display');
		localStorage.setItem('dotpage', 0);
		$('#0').addClass('active');
	}

	if (masatab_blur != null) {
		var masatab_blur_arr = JSON.parse(masatab_blur);
		if(masatab_blur_arr['set']==true){
			$(".background-image").css("filter", "blur(4px)");
			$('#blur_button').prop('checked', true);

		}else{
			$(".background-image").css("filter", "blur(0px)");
			$('#blur_button').prop('checked', false);
		}
	}else{
		$(".background-image").css("filter", "blur(0px)");
		localStorage.setItem(".background-image", JSON.stringify({ 'set': false }));
		// $(display_element).css(css_active);

		// settingGeneral(".background-image", "masatab_blur", {"filter":"blur(0px)"}, {"filter":"blur(4px)"});
		$('#blur_button').prop('checked', false);
	}

	if (masatab_date != null) {
		var masatab_date_arr = JSON.parse(masatab_date);
		if(masatab_date_arr['set']==true){
			$("#displaydate").css("display", "block");
			$('#date_button').prop('checked', true);

		}else{
			$("#displaydate").css("display", "none");
			$('#date_button').prop('checked', false);
		}
	}else{
		// $("#displaydate").css("display", "none");
		settingGeneral("#displaydate", "masatab_date", {'display':'block'}, {});
		$('#date_button').prop('checked', true);
	}

	if (masatab_note != null) {
		var masatab_note_arr = JSON.parse(masatab_note);
		$("#comment").val(masatab_note_arr['set']);
	}

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

	if(degree_default=='\u2103\u0020'){
		$('select option[value="1"]').attr("selected",true);
	}else{
		$('select option[value="2"]').attr("selected",true);
	}
	var degree_size = localStorage.getItem('degree_size');

	if(degree_size!=null){
		console.log(degree_size);//
		$('select option[value="size_'+degree_size.trim()+'"]').attr("selected",true);
	}


	if(masatab_show_weather !=null){
		var masatab_show_weather_arr = JSON.parse(masatab_show_weather);
		if(masatab_show_weather_arr['set']==true){
			$(".weather").css("display", "block");
			$('#weather_button').prop('checked', true);
		}else{
			$(".weather").css("display", "none");
			$('#weather_button').prop('checked', false);
		}
	}else{
		$('#weather_button').prop('checked', true);
		settingGeneral(".weather", "masatab_show_weather", {'display':'block'}, {});
	}

	if(masatab_slideshow !=null){
		var masatab_slideshow_arr = JSON.parse(masatab_slideshow);
		if(masatab_slideshow_arr['set']==true){
			$("#slideshow").css("display", "block");
			$('#slideshow_button').prop('checked', true);

		}else{
			$("#slideshow").css("display", "none");
			$('#slideshow_button').prop('checked', false);
		}
	}else{
		$('#slideshow_button').prop('checked', true);
		settingGeneral("#slideshow", "masatab_slideshow", {'display':'block'}, {});
	}

	if(masatab_search !=null){
		var masatab_search_arr = JSON.parse(masatab_search);
		if(masatab_search_arr['set']==true){
			$(".search").css("display", "block");
			$('#search_button').prop('checked', true);

		}else{
			$(".search").css("display", "none");
			$('#search_button').prop('checked', false);
		}
	}else{
		$('#search_button').prop('checked', true);
		settingGeneral(".search", "masatab_search", {'display':'block'}, {});
	}

	if(masatab_show_note!=null){
		var masatab_show_note_arr = JSON.parse(masatab_show_note);
		if(masatab_show_note_arr['set']==true){
			$("#comment").css("display", "block");
			$('#comment_button').prop('checked', true);
		}else{
			$("#comment").css("display", "none");
			$('#comment_button').prop('checked', false);
		}
	}else{
		$('#comment_button').prop('checked', true);
		settingGeneral("#comment", "masatab_show_note", {'display':'block'}, {});
	}

	if(masatab_colortheme !=null){
		var masatab_colortheme_arr = JSON.parse(masatab_colortheme);
		changecolortheme( masatab_colortheme_arr['color']);
	}else{
		changecolortheme('#ffffff');
	}

}

function colortheme_event(e){
	var color = e.currentTarget.value;
	changecolortheme(color);

	localStorage.setItem('masatab_colortheme', JSON.stringify({'color':color}));
}

function changecolortheme(color){
	$('#time').css('color',color);
	$('#displaydate').css('color',color);
	$('#weather').css('color',color);
	$('.checkbox_color').css('color', color);
	$('#changecolor').val(color);
	$('i').css('color',color);
	// $('#comment').css('color', );
	$('#comment').css('border', "3px solid "+color);
	// $('#comment').css('border', "2px solid "+color);
	// $('#comment').css('background-color', color);
	// $('#comment').css('color', invertColor(color, true));


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

	var time = hour + ":" + minute + ":" + second;

	return time;
}

function settingGeneral(display_element, localstorage_element, css_active, css_disactive){
	var localStorage_temp = localStorage.getItem(localstorage_element)
	if ( localStorage_temp === null) {
		localStorage.setItem(localstorage_element, JSON.stringify({ 'set': true }));
		$(display_element).css(css_active);
	}else{
		// var localStorage_temp_arr = ;
		if(JSON.parse(localStorage_temp)['set']==true){
			localStorage.setItem(localstorage_element, JSON.stringify({ 'set': false }));
			$(display_element).css(css_disactive);
		}else{
			localStorage.setItem(localstorage_element, JSON.stringify({ 'set': true }));
			$(display_element).css(css_active);
		}
	}
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
			html = '<h1 id="weather_header">'+temp+' '+degree_default+'</h1>';
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
			html += '</p>';
			html += '<p>Humidity: '+weather.humidity+'%</p>';
			var tempobject = {
				'set': html,
				'unit': degree_default,
				'temp_c':' '+weather.temp+' '+'\u2103\u0020',
				'temp_f':' '+weather.alt.temp+' '+'\u2109\u0020'
			};
			localStorage.setItem('masatab_weather', JSON.stringify(tempobject));
			document.getElementById('weather').innerHTML = html;

			masatab_colortheme = localStorage.getItem('masatab_colortheme');
			if(masatab_colortheme !=null){
				var masatab_colortheme_arr = JSON.parse(masatab_colortheme);
				changecolortheme( masatab_colortheme_arr['color']);
			}else{
				changecolortheme('#ffffff');
			}
		},
		error: function(error) {// console.log(error);
		}
	});
}

function navSetting(button, menu){
	//change active button from previous button to this button
	active_navmenu_button.removeClass('active');
	button.addClass('active');
	active_navmenu_button = button;

	//display block on this and none on previous menu
	active_navmenu.css('display','none');
	// $('.nav-background').toggleClass('nav-disabled');
	menu.css('display','block');
	active_navmenu = menu;
}

function showImages_default(){
	var folder = "images/";
	var imageFolder = 'asset/img/back' ;
	for(var i=1;i<=7;i++){
		var html = "<img src = '"+imageFolder+i+".jpg' class = 'check_image' width=120 height = 120 ><br><br>";
		$('.show_images').append(html);
	}
}

function changebackground(url){
	$(".background-image").css({
		"background": "url("+url+") no-repeat center center",
		"background-size": "cover",
		"opacity": "0.85",
		"position": "fixed",
		"width": "100%",
		"height": "100%",
		"top": "0",
		"left": "0",
		"z-index": "-1"
	});
}
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
    	return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        	? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
	b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
