self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('homepage').then((cache) => {
      return cache.addAll([
        '/',
        '/img/background.jpg',
        '/img/sprite.png',
        '/fonts/Beleren2016-Bold.woff',
        '/css/main.css',
        '/video/background.mp4',
        '/video/background.webm'
      ]);
    }).then(() => {
      return self.skipWaiting();
    }).catch(err => {
      console.log(err);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
