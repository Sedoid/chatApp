
// console.log('Service Worker Registered');
const cacheName = 'chatCache-v1';

const stuffsToCatch = [
    './index.html',
    './style.css',
    './script.js',

    './notConnected.html'
]

let state  = true
const resources = [];

let responsed = self.fetch('./index.html').then(
    response =>{
        response.blob()
        .then( blob => readBlob(blob));
    }
);
    // readBlob(responsed);


// console.log('Wats new');
// .then(
//     response =>{
//         response.blob()
//         .then(data =>{
//         let code =    new FileReader().readAsText(data).srcElement.result;
//         console.log(code);
//         })
//     }
// )

self.addEventListener('install', event =>{
    event.preventDefault();
    // console.log('Install event has been triggered');
    // console.log(event);
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(stuffsToCatch);
        }).catch(error =>{
            // console.log('Failed to cache the stuff');
            // console.log(error)
            return 0;
        }))

})

self.addEventListener('fetch', event => {        
        let reader = new FileReader();
        // console.log(event.request.url)
    event.respondWith(caches.match(event.request)
    
    .then( response => response || fetch(event.request))
            .catch(error => {
                if(event.request.mode == 'navigate'){
                    return caches.match(
                        './notConnected.html'
                    )
                }
            })
    )
    resources.push(event.request.url);
    fetch(event.request.url).then(
        response => response.blob()
            .then (blob => {
                console.log(blob)
                readBlob(blob)})
        
        )    
})




self.addEventListener('push',event =>{
    const data = event.data.json();
    console.log('Push Recieved');
    self.registration.showNotification(data.title,
        {
            body: 'Hello World',
            icon: 'http://mongoosejs.com/docs/images/mongoose.png'
        })
})

function readBlob(blob){
    console.log(blob);
    let reader = new FileReader();
   
            
                    reader.readAsText(blob);                  
                    reader.addEventListener('loadend',data =>{   
                        console.log(data.srcElement.result);  
                        // console.log(data.srcElement.result) 
                        // console.log(data.srcElement.result);                               
                  
                })
     
    
}

