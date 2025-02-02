const CACHE_NAME = 'pwa-home-cache-v1';
const urlsToCache = [
    './index.html',
    './syle-home.css',
    './img/home.png',
    './img/text-home2.png',
    './img/Blue.png',
    './img/Yellow.png',
    './img/Green.png',
    './manifest.json'
    
];

// ติดตั้ง Service Worker และแคชไฟล์
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// จัดการการเรียกข้อมูล
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// ล้างแคชเก่าเมื่อมีการอัปเดต
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
