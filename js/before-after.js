/* FRAME & LIGHT — before-after.js — draggable raw/final comparison */
(function () {
  "use strict";
  const frame = document.getElementById("ba-frame");
  if (!frame) return;
  const after = frame.querySelector(".ba-after");
  const divider = frame.querySelector(".ba-divider");
  let dragging = false;

  function setSplit(pct) {
    pct = Math.min(100, Math.max(0, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    divider.style.left = pct + "%";
    frame.setAttribute("aria-valuenow", Math.round(pct));
  }

  function xFromEvent(e) {
    const rect = frame.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return ((clientX - rect.left) / rect.width) * 100;
  }

  frame.addEventListener("pointerdown", (e) => { dragging = true; setSplit(xFromEvent(e)); });
  window.addEventListener("pointermove", (e) => { if (dragging) setSplit(xFromEvent(e)); });
  window.addEventListener("pointerup", () => (dragging = false));

  frame.addEventListener("keydown", (e) => {
    const current = parseFloat(frame.style.getPropertyValue("--x")) || 50;
    if (e.key === "ArrowLeft") setSplit((parseFloat(divider.style.left) || 50) - 4);
    if (e.key === "ArrowRight") setSplit((parseFloat(divider.style.left) || 50) + 4);
  });

  setSplit(50);
})();
