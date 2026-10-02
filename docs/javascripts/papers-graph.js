let disposePapersGraph = () => {};

function createPaperSky() {
  const canvas = document.createElement("canvas");
  canvas.className = "papers-sky";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  if (!context) return () => canvas.remove();
  const events = new AbortController();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let seed = 47;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const stars = Array.from({ length: 480 }, () => ({ x: random(), y: random(), r: .35 + random() ** 3 * 1.25, phase: random() * 6.28 }));
  // Cache the distant dust and clouds; only foreground stars animate each frame.
  const nebula = document.createElement("canvas");
  const dust = Array.from({ length: 1400 }, () => {
    const x = random();
    return { x, y: .86 - x * .65 + Math.sin(x * 7) * .08 + (random() + random() - 1) * .22, r: .2 + random() * .65, alpha: .08 + random() * .2 };
  });
  let width, height, frame, previous = 0, time = 0;
  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.globalAlpha = .88 + Math.sin(time * .12) * .06;
    context.drawImage(nebula, 0, 0, width, height);
    stars.slice(0, Math.min(stars.length, Math.round(width * height / 2600))).forEach((star, index) => {
      const x = star.x * width + Math.sin(time * .08 + star.phase) * 3;
      const y = star.y * height + Math.cos(time * .06 + star.phase) * 3;
      const center = Math.exp(-((star.x - .58) ** 2 + (star.y - .5) ** 2) * 12);
      context.globalAlpha = (.38 + .16 * Math.sin(time * .4 + star.phase)) * (1 - center * .5);
      context.fillStyle = star.phase > 5 ? "#e1c392" : "#a9c9ef";
      context.beginPath();
      context.arc(x, y, star.r, 0, Math.PI * 2);
      context.fill();
      if (index % 37 === 0) {
        const glow = context.createRadialGradient(x, y, 0, x, y, 7);
        glow.addColorStop(0, "#bfdcff99");
        glow.addColorStop(1, "#bfdcff00");
        context.fillStyle = glow;
        context.fillRect(x - 7, y - 7, 14, 14);
        context.strokeStyle = "#bfdcff66";
        context.lineWidth = .5;
        context.beginPath();
        context.moveTo(x - 4, y); context.lineTo(x + 4, y);
        context.moveTo(x, y - 4); context.lineTo(x, y + 4);
        context.stroke();
      }
    });
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
    draw();
    if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    nebula.width = Math.round(width);
    nebula.height = Math.round(height);
    const layer = nebula.getContext("2d");
    for (let i = 0; i < 18; i++) {
      const x = i / 17;
      const y = .86 - x * .65 + Math.sin(x * 7) * .08;
      layer.save();
      layer.translate(x * width, y * height);
      layer.scale(width * .19, height * .13);
      const cloud = layer.createRadialGradient(0, 0, 0, 0, 0, 1);
      cloud.addColorStop(0, i < 7 ? "#66578216" : "#497ea51b");
      cloud.addColorStop(.45, "#36597c0d");
      cloud.addColorStop(1, "#36597c00");
      layer.fillStyle = cloud;
      layer.fillRect(-1, -1, 2, 2);
      layer.restore();
    }
    dust.slice(0, Math.min(dust.length, Math.round(width * height / 900))).forEach(star => {
      layer.globalAlpha = star.alpha;
      layer.fillStyle = "#9bbbd9";
      layer.beginPath();
      layer.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      layer.fill();
    });
    draw();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  document.addEventListener("visibilitychange", sync, { signal: events.signal });
  reduced.addEventListener("change", sync, { signal: events.signal });
  resize(); sync();
  return () => { cancelAnimationFrame(frame); observer.disconnect(); events.abort(); canvas.remove(); };
}

document$.subscribe(async () => {
  disposePapersGraph();
  disposePapersGraph = () => {};

  const el = document.getElementById("papers-graph");
  if (!el) return;

  const abortController = new AbortController();
  const disposeSky = createPaperSky();
  let disposed = false;
  let simulation;
  let resizeObserver;
  let handleResize;
  let handlePageHide;
  let initialFrame;

  disposePapersGraph = () => {
    if (disposed) return;
    disposed = true;
    abortController.abort();
    disposeSky();
    simulation?.stop();
    resizeObserver?.disconnect();
    cancelAnimationFrame(initialFrame);
    if (handleResize) window.removeEventListener("resize", handleResize);
    if (handlePageHide) window.removeEventListener("pagehide", handlePageHide);
  };
  handlePageHide = disposePapersGraph;
  window.addEventListener("pagehide", handlePageHide, { once: true });

  const MIN_WIDTH = 240;
  const MIN_HEIGHT = 280;
  const DIM_OPACITY = 0.1;
  const INITIAL_ALPHA = 1;
  const INITIAL_CLUSTER_RADIUS = 28;
  const RADIUS_MIN = 8;
  const RADIUS_STEP = 2;
  const DEGREE_STEP = 5;
  const COLOR = {
    default: "#bdd8f3",
    active: "var(--md-accent-fg-color)",
    bg: "var(--md-default-bg-color)",
    text: "var(--md-default-fg-color)",
    link: "#526d8b",
  };
  const state = { active: null, hovered: null, dragged: null };
  const widthOf = () => Math.max(
    Math.round(el.getBoundingClientRect().width || el.parentElement?.getBoundingClientRect().width || window.innerWidth || MIN_WIDTH),
    MIN_WIDTH,
  );
  const heightOf = () => Math.max(Math.round(el.getBoundingClientRect().height), MIN_HEIGHT);
  const showFallback = message => {
    el.textContent = message;
    el.style.display = "grid";
    el.style.placeItems = "center";
    el.style.color = COLOR.default;
  };
  const seedNodes = (nodes, width, height) => {
    const centerX = width / 2;
    const clusterRadius = Math.min(Math.min(width, height) * 0.08, INITIAL_CLUSTER_RADIUS);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    nodes.forEach((node, index) => {
      const angle = index * goldenAngle;
      const radius = Math.sqrt((index + 0.5) / Math.max(nodes.length, 1)) * clusterRadius;
      node.x = centerX + Math.cos(angle) * radius;
      node.y = height / 2 + Math.sin(angle) * radius;
      node.vx = 0;
      node.vy = 0;
    });
  };

  try {
    const response = await fetch("assets/graph.json", { signal: abortController.signal });
    if (!response.ok) throw new Error("Failed to load graph data");
    const raw = await response.json();
    if (disposed) return;

    const nodes = (raw.nodes || []).map(node => ({ ...node }));
    const links = (raw.links || []).map(link => ({ ...link }));
    if (!nodes.length) return showFallback("No papers graph data available.");
    const relatedById = new Map(nodes.map(node => [node.id, new Set([node.id, ...(node.neighbors || [])])]));
    const radiusOf = degree => RADIUS_MIN + Math.floor(degree / DEGREE_STEP) * RADIUS_STEP;
    nodes.forEach(node => { node.radius = radiusOf(node.degree || 0); });
    let width = widthOf();
    let height = heightOf();
    seedNodes(nodes, width, height);
    const svg = d3.select(el).append("svg").attr("width", "100%").attr("height", "100%");
    const gradient = svg.append("defs").append("radialGradient").attr("id", "paper-star-glow");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#a5d0ff").attr("stop-opacity", .55);
    gradient.append("stop").attr("offset", "40%").attr("stop-color", "#82b8f4").attr("stop-opacity", .14);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#82b8f4").attr("stop-opacity", 0);
    const link = svg.append("g").selectAll("line").data(links).join("line")
      .attr("class", "paper-link").attr("stroke", COLOR.link).attr("stroke-opacity", .55);
    const nodeGroup = svg.append("g").selectAll("g").data(nodes).join("g").attr("class", "paper-node")
      .attr("tabindex", 0).attr("role", "link").attr("aria-label", d => `阅读 ${d.label}`).style("cursor", "pointer");
    nodeGroup.append("circle").attr("class", "paper-halo").attr("r", d => d.radius * 3.5).attr("fill", "url(#paper-star-glow)");
    nodeGroup.append("circle").attr("r", d => d.radius).attr("fill", COLOR.bg);
    const circle = nodeGroup.append("circle").attr("class", "paper-core").attr("r", d => d.radius).attr("fill", COLOR.default);
    const label = nodeGroup.append("text").attr("class", "paper-label").text(d => d.label)
      .attr("x", 0).attr("y", d => d.radius + 20).attr("text-anchor", "middle")
      .attr("font-size", "16px").attr("fill", COLOR.text).style("pointer-events", "none");
    function layoutLabels() {
      label.each(function(d) {
        const text = d3.select(this).text(null);
        let span = text.append("tspan").attr("x", 0);
        let line = "";
        for (const word of d.label.split("-")) {
          const next = line ? `${line}-${word}` : word;
          span.text(next);
          if (line && span.node().getComputedTextLength() > Math.min(240, width * .45)) {
            span.text(line);
            span = text.append("tspan").attr("x", 0).attr("dy", "1.2em").text(word);
            line = word;
          } else {
            line = next;
          }
        }
        const bounds = this.getBBox();
        d.labelWidth = bounds.width;
        d.labelHeight = bounds.height;
        d.labelBottom = bounds.y + bounds.height;
      });
    }
    layoutLabels();
    const labelX = node => Math.max(node.labelWidth / 2 + 6, Math.min(width - node.labelWidth / 2 - 6, node.x));
    function separateLabels() {
      const boundsOf = node => {
        const x = Math.max(node.radius + 12, Math.min(width - node.radius - 12, node.x + node.vx));
        const y = Math.max(node.radius + 12, Math.min(height - node.radius - 32 - node.labelHeight, node.y + node.vy));
        const textX = Math.max(node.labelWidth / 2 + 6, Math.min(width - node.labelWidth / 2 - 6, x));
        return {
          left: Math.min(x - node.radius, textX - node.labelWidth / 2),
          right: Math.max(x + node.radius, textX + node.labelWidth / 2),
          top: y - node.radius,
          bottom: y + node.labelBottom,
        };
      };
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const boxA = boundsOf(a), boxB = boundsOf(b);
          const dx = (boxB.left + boxB.right - boxA.left - boxA.right) / 2;
          const dy = (boxB.top + boxB.bottom - boxA.top - boxA.bottom) / 2;
          const overlapX = (boxA.right - boxA.left + boxB.right - boxB.left) / 2 + 8 - Math.abs(dx);
          const overlapY = (boxA.bottom - boxA.top + boxB.bottom - boxB.top) / 2 + 6 - Math.abs(dy);
          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const push = Math.sign(dx || 1) * overlapX / 2;
              a.vx -= push;
              b.vx += push;
            } else {
              const push = Math.sign(dy || 1) * overlapY / 2;
              a.vy -= push;
              b.vy += push;
            }
          }
        }
      }
    }
    function tick() {
      // Keep the star cores and their labels inside the visible constellation.
      nodes.forEach(node => {
        node.x = Math.max(node.radius + 12, Math.min(width - node.radius - 12, node.x));
        node.y = Math.max(node.radius + 12, Math.min(height - node.radius - 32 - node.labelHeight, node.y));
      });
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
      label.attr("transform", d => `translate(${labelX(d) - d.x},0)`);
    }
    const forceX = d3.forceX(width / 2).strength(0.03);
    const forceY = d3.forceY(height / 2).strength(0.03);
    const forceCenter = d3.forceCenter(width / 2, height / 2);
    const forceLink = d3.forceLink(links).id(d => d.id).distance(Math.min(200, width * .45, height * .4)).strength(0.8);
    simulation = d3.forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", d3.forceManyBody().strength(-220))
      .force("collide", d3.forceCollide(d => d.radius + 40))
      .force("center", forceCenter)
      .force("x", forceX)
      .force("y", forceY)
      .force("labels", separateLabels)
      .on("tick", tick);
    const paint = activeId => {
      if (state.active === activeId) return;
      state.active = activeId;
      const related = activeId ? relatedById.get(activeId) : null;
      circle.attr("fill", node => node.id === activeId ? COLOR.active : COLOR.default);
      label.attr("fill", node => node.id === activeId ? COLOR.active : COLOR.text);
      nodeGroup.style("opacity", node => !related || related.has(node.id) ? 1 : DIM_OPACITY);
      link
        .style("opacity", edge => !related || edge.source.id === activeId || edge.target.id === activeId ? 1 : DIM_OPACITY)
        .attr("stroke-opacity", edge => activeId && (edge.source.id === activeId || edge.target.id === activeId) ? .9 : .55)
        .attr("stroke", edge => activeId && (edge.source.id === activeId || edge.target.id === activeId) ? COLOR.active : COLOR.link);
    };
    const syncActive = () => paint(state.dragged || state.hovered);
    const drag = d3.drag().clickDistance(4)
      .on("start", (event, node) => {
        state.dragged = node.id;
        syncActive();
        if (!event.active) simulation.alphaTarget(0.3).restart();
        node.fx = node.x;
        node.fy = node.y;
      })
      .on("drag", (event, node) => {
        node.fx = event.x;
        node.fy = event.y;
      })
      .on("end", (event, node) => {
        if (!event.active) simulation.alphaTarget(0);
        node.fx = null;
        node.fy = null;
        state.dragged = null;
        syncActive();
      });
    nodeGroup
      .on("focus", (_, node) => { state.hovered = node.id; syncActive(); })
      .on("blur", () => { state.hovered = null; syncActive(); })
      .on("keydown", (event, node) => {
        if (event.key === "Enter") window.location.href = node.id.replace(/\.md$/, "/");
      })
      .on("mouseenter", (_, node) => {
        state.hovered = node.id;
        syncActive();
      })
      .on("mouseleave", (_, node) => {
        if (state.hovered === node.id) state.hovered = null;
        syncActive();
      })
      .on("click", (_, node) => { window.location.href = node.id.replace(/\.md$/, "/"); })
      .call(drag);
    const resize = (alpha = 0.2, reseed = false) => {
      const nextWidth = widthOf();
      const nextHeight = heightOf();
      if (!reseed && nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      layoutLabels();
      forceLink.distance(Math.min(200, width * .45, height * .4));
      if (reseed) seedNodes(nodes, width, height);
      svg.attr("viewBox", [0, 0, width, height]);
      forceX.x(width / 2);
      forceY.y(height / 2);
      forceCenter.x(width / 2).y(height / 2);
      simulation.alpha(alpha).restart();
    };
    handleResize = () => resize();
    tick();
    initialFrame = requestAnimationFrame(() => {
      if (disposed) return;
      resize(INITIAL_ALPHA, true);
      tick();
    });
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(el);
    } else {
      window.addEventListener("resize", handleResize);
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    console.error(error);
    showFallback("Failed to load the papers graph.");
  }
});
