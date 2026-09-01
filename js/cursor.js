/* FRAME & LIGHT — cursor.js — desktop-only custom cursor */
(function () {
  "use strict";
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const cursor = document.getElementById("custom-cursor");
  const label = cursor.querySelector(".cc-label");
  let x = 0, y = 0, cx = 0, cy = 0;

  window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });

  function raf() {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  function bind() {
    document.querySelectorAll(".feature-card, .masonry-item").forEach((el) => {
      el.addEventListener("mouseenter", () => { cursor.classList.add("expand"); label.textContent = "View"; });
      el.addEventListener("mouseleave", () => cursor.classList.remove("expand"));
    });
    document.querySelectorAll("a, button").forEach((el) => {
      if (el.closest(".feature-card, .masonry-item")) return;
      el.addEventListener("mouseenter", () => cursor.style.background = "var(--c-charcoal)");
      el.addEventListener("mouseleave", () => cursor.style.background = "var(--c-bronze)");
    });
    const drag = document.getElementById("ba-frame");
    if (drag) {
      drag.addEventListener("mouseenter", () => { cursor.classList.add("expand"); label.textContent = "Drag"; });
      drag.addEventListener("mouseleave", () => cursor.classList.remove("expand"));
    }
  }
  // re-bind after gallery/featured items are injected
  document.addEventListener("fl:content-ready", bind);
  window.addEventListener("load", bind);
})();
