const CACHE_NAME = 'note-app-cache-v2';
const urlsToCache = ['./', './index.html', './styles.css', './app.js', './manifest.json',   './icons/icon-192.png',
  '/icons/icon-512.png'];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      }).catch((err) => {
        console.error("Cache addAll failed:", err);
      })
    );
  });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
