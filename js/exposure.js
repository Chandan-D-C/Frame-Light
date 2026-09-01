/* FRAME & LIGHT — exposure.js — interactive exposure simulator
   Relationships are conceptually correct, not physically simulated. */
(function () {
  "use strict";
  const apertureSlider = document.getElementById("sim-aperture");
  const shutterSlider = document.getElementById("sim-shutter");
  const isoSlider = document.getElementById("sim-iso");
  if (!apertureSlider) return;

  const APERTURES = ["f/1.4", "f/2.8", "f/5.6", "f/11"];
  const SHUTTERS = ["1/1000", "1/250", "1/60", "1/15"];
  const ISOS = ["100", "400", "1600", "6400"];

  const apVal = document.getElementById("ap-val");
  const shVal = document.getElementById("sh-val");
  const isoVal = document.getElementById("iso-val");
  const readout = document.getElementById("sim-readout");
  const dofLayer = document.getElementById("sim-dof");
  const noiseLayer = document.getElementById("sim-noise");
  const simImg = document.getElementById("sim-img");
  const explain = document.getElementById("sim-explain");

  function update() {
    const ai = +apertureSlider.value, si = +shutterSlider.value, ii = +isoSlider.value;
    const aperture = APERTURES[ai], shutter = SHUTTERS[si], iso = ISOS[ii];

    apVal.textContent = aperture;
    shVal.textContent = shutter;
    isoVal.textContent = iso;
    readout.textContent = `${aperture} | ${shutter} | ISO ${iso}`;

    // depth of field: wider aperture (lower index) = shallower DOF = more blur
    const blur = (3 - ai) * 2.2;
    dofLayer.style.backdropFilter = `blur(${blur}px)`;
    dofLayer.style.webkitBackdropFilter = `blur(${blur}px)`;

    // brightness: faster shutter + higher f-stop + lower ISO = darker
    const brightness = 0.55 + (3 - si) * 0.06 + (3 - ai) * 0.05 + ii * 0.07;
    simImg.style.filter = `brightness(${Math.min(1.5, Math.max(0.35, brightness))})`;

    // grain: higher ISO = more visible noise
    noiseLayer.style.opacity = (ii * 0.09).toFixed(2);

    const notes = [];
    if (ai === 0) notes.push("A wide aperture creates a shallow depth of field, blurring the background.");
    else if (ai === 3) notes.push("A narrow aperture keeps more of the scene in sharp focus.");
    if (si === 0) notes.push("A fast shutter freezes motion but lets in less light.");
    else if (si === 3) notes.push("A slow shutter lets in more light but can introduce motion blur.");
    if (ii >= 2) notes.push("Higher ISO brightens the image but adds visible grain.");
    else if (ii === 0) notes.push("Low ISO keeps the image clean, but needs more available light.");
    explain.textContent = notes.slice(0, 2).join(" ");
  }

  [apertureSlider, shutterSlider, isoSlider].forEach((s) => s.addEventListener("input", update));
  update();
})();
