// ============================================================
// SERVICE WORKER — CACHE OFFLINE
// "Morte na Barbearia"
// ============================================================

const CACHE_NAME = 'morte-barbearia-v2';
const ASSETS = [
  '/',
  '/404.html',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/js/navigation.js',
  '/js/animations.js',
  '/js/effects.js',
  '/js/interactions.js',
  '/js/pwa.js',
  '/assets/images/capa.jpg',
  '/assets/images/author.jpg',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
