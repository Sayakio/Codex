let disposePapersGraph = () => {};

document$.subscribe(async () => {
  disposePapersGraph();
  disposePapersGraph = () => {};

  const el = document.getElementById("papers-graph");
  if (!el) return;

  const abortController = new AbortController();
  let disposed = false;
  let simulation;
  let resizeObserver;
  let handleResize;
  let handlePageHide;

  disposePapersGraph = () => {
    if (disposed) return;
    disposed = true;
    abortController.abort();
    simulation?.stop();
    resizeObserver?.disconnect();
    if (handleResize) window.removeEventListener("resize", handleResize);
    if (handlePageHide) window.removeEventListener("pagehide", handlePageHide);
  };
  handlePageHide = () => disposePapersGraph();
  window.addEventListener("pagehide", handlePageHide, { once: true });

  const HEIGHT = 500;
  const CENTER_Y = HEIGHT / 2;
  const MIN_WIDTH = 320;
  const DIM_OPACITY = 0.1;
  const INITIAL_ALPHA = 1;
  const INITIAL_CLUSTER_RADIUS = 28;
  const RADIUS_MIN = 8;
  const RADIUS_STEP = 2;
  const DEGREE_STEP = 5;
  const COLOR = {
    default: "var(--md-default-fg-color--light)",
    active: "var(--md-accent-fg-color)",
    bg: "var(--md-default-bg-color)",
    text: "var(--md-default-fg-color)",
  };
  const state = { active: null, hovered: null, dragged: null };
  const widthOf = () => Math.max(
    Math.round(el.getBoundingClientRect().width || el.parentElement?.getBoundingClientRect().width || window.innerWidth || MIN_WIDTH),
    MIN_WIDTH,
  );
  const showFallback = message => {
    el.textContent = message;
    el.style.display = "grid";
    el.style.placeItems = "center";
    el.style.color = COLOR.default;
  };
  const seedNodes = (nodes, width) => {
    const centerX = width / 2;
    const clusterRadius = Math.min(Math.min(width, HEIGHT) * 0.08, INITIAL_CLUSTER_RADIUS);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    nodes.forEach((node, index) => {
      const angle = index * goldenAngle;
      const radius = Math.sqrt((index + 0.5) / Math.max(nodes.length, 1)) * clusterRadius;
      node.x = centerX + Math.cos(angle) * radius;
      node.y = CENTER_Y + Math.sin(angle) * radius;
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
    seedNodes(nodes, widthOf());
    const svg = d3.select(el).append("svg").attr("width", "100%").attr("height", "100%");
    const link = svg.append("g").selectAll("line").data(links).join("line")
      .attr("stroke", COLOR.default);
    const nodeGroup = svg.append("g").selectAll("g").data(nodes).join("g").style("cursor", "pointer");
    nodeGroup.append("circle").attr("r", d => d.radius).attr("fill", COLOR.bg);
    const circle = nodeGroup.append("circle").attr("r", d => d.radius).attr("fill", COLOR.default);
    nodeGroup.append("text").text(d => d.label)
      .attr("x", 0).attr("y", d => d.radius + 20).attr("text-anchor", "middle")
      .attr("font-size", "16px").attr("fill", COLOR.text).style("pointer-events", "none");
    function tick() {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    }
    simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(200).strength(0.8))
      .force("charge", d3.forceManyBody().strength(-220))
      .force("collide", d3.forceCollide(d => d.radius + 40))
      .force("x", d3.forceX(widthOf() / 2).strength(0.03))
      .force("y", d3.forceY(CENTER_Y).strength(0.03))
      .on("tick", tick);
    const paint = activeId => {
      if (state.active === activeId) return;
      state.active = activeId;
      const related = activeId ? relatedById.get(activeId) : null;
      circle.attr("fill", node => node.id === activeId ? COLOR.active : COLOR.default);
      nodeGroup.interrupt().style("opacity", node => !related || related.has(node.id) ? 1 : DIM_OPACITY);
      link.interrupt()
        .style("opacity", edge => !related || edge.source.id === activeId || edge.target.id === activeId ? 1 : DIM_OPACITY)
        .attr("stroke", edge => activeId && (edge.source.id === activeId || edge.target.id === activeId) ? COLOR.active : COLOR.default);
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
      const width = widthOf();
      if (reseed) seedNodes(nodes, width);
      svg.attr("viewBox", [0, 0, width, HEIGHT]);
      simulation.force("x", d3.forceX(width / 2).strength(0.03));
      simulation.force("y", d3.forceY(CENTER_Y).strength(0.03));
      simulation.alpha(Number.isFinite(alpha) ? alpha : 0.2).restart();
    };
    handleResize = () => resize();
    tick();
    requestAnimationFrame(() => {
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
