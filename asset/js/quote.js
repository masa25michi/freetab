function getQuote()
{
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(a) {
        $("#quote-text").html('<div style="font-style: italic;">'+a[0].content + "<p style='padding:0px;margin:0px'>— " + a[0].title + "</p></div>")
        $("#quote-text").fadeIn()
    });
}

