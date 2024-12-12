const CACHE_NAME = "home-cache-v1";
const urlsToCache = [
    "index.html",
    "img/text-home2.png",
    "img/home.png",
    "home.html",
    "syle-home.css",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
