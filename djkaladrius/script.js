// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';
});

// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
});

// Discography Database
const tracks = [
    { id: 1, title: "Dancing in Hell", genre: "Electro-House", bpm: 120, key: "3B", art: "covers/dancinginhell.jpg", lyrics: "The angels are dancing in hell tonight\nSo let yourself run free\nNo one you have to be\nIt's just you and me\nThe angels are dancing in hell tonight\nJust enjoy that freedom\nDon't know where it leads us...\n\nThe sky won't even put up a fight\nBecause the angels are dancing in hell tonight\nNo the sky won't even put up a fight\nBecause the angels are dancing in hell tonight\nDancing in hell tonight\nDancing in hell tonight\n\n[Bass Drop]\n\nThe angels are dancing in hell tonight\nSo let yourself run free\nNo one you have to be\nIt's just you and me\nThe angels are dancing in hell tonight\nJust enjoy that freedom\nDon't know where it leads us...\n\nFreedom\nDon't know where it\nFreedom\nDon't know where it\nFreedom\nDon't know where it\nBecause the angels are dancing in hell tonight\n\n[Bass Drop]\n\nDancing in hell, dancing in hell, dancing in hell tonight\nDancing in hell, dancing in hell, dancing in hell tonight\nDancing in hell, dancing in hell, dancing in hell tonight\nDancing in hell, dancing in hell, dancing in hell tonight\n\n[Bass Drop]\n\nBecause the angels are dancing in hell tonight\nDancing in hell tonight", spotify: "https://open.spotify.com/track/4H93zNQNCBmlEVPsbwRnkT?si=3ccd2c91528a4c2d", apple:"https://music.apple.com/us/song/dancing-in-hell/1834863708"},
    { id: 2, title: "Reality", genre: "Big Room", bpm: 120, key: "8A", art: "covers/reality.jpg", lyrics: "(Drive)\n(Drive)\n(Drive)\nOh could this be\nReality...\n(Drive)\n(Drive)\n(Drive)\nOh could this be\nReality...\n\nOh could this be\nReality...\n\n[Instrumental / Bass Drop]\n\nOh could this be\nReality...\nOh could this be\nReality...\n\n[Instrumental / Bass Drop]\n\n(Drive)\n(Drive)\n(Drive)", spotify: "https://open.spotify.com/track/4TB6nUIz8q7THn5YJ1XHyJ?si=9f491ac4b2c54b1b", apple:"https://music.apple.com/us/song/reality/1851931866" }
];

// Camelot Wheel Color Mapping
const camelotColors = {
    // --- MINOR KEYS (A) ---
    "1A": "#00f0ff",  // Electric Cyan (Abm)
    "2A": "#00ff66",  // Emerald Neon (Ebm)
    "3A": "#a2ff00",  // Lime Neon (Bbm)
    "4A": "#ffe600",  // Yellow Neon (Fm)
    "5A": "#ff9900",  // Orange Neon (Cm)
    "6A": "#ff0055",  // Red Neon (Gm)
    "7A": "#ff00aa",  // Hot Pink (Dm)
    "8A": "#b537f2",  // Deep Purple (Am)
    "9A": "#6200ff",  // Indigo Neon (Em)
    "10A": "#0033ff", // Royal Blue (Bm)
    "11A": "#0088ff", // Cobalt Neon (F#m)
    "12A": "#00ffcc", // Teal Neon (C#m)

    // --- MAJOR KEYS (B) ---
    "1B": "#80f7ff",  // Sky Cyan (B)
    "2B": "#75ffb1",  // Mint Neon (F#)
    "3B": "#cfff70",  // Lemon-Lime (Db)
    "4B": "#fff275",  // Pastel Yellow (Ab)
    "5B": "#ffbe75",  // Peach Neon (Eb)
    "6B": "#ff6699",  // Coral Neon (Bb)
    "7B": "#ff75d1",  // Candy Pink (F)
    "8B": "#d68ff7",  // Lavender Neon (C)
    "9B": "#aa75ff",  // Periwinkle (G)
    "10B": "#7592ff", // Light Blue (D)
    "11B": "#75c2ff", // Ice Blue (A)
    "12B": "#75ffe3"   // Pale Teal (E)
};

// Render Discography
const trackContainer = document.getElementById('track-container');
if (trackContainer) {
    const renderTracks = (trackArray) => {
        trackContainer.innerHTML = '';
        trackArray.forEach(track => {
            const color = camelotColors[track.key] || '#ffffff';
            const html = `
                <a href="song.html?id=${track.id}" class="track-item animate-on-scroll">
                    <img src="${track.art}" alt="${track.title}" class="track-art">
                    <div class="track-info">
                        <h3>${track.title}</h3>
                        <div class="track-meta">
                            <span>${track.genre}</span> | 
                            <span>${track.bpm} BPM</span>
                        </div>
                    </div>
                    <div class="camelot-key" style="background-color: ${color};">${track.key}</div>
                </a>
            `;
            trackContainer.innerHTML += html;
        });
        
        // Re-observe new elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    };

    renderTracks(tracks);

    document.getElementById('sort-bpm').addEventListener('click', () => {
        const sorted = [...tracks].sort((a, b) => a.bpm - b.bpm);
        renderTracks(sorted);
    });

    document.getElementById('sort-key').addEventListener('click', () => {
        const sorted = [...tracks].sort((a, b) => {
            const numA = parseInt(a.key);
            const numB = parseInt(b.key);
            return numA - numB;
        });
        renderTracks(sorted);
    });
}

// Render Individual Song Page dynamically
const songDetailContainer = document.getElementById('song-detail');
if (songDetailContainer) {
    const params = new URLSearchParams(window.location.search);
    const songId = parseInt(params.get('id'));
    const song = tracks.find(t => t.id === songId);

    if (song) {
        const color = camelotColors[song.key] || '#ffffff';
        songDetailContainer.innerHTML = `
            <img src="${song.art}" alt="${song.title}" class="profile-img">
            <h1>${song.title}</h1>
            <p style="margin: 10px 0; color: var(--neon-blue);">${song.genre} | ${song.bpm} BPM</p>
            <div class="camelot-key" style="display: inline-block; background-color: ${color}; margin-bottom: 2rem;">Key: ${song.key}</div>
            
            <div class="stream-links">
                <a href="${song.spotify}" class="btn"><i class="fab fa-spotify"></i> Spotify</a>
                <a href="${song.apple}" class="btn btn-purple"><i class="fab fa-apple"></i> Apple Music</a>
            </div>

            <div class="lyrics-box"><h3>Lyrics</h3><br>${song.lyrics}</div>
        `;
    } else {
        songDetailConstainer.innerHTML = `<h2>Song not found</h2><a href="discography.html" class="btn">Back to Discography</a>`;
    }
}