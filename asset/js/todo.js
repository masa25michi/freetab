$(function(){
    $('#todo-add').click(function(){
        $('#incomplete-tasks').append(newitem($('#new-task').val()));
        $('#new-task').val('');
    });
});

function newitem(str)
{
    return '<li>'+str+'</li>';
}
