---
icon: material/script-text-outline
---

# 论文 • 洞见

<div id="papers-graph" style="width:100%;height:500px;border-radius:8px;overflow:hidden;"></div>

<script src="https://fastly.jsdelivr.net/npm/d3@7"></script>
<script>
(function () {
  const el = document.getElementById("papers-graph");
  const COLOR_DEFAULT = "var(--md-default-fg-color--light)";
  const COLOR_HOVER = "var(--md-accent-fg-color)";
  const COLOR_BG = "var(--md-default-bg-color)";
  const DIM_OPACITY = 0.1;
  const RADIUS_MIN = 2;
  const RADIUS_MAX = 8;
  fetch("assets/graph.json").then(r => r.json()).then(raw => {
    const excluded = new Set(raw.nodes.filter(n => n.id.split("/").pop() === "index.md").map(n => n.id));
    const nodes = raw.nodes.filter(n => !excluded.has(n.id));
    const links = raw.links.filter(l => !excluded.has(l.source) && !excluded.has(l.target));
    const degree = new Map(nodes.map(n => [n.id, 0]));
    links.forEach(l => { degree.set(l.source, degree.get(l.source) + 1); degree.set(l.target, degree.get(l.target) + 1); });
    const radiusScale = d3.scaleSqrt().domain([0, d3.max(nodes, n => degree.get(n.id)) || 1]).range([RADIUS_MIN, RADIUS_MAX]);
    nodes.forEach(n => { n.radius = radiusScale(degree.get(n.id)); });
    const neighborMap = new Map(nodes.map(n => [n.id, new Set([n.id])]));
    links.forEach(l => { neighborMap.get(l.source).add(l.target); neighborMap.get(l.target).add(l.source); });
    const width = el.clientWidth, height = 500;
    const svg = d3.select(el).append("svg").attr("viewBox", [0, 0, width, height]).attr("width", "100%").attr("height", "100%");
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(70).strength(0.6))
      .force("charge", d3.forceManyBody().strength(-220))
      .force("collide", d3.forceCollide(d => d.radius + 14))
      .force("x", d3.forceX(width / 2).strength(0.03))
      .force("y", d3.forceY(height / 2).strength(0.03))
      .on("tick", ticked);
    const link = svg.append("g").selectAll("line").data(links).join("line").attr("stroke", COLOR_DEFAULT);
    const nodeGroup = svg.append("g").selectAll("g").data(nodes).join("g")
      .style("cursor", "pointer")
      .on("mouseover", (e, d) => setActive(d.id))
      .on("mouseout", () => setActive(null))
      .on("click", (e, d) => { window.location.href = d.id.replace(/\.md$/, "/"); })
      .call(d3.drag().clickDistance(4)
        .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));
    nodeGroup.append("circle").attr("r", d => d.radius).attr("fill", COLOR_BG);
    const circle = nodeGroup.append("circle").attr("r", d => d.radius).attr("fill", COLOR_DEFAULT);
    nodeGroup.append("text").text(d => d.label)
      .attr("x", 0).attr("y", d => d.radius + 14).attr("text-anchor", "middle")
      .attr("font-size", "13px").attr("fill", "var(--md-default-fg-color)").style("pointer-events", "none");
    function setActive(activeId) {
      const related = activeId ? neighborMap.get(activeId) : null;
      circle.attr("fill", n => n.id === activeId ? COLOR_HOVER : COLOR_DEFAULT);
      nodeGroup.transition().duration(120).style("opacity", n => !related || related.has(n.id) ? 1 : DIM_OPACITY);
      link.transition().duration(120)
        .style("opacity", l => !related || l.source.id === activeId || l.target.id === activeId ? 1 : DIM_OPACITY)
        .attr("stroke", l => activeId && (l.source.id === activeId || l.target.id === activeId) ? COLOR_HOVER : COLOR_DEFAULT);
    }
    function ticked() {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    }
  });
})();
</script>