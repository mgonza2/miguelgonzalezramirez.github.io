/* Scroll-spy for the section nav. Site is fully readable without this file. */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(
    document.querySelectorAll('.mastnav a[href^="#"]')
  );
  if (!links.length || !("IntersectionObserver" in window)) return;

  var map = {};
  links.forEach(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (section) map[section.id] = link;
  });

  var ids = Object.keys(map);
  if (!ids.length) return;

  function clear() {
    links.forEach(function (l) { l.removeAttribute("aria-current"); });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        clear();
        map[entry.target.id].setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  ids.forEach(function (id) { observer.observe(document.getElementById(id)); });
})();
