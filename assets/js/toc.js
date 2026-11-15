// Markiert im seitlichen Inhaltsverzeichnis den Abschnitt, in dem man gerade liest.
// Ohne JavaScript funktioniert das Verzeichnis ganz normal, nur ohne Markierung.
(function () {
  var links = document.querySelectorAll('.toc-side a[href^="#"]');
  var items = [];
  for (var i = 0; i < links.length; i++) {
    var id = decodeURIComponent(links[i].getAttribute('href').slice(1));
    var heading = document.getElementById(id);
    if (heading) items.push({ link: links[i], heading: heading });
  }
  if (!items.length) return;

  var current = null;
  var pending = false;

  function update() {
    pending = false;
    var line = window.innerHeight * 0.25; // Abschnitt gilt als aktiv, sobald seine Überschrift das obere Viertel erreicht
    var active = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].heading.getBoundingClientRect().top <= line) active = items[i];
      else break;
    }
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) active = items[items.length - 1];
    if (active === current) return;
    if (current) {
      current.link.classList.remove('is-active');
      current.link.removeAttribute('aria-current');
    }
    if (active) {
      active.link.classList.add('is-active');
      active.link.setAttribute('aria-current', 'location');
    }
    current = active;
  }

  function schedule() {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
})();
