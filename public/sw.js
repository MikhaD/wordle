// Increase the v number when the app is updated
const cacheName = "byrdle+-v3.1.3";

const assetsToCache = [
//	"./",
//	"./index.html",
//	"./build/bundle.css",
//	"./build/bundle.js"
];

self.addEventListener("install", e => {
	log("Installing");
	e.waitUntil((async () => {
		const cache = await caches.open(cacheName);
		await cache.addAll(assetsToCache);
	})());
});

self.addEventListener("fetch", e => {
	log("Fetching definition");
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		if (r) {
			log("Definition found in cache");
			return r;
		};
		const response = await fetch(e.request);
		const cache = await caches.open("defs");
		log("Caching definition");
		cache.put(e.request, response.clone());
		return response;
	})());
});
// When the name of the cache changes (because the app has been updated) delete the old cache
self.addEventListener("activate", e => {
	e.waitUntil(caches.keys().then(keys => {
		return Promise.all(keys.map((key) => {
			if (key === cacheName || key === "defs") return;
			log(`Cache updated to ${cacheName.split("-")[1]}, old cache deleted`);
			return caches.delete(key);
		}));
	}));
});
/**
 * Special log function to clearly distinguish logs from the service worker.
 * @param {string} text - The text to log
 */
function log(text) {
	console.log("%cService Worker", "color: purple; font-weight: 600; background: white; padding: 0 5px; border-radius: 2px", text);
}