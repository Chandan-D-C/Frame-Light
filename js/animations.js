/* FRAME & LIGHT — animations.js — GSAP + ScrollTrigger reveals
   Runs after DOM content (gallery/stories) has been injected. */
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("fl:content-ready", init, { once: true });

function init() {
  if (!window.gsap || !window.ScrollTrigger || window.FL_ANIM_INIT) return;
  window.FL_ANIM_INIT = true;
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.FL_REDUCED_MOTION;
  if (reduced) { gsap.set(".reveal-up, .editorial-heading .line span, .divider-line", { clearProps: "all" }); return; }

  /* generic reveal-up elements */
  gsap.utils.toArray(".reveal-up").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  /* editorial line-by-line heading reveals (intro + education) */
  gsap.utils.toArray(".editorial-heading").forEach((heading) => {
    gsap.to(heading.querySelectorAll(".line span"), {
      y: "0%", opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.1,
      scrollTrigger: { trigger: heading, start: "top 85%" }
    });
  });

  /* divider lines expand into view */
  gsap.utils.toArray(".divider-line").forEach((line) => {
    ScrollTrigger.create({
      trigger: line, start: "top 90%",
      onEnter: () => line.classList.add("in-view")
    });
  });

  /* featured cards stagger in */
  const featureCards = gsap.utils.toArray(".feature-card");
  if (featureCards.length) {
    gsap.set(featureCards, { opacity: 0, y: 30 });
    gsap.to(featureCards, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: "#featured-track", start: "top 85%" }
    });
  }

  /* masonry items fade/scale in */
  const masonryItems = gsap.utils.toArray(".masonry-item");
  if (masonryItems.length) {
    gsap.set(masonryItems, { opacity: 0, scale: 0.95 });
    gsap.to(masonryItems, {
      opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "power2.out",
      scrollTrigger: { trigger: "#masonry-grid", start: "top 88%" }
    });
  }

  /* stories: alternating slide-in */
  gsap.utils.toArray(".story").forEach((story) => {
    const media = story.querySelector(".story-media");
    const text = story.querySelector(".story-copy");
    const fromLeft = !story.classList.contains("image-right");
    gsap.set(media, { opacity: 0, x: fromLeft ? -40 : 40 });
    if (text) gsap.set(text, { opacity: 0, y: 20 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: story, start: "top 80%" } });
    tl.to(media, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" });
    if (text) tl.to(text, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.6");
  });

  /* hero subtle parallax on the background video + cursor tilt */
  gsap.to("#hero-video", {
    yPercent: 12, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.fromTo("#hero-video", { scale: 1.12 }, { scale: 1.02, duration: 1.6, ease: "power2.out" });

  /* section number subtle parallax */
  gsap.utils.toArray(".section-number").forEach((num) => {
    gsap.fromTo(num, { y: 30, opacity: 0 }, {
      y: 0, opacity: 0.55, duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: num, start: "top 90%" }
    });
  });
}
