

console.log('Inside the service worker now');

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open('chat_Cach-v1')
        .then(
            cache => cache.addAll(['./index.html','./style.css','./script.js',])
        ).catch(
            error =>{
                console.log('An error occured caching the data');
                console.log(error);
            })    
    )

})        
let me;
self.addEventListener('fetch', event =>{
    let url = new URL(event.request.url);

    event.respondWith(
        fetch(event.request).then(
            response =>{
                return response;
            }
        )
        // caches.match(event.request)
        // .then(
        //     response => {
        //         fetch(event.request)|| response
        //      return response;
        //     } 
        // ).then(
        //     ()=>{
        //         return caches.match('index.html');
        //     }
        // )
    // new Response(<h1> Hello What is happeining</h1>)
    
    //  console.log(me);
        // fetch(event.request.url)
        // .then(
        //     response =>{
        //         if(url.pathname.endsWith('.css'))
        //         return 
        //     }
        // )
       
        // );   
)

})

self.addEventListener('push',event =>{
    const data = event.data.json();
    console.log('push received');
    self.registration.showNotification(data.title,{
        body: 'This is your message dude, I hopen you enjoy it',
    })
})