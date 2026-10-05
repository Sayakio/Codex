(() => {
  const namespace = "http://www.w3.org/2000/svg";
  let diagramId = 0;

  function element(tag, attributes = {}, text = "") {
    const node = document.createElementNS(namespace, tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
    node.textContent = text;
    return node;
  }

  const offset = (point, vector, scale) => point.map((value, index) => value + vector[index] * scale);
  const difference = (a, b) => a.map((value, index) => value - b[index]);
  const line = (a, b) => `M ${a} L ${b}`;

  function label(prefix, index) {
    const text = element("text", { class: "cagd-label", "aria-hidden": "true" }, prefix);
    text.append(element("tspan", { "baseline-shift": "sub", "font-size": "65%" }, index));
    return text;
  }

  function createDiagram(root) {
    const type = root.dataset.curve;
    const initialPoints = type === "hermite"
      ? [[150, 320], [430, 130], [610, 320]]
      : type === "catmull-rom"
        ? [[65, 270], [185, 390], [300, 150], [430, 75], [545, 270], [660, 150], [750, 210]]
        : [[120, 370], [250, 80], [500, 80], [650, 370]];
    const initialTangents = [[260, -300], [0, 290], [250, 0]];
    let points, tangents;
    const svg = element("svg", {
      viewBox: "0 0 800 460", class: "cagd-svg", role: "group",
      "aria-label": `${root.dataset.title} 交互图`,
    });
    svg.append(element("desc", {}, "拖动实心点改变曲线。Hermite 箭头端部也可拖动。聚焦后使用方向键移动，Shift 加速。"));
    const markerId = `cagd-arrow-${++diagramId}`;
    const marker = element("marker", {
      id: markerId, viewBox: "0 0 10 10", refX: 9, refY: 5,
      markerWidth: 9, markerHeight: 9, orient: "auto-start-reverse", markerUnits: "userSpaceOnUse",
    });
    marker.append(element("path", { d: "M 0 1 L 10 5 L 0 9 Z", class: "cagd-arrowhead" }));
    const defs = element("defs");
    defs.append(marker);
    svg.append(defs);
    const guides = element("path", { class: `cagd-guide${type === "bezier" ? " cagd-polygon" : ""}` });
    svg.append(guides);
    const segmentCount = type === "hermite" ? 2 : type === "bezier" ? 1 : initialPoints.length - 3;
    const paths = Array.from({ length: segmentCount }, () => {
      const path = element("path", { class: "cagd-curve" });
      svg.append(path);
      return path;
    });

    const reset = document.createElement("button");
    reset.className = "cagd-reset";
    reset.type = "button";
    reset.textContent = "Reset";
    const tooltip = document.createElement("div");
    tooltip.className = "cagd-tooltip";
    tooltip.id = `cagd-hint-${diagramId}`;
    tooltip.setAttribute("role", "tooltip");
    tooltip.hidden = true;
    root.append(svg, reset, tooltip);

    function tangent(index) {
      return type === "hermite" ? tangents[index] : difference(points[index + 1], points[index - 1]).map(value => value / 2);
    }

    function segment(index) {
      if (type === "bezier") return points;
      const start = type === "hermite" ? index : index + 1;
      return [points[start], offset(points[start], tangent(start), 1 / 3),
        offset(points[start + 1], tangent(start + 1), -1 / 3), points[start + 1]];
    }

    const handles = type === "hermite"
      ? [{ index: 0, sign: -1 }, { index: 1, sign: -1 }, { index: 1, sign: 1 }, { index: 2, sign: 1 }]
      : [];
    const targets = initialPoints.map((_, index) => ({ index }));
    handles.forEach(handle => targets.push({ ...handle, tangent: true }));
    const nodes = targets.map(target => {
      const index = target.index + (type === "hermite" ? 1 : 0);
      const group = element("g", {
        class: `cagd-point${target.tangent ? " cagd-handle" : ""}`, tabindex: 0, role: "button",
        "aria-label": target.tangent ? `${target.sign < 0 ? "反向" : ""}切向量 T${index}` : `点 P${index}`,
        "aria-describedby": tooltip.id,
      });
      const hit = element("circle", { class: "cagd-hit", r: 24 });
      group.append(hit);
      if (!target.tangent) group.append(element("circle", { class: "cagd-dot", r: 7 }));
      const text = label(target.tangent ? `${target.sign < 0 ? "−" : ""}T` : "P", index);
      group.append(text);
      svg.append(group);
      let grabOffset;
      const position = () => target.tangent
        ? offset(points[target.index], tangents[target.index], target.sign * .34)
        : points[target.index];
      const showHint = () => {
        tooltip.textContent = text.textContent;
        tooltip.hidden = false;
        const bounds = root.getBoundingClientRect();
        const point = new DOMPoint(...position()).matrixTransform(svg.getScreenCTM());
        tooltip.style.left = `${Math.max(8, Math.min(bounds.width - tooltip.offsetWidth - 8, point.x - bounds.left + 12))}px`;
        const above = point.y - bounds.top - tooltip.offsetHeight - 12;
        const below = point.y - bounds.top + 12;
        const minimumTop = svg.getBoundingClientRect().top - bounds.top + 8;
        const labelBelow = Number(text.getAttribute("y")) > position()[1];
        tooltip.style.top = `${labelBelow && above >= minimumTop ? above : Math.min(bounds.height - tooltip.offsetHeight - 8, below)}px`;
      };
      const hideHint = () => { tooltip.hidden = true; };
      group.addEventListener("pointerenter", event => {
        if (event.pointerType !== "touch") showHint();
      });
      group.addEventListener("pointerleave", hideHint);
      group.addEventListener("focus", showHint);
      group.addEventListener("blur", hideHint);
      const move = next => {
        next = [Math.max(45, Math.min(755, next[0])), Math.max(35, Math.min(420, next[1]))];
        if (target.tangent) {
          tangents[target.index] = difference(next, points[target.index]).map(value => value / (target.sign * .34));
        } else points[target.index] = next;
        render();
      };
      const pointerPosition = event => new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse());
      group.addEventListener("pointerdown", event => {
        if (event.button !== 0) return;
        event.preventDefault();
        group.focus({ preventScroll: true });
        hideHint();
        const pointer = pointerPosition(event);
        grabOffset = difference(position(), [pointer.x, pointer.y]);
        group.setPointerCapture(event.pointerId);
      });
      group.addEventListener("pointermove", event => {
        if (!group.hasPointerCapture(event.pointerId)) return;
        const pointer = pointerPosition(event);
        move(offset([pointer.x, pointer.y], grabOffset, 1));
      });
      for (const eventName of ["pointerup", "pointercancel"]) {
        group.addEventListener(eventName, event => {
          if (group.hasPointerCapture(event.pointerId)) group.releasePointerCapture(event.pointerId);
        });
      }
      group.addEventListener("keydown", event => {
        const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
        if (!direction) return;
        event.preventDefault();
        move(offset(position(), direction, event.shiftKey ? 20 : 4));
        showHint();
      });
      return { group, text, position, target };
    });
    const arrows = handles.map(() => {
      const arrow = element("path", { class: "cagd-guide", "marker-end": `url(#${markerId})` });
      svg.insertBefore(arrow, nodes[0].group);
      return arrow;
    });

    function placeLabel(text, position) {
      text.setAttribute("x", Math.max(20, Math.min(780, position[0] > 680 ? position[0] - 18 : position[0] + 18)));
      text.setAttribute("y", Math.max(40, Math.min(430, position[1] - 18)));
      text.setAttribute("text-anchor", position[0] > 680 ? "end" : "start");
    }

    function render() {
      paths.forEach((path, index) => {
        const [a, b, c, d] = segment(index);
        path.setAttribute("d", `M ${a} C ${b} ${c} ${d}`);
      });
      if (type === "bezier") guides.setAttribute("d", `M ${points.join(" L ")}`);
      if (type === "catmull-rom") {
        guides.setAttribute("d", points.slice(1, -1).map((point, index) => {
          const vector = tangent(index + 1);
          const scale = 85 / (Math.hypot(...vector) || 1);
          return line(offset(point, vector, -scale), offset(point, vector, scale));
        }).join(" "));
      }
      nodes.forEach(({ group, text, position, target }) => {
        const point = position();
        group.querySelectorAll("circle").forEach(circle => {
          circle.setAttribute("cx", point[0]);
          circle.setAttribute("cy", point[1]);
        });
        placeLabel(text, point);
        if ((type === "hermite" && target.tangent && (target.index !== 1 || target.sign > 0))
          || (type === "bezier" && [0, 3].includes(target.index))
          || (type === "catmull-rom" && [1, 2, 3, 4, 6].includes(target.index))) {
          text.setAttribute("y", Math.min(430, point[1] + 40));
        }
        if ((type === "hermite" && !target.tangent && target.index === 0)
          || (type === "catmull-rom" && target.index === 3)) {
          text.setAttribute("x", Math.max(90, point[0] - 18));
          text.setAttribute("text-anchor", "end");
        }
      });
      arrows.forEach((arrow, index) => arrow.setAttribute("d", line(points[handles[index].index], nodes[initialPoints.length + index].position())));
    }

    function restore() {
      points = initialPoints.map(point => [...point]);
      tangents = initialTangents.map(vector => [...vector]);
      tooltip.hidden = true;
      render();
    }
    reset.addEventListener("click", restore);
    restore();
  }

  function initialize() {
    document.querySelectorAll("[data-curve]").forEach(root => {
      if (root.dataset.curveReady) return;
      createDiagram(root);
      root.dataset.curveReady = "true";
    });
  }

  document$.subscribe(initialize);
})();
