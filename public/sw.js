//Install service worker and add files to chache storage.
let serviceCache = 'neighborhood-03';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(serviceCache).then((cache) => {
      return cache.addAll([
        'manifest.json',
        'index.html',
        '../src/data/locations.json',
        '../src/App.js',
        '../src/Map.js',
        '../src/SideBar.js',
        '../src/index.js',
        '../src/index.css',
        '../src/App.css',
        '../src/registerServiceWorker.js',
        'https://png.icons8.com/ios/34/2c3e50/tea-cup-filled.png',
        'https://png.icons8.com/ios/34/2c3e50/tea-cup.png',
        'https://png.icons8.com/ios/34/2c3e50/food-and-wine-filled.png',
        'https://png.icons8.com/ios/34/2c3e50/food-and-wine.png',
        'https://png.icons8.com/ios/34/2c3e50/city-bench-filled.png',
        'https://png.icons8.com/ios/34/2c3e50/city-bench.png',
        'https://png.icons8.com/material-rounded/34/2c3e50/summary-list.png',
        'https://png.icons8.com/material-outlined/34/000000/summary-list.png',
        'https://fonts.googleapis.com/css?family=Arial|Sofia'
      ]).then(() => self.skipWaiting());
    })
  )
});


//Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('restaurant-') &&
            cacheName != serviceCache;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//Make service worker to start fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    /*Pass promise at caches.match(). This method checks
    request and find resulf of cached that was made by Service worker*/
    caches.match(event.request).then((response) => {
      if(response) {
        console.log('Found cache: ', event.request.url);
        return response;
      }

      //Clone request for fetch.
      let requestClone = event.request.clone();

      return fetch(requestClone).then((response) => {
        //Pass response to browser
        if(!response || response.status !== 200 || response.type !== 'basic') {
          console.log('No response : status is not 200 or type is not basic');
          return response;
        }
        /*Clone response because browser needs to return response
        and pass cache.*/
        let responseToCache = response.clone();
        return caches.open(serviceCache).then((cache) => {
          //Pass response(clone) to cache
          cache.put(event.request, responseToCache);
          return response;
        }).catch((error) => {
          console.log('Service worker error')
        })
      })
    })
  );
});
