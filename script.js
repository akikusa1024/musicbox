// Hiệu ứng hoa anh đào
function createPetal() {
    const container = document.getElementById('sakura-container');
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 10 + 10 + "px";
    petal.style.width = size; petal.style.height = size;
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 5 + 5 + "s";
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 400);

// Nhạc nền
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    if (music.paused) { music.play(); icon.innerText = "🎵"; }
    else { music.pause(); icon.innerText = "🔇"; }
}

// Hiển thị bài hát
let currentGenre = 'All';

function displaySongs(data) {
    const list = document.getElementById('songList');
    list.innerHTML = '';
    data.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.onclick = () => openLyrics(song);
        const tagClass = song.genre === 'Nhạc xập xình' ? 'tag-xapxinh' : 
                         song.genre === 'Nhạc var' ? 'tag-var' : 
                         song.genre === 'Nhạc ballad' ? 'tag-ballad' : 'tag-songca';
        card.innerHTML = `<span style="font-weight:bold; display:block; margin-bottom:10px;">${song.title}</span>
                          <span class="${tagClass}">${song.genre}</span>`;
        list.appendChild(card);
    });
    document.getElementById('countInfo').innerText = `Đang hiện ${data.length} bài hát 🌸`;
}

function openLyrics(song) {
    document.getElementById('modalTitle').innerText = song.title;
    document.getElementById('modalBody').innerText = song.lyrics || "Aki đang cập nhật lời bài này nha... ✨";
    document.getElementById('lyricsModal').style.display = 'flex';
}

function closeModal() { document.getElementById('lyricsModal').style.display = 'none'; }

function setGenre(genre) {
    currentGenre = genre;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.includes(genre.replace('Nhạc ', '')) || (genre === 'All' && btn.innerText.includes('Tất cả')));
    });
    filterSongs();
}

function filterSongs() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = songs.filter(s => (currentGenre === 'All' || s.genre === currentGenre) && s.title.toLowerCase().includes(term));
    displaySongs(filtered);
}

window.onload = () => displaySongs(songs);
