// Increase the v number when the app is updated
const cacheName = "wordle+-v1";

const assetsToCache = [
	"/public/",
	"/public/index.html",
	"/public/build/bundle.css",
	"/public/build/bundle.js"
];

self.addEventListener("install", e => {
	e.waitUntil((async () => {
		const cache = await caches.open(cacheName);
		await cache.addAll(assetsToCache);
	})());
});

self.addEventListener("fetch", e => {
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		if (r) return r;
		const response = await fetch(e.request);
		const cache = await caches.open(cacheName);
		cache.put(e.request, response.clone());
		return response;
	})());
});
// When the name of the cache changes (because the app has been updated) delete the old cache
self.addEventListener("activate", e => {
	e.waitUntil(caches.keys().then(keys => {
		return Promise.all(keys.map((key) => {
			if (key === cacheName) return;
			return caches.delete(key);
		}));
	}));
});