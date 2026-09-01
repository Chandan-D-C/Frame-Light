/* FRAME & LIGHT — main.js: preloader, scroll progress, misc */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) document.documentElement.classList.add("reduced-motion");
  window.FL_REDUCED_MOTION = prefersReduced;

  /* ---------- preloader ---------- */
  const preloader = document.getElementById("preloader");
  const plProgress = document.getElementById("pl-progress");
  let pct = 0;
  const tick = setInterval(() => {
    pct = Math.min(100, pct + Math.round(8 + Math.random() * 18));
    plProgress.textContent = String(pct).padStart(2, "0") + "%";
    if (pct >= 100) clearInterval(tick);
  }, 90);

  function finishLoad() {
    clearInterval(tick);
    plProgress.textContent = "100%";
    if (window.gsap) {
      gsap.timeline()
        .to([".pl-mark", ".pl-sub", ".pl-progress"], { opacity: 1, duration: 0.4, stagger: 0.12 })
        .to("#preloader", { delay: 0.3, opacity: 0, duration: 0.7, ease: "power2.out",
          onComplete: () => { preloader.classList.add("hidden"); document.body.classList.add("loaded"); runHeroIntro(); } });
    } else {
      preloader.classList.add("hidden");
      document.body.classList.add("loaded");
      runHeroIntro();
    }
  }
  window.addEventListener("load", () => setTimeout(finishLoad, 550));
  // safety net in case load never fires cleanly
  setTimeout(finishLoad, 3200);

  /* ---------- typewriter (hero heading) ---------- */
  function typeInto(el, text, speed) {
    return new Promise((resolve) => {
      if (prefersReduced) { el.textContent = text; resolve(); return; }
      let i = 0;
      const tick = () => {
        el.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) setTimeout(tick, speed + Math.random() * 30);
        else resolve();
      };
      tick();
    });
  }

  async function runHeroTypewriter() {
    const seeEl = document.getElementById("tw-see");
    const diffEl = document.getElementById("tw-diff");
    const cursor = document.getElementById("tw-cursor");
    if (!seeEl || !diffEl) return;
    await typeInto(seeEl, "SEE", 90);
    await new Promise((r) => setTimeout(r, 180));
    await typeInto(diffEl, "DIFFERENTLY.", 55);
    if (cursor) setTimeout(() => cursor.classList.add("done"), 900);
  }

  /* ---------- hero entrance sequence ---------- */
  function runHeroIntro() {
    if (!window.gsap) { runHeroTypewriter(); return; }
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to("#hero-eyebrow", { opacity: 1, y: 0, duration: 0.6, onComplete: runHeroTypewriter })
      .to("#hero-desc", { opacity: 1, duration: 0.7 }, "+=1.4")
      .to("#hero-ctas", { opacity: 1, duration: 0.7 }, "-=0.5")
      .to("#scroll-cue", { opacity: 1, duration: 0.6 }, "-=0.3")
      .to("#hero-meta", { opacity: 1, duration: 0.6 }, "-=0.4");
  }

  /* ---------- scroll progress bar ---------- */
  const progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + "%";
  }
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- animated stats ---------- */
  const stats = document.querySelectorAll(".stat-num");
  if (stats.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (prefersReduced) { el.textContent = target; statObserver.unobserve(el); return; }
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const iv = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(iv); }
          el.textContent = cur;
        }, 30);
        statObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach((s) => statObserver.observe(s));
  }

  /* ---------- philosophy quote word reveal ---------- */
  const quoteEl = document.getElementById("philosophy-quote");
  if (quoteEl) {
    const quoteText = '"The camera records what the eye sees. The photograph reveals what the heart noticed."';
    quoteEl.innerHTML = quoteText.split(" ").map((w) => `<span>${w}</span>`).join(" ");
    const words = quoteEl.querySelectorAll("span");
    const heartIdx = quoteText.split(" ").findIndex((w) => w.toLowerCase().includes("heart"));
    const quoteObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        words.forEach((w, i) => {
          setTimeout(() => {
            w.classList.add("revealed");
            if (i !== heartIdx) w.classList.add("default-c");
          }, prefersReduced ? 0 : i * 55);
        });
        quoteObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    quoteObserver.observe(quoteEl);
  }

  /* ---------- hero video: play once, freeze on last frame ---------- */
  const heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    heroVideo.play().catch(() => { /* autoplay blocked; poster frame stands in */ });
    heroVideo.addEventListener("ended", () => {
      // no loop attribute set, so the video already holds its last frame —
      // pause() just makes that explicit and stops any further playback.
      heroVideo.pause();
    });
  }

  /* ---------- contact form ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    const fields = ["name", "email", "subject", "message"];
    fields.forEach((f) => {
      const input = document.getElementById("cf-" + f);
      const wrap = input.closest(".field");
      const sync = () => wrap.classList.toggle("filled", input.value.trim().length > 0);
      input.addEventListener("input", sync);
      input.addEventListener("blur", sync);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      fields.forEach((f) => {
        const input = document.getElementById("cf-" + f);
        const err = document.getElementById("err-" + f);
        err.textContent = "";
        if (!input.value.trim()) {
          err.textContent = "This field is required.";
          valid = false;
        } else if (f === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
          err.textContent = "Enter a valid email address.";
          valid = false;
        }
      });
      const status = document.getElementById("form-status");
      if (!valid) { status.textContent = "Please fix the highlighted fields."; return; }
      status.textContent = "Thank you. Your message has been captured.";
      form.reset();
      fields.forEach((f) => document.getElementById("cf-" + f).closest(".field").classList.remove("filled"));
    });
  }
})();
