/* FRAME & LIGHT — navigation.js */
(function () {
  "use strict";
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const navAnchors = links.querySelectorAll("a");

  function onScroll() {
    nav.classList.toggle("solid", window.scrollY > 60);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // active-section tracking
  const sections = Array.from(navAnchors).map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  sections.forEach((s) => sectionObserver.observe(s));

  // dark hero -> nav starts in "on dark" state; toggle to charcoal text over light sections could be added
  // by observing section backgrounds, kept simple here since nav is fixed-dark-on-scroll by default.
})();
