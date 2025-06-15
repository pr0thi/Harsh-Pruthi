const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css',
  '/icon2.png',
  '/logo192.png',
  '/logo512.png',
  // Add other critical assets like CSS, JS, images, fonts
  '/src/components/Navbar.jsx',
  '/src/components/Hero.jsx',
  '/src/components/About.jsx',
  '/src/components/Experience.jsx',
  '/src/components/Projects.jsx',
  '/src/components/Contact.jsx',
  '/src/components/Footer.jsx',
  '/src/components/ProjectDetail.jsx',
  '/src/components/ParticleBackground.jsx',
  '/src/components/Chatbox.jsx',
  '/src/data/projects.js',
  '/src/data/experiences.js',
  '/src/data/chatdata.js',
  '/project_pics/energyX.png',
  '/project_pics/nourish.png',
  '/project_pics/kycAPP.png',
  '/project_pics/cris.png',
  '/project_pics/swiggy.png',
  '/project_pics/finwise.png',
  '/project_pics/netflix.png',
  '/project_pics/youtube.png',
  '/project_pics/boxcars.png',
  '/project_pics/comingSoon.jpg',
  '/project_pics/speedyBites.png',
  '/Harsh_Pruthi.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 