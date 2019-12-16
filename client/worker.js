console.log('service Worker Loaded');

self.addEventListener('push', e=>{
    console.log('In the Service Worker');
    const data = e.data.json();
    console.log(data);
    console.log('Push Recieved....');
    self.registration.ServiceWorkerRegistration.title(data.title,{
        body: "Notified by Traversy Media!",
        icon: "http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png"
    });
});