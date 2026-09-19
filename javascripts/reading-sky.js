let disposeReadingSky = () => {};
const READING_SKY_MAX_CONNECTIONS = 10;
const READING_SKY_MIN_DISTANCE = 20;
const READING_SKY_MAX_OFFSET = 5;

document$.subscribe(() => {
  disposeReadingSky();
  disposeReadingSky = () => {};
  const note = document.querySelector(".codex-note");
  if (!note) return;

  const canvas = document.createElement("canvas");
  canvas.className = "reading-sky";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  if (!context) { canvas.remove(); return; }
  const events = new AbortController();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let seed = 83;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  let stars = [];
  let width, height, bounds, frame, previous = 0, time = 0;
  let dark = false;
  const pointer = { x: -1000, y: -1000 };

  const scatter = () => {
    seed = 83;
    stars = [];
    const spacing = READING_SKY_MIN_DISTANCE + 2 * READING_SKY_MAX_OFFSET;
    const cells = new Map();
    const count = Math.min(2100, Math.round(width * height / 3500) * 5);
    // Reserve room for motion so the minimum spacing also holds during interaction.
    for (let attempt = 0; attempt < count * 35 && stars.length < count; attempt++) {
      const x = random() * width, y = random() * height;
      const col = Math.floor(x / spacing), row = Math.floor(y / spacing);
      let crowded = false;
      for (let dx = -1; dx <= 1 && !crowded; dx++) {
        for (let dy = -1; dy <= 1 && !crowded; dy++) {
          crowded = (cells.get(`${col + dx},${row + dy}`) || []).some(star =>
            (star.x - x) ** 2 + (star.y - y) ** 2 < spacing ** 2);
        }
      }
      if (crowded) continue;
      const star = { x, y, r: .95 + random() * .5, phase: random() * Math.PI * 2, dx: 0, dy: 0 };
      stars.push(star);
      const key = `${col},${row}`;
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key).push(star);
    }
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const nearby = [];
    const pointerOutside = pointer.x < bounds.left || pointer.x > bounds.right;
    for (const star of stars) {
      const speed = .35 + star.phase * .06;
      const x = star.x + Math.sin(time * speed + star.phase) * 4
        + Math.sin(time * .83 + star.phase * 2) * 1.2;
      const y = star.y + Math.cos(time * speed * .73 + star.phase) * 4
        + Math.cos(time * .67 + star.phase * 3) * 1.2;
      const vx = x - pointer.x, vy = y - pointer.y;
      const distance = Math.hypot(vx, vy);
      const force = reduced.matches ? 0 : Math.max(0, 1 - distance / 85) ** 2 * 16;
      star.dx += (vx / (distance || 1) * force - star.dx) * .08;
      star.dy += (vy / (distance || 1) * force - star.dy) * .08;
      const offsetX = x + star.dx - star.x, offsetY = y + star.dy - star.y;
      const scale = Math.min(1, READING_SKY_MAX_OFFSET / (Math.hypot(offsetX, offsetY) || 1));
      const drawX = star.x + offsetX * scale, drawY = star.y + offsetY * scale;
      // Fade stars beneath the article rather than putting detail behind text.
      const edge = Math.max(bounds.left - x, x - bounds.right);
      const visibility = Math.max(0, Math.min(1, (edge + 20) / 90));
      if (visibility === 0) continue;
      context.globalAlpha = visibility * (.36 + .12 * Math.sin(time * .5 + star.phase));
      context.fillStyle = dark ? "#bad7ed" : "#52748e";
      context.beginPath();
      context.arc(drawX, drawY, star.r, 0, Math.PI * 2);
      context.fill();
      if (star.phase > 5.8) {
        context.globalAlpha *= .16;
        context.beginPath();
        context.arc(drawX, drawY, star.r * 3, 0, Math.PI * 2);
        context.fill();
      }
      if (!reduced.matches && pointerOutside && visibility > .2 && distance < 150) {
        nearby.push({ x: drawX, y: drawY, distance, visibility });
      }
    }
    // Limit the constellation to the closest stars, outside the reading surface.
    nearby.sort((a, b) => a.distance - b.distance);
    const connected = nearby.slice(0, READING_SKY_MAX_CONNECTIONS);
    context.strokeStyle = dark ? "#b4d9ef" : "#456e8d";
    context.lineWidth = .7;
    if (connected.length >= 3) {
      const centerX = connected.reduce((sum, star) => sum + star.x, 0) / connected.length;
      const centerY = connected.reduce((sum, star) => sum + star.y, 0) / connected.length;
      const polygon = [...connected].sort((a, b) =>
        Math.atan2(a.y - centerY, a.x - centerX) - Math.atan2(b.y - centerY, b.x - centerX));
      const strength = Math.min(...connected.map(star => (1 - star.distance / 150) * star.visibility));
      context.beginPath();
      polygon.forEach((star, index) => {
        if (index === 0) context.moveTo(star.x, star.y);
        else context.lineTo(star.x, star.y);
      });
      context.closePath();
      context.fillStyle = context.strokeStyle;
      context.globalAlpha = strength * .1;
      context.fill();
      context.globalAlpha = strength * .55;
      context.stroke();
    }
    for (const star of connected) {
      context.globalAlpha = (1 - star.distance / 150) * star.visibility * .5;
      context.beginPath();
      context.moveTo(pointer.x, pointer.y);
      context.lineTo(star.x, star.y);
      context.stroke();
    }
  };
  const tick = now => {
    if (now - previous >= 32) {
      time += previous ? Math.min((now - previous) / 1000, .1) : 0;
      previous = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    previous = 0;
    dark = document.body.dataset.mdColorScheme === "slate";
    if (reduced.matches) stars.forEach(star => { star.dx = 0; star.dy = 0; });
    draw();
    if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const changed = width !== canvas.clientWidth || height !== canvas.clientHeight;
    width = canvas.clientWidth; height = canvas.clientHeight;
    if (changed) scatter();
    bounds = note.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  };
  document.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse") return;
    pointer.x = event.clientX; pointer.y = event.clientY;
  }, { passive: true, signal: events.signal });
  document.documentElement.addEventListener("pointerleave", () => {
    pointer.x = pointer.y = -1000;
  }, { signal: events.signal });
  document.addEventListener("visibilitychange", sync, { signal: events.signal });
  reduced.addEventListener("change", sync, { signal: events.signal });
  const observer = new ResizeObserver(resize);
  observer.observe(canvas); observer.observe(note);
  const palette = new MutationObserver(sync);
  palette.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
  resize(); sync();
  disposeReadingSky = () => {
    cancelAnimationFrame(frame);
    events.abort(); observer.disconnect(); palette.disconnect(); canvas.remove();
  };
});
