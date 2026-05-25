// ==================== FILE: script.js (FRONTEND) - PERBAIKAN LOGIN ====================
// API Key sekarang disimpan di environment variables Vercel

// ==================== VARIABEL GLOBAL ====================
let currentUser = null;

// ==================== FUNGSI LOGIN & USER ====================
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUserDisplay();
        } catch(e) {
            console.error("Gagal load user:", e);
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
        return;
    }
    
    currentUser = { name: name, class: cls, major: major };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserDisplay();
    showPage('home');
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

// ==================== FUNGSI NAVIGASI HALAMAN ====================
function showPage(page) {
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
    "📌 <strong>Pengertian Bitmap</strong><br><br>Bitmap adalah gambar yang tersusun dari titik-titik warna yang disebut <strong style='color:#c084fc'>PIKSEL</strong>. Setiap piksel memiliki lokasi dan warna tersendiri sehingga secara keseluruhan membentuk sebuah tampilan gambar.<br><br><div style='text-align:center; margin:20px 0;'><img src='bitmap.jpg' style='width:280px; height:180px; object-fit:cover; border-radius:12px; border:2px solid #c084fc; box-shadow:0 5px 20px rgba(0,0,0,0.3);' onerror=\"this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22%3E%3Crect width=%22300%22 height=%22200%22 fill=%22%23333%22/%3E%3Ctext x=%22150%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23c084fc%22%3EBitmap%3C/text%3E%3C/svg%3E'\"><br><small style='color:#ffffff;'>📸 Contoh gambar Bitmap - tersusun dari titik-titik piksel</small></div><br><strong>✨ Karakteristik Bitmap:</strong><br>• Tersusun dari kumpulan piksel<br>• Jika diperbesar akan terlihat kotak-kotak (pecah/pixelated)<br>• Ukuran file tergantung resolusi (semakin tinggi resolusi, semakin besar ukuran)<br>• Bersifat <strong>resolution dependent</strong> (kualitas tergantung DPI)<br>• Cocok untuk foto, gambar realistis, dan hasil scan",
    "📌 <strong>Kelebihan Bitmap</strong><br><br>✅ Gradasi warna sangat halus dan kompleks<br>✅ Detail gambar tinggi pada resolusi yang cukup<br>✅ Mampu menampilkan gambar secara nyata dan realistis<br>✅ Didukung hampir semua software editing gambar<br><br>📌 <strong>Kekurangan Bitmap</strong><br><br>❌ Pecah jika diperbesar melebihi ukuran aslinya<br>❌ Ukuran file relatif besar<br>❌ Sulit diedit bentuk objeknya<br>❌ Resolution dependent (tergantung resolusi/DPI)",
    "📌 <strong>Format File Bitmap yang umum digunakan:</strong><br><br>• <strong>JPEG/JPG</strong> - untuk foto digital, web, kompresi lossy<br>• <strong>PNG</strong> - mendukung transparansi, kualitas bagus<br>• <strong>GIF</strong> - mendukung animasi sederhana, 256 warna<br>• <strong>BMP</strong> - tanpa kompresi, ukuran sangat besar<br>• <strong>TIFF</strong> - kualitas tinggi untuk percetakan<br><br>📌 <strong>Software Bitmap:</strong><br>Adobe Photoshop, GIMP, Corel Photo-Paint, Krita, Microsoft Paint"
]},
2: { title: "✏️ VEKTOR (Gambar Garis & Kurva)", slides: [
    "📌 <strong>Pengertian Vektor</strong><br><br>Vektor adalah gambar yang tersusun dari <strong style='color:#c084fc'>garis, kurva, dan titik (anchor point)</strong> berdasarkan rumus matematika. Bukan dari piksel seperti bitmap.<br><br><div style='text-align:center; margin:20px 0;'><img src='vektorr.png' style='width:280px; height:180px; object-fit:contain; border-radius:12px; border:2px solid #c084fc; box-shadow:0 5px 20px rgba(0,0,0,0.3);' onerror=\"this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22%3E%3Crect width=%22300%22 height=%22200%22 fill=%22%23333%22/%3E%3Ctext x=%22150%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23c084fc%22%3EVektor%3C/text%3E%3C/svg%3E'\"><br><small style='color:#c084fc;'>📐 Contoh gambar Vektor - tersusun dari garis dan kurva</small></div><br><strong>✨ Karakteristik Vektor:</strong><br>• Tersusun dari garis dan kurva matematis<br>• <strong>Tidak pernah pecah</strong> meskipun diperbesar berkali-kali (scalable)<br>• Ukuran file kecil karena hanya menyimpan data matematika<br>• Bersifat <strong>resolution independent</strong> (tidak tergantung DPI)<br>• Mudah diedit (bentuk, warna, ukuran bisa diubah)",
    "📌 <strong>Kelebihan Vektor</strong><br><br>✅ Scalable tanpa batas - tidak pernah pecah<br>✅ Ukuran file sangat kecil<br>✅ Mudah dimodifikasi dan diedit<br>✅ Hasil cetak profesional dan tajam<br>✅ Resolution independent<br><br>📌 <strong>Kekurangan Vektor</strong><br><br>❌ Kurang cocok untuk foto realistis (gradasi kompleks)<br>❌ Membutuhkan keterampilan khusus (menguasai Pen Tool)<br>❌ Tidak semua software editing mendukung file vektor",
    "📌 <strong>Format File Vektor yang umum digunakan:</strong><br><br>• <strong>AI</strong> - Adobe Illustrator (standar industri)<br>• <strong>CDR</strong> - CorelDRAW (populer di percetakan Indonesia)<br>• <strong>EPS</strong> - format universal untuk percetakan<br>• <strong>SVG</strong> - untuk web, scalable, ringan<br>• <strong>WMF</strong> - Windows Metafile<br><br>📌 <strong>Software Vektor:</strong><br>CorelDRAW, Adobe Illustrator, Inkscape (gratis), Figma, FreeHand"
]},
    3: { title: "💻 Perangkat Lunak Desain Grafis", slides: [
        "📌 <strong>Software Berbasis VEKTOR</strong><br><br>1. <strong style='color:#c084fc'>CorelDRAW</strong> - populer di Indonesia, fitur Shaping & PowerClip<br>2. <strong style='color:#c084fc'>Adobe Illustrator</strong> - standar industri, fitur Pathfinder & Pen Tool<br>3. <strong style='color:#c084fc'>Inkscape</strong> - gratis dan open source<br>4. <strong style='color:#c084fc'>Figma</strong> - untuk desain UI/UX, kolaborasi real-time<br><br>📌 <strong>Software Berbasis BITMAP</strong><br><br>1. <strong style='color:#c084fc'>Adobe Photoshop</strong> - paling populer, fitur Layer & Selection Tools<br>2. <strong style='color:#c084fc'>GIMP</strong> - gratis dan open source<br>3. <strong style='color:#c084fc'>Krita</strong> - fokus digital painting<br>4. <strong style='color:#c084fc'>Corel Photo-Paint</strong> - software bitmap dari Corel",
        "📌 <strong>Fitur Shaping di CorelDRAW</strong><br><br>• <strong>Combine</strong> - menggabungkan objek, menghilangkan irisan<br>• <strong>Weld</strong> - menggabungkan objek tanpa irisan<br>• <strong>Trim</strong> - memotong objek dengan objek lain<br>• <strong>Intersect</strong> - membuat objek dari irisan dua objek<br>• <strong>Simplify</strong> - objek depan memotong objek belakang<br>• <strong>Front Minus Back</strong> - objek depan terpotong objek belakang<br>• <strong>Back Minus Front</strong> - objek belakang terpotong objek depan<br>• <strong>Create Boundary</strong> - outline hasil gabungan objek",
        "📌 <strong>Fitur Pathfinder di Adobe Illustrator</strong><br><br>Mirip dengan Shaping di CorelDRAW:<br>• <strong>Unite</strong> (gabung)<br>• <strong>Minus Front</strong> (kurangi depan)<br>• <strong>Intersect</strong> (irisan)<br>• <strong>Exclude</strong> (gabung tanpa irisan<br>• <strong>Divide</strong> (bagi berdasarkan garis potong)<br>• <strong>Trim</strong> (potong)<br>• <strong>Merge</strong> (gabung)<br>• <strong>Crop</strong> (iris)<br>• <strong>Outline</strong> (outline)<br>• <strong>Minus Back</strong> (kurangi belakang)",
        "📌 <strong>Layer pada Photoshop</strong><br><br>Layer adalah lapisan terpisah untuk setiap elemen desain.<br><br><strong>✨ Fungsi Layer:</strong><br>• Memisahkan elemen desain (background terpisah dari objek)<br>• Mengatur urutan (z-order)<br>• Menerapkan efek non-destruktif<br>• Mengatur opacity (transparansi)<br>• Blending mode (cara layer berinteraksi)<br><br>📌 <strong>Shortcut Layer:</strong><br>Ctrl+Shift+N = Layer baru, Ctrl+J = Duplikat, Ctrl+E = Merge"
    ]},
    4: { title: "📦 Contoh Rancangan Komputer Grafis", slides: [
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #c084fc; margin-bottom: 15px;">☕ 1. MUG</h3>
                <p><strong>📏 Ukuran standar:</strong> 8cm x 20cm</p>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator, Photoshop</p>
                <p><strong>📋 Langkah:</strong> Buat lembar kerja ukuran 8x20 cm, desain dengan gambar dan teks, ekspor ke JPEG/PNG untuk dicetak</p>
                <p style="margin-top: 15px; color: #a78bfa;">✨ Tips: Gunakan resolusi tinggi minimal 300 DPI untuk hasil cetak maksimal ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="mug.png" alt="Desain Mug" style="max-width: 100%; border-radius: 16px;">
                    <p style="color: #c084fc; margin-top: 10px;">✨ Contoh Desain Mug ✨</p>
                </div>
            </div>
        </div>`,
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #c084fc; margin-bottom: 15px;">🏷️ 2. LOGO</h3>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator (VEKTOR wajib!)</p>
                <p><strong>📋 Langkah:</strong> Tentukan konsep, buat sketsa, gunakan shape tool, gabungkan dengan fitur Weld/Trim/Intersect, beri warna gradasi, tambahkan tipografi</p>
                <p style="margin-top: 15px; color: #a78bfa;">✨ Tips: Simpan file master dalam format .CDR/.AI untuk keperluan edit nanti ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="logoo.png" alt="Desain Logo" style="max-width: 100%; border-radius: 16px;">
                    <p style="color: #c084fc; margin-top: 10px;">✨ Contoh Desain Logo ✨</p>
                </div>
            </div>
        </div>`,
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #c084fc; margin-bottom: 15px;">📦 3. PACKAGING (KEMASAN)</h3>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator</p>
                <p><strong>📋 Langkah:</strong> Desain pola kemasan, beri warna gradient, tambahkan PowerClip Inside untuk memasukkan gambar pendukung, tambahkan keterangan produk</p>
                <p style="margin-top: 15px; color: #a78bfa;">✨ Tips: Perhatikan struktur lipatan kemasan agar desain tidak terpotong saat dicetak ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="kemasan.png" alt="Desain Packaging" style="max-width: 100%; border-radius: 16px;">
                    <p style="color: #c084fc; margin-top: 10px;">✨ Contoh Desain Kemasan ✨</p>
                </div>
            </div>
        </div>`,
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #c084fc; margin-bottom: 15px;">💳 4. KARTU NAMA</h3>
                <p><strong>📏 Ukuran standar:</strong> 9cm x 6cm</p>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator, Photoshop</p>
                <p><strong>📋 Langkah:</strong> Buat persegi 9x6 cm, beri warna, tambahkan teks (nama, jabatan, kontak), tambahkan logo dan ikon sosial media</p>
                <p style="margin-top: 15px; color: #a78bfa;">✨ Tips: Gunakan warna yang kontras agar teks mudah dibaca ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="kartunama.png" alt="Desain Kartu Nama" style="max-width: 100%; border-radius: 16px;">
                    <p style="color: #c084fc; margin-top: 10px;">✨ Contoh Desain Kartu Nama ✨</p>
                </div>
            </div>
        </div>`
    ]}
};

let currentMateri = 1, currentSlide = 0, totalSlides = 0;

function openMateri(id) {
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
    if(slideContent && slideCounter) {
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
    { q: "Software desain grafis berbasis vektor yang populer di Indonesia?", o: ["Photoshop", "CorelDRAW", "GIMP", "Paint"], a: 1 },
    { q: "Kepanjangan dari dpi (satuan resolusi bitmap) adalah?", o: ["Dots per inch", "Data per inch", "Digital pixel", "Draw per inch"], a: 0 },
    { q: "Format bitmap yang mendukung latar belakang transparan adalah?", o: ["JPEG", "BMP", "PNG", "TIFF"], a: 2 },
    { q: "Fitur di CorelDRAW untuk menggabungkan objek tanpa irisan disebut?", o: ["Trim", "Intersect", "Weld", "Simplify"], a: 2 },
    { q: "Adobe Illustrator termasuk jenis software?", o: ["Bitmap", "Vektor", "Video", "3D"], a: 1 },
    { q: "Software vektor gratis dan open source adalah?", o: ["Photoshop", "CorelDRAW", "Inkscape", "Paint"], a: 2 },
    { q: "Kelebihan gambar bitmap adalah?", o: ["Scalable", "Gradasi halus", "Ukuran kecil", "Tidak pecah"], a: 1 },
    { q: "Gambar vektor tersusun dari?", o: ["Piksel", "Garis & kurva", "Titik warna", "Grid"], a: 1 },
    { q: "Software bitmap yang paling populer adalah?", o: ["CorelDRAW", "Illustrator", "Photoshop", "Inkscape"], a: 2 },
    { q: "Fitur PowerClip di CorelDRAW berguna untuk?", o: ["Memotong", "Menggabungkan", "Memasukkan gambar ke bentuk", "Mewarnai"], a: 2 },
    { q: "Layer di Photoshop berfungsi untuk?", o: ["Mengatur lapisan", "Mengatur warna", "Mengatur ukuran", "Mengatur filter"], a: 0 },
    { q: "Format file asli CorelDRAW adalah?", o: ["AI", "PSD", "CDR", "SVG"], a: 2 },
    { q: "Format file asli Adobe Illustrator adalah?", o: ["AI", "CDR", "PSD", "JPEG"], a: 0 },
    { q: "Ukuran standar kartu nama adalah?", o: ["9x6 cm", "10x8 cm", "A4", "A5"], a: 0 },
    { q: "Ukuran standar desain mug adalah?", o: ["5x10 cm", "8x20 cm", "10x15 cm", "A4"], a: 1 },
    { q: "Fitur Pathfinder di Illustrator yang berfungsi menggabungkan objek?", o: ["Minus Front", "Intersect", "Unite", "Divide"], a: 2 },
    { q: "Resolution dependent berarti kualitas gambar?", o: ["Tergantung resolusi", "Tidak tergantung resolusi", "Selalu bagus", "Selalu pecah"], a: 0 }
];

let userAnswers = [];

function startQuiz() {
    userAnswers = new Array(20).fill(null);
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
    for(let i = 0; i < 20; i++) {
        if(userAnswers[i] === quizQuestions[i].a) score++;
    }
    let percent = (score/20)*100;
    let msg = percent >= 80 ? "🏆 Luar biasa! Anda menguasai materi Komputer Grafis!" : (percent >= 60 ? "👍 Bagus, tingkatkan lagi!" : "📖 Pelajari materi lebih lanjut.");
    const hasilScore = document.getElementById('hasil-score');
    if(hasilScore) {
        hasilScore.innerHTML = `<h2 style="color:#c084fc;">Skor: ${score}/20</h2><h1 style="color:#e0aaff;">${percent}%</h1><p style="color:#cdc4ff;">${msg}</p>`;
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
    "Jelaskan tentang CorelDRAW!", "Apa itu layer di Photoshop?", "Apa itu clipping mask?",
    "Perbedaan RGB dan CMYK?", "Apa itu file SVG?", "Cara membuat logo di CorelDRAW?"
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

async function sendChat() {
    let input = document.getElementById('chatInput');
    let msg = input.value.trim();
    if(!msg) return;
    
    let container = document.getElementById('chat-messages');
    let errorDiv = document.getElementById('errorMsg');
    if(errorDiv) errorDiv.style.display = 'none';
    
    // Tambah pesan user
    let userDiv = document.createElement('div');
    userDiv.className = 'bubble-user';
    userDiv.innerHTML = `<i class="fas fa-user"></i> ${escapeHtml(msg)}`;
    container.appendChild(userDiv);
    
    input.value = '';
    
    // Typing indicator
    let typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.style.display = 'block';
    typingDiv.innerHTML = '<span></span><span></span><span></span><span style="margin-left:10px;">🤖 AI sedang mengetik...</span>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: msg })
        });
        
        container.removeChild(typingDiv);
        
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server error');
        }
        
        const data = await response.json();
        
        let aiDiv = document.createElement('div');
        aiDiv.className = 'bubble-ai';
        aiDiv.innerHTML = `<i class="fab fa-google"></i> ${data.reply.replace(/\n/g, '<br>')}`;
        container.appendChild(aiDiv);
        
    } catch(error) {
        console.error('Error:', error);
        if(container.contains(typingDiv)) {
            container.removeChild(typingDiv);
        }
        
        if(errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `⚠️ Error: ${error.message}`;
        }
        
        let errorBubble = document.createElement('div');
        errorBubble.className = 'bubble-ai';
        errorBubble.innerHTML = `<i class="fab fa-google"></i> ⚠️ Maaf, terjadi kesalahan: ${error.message}`;
        container.appendChild(errorBubble);
    }
    
    container.scrollTop = container.scrollHeight;
}

// ==================== INITIALIZATION ====================
// Jalankan semua fungsi saat halaman siap
document.addEventListener('DOMContentLoaded', function() {
    createMovingDots();
    createBubbles();
    loadTemplates();
    loadUserData();
    updateApiStatus();
});
