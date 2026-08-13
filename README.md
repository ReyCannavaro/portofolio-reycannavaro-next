# 🏎️ Rey Cannavaro | Software Engineer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Selamat datang di *source code* portofolio pribadi saya. Dibangun dengan fokus pada kecepatan, skalabilitas, dan *Impact-Driven Copywriting*, portofolio ini mengusung estetika desain *Brutalist/Industrial* (terinspirasi dari BMW M) dengan perpaduan *glassmorphism* modern.

## ✨ Fitur Unggulan

- 🤖 **Nava (Personal AI Assistant)**: Chatbot pintar yang dilatih menggunakan data spesifik portofolio (pengalaman, proyek, *skill*). Dilengkapi dengan *Guardrails* tingkat tinggi untuk mencegah *prompt injection* dan obrolan di luar konteks.
- 📊 **Live GitHub Stats**: Integrasi langsung dengan GitHub API untuk menampilkan statistik *commit*, repositori, dan kontribusi. Dilengkapi mekanisme *fallback* dan *timeout* `AbortSignal` untuk mencegah *crash* saat API GitHub *down*.
- ⚡ **Progressive Disclosure**: Manajemen informasi *Information Overload* di bagian proyek. Menampilkan 6 proyek terbaik (*Hero* & *Grid*) secara *default*, dan membiarkan *recruiter* mengekspansi sisa proyek melalui interaksi tombol.
- 🏎️ **Brutalist / Industrial Aesthetic**: Menggunakan pendekatan *Vanilla CSS* dan *Tailwind* yang ketat (tanpa sekadar pakai komponen *ready-made*), memberikan nuansa *raw*, tegas, dan profesional layaknya *engineer* berpengalaman.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router & Turbopack)
- **Styling:** Tailwind CSS & Vanilla CSS (`globals.css`)
- **Language:** TypeScript
- **Icons:** Lucide React & React Icons
- **Deployment:** Vercel

## 🚀 Instalasi Lokal

Ingin menjalankan *project* ini secara lokal?

1. **Clone repository:**
   ```bash
   git clone https://github.com/ReyCannavaro/portofolio-reycannavaro-next.git
   ```

2. **Masuk ke direktori:**
   ```bash
   cd portofolio-reycannavaro-next
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment:**
   Buat file `.env.local` di root direktori dan tambahkan API Key untuk AI (Groq/Gemini) agar chatbot Nava bisa berjalan:
   ```env
   GROQ_API_KEY=your_api_key_here
   # atau
   GEMINI_API_KEY=your_api_key_here
   ```

5. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Akses `http://localhost:3000` di *browser*.

## 📁 Struktur Data

Semua data (Pengalaman, Pendidikan, Prestasi, dan Proyek) dipusatkan secara dinamis agar mudah di-*update* tanpa perlu membongkar komponen antarmuka:
- `src/app/data/index.ts` -> Pusat data portofolio (Profil, Skill, Proyek, Edukasi).
- `src/app/data/experience-ql.ts` -> Data spesifik untuk proyek-proyek *Enterprise* saat magang.

## 👨‍💻 Author

**Rey Cannavaro**
- GitHub: [@ReyCannavaro](https://github.com/ReyCannavaro)

---

*Dibuat dengan ❤️, logika kuat, dan fokus pada eksekusi teknis.*
