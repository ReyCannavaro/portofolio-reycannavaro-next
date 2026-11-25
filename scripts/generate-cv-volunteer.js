const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const photoPath = path.join(__dirname, "../src/assets/profile.JPG");
let photoDataUri = "";
if (fs.existsSync(photoPath)) {
  const photoBase64 = fs.readFileSync(photoPath).toString("base64");
  photoDataUri = `data:image/jpeg;base64,${photoBase64}`;
}

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CV Volunteer - Reyjuno Al Cannavaro</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8.5mm 12mm 8.5mm 12mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      line-height: 1.38;
      font-size: 8.9pt;
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
      border-bottom: 2.5px solid #0f4c81;
      padding-bottom: 10px;
      margin-bottom: 11px;
      gap: 16px;
    }

    .header-left {
      flex: 1;
    }

    .name-title {
      font-size: 21pt;
      font-weight: 800;
      color: #0b2545;
      letter-spacing: -0.02em;
      line-height: 1.1;
      text-transform: uppercase;
    }

    .headline {
      font-size: 9.8pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-top: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .contact-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      margin-top: 7px;
      font-size: 8.3pt;
      color: #334155;
    }

    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .header-photo {
      width: 76px;
      height: 96px;
      object-fit: cover;
      object-position: top center;
      border-radius: 4px;
      border: 1.5px solid #0f4c81;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }

    /* SECTION */
    .section {
      margin-bottom: 10.5px;
    }

    .section-title {
      font-size: 9.9pt;
      font-weight: 800;
      color: #0b2545;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .section-title::after {
      content: "";
      height: 2.5px;
      background: #0f4c81;
      width: 32px;
    }

    /* SUMMARY */
    .summary-text {
      text-align: justify;
      color: #334155;
      font-size: 8.6pt;
      line-height: 1.39;
    }

    /* SKILLS CARDS (GRID 2x2) */
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
    }

    .skill-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #0f4c81;
      padding: 5px 8px;
      border-radius: 2px;
    }

    .skill-card-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #0f2d59;
      margin-bottom: 2px;
    }

    .skill-card-desc {
      font-size: 8pt;
      color: #475569;
      line-height: 1.3;
    }

    /* EXPERIENCE ITEMS */
    .exp-item {
      margin-bottom: 7.5px;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .exp-role {
      font-weight: 700;
      color: #0f2d59;
      font-size: 9pt;
    }

    .exp-org {
      font-weight: 600;
      color: #475569;
      font-size: 8.4pt;
    }

    .exp-date {
      font-size: 8.1pt;
      color: #64748b;
      font-weight: 600;
    }

    .exp-bullets {
      list-style-type: disc;
      padding-left: 15px;
      margin-top: 2px;
    }

    .exp-bullets li {
      font-size: 8.4pt;
      color: #334155;
      margin-bottom: 2px;
      line-height: 1.34;
      text-align: justify;
    }

    /* 2 COLUMNS (EDUCATION & PERSONAL TRAITS) */
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 12px;
    }

    .list-compact {
      list-style: none;
      padding: 0;
    }

    .list-compact li {
      font-size: 8.2pt;
      color: #334155;
      margin-bottom: 3.5px;
      line-height: 1.28;
      position: relative;
      padding-left: 10px;
    }

    .list-compact li::before {
      content: "•";
      color: #0f4c81;
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    .badge-tag {
      background: #e0f2fe;
      color: #0369a1;
      font-size: 7.2pt;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 2px;
      display: inline-block;
      margin-left: 4px;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="header-left">
      <div>
        <span class="name-title">Reyjuno Al Cannavaro</span>
      </div>
      <div class="headline">Event Operations & Operational Volunteer</div>
      <div class="contact-grid">
        <span class="contact-item"><strong>Domisili:</strong> Sidoarjo, Jawa Timur</span>
        <span class="contact-item"><strong>WhatsApp:</strong> +62 821-3953-1132</span>
        <span class="contact-item"><strong>Email:</strong> reyjunoalcannavaro@gmail.com</span>
        <span class="contact-item"><strong>LinkedIn:</strong> linkedin.com/in/reycannavaro</span>
        <span class="contact-item"><strong>Instagram:</strong> @reycannavaro</span>
      </div>
    </div>
    ${photoDataUri ? `<img src="${photoDataUri}" alt="Reyjuno Al Cannavaro" class="header-photo">` : ""}
  </header>

  <!-- RINGKASAN PROFIL -->
  <section class="section">
    <h2 class="section-title">Ringkasan Profil</h2>
    <p class="summary-text">
      Siswa Sistem Informasi Jaringan dan Aplikasi (SIJA) SMK Telkom Sidoarjo yang aktif dalam organisasi kesiswaan dan kepanitiaan acara sekolah. Berpengalaman sebagai Sekretaris Umum OSIS dan Sekretaris Acara Diesnatalis dengan ratusan peserta, serta memiliki pengalaman memimpin koordinasi operasional tim di lingkungan profesional dan proyek sekolah. Terbiasa bekerja secara terstruktur, teliti dalam pengelolaan alur data registrasi, komunikatif, tanggap terhadap instruksi cepat di lapangan, serta siap bekerja sama secara solid untuk menyukseskan operasional DPR Festival 2026.
    </p>
  </section>

  <!-- KOMPETENSI UTAMA VOLUNTEER -->
  <section class="section">
    <h2 class="section-title">Kompetensi Operasional & Event</h2>
    <div class="skills-grid">
      <div class="skill-card">
        <div class="skill-card-title">Ticketing & Gate Registration</div>
        <div class="skill-card-desc">Ketelitian tinggi dalam validasi barcode/e-ticket, penukaran gelang identitas, dan memastikan alur masuk pengunjung tetap mengalir lancar.</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Hospitality & Liaison Officer (LO)</div>
        <div class="skill-card-desc">Komunikasi ramah, santun, responsif mendampingi kebutuhan tamu atau talent undangan, serta menjaga etika privasi area backstage.</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Manajemen Alur & Operasional Lapangan</div>
        <div class="skill-card-desc">Membantu pengawasan alur kerumunan pengunjung, penjagaan ketertiban venue, dan kesigapan bertindak tenang saat situasi dinamis.</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Kerja Sama Tim & Problem Solving</div>
        <div class="skill-card-desc">Cepat tanggap memahami instruksi koordinator, adaptif dengan perubahan jadwal di lapangan, dan solid mendukung rekan kerja lintas divisi.</div>
      </div>
    </div>
  </section>

  <!-- PENGALAMAN KEPANITIAAN & ORGANISASI -->
  <section class="section">
    <h2 class="section-title">Pengalaman Kepanitiaan Acara & Organisasi</h2>
    
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <span class="exp-role">Sekretaris Acara — Diesnatalis ke-5 & ke-6</span>
          <span class="exp-org">| OSIS SMK Telkom Sidoarjo</span>
        </div>
        <span class="exp-date">2024 & 2025</span>
      </div>
      <ul class="exp-bullets">
        <li>Mengelola perizinan resmi, administrasi rundown, dan korespondensi eksternal untuk perayaan tahunan terbesar sekolah yang melibatkan ratusan audiens dan tamu undangan.</li>
        <li>Menjadi penghubung komunikasi utama antara panitia siswa, pihak sekolah, serta vendor luar demi kelancaran teknis panggung, konsumsi, dan logistik lapangan.</li>
        <li>Mengatur alur meja registrasi pengunjung dan kontrol akses gelang tanda masuk bagi peserta lomba maupun tamu undangan.</li>
      </ul>
    </div>

    <div class="exp-item">
      <div class="exp-header">
        <div>
          <span class="exp-role">Sekretaris Umum OSIS</span>
          <span class="exp-org">| SMK Telkom Sidoarjo</span>
        </div>
        <span class="exp-date">Periode 2025</span>
      </div>
      <ul class="exp-bullets">
        <li>Mengorkestrasi tata kelola administrasi dan persuratan untuk berbagai program kerja kesiswaan selama satu periode kepengurusan aktif.</li>
        <li>Menjadi pusat koordinasi komunikasi lintas bidang serta memfasilitasi kebutuhan perlengkapan dan teknis panitia di lapangan.</li>
      </ul>
    </div>
  </section>

  <!-- PENGALAMAN KOORDINASI TIM & TANGGUNG JAWAB OPERASIONAL -->
  <section class="section">
    <h2 class="section-title">Pengalaman Koordinasi Tim & Operasional</h2>
    
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <span class="exp-role">Lead Tim Operasional Teknis</span>
          <span class="exp-org">| PT Qlcom Solusi Bisnis (Quantum Leap)</span>
          <span class="badge-tag">KONTRAK KERJA</span>
        </div>
        <span class="exp-date">Agu 2026 – Feb 2027</span>
      </div>
      <ul class="exp-bullets">
        <li>Memimpin koordinasi operasional harian bersama tim dan menjaga kepuasan komunikasi profesional dengan 6 mitra perusahaan pengguna sistem.</li>
        <li>Melatih kedewasaan komunikasi, ketelitian data, ketepatan waktu, dan ketenangan dalam menyelesaikan kendala operasional yang membutuhkan penanganan cepat.</li>
      </ul>
    </div>

    <div class="exp-item" style="margin-bottom: 0;">
      <div class="exp-header">
        <div>
          <span class="exp-role">Project Manager — SKOMDA Digital Gateway</span>
          <span class="exp-org">| Tim Pengembang Sekolah</span>
        </div>
        <span class="exp-date">2026</span>
      </div>
      <ul class="exp-bullets">
        <li>Mengorkestrasi pembagian peran tim, timeline kerja, dan koordinasi antar anggota dalam perancangan portal informasi digital sekolah terpadu.</li>
      </ul>
    </div>
  </section>

  <!-- PENDIDIKAN & KETERAMPILAN PERSONAL -->
  <div class="two-col section" style="margin-bottom: 0;">
    <div>
      <h2 class="section-title">Pendidikan</h2>
      <div style="font-size: 8.8pt; font-weight: 700; color: #0f2d59;">SMK Telkom Sidoarjo</div>
      <div style="font-size: 8.2pt; color: #475569;">Sistem Informasi Jaringan & Aplikasi (SIJA)</div>
      <div style="font-size: 7.9pt; color: #64748b; margin-bottom: 4px;">2024 – 2027 (Aktif)</div>
      <ul class="list-compact">
        <li>Pengurus Inti OSIS Sekolah</li>
        <li>Aktif dalam Manajemen Acara & Kegiatan Kesiswaan</li>
      </ul>
    </div>

    <div>
      <h2 class="section-title">Karakter & Etika Kerja</h2>
      <ul class="list-compact">
        <li><strong>Komunikasi Ramah & Terbuka:</strong> Mudah berbaur, santun, dan luwes berinteraksi dengan pengunjung maupun tim kerja.</li>
        <li><strong>Sigap & Disiplin Waktu:</strong> Selalu hadir tepat waktu untuk briefing dan siap standby penuh sepanjang jadwal shift acara.</li>
        <li><strong>Fokus & Teliti:</strong> Terbiasa menangani pendataan rapi dan cepat tanggap terhadap arahan koordinator divisi.</li>
      </ul>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(__dirname, "../public/cv-volunteer-print.html");
fs.writeFileSync(htmlFilePath, htmlContent, "utf8");

console.log("HTML generated at:", htmlFilePath);

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const pdfOutputPath = path.join(__dirname, "../public/Reyjuno_Al_Cannavaro_CV_Volunteer.pdf");
const rootPdfPath = path.join(__dirname, "../Reyjuno_Al_Cannavaro_CV_Volunteer.pdf");

const cmd = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${pdfOutputPath}" "${htmlFilePath}"`;

console.log("Running Chrome headless command...");
execSync(cmd, { stdio: "inherit" });

fs.copyFileSync(pdfOutputPath, rootPdfPath);
console.log("Volunteer PDF generated successfully at:", pdfOutputPath);
console.log("Copied to root:", rootPdfPath);
