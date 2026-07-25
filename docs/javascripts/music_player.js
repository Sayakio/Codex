const MUSIC_ICON = `<svg viewBox="0 0 24 24"><path d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8,12 6,14 6,16.5C6,19 8,21 10.5,21C13,21 15,19 15,16.5V6H19V3H12Z" /></svg>`;
const MUSIC_TRACKS = [
    // Add direct HTTPS audio URLs here.
    {
        name: "Farewell",
        artist: "Lena Raine",
        url: "https://dn720601.ca.archive.org/0/items/lena-raine-celeste-farewell-original-soundtrack/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20FLAC/Lena%20Raine%20-%20Celeste-%20Farewell%20%28Original%20Soundtrack%29%20-%2010%20Farewell.mp3",
        cover: "https://ia601405.us.archive.org/18/items/lena-raine-celeste-farewell-original-soundtrack/cover_thumb.jpg?cnt=0",
    },
    {
        name: "Golden Ridge (Golden Feather Mix)",
        artist: "in love with a ghost",
        url: "https://dn721905.ca.archive.org/0/items/kuraine-celeste-b-sides-07-summit-no-more-running-mix/in%20love%20with%20a%20ghost%20-%20Celeste%20B-Sides%20-%2004%20Golden%20Ridge%20%28Golden%20Feather%20Mix%29.mp3",
        cover: "https://ia800406.us.archive.org/29/items/kuraine-celeste-b-sides-07-summit-no-more-running-mix/cover_thumb.jpg?cnt=0"
    }
];

document$.subscribe(() => {
    if (!MUSIC_TRACKS.length || document.getElementById("music-player-toggle")) return;

    if (typeof APlayer !== "function") {
        console.error("Music player initialization failed: APlayer is unavailable.");
        return;
    }

    createMusicUI();
});

function createMusicUI() {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "music-player-toggle";
    toggleBtn.title = "Music Player";
    toggleBtn.innerHTML = MUSIC_ICON;
    document.body.appendChild(toggleBtn);

    const playerContainer = document.createElement("div");
    playerContainer.id = "music-player-container";
    document.body.appendChild(playerContainer);

    new APlayer({
        container: playerContainer,
        fixed: false,
        mini: false,
        autoplay: false,
        listFolded: true,
        theme: "#2980b9",
        volume: 0.7,
        preload: "none",
        audio: MUSIC_TRACKS,
    });

    toggleBtn.addEventListener("click", () => {
        playerContainer.classList.toggle("show");
        toggleBtn.classList.toggle("active");
    });
}
