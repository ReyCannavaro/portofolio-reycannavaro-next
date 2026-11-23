export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  award: string;
  role: string;
  duration: string;
  heroImage: string;
  gallery: string[];
  challenge: string;
  overview: string;
  architecture: {
    overview: string;
    diagramSteps: { step: string; title: string; desc: string; tech: string }[];
    stack: { layer: string; tech: string; reason: string }[];
  };
  decisions: { decision: string; choice: string; why: string }[];
  results: { metric: string; label: string; desc: string }[];
  links: {
    github?: string;
    live?: string | null;
  };
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "urbangrow",
    title: "UrbanGrow Smart Aquaponic",
    tagline: "Climate-Adaptive IoT Telemetry & Predictive AI Harvest Ecosystem",
    category: "IoT & Predictive AI",
    award: "Top 10 Finalist IoT Competition — MAGE 12 ITS (2026)",
    role: "System Architect & Lead Fullstack Developer",
    duration: "6+ Months (Active Engineering)",
    heroImage: "/projects/urbangrow-dashboard.png",
    gallery: ["/projects/urbangrow-dashboard.png", "/projects/urbangrow-ai.png"],
    overview:
      "UrbanGrow adalah ekosistem rekayasa terintegrasi yang menggabungkan perangkat keras mikrokontroler IoT dengan kecerdasan buatan prediktif guna mewujudkan pertanian presisi akuaponik bertingkat yang tahan terhadap perubahan iklim ekstrem di wilayah perkotaan tropis.",
    challenge:
      "Sistem akuaponik konvensional di wilayah perkotaan tropis menghadapi tantangan fluktuasi suhu air dan lonjakan kadar amonia yang tidak terduga, yang secara langsung mengancam kelangsungan hidup ikan nila dan laju pertumbuhan tanaman selada air. Pengawasan manual memiliki jeda waktu respons yang lambat, rentan kesalahan manusia, dan sama sekali tidak memiliki kemampuan proyeksi matematis kapan masa panen optimum tercapai.",
    architecture: {
      overview:
        "Arsitektur monorepo terdistribusi yang memisahkan aliran ingest telemetri frekuensi tinggi dari komputasi inferensi analitik machine learning, menjamin ketersediaan sistem 24/7 nonstop.",
      diagramSteps: [
        {
          step: "01",
          title: "Edge Sensing & Telemetry",
          desc: "Mikrokontroler membaca 6 sensor parameter (pH, TDS/EC, Water Temp, Ambient Temp/Humidity, Water Flow, Lux) secara berkala.",
          tech: "ESP32 FreeRTOS",
        },
        {
          step: "02",
          title: "High-Throughput Ingestion",
          desc: "Server menerima dan memvalidasi payload telemetri dengan latensi konsisten sub-10ms dan overhead memori minimal.",
          tech: "Bun & ElysiaJS",
        },
        {
          step: "03",
          title: "Time-Series Hypertable Storage",
          desc: "Penyimpanan data deret waktu terkompresi dengan performa query temporal tinggi untuk pencatatan historis tanpa degradasi.",
          tech: "TimescaleDB (PostgreSQL)",
        },
        {
          step: "04",
          title: "Predictive Analytics Microservice",
          desc: "Microservice mengeksekusi model XGBoost regressor dan algoritma Growing Degree Days (GDD) untuk estimasi panen dan biomassa.",
          tech: "Python FastAPI & XGBoost",
        },
        {
          step: "05",
          title: "Multi-Platform Client Dashboard",
          desc: "Visualisasi data telemetri interaktif di web responsif dan aplikasi mobile untuk kontrol aktuator serta push notification darurat.",
          tech: "Next.js 16 & Flutter 3",
        },
      ],
      stack: [
        { layer: "Hardware & Edge", tech: "ESP32, FreeRTOS, MicroPython", reason: "Multi-threading real-time scheduling untuk sampling sensor tanpa blocking." },
        { layer: "Ingestion Engine", tech: "Bun Runtime & ElysiaJS", reason: "Performa throughput 3.5x lebih tinggi dibanding Express tradisional dengan jejak memori hemat." },
        { layer: "Time-Series Database", tech: "TimescaleDB (PostgreSQL)", reason: "Partisi otomatis hypertable dan kompresi kolom native untuk data sensor volume tinggi." },
        { layer: "Machine Learning", tech: "FastAPI, XGBoost, Scikit-learn", reason: "Model ensemble regresi tabular yang akurat untuk prediksi biomassa dan GDD." },
        { layer: "Web Interface", tech: "Next.js 16 (App Router + Turbopack)", reason: "Server Components berkecepatan tinggi dengan visualisasi grafik telemetri interaktif." },
        { layer: "Mobile Client", tech: "Flutter 3 (Dart)", reason: "Aplikasi cross-platform untuk kontrol aktuator relay otomatis dan alert lapangan." },
      ],
    },
    decisions: [
      {
        decision: "Pemilihan Runtime Backend: Bun & ElysiaJS vs Node.js Express",
        choice: "Bun + ElysiaJS",
        why: "Dalam sistem IoT telemetri tinggi, latensi per request adalah prioritas kritis. Bun dengan ElysiaJS memberikan performa HTTP throughput jauh lebih tinggi dengan latensi konsisten sub-10ms pada server bersumber daya terbatas.",
      },
      {
        decision: "Penyimpanan Data Sensor: TimescaleDB vs MySQL Standar",
        choice: "TimescaleDB Hypertable on PostgreSQL",
        why: "Data telemetri bertambah ribuan baris setiap hari. TimescaleDB menyediakan hypertable otomatis berbasis waktu dengan kompresi hingga 90%, menghindari kelambatan query agregasi yang lazim terjadi pada MySQL standar.",
      },
      {
        decision: "Arsitektur Machine Learning: Microservice Decoupled vs Monolitik",
        choice: "Microservice Terpisah (FastAPI)",
        why: "Inferensi model XGBoost membutuhkan komputasi CPU intensif. Memisahkannya ke service independen memastikan penerimaan data sensor dari mikrokontroler tidak pernah terblokir oleh pemrosesan analitik.",
      },
    ],
    results: [
      { metric: "Top 10", label: "Finalist MAGE 12 ITS", desc: "Berhasil menembus babak final kompetisi IoT bergengsi tingkat nasional di ITS Surabaya." },
      { metric: "< 10ms", label: "Ingest Latency", desc: "Waktu respons pemrosesan telemetri sensor dari mikrokontroler ke basis data." },
      { metric: "93.4%", label: "Model Accuracy", desc: "Tingkat akurasi estimasi laju pertumbuhan biomassa ikan nila dan hari panen tanaman." },
      { metric: "100%", label: "Automated Control", desc: "Pengaktifan pompa aerator dan nutrisi otomatis berdasarkan ambang batas sensor presisi." },
    ],
    links: {
      github: "https://github.com/ReyCannavaro/urbangrow-eng.git",
      live: null,
    },
  },
  {
    slug: "skomda-gateway",
    title: "SKOMDA Digital Gateway",
    tagline: "Official Institutional Portal & Modular Web Ecosystem with Integrated AI",
    category: "Web Engineering & Institutional Ecosystem",
    award: "Juara 3 Nasional — Jagoan Hosting Innovation Competition (JHIC 2026)",
    role: "Project Manager & Lead Frontend Developer",
    duration: "3 Months (Agile Development)",
    heroImage: "/projects/skomda1.png",
    gallery: ["/projects/skomda1.png"],
    overview:
      "SKOMDA Digital Gateway adalah platform portal resmi terpadu untuk SMK Telkom Sidoarjo yang dirancang ulang untuk menghadirkan pengalaman digital modern, modular, dan interaktif bagi ribuan siswa, guru, orang tua, dan calon peserta didik baru.",
    challenge:
      "Portal sekolah sebelumnya mengalami fragmentasi informasi di berbagai subdomain, performa muat halaman yang lambat pada koneksi seluler, serta keterbatasan kanal komunikasi otomatis bagi calon siswa yang membutuhkan informasi kurikulum kejuruan (SIJA, RPL, TKJ). Pihak sekolah memerlukan ekosistem yang terpusat, cepat, berstandar industri, dan siap menangani trafik tinggi selama masa penerimaan peserta didik baru.",
    architecture: {
      overview:
        "Arsitektur Single Page Application (SPA) berbasis React dan TypeScript dengan pendekatan modular Atomic Design, dipadukan dengan asisten AI sekolah terintegrasi untuk layanan konsultasi interaktif 24/7.",
      diagramSteps: [
        {
          step: "01",
          title: "User Interface & Experience",
          desc: "Antarmuka responsif mobile-first berdesain modern dengan sistem komponen terisolasi dan mikro-interaksi dinamis.",
          tech: "React 19, Tailwind CSS, Framer Motion",
        },
        {
          step: "02",
          title: "Type-Safe Client Layer",
          desc: "Penerapan TypeScript strict mode pada seluruh formulir registrasi, showcase kejuruan, dan state management aplikasi.",
          tech: "TypeScript & Vite",
        },
        {
          step: "03",
          title: "Integrated AI Assistant",
          desc: "Layanan asisten virtual interaktif cerdas yang menjawab pertanyaan calon siswa seputar kurikulum, pendaftaran, dan fasilitas sekolah.",
          tech: "NLP Chat Assistant API",
        },
        {
          step: "04",
          title: "Edge Delivery & Deployment",
          desc: "Penyebaran aset statis teroptimasi dengan kompresi modern dan DNS routing aman pada infrastruktur cloud sekolah.",
          tech: "Cloud Infrastructure & CDN",
        },
      ],
      stack: [
        { layer: "Frontend Framework", tech: "React 19 & Vite", reason: "Hot Module Replacement instan dan bundle output yang sangat teroptimasi." },
        { layer: "Language", tech: "TypeScript Strict Mode", reason: "Mencegah runtime type error dan memastikan maintainability kode jangka panjang oleh tim sekolah." },
        { layer: "Styling & Layout", tech: "Tailwind CSS", reason: "Utility-first architecture untuk styling konsisten tanpa pembengkakan ukuran CSS file." },
        { layer: "Motion & Interaction", tech: "Framer Motion", reason: "Transisi halaman dan animasi showcase interaktif yang fluid dan hemat resource grafis." },
        { layer: "AI Integration", tech: "Interactive Assistant Module", reason: "Menjawab puluhan pertanyaan umum pendaftar baru secara instan tanpa membebani staf administrasi." },
      ],
    },
    decisions: [
      {
        decision: "Pendekatan Arsitektur: Modern SPA (Vite + React) vs Monolith CMS Tradisional",
        choice: "Vite + React SPA",
        why: "Menghilangkan jeda refresh halaman penuh secara total, memberikan navigasi instan antar kejuruan, dan memungkinkan integrasi asisten AI tanpa merestrukturisasi backend sekolah.",
      },
      {
        decision: "Penerapan Tata Kelola Proyek: Agile Scrum Leadership",
        choice: "Peran Ganda: Project Manager & Lead Frontend Developer",
        why: "Mengoordinasikan pembagian sprint mingguan antardev, code review ketat, dan iterasi umpan balik langsung dengan kepala program dan stakeholder sekolah hingga memenuhi seluruh standar kompetisi JHIC.",
      },
      {
        decision: "Optimasi Core Web Vitals pada Jaringan Seluler",
        choice: "Route-Based Code Splitting & Asset Modernization",
        why: "Banyak calon siswa mengakses portal dari ponsel dengan jaringan bervariasi. Pembagian bundle modular menghasilkan waktu First Contentful Paint (FCP) di bawah 1 detik.",
      },
    ],
    results: [
      { metric: "Juara 3", label: "Nasional JHIC 2026", desc: "Podium 3 Nasional kategori Inovasi Website Sekolah oleh Jagoan Hosting." },
      { metric: "100%", label: "Live Implementation", desc: "Resmi diimplementasikan oleh pihak sekolah di chevron.smktelkom-sda.sch.id." },
      { metric: "98+", label: "Lighthouse Score", desc: "Skor performa dan aksesibilitas tinggi pada pengujian Google Core Web Vitals." },
      { metric: "3 Jurusan", label: "Kejuruan Terintegrasi", desc: "Penyajian kurikulum dan karya siswa SIJA, RPL, dan TKJ secara interaktif." },
    ],
    links: {
      github: "https://github.com/vaiozaffana/jhic.git",
      live: "https://chevron.smktelkom-sda.sch.id/",
    },
  },
];

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies.find((p) => p.slug === slug);
}
