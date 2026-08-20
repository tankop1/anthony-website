// Hero typewriter — cycles editing formats in the headline.

(function () {
  var el = document.getElementById("typewriter");
  if (!el) return;

  var words = [
    "film",
    "documentary",
    "music video",
    "Instagram Reel",
    "YouTube video",
    "commercial",
  ];
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    el.textContent = words[0];
    return;
  }

  var wordIndex = 0;
  var charIndex = words[0].length;
  var deleting = true;

  function tick() {
    var word = words[wordIndex];

    if (!deleting) {
      charIndex += 1;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
      setTimeout(tick, 72);
      return;
    }

    charIndex -= 1;
    el.textContent = word.slice(0, Math.max(charIndex, 0));
    if (charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 380);
      return;
    }
    setTimeout(tick, 42);
  }

  setTimeout(tick, 1600);
})();

// Showreel — sits lower, then rises and widens to the work grid on scroll.

(function () {
  var hero = document.querySelector(".hero");
  var frame = document.querySelector(".hero-frame");
  if (!hero || !frame) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ticking = false;

  function startWidth() {
    return window.matchMedia("(max-width: 600px)").matches ? 86 : 62;
  }

  function startY() {
    return window.matchMedia("(max-width: 600px)").matches ? 64 : 112;
  }

  function apply(progress) {
    var eased = 1 - Math.pow(1 - progress, 3);
    var y = startY() * (1 - eased);
    var from = startWidth();
    var width = from + (100 - from) * eased;
    hero.style.setProperty("--reel-y", y.toFixed(1) + "px");
    hero.style.setProperty("--reel-width", width.toFixed(2) + "%");
  }

  function update() {
    ticking = false;
    if (reduced) {
      apply(1);
      return;
    }
    var range = Math.max(240, window.innerHeight * 0.65);
    var progress = Math.min(1, Math.max(0, window.scrollY / range));
    apply(progress);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  if (reduced) {
    apply(1);
    return;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// Scroll reveal — fades sections in once as they enter the viewport.

(function () {
  var nodes = document.querySelectorAll("[data-reveal]");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    nodes.forEach(function (n) {
      n.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  nodes.forEach(function (n) {
    observer.observe(n);
  });
})();
