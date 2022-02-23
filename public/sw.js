// Increase the v number when the app is updated
const staticCacheName = "byrdle-v5.0.1";

const filesToCache = [
	"./",
	"./global.css",
	"./index.html",
	"./manifest.json",
	"./build/bundle.css",
	"./img/byrdle_logo_32x32.png",
	"./build/bundle.js"
];


self.addEventListener('install', event => {
  log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', event => {
  //console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        //console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      //console.log('Network request for ', event.request.url);
      return fetch(event.request)
      .then(response => {
        return caches.open(staticCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
        });
      });

    }).catch(error => {
      // TODO 6 - Respond with custom offline page
    })
  );
});


self.addEventListener('activate', event => {
  log('Activating new service worker...');

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


function log(text) {
	console.log("%cService Worker", "color: purple; font-weight: 600; background: white; padding: 0 5px; border-radius: 2px", text);
}