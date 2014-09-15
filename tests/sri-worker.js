// via http://www.serviceworker.org/
this.oninstall = function(e) {
  console.log("I have been installed as a service worker.");
  console.log("I would love to start fetching, but cache doesnt work yet. stopping here..")
};


this.onfetch = function(e) {
  console.log("E?", e);
  console.log("e.request?", e.request);
  e.respondWith(
    fetch(event.request.url)
  );
};
