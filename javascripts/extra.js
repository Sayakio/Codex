let footerOffsetFrame = null;

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

window.addEventListener("scroll", scheduleFooterOffsetUpdate, { passive: true });
window.addEventListener("resize", scheduleFooterOffsetUpdate);

document$.subscribe(() => {
    setFooterOffset(0);

    if (footerOffsetFrame !== null) cancelAnimationFrame(footerOffsetFrame);
    footerOffsetFrame = requestAnimationFrame(() => {
        footerOffsetFrame = requestAnimationFrame(() => {
            footerOffsetFrame = null;
            resetLegacyPlayerPosition();
            updateFooterOffset();
        });
    });
});
