// alert('Hello from the JS file')


//$(document).ready(function(){
    let socket = io();

    $('form').on('submit',function(){
        let text = $('#message').val();
        text = 'Karlson says: '+ text;
        
        socket.emit('message',text);
        $('#message').val('');

        return false;
    });

    socket.on('message',function(msg){
        $('<li>').text(msg).appendTo('#history');
    });
//})