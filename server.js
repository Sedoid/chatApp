console.log('Hello from my node script!buhahaha');



let express = require('express'),
    socket = require('socket.io'),
    http = require('http');
    port = process.env.PORT || 4002,
    fs = require('fs'),
    path = require('path'),
    url = require('url');

    app = express();

    let server = http.createServer(app)
    // app.get('/',(req,res) =>{
    // res.sendFile(path.join(__dirname,'client','index.html'));
    //     // fs.readFile(path.join(__dirname,'./client/index.html'),(error,data)=>{
    //     //   //  res.writeHead(200,{'Content-Type': 'text/html'});
    //     //  //    res.write(data)
          
  
    //     //  })
    // })

   app.use(express.static(path.join(__dirname,'client')));

    let io = socket(server);
    let index = 0;
        io.on('connection',function(socket){
            //console.log(socket.id);
            //console.log(++index +' user connected ');  

            socket.on('message',function(data){
                 console.log('message is being sent');
                io.emit('message',data)
               
            })

            socket.on('typing',function(state){
                // io.broadcast.emit('typing',state)
            })

 })
       

        


    server.listen(port,() => console.log('server up and running'));


{
 // let express = require('express'),
//     app = express(),
//     http = require('http'),
//     server = http.Server(app),
//     port = process.env.PORT || 8080;

// app.use(express.static('client'));

// let io = require('socket.io')(server);

// io.on('connection',function(socket){
//     socket.on('message',function(msg){
//         io.emit('message',msg);
//     });
// });



// server.listen(port,function(){
//     console.log('Chat server running');
// })   
}
