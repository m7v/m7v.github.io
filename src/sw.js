self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('homepage').then((cache) => {
      return cache.addAll([
        '/',
        '/dist/img/background.jpg',
        '/dist/img/sprite.png',
        '/dist/fonts/Beleren2016-Bold.woff',
        '/dist/css/main.css',
        '/dist/video/background.mp4',
        '/dist/video/background.webm'
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
