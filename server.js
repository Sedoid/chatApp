console.log('Hello from my node script!');

let express = require('express'),
    app = express(),
    http = require('http'),
    server = http.Server(app);

app.use(express.static('client'));

let io = require('socket.io')(server);

io.on('connection',function(socket){
    socket.on('message',function(msg){
        io.emit('message',msg);
    });
});











server.listen(8080,function(){
    console.log('Chat server running');
})