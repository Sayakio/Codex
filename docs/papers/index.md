# 论文笔记

<div id="papers-graph" style="width:100%;height:500px;border-radius:8px;overflow:hidden;"></div>

<script src="https://fastly.jsdelivr.net/npm/d3@7"></script>
<script>
(function () {
  const el = document.getElementById("papers-graph");
  const COLOR_DEFAULT = "var(--md-default-fg-color--light)";
  const COLOR_HOVER = "var(--md-accent-fg-color)";
  const DIM_OPACITY = 0.2;
  fetch("assets/graph.json")
    .then(r => r.json())
    .then(data => {
      const width = el.clientWidth, height = 500;
      const neighborMap = new Map();
      data.nodes.forEach(n => neighborMap.set(n.id, new Set([n.id])));
      data.links.forEach(l => {
        neighborMap.get(l.source).add(l.target);
        neighborMap.get(l.target).add(l.source);
      });
      const svg = d3.select(el).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%").attr("height", "100%");
      const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(70))
        .force("charge", d3.forceManyBody().strength(-180))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
      const link = svg.append("g")
        .attr("stroke", "var(--md-default-fg-color--lighter)")
        .selectAll("line").data(data.links).join("line");
      const nodeGroup = svg.append("g")
        .selectAll("g").data(data.nodes).join("g")
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => highlight(d))
        .on("mouseout", reset)
        .on("click", (event, d) => {
          window.location.href = d.id.replace(/\.md$/, "/");
        })
        .call(drag(simulation));
      const circle = nodeGroup.append("circle")
        .attr("r", 10)
        .attr("fill", COLOR_DEFAULT);
      nodeGroup.append("text")
        .text(d => d.label)
        .attr("x", 10)
        .attr("y", 4)
        .attr("font-size", "16px")
        .attr("fill", "var(--md-default-fg-color)")
        .style("pointer-events", "none");
      function highlight(d) {
        const related = neighborMap.get(d.id);
        circle.attr("fill", n => n.id === d.id ? COLOR_HOVER : COLOR_DEFAULT);
        nodeGroup.transition().duration(120)
          .style("opacity", n => related.has(n.id) ? 1 : DIM_OPACITY);
        link.transition().duration(120)
          .style("opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 1 : DIM_OPACITY);
      }
      function reset() {
        circle.attr("fill", COLOR_DEFAULT);
        nodeGroup.transition().duration(120).style("opacity", 1);
        link.transition().duration(120).style("opacity", 1);
      }
      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
          d3.select(this).style("cursor", "pointer");
        }
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
          d3.select(this).style("cursor", "pointer");
        }
        return d3.drag()
          .clickDistance(4)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }
      function ticked() {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
      }
    });
})();
</script>