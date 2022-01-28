/** VARS */
const ORIGIN_URL = `${location.protocol}//${location.host}`;
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";
const CACHED_FILES = [
  OFFLINE_URL,
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js",
  `${ORIGIN_URL}/css/index.css`,
  `${ORIGIN_URL}/js/index.js`,
  `${ORIGIN_URL}/js/top.js`,
  `${ORIGIN_URL}/img/logo.png`,
  `${ORIGIN_URL}/img/logos/logo50.png`,
  `${ORIGIN_URL}/img/logos/logo144.png`,
];

/** FUNCTIONS */

/** Fetch */

const respondWithFetchPromiseNavigate = (event) =>
  new Promise((resolve) => {
    event.preloadResponse
      .then((preloadResponse) => {
        if (preloadResponse) {
          resolve(preloadResponse);
        }

        // Always try the network first.
        fetch(event.request)
          .then((networkResponse) => {
            resolve(networkResponse);
          })
          // send cache offline.html
          .catch(() => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.match(OFFLINE_URL).then((cachedResponse) => {
                resolve(cachedResponse);
              });
            });
          });
      })
      .catch(() => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.match(OFFLINE_URL).then((cachedResponse) => {
            resolve(cachedResponse);
          });
        });
      });
  });

const fetchSW = (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(respondWithFetchPromiseNavigate(event));
  }
};

/*********************************** */

/** Activate */

const waitUntilActivatePromise = () =>
  new Promise((resolve) => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ("navigationPreload" in self.registration) {
      self.registration.navigationPreload.enable().finally(resolve);
    }
  });

const activate = (event) => {
  event.waitUntil(waitUntilActivatePromise());
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
};

/*********************************** */

/** Install */
const waitUntilInstallationPromise = () =>
  new Promise((resolve) => {
    caches.open(CACHE_NAME).then((cache) => {
      cache.add(new Request(OFFLINE_URL, { cache: "reload" })).then(resolve);
    });
  });

const installSW = (event) => {
  event.waitUntil(waitUntilInstallationPromise());
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
};
/*********************************** */

/** INIT */
self.addEventListener("install", installSW);
self.addEventListener("activate", activate);
self.addEventListener("fetch", fetchSW);