// ==================== FILE: script.js - WORKING WITH ONCLICK ====================

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
        userNameSpan.innerHTML = currentUser.name + ' (' + currentUser.class + ') - ' + currentUser.major;
    } else if (userNameSpan) {
        userNameSpan.innerHTML = '-';
    }
}

function doLogin() {
    console.log("doLogin dipanggil!");
    
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
    
    let loginName = document.getElementById('login-name');
    let loginClass = document.getElementById('login-class');
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
    if (page !== 'login' && !currentUser) {
        page = 'login';
    }
    
    let pages = ['login', 'home', 'profil', 'petunjuk', 'cp-atp', 'materi-list', 'slide-materi', 'video', 'kuis', 'hasil', 'chatbox'];
    for (let i = 0; i < pages.length; i++) {
        let el = document.getElementById(pages[i] + '-page');
        if (el) el.classList.remove('active');
    }
    let activePage = document.getElementById(page + '-page');
    if (activePage) activePage.classList.add('active');
    
    if (page === 'chatbox') {
        let cm = document.getElementById('chat-messages');
        if (cm) cm.scrollTop = cm.scrollHeight;
    }
}

// ==================== CREATE ANIMATIONS ====================
function createMovingDots() {
    let dotsContainer = document.getElementById('movingDots');
    if(dotsContainer && dotsContainer.children.length === 0) {
        for(let i = 0; i < 150; i++) {
            let dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.width = Math.random() * 6 + 2 + 'px';
            dot.style.height = dot.style.width;
            dot.style.animationDuration = Math.random() * 18 + 6 + 's';
            dot.style.animationDelay = Math.random() * 12 + 's';
            dot.style.background = 'rgba(' + (150 + Math.random() * 105) + ', ' + (100 + Math.random() * 155) + ', 255, ' + (0.4 + Math.random() * 0.5) + ')';
            dotsContainer.appendChild(dot);
        }
    }
}

function createBubbles() {
    let bubblesContainer = document.getElementById('bubbles');
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
            bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(' + (150 + Math.random() * 105) + ', ' + (100 + Math.random() * 155) + ', 255, 0.5), rgba(124, 58, 237, 0.2))';
            bubblesContainer.appendChild(bubble);
        }
    }
}

// ==================== VIDEO ====================
let videoUrls = {
    1: "https://www.youtube.com/embed/KHyJHUxFrlI",
    2: "https://www.youtube.com/embed/0G-DSZAwn5Y",
    3: "https://www.youtube.com/embed/QiGwpr8OfWE"
};

let videoTitles = {
    1: "Video 1: Pengertian Bitmap & Vektor",
    2: "Video 2: Pengertian CorelDraw",
    3: "Video 3: Pengertian Photoshop"
};

function playVideo(num) {
    let videoFrame = document.getElementById('videoFrame');
    let videoContainer = document.getElementById('videoContainer');
    let videoTitle = document.getElementById('videoTitle');
    
    if(videoFrame && videoContainer && videoTitle) {
        videoFrame.src = videoUrls[num];
        videoTitle.innerHTML = videoTitles[num];
        videoContainer.style.display = 'block';
        videoContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeVideo() {
    let videoFrame = document.getElementById('videoFrame');
    let videoContainer = document.getElementById('videoContainer');
    if(videoFrame && videoContainer) {
        videoFrame.src = '';
        videoContainer.style.display = 'none';
    }
}

// ==================== MATERI SLIDE ====================
const materiData = {
    1: { title: "🖼️ BITMAP (Gambar Raster)", slides: [
        `📌 <strong>Pengertian Bitmap</strong><br><br>
        Bitmap adalah gambar yang tersusun dari titik-titik warna yang disebut <strong style='color:#ffffff'>PIKSEL</strong>. 
        Setiap piksel memiliki lokasi dan warna tersendiri sehingga secara keseluruhan membentuk sebuah tampilan gambar.<br><br>
        
        <div style='text-align:center; margin:20px 0;'>
            <img src='bitmap.jpg' alt='Contoh Gambar Bitmap' 
                 style='width:280px; height:200px; object-fit:cover; border-radius:12px; border:2px solid #c084fc; box-shadow:0 5px 20px rgba(0,0,0,0.3);' 
                 onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
            <br><small style='color:#ffffff;'>Contoh gambar Bitmap - tersusun dari titik-titik piksel</small>
        </div><br>
        
        <strong>✨ Karakteristik Bitmap:</strong><br>
        • Tersusun dari kumpulan piksel<br>
        • Jika diperbesar akan terlihat kotak-kotak (pecah/pixelated)<br>
        • Ukuran file tergantung resolusi (semakin tinggi resolusi, semakin besar ukuran)<br>
        • Bersifat <strong>resolution dependent</strong> (kualitas tergantung DPI)<br>
        • Cocok untuk foto, gambar realistis, dan hasil scan`,
        
        `📌 <strong>Kelebihan Bitmap</strong><br><br>
        ✅ Gradasi warna sangat halus dan kompleks<br>
        ✅ Detail gambar tinggi pada resolusi yang cukup<br>
        ✅ Mampu menampilkan gambar secara nyata dan realistis<br>
        ✅ Didukung hampir semua software editing gambar<br><br>
        
        📌 <strong>Kekurangan Bitmap</strong><br><br>
        ❌ Pecah jika diperbesar melebihi ukuran aslinya<br>
        ❌ Ukuran file relatif besar<br>
        ❌ Sulit diedit bentuk objeknya<br>
        ❌ Resolution dependent (tergantung resolusi/DPI)`,
        
        `📌 <strong>Format File Bitmap yang umum digunakan:</strong><br><br>
        • <strong>JPEG/JPG</strong> - untuk foto digital, web, kompresi lossy<br>
        • <strong>PNG</strong> - mendukung transparansi, kualitas bagus<br>
        • <strong>GIF</strong> - mendukung animasi sederhana, 256 warna<br>
        • <strong>BMP</strong> - tanpa kompresi, ukuran sangat besar<br>
        • <strong>TIFF</strong> - kualitas tinggi untuk percetakan<br><br>
        
        📌 <strong>Software Bitmap:</strong><br>
        Adobe Photoshop, GIMP, Corel Photo-Paint, Krita, Microsoft Paint`
    ]},
    
    2: { title: "✏️ VEKTOR (Gambar Garis & Kurva)", slides: [
        `📌 <strong>Pengertian Vektor</strong><br><br>
        Vektor adalah gambar yang tersusun dari <strong style='color:#ffffff'>garis, kurva, dan titik (anchor point)</strong> 
        berdasarkan rumus matematika. Bukan dari piksel seperti bitmap.<br><br>
        
        <div style='text-align:center; margin:20px 0;'>
            <img src='vektorr.png' alt='Contoh Gambar Vektor' 
                 style='width:280px; height:180px; object-fit:contain; border-radius:12px; border:2px solid #c084fc; box-shadow:0 5px 20px rgba(0,0,0,0.3);' 
                 onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
            <br><small style='color:#ffffff;'>Contoh gambar Vektor - tersusun dari garis dan kurva</small>
        </div><br>
        
        <strong>✨ Karakteristik Vektor:</strong><br>
        • Tersusun dari garis dan kurva matematis<br>
        • <strong>Tidak pernah pecah</strong> meskipun diperbesar berkali-kali (scalable)<br>
        • Ukuran file kecil karena hanya menyimpan data matematika<br>
        • Bersifat <strong>resolution independent</strong> (tidak tergantung DPI)<br>
        • Mudah diedit (bentuk, warna, ukuran bisa diubah)`,
        
        `📌 <strong>Kelebihan Vektor</strong><br><br>
        ✅ Scalable tanpa batas - tidak pernah pecah<br>
        ✅ Ukuran file sangat kecil<br>
        ✅ Mudah dimodifikasi dan diedit<br>
        ✅ Hasil cetak profesional dan tajam<br>
        ✅ Resolution independent<br><br>
        
        📌 <strong>Kekurangan Vektor</strong><br><br>
        ❌ Kurang cocok untuk foto realistis (gradasi kompleks)<br>
        ❌ Membutuhkan keterampilan khusus (menguasai Pen Tool)<br>
        ❌ Tidak semua software editing mendukung file vektor`,
        
        `📌 <strong>Format File Vektor yang umum digunakan:</strong><br><br>
        • <strong>AI</strong> - Adobe Illustrator (standar industri)<br>
        • <strong>CDR</strong> - CorelDRAW (populer di percetakan Indonesia)<br>
        • <strong>EPS</strong> - format universal untuk percetakan<br>
        • <strong>SVG</strong> - untuk web, scalable, ringan<br>
        • <strong>WMF</strong> - Windows Metafile<br><br>
        
        📌 <strong>Software Vektor:</strong><br>
        CorelDRAW, Adobe Illustrator, Inkscape (gratis), Figma, FreeHand`
    ]},
    
    3: { title: "💻 Perangkat Lunak Desain Grafis", slides: [
    // SLIDE 1: Software VEKTOR dan BITMAP (RESPONSIF UNTUK HP)
    `<div style="padding: 10px;">
        <h3 style="color: #c084fc; margin-bottom: 20px; text-align: center; font-size: clamp(16px, 5vw, 22px);">📌 Software Berbasis VEKTOR</h3>
        
        <!-- Grid responsif: di HP 1 kolom, di tablet 2 kolom, di desktop 4 kolom -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 15px 0;">
            <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(167, 139, 250, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #7c3aed, #a78bfa); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="corell.png" alt="CorelDRAW" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>🎨</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">CorelDRAW</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Fitur Shaping &amp; PowerClip</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(167, 139, 250, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f5a623, #f5d142); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="ilustration.png" alt="Illustrator" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>✨</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">Illustrator</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Fitur Pathfinder &amp; Pen Tool</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(34, 170, 34, 0.2), rgba(85, 204, 85, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #22aa22, #55cc55); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="inscape.png" alt="Inkscape" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>🖌️</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">Inkscape</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Gratis &amp; Open Source</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(242, 78, 30, 0.2), rgba(255, 107, 61, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f24e1e, #ff6b3d); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="figma.png" alt="Figma" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>🎯</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">Figma</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">UI/UX &amp; Kolaborasi</p>
            </div>
        </div>
        
        <!-- Daftar dengan style responsif -->
        <ol style="margin: 15px 0; color: #e0d4ff; line-height: 1.8; background: rgba(0,0,0,0.3); padding: 12px 12px 12px 28px; border-radius: 14px; font-size: 12px;">
            <li><strong style="color: #c084fc;">CorelDRAW</strong> - Populer di Indonesia, fitur Shaping &amp; PowerClip</li>
            <li><strong style="color: #c084fc;">Adobe Illustrator</strong> - Standar industri, fitur Pathfinder &amp; Pen Tool</li>
            <li><strong style="color: #c084fc;">Inkscape</strong> - Gratis dan open source</li>
            <li><strong style="color: #c084fc;">Figma</strong> - Untuk desain UI/UX, kolaborasi real-time</li>
        </ol>
        
        <h3 style="color: #c084fc; margin: 25px 0 15px 0; text-align: center; font-size: clamp(16px, 5vw, 22px);">📌 Software Berbasis BITMAP</h3>
        
        <!-- Grid responsif untuk BITMAP -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 15px 0;">
            <div style="background: linear-gradient(135deg, rgba(49, 168, 255, 0.2), rgba(0, 136, 255, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #31A8FF, #0088ff); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="photoshop.png" alt="Photoshop" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>📷</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">Photoshop</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Layer &amp; Selection Tools</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(92, 45, 145, 0.2), rgba(124, 58, 237, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #5C2D91, #7c3aed); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="gimp.png" alt="GIMP" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>🎨</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">GIMP</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Gratis &amp; Open Source</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(59, 158, 255, 0.2), rgba(107, 181, 255, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b9eff, #6bb5ff); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="krita.png" alt="Krita" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>🖌️</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">Krita</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Digital Painting</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 136, 136, 0.1)); border-radius: 14px; padding: 12px 8px; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ff6b6b, #ff8888); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px auto;">
                    <img src="pp.png" alt="Corel Photo-Paint" style="width: 40px; height: 40px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;\'>🎨</span>'">
                </div>
                <h4 style="color: #c084fc; margin: 8px 0; font-size: 14px;">Photo-Paint</h4>
                <p style="font-size: 10px; color: #cdc4ff; margin: 0;">Software Bitmap Corel</p>
            </div>
        </div>
        
        <ol style="margin: 15px 0; color: #e0d4ff; line-height: 1.8; background: rgba(0,0,0,0.3); padding: 12px 12px 12px 28px; border-radius: 14px; font-size: 12px;">
            <li><strong style="color: #c084fc;">Adobe Photoshop</strong> - Paling populer, fitur Layer &amp; Selection Tools</li>
            <li><strong style="color: #c084fc;">GIMP</strong> - Gratis dan open source</li>
            <li><strong style="color: #c084fc;">Krita</strong> - Fokus digital painting</li>
            <li><strong style="color: #c084fc;">Corel Photo-Paint</strong> - Software bitmap dari Corel</li>
        </ol>
    </div>`,
    
    // SLIDE 2: Fitur Shaping di CorelDRAW (RESPONSIF)
    `<div style="padding: 10px;">
        <h3 style="color: #c084fc; margin-bottom: 15px; text-align: center; font-size: clamp(16px, 5vw, 22px);">📌 Fitur Shaping di CorelDRAW</h3>
        
        <div style="text-align:center; margin:15px 0; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 14px; overflow-x: auto;">
            <svg width="100%" max-width="280" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
                <rect width="300" height="120" fill="#1a1a2e"/>
                <rect x="30" y="30" width="50" height="50" fill="#c084fc" opacity="0.7"/>
                <rect x="70" y="40" width="50" height="50" fill="#a78bfa" opacity="0.7"/>
                <text x="130" y="60" fill="#c084fc" font-size="12">Weld (Gabung)</text>
                <rect x="180" y="30" width="50" height="50" fill="#c084fc"/>
                <rect x="220" y="55" width="50" height="30" fill="#ff6b6b"/>
                <text x="210" y="100" fill="#ff6b6b" font-size="11">Trim (Potong)</text>
            </svg>
            <br><small style="color:#a78bfa; font-size: 10px;">✨ Ilustrasi fitur Weld (gabung) dan Trim (potong)</small>
        </div>
        
        <!-- Grid 2 kolom responsif: di HP jadi 1 kolom -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 15px 0;">
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px 12px; border-radius: 12px; border-left: 3px solid #c084fc;">
                <strong style="color: #c084fc; font-size: 13px;">Combine</strong><br>
                <small style="color: #cdc4ff; font-size: 11px;">Menggabungkan objek, menghilangkan irisan</small>
            </div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px 12px; border-radius: 12px; border-left: 3px solid #c084fc;">
                <strong style="color: #c084fc; font-size: 13px;">Weld</strong><br>
                <small style="color: #cdc4ff; font-size: 11px;">Menggabungkan objek tanpa irisan</small>
            </div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px 12px; border-radius: 12px; border-left: 3px solid #c084fc;">
                <strong style="color: #c084fc; font-size: 13px;">Trim</strong><br>
                <small style="color: #cdc4ff; font-size: 11px;">Memotong objek dengan objek lain</small>
            </div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px 12px; border-radius: 12px; border-left: 3px solid #c084fc;">
                <strong style="color: #c084fc; font-size: 13px;">Intersect</strong><br>
                <small style="color: #cdc4ff; font-size: 11px;">Membuat objek dari irisan dua objek</small>
            </div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px 12px; border-radius: 12px; border-left: 3px solid #c084fc;">
                <strong style="color: #c084fc; font-size: 13px;">Simplify</strong><br>
                <small style="color: #cdc4ff; font-size: 11px;">Objek depan memotong objek belakang</small>
            </div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px 12px; border-radius: 12px; border-left: 3px solid #c084fc;">
                <strong style="color: #c084fc; font-size: 13px;">PowerClip</strong><br>
                <small style="color: #cdc4ff; font-size: 11px;">Memasukkan gambar ke dalam bentuk objek</small>
            </div>
        </div>
    </div>`,
    
    // SLIDE 3: Fitur Pathfinder di Adobe Illustrator (RESPONSIF)
    `<div style="padding: 10px;">
        <h3 style="color: #c084fc; margin-bottom: 15px; text-align: center; font-size: clamp(16px, 5vw, 22px);">📌 Fitur Pathfinder di Adobe Illustrator</h3>
        
        <div style="text-align:center; margin:15px 0; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 14px; overflow-x: auto;">
            <svg width="100%" max-width="280" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
                <rect width="300" height="120" fill="#1a1a2e"/>
                <circle cx="50" cy="50" r="30" fill="#c084fc" opacity="0.7"/>
                <rect x="50" y="30" width="50" height="50" fill="#a78bfa" opacity="0.7"/>
                <text x="120" y="60" fill="#c084fc" font-size="12">Unite (Gabung)</text>
                <circle cx="200" cy="50" r="30" fill="#c084fc"/>
                <rect x="230" y="60" width="40" height="20" fill="#ff6b6b"/>
                <text x="200" y="100" fill="#ff6b6b" font-size="11">Minus Front</text>
            </svg>
            <br><small style="color:#a78bfa; font-size: 10px;">✨ Ilustrasi fitur Unite (gabung) dan Minus Front (kurangi)</small>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 15px 0;">
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Unite</strong> <span style="font-size: 11px; color:#cdc4ff;">- Menggabungkan objek</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Minus Front</strong> <span style="font-size: 11px; color:#cdc4ff;">- Mengurangi objek depan</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Intersect</strong> <span style="font-size: 11px; color:#cdc4ff;">- Irisan objek</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Exclude</strong> <span style="font-size: 11px; color:#cdc4ff;">- Gabung tanpa irisan</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Divide</strong> <span style="font-size: 11px; color:#cdc4ff;">- Membagi berdasarkan garis potong</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Trim</strong> <span style="font-size: 11px; color:#cdc4ff;">- Memotong objek</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Merge</strong> <span style="font-size: 11px; color:#cdc4ff;">- Menggabungkan</span></div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px;"><strong style="color: #c084fc; font-size: 13px;">Crop</strong> <span style="font-size: 11px; color:#cdc4ff;">- Memotong/iris</span></div>
        </div>
    </div>`,
    
    // SLIDE 4: Layer pada Photoshop (RESPONSIF)
    `<div style="padding: 10px;">
        <h3 style="color: #c084fc; margin-bottom: 15px; text-align: center; font-size: clamp(16px, 5vw, 22px);">📌 Layer pada Photoshop</h3>
        
        <div style="text-align:center; margin:15px 0; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 14px; overflow-x: auto;">
            <svg width="100%" max-width="280" height="140" viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
                <rect width="300" height="140" fill="#1a1a2e"/>
                <rect x="20" y="20" width="60" height="40" fill="#c084fc" rx="5" opacity="0.8"/>
                <text x="50" y="45" text-anchor="middle" fill="white" font-size="10">Layer 1</text>
                <rect x="20" y="65" width="60" height="40" fill="#a78bfa" rx="5" opacity="0.8"/>
                <text x="50" y="90" text-anchor="middle" fill="white" font-size="10">Layer 2</text>
                <rect x="20" y="110" width="60" height="40" fill="#8b5cf6" rx="5" opacity="0.8"/>
                <text x="50" y="135" text-anchor="middle" fill="white" font-size="10">Layer 3</text>
                <text x="120" y="50" fill="#c084fc" font-size="12">📚 Layer adalah lapisan terpisah</text>
                <text x="120" y="70" fill="#a78bfa" font-size="11">Setiap elemen punya</text>
                <text x="120" y="90" fill="#a78bfa" font-size="11">layer sendiri</text>
            </svg>
            <br><small style="color:#a78bfa; font-size: 10px;">✨ Ilustrasi Layer di Photoshop</small>
        </div>
        
        <p style="color: #e0d4ff; text-align: center; font-size: 13px;">Layer adalah lapisan terpisah untuk setiap elemen desain.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 15px 0;">
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px; font-size: 12px;">✅ Memisahkan elemen desain</div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px; font-size: 12px;">✅ Mengatur urutan (z-order)</div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px; font-size: 12px;">✅ Menerapkan efek non-destruktif</div>
            <div style="background: rgba(192, 132, 252, 0.1); padding: 10px; border-radius: 10px; font-size: 12px;">✅ Mengatur opacity (transparansi)</div>
        </div>
        
        <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 12px; margin-top: 15px;">
            <strong style="color: #c084fc; font-size: 13px;">📌 Shortcut Layer:</strong><br>
            <span style="color: #cdc4ff; font-size: 12px;">Ctrl+Shift+N = Layer baru</span><br>
            <span style="color: #cdc4ff; font-size: 12px;">Ctrl+J = Duplikat layer</span><br>
            <span style="color: #cdc4ff; font-size: 12px;">Ctrl+E = Merge layer</span>
        </div>
    </div>`
]},
    
    4: { title: "📦 Contoh Rancangan Komputer Grafis", slides: [
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #ffffff; margin-bottom: 15px;">☕ 1. MUG</h3>
                <p><strong>📏 Ukuran standar:</strong> 8cm x 20cm</p>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator, Photoshop</p>
                <p><strong>📋 Langkah:</strong> Buat lembar kerja ukuran 8x20 cm, desain dengan gambar dan teks, ekspor ke JPEG/PNG untuk dicetak</p>
                <p style="margin-top: 15px; color: #ffffff;">✨ Tips: Gunakan resolusi tinggi minimal 300 DPI untuk hasil cetak maksimal ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="mug.png" alt="Desain Mug" 
                         style="max-width: 100%; border-radius: 16px; border:2px solid #c084fc;"
                         onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <p style="color: #ffffff; margin-top: 10px;">✨ Contoh Desain Mug ✨</p>
                </div>
            </div>
        </div>`,
        
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #ffffff; margin-bottom: 15px;">🏷️ 2. LOGO</h3>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator (VEKTOR wajib!)</p>
                <p><strong>📋 Langkah:</strong> Tentukan konsep, buat sketsa, gunakan shape tool, gabungkan dengan fitur Weld/Trim/Intersect, beri warna gradasi, tambahkan tipografi</p>
                <p style="margin-top: 15px; color: #ffffff;">✨ Tips: Simpan file master dalam format .CDR/.AI untuk keperluan edit nanti ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="logoo.png" alt="Desain Logo" 
                         style="max-width: 100%; border-radius: 16px; border:2px solid #c084fc;"
                         onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <p style="color: #ffffff; margin-top: 10px;">✨ Contoh Desain Logo ✨</p>
                </div>
            </div>
        </div>`,
        
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #ffffff; margin-bottom: 15px;">📦 3. PACKAGING (KEMASAN)</h3>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator</p>
                <p><strong>📋 Langkah:</strong> Desain pola kemasan, beri warna gradient, tambahkan PowerClip Inside untuk memasukkan gambar pendukung, tambahkan keterangan produk</p>
                <p style="margin-top: 15px; color: #ffffff;">✨ Tips: Perhatikan struktur lipatan kemasan agar desain tidak terpotong saat dicetak ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="kemasan.png" alt="Desain Packaging" 
                         style="max-width: 100%; border-radius: 16px; border:2px solid #c084fc;"
                         onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <p style="color: #ffffff; margin-top: 10px;">✨ Contoh Desain Kemasan ✨</p>
                </div>
            </div>
        </div>`,
        
        `<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
                <h3 style="color: #ffffff; margin-bottom: 15px;">💳 4. KARTU NAMA</h3>
                <p><strong>📏 Ukuran standar:</strong> 9cm x 6cm</p>
                <p><strong>💻 Software:</strong> CorelDRAW, Illustrator, Photoshop</p>
                <p><strong>📋 Langkah:</strong> Buat persegi 9x6 cm, beri warna, tambahkan teks (nama, jabatan, kontak), tambahkan logo dan ikon sosial media</p>
                <p style="margin-top: 15px; color: #ffffff;">✨ Tips: Gunakan warna yang kontras agar teks mudah dibaca ✨</p>
            </div>
            <div style="flex: 1; text-align: center;">
                <div class="slide-img">
                    <img src="kartunama.png" alt="Desain Kartu Nama" 
                         style="max-width: 100%; border-radius: 16px; border:2px solid #c084fc;"
                         onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <p style="color: #ffffff; margin-top: 10px;">✨ Contoh Desain Kartu Nama ✨</p>
                </div>
            </div>
        </div>`
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
    if (!checkLogin()) return;
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
// ==================== BACKSOUND ====================
function initBacksound() {
    audioElement = document.getElementById('backsound');
    if (audioElement) {
        audioElement.volume = 0.3;
        let musicPlayed = localStorage.getItem('musicPlayed');
        if (musicPlayed === 'true') {
            toggleMusic();
        }
        audioElement.addEventListener('ended', function() {
            if (isMusicPlaying) {
                audioElement.play();
            }
        });
        audioElement.addEventListener('error', function(e) {
            console.error('Error playing audio:', e);
            updateMusicButtonUI(false);
            localStorage.setItem('musicPlayed', 'false');
        });
    }
}

function toggleMusic() {
    if (!audioElement) {
        audioElement = document.getElementById('backsound');
        if (!audioElement) {
            console.error('Audio element not found!');
            return;
        }
    }
    
    if (isMusicPlaying) {
        audioElement.pause();
        isMusicPlaying = false;
        updateMusicButtonUI(false);
        localStorage.setItem('musicPlayed', 'false');
    } else {
        let playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                isMusicPlaying = true;
                updateMusicButtonUI(true);
                localStorage.setItem('musicPlayed', 'true');
            }).catch(function(error) {
                console.error('Playback failed:', error);
                updateMusicButtonUI(false);
            });
        }
    }
}

function updateMusicButtonUI(isPlaying) {
    let btn = document.getElementById('musicToggleBtn');
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
    console.log('Aplikasi dimulai...');
    
    createMovingDots();
    createBubbles();
    loadTemplates();
    loadUserData();
    updateApiStatus();
    initBacksound();
    
    // Event listener untuk tombol Enter pada form login (tambahan, tidak menggantikan onclick)
    let loginName = document.getElementById('login-name');
    let loginClass = document.getElementById('login-class');
    
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
    
    console.log('Aplikasi siap! Login menggunakan onclick="doLogin()"');
});
