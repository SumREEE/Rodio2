const CACHE_NAME = "home-cache-v1";
const urlsToCache = [
    "index.html",
    "home.svg",
    "img/text-home2.png",
    "home.html",
    "syle-home.css",
];

// ติดตั้ง Service Worker และแคชไฟล์
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// ตรวจสอบการดึงข้อมูลจากแคชก่อนแล้วถึงไปที่เซิร์ฟเวอร์
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // ถ้าเจอแคชให้ใช้ไฟล์จากแคช
            }
            return fetch(event.request).then((response) => {
                // เก็บไฟล์ใหม่ในแคช
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        }).catch(() => {
            // ถ้าไม่สามารถดึงข้อมูลได้ ใช้หน้า offline.html
            return caches.match("offline.html");
        })
    );
});

// ลบแคชเก่าหากมีเวอร์ชันใหม่
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});