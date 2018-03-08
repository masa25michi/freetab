$(function(){
    $('#todo-add').click(function(){
        if ($('#new-task').val() !== '') {
            str = newitem($('#new-task').val());

            if (str === -1 ) {
                $('#error-msg-item').text('Found Duplicated Text.');
                setTimeout(function(){ $('#error-msg-item').text(''); }, 3000);

            } else {
                $('#incomplete-tasks').append(str);
                $('#new-task').val('');
            }
        }
    });

    $('body').on('click','.delete-item',function (e) {
        var masatab_items = localStorage.getItem("todo_items");
        var masatab_items_arr = JSON.parse(masatab_items);
        tmp_arr = masatab_items_arr['items'];
        new_arr = [];
        var arrayLength = tmp_arr.length;
        for (var i = 0; i < arrayLength; i++) {
            if(tmp_arr[i] === $(this).parent().text()) {
                continue;
            }
            new_arr.push(tmp_arr[i]);
        }
        localStorage.setItem('todo_items', JSON.stringify({'items':new_arr}));

        $(this).parent().remove();
    });
});

function newitem(str)
{
    var masatab_items = localStorage.getItem("todo_items");

    if (masatab_items == null) {
        tmp_arr = [str];
        localStorage.setItem('todo_items', JSON.stringify({'items':tmp_arr}));
    } else {
        var masatab_items_arr = JSON.parse(masatab_items);
        tmp_arr = masatab_items_arr['items'];

        var arrayLength = tmp_arr.length;
        for (var i = 0; i < arrayLength; i++) {
            if(tmp_arr[i] === str) {
                return -1;
            }
        }

        //there is no duplicated items
        tmp_arr.push(str);
        localStorage.setItem('todo_items', JSON.stringify({'items':tmp_arr}));

    }

    return '<li>'+str+'<buttton class="delete-item"><i class="far fa-minus-square fa-1x"></i></buttton></li>';
}
