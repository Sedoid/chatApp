console.log('Hello from my node script!buhahaha');

let express = require('express'),
    socket = require('socket.io'),
    http = require('http'),
    webpush = require('web-push');
    bodyParser = require('body-parser');
    port = process.env.PORT || 4002,
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    publicVapidKey = 'BB1rbQuMQ1fyyiLqZhsy0CZq8H4VTSfzPNjQ9F84KyA04gph0p5iy_S4xYCRtyG75rts3AmlQ3tHUXIrhSqL80E',
    privateVapidKey = 'bWhjJ1qsp-pdhSUfZE0weWOs9OHhQIlyZm4sqJy8c1Y';

    app = express();                         

    let server = http.createServer(app);
    // Handling the chat functionalies
   app.use(express.static(path.join(__dirname,'client')));

    let io = socket(server);

 let connectedUsers = [];

 let index = 0;
 io.sockets.rooms.push('cooking');
 io.sockets.rooms.push('coding');
        io.on('connection',function(socket){
            
            ++index;
            socket.username = 'bot';

            connectedUsers.push(socket.id);

            let object = Object.values(io)

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
  // Recieveing push subscription and sending push Notifications    
  app.use(bodyParser.json()); 
  app.post('./subscribe',(req,res) =>{
    //Get the subscription object
    const subscribtion = req.body;
    res.status(201).json({});
    //Create payLoad
    const payLoad = JSON.stringify({title: "New Message"});
    webpush.sendNotification(subscribtion,payLoad)
    .catch(
        error => {
            console.log('Failed to send push Notification');
            console.log(error);
        }
    )

    });

    server.listen(port,() => console.log('server up and running'));


