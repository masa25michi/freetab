$(function(){
    $('#todo-add').click(function(){
        $('#incomplete-tasks').append(newitem($('#new-task').val()));
        // $(newitem($('#new-task').val())).insertBefore($(this).closest('tr'));
        $('#new-task').val('');
    });
});

function newitem(str)
{
    return '<li>'+str+'</li>';
}
