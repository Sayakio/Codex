let footerOffsetFrame = null;
let renderedPagePath = window.location.pathname;
const replaceHistoryState = history.replaceState;

// Instant navigation changes the URL before replacing the outgoing document.
// Keep its anchor tracking and scroll updates out of the destination's history.
history.replaceState = function (...args) {
    if (window.location.pathname !== renderedPagePath) return;
    return replaceHistoryState.apply(this, args);
};

window.addEventListener("popstate", () => {
    document.documentElement.classList.toggle(
        "codex-history-loading",
        window.location.pathname !== renderedPagePath,
    );
}, { capture: true });

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

const homeNebulaModule = new URL("home-nebula.js", document.currentScript.src).href;
let disposeHomeNebula = null;
let homeSetupVersion = 0;

async function setupHomePage() {
    const version = ++homeSetupVersion;
    disposeHomeNebula?.();
    disposeHomeNebula = null;
    const home = document.querySelector(".home-cosmos");
    if (!home) return;
    try {
        const { createNebula } = await import(homeNebulaModule);
        if (version !== homeSetupVersion || !home.isConnected) return;
        disposeHomeNebula = createNebula(home);
    } catch (error) {
        console.warn("The star field is using its static fallback.", error);
    }
}

window.addEventListener("scroll", scheduleFooterOffsetUpdate, { passive: true });
window.addEventListener("resize", scheduleFooterOffsetUpdate);

document$.subscribe(() => {
    renderedPagePath = window.location.pathname;
    document.documentElement.classList.remove("codex-history-loading");
    setFooterOffset(0);
    setupHomePage();

    if (footerOffsetFrame !== null) cancelAnimationFrame(footerOffsetFrame);
    footerOffsetFrame = requestAnimationFrame(() => {
        footerOffsetFrame = requestAnimationFrame(() => {
            footerOffsetFrame = null;
            resetLegacyPlayerPosition();
            updateFooterOffset();
        });
    });
});
