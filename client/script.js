
let userName,
    form = document.querySelector('#message')

console.log( Object.keys(localStorage))
if(localStorage.getItem('userName')){
    userName = localStorage.getItem('userName');

     document.querySelector('#name').value = userName;

}else{
    console.log('found nothing like username in the storage')
    userName = '';

}

//$(document).ready(function(){
   let socket = io();

  form.addEventListener('input', ()=>{
    socket.emit('typing', true)
    })

    $('form').on('submit',function(e){
        e.preventDefault();
      userName = $('#name').val();
            localStorage.setItem('userName',userName);

        // console.log('name:'+ userName);
        let text = $('#message').val();
        if(text!='')
       {
            text ={
            senderName: userName,
            message: text
            };
            
            socket.emit('message', text)

            // socket.emit('message',text);
            // $('#message').val('');
       }

        return false;
    });

    
 socket.on('message',(data)=>{
     console.log(data);
          
            let chat = document.createElement('li');
    
              chat.innerHTML =  `<div> <span> ${data.senderName} </span> <br /> <br />  ${data.message} </div>`;
             let pattern = new RegExp(data.senderName);
             userName = localStorage.getItem('userName');

              if( userName == data.senderName)
                   {
                       console.log(data.senderName+ ' match '+ localStorage.getItem('userName'))
                       chat.style.justifyContent = 'flex-end';
                   } else{
                       console.log('no match');
                   }
              document.querySelector('#history').appendChild(chat);
        })
    // socket.on('message',function(msg){
    //     console.log( msg)
    //     $('<li> ').text(msg.message).appendTo('#history');
    // });
//})