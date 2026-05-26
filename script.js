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
let materiData = {
    1: { title: "BITMAP (Gambar Raster)", slides: [
        "<strong>Pengertian Bitmap</strong><br><br>Bitmap adalah gambar yang tersusun dari titik-titik warna yang disebut PIKSEL.",
        "<strong>Kelebihan Bitmap</strong><br><br>Gradasi warna halus, detail tinggi.",
        "<strong>Format File Bitmap</strong><br><br>JPEG, PNG, GIF, BMP, TIFF"
    ]},
    2: { title: "VEKTOR (Gambar Garis & Kurva)", slides: [
        "<strong>Pengertian Vektor</strong><br><br>Vektor adalah gambar tersusun dari garis dan kurva.",
        "<strong>Kelebihan Vektor</strong><br><br>Scalable tanpa batas, ukuran kecil.",
        "<strong>Format File Vektor</strong><br><br>AI, CDR, EPS, SVG, WMF"
    ]},
    3: { title: "Perangkat Lunak Desain Grafis", slides: [
        "<strong>Software Vektor</strong><br><br>CorelDRAW, Illustrator, Inkscape, Figma",
        "<strong>Software Bitmap</strong><br><br>Photoshop, GIMP, Krita, Photo-Paint",
        "<strong>Fitur Shaping CorelDRAW</strong><br><br>Weld, Trim, Intersect, Combine",
        "<strong>Layer Photoshop</strong><br><br>Layer adalah lapisan terpisah untuk setiap elemen desain"
    ]},
    4: { title: "Contoh Rancangan Komputer Grafis", slides: [
        "MUG - Ukuran 8x20 cm",
        "LOGO - Desain vektor",
        "PACKAGING - Desain kemasan",
        "KARTU NAMA - Ukuran 9x6 cm"
    ]}
};

let currentMateri = 1, currentSlide = 0, totalSlides = 0;

function openMateri(id) {
    if (!checkLogin()) return;
    currentMateri = id;
    currentSlide = 0;
    totalSlides = materiData[id].slides.length;
    let slideTitle = document.getElementById('slide-title');
    if(slideTitle) slideTitle.innerHTML = materiData[id].title;
    renderSlide();
    showPage('slide-materi');
}

function renderSlide() {
    let slideContent = document.getElementById('slide-content');
    let slideCounter = document.getElementById('slide-counter');
    if(slideContent && slideCounter && materiData[currentMateri]) {
        slideContent.innerHTML = '<div class="slide-card"><div class="slide-title">Slide ' + (currentSlide+1) + ' dari ' + totalSlides + '</div><div class="long-text">' + materiData[currentMateri].slides[currentSlide] + '</div></div>';
        slideCounter.innerHTML = (currentSlide+1) + ' / ' + totalSlides;
    }
}

function nextSlide() {
    if(currentSlide + 1 < totalSlides) {
        currentSlide++;
        renderSlide();
        let slideContent = document.getElementById('slide-content');
        if(slideContent) slideContent.scrollTop = 0;
    } else {
        alert("Selesai! Silakan pilih materi lain.");
    }
}

function prevSlide() {
    if(currentSlide > 0) {
        currentSlide--;
        renderSlide();
        let slideContent = document.getElementById('slide-content');
        if(slideContent) slideContent.scrollTop = 0;
    } else {
        alert("Ini slide pertama.");
    }
}

function backToMateriList() {
    showPage('materi-list');
}

// ==================== KUIS ====================
let quizQuestions = [
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
    for (let i = 0; i < quizQuestions.length; i++) {
        let q = quizQuestions[i];
        html += '<div style="margin-bottom:25px;"><div class="quiz-question">' + (i+1) + '. ' + q.q + '</div>';
        for (let j = 0; j < q.o.length; j++) {
            html += '<div class="quiz-option" onclick="selectAnswer(' + i + ',' + j + ')" id="q' + i + '_opt' + j + '">' + String.fromCharCode(65+j) + '. ' + q.o[j] + '</div>';
        }
        html += '</div>';
    }
    let quizContainer = document.getElementById('quiz-container');
    if(quizContainer) quizContainer.innerHTML = html;
    showPage('kuis');
}

function selectAnswer(qi, oi) {
    userAnswers[qi] = oi;
    for(let i = 0; i < 4; i++) {
        let el = document.getElementById('q' + qi + '_opt' + i);
        if(el) el.style.background = "rgba(255,255,255,0.06)";
    }
    let selectedEl = document.getElementById('q' + qi + '_opt' + oi);
    if(selectedEl) selectedEl.style.background = "linear-gradient(135deg,#7c3aed,#a78bfa)";
}

function submitQuiz() {
    let score = 0;
    for(let i = 0; i < quizQuestions.length; i++) {
        if(userAnswers[i] === quizQuestions[i].a) score++;
    }
    let percent = (score/quizQuestions.length)*100;
    let msg = percent >= 80 ? "Luar biasa!" : (percent >= 60 ? "Bagus!" : "Pelajari lagi.");
    let hasilScore = document.getElementById('hasil-score');
    if(hasilScore) {
        hasilScore.innerHTML = '<h2 style="color:#c084fc;">Skor: ' + score + '/' + quizQuestions.length + '</h2><h1 style="color:#e0aaff;">' + percent + '%</h1><p style="color:#cdc4ff;">' + msg + '</p>';
    }
    showPage('hasil');
}

// ==================== CHATBOX ====================
function updateApiStatus() {
    let statusDiv = document.getElementById('apiStatus');
    if (statusDiv) {
        statusDiv.innerHTML = 'Chat siap digunakan!';
        statusDiv.className = 'api-status status-ok';
    }
}

function escapeHtml(text) {
    let div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

let templateQuestions = [
    "Apa itu bitmap?", "Apa itu vektor?", "Perbedaan bitmap dan vektor?",
    "Jelaskan tentang CorelDRAW!", "Apa itu layer di Photoshop?"
];

function loadTemplates() {
    let cont = document.getElementById('templateContainer');
    if(cont) {
        cont.innerHTML = '';
        for(let i = 0; i < templateQuestions.length; i++) {
            let t = templateQuestions[i];
            let chip = document.createElement('div');
            chip.className = 'template-chip';
            chip.innerText = t.length > 28 ? t.substring(0,25)+'...' : t;
            chip.onclick = (function(question) {
                return function() {
                    let chatInput = document.getElementById('chatInput');
                    if(chatInput) chatInput.value = question;
                    sendChat();
                };
            })(t);
            cont.appendChild(chip);
        }
    }
}

function getReply(question) {
    let q = question.toLowerCase();
    if (q.indexOf('bitmap') !== -1) return "Bitmap adalah gambar tersusun dari piksel.";
    if (q.indexOf('vektor') !== -1) return "Vektor adalah gambar tersusun dari garis dan kurva.";
    if (q.indexOf('perbedaan') !== -1) return "Perbedaan: Bitmap (piksel), Vektor (garis/kurva).";
    if (q.indexOf('coreldraw') !== -1) return "CorelDRAW adalah software desain grafis vektor populer di Indonesia.";
    if (q.indexOf('layer') !== -1) return "Layer adalah lapisan terpisah untuk setiap elemen desain di Photoshop.";
    return "Saya asisten AI untuk materi Komputer Grafis.";
}

function sendChat() {
    let input = document.getElementById('chatInput');
    let msg = input.value.trim();
    if(!msg) return;
    
    let container = document.getElementById('chat-messages');
    let errorDiv = document.getElementById('errorMsg');
    if(errorDiv) errorDiv.style.display = 'none';
    
    let userDiv = document.createElement('div');
    userDiv.className = 'bubble-user';
    userDiv.innerHTML = '<i class="fas fa-user"></i> ' + escapeHtml(msg);
    container.appendChild(userDiv);
    
    input.value = '';
    
    let typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.style.display = 'block';
    typingDiv.innerHTML = '<span></span><span></span><span></span><span style="margin-left:10px;">AI sedang mengetik...</span>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    
    setTimeout(function() {
        container.removeChild(typingDiv);
        let reply = getReply(msg);
        let aiDiv = document.createElement('div');
        aiDiv.className = 'bubble-ai';
        aiDiv.innerHTML = '<i class="fab fa-google"></i> ' + reply.replace(/\n/g, '<br>');
        container.appendChild(aiDiv);
        container.scrollTop = container.scrollHeight;
    }, 500);
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
