const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const photoPath = path.join(__dirname, "../src/assets/profile.JPG");
const photoBase64 = fs.readFileSync(photoPath).toString("base64");
const photoDataUri = `data:image/jpeg;base64,${photoBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CV - Reyjuno Al Cannavaro</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 11mm 8mm 11mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      line-height: 1.35;
      font-size: 8.8pt;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    a {
      color: #0f4c81;
      text-decoration: none;
    }

    /* HEADER */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f4c81;
      padding-bottom: 8px;
      margin-bottom: 8px;
      gap: 14px;
    }

    .header-left {
      flex: 1;
    }

    .name-title {
      font-size: 19pt;
      font-weight: 800;
      color: #0b2545;
      letter-spacing: -0.02em;
      line-height: 1.1;
      text-transform: uppercase;
    }

    .alias {
      font-size: 10pt;
      color: #0f4c81;
      font-weight: 700;
      letter-spacing: 0.5px;
      display: inline-block;
      margin-left: 6px;
    }

    .headline {
      font-size: 9.5pt;
      font-weight: 600;
      color: #475569;
      margin-top: 2px;
    }

    .contact-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 3px 12px;
      margin-top: 5px;
      font-size: 8.2pt;
      color: #334155;
    }

    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .header-photo {
      width: 72px;
      height: 92px;
      object-fit: cover;
      object-position: top center;
      border-radius: 3px;
      border: 1.5px solid #cbd5e1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      flex-shrink: 0;
    }

    /* SECTION */
    .section {
      margin-bottom: 7.5px;
    }

    .section-title {
      font-size: 9.2pt;
      font-weight: 800;
      color: #0b2545;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
      margin-bottom: 4.5px;
      display: flex;
      align-items: center;
    }

    .section-title::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #e2e8f0;
      margin-left: 8px;
    }

    /* ENTRY ITEMS */
    .entry {
      margin-bottom: 5px;
    }

    .entry:last-child {
      margin-bottom: 0;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.8pt;
    }

    .entry-title {
      font-weight: 700;
      color: #0f172a;
    }

    .entry-title .company {
      color: #0f4c81;
    }

    .entry-date {
      font-size: 8pt;
      font-weight: 600;
      color: #64748b;
      white-space: nowrap;
    }

    .entry-sub {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.2pt;
      color: #334155;
      font-weight: 500;
      margin-top: 0.5px;
      margin-bottom: 2px;
    }

    .entry-sub .role {
      font-style: italic;
      color: #1e293b;
      font-weight: 600;
    }

    .entry-sub .location {
      font-size: 8pt;
      color: #64748b;
    }

    ul.bullet-list {
      list-style-type: disc;
      padding-left: 14px;
      margin-top: 1px;
    }

    ul.bullet-list li {
      font-size: 8.3pt;
      color: #334155;
      margin-bottom: 1.5px;
      line-height: 1.32;
      text-align: justify;
    }

    ul.bullet-list li strong {
      color: #0f172a;
    }

    /* SKILLS */
    .skills-grid {
      display: grid;
      grid-template-columns: 125px 1fr;
      gap: 2.5px 8px;
      font-size: 8.3pt;
      line-height: 1.3;
    }

    .skill-cat {
      font-weight: 700;
      color: #0b2545;
    }

    .skill-items {
      color: #334155;
    }

    /* SUMMARY */
    .summary-text {
      font-size: 8.4pt;
      color: #334155;
      line-height: 1.36;
      text-align: justify;
    }

    /* PROJECTS 2-COL COMPACT */
    .projects-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.5pt;
    }

    .project-name {
      font-weight: 700;
      color: #0f172a;
    }

    .project-tech {
      font-size: 7.8pt;
      color: #0f4c81;
      font-weight: 600;
    }

    .project-desc {
      font-size: 8.1pt;
      color: #334155;
      line-height: 1.3;
      margin-top: 1px;
      text-align: justify;
    }

    /* TWO COLUMN */
    .two-col-section {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 12px;
      margin-bottom: 7.5px;
    }

    .award-item {
      font-size: 8pt;
      margin-bottom: 2.5px;
      line-height: 1.28;
      color: #334155;
    }

    .award-item strong {
      color: #0f172a;
    }

    .lead-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 10px;
      font-size: 8pt;
      line-height: 1.28;
    }

    .lead-item strong {
      color: #0f172a;
    }

    .lead-item span {
      color: #475569;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="header-left">
      <div>
        <span class="name-title">Reyjuno Al Cannavaro</span>
        <span class="alias">(Rey Cannavaro)</span>
      </div>
      <div class="headline">Fullstack Developer & Software Engineer | Enterprise ERP & Web Solutions</div>
      
      <div class="contact-grid">
        <span class="contact-item">Sidoarjo, Indonesia</span>
        <span class="contact-item"><a href="mailto:reyjunoalcannavaro@gmail.com">reyjunoalcannavaro@gmail.com</a></span>
        <span class="contact-item"><a href="tel:+6282139531132">+62 821 3953 1132</a></span>
        <span class="contact-item"><a href="https://reycannavaro.dev" target="_blank">reycannavaro.dev</a></span>
        <span class="contact-item"><a href="https://linkedin.com/in/reycannavaro" target="_blank">linkedin.com/in/reycannavaro</a></span>
        <span class="contact-item"><a href="https://github.com/ReyCannavaro" target="_blank">github.com/ReyCannavaro</a></span>
      </div>
    </div>
    <img src="${photoDataUri}" alt="Foto Profil Formal Reyjuno Al Cannavaro" class="header-photo">
  </header>

  <!-- PROFESSIONAL SUMMARY -->
  <section class="section">
    <h2 class="section-title">Ringkasan Profesional</h2>
    <p class="summary-text">
      <strong>Fullstack Developer & Software Engineer</strong> dengan keahlian praktis dalam rekayasa perangkat lunak berskala enterprise, arsitektur ERP & HRIS, serta sistem web dan IoT/AI modern. Berpengalaman memimpin tim teknis dalam <em>development</em> dan <em>maintenance</em> untuk <strong>6 sistem HRIS aktif</strong> di berbagai perusahaan klien enterprise serta merancang sistem ERP inventori ritel dan platform real estate. Berorientasi pada <em>clean architecture</em>, performa database tinggi, dan pemecahan masalah end-to-end yang terbukti lewat pencapaian Juara 3 Nasional JHIC 2026, Top 10 Finalist IoT MAGE 12 ITS, Juara 2 Web Design Nasional, dan Juara 1 LKTI Nasional.
    </p>
  </section>

  <!-- WORK EXPERIENCE -->
  <section class="section">
    <h2 class="section-title">Pengalaman Kerja</h2>

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title"><span class="company">Quantum Leap</span> (PT Qlcom Solusi Bisnis)</span>
        <span class="entry-date">Mei 2026 – Februari 2027</span>
      </div>
      <div class="entry-sub">
        <span class="role">Lead Tim HRIS (Contracted) & Fullstack Developer Intern</span>
        <span class="location">Sidoarjo, Indonesia</span>
      </div>
      <ul class="bullet-list">
        <li><strong>Agustus 2026 – Februari 2027 (Lead Tim HRIS - Magang Berbayar / Kontrak):</strong> Resmi dikontrak berbayar dan dipercaya memimpin tim teknis dalam pengembangan serta pemeliharaan harian (maintenance) sistem HRIS untuk 6 perusahaan klien enterprise aktif (Temprina - Jawa Pos Group, MSC, Pabrik Kilang Padi, PT Budi Jaya, MIA, BBS).</li>
        <li><strong>Stabilitas & Database Optimization:</strong> Mengoptimalkan query database relasional yang menangani ribuan entri data karyawan, memastikan proses absensi dinamis dan payroll bulanan berjalan akurat dengan <em>zero downtime</em>.</li>
        <li><strong>Kustomisasi Modul Klien:</strong> Menyesuaikan aturan shift kerja pabrik dinamis, validasi lembur, dan manajemen cuti sesuai regulasi ketenagakerjaan internal masing-masing mitra industri.</li>
        <li><strong>Mei 2026 – Juli 2026 (Fullstack Developer Intern - Magang Reguler):</strong> Terlibat dalam rekayasa modul operasional utama pada ERP Bos Baut (PT Hutomo Baut Indonesia) menggunakan Vue.js, Express.js, PostgreSQL, serta platform operasional real estate Mansion Nine (Nuxt.js).</li>
      </ul>
    </div>
  </section>

  <!-- TECHNICAL SKILLS -->
  <section class="section">
    <h2 class="section-title">Keahlian Teknis</h2>
    <div class="skills-grid">
      <div class="skill-cat">Bahasa Pemrograman:</div>
      <div class="skill-items">TypeScript, JavaScript, PHP, Python, SQL, MicroPython, HTML5, CSS3</div>

      <div class="skill-cat">Frontend:</div>
      <div class="skill-items">Next.js (App Router), React, Vue.js, Nuxt.js, Tailwind CSS, Alpine.js</div>

      <div class="skill-cat">Backend:</div>
      <div class="skill-items">Laravel 11, Express.js, Node.js, Hono.js, RESTful API Development</div>

      <div class="skill-cat">Database & Storage:</div>
      <div class="skill-items">PostgreSQL, MySQL, Supabase, Prisma ORM, MongoDB, Firebase</div>

      <div class="skill-cat">Tools & AI/IoT:</div>
      <div class="skill-items">Git, GitHub, Docker, Postman, Filament Admin, Google Gemini API, RAG System, ESP32</div>
    </div>
  </section>

  <!-- KEY PROJECTS -->
  <section class="section">
    <h2 class="section-title">Proyek Unggulan</h2>
    <div class="projects-container">

      <div class="entry">
        <div class="project-header">
          <span class="project-name">UrbanGrow Smart Aquaponic — IoT &amp; Predictive AI Ecosystem</span>
          <span class="project-tech">Next.js 16, Flutter 3, Bun, ElysiaJS, FastAPI, XGBoost, TimescaleDB, ESP32 FreeRTOS</span>
        </div>
        <p class="project-desc">
          Ekosistem akuaponik adaptif iklim berbasis IoT mikrokontroler ESP32 FreeRTOS dan microservice analitik FastAPI XGBoost untuk prediksi biomassa dan estimasi panen. Backend Bun &amp; ElysiaJS terintegrasi basis data time-series TimescaleDB, dashboard Next.js 16, serta aplikasi mobile Flutter 3. Meraih Top 10 Finalist MAGE 12 ITS.
        </p>
      </div>

      <div class="entry">
        <div class="project-header">
          <span class="project-name">SKOMDA Digital Gateway — Official Institutional Portal</span>
          <span class="project-tech">React, TypeScript, Tailwind CSS, Vite, AI Assistant, Framer Motion</span>
        </div>
        <p class="project-desc">
          Memimpin tim sebagai Project Manager &amp; Lead Frontend Developer dalam merancang ulang portal ekosistem resmi SMK Telkom Sidoarjo. Mengembangkan arsitektur antarmuka modular, cepat, dan terintegrasi asisten AI. Meraih Juara 3 Nasional JHIC 2026 dan resmi diimplementasikan pihak sekolah. <em>(chevron.smktelkom-sda.sch.id)</em>
        </p>
      </div>

      <div class="entry">
        <div class="project-header">
          <span class="project-name">Medibot — AI-Powered Healthcare Assistant</span>
          <span class="project-tech">Laravel 11, Google Gemini API, RAG Architecture, PostgreSQL</span>
        </div>
        <p class="project-desc">
          Chatbot konsultasi kesehatan cerdas berbasis Retrieval-Augmented Generation (RAG). Mengekstraksi dokumen panduan medis statis menjadi basis pengetahuan dinamis untuk menyajikan respons medis awal yang akurat dan berbasis rujukan ilmiah terpercaya.
        </p>
      </div>

      <div class="entry">
        <div class="project-header">
          <span class="project-name">SIRA — Socratic Interactive RPG Academy</span>
          <span class="project-tech">Next.js, TypeScript, Supabase, Tailwind CSS</span>
        </div>
        <p class="project-desc">
          Game RPG edukasional berbasis web yang memadukan studi kasus pemecahan masalah interaktif dengan metode dialog Sokrates. Terintegrasi dengan Supabase untuk sinkronisasi state dan progres pemain secara real-time. <em>(sira-wine.vercel.app)</em>
        </p>
      </div>

    </div>
  </section>

  <!-- EDUCATION & HONORS -->
  <div class="two-col-section">
    <!-- EDUCATION -->
    <div>
      <h2 class="section-title">Pendidikan</h2>
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">SMK Telkom Sidoarjo</span>
          <span class="entry-date">2024 – 2027</span>
        </div>
        <div class="entry-sub">
          <span class="role">Sistem Informasi Jaringan & Aplikasi (SIJA)</span>
          <span class="location">Sidoarjo</span>
        </div>
        <ul class="bullet-list">
          <li>Fokus pada rekayasa perangkat lunak, arsitektur basis data, dan jaringan.</li>
          <li>Terpilih dalam <em>Digital Talent Program (Programmer)</em>.</li>
        </ul>
      </div>
    </div>

    <!-- HONORS & AWARDS -->
    <div>
      <h2 class="section-title">Penghargaan & Prestasi</h2>
      <div class="award-item"><strong>Top 10 Finalist IoT MAGE 12</strong> — Institut Teknologi Sepuluh Nopember (2026)</div>
      <div class="award-item"><strong>Juara 3 Jagoan Hosting Innovation Competition</strong> — Jagoan Hosting (2026)</div>
      <div class="award-item"><strong>Juara 2 Web Design Competition Nasional</strong> — IBIK Bogor (2026)</div>
      <div class="award-item"><strong>Juara 1 LKTI Nasional</strong> — Telkom University (2025)</div>
      <div class="award-item"><strong>Pramuka Penegak Garuda</strong> — Tingkat Tertinggi, Kwarcab Sidoarjo (2025)</div>
      <div class="award-item"><strong>Juara 2 Lomba Prestasi Penegak (LPP)</strong> — DKC Sidoarjo (2025)</div>
      <div class="award-item"><strong>Paskibraka Kecamatan Sidoarjo</strong> — HUT RI ke-79 (2024)</div>
    </div>
  </div>

  <!-- LEADERSHIP -->
  <section class="section" style="margin-bottom: 0;">
    <h2 class="section-title">Pengalaman Kepemimpinan & Organisasi</h2>
    <div class="lead-grid">
      <div class="lead-item">
        <strong>Pradana Putra Dewan Ambalan</strong> — SMK Telkom Sidoarjo <em>(2025)</em><br>
        <span>Memimpin program kerja operasional kepramukaan dan koordinasi struktural sekolah.</span>
      </div>
      <div class="lead-item">
        <strong>Sekretaris OSIS</strong> — SMK Telkom Sidoarjo <em>(2025)</em><br>
        <span>Mendigitalisasi tata kelola arsip persuratan dan administrasi organisasi secara terpusat.</span>
      </div>
      <div class="lead-item">
        <strong>Sekretaris Diesnatalis ke-5 & ke-6</strong> — SMK Telkom Sidoarjo <em>(2024, 2025)</em><br>
        <span>Mengelola administrasi dan perizinan acara tahunan terbesar yang melibatkan ratusan peserta.</span>
      </div>
      <div class="lead-item">
        <strong>Pemangku Adat Putra Dewan Ambalan</strong> — SMK Telkom Sidoarjo <em>(2024)</em><br>
        <span>Mengawal regulasi internal dan penegakan disiplin organisasi.</span>
      </div>
    </div>
  </section>

</body>
</html>
`;

const htmlFilePath = path.join(__dirname, "../public/cv-print.html");
fs.writeFileSync(htmlFilePath, htmlContent, "utf8");

console.log("HTML generated at:", htmlFilePath);

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const pdfOutputPath = path.join(__dirname, "../public/Reyjuno_Al_Cannavaro_CV.pdf");
const rootPdfPath = path.join(__dirname, "../Reyjuno_Al_Cannavaro_CV.pdf");

const cmd = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${pdfOutputPath}" "${htmlFilePath}"`;

console.log("Running Chrome headless command...");
execSync(cmd, { stdio: "inherit" });

fs.copyFileSync(pdfOutputPath, rootPdfPath);
console.log("PDF generated successfully at:", pdfOutputPath);
console.log("Copied to root:", rootPdfPath);
