// via http://www.serviceworker.org/
this.oninstall = function(e) {
  console.log("I have been installed as a service worker.");

  e.waitUntil(resources.add(
    "tests/sri-main.html",
    "/fallback.html",
    "/css/base.css",
    "/js/app.js",
    "/img/logo.png"
  ).then(function() {
      // Add caches to the global caches.
      return Promise.all([
        caches.set("v1", resources),
        caches.set("visited", visited)
      ]);
    }));
};

this.onfetch = function(e) {
  e.respondWith(
    // Check to see if request is found in cache
    caches.match(e.request).catch(function() {
      // It's not? Prime the cache and return the response.
      return caches.get("visited").then(function(visited) {
        return fetch(e.request).then(function(response) {
          response = integrityCheck(response); // overwriting by a response that bleh
          visited.put(e.request, response);
          // Don't bother waiting, respond already.
          return response;
        });
      });
    }).catch(function() {
      // Connection is down? Simply fallback to a pre-cached page.
      return caches.match("/fallback.html");
    });
  );
};
