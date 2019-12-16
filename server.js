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
    privateVapidKey = 'iqMUW0UfRyQ_UZ70svJLNw9FKdAdSh5cZEeus9DrBM0';
    publicVapidKey= 'BBXug78kEdM4PainkvGw9X52kH3P5DuQqYLILV50tR4QgykyFgbLtKPcRnZR4ydKYwBN9oxPXlbj-qqDP2F2Jy4';

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
            let address = socket.handshake.address;
            console.log("New connection from" + address.address + ';' + address.port)
            ++index;
            socket.username = 'bot';

            if(!connectedUsers.indexOf(socket.id))
               {
                   console.log('new user registered');
                    connectedUsers.push(socket.id);
                    console.log('Connected Users *********************');
                    console.log(connectedUsers);
                   console.log('Connected Users *********************');
               }  
            else 
               {
                   console.log('Connected Users *********************');
                    console.log(socket.id);
                   console.log('Connected Users *********************');

               } 
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
  webpush.setVapidDetails(
    "mailto:karlsedoide@gmail.com",
    publicVapidKey,
    privateVapidKey
  );
  
  app.post('/subscribe',(req,res) =>{
    //Get the subscription object

    const subscribtion = req.body;
    console.log('************** clients subscription Message  **************')
    console.log(subscribtion)
    console.log('************** clients subscription Message  **************')
    res.status(201).json({});

    //Create payLoad
    const payLoad = JSON.stringify({title: "New Message"});
    console.log('About to send push Notifications');
    webpush.sendNotification(subscribtion,payLoad)
    .catch(
        error => {
            console.log('Failed to send push Notification');
            console.log(error);
        }
    )

    });

    server.listen(port,() => console.log('server up and running'));


