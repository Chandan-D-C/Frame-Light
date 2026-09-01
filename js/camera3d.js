/* FRAME & LIGHT — camera3d.js
   Two lightweight Three.js scenes built from primitives:
   1. A rotating lens/aperture behind the hero heading.
   2. A camera body in the dark "tool matters" section.
   Both pause rendering when off-screen for performance. */
(function () {
  "use strict";
  if (typeof THREE === "undefined") return;
  const reduced = window.FL_REDUCED_MOTION;

  const TERRACOTTA = 0xb7654a;
  const INK = 0x1c1a19;
  const DARK_METAL = 0x0f0e0d;

  function makeRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    return renderer;
  }

  function addLights(scene) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(4, 6, 5);
    scene.add(dir);
    const point = new THREE.PointLight(0xb7654a, 0.6, 20);
    point.position.set(-3, 1, 3);
    scene.add(point);
  }

  /* ---------- build a stylized lens from primitives ---------- */
  function buildLens() {
    const group = new THREE.Group();
    const barrelMat = new THREE.MeshStandardMaterial({ color: INK, metalness: 0.6, roughness: 0.35 });
    const accentMat = new THREE.MeshStandardMaterial({ color: TERRACOTTA, metalness: 0.7, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x0c0c0d, metalness: 0.9, roughness: 0.08 });

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 2.2, 48), barrelMat);
    barrel.rotation.x = Math.PI / 2;
    group.add(barrel);

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.045, 16, 60), accentMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.z = -0.5 + i * 0.5;
      group.add(ring);
    }

    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.12, 48), glassMat);
    glass.rotation.x = Math.PI / 2;
    glass.position.z = 1.15;
    group.add(glass);

    // aperture blades
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.4, roughness: 0.6, side: THREE.DoubleSide });
    const bladeGroup = new THREE.Group();
    const bladeCount = 7;
    for (let i = 0; i < bladeCount; i++) {
      const blade = new THREE.Mesh(new THREE.CircleGeometry(0.6, 3), bladeMat);
      blade.position.z = 1.22;
      blade.rotation.z = (i / bladeCount) * Math.PI * 2;
      bladeGroup.add(blade);
    }
    group.add(bladeGroup);

    return { group, bladeGroup };
  }

  /* ---------- build a stylized camera body from primitives ---------- */
  function buildCamera() {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: INK, metalness: 0.5, roughness: 0.4 });
    const accentMat = new THREE.MeshStandardMaterial({ color: TERRACOTTA, metalness: 0.75, roughness: 0.28 });
    const metalMat = new THREE.MeshStandardMaterial({ color: DARK_METAL, metalness: 0.85, roughness: 0.2 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 1.1), bodyMat);
    group.add(body);

    const prism = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.85), bodyMat);
    prism.position.set(0, 1.05, -0.05);
    group.add(prism);

    const { group: lens } = buildLens();
    lens.scale.set(0.7, 0.7, 0.7);
    lens.rotation.x = 0;
    lens.position.set(0, -0.05, 1.15);
    group.add(lens);

    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 32), accentMat);
    dial.position.set(1.05, 0.95, -0.05);
    group.add(dial);

    const strapLug1 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), metalMat);
    strapLug1.position.set(-1.35, 0.55, 0);
    group.add(strapLug1);
    const strapLug2 = strapLug1.clone();
    strapLug2.position.x = 1.35;
    group.add(strapLug2);

    // subtle floor shadow via a soft dark circle
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(2, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.05;
    group.add(shadow);

    return group;
  }

  /* ---------- shared visibility-aware render loop factory ---------- */
  function setupScene({ canvasId, build, sectionSelector, interactive }) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const section = sectionSelector ? document.querySelector(sectionSelector) : canvas.closest("section");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 6);
    addLights(scene);

    const built = build();
    const object = built.group || built;
    if (canvasId === "hero-canvas") { object.position.x = 1.9; object.position.y = -0.3; object.scale.setScalar(0.85); }
    scene.add(object);

    const renderer = makeRenderer(canvas);

    let visible = true;
    let targetRotX = 0, targetRotY = 0;
    let mouseNormX = 0, mouseNormY = 0;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(1, rect.width), h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    if (interactive && !reduced) {
      window.addEventListener("mousemove", (e) => {
        mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNormY = (e.clientY / window.innerHeight) * 2 - 1;
      });
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { visible = entry.isIntersecting; });
    }, { threshold: 0.05 });
    if (section) io.observe(section);

    let scrollFactor = 0;
    window.addEventListener("scroll", () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      scrollFactor = 1 - Math.min(1, Math.max(0, rect.top / window.innerHeight));
    }, { passive: true });

    function animate() {
      requestAnimationFrame(animate);
      if (!visible) return;

      if (!reduced) {
        object.rotation.y += 0.0035;
        targetRotX += (mouseNormY * 0.25 - targetRotX) * 0.05;
        targetRotY += (mouseNormX * 0.35 - targetRotY) * 0.05;
        object.rotation.x = targetRotX * 0.3;
        object.rotation.z = targetRotY * 0.08;
        object.position.y = Math.sin(Date.now() * 0.0006) * 0.06 - scrollFactor * 0.3;

        if (built.bladeGroup) built.bladeGroup.rotation.z += 0.0018;
      }
      renderer.render(scene, camera);
    }
    animate();
  }

  setupScene({ canvasId: "hero-canvas", build: buildLens, sectionSelector: ".hero", interactive: true });
  setupScene({ canvasId: "camera-canvas", build: buildCamera, sectionSelector: ".camera-section", interactive: true });
})();
