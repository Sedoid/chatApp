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


   app.use(express.static(path.join(__dirname,'client')));

    let io = socket(server);


 let connectedUsers = [];

 let index = 0;
 io.sockets.rooms.push('cooking');
 io.sockets.rooms.push('coding');
        io.on('connection',function(socket){
            
            ++index;
            socket.username = 'bot';
            // console.log(io.sockets.rooms)
           
            // console.log(io.sockets.rooms[0])
            connectedUsers.push(socket.id);

            let object = Object.values(io)
            //    console.log( object[4]);
            socket.on('message',function(data){              

                console.log('message is being sent');
                if(data.group)
               { 
                   console.log('checking available rooms');
                   console.log(`My ID: ${socket.id} and available room is ${Object.keys(socket.rooms)}`);
                   console.log('Group: '+ data.group);
                   socket.to(`${data.group}`).emit("message",data) 
                   console.log('message send');
                } 
                else
                {
                     io.emit('message',data);
                     console.log('sending information to the public');
                }
               
              
            })

            

            socket.on('typing', data => {
                // io.broadcast.emit('typing',state)
                console.log(data);
               socket.broadcast.emit('s_typing', data)
            })

        socket.on('joinCooking',data =>{
            socket.join('cooking', ()=>{
                console.log(socket.id);
                console.log('joined the Cooking group')
            })
        })

        socket.on('joinCoding',data =>{
            socket.join('coding', ()=>{
                console.log(socket.id);
                console.log('joined the Coding group')
            })
        })

 })
       

        


    server.listen(port,() => console.log('server up and running'));


