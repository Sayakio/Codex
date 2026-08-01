let footerOffsetFrame = null;
let homeRevealObserver = null;

function setFooterOffset(offset) {
    document.documentElement.style.setProperty("--music-footer-offset", `${offset}px`);
}

function resetLegacyPlayerPosition() {
    const musicToggle = document.getElementById("music-player-toggle");
    const musicContainer = document.getElementById("music-player-container");

    for (const element of [musicToggle, musicContainer]) {
        if (!element) continue;
        for (const property of ["left", "right", "bottom", "display"]) {
            element.style.removeProperty(property);
        }
    }

    musicContainer?.classList.remove("music-player-left");
}

function updateFooterOffset() {
    const footer = document.querySelector(".md-footer") || document.querySelector("footer");

    if (!footer) {
        setFooterOffset(0);
        return;
    }

    const footerRect = footer.getBoundingClientRect();
    const visibleFooterHeight = Math.max(
        0,
        Math.min(footerRect.bottom, window.innerHeight) - Math.max(footerRect.top, 0),
    );

    setFooterOffset(visibleFooterHeight);
}

function scheduleFooterOffsetUpdate() {
    if (footerOffsetFrame !== null) return;

    footerOffsetFrame = requestAnimationFrame(() => {
        footerOffsetFrame = null;
        updateFooterOffset();
    });
}

function setupLineArt(home) {
    const field = home?.querySelector("[data-line-art]");
    if (!field) return;

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    const baseLayer = document.createElementNS(svgNamespace, "g");
    const pulseLayer = document.createElementNS(svgNamespace, "g");

    svg.classList.add("codex-home__circuit");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const appendPath = (definition, rotation = 0, isCore = false) => {
        const transform = `rotate(${rotation} 50 50)`;
        const base = document.createElementNS(svgNamespace, "path");
        base.classList.add("codex-home__circuit-path");
        if (isCore) base.classList.add("is-core");
        base.setAttribute("d", definition);
        base.setAttribute("transform", transform);

        const pulse = base.cloneNode();
        pulse.classList.add("codex-home__circuit-pulse");
        pulse.setAttribute("pathLength", "100");
        pulse.style.setProperty("--pulse-delay", isCore ? "0s" : "0.08s");

        baseLayer.append(base);
        pulseLayer.append(pulse);
    };

    const arm = "M 50 43 L 50 36 L 44 30 L 44 23 L 50 17 L 50 12";
    [0, 90, 180, 270].forEach(rotation => appendPath(arm, rotation));
    appendPath("M 50 43 L 57 50 L 50 57 L 43 50 Z", 0, true);

    svg.append(baseLayer, pulseLayer);
    field.replaceChildren(svg);
}

function setupHomePage() {
    const home = document.querySelector(".codex-home");
    const isHome = Boolean(home);

    document.body.classList.toggle("is-codex-home", isHome);
    document.body.classList.remove("is-home-motion-ready");
    homeRevealObserver?.disconnect();
    homeRevealObserver = null;

    if (!home) return;

    setupLineArt(home);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = home.querySelectorAll(".home-reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(item => item.classList.add("is-visible"));
        return;
    }

    document.body.classList.add("is-home-motion-ready");
    homeRevealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            homeRevealObserver?.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });

    revealItems.forEach(item => homeRevealObserver.observe(item));
}

function setupLatestContent(home) {
    if (!home) return;

    const updateFeaturedNote = note => {
        const container = home.querySelector("[data-featured-note]");
        if (!container) return;

        container.replaceChildren();
        container.classList.toggle("is-text-only", !note.image);

        const copy = document.createElement("div");
        copy.className = "codex-home__featured-copy";

        const eyebrow = document.createElement("p");
        eyebrow.className = "codex-home__eyebrow codex-home__eyebrow--dark";
        eyebrow.textContent = "Latest note";

        const heading = document.createElement("h2");
        heading.textContent = note.label || "Untitled note";

        const title = document.createElement("p");
        title.className = "codex-home__display-copy";
        title.textContent = note.title || note.label || "Untitled note";

        const link = document.createElement("a");
        link.className = "codex-home__text-link";
        link.href = note.url || "#";
        link.setAttribute("aria-label", "Read the note");
        link.title = "Read the note";

        const kaomoji = document.createElement("span");
        kaomoji.className = "codex-home__kaomoji";
        kaomoji.setAttribute("aria-hidden", "true");
        kaomoji.textContent = "(•̀ᴗ-)✧";

        const linkArrow = document.createElement("span");
        linkArrow.className = "codex-home__arrow";
        linkArrow.setAttribute("aria-hidden", "true");
        linkArrow.textContent = "→";
        link.append(kaomoji, linkArrow);

        copy.append(eyebrow, heading, title, link);
        container.append(copy);

        if (note.image) {
            const visual = document.createElement("a");
            visual.className = "codex-home__featured-visual";
            visual.href = note.url || "#";
            visual.setAttribute("aria-label", "Read featured note");
            visual.title = "Read featured note";

            const image = document.createElement("img");
            image.src = new URL(note.image, document.baseURI).href;
            image.alt = `${note.label || note.title || "Latest"} note visual`;
            visual.append(image);
            container.append(visual);
        }
    };

    const updateLatestEntries = entries => {
        const container = home.querySelector("[data-latest-entries]");
        if (!container) return;

        container.replaceChildren();
        entries.slice(0, 3).forEach(entry => {
            const row = document.createElement("a");
            row.className = "codex-home__entry";
            row.href = entry.url || "#";

            const date = document.createElement("time");
            date.dateTime = entry.date || "";
            date.textContent = entry.date ? entry.date.slice(5).replace("-", ".") : "--.--";

            const type = document.createElement("span");
            type.className = "codex-home__entry-type";
            type.textContent = entry.kind || "Note";

            const title = document.createElement("span");
            title.className = "codex-home__entry-title";
            title.textContent = entry.title || entry.label || "Untitled note";

            const arrow = document.createElement("span");
            arrow.className = "codex-home__entry-arrow";
            arrow.setAttribute("aria-hidden", "true");
            arrow.textContent = "→";

            row.append(date, type, title, arrow);
            container.append(row);
        });
    };

    fetch(new URL("assets/latest-note.json", document.baseURI))
        .then(response => {
            if (!response.ok) throw new Error("Latest note metadata is unavailable.");
            return response.json();
        })
        .then(note => {
            if (!document.body.contains(home)) return;
            updateFeaturedNote(note);
            updateLatestEntries(note.entries || [note]);
        })
        .catch(() => {});
}

window.addEventListener("scroll", scheduleFooterOffsetUpdate, { passive: true });
window.addEventListener("resize", scheduleFooterOffsetUpdate);

document$.subscribe(() => {
    setFooterOffset(0);
    setupHomePage();
    setupLatestContent(document.querySelector(".codex-home"));

    if (footerOffsetFrame !== null) cancelAnimationFrame(footerOffsetFrame);
    footerOffsetFrame = requestAnimationFrame(() => {
        footerOffsetFrame = requestAnimationFrame(() => {
            footerOffsetFrame = null;
            resetLegacyPlayerPosition();
            updateFooterOffset();
        });
    });
});
