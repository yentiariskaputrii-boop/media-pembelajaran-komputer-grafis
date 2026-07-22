// ==================== FILE: api/chat.js ====================
// Ini adalah BACKEND (serverless function) yang berjalan di Vercel
// API Key AMAN disimpan di sini, tidak terekspos ke publik

const SYSTEM_PROMPT = `Anda adalah asisten AI yang khusus menjawab pertanyaan tentang komputer grafis, bitmap, vektor, CorelDRAW, Photoshop, Illustrator, Inkscape, Figma, dan software desain lainnya. 
Jika pertanyaan pengguna tidak berkaitan dengan topik tersebut, Anda harus menjawab dengan teks: "Maaf, saya hanya dapat menjawab pertanyaan seputar komputer grafis, bitmap, vektor, CorelDRAW, Photoshop, Illustrator, Inkscape, Figma, atau software desain lainnya. Silakan tanyakan tentang materi tersebut." 
Jangan memberikan jawaban di luar topik yang diminta. 
Untuk pertanyaan yang sesuai topik, berikan jawaban yang panjang, detail, edukatif, dan informatif dalam bahasa Indonesia yang baik, sopan, dan mudah dipahami. Gunakan bullet points atau penomoran untuk memudahkan pembacaan.`;

export default async function handler(req, res) {
    // 1. Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 2. Ambil pesan dari pengguna
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
    }

    // 3. Ambil API Key dari Environment Variable (AMAN!)
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error('API Key tidak ditemukan di environment variables');
        return res.status(500).json({ 
            error: 'Konfigurasi server error. Silakan hubungi pengembang.' 
        });
    }

    // 4. URL API Gemini (menggunakan model yang stabil)
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    try {
        // 5. Panggil API Gemini dari server (bukan dari browser)
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: SYSTEM_PROMPT + "\n\nPertanyaan: " + message
                            }
                        ]
                    }
                ]
            })
        });

        // 6. Baca respons dari Gemini
        const data = await response.json();

        // 7. Cek apakah respons sukses
        if (!response.ok) {
            console.error('Gemini API Error:', data);
            throw new Error(data.error?.message || 'Gemini API error');
        }

        // 8. Ekstrak teks jawaban dari respons
        let aiReply = "Maaf, saya tidak bisa memproses pertanyaan Anda saat ini.";
        
        if (data.candidates && 
            data.candidates[0] && 
            data.candidates[0].content && 
            data.candidates[0].content.parts) {
            aiReply = data.candidates[0].content.parts[0].text;
        }

        // 9. Kirim balasan ke frontend
        res.status(200).json({ 
            success: true, 
            reply: aiReply 
        });

    } catch (error) {
        console.error('Error di /api/chat:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Terjadi kesalahan pada server' 
        });
    }
}
