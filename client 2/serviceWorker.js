console.log('Service Worker Registered');
const cacheName = 'chatCache-v1';
const stuffsToCatch = [
    './index.html',
    './style.css',
    './script.js',

    './notConnected.html'
]
self.addEventListener('fetch', event => {
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
    
    fetch(event.request.url).then(
        response =>{
            // console.log('The response ****************************');
            // console.log(response.body;
            // console.log('End of response *********************8***');
            return response;
        }
    )
})

self.addEventListener('install', event =>{
    console.log('Install event has been triggered');
    // console.log(event);
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(stuffsToCatch);
        }).catch(error =>{
            console.log('Failed to cache the stuff');
            console.log(error)
            return 0;
        })
             
        
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