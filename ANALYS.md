# Audit mendalam portofolio Rey Cannavaro

**Tanggal audit:** 16 Agustus 2026  
**Sudut pandang:** HR/recruiter teknologi + hiring manager + reviewer frontend  
**Target kandidat yang diasumsikan:** Junior Full-stack Developer / Software Engineer Intern  
**Cakupan:** seluruh source code, data portofolio, halaman utama, halaman case study Quantum Leap, API GitHub, chatbot, metadata SEO, seluruh screenshot proyek/pengalaman/prestasi, build production, lint, tautan publik, dan render live desktop/mobile.

---

## Ringkasan eksekutif

### Keputusan recruiter

**Lanjut ke screening call, tetapi bersyarat.**

Portofolio ini berhasil membuat Rey terlihat ambisius, produktif, dan jauh lebih matang secara visual daripada rata-rata kandidat seusianya. Hero sangat memorable, identitas desain konsisten, proyek cukup beragam, tiga demo publik aktif, dan prestasi nasional memberi sinyal kuat tentang motivasi serta kemampuan belajar.

Namun, saya belum akan langsung memasukkan Rey ke shortlist final. Masalah utamanya bukan kekurangan jumlah proyek, melainkan **jarak antara klaim dan bukti**. Beberapa copy terdengar senior atau production-grade, sementara bukti yang ditampilkan masih berupa screenshot, data demo, dashboard berulang, dan deskripsi tanpa metrik. Ada juga risiko reputasi dari screenshot yang menampilkan `localhost`, bookmark pribadi, data/nama klien, klaim statistik produk yang tampak nyata tetapi tidak diberi label sebagai data demo, serta canonical/Open Graph yang mengarah ke domain 404.

**Skor keseluruhan saat ini: 64/100.**  
**Potensi setelah perbaikan prioritas tinggi: 80–85/100.**

| Area | Skor | Penilaian recruiter |
|---|---:|---|
| Kesan pertama | 8.5/10 | Sangat memorable dan terlihat serius |
| Positioning kandidat | 6/10 | Terlalu banyak identitas: full-stack, software engineer, AI, UI/UX |
| Bukti kemampuan teknis | 6.5/10 | Banyak proyek, tetapi kedalaman dan ownership belum jelas |
| Bukti dampak | 4/10 | Hampir tidak ada metrik yang dapat diverifikasi |
| Kredibilitas klaim | 5/10 | Ada klaim besar, data demo, dan bukti visual yang tidak selalu selaras |
| UX/UI desktop | 8/10 | Kuat, konsisten, dan punya karakter |
| UX/UI mobile | 4.5/10 | Ada clipping/overflow nyata pada viewport 390×844 |
| Aksesibilitas | 4/10 | Beberapa interaksi tidak keyboard-accessible dan kontrol tanpa nama |
| Kualitas engineering | 6/10 | Build berhasil, tetapi lint gagal dan komponen terlalu monolitik |
| SEO/shareability | 5/10 | Fondasi ada, tetapi domain, sitemap, dan social preview bermasalah |
| Keamanan/privasi | 4.5/10 | Risiko NDA, data pribadi, dan endpoint AI tanpa proteksi biaya |

> **Diagnosis utama:** portofolio ini sudah kuat sebagai _showcase visual_, tetapi belum cukup kuat sebagai _berkas pembuktian engineering_.

---

## Simulasi cara recruiter membaca portofolio

### Dalam 10 detik pertama

Yang langsung tertangkap:

- Nama Rey jelas dan mudah diingat.
- Status “Open for opportunities” terlihat.
- Visual hitam-merah dan portrait sangat kuat.
- Rey mengklaim diri sebagai Full-stack Developer dengan 2+ tahun pengalaman.
- Ada 6+ proyek dan 12+ prestasi.

Reaksi positif: “Kandidat muda ini serius membangun personal brand.”

Keraguan yang muncul bersamaan:

- Mengapa umur ditampilkan sebagai KPI?
- Apa role utama Rey sebenarnya—full-stack, software engineer, AI, atau UI/UX?
- Di mana tombol CV/resume?
- Apakah “2+ years” berarti pengalaman profesional atau proyek sekolah/pribadi?

### Dalam 30–60 detik

Recruiter akan scroll dan bertemu GitHub Stats sebelum pengalaman dan proyek. Bagian ini menarik secara teknis, tetapi terlalu besar untuk nilai rekrutmen yang dihasilkan. Stars, forks, dan followers tidak selalu membantu kandidat junior; bila angkanya kecil atau API gagal, justru membuat profil tampak lebih lemah atau belum selesai.

Recruiter harus melewati GitHub, daftar skill, baru kemudian menemukan satu pengalaman profesional. Ini menunda bukti terpenting. Untuk screening cepat, urutan yang lebih efektif adalah:

1. Hero + CV.
2. Tiga bukti utama: internship, proyek terbaik, prestasi teknologi.
3. Case study proyek.
4. Pengalaman.
5. Skill yang dipetakan ke bukti.
6. GitHub dan prestasi nonteknis sebagai pendukung.

### Setelah membaca 3–5 menit

Recruiter akan melihat breadth yang bagus, tetapi mulai bertanya:

- Apa kontribusi Rey sendiri pada setiap proyek tim?
- Apa masalah paling sulit yang diselesaikan?
- Apa hasil sebelum/sesudahnya?
- Apa yang benar-benar sudah dipakai pengguna?
- Mana data nyata dan mana data demo?
- Apakah nama serta dashboard klien boleh dipublikasikan?

Saat ini portofolio belum menjawab pertanyaan-pertanyaan itu dengan cukup kuat.

---

## Kekuatan terbesar

### 1. Identitas visual sangat memorable

Hero live pada desktop 1440×900 terlihat rapi, dramatis, dan terarah. Foto portrait berkualitas tinggi, grid gelap, tipografi besar, navigasi vertikal, serta aksen tiga warna membuat portofolio mudah dibedakan dari template developer generik.

### 2. Breadth proyek di atas rata-rata kandidat junior

Rey menampilkan web development, AI/ML, IoT, game edukasi, civic tech, marketplace jasa, dan ERP. Ini menunjukkan rasa ingin tahu serta kemampuan berpindah konteks. Tiga demo publik juga aktif saat diuji:

| Demo | Hasil tes |
|---|---|
| SIRA | HTTP 200, diarahkan ke `/login` |
| DESATA | HTTP 200, diarahkan ke `/beranda` |
| FINDOR | HTTP 200 |

Semua repository spesifik yang ditautkan juga merespons HTTP 200 saat audit.

### 3. Prestasi nasional merupakan differentiator nyata

Juara 2 Web Design Nasional dan Juara 1 LKTI Nasional adalah sinyal paling kuat setelah pengalaman kerja. Foto piala/sertifikat membuat prestasi tidak terasa sekadar klaim teks. Leadership, OSIS, Paskibraka, dan Pramuka menunjukkan disiplin, komunikasi, serta kepercayaan organisasi.

### 4. Struktur data portofolio cukup rapi

Data pengalaman, skill, pendidikan, proyek, dan prestasi dipusatkan di `src/app/data`. Ini memudahkan pembaruan dan mendukung chatbot tanpa menduplikasi seluruh konten secara manual.

### 5. Fondasi production cukup baik

- `npm run build` **berhasil**.
- Halaman utama diprerender statis.
- Halaman pengalaman memakai static generation.
- Gambar utama memakai `next/image`.
- Ada `robots.txt`, sitemap, favicon, metadata, loading/error state GitHub, serta reduced-motion CSS.
- Mayoritas tautan eksternal memakai `rel="noopener noreferrer"`.

---

## Enam masalah yang paling mungkin menggagalkan recruiter

### P0.1 — Klaim lebih besar daripada bukti

Contoh copy saat ini:

- “enterprise-grade web applications”
- “business-critical ERP systems”
- “mengoptimalkan backend performance”
- “memberikan respons medis awal secara instan dan akurat”
- “memastikan stabilitas platform HRIS berskala enterprise yang menangani ribuan data karyawan”
- “mengoptimalkan query database untuk mempercepat waktu respons”

Semua kalimat ini mungkin benar, tetapi portofolio tidak memberi angka, ruang lingkup, artefak teknis, atau cara verifikasi. Sebagai recruiter, saya akan menganggapnya sebagai copy marketing sampai ada bukti.

**Tindakan:** ubah setiap klaim besar menjadi format:

> Kondisi awal → tanggung jawab pribadi → keputusan teknis → hasil terukur → cara verifikasi.

Contoh:

> “Saya mengubah query laporan absensi dari N+1 menjadi eager loading dan agregasi database. Pada data uji 10.000 baris, waktu respons turun dari 2,8 detik menjadi 780 ms. Pengukuran dilakukan melalui Laravel Debugbar pada environment staging.”

Jika angka tidak boleh dipublikasikan, tulis “angka disamarkan atas alasan NDA” atau gunakan rentang.

### P0.2 — Data demo berpotensi terlihat sebagai klaim palsu

Screenshot FINDOR menampilkan:

- 2.400+ vendor terverifikasi
- 18.000+ event sukses
- 99% tingkat kepuasan
- 34 kota
- klaim “platform kurasi vendor event premium pertama di Indonesia”

Di screenshot lain, FINDOR menampilkan “4+ vendor terverifikasi”. Tanpa label “prototype/demo data”, perbedaan ini menimbulkan pertanyaan integritas. Recruiter tidak hanya menilai desain; recruiter menilai apakah kandidat membedakan data produk, dummy data, dan hasil nyata.

Dashboard ERP juga menampilkan nilai revenue, jumlah pengguna, order, cashflow, serta payroll yang tampak riil. Bila itu dummy, beri label besar **“Demo data / synthetic data”**. Bila itu data klien, jangan publikasikan tanpa izin tertulis.

### P0.3 — Risiko NDA dan kerahasiaan klien

Case study menyebut Hutomo Group, Mansion Nine, MSC, Kilang Padi, Temprina/Jawa Pos Group, dan Budi Jaya. Screenshot memperlihatkan nama perusahaan, struktur cabang, jumlah pegawai, payroll, finance, user role, serta modul internal.

Ini dapat membuat hiring manager bertanya: “Jika kami mempekerjakan kandidat ini, apakah dashboard internal kami juga akan dipublikasikan?” Bahkan bila seluruh data adalah dummy, tampilannya belum menjelaskan itu.

**Tindakan wajib:** sebelum portofolio dikirim, pastikan salah satu dari berikut:

- ada izin tertulis untuk menyebut klien dan memakai screenshot;
- nama serta data disamarkan;
- case study dibuat generik, misalnya “Enterprise HRIS — perusahaan manufaktur nasional”;
- seluruh screenshot diberi watermark “sanitized demo environment”.

### P0.4 — Screenshot proyek terlihat belum siap presentasi

Beberapa gambar proyek memperlihatkan:

- `localhost:8000` atau `127.0.0.1:8000`;
- tab browser, bookmark sekolah, Murottal, Adobe Acrobat, dan profil browser;
- Windows taskbar, username, serta tanggal/jam;
- data kosong, chart kosong, atau teks “Chart will be implemented here”;
- user dummy seperti `raffiakbar_367` dan `Tetsuya` tanpa penjelasan;
- gambar UrbanGrow beresolusi rendah;
- screenshot HRIS Budi Jaya dan Kilang Padi dengan nilai/grafik yang hampir identik.

Ini menurunkan persepsi polish dan membuat proyek berbeda terasa seperti variasi template yang sama.

**Tindakan:** ambil ulang semua screenshot dengan browser profile bersih, tanpa chrome browser, ukuran konsisten, data dummy yang realistis, dan satu caption yang menjelaskan fitur apa yang sedang dibuktikan.

### P0.5 — Tidak ada CV/resume yang jelas

Hero menyediakan “Certificates”, bukan “Download CV”. Recruiter ingin satu dokumen ringkas yang bisa disimpan, dikirim ke hiring manager, dan dipakai saat interview. Folder sertifikat tidak menggantikan CV.

**Tindakan:** tambah CTA utama “Download CV — PDF”, sertakan versi Indonesia dan Inggris bila menargetkan dua pasar. Nama file harus profesional, misalnya `Rey-Cannavaro-Fullstack-Developer-CV.pdf`.

### P0.6 — Mobile hero mengalami overflow/clipping

Pada pengujian render live viewport 390×844:

- paragraf bio terpotong di sisi kanan;
- bottom navigation terlihat melebar/terpotong;
- elemen foto dan teks berebut ruang;
- chatbot/navigation berpotensi menutupi CTA bawah;
- `overflow-x: hidden` menyembunyikan gejala, bukan menyelesaikan sumber overflow.

Ini bukan detail kecil: banyak recruiter membuka link pertama kali dari ponsel.

**Tindakan:** uji minimum pada 360×800, 390×844, 412×915, dan 768×1024. Pastikan tidak ada elemen yang lebih lebar dari viewport, semua CTA dapat disentuh, dan foto mendapat treatment mobile tersendiri—bukan sekadar crop desktop.

---

## Audit positioning dan copy

### Positioning terlalu lebar

Hero merotasi empat role:

- Fullstack Developer
- Software Engineer
- AI Enthusiast
- UI/UX Designer

Metadata juga memakai “Fullstack Developer & Designer”. Untuk kandidat junior, empat positioning sekaligus dapat dibaca sebagai belum menentukan keunggulan utama. Bukti terkuat di repositori justru mengarah ke **Junior Full-stack Engineer dengan pengalaman Laravel/Next.js dan ketertarikan pada AI/IoT**.

**Saran positioning:**

> **Junior Full-stack Engineer**  
> Saya membangun aplikasi web end-to-end dengan Laravel, Next.js, dan PostgreSQL—dari workflow ERP hingga produk edukasi dan civic tech.

AI dan IoT tetap dapat muncul sebagai spesialisasi pendukung, bukan identitas yang berganti setiap 2,8 detik.

### “2+ years experience” perlu diperjelas

Data hanya menampilkan satu pengalaman profesional, dimulai 2026. Bila dua tahun dihitung dari proyek mandiri/sekolah, tulis:

> “2+ years building software projects; professional internship experience since 2026.”

Ini lebih jujur dan justru terlihat matang.

### Angka hero tidak sinkron dengan data

- Hero menulis 6+ projects, tetapi data memuat 9 proyek.
- Hero menulis 12+ achievements, tetapi data memuat 13.
- `techStats` juga masih memakai 6+ projects.
- `currentlyLearning` menulis Next.js 15, sedangkan portofolio sudah memakai Next.js 16.1.6.

Staleness kecil seperti ini berdampak besar pada kepercayaan karena kandidat menjual perhatian terhadap detail.

### Umur dan nomor telepon tidak perlu menjadi informasi utama

Umur 19 tahun dapat memicu bias sebelum recruiter membaca bukti. Tampilkan status siswa dan tahun kelulusan; itu sudah cukup memberi konteks. Nomor telepon publik juga meningkatkan risiko spam. Email, LinkedIn, dan form kontak lebih aman sebagai default.

### Bahasa tidak konsisten

Bio dan section heading banyak memakai Inggris, sementara project description dan contact memakai Indonesia. Pilih satu bahasa utama atau sediakan toggle yang benar-benar lengkap. Campuran saat ini terasa seperti copy dari beberapa iterasi berbeda.

---

## Audit tiap bagian halaman

### Hero

**Yang bagus:** visual sangat kuat, nama jelas, CTA proyek terlihat, status availability langsung terbaca.

**Yang kurang:** tidak ada CV, positioning berubah-ubah, age terlalu dominan, bio generik, dan portrait bernuansa seremonial lebih kuat daripada konteks software. Foto tetap dapat dipakai, tetapi sebaiknya dilengkapi satu foto kerja/coding/presentasi di case study agar recruiter melihat konteks profesional.

### GitHub Stats

Bagian ini terlalu besar dan ditempatkan terlalu awal. Grafik kontribusi, chart mingguan, breakdown bulanan, language bar, repos, stars, forks, followers, serta kategori “DRL day” mengambil ruang yang seharusnya dipakai untuk bukti proyek.

Masalah teknis/UX:

- `availableYears` dan `selectedYear` disiapkan tetapi tidak ada pemilih tahun.
- Grafik tetap diberi `currentYear`, sehingga state tahun praktis tidak berguna.
- Tanpa token, UI menampilkan “Add GITHUB_TOKEN to .env.local”, yang membocorkan detail konfigurasi dan terlihat seperti deployment belum selesai.
- Endpoint dapat membuat puluhan request GitHub untuk bahasa repository; rate limit mudah terkuras bila cache tidak efektif.

**Saran:** ringkas menjadi satu baris: total kontribusi tahun ini, bahasa utama, dan link ke tiga repository terbaik. Pindahkan setelah case study atau mendekati footer.

### Skills

Daftar mencakup lebih dari 40 teknologi. Tanpa level atau bukti, ini tampak seperti keyword inventory. Recruiter lebih percaya lima skill dengan artefak kuat daripada empat puluh skill tanpa konteks.

Gunakan tiga tingkat:

- **Core:** Laravel, PHP, Next.js/React, TypeScript, SQL.
- **Working knowledge:** Vue/Nuxt, Supabase, Express, Tailwind.
- **Exploring:** RAG, ML, MQTT/MicroPython.

Setiap core skill harus bisa diklik atau dikaitkan ke proyek yang membuktikannya.

### Experience

Pengalaman Quantum Leap adalah aset rekrutmen paling berharga, tetapi copy masih generik: “contributing”, “working with”, dan “collaborating”. Recruiter membutuhkan ownership.

Tambahkan:

- bulan mulai, bukan hanya tahun;
- ukuran tim dan siapa yang melakukan review;
- modul yang benar-benar Rey pegang;
- satu keputusan frontend, backend, dan database;
- testing/deployment workflow;
- metrik yang boleh dipublikasikan;
- penanda “internship” yang jujur, tanpa memakai bahasa seolah lead engineer.

Enam project enterprise saat ini memiliki screenshot dashboard serupa. Lebih baik pilih dua case study yang paling dalam daripada enam entri yang dangkal.

### Projects

#### FINDOR — kandidat flagship, tetapi risiko kredibilitas tertinggi

Desain paling matang dan demo aktif. Namun statistik besar serta klaim “pertama di Indonesia” harus dihapus atau dibuktikan. Jelaskan apakah ini proyek kompetisi, prototype, bisnis aktif, atau produk klien. Tampilkan arsitektur pencarian/vendor, role-based flow, schema, dan kontribusi pribadi.

#### SIRA — kandidat flagship terbaik secara engineering

Demo aktif dan ruang lingkup produknya menarik: auth, progress, quest, Supabase, gamification, dan code challenge. Ini berpotensi menjadi case study utama. Ambil ulang screenshot tanpa taskbar/browser, jelaskan validasi jawaban, state progression, schema, security/RLS, serta apa yang Rey bangun sendiri.

#### DESATA — kuat sebagai civic-tech case study

Demo aktif dan problemnya mudah dipahami. Jelaskan apakah Desa Sekardangan serta data penduduk/APBDes adalah data nyata atau dummy. Tampilkan permission warga/perangkat desa, alur laporan, penyimpanan bukti, RLS, dan moderasi.

#### UrbanGrow — differentiator yang belum dimaksimalkan

IoT membuat Rey berbeda dari kandidat web biasa, tetapi asetnya hanya montage kecil. Tambahkan diagram ESP32 → MQTT/API → database → dashboard, jenis sensor, frekuensi pengiriman, toleransi kegagalan, dan hasil uji.

#### Medibot — menarik, tetapi high-risk

Repository berada di akun tim lain (`Satyasy/Medibot`) dan kontribusi Rey belum dijelaskan. Klaim respons medis “akurat” membutuhkan evaluation set, citation behavior, batasan, serta disclaimer bahwa ini prototype edukasi dan bukan alat diagnosis. Screenshot juga menampilkan browser/bookmark pribadi.

#### Sentiment Analyzer — bukti AI masih terlalu dasar

UI menyebut “Analisis Sentimen Sederhana”, GitHub mengarah ke profil umum, bukan repository spesifik, dan tidak ada dataset, split, baseline, confusion matrix, F1 score, atau error analysis. Aset `sentiment-analyzer.png` yang tidak digunakan tampak sebagai screenshot Hootsuite yang tidak berhubungan; hapus untuk mencegah kebingungan dan risiko aset pihak ketiga.

#### Veritas AI — platform/stack tidak jelas

Data menyebut Python + React + JavaScript, tetapi screenshot terlihat seperti aplikasi mobile. Jelaskan platform sebenarnya, peran model ML, alur data, dan repository path yang membuktikannya. Saat ini deskripsi “analisis data” terlalu generik.

#### TechSphere — fungsional, tetapi belum menunjukkan kedalaman

Screenshot berfokus pada homepage/listing, bukan sistem rating atau Filament admin yang diklaim. Tampilkan admin workflow, data model, moderation, search/filter, dan contoh testing. Bersihkan browser chrome/localhost.

#### PT Rizza Jaya Abadi — visual paling lemah

Tampilan terlihat seperti proyek awal dan screenshot belum bersih. Deskripsi menjanjikan booking, jadwal, transaksi, dan laporan keuangan, tetapi gambar dominan menunjukkan landing page, profil, dan daftar rute. Bila backend/admin memang kuat, tampilkan itu. Jika tidak, proyek ini sebaiknya tidak masuk tiga proyek utama.

### Projects: masalah interaksi

- Filter “Game Development” menghasilkan area “More Projects” kosong karena SIRA dikeluarkan sebagai hero project dan tidak ada empty state.
- Tombol hero project berisi elemen `<a>`; interactive element di dalam `<button>` adalah struktur HTML yang tidak valid dan membingungkan keyboard/screen reader.
- Dot carousel hanya berukuran sekitar 6 px dan tidak memiliki `aria-label`.
- Progress bar memakai `position: absolute` tanpa parent `position: relative`, sehingga posisi containing block berisiko salah.
- Gallery sudah ada di data, tetapi UI hanya memakai thumbnail. Recruiter tidak dapat menjelajahi alur proyek.

### Achievements

Prestasi adalah kekuatan, tetapi porsinya terlalu panjang untuk recruiter teknologi. Prioritaskan:

1. Juara 2 Web Design Nasional.
2. Juara 1 LKTI Nasional.
3. Satu leadership highlight.
4. Link “Lihat 10 prestasi lainnya”.

Masalah fungsi:

- Featured card tidak dapat dipilih, jadi detail prestasi featured kedua tidak dapat dibuka.
- Daftar menggunakan `<div onClick>` tanpa `button`, `tabIndex`, atau keyboard handler.
- Pada mobile, panel detail disembunyikan; mengetuk daftar hanya mengubah state yang tidak terlihat.
- Beberapa foto organisasi membuktikan keikutsertaan, tetapi tidak langsung membuktikan jabatan yang diklaim.
- Foto LKTI saat ini tidak secara langsung menunjukkan nama organizer/level nasional sebagaimana copy; sertakan sertifikat atau tautan pengumuman yang lebih eksplisit.

### Education

SMK Telkom relevan dan harus dipertahankan. SMP dapat dipadatkan menjadi satu baris atau dihapus dari halaman utama. Untuk recruiter teknis, kurikulum, program unggulan, proyek capstone, dan expected graduation lebih berguna daripada riwayat SMP lengkap.

### Contact dan footer

Kontak mudah ditemukan, tetapi belum menjawab:

- role apa yang dicari;
- internship/freelance/full-time;
- remote/hybrid/on-site;
- ketersediaan mulai kapan;
- tautan CV;
- bahasa komunikasi.

Nomor urut footer tertulis “06” padahal achievements sudah “06” dan education “07”. Ini memberi kesan detail copy belum diaudit.

---

## Audit visual dan personal brand

### Yang berhasil

- Hierarki desktop jelas.
- Spacing lapang dan konsisten.
- Hero photo kuat.
- Aksen warna digunakan hemat.
- Button dan card memiliki bahasa visual yang konsisten.
- Desain tidak terasa seperti template SaaS standar.

### Yang perlu dipertimbangkan ulang

Identitas mengambil BMW M secara sangat literal: hitam murni, exact M tricolor, terminology DRL, dan DESIGN.md yang mendokumentasikan BMW Type serta komponen BMW. Ini memang menghasilkan visual kuat, tetapi personal brand Rey menjadi terlalu bergantung pada identitas merek lain. Hiring manager/designer bisa menilai ini sebagai kemampuan meniru art direction, bukan membangun identitas sendiri. Ada pula risiko trademark/brand association yang tidak perlu.

**Saran:** pertahankan karakter “precision/industrial”, tetapi buat simbol, palet, nama token, dan motion language milik Rey sendiri.

### Kontras warna

Perhitungan kontras menunjukkan:

- `#1c69d4` pada `#000000`: **4.02:1** — gagal untuk teks kecil normal.
- `#0066b1` pada `#000000`: **3.54:1** — gagal.
- `#1c69d4` pada `#1a1a1a`: **3.33:1** — gagal.
- `#8a8a8a` pada `#1a1a1a`: **5.04:1** — lolos AA teks normal.

Banyak label biru berukuran 9–12 px. Naikkan luminance biru untuk teks atau pakai biru hanya sebagai border/dekorasi.

---

## Audit aksesibilitas

### Prioritas tinggi

- Tidak ada skip-to-content link.
- Achievement rows memakai `div` klik dan tidak dapat dioperasikan dengan keyboard.
- Carousel dots tidak memiliki accessible name dan target sentuh terlalu kecil.
- Tidak ada sistem `:focus-visible` yang konsisten.
- Heading achievements melompat dari `h2` ke `h4/h5`.
- Konten role dan hero project berubah otomatis; CSS reduced-motion tidak menghentikan interval JavaScript.
- Mobile achievement interaction tidak memberikan hasil visual.
- Tooltip sidebar hanya muncul dengan mouse; `title` membantu sedikit, tetapi pengalaman focus belum setara.

### Yang sudah baik

- `<html lang="id">` sudah ada.
- Sebagian besar gambar memiliki alt text yang masuk akal.
- Sidebar button memiliki `aria-label`.
- Chatbot input dan button memiliki label.
- Reduced-motion CSS sudah disiapkan, walau belum lengkap.

---

## Audit engineering dan maintainability

### Hasil verifikasi

`npm run build`: **PASS**  
`npm run lint`: **FAIL — 3 error, 1 warning**

Temuan lint:

- `Experience.tsx`: explicit `any`.
- `Hero.tsx`: `setState` sinkron di dalam effect.
- `experience/[slug]/page.tsx`: explicit `any`.
- `experience/[slug]/page.tsx`: import `Image` tidak digunakan.

Repositori yang dikirim sebagai bukti engineering seharusnya tidak memiliki lint merah.

### Masalah maintainability

- Hampir semua section adalah client component hanya untuk IntersectionObserver/animasi.
- `GitHubStats.tsx` dan `Projects.tsx` sangat monolitik.
- Inline style mendominasi seluruh aplikasi.
- Hover mengubah `element.style` melalui event handler, bukan class/state CSS.
- Responsive Skills mengandalkan selector rapuh seperti `nth-child(3)`.
- Z-index memakai angka ekstrem 9000, 9500, dan 99999 tanpa scale yang jelas.
- Framer Motion dipakai hanya untuk reveal sederhana pada satu komponen.
- `react-icons` tampak tidak digunakan.
- Aset default Next/Vercel dan beberapa gambar duplikat/tidak digunakan masih tersimpan.
- `profile.png` sekitar 2,3 MB; `rizza1.png` sekitar 2,6 MB; beberapa FINDOR images 1,5–2,3 MB. Next Image membantu delivery, tetapi source asset tetap perlu dioptimasi.

---

## Audit chatbot dan API

### Bug konfigurasi penting

README menyatakan chatbot dapat memakai `GROQ_API_KEY` **atau** `GEMINI_API_KEY`. Implementasi mengambil salah satu key, tetapi selalu mengirim request ke endpoint Groq dengan model Groq. Jadi `GEMINI_API_KEY` saja tidak akan bekerja.

### Klaim keamanan terlalu tinggi

README menyebut “Guardrails tingkat tinggi untuk mencegah prompt injection”. Implementasinya baru berupa instruksi di system prompt. Itu bukan boundary keamanan yang kuat. Tidak ada output policy enforcement, allowlist tool, structured response validation, atau content moderation khusus.

### Risiko biaya dan reliability

- Endpoint publik tidak memiliki rate limit.
- Tidak ada timeout pada request ke Groq.
- Tidak ada pembatasan berbasis IP/session.
- Body JSON penuh diparse sebelum pesan dipotong.
- Error API internal dapat ditampilkan langsung ke client pada sebagian kondisi.

Bot adalah fitur menarik, tetapi recruiter lebih menghargai tiga case study kuat daripada chatbot yang berpotensi gagal atau menghabiskan kuota. Jadikan chatbot enhancement sekunder, bukan bukti utama.

---

## Audit performa

### Masalah utama

1. **Artificial loader 1,5 detik.** Pengguna dipaksa menunggu walau halaman sudah siap, dan loader muncul lagi pada navigasi ke halaman detail.
2. **Font dimuat setelah interactive.** Stylesheet Google Fonts baru ditambahkan lewat script, sehingga ada risiko flash/layout shift. Gunakan `next/font` atau self-host.
3. **Hydration terlalu luas.** Banyak section statis menjadi client component hanya untuk animasi.
4. **Animasi berulang.** Role rotator, project carousel, contribution effects, loader, dan chatbot berjalan bersama.
5. **Aset mentah besar.** Beberapa PNG 2–2,6 MB dan achievement PNG hampir 1 MB.
6. **GitHub API mahal.** Satu request dapat memicu fetch user, pagination repo, GraphQL contributions, dan sampai 30 language requests.

Loader sebaiknya dihapus atau hanya tampil saat benar-benar ada state loading. Portofolio cepat yang langsung menampilkan hero terasa lebih profesional daripada angka loading buatan.

---

## Audit SEO, metadata, dan tautan

### Masalah domain

- Website aktif: `https://reycannavaro.dev` → HTTP 200 dan redirect ke `https://www.reycannavaro.dev/`.
- `https://reycannavaro.vercel.app` → **HTTP 404**.
- `layout.tsx` masih memakai domain Vercel 404 untuk author URL, Open Graph URL, dan canonical default.
- `page.tsx`, robots, dan sitemap memakai `.dev`.

Akibatnya social crawler dapat menerima URL yang salah walau canonical homepage dioverride.

### Social metadata

- Tidak ada `openGraph.images` atau Twitter image, sehingga share preview tidak maksimal.
- Twitter creator di metadata adalah `@reycannavaro`, tetapi URL tersebut mengembalikan 404 saat diuji.
- Data sosial aplikasi justru mengarah ke `@deianersait`, yang aktif. Identitas ini harus diseragamkan.

### Sitemap dan halaman detail

Sitemap hanya memuat homepage dan tidak memasukkan `/experience/quantum-leap`. Halaman detail juga belum memiliki metadata dinamis sendiri. Tambahkan title, description, canonical, dan share image per case study.

### Tambahan SEO

- Tambahkan JSON-LD `Person` dan `CreativeWork/SoftwareSourceCode` secara hati-hati.
- Gunakan satu hostname canonical (`www` atau non-`www`) secara konsisten.
- Tambahkan custom 404.
- Jangan memakai `lastModified: new Date()` bila konten sebenarnya tidak berubah.

---

## Informasi yang akan saya gali saat interview

Jika saya menjadi hiring manager, saya akan menanyakan:

1. Mana proyek individu dan mana proyek tim?
2. Apa kontribusi Rey pada repository milik akun lain?
3. Modul ERP mana yang benar-benar ditulis Rey?
4. Apa code review dan deployment workflow di Quantum Leap?
5. Bagaimana angka peningkatan performa diukur?
6. Apakah ada izin menampilkan nama dan screenshot klien?
7. Mengapa FINDOR menampilkan ribuan vendor tetapi halaman pencarian menunjukkan empat vendor?
8. Apa dataset, baseline, dan F1 score Sentiment Analyzer?
9. Bagaimana Medibot mencegah hallucination dan memberi sumber?
10. Bagaimana SIRA memvalidasi code challenge dengan aman?
11. Bagaimana Supabase RLS diterapkan pada SIRA/DESATA/FINDOR?
12. Apa satu keputusan teknis yang gagal dan bagaimana Rey memperbaikinya?

Portofolio idealnya sudah menjawab 60–70% dari pertanyaan ini sebelum interview.

---

## Struktur halaman yang saya rekomendasikan

1. **Hero** — satu role, satu value proposition, View case studies, Download CV.
2. **Proof strip** — Internship ERP · 3 live products · 2 national tech awards.
3. **Featured case studies** — SIRA, DESATA, FINDOR/UrbanGrow.
4. **Experience** — Quantum Leap dengan dua case study mendalam dan NDA-safe.
5. **Technical strengths** — maksimal 12 skill, dipetakan ke proyek.
6. **Selected achievements** — dua tech + satu leadership.
7. **GitHub** — ringkasan kecil dan pinned repositories.
8. **Education** — SMK Telkom dan expected graduation.
9. **Contact** — availability, location/work mode, CV, email, LinkedIn.

Chatbot dapat tetap floating, tetapi jangan sampai menutup navigasi atau CTA mobile.

---

## Roadmap perbaikan

### P0 — Selesaikan sebelum mengirim lamaran (1–3 hari)

- [ ] Tambahkan CV PDF yang dapat diunduh.
- [ ] Hapus/label semua statistik dummy dan klaim yang belum terbukti.
- [ ] Audit izin penggunaan nama/screenshot klien; sanitize bila ragu.
- [ ] Ambil ulang screenshot tanpa browser chrome, localhost, bookmark, taskbar, atau data sensitif.
- [ ] Perbaiki overflow mobile 390 px dan konflik bottom nav/chatbot.
- [ ] Ganti seluruh metadata `.vercel.app` ke domain aktif.
- [ ] Samakan Twitter/X handle.
- [ ] Perbarui 6+ proyek, 12+ prestasi, dan Next.js 15 yang sudah stale.
- [ ] Perbaiki semua lint error/warning.
- [ ] Perbaiki fallback `GEMINI_API_KEY` atau hapus klaim dukungannya.

### P1 — Naikkan conversion recruiter (3–7 hari)

- [ ] Buat case study lengkap untuk SIRA, DESATA, dan UrbanGrow/FINDOR.
- [ ] Tambahkan role pribadi, team size, timeline, constraint, architecture, testing, dan hasil.
- [ ] Pindahkan project/experience sebelum GitHub Stats.
- [ ] Kurangi skill menjadi core/working/exploring.
- [ ] Kurasi achievements menjadi tiga utama.
- [ ] Tambahkan CTA “View case study” pada setiap proyek unggulan.
- [ ] Tambahkan video demo 45–90 detik untuk proyek tanpa deployment.
- [ ] Tambahkan label prototype/team project/client work secara konsisten.

### P2 — Jadikan portofolio production-grade (1–2 minggu)

- [ ] Refactor komponen monolitik dan kurangi inline styles.
- [ ] Kurangi client components dan hydration yang tidak perlu.
- [ ] Hapus artificial loader.
- [ ] Implementasikan focus-visible, skip link, semantic controls, dan keyboard flow.
- [ ] Hentikan rotator/carousel saat reduced motion aktif atau tab tidak terlihat.
- [ ] Tambahkan rate limit, timeout, dan safe error handling untuk chatbot.
- [ ] Optimasi source images dan hapus aset/dependency mati.
- [ ] Tambahkan OG image, metadata case study, sitemap lengkap, JSON-LD, dan custom 404.
- [ ] Bentuk identitas visual milik Rey sendiri, tidak terlalu literal BMW M.

---

## Lima perubahan dengan ROI tertinggi

1. **Ganti klaim generik dengan tiga case study terukur.**
2. **Tambahkan CV dan letakkan proyek sebelum GitHub Stats.**
3. **Sanitize screenshot serta data klien/demo.**
4. **Perbaiki mobile viewport dan aksesibilitas interaksi.**
5. **Selaraskan domain, handle, angka, dan seluruh fakta kecil.**

---

## Putusan akhir sebagai HR

Rey sudah memiliki bahan yang cukup untuk terlihat menonjol sebagai kandidat junior: kemampuan membuat produk, keberanian mencoba banyak stack, pengalaman internship nyata, prestasi nasional, dan personal brand yang kuat. Saya akan mengundang Rey ke screening karena potensinya terlihat jelas.

Tetapi, saya juga akan masuk ke interview dengan mode verifikasi. Saat ini portofolio terlalu sering meminta recruiter mempercayai klaim tanpa memberi bukti yang setara. Untuk role junior, Rey tidak perlu terdengar seperti senior engineer. Lebih kuat bila terlihat **jujur, spesifik, mampu menjelaskan keputusan, dan sadar batasan**.

**Saat ini:** layak screening, belum layak auto-shortlist.  
**Setelah P0 + tiga case study kuat:** sangat kompetitif untuk internship/junior full-stack di pasar Indonesia.

---

## Catatan verifikasi audit

- Production build berhasil pada Next.js 16.1.6.
- ESLint gagal dengan 3 error dan 1 warning.
- Render live desktop 1440×900 terlihat kuat dan stabil pada hero.
- Render live mobile 390×844 menunjukkan clipping/overflow.
- CLI `browser-use` tidak tersedia; verifikasi visual live dilakukan dengan Microsoft Edge headless.
- Seluruh aset gambar proyek, pengalaman, dan prestasi telah diperiksa, bukan hanya thumbnail yang tampil di homepage.
- Audit tautan dilakukan pada 16 Agustus 2026; status dapat berubah setelah tanggal tersebut.
