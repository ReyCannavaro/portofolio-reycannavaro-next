# REY CANNAVARO PORTFOLIO — STRATEGIC DEVELOPMENT ROADMAP

Dokumen perencanaan teknis dan pengembangan strategis untuk ekosistem website portofolio [reycannavaro.dev](https://reycannavaro.dev). Roadmap ini dirancang untuk memaksimalkan konversi recruiter, memperkuat visibilitas Google Knowledge Graph (SEO semantik), menyempurnakan branding visual saat link dibagikan, serta menyajikan kedalaman rekayasa perangkat lunak berskala enterprise.

---

## 1. DEVELOPMENT MATRIX & PRIORITIZATION

| Kode | Inisiatif Pengembangan | Kategori | Prioritas | Status | Dampak |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | Instant CV Download CTA & Automated Generator | Conversion & UX | P0 (Kritis) | COMPLETED | Sangat Tinggi |
| **P2** | Schema.org JSON-LD (Google Knowledge Graph) | Advanced SEO | P0 (Kritis) | COMPLETED | Sangat Tinggi |
| **P3** | Dedicated OpenGraph Social Banner (1200x630) | Brand Identity | P1 (Tinggi) | COMPLETED | Tinggi |
| **P4** | Flagship Architecture Deep-Dives (Case Studies)| Engineering Depth | P2 (Menengah) | COMPLETED | Tinggi |
| **P5** | Privacy-First Web Analytics & Speed Insights | Monitoring | P2 (Menengah) | COMPLETED | Menengah |

---

## 2. DETAILED ACTION PLANS

### PILAR 1: INSTANT CV DOWNLOAD CTA & AUTOMATED GENERATOR
**Tujuan:** Memberikan kemudahan 1-klik bagi tech recruiter, juri kompetisi, dan calon klien untuk mengunduh resume resmi tanpa harus menelusuri seluruh halaman.

#### Rincian Teknis & Alur Kerja:
1. **Pembaruan Script Generator CV:**
   - Script sumber: [scripts/generate-cv.js](file:///c:/Users/Rey%20Cannavaro/rey-portofolio/scripts/generate-cv.js).
   - Sinkronisasi data terbaru:
     - Posisi 2-tahap Quantum Leap (`Lead Tim HRIS - Magang Berbayar / Kontrak` dan `Fullstack Developer Intern`).
     - Prestasi baru: Juara 3 Nasional JHIC 2026, Top 10 Finalist MAGE 12 ITS, Juara 2 IBIK Bogor, Juara 1 Telkom University, Pramuka Penegak Garuda.
     - Proyek baru: SKOMDA Digital Gateway & UrbanGrow Smart Aquaponic.
   - Eksekusi generate PDF otomatis ke `public/Reyjuno_Al_Cannavaro_CV.pdf`.
2. **Integrasi UI Component:**
   - **Hero Section ([src/app/components/Hero.tsx](file:///c:/Users/Rey%20Cannavaro/rey-portofolio/src/app/components/Hero.tsx)):**
     Tambahkan tombol sekunder industrial di samping tombol `GET IN TOUCH`:
     ```tsx
     <a
       href="/Reyjuno_Al_Cannavaro_CV.pdf"
       target="_blank"
       rel="noopener noreferrer"
       className="btn-secondary"
       aria-label="Download Formal CV of Reyjuno Al Cannavaro"
     >
       DOWNLOAD RESUME ↓
     </a>
     ```
   - **Sidebar Navigation ([src/app/components/Sidebar.tsx](file:///c:/Users/Rey%20Cannavaro/rey-portofolio/src/app/components/Sidebar.tsx)):**
     Tambahkan ikon/link cepat `CV` di deretan menu navigasi samping.

---

### PILAR 2: SCHEMA.ORG JSON-LD (GOOGLE KNOWLEDGE GRAPH)
**Tujuan:** Membantu mesin perayap Google memahami secara presisi bahwa entitas "Reyjuno Al Cannavaro" adalah Software Engineer & Fullstack Developer yang bekerja di Quantum Leap dan terafiliasi dengan SMK Telkom Sidoarjo.

#### Rincian Teknis & Alur Kerja:
1. **Implementasi pada Root Layout ([src/app/layout.tsx](file:///c:/Users/Rey%20Cannavaro/rey-portofolio/src/app/layout.tsx)):**
   Tambahkan blok script structured data `application/ld+json`:
   ```tsx
   const jsonLd = {
     "@context": "https://schema.org",
     "@graph": [
       {
         "@type": "Person",
         "@id": "https://reycannavaro.dev/#person",
         "name": "Reyjuno Al Cannavaro",
         "alternateName": ["Rey Cannavaro", "Reyjuno Cannavaro"],
         "jobTitle": "Fullstack Developer & Software Engineer",
         "description": "Fullstack Developer and Technical Lead specializing in enterprise ERP/HRIS systems, climate-adaptive IoT, and predictive AI integration.",
         "url": "https://reycannavaro.dev",
         "image": "https://reycannavaro.dev/images/profile.png",
         "email": "mailto:reyjunoalcannavaro@gmail.com",
         "telephone": "+6282139531132",
         "address": {
           "@type": "PostalAddress",
           "addressLocality": "Sidoarjo",
           "addressRegion": "Jawa Timur",
           "addressCountry": "ID"
         },
         "worksFor": {
           "@type": "Organization",
           "name": "Quantum Leap (PT Qlcom Solusi Bisnis)",
           "url": "https://qlcom.co.id"
         },
         "alumniOf": {
           "@type": "EducationalOrganization",
           "name": "SMK Telkom Sidoarjo",
           "url": "https://smktelkom-sda.sch.id"
         },
         "sameAs": [
           "https://www.linkedin.com/in/reycannavaro",
           "https://github.com/ReyCannavaro",
           "https://instagram.com/reycannavaro"
         ],
         "knowsAbout": [
           "Full-Stack Development",
           "Next.js",
           "Laravel",
           "Vue.js",
           "TypeScript",
           "PostgreSQL",
           "IoT ESP32 FreeRTOS",
           "Predictive AI & Machine Learning"
         ],
         "award": [
           "Juara 3 Jagoan Hosting Innovation Competition (JHIC 2026)",
           "Top 10 Finalist IoT MAGE 12 ITS (2026)",
           "Juara 2 Web Design Competition Nasional IBIK Bogor (2026)",
           "Juara 1 LKTI Nasional Telkom University (2025)",
           "Pramuka Penegak Garuda Kwartir Cabang Sidoarjo (2025)"
         ]
       },
       {
         "@type": "WebSite",
         "@id": "https://reycannavaro.dev/#website",
         "url": "https://reycannavaro.dev",
         "name": "Reyjuno Al Cannavaro Official Portfolio",
         "publisher": { "@id": "https://reycannavaro.dev/#person" },
         "inLanguage": "id-ID"
       }
     ]
   };
   ```
2. **Validasi:** Uji struktur schema melalui Google Rich Results Test untuk memastikan status valid tanpa error/warning.

---

### PILAR 3: DEDICATED OPENGRAPH SOCIAL BANNER (1200x630)
**Tujuan:** Menghilangkan tampilan crop foto profil ketika tautan dibagikan ke WhatsApp, LinkedIn, Twitter/X, Telegram, atau Discord.

#### Spesifikasi Visual (BMW M Industrial Theme):
- **Dimensi:** 1200 x 630 pixel (Rasio standar 1.91:1 OpenGraph).
- **Background:** Dark Canvas (`#080808`) dengan aksen hairline grid industrial.
- **Top Bar:** BMW M Tricolor Stripe (Cyan `#0066B1`, Deep Blue `#001E50`, Red `#E00000`).
- **Elemen Teks Kiri:**
  - Label: `OFFICIAL ENGINEERING PORTFOLIO`
  - Headline: `REYJUNO AL CANNAVARO`
  - Subtitle: `Fullstack Developer & Software Engineer`
  - Badges: `ENTERPRISE ERP & HRIS` &middot; `CLIMATE-ADAPTIVE IOT` &middot; `PREDICTIVE AI`
- **Elemen Metrik Kanan:**
  - `10+ Production & High-Impact Projects`
  - `15+ National Awards & Leadership Honors`
  - `6 Active Enterprise HRIS Clients`
- **Penerapan File:**
  - Simpan di `public/og-image.png`.
  - Hubungkan di `src/app/layout.tsx`:
    ```ts
    openGraph: {
      images: [{ url: "https://reycannavaro.dev/og-image.png", width: 1200, height: 630, alt: "Reyjuno Al Cannavaro Portfolio" }]
    }
    ```

---

### PILAR 4: FLAGSHIP ARCHITECTURE DEEP-DIVES (CASE STUDIES)
**Tujuan:** Memberikan bukti nyata kedalaman teknis (*engineering mastery*) di balik proyek-proyek juara nasional, melengkapi case study Quantum Leap yang sudah ada di `/experience/quantum-leap`.

#### Target Proyek untuk Deep-Dive:
1. **UrbanGrow Smart Aquaponic (`/projects/urbangrow`):**
   - *Tantangan:* Fluktuasi suhu air dan pH akuaponik di iklim tropis yang mempengaruhi survival rate ikan nila dan pertumbuhan tanaman selada.
   - *Arsitektur Sistem:*
     - Hardware: Telemetri 6 sensor pada mikrokontroler ESP32 berbasis FreeRTOS multi-threading.
     - Ingestion & Storage: Server Bun & ElysiaJS berlatensi rendah dengan TimescaleDB time-series database.
     - Predictive Microservice: FastAPI & XGBoost untuk estimasi panen berdasarkan Growing Degree Days (GDD) dan regresi biomassa.
     - User Client: Web Next.js 16 (Turbopack) & Mobile App Flutter 3.
   - *Pencapaian:* Top 10 Finalist IoT MAGE 12 ITS.
2. **SKOMDA Digital Gateway (`/projects/skomda-gateway`):**
   - *Tantangan:* Menata ekosistem portal sekolah SMK Telkom Sidoarjo yang sebelumnya lambat dan terfragmentasi menjadi satu portal modern, modular, dan cepat.
   - *Peran:* Project Manager & Lead Frontend Developer.
   - *Arsitektur:* React, TypeScript, Tailwind CSS, Vite, Framer Motion, integrasi AI School Assistant.
   - *Pencapaian:* Juara 3 Nasional Jagoan Hosting Innovation Competition (JHIC 2026) dan live diimplementasikan pihak sekolah.

---

### PILAR 5: PRIVACY-FIRST WEB ANALYTICS & SPEED INSIGHTS
**Tujuan:** Memantau tren pengunjung riil pasca-indeks Google dan mengetahui efektivitas sebaran link di LinkedIn tanpa memperlambat performa web.

#### Solusi Implementasi:
- **Paket:** `@vercel/analytics` dan `@vercel/speed-insights`.
- **Kelebihan:**
  - Ringan (zero-runtime overhead, < 1 KB).
  - Tidak memerlukan cookie consent banner (GDPR-compliant).
  - Menyajikan metrik Core Web Vitals (LCP, FID, CLS) langsung di dashboard Vercel.
- **Pemasangan:**
  Di [src/app/layout.tsx](file:///c:/Users/Rey%20Cannavaro/rey-portofolio/src/app/layout.tsx):
  ```tsx
  import { Analytics } from "@vercel/analytics/react";
  import { SpeedInsights } from "@vercel/speed-insights/next";

  export default function RootLayout({ children }) {
    return (
      <html lang="id">
        <body>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    );
  }
  ```

---

## 3. EKSEKUSI & VERIFIKASI

Setiap implementasi dari pilar di atas wajib mematuhi standar kualitas berikut:
1. **Prinsip Desain BMW M Industrial:** Sudut tajam 0px, hairline dividers, aksen tricolor presisi, tipografi kontras tinggi, dan **bebas total dari emoticon/emoji**.
2. **Kualitas Kode:** Lulus uji `npm run lint` dan `npm run build` tanpa error atau warning.
3. **Responsive Mobile-First:** Semua komponen teruji sempurna di layar mobile (360px) hingga desktop ultra-wide (1920px).

---
*Dokumen ini diperbarui secara berkala seiring berjalannya siklus rilis dan pengembangan portofolio.*
