const CACHE_NAME = 'benedikt-cache';
const urlsToCache = [
  '/', // Cache the root URL
  '/index.html', // Cache other necessary HTML files
  '/main.js', // Cache your main JavaScript file
  '/styles.css', // Cache your main CSS file
  // Add more assets specific to your "benedikt" app
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        const clonedResponse = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((cacheToDelete) => caches.delete(cacheToDelete))
      );
    })
  );
});
