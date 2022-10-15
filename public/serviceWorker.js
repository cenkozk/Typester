let CACHE_NAME = "my-site-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/css/main.a1fd9a17.css", "/static/js/main.021a251b.js", "/favicon.ico", "/manifest.json"];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
