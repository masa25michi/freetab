

function newsitem (topic,content, link)
{
    content = " ";
    return  '<li><a href="'+link+'"><h6>'+topic+'</h6><p>'+content+'</p></a></li>';
}

function changeNewsCategory(category) {
    localStorage.setItem('news_category', JSON.stringify({'news_category':category}));
    showNews = false;
    // getNews();
}

function setNews()
{

}

function getNews ()
{
    var news_categoryObject = localStorage.getItem('news_category');
    category = 'technology';

    if (news_categoryObject != null) {
        arr = JSON.parse(news_categoryObject);
        category = arr['news_category'];
    } else {
        localStorage.setItem('news_category', JSON.stringify({'news_category':category}));
    }

    if (!showNews) {
        console.log('ok');
        $.ajax({
            type: 'GET',
            url: 'https://newsapi.org/v2/top-headlines?country=us&category='+category+'&apiKey=b7df51ebe1ff4cceb37cae441f754fb3',
            success: function (data) {
                $('.news-list').hide();
                $('.news-list').empty();
                $.each(data['articles'], function(index, element) {
                    $('.news-list').append(newsitem(element['title'],element['description'], element['url']));
                });

                $('.news-list').append("<li style='font-size:95%; border:none; font-style:italic; '>Resources from <a href=\"https://newsapi.org/\" style=\"text-decoration: underline;\">NewsApi.org</a></li>");

                var masatab_colortheme = localStorage.getItem('color_theme');
                if(masatab_colortheme !=null){
                    var masatab_colortheme_arr = JSON.parse(masatab_colortheme);
                    changecolortheme( masatab_colortheme_arr['color']);
                }else{
                    changecolortheme('#ffffff');
                }

                $('.news-list').fadeIn('2000');

                showNews = true;
            }
        });
    }
}