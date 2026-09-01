/* FRAME & LIGHT — gallery.js — featured track + masonry + filters */
(function () {
  "use strict";

  const featuredTrack = document.getElementById("featured-track");
  const masonryGrid = document.getElementById("masonry-grid");
  const filterRow = document.getElementById("filter-row");

  /* ---------- featured work ---------- */
  const total = PHOTO_DATA.length;
  featuredTrack.innerHTML = PHOTO_DATA.map((p, i) => `
    <article class="feature-card" data-id="${p.id}">
      <div class="fc-frame">
        <img src="${p.thumbnail}" alt="${p.title} — ${p.location}" loading="lazy">
        <span class="fc-index">${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
        <span class="fc-cat-tag">${p.category}</span>
        <div class="fc-overlay">
          <div class="fc-meta-overlay">
            <div>
              <div class="fc-title">${p.title}</div>
              <div class="fc-loc">${p.location}</div>
            </div>
            <div class="fc-exif">${p.aperture} · ${p.shutter}<br>ISO ${p.iso}</div>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  /* ---------- masonry gallery ---------- */
  function renderMasonry() {
    masonryGrid.innerHTML = PHOTO_DATA.map((p) => `
      <div class="masonry-item" data-id="${p.id}" data-category="${p.category}">
        <img src="${p.thumbnail}" alt="${p.title} — ${p.location}" loading="lazy">
        <span class="mi-tag">${p.title}</span>
        <span class="mi-exif">${p.aperture} · ${p.lens}</span>
      </div>
    `).join("");
  }
  renderMasonry();

  /* ---------- filters ---------- */
  const categories = ["all", ...Array.from(new Set(PHOTO_DATA.map((p) => p.category)))];
  filterRow.innerHTML = categories.map((c, i) => `
    <button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}" role="tab" aria-selected="${i === 0}">${c}</button>
  `).join("");

  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterRow.querySelectorAll(".filter-btn").forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const filter = btn.dataset.filter;
    masonryGrid.querySelectorAll(".masonry-item").forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hide", !match);
    });
  });

  /* ---------- stories ---------- */
  const storiesWrap = document.getElementById("stories-wrap");
  if (storiesWrap) {
    storiesWrap.innerHTML = STORY_DATA.map((s) => {
      const photo = PHOTO_DATA.find((p) => p.id === s.photoId);
      const layoutClass = s.layout === "image-right" ? "image-right" : s.layout === "full-width" ? "full-width" : "";
      return `
        <div class="story ${layoutClass}">
          <div class="story-media"><img src="${photo ? photo.image : ""}" alt="${s.title}" loading="lazy"></div>
          <div class="story-copy">
            <span class="story-number">${s.number}</span>
            <h3 class="hl story-title">${s.title}</h3>
            <p class="story-loc">${s.location}</p>
            <p class="story-text">${s.text}</p>
          </div>
        </div>`;
    }).join("");
  }

  // let cursor.js and lightbox.js know content exists
  document.dispatchEvent(new CustomEvent("fl:content-ready"));
})();
