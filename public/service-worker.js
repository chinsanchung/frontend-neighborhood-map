//Install Service worker
let serviceCache = 'neighborhood-01';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(serviceCache).then((cache) => {
      return cache.addAll([
        'manifest.json',
        'index.html',
        '../src/App.js',
        '../src/index.js'
        '../src/index.css'
        '../src/App.css',
        '../src/registerServiceWorker.js',
        'https://fonts.googleapis.com/css?family=Arial|Sofia'
      ]).then(() => self.skipWaiting());
    })
  )
});

//Activace Service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('neighborhood-') &&
            cacheName != serviceCache;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//Fetch Service worker
self.addEventList('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if(response) {
        console.log('Found cache: ', event.request.url);
        return response;
      }

      let requestClone = event.request.clone();

      return fetch(requestClone).then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          console.log('No response : status is not 200 or type is not basic');
          return response;
        }

        let responseToCache = response.clone();

        return caches.open(serviceCache).then((cache) => {
          cache.put(event.request, responseToCache);
          return response;
        }).catch((error) => {
          console.log('Service worker fetch error');
        })
      })
    })
  );
});
