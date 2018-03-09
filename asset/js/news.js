$(function(){
    $.ajax({
        type: 'GET',
        url: 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b7df51ebe1ff4cceb37cae441f754fb3',
        success: function (data) {
            $.each(data['articles'], function(index, element) {
                $('.news-list').append(newsitem(element['title'],element['description'], element['url']));
            });
            var masatab_colortheme = localStorage.getItem('color_theme');
            if(masatab_colortheme !=null){
                var masatab_colortheme_arr = JSON.parse(masatab_colortheme);
                changecolortheme( masatab_colortheme_arr['color']);
            }else{
                changecolortheme('#f5eafa');
            }
        }
    });
});

function newsitem (topic,content, link)
{
    return  '<li><a href="'+link+'"><h5>'+topic+'</h5><p>'+content+'</p></a></li>';
}