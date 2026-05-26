// API Key sekarang disimpan di environment variables Vercel

// ==================== VARIABEL GLOBAL ====================
let currentUser = null;
let isMusicPlaying = false;
let audioElement = null;

// ==================== FUNGSI LOGIN & USER ====================
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUserDisplay();
            // Jika user sudah login, langsung ke home
            if (currentUser && document.getElementById('home-page')) {
                showPage('home');
            }
        } catch(e) {
            console.error("Gagal load user:", e);
            localStorage.removeItem('currentUser');
        }
    }
}

function updateUserDisplay() {
    const userNameSpan = document.getElementById('user-name-display');
    if (userNameSpan && currentUser) {
        userNameSpan.innerHTML = `${currentUser.name} (${currentUser.class}) - ${currentUser.major}`;
    } else if (userNameSpan) {
        userNameSpan.innerHTML = '-';
    }
}

function doLogin() {
    let name = document.getElementById('login-name').value.trim();
    let cls = document.getElementById('login-class').value.trim();
    let majorSelect = document.getElementById('login-major');
    let major = majorSelect.options[majorSelect.selectedIndex]?.text || majorSelect.value;
    
    if (!name || !cls) {
        alert("Mohon isi nama lengkap dan kelas!");
        return false;
    }
    
    currentUser = { name: name, class: cls, major: major };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserDisplay();
    showPage('home');
    
    document.getElementById('login-name').value = '';
    document.getElementById('login-class').value = '';
    
    return true;
}

function doLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Reset form login
    const loginName = document.getElementById('login-name');
    const loginClass = document.getElementById('login-class');
    if (loginName) loginName.value = '';
    if (loginClass) loginClass.value = '';
    
    showPage('login');
}

function checkLogin() {
    if (!currentUser) {
        alert("Silakan login terlebih dahulu!");
        showPage('login');
        return false;
    }
    return true;
}

// ==================== FUNGSI NAVIGASI HALAMAN ====================
function showPage(page) {
    // Cek login untuk halaman yang membutuhkan auth (semua kecuali login)
    if (page !== 'login' && !currentUser) {
        page = 'login';
    }
    
    let pages = ['login', 'home', 'profil', 'petunjuk', 'cp-atp', 'materi-list', 'slide-materi', 'video', 'kuis', 'hasil', 'chatbox'];
    pages.forEach(p => {
        let el = document.getElementById(`${p}-page`);
        if (el) el.classList.remove('active');
    });
    let activePage = document.getElementById(`${page}-page`);
    if (activePage) activePage.classList.add('active');
    
    if (page === 'chatbox') {
        let cm = document.getElementById('chat-messages');
        if (cm) cm.scrollTop = cm.scrollHeight;
    }
}

// ==================== CREATE ANIMATIONS ====================
function createMovingDots() {
    const dotsContainer = document.getElementById('movingDots');
    if(dotsContainer && dotsContainer.children.length === 0) {
        for(let i = 0; i < 150; i++) {
            let dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.width = Math.random() * 6 + 2 + 'px';
            dot.style.height = dot.style.width;
            dot.style.animationDuration = Math.random() * 18 + 6 + 's';
            dot.style.animationDelay = Math.random() * 12 + 's';
            dot.style.background = `rgba(${150 + Math.random() * 105}, ${100 + Math.random() * 155}, 255, ${0.4 + Math.random() * 0.5})`;
            dotsContainer.appendChild(dot);
        }
    }
}

function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    if(bubblesContainer && bubblesContainer.children.length === 0) {
        for(let i = 0; i < 40; i++) {
            let bubble = document.createElement('div');
            bubble.className = 'bubble';
            let size = Math.random() * 80 + 25;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = Math.random() * 14 + 8 + 's';
            bubble.style.animationDelay = Math.random() * 12 + 's';
            bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(${150 + Math.random() * 105}, ${100 + Math.random() * 155}, 255, 0.5), rgba(124, 58, 237, 0.2))`;
            bubblesContainer.appendChild(bubble);
        }
    }
}

// ==================== VIDEO ====================
const videoUrls = {
    1: "https://www.youtube.com/embed/KHyJHUxFrlI",
    2: "https://www.youtube.com/embed/0G-DSZAwn5Y",
    3: "https://www.youtube.com/embed/QiGwpr8OfWE"
};

const videoTitles = {
    1: "🎬 Video 1: Pengertian Bitmap & Vektor",
    2: "🎬 Video 2: Pengertian CorelDraw",
    3: "🎬 Video 3: Pengertian Photoshop",
};

function playVideo(num) {
    const videoFrame = document.getElementById('videoFrame');
    const videoContainer = document.getElementById('videoContainer');
    const videoTitle = document.getElementById('videoTitle');
    
    if(videoFrame && videoContainer && videoTitle) {
        videoFrame.src = videoUrls[num];
        videoTitle.innerHTML = videoTitles[num];
        videoContainer.style.display = 'block';
        videoContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeVideo() {
    const videoFrame = document.getElementById('videoFrame');
    const videoContainer = document.getElementById('videoContainer');
    if(videoFrame && videoContainer) {
        videoFrame.src = '';
        videoContainer.style.display = 'none';
    }
}

// ==================== MATERI SLIDE ====================
const materiData = {
    1: { title: "🖼️ BITMAP (Gambar Raster)", slides: [
        `📌 <strong>Pengertian Bitmap</strong><br><br>
        Bitmap adalah gambar yang tersusun dari titik-titik warna yang disebut <strong style='color:#c084fc'>PIKSEL</strong>. 
        Setiap piksel memiliki lokasi dan warna tersendiri sehingga secara keseluruhan membentuk sebuah tampilan gambar.<br><br>
        
        <div style='text-align:center; margin:20px 0;'>
            <div style='width:280px; height:180px; background:linear-gradient(135deg,#667eea,#764ba2); border-radius:12px; display:flex; align-items:center; justify-content:center; margin:0 auto; color:white; font-size:14px;'>
                🎨 Contoh Gambar Bitmap
            </div>
            <br><small style='color:#a78bfa;'>Contoh gambar Bitmap - tersusun dari titik-titik piksel</small>
        </div><br>
        
        <strong>✨ Karakteristik Bitmap:</strong><br>
        • Tersusun dari kumpulan piksel<br>
        • Jika diperbesar akan terlihat kotak-kotak (pecah/pixelated)<br>
        • Ukuran file tergantung resolusi<br>
        • Bersifat <strong>resolution dependent</strong><br>
        • Cocok untuk foto dan gambar realistis`,
        
        `📌 <strong>Kelebihan Bitmap</strong><br><br>
        ✅ Gradasi warna sangat halus dan kompleks<br>
        ✅ Detail gambar tinggi pada resolusi yang cukup<br>
        ✅ Mampu menampilkan gambar secara nyata dan realistis<br>
        ✅ Didukung hampir semua software editing gambar<br><br>
        
        📌 <strong>Kekurangan Bitmap</strong><br><br>
        ❌ Pecah jika diperbesar melebihi ukuran aslinya<br>
        ❌ Ukuran file relatif besar<br>
        ❌ Sulit diedit bentuk objeknya<br>
        ❌ Resolution dependent`,
        
        `📌 <strong>Format File Bitmap yang umum digunakan:</strong><br><br>
        • <strong>JPEG/JPG</strong> - untuk foto digital, web<br>
        • <strong>PNG</strong> - mendukung transparansi<br>
        • <strong>GIF</strong> - mendukung animasi sederhana<br>
        • <strong>BMP</strong> - tanpa kompresi<br>
        • <strong>TIFF</strong> - kualitas tinggi untuk percetakan<br><br>
        
        📌 <strong>Software Bitmap:</strong><br>
        Adobe Photoshop, GIMP, Corel Photo-Paint, Krita`
    ]},
    
    2: { title: "✏️ VEKTOR (Gambar Garis & Kurva)", slides: [
        `📌 <strong>Pengertian Vektor</strong><br><br>
        Vektor adalah gambar yang tersusun dari <strong style='color:#c084fc'>garis, kurva, dan titik (anchor point)</strong> 
        berdasarkan rumus matematika. Bukan dari piksel seperti bitmap.<br><br>
        
        <div style='text-align:center; margin:20px 0;'>
            <div style='width:280px; height:180px; background:linear-gradient(135deg,#f093fb,#f5576c); border-radius:12px; display:flex; align-items:center; justify-content:center; margin:0 auto; color:white; font-size:14px;'>
                ✨ Contoh Gambar Vektor
            </div>
            <br><small style='color:#a78bfa;'>Contoh gambar Vektor - tersusun dari garis dan kurva</small>
        </div><br>
        
        <strong>✨ Karakteristik Vektor:</strong><br>
        • Tersusun dari garis dan kurva matematis<br>
        • <strong>Tidak pernah pecah</strong> meskipun diperbesar (scalable)<br>
        • Ukuran file kecil<br>
        • Bersifat <strong>resolution independent</strong><br>
        • Mudah diedit`,
        
        `📌 <strong>Kelebihan Vektor</strong><br><br>
        ✅ Scalable tanpa batas - tidak pernah pecah<br>
        ✅ Ukuran file sangat kecil<br>
        ✅ Mudah dimodifikasi dan diedit<br>
        ✅ Hasil cetak profesional dan tajam<br>
        ✅ Resolution independent<br><br>
        
        📌 <strong>Kekurangan Vektor</strong><br><br>
        ❌ Kurang cocok untuk foto realistis<br>
        ❌ Membutuhkan keterampilan khusus (Pen Tool)<br>
        ❌ Tidak semua software editing mendukung file vektor`,
        
        `📌 <strong>Format File Vektor yang umum digunakan:</strong><br><br>
        • <strong>AI</strong> - Adobe Illustrator<br>
        • <strong>CDR</strong> - CorelDRAW<br>
        • <strong>EPS</strong> - format universal percetakan<br>
        • <strong>SVG</strong> - untuk web<br>
        • <strong>WMF</strong> - Windows Metafile<br><br>
        
        📌 <strong>Software Vektor:</strong><br>
        CorelDRAW, Adobe Illustrator, Inkscape, Figma`
    ]},
    
    3: { title: "💻 Perangkat Lunak Desain Grafis", slides: [
        `📌 <strong>Software Berbasis VEKTOR</strong><br><br>
        1. <strong style='color:#c084fc'>CorelDRAW</strong> - populer di Indonesia, fitur Shaping & PowerClip<br>
        2. <strong style='color:#c084fc'>Adobe Illustrator</strong> - standar industri, fitur Pathfinder & Pen Tool<br>
        3. <strong style='color:#c084fc'>Inkscape</strong> - gratis dan open source<br>
        4. <strong style='color:#c084fc'>Figma</strong> - untuk desain UI/UX, kolaborasi real-time<br><br>
        
        📌 <strong>Software Berbasis BITMAP</strong><br><br>
        1. <strong style='color:#c084fc'>Adobe Photoshop</strong> - fitur Layer & Selection Tools<br>
        2. <strong style='color:#c084fc'>GIMP</strong> - gratis dan open source<br>
        3. <strong style='color:#c084fc'>Krita</strong> - fokus digital painting<br>
        4. <strong style='color:#c084fc'>Corel Photo-Paint</strong> - software bitmap dari Corel`,
        
        `📌 <strong>Fitur Shaping di CorelDRAW</strong><br><br>
        • <strong>Combine</strong> - menggabungkan objek, menghilangkan irisan<br>
        • <strong>Weld</strong> - menggabungkan objek tanpa irisan<br>
        • <strong>Trim</strong> - memotong objek dengan objek lain<br>
        • <strong>Intersect</strong> - membuat objek dari irisan dua objek<br>
        • <strong>Simplify</strong> - objek depan memotong objek belakang<br>
        • <strong>Front Minus Back</strong> - objek depan terpotong objek belakang<br>
        • <strong>Back Minus Front</strong> - objek belakang terpotong objek depan`,
        
        `📌 <strong>Fitur Pathfinder di Adobe Illustrator</strong><br><br>
        • <strong>Unite</strong> (gabung)<br>
        • <strong>Minus Front</strong> (kurangi depan)<br>
        • <strong>Intersect</strong> (irisan)<br>
        • <strong>Exclude</strong> (gabung tanpa irisan)<br>
        • <strong>Divide</strong> (bagi berdasarkan garis potong)<br>
        • <strong>Trim</strong> (potong)<br>
        • <strong>Merge</strong> (gabung)<br>
        • <strong>Crop</strong> (iris)`,
        
        `📌 <strong>Layer pada Photoshop</strong><br><br>
        Layer adalah lapisan terpisah untuk setiap elemen desain.<br><br>
        <strong>✨ Fungsi Layer:</strong><br>
        • Memisahkan elemen desain<br>
        • Mengatur urutan (z-order)<br>
        • Menerapkan efek non-destruktif<br>
        • Mengatur opacity (transparansi)<br>
        • Blending mode<br><br>
        
        📌 <strong>Shortcut Layer:</strong><br>
        Ctrl+Shift+N = Layer baru, Ctrl+J = Duplikat, Ctrl+E = Merge`
    ]},
    
    4: { title: "📦 Contoh Rancangan Komputer Grafis", slides: [
        `<h3 style="color:#c084fc">☕ 1. MUG</h3>
        <p><strong>📏 Ukuran standar:</strong> 8cm x 20cm</p>
        <p><strong>💻 Software:</strong> CorelDRAW, Illustrator, Photoshop</p>
        <p><strong>📋 Langkah:</strong> Buat lembar kerja ukuran 8x20 cm, desain dengan gambar dan teks, ekspor ke JPEG/PNG untuk dicetak</p>
        <p style="color:#a78bfa">✨ Tips: Gunakan resolusi tinggi minimal 300 DPI</p>`,
        
        `<h3 style="color:#c084fc">🏷️ 2. LOGO</h3>
        <p><strong>💻 Software:</strong> CorelDRAW, Illustrator (VEKTOR wajib!)</p>
        <p><strong>📋 Langkah:</strong> Tentukan konsep, buat sketsa, gunakan shape tool, gabungkan dengan fitur Weld/Trim/Intersect, beri warna gradasi, tambahkan tipografi</p>
        <p style="color:#a78bfa">✨ Tips: Simpan file master dalam format .CDR/.AI</p>`,
        
        `<h3 style="color:#c084fc">📦 3. PACKAGING</h3>
        <p><strong>💻 Software:</strong> CorelDRAW, Illustrator</p>
        <p><strong>📋 Langkah:</strong> Desain pola kemasan, beri warna gradient, tambahkan PowerClip Inside, tambahkan keterangan produk</p>
        <p style="color:#a78bfa">✨ Tips: Perhatikan struktur lipatan kemasan</p>`,
        
        `<h3 style="color:#c084fc">💳 4. KARTU NAMA</h3>
        <p><strong>📏 Ukuran standar:</strong> 9cm x 5.5cm</p>
        <p><strong>💻 Software:</strong> CorelDRAW, Illustrator, Photoshop</p>
        <p><strong>📋 Langkah:</strong> Buat persegi 9x5.5 cm, beri warna, tambahkan teks, tambahkan logo</p>
        <p style="color:#a78bfa">✨ Tips: Gunakan warna yang kontras</p>`
    ]}
};

let currentMateri = 1, currentSlide = 0, totalSlides = 0;

function openMateri(id) {
    if (!checkLogin()) return;
    currentMateri = id;
    currentSlide = 0;
    totalSlides = materiData[id].slides.length;
    const slideTitle = document.getElementById('slide-title');
    if(slideTitle) slideTitle.innerHTML = materiData[id].title;
    renderSlide();
    showPage('slide-materi');
}

function renderSlide() {
    const slideContent = document.getElementById('slide-content');
    const slideCounter = document.getElementById('slide-counter');
    if(slideContent && slideCounter && materiData[currentMateri]) {
        slideContent.innerHTML = `<div class="slide-card"><div class="slide-title">📄 Slide ${currentSlide+1} dari ${totalSlides}</div><div class="long-text">${materiData[currentMateri].slides[currentSlide]}</div></div>`;
        slideCounter.innerHTML = `${currentSlide+1} / ${totalSlides}`;
    }
}

function nextSlide() {
    if(currentSlide + 1 < totalSlides) {
        currentSlide++;
        renderSlide();
        const slideContent = document.getElementById('slide-content');
        if(slideContent) slideContent.scrollTop = 0;
    } else {
        alert("✨ Selesai! Silakan pilih materi lain.");
    }
}

function prevSlide() {
    if(currentSlide > 0) {
        currentSlide--;
        renderSlide();
        const slideContent = document.getElementById('slide-content');
        if(slideContent) slideContent.scrollTop = 0;
    } else {
        alert("📘 Ini slide pertama.");
    }
}

function backToMateriList() {
    showPage('materi-list');
}

// ==================== KUIS ====================
const quizQuestions = [
    { q: "Gambar yang tersusun dari piksel dan pecah jika diperbesar disebut?", o: ["Bitmap", "Vektor", "SVG", "AI"], a: 0 },
    { q: "Format file VEKTOR adalah?", o: ["JPEG", "PNG", "CDR", "GIF"], a: 2 },
    { q: "Keunggulan utama gambar vektor dibanding bitmap adalah?", o: ["Ukuran besar", "Tidak pecah", "Gradasi halus", "Cocok foto"], a: 1 },
    { q: "Software desain grafis berbasis vektor yang populer di Indonesia?", o: ["Photoshop", "CorelDRAW", "GIMP", "Paint"], a: 1 }
];

let userAnswers = [];

function startQuiz() {
    if (!checkLogin()) return;
    userAnswers = new Array(quizQuestions.length).fill(null);
    let html = "";
    quizQuestions.forEach((q, i) => {
        html += `<div style="margin-bottom:25px;"><div class="quiz-question">${i+1}. ${q.q}</div>`;
        q.o.forEach((opt, j) => {
            html += `<div class="quiz-option" onclick="selectAnswer(${i},${j})" id="q${i}_opt${j}">${String.fromCharCode(65+j)}. ${opt}</div>`;
        });
        html += `</div>`;
    });
    const quizContainer = document.getElementById('quiz-container');
    if(quizContainer) quizContainer.innerHTML = html;
    showPage('kuis');
}

function selectAnswer(qi, oi) {
    userAnswers[qi] = oi;
    for(let i = 0; i < 4; i++) {
        let el = document.getElementById(`q${qi}_opt${i}`);
        if(el) el.style.background = "rgba(255,255,255,0.06)";
    }
    let selectedEl = document.getElementById(`q${qi}_opt${oi}`);
    if(selectedEl) selectedEl.style.background = "linear-gradient(135deg,#7c3aed,#a78bfa)";
}

function submitQuiz() {
    let score = 0;
    for(let i = 0; i < quizQuestions.length; i++) {
        if(userAnswers[i] === quizQuestions[i].a) score++;
    }
    let percent = (score/quizQuestions.length)*100;
    let msg = percent >= 80 ? "🏆 Luar biasa!" : (percent >= 60 ? "👍 Bagus!" : "📖 Pelajari lagi.");
    const hasilScore = document.getElementById('hasil-score');
    if(hasilScore) {
        hasilScore.innerHTML = `<h2 style="color:#c084fc;">Skor: ${score}/${quizQuestions.length}</h2><h1 style="color:#e0aaff;">${percent}%</h1><p style="color:#cdc4ff;">${msg}</p>`;
    }
    showPage('hasil');
}

// ==================== CHATBOX GEMINI API ====================
function updateApiStatus() {
    const statusDiv = document.getElementById('apiStatus');
    if (statusDiv) {
        statusDiv.innerHTML = '🤖 Chat siap digunakan!';
        statusDiv.className = 'api-status status-ok';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const templateQuestions = [
    "Apa itu bitmap?", "Apa itu vektor?", "Perbedaan bitmap dan vektor?",
    "Jelaskan tentang CorelDRAW!", "Apa itu layer di Photoshop?"
];

function loadTemplates() {
    let cont = document.getElementById('templateContainer');
    if(cont) {
        cont.innerHTML = '';
        templateQuestions.forEach(t => {
            let chip = document.createElement('div');
            chip.className = 'template-chip';
            chip.innerText = t.length > 28 ? t.substring(0,25)+'...' : t;
            chip.onclick = () => {
                const chatInput = document.getElementById('chatInput');
                if(chatInput) chatInput.value = t;
                sendChat();
            };
            cont.appendChild(chip);
        });
    }
}

function getOfflineReply(question) {
    const q = question.toLowerCase();
    if (q.includes('bitmap')) return "Bitmap adalah gambar tersusun dari piksel. Karakteristik: pecah jika diperbesar, resolution dependent, cocok untuk foto.";
    if (q.includes('vektor')) return "Vektor adalah gambar tersusun dari garis dan kurva. Keunggulan: scalable tanpa batas, ukuran kecil, resolution independent.";
    if (q.includes('perbedaan')) return "Bitmap: tersusun dari piksel (pecah), Vektor: tersusun dari garis/kurva (tidak pecah).";
    if (q.includes('coreldraw')) return "CorelDRAW adalah software desain grafis vektor populer di Indonesia. Fitur: Shaping, PowerClip.";
    if (q.includes('layer')) return "Layer adalah lapisan terpisah untuk setiap elemen desain. Fungsinya memisahkan elemen dan mengatur urutan.";
    return "Saya asisten AI untuk materi Komputer Grafis. Silakan tanyakan tentang Bitmap, Vektor, CorelDRAW, atau Photoshop!";
}

async function sendChat() {
    let input = document.getElementById('chatInput');
    let msg = input.value.trim();
    if(!msg) return;
    
    let container = document.getElementById('chat-messages');
    let errorDiv = document.getElementById('errorMsg');
    if(errorDiv) errorDiv.style.display = 'none';
    
    let userDiv = document.createElement('div');
    userDiv.className = 'bubble-user';
    userDiv.innerHTML = `<i class="fas fa-user"></i> ${escapeHtml(msg)}`;
    container.appendChild(userDiv);
    
    input.value = '';
    
    let typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.style.display = 'block';
    typingDiv.innerHTML = '<span></span><span></span><span></span><span style="margin-left:10px;">🤖 AI sedang mengetik...</span>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    
    setTimeout(() => {
        container.removeChild(typingDiv);
        let reply = getOfflineReply(msg);
        let aiDiv = document.createElement('div');
        aiDiv.className = 'bubble-ai';
        aiDiv.innerHTML = `<i class="fab fa-google"></i> ${reply.replace(/\n/g, '<br>')}`;
        container.appendChild(aiDiv);
        container.scrollTop = container.scrollHeight;
    }, 500);
}

// ==================== BACKSOUND (DIPERBAIKI) ====================
function initBacksound() {
    audioElement = document.getElementById('backsound');
    if (audioElement) {
        audioElement.volume = 0.3;
        audioElement.loop = true;
        
        const musicPlayed = localStorage.getItem('musicPlayed');
        if (musicPlayed === 'true') {
            toggleMusic();
        }
        
        audioElement.addEventListener('error', function(e) {
            console.error('Error playing audio:', e);
            updateMusicButtonUI(false);
            localStorage.setItem('musicPlayed', 'false');
        });
    } else {
        console.log('Audio element with id "backsound" not found');
    }
}

function toggleMusic() {
    if (!audioElement) {
        audioElement = document.getElementById('backsound');
        if (!audioElement) {
            console.error('Audio element not found!');
            alert('Elemen audio tidak ditemukan.');
            return;
        }
    }
    
    if (isMusicPlaying) {
        audioElement.pause();
        isMusicPlaying = false;
        updateMusicButtonUI(false);
        localStorage.setItem('musicPlayed', 'false');
    } else {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                updateMusicButtonUI(true);
                localStorage.setItem('musicPlayed', 'true');
            }).catch(error => {
                console.error('Playback failed:', error);
                alert('Tidak dapat memutar musik. Pastikan file backsound.mp3 tersedia.');
                updateMusicButtonUI(false);
            });
        }
    }
}

function updateMusicButtonUI(isPlaying) {
    const btn = document.getElementById('musicToggleBtn');
    if (btn) {
        if (isPlaying) {
            btn.classList.add('playing');
            btn.innerHTML = '<i class="fas fa-stop"></i><span class="music-text">Hentikan</span>';
        } else {
            btn.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-music"></i><span class="music-text">Putar Musik</span>';
        }
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    createMovingDots();
    createBubbles();
    loadTemplates();
    loadUserData();
    updateApiStatus();
    initBacksound();
    
    // Event listener untuk tombol login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            doLogin();
        });
    }
    
    // Event listener untuk tombol Enter
    const loginName = document.getElementById('login-name');
    const loginClass = document.getElementById('login-class');
    if (loginName) {
        loginName.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                doLogin();
            }
        });
    }
    if (loginClass) {
        loginClass.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                doLogin();
            }
        });
    }
});
