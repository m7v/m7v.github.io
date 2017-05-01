const VERSION = 1.1;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('homepage-'+VERSION).then((cache) => {
      return cache.addAll([
        '/',
        '/img/sprite.png',
        '/fonts/Beleren2016-Bold.woff',
        '/css/main.css',
        '/img/background_01.jpg',
        '/img/background_02.jpg',
        '/img/background_03.jpg',
        '/img/background_04.jpg',
        '/img/background_05.jpg',
        '/img/background_06.jpg',
        '/video/background_01.mp4',
        '/video/background_02.mp4',
        '/video/background_03.mp4',
        '/video/background_04.mp4',
        '/video/background_05.mp4',
        '/video/background_06.mp4',
        '/video/background_01.webm',
        '/video/background_02.webm',
        '/video/background_03.webm',
        '/video/background_04.webm',
        '/video/background_05.webm',
        '/video/background_06.webm'
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
