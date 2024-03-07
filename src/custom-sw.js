import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

const assetsRoute = new Route(
  ({ url }) => url.pathname === '/assets',
  new NetworkFirst({
    cacheName: 'daniel-assets',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  })
);

const publicRoute = new Route(
  ({ url }) => /\/.*.png/.test(url.pathname),
  new NetworkFirst({
    cacheName: 'daniel-public',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  })
);

const imagesRoute = new Route(
  ({ url }) => /.*images\/.*.png/.test(url.pathname),
  new CacheFirst({
    cacheName: 'daniel-images',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  })
);

registerRoute(imagesRoute);
registerRoute(assetsRoute);
registerRoute(publicRoute);

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

console.debug('SW loaded');

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  // if (event.data.type === 'private message') {
  //   console.log(event.data.info);
  //   broadcast.postMessage("What's up?");
  // }
});

self.addEventListener('install', () => {
  console.debug('SW install event');
  caches.delete('roberts-employees');
});
self.addEventListener('activate', function () {
  console.debug('SW activate event, claiming control');
  return self.clients.claim();
});
