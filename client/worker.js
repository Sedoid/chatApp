console.log('service Worker Loaded');

self.addEventListener('push', e=>{
    console.log('In the Service Worker');
    const data = e.data.json();
    console.log(data);
    console.log('Push Recieved....');
    self.registration.ServiceWorkerRegistration.title(data.name,{
        body: "Notified by Traversy Media!",
        icon: "http://image.ibb.co/frYoFd/tmlogo.png"
    });
});