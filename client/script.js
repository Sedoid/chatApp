// Registering the service Worker
const publicVapidKey= ' ';
if(navigator.serviceWorker){
    //Register Service Workers and Subscribe to push Notifications anytime a users
    // recieves a message
    console.log('Service Workers are supported')
    console.log('Registering the service workers');
    navigator.serviceWorker.register('./serviceWorker.js');
}

window.addEventListener('load',event =>{

// localStorage.clear();
let userName,
    form = document.querySelector("#message"),
    submitUserName = document.querySelector('#submit_UserName');

if (localStorage.getItem("userName")) {
    userName = localStorage.getItem("userName");
    document.querySelector('aside').style.display= 'none';

    document.querySelector("#name").value = userName;
} else {
    document.getElementsByClassName('messages')[0].style.display='none';
    document.querySelector('section').style.display = 'none';
    console.log("found nothing like username in the storage");
    userName = "";
}

submitUserName.addEventListener('click', event =>{
    event.preventDefault();
    let temp = document.querySelector('#userName');
    let pattern = new RegExp(' ','g');
    temp = temp.value.replace(pattern,'');
    if(temp == '')
        return false;
    else{
    localStorage.setItem('userName', temp);
    document.querySelector('aside').style.display= 'none';
    document.getElementsByClassName('messages')[0].style.display='inline-block';
    document.querySelector('section').style.display = 'inline-block';
    document.querySelector('#name').value = temp;
    }
    
})

let socket = io();

$("form").on("submit", function (e) {
    e.preventDefault();
    userName =  $("#name").val() ;
    localStorage.setItem("userName", userName);

    let text = `<p>${$("#message").val()}</p>`;
    if (text != "") {
        text = {
            senderName: userName,
            message: text,
            group : false,
        };
      
        socket.emit("message", text);
    }

    return false;
});
/*  Sending a Message     */ 
socket.on("message", data => {
    console.log(data);
// Subscribing for a push notifications

    let chat = document.createElement("li");

    // document.getElementsByTagName(
    //     "span"
    // )[0].innerHTML = `Nobody is typing yet...`;

    chat.innerHTML = `<div> <span> ${data.senderName} </span> <br />  ${data.message} </div>`;
    let pattern = new RegExp(data.senderName);
    userName = localStorage.getItem("userName");

    if (userName == data.senderName) {
        chat.classList.add("me");
        console.log("Message is being sent by thesame user");
        console.log(data.senderName + " match " + localStorage.getItem("userName"));
        chat.style.justifyContent = "flex-end";
    } else {
        chat.classList.add("others");
        console.log("Message is being sent by a difference user");
    }
    document.querySelector("#history").appendChild(chat);
});

/* Listening  to a user typing events */ 
form.addEventListener("input", () => {
    console.log(`${userName} is typing...`);
    socket.emit("typing", `${userName} is typing...`);

    if (!form.value){
        console.log('Not typing');
        socket.emit("typing", false);
    } 
});

/* Reacting to a user typing events */ 
socket.on("s_typing", data => {
    //let type =
    let template = document.createElement('li');
    template.innerHTML =   `${data}`;
    template.style.listStyleType = 'none';
    if (data) {
        document.getElementsByClassName("typing")[0].innerHTML = '';
        document.getElementsByClassName("typing")[0].appendChild(template);
    }
    else
        document.getElementsByClassName(
            "typing"
        )[0].innerHTML = `Nobody is typing yet...`;

    console.log("just recieved a typing event from the server");
    console.log(data);
});

// let cooking = document.querySelector('.btn2'),
//     coding = document.querySelector('.btn1'),groups;

// cooking.addEventListener('click', function () {
//     groups = 'cooking'
   
// })

// coding.addEventListener('click', function () {
//     groups = 'coding';
// });

function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/-/g,'/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i=0; i< rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function push_subscription(publicVapidKey){
//Subscribing to push Notifications
    console.log('Registering push Notifications')
const subscribe = await registeration.pushManger.subscribe(
    {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Registered Push Notifications')
    console.log('Sending push Notification to the server')
    await fetch('./subscribe',{
        method: 'POST',
        body: JSON.stringify(subscribe),
        headers:{
            'content-type': 'application/json',
        }
    });

    console.log('Successfully send the subscribtion object to the server');

}


})

