/* FRAME & LIGHT — lightbox.js */
(function () {
  "use strict";
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const closeBtn = document.getElementById("lb-close");
  const prevBtn = document.getElementById("lb-prev");
  const nextBtn = document.getElementById("lb-next");
  let currentIndex = 0;
  let lastFocused = null;

  const fields = {
    cat: document.getElementById("lb-cat"),
    title: document.getElementById("lb-title"),
    loc: document.getElementById("lb-loc"),
    desc: document.getElementById("lb-desc"),
    camera: document.getElementById("lb-camera"),
    lens: document.getElementById("lb-lens"),
    aperture: document.getElementById("lb-aperture"),
    shutter: document.getElementById("lb-shutter"),
    iso: document.getElementById("lb-iso"),
    coords: document.getElementById("lb-coords")
  };

  function render(index) {
    const p = PHOTO_DATA[index];
    lbImg.src = p.image;
    lbImg.alt = p.title + " — " + p.location;
    fields.cat.textContent = p.category;
    fields.title.textContent = p.title;
    fields.loc.textContent = p.location;
    fields.desc.textContent = p.description;
    fields.camera.textContent = p.camera;
    fields.lens.textContent = p.lens;
    fields.aperture.textContent = p.aperture;
    fields.shutter.textContent = p.shutter;
    fields.iso.textContent = p.iso;
    fields.coords.textContent = p.coords;
  }

  function open(id) {
    currentIndex = PHOTO_DATA.findIndex((p) => p.id === id);
    if (currentIndex < 0) currentIndex = 0;
    render(currentIndex);
    lastFocused = document.activeElement;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function step(dir) {
    currentIndex = (currentIndex + dir + PHOTO_DATA.length) % PHOTO_DATA.length;
    render(currentIndex);
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".feature-card, .masonry-item");
    if (card) open(card.dataset.id);
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
