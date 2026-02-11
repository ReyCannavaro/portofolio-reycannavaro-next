// src/data/index.ts

export const educationHistory = [
  {
    id: 1,
    institution: 'SMK Telkom Sidoarjo',
    degree: 'Jurusan Sistem Informasi Jaringan dan Aplikasi',
    graduationYear: '2027',
    details: [
      'Digital Talent Program',
      'Junior Website Developer',
    ]
  },
    {
    id: 2,
    institution: 'SMP Darul Fikri Sidoarjo',
    degree: 'Boarding School',
    graduationYear: '2023',
    details: [
      '7 Juz Tahfidz Al-Qur\'an',
      'School of Leadership',
    ]
  },
];

export const prestasiData = [
  {
    id: 1,
    title: 'Pengisi Materi Leadership Kegiatan Kursus Pengelolaan Dewan Ambalan (KPDA)',
    organizer: 'Dewan Ambalan SMK Telkom Sidoarjo',
    year: '2025',
    images: '/prestasi/prestasi1.jpeg',
  },
  {
    id: 2,
    title: 'Juara 2 Umum Lomba Prestasi Penegak (LPP) Sidoarjo',
    organizer: 'Dewan Kerja Cabang Sidoarjo',
    year: '2025',
    images: '/prestasi/prestasi2.jpeg',
  },
  {
    id: 3,
    title: 'Pasukan Pengibar Bendera Pusaka (PASKIBRAKA) Kecamatan Sidoarjo',
    organizer: 'Kecamatan Sidoarjo',
    year: '2024',
    images: '/prestasi/prestasi3.jpeg',
  },
  {
    id: 4,
    title: 'Pemangku Adat Putra Dewan Ambalan SMK Telkom Sidoarjo',
    organizer: 'Dewan Ambalan SMK Telkom Sidoarjo',
    year: '2024',
    images: '/prestasi/prestasi4.jpeg',
  },
  {
    id: 5,
    title: 'Pradana Putra Dewan Ambalan SMK Telkom Sidoarjo',
    organizer: 'Dewan Ambalan SMK Telkom Sidoarjo',
    year: '2025',
    images: '/prestasi/prestasi5.jpeg',
  },
  {
    id: 6,
    title: 'Sekretaris Kegiatan Diesnatalis 5 SMK Telkom Sidoarjo',
    organizer: 'OSIS SMK Telkom Sidoarjo',
    year: '2024',
    images: '/prestasi/prestasi6.jpeg',
  },
  {
    id: 7,
    title: 'Sekretaris OSIS SMK Telkom Sidoarjo',
    organizer: 'OSIS SMK Telkom Sidoarjo',
    year: '2025',
    images: '/prestasi/prestasi7.png',
  },
  {
    id: 8,
    title: 'Juara 1 Scout Mobile Legends Lomba Giat Prestasi',
    organizer: 'Dewan Kerja Cabang Sidoarjo',
    year: '2024',
    images: '/prestasi/prestasi8.jpeg',
  },
  {
    id: 9,
    title: 'Juara 2 Scout Movie Lomba Giat Prestasi',
    organizer: 'Dewan Kerja Cabang Sidoarjo',
    year: '2024',
    images: '/prestasi/prestasi9.jpeg',
  },
  {
    id: 10,
    title: 'Sekretaris Kegiatan Diesnatalis 6 SMK Telkom Sidoarjo',
    organizer: 'OSIS',
    year: '2025',
    images: '/prestasi/prestasi10.jpeg',
  },
  {
    id: 11,
    title: 'Juara 1 Lomba Karya Tulis Ilmiah Tingkat SMA/SMK Nasional',
    organizer: 'Himpunan Mahasiswa Teknik Elektro Telkom University',
    year: '2025',
    images: '/prestasi/prestasi11.jpg',
  },
  {
    id: 12,
    title: 'Pramuka Penegak Garuda Kabupaten Sidoarjo',
    organizer: 'Kwartir Cabang Sidoarjo',
    year: '2025',
    images: '/prestasi/prestasi12.jpeg',
  },
];

export const projects = [
  {
    id: 'techsphere',
    name: 'TechSphere',
    description: 'Proyek web ini adalah platform untuk menjelajahi berbagai gadget, melihat detailnya, dan memberikan rating. Dibangun menggunakan framework Laravel, proyek ini dilengkapi dengan panel admin menggunakan Filament untuk manajemen data yang efisien.',
    technologies: ['Laravel 11', 'Tailwind CSS', 'Filament', 'MySQL'],
    role: 'Full-stack Developer',
    colors: ['#fff', '#f5f5f5', '#000', '#d6d6d6'],
    images: ['/projects/techsphere1.png', '/projects/techsphere2.png', '/projects/techsphere3.png'],
    githubLink: 'https://github.com/ReyCannavaro/TechSphere-Laravel.git'
  },
  {
    id: 'pt-rizza-jaya-abadi',
    name: 'PT Rizza Jaya Abadi',
    description: 'Sistem manajemen pemesanan dan operasional untuk perusahaan travel, mencakup jadwal keberangkatan, transaksi, dan laporan.',
    technologies: ['Laravel 12', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    role: 'Full-stack Developer',
    colors: ['rgba(118, 148, 76, 1)', 'rgba(200, 218, 166, 1)', 'rgba(251, 245, 219, 1)'],
    images: ['/projects/rizza1.png', '/projects/rizza2.png', '/projects/rizza3.png'],
    githubLink: 'https://github.com/ReyCannavaro/PT.RizzaJayaAbadi.git'
  },
  {
    id: 'medibot',
    name: 'Medibot',
    description: 'Medibot adalah chatbot AI yang dibangun menggunakan Laravel dan Google Gemini API. Dengan fitur Retrieval-Augmented Generation (RAG), chatbot ini memberikan informasi kesehatan awal berdasarkan dokumen medis terpercaya, memastikan akurasi dan relevansi jawaban.',
    technologies: ['Laravel 11', 'Google Gemini API', 'smalot/pdfparser', 'MySQL', 'PostgreSQL'],
    role: 'Frontend Developer',
    colors: ['#FFC45C', '#0009FF', '#8A2A52'],
    images: ['/projects/medibot1.png', '/projects/medibot2.png', '/projects/medibot3.png'],
    githubLink: 'https://github.com/Satyasy/Medibot.git'
  },
  {
    id: 'UrbanGrow',
    name: 'UrbanGrow',
    description: 'UrbanGrow adalah aplikasi berbasis IoT yang dirancang untuk memantau dan mengelola kondisi tanaman secara real-time. Dengan menggunakan sensor kelembaban tanah, suhu, dan cahaya, aplikasi ini memberikan data penting kepada pengguna untuk memastikan pertumbuhan tanaman yang optimal di lingkungan perkotaan.',
    technologies: ['React', 'Google Gemini API', 'micropython', 'Thonny', 'Tailwind CSS'],
    role: 'Fullstack Developer',
    colors: ['#FFC45C', '#0009FF', '#8A2A52'],
    images: ['/projects/urbangrow1.png'],
    githubLink: 'https://github.com/ReyCannavaro/urbangrow.git'
  },
  {
    id: 'Sentiment Analyzer',
    name: 'Sentiment Analyzer',
    description: 'Sentiment Analyzer adalah aplikasi web yang menggunakan analisis sentimen berbasis AI untuk mengevaluasi opini pengguna dari ulasan produk. Dengan mengintegrasikan Google Gemini API, aplikasi ini mampu mengkategorikan ulasan menjadi positif, negatif, atau netral, membantu bisnis memahami persepsi pelanggan mereka dengan lebih baik.',
    technologies: ['python', 'Streamlit', 'pandas', 'scikit-learn'],
    role: 'Fullstack Developer',
    colors: ['#FFC45C', '#0009FF', '#8A2A52'],
    images: ['/projects/sentiment1.jpeg'],
    githubLink: 'https://github.com/ReyCannavaro'
  },
    {
    id: 'Veritas AI',
    name: 'Veritas AI',
    description: 'Veritas AI adalah platform berbasis AI yang dirancang untuk membantu pengguna dalam mengidentifikasi dan menganalisis informasi penting dari berbagai sumber data. Dengan integrasi Machine Learning API, platform ini memungkinkan pengguna untuk mengekstrak dan mengklasifikasikan informasi secara otomatis, meningkatkan efisiensi dan akurasi dalam proses pengambilan keputusan.',
    technologies: ['python', 'React', 'JavaScript', 'pandas', 'scikit-learn'],
    role: 'Fullstack Developer',
    colors: ['#FFC45C', '#0009FF', '#8A2A52'],
    images: ['/projects/veritas1.png'],
    githubLink: 'https://github.com/ReyCannavaro/VeritasAI.git'
  },
];

export const hardskills = [
  { id: 1, name: 'Android', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original-wordmark.svg', type: 'Mobile Dev' },
  { id: 2, name: 'Bash', icon: 'https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg', type: 'CLI' },
  { id: 3, name: 'Bootstrap', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg', type: 'Frontend' },
  { id: 4, name: 'CSS3', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg', type: 'Frontend' },
  { id: 5, name: 'Figma', icon: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg', type: 'UI/UX' },
  { id: 6, name: 'Git', icon: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg', type: 'Version Control' },
  { id: 7, name: 'HTML5', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg', type: 'Frontend' },
  { id: 8, name: 'JavaScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', type: 'Frontend' },
  { id: 9, name: 'Laravel', icon: 'https://www.vectorlogo.zone/logos/laravel/laravel-icon.svg', type: 'Backend' },
  { id: 10, name: 'MySQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg', type: 'Database' },
  { id: 11, name: 'Node.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg', type: 'Backend' },
  { id: 12, name: 'Pandas', icon: 'https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg', type: 'Data Science' },
  { id: 13, name: 'PHP', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg', type: 'Backend' },
  { id: 14, name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', type: 'API Testing' },
  { id: 15, name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg', type: 'Frontend' },
  { id: 16, name: 'React Native', icon: 'https://reactnative.dev/img/header_logo.svg', type: 'Mobile Dev' },
  { id: 17, name: 'Scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', type: 'Machine Learning' },
  { id: 18, name: 'Tailwind CSS', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', type: 'Frontend' },
  { id: 19, name: 'Vue.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg', type: 'Frontend' },
  { id: 20, name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', type: 'Framework' },
];

export const softskills = [
  { id: 1, name: 'Komunikasi', icon: 'https://cdn-icons-png.flaticon.com/512/2950/2950831.png', type: 'Interpersonal' },
  { id: 2, name: 'Kerja Sama Tim', icon: 'https://cdn-icons-png.flaticon.com/512/10041/10041075.png', type: 'Interpersonal' },
  { id: 3, name: 'Manajemen Waktu', icon: 'https://cdn-icons-png.flaticon.com/512/10206/10206497.png', type: 'Organizational' },
  { id: 4, name: 'Problem Solving', icon: 'https://cdn-icons-png.flaticon.com/512/8690/8690604.png', type: 'Cognitive' },
  { id: 5, name: 'Kepemimpinan', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', type: 'Interpersonal' },
  { id: 6, name: 'Adaptasi & Belajar Cepat', icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png', type: 'Cognitive' },
  { id: 7, name: 'Kreativitas', icon: 'https://cdn-icons-png.flaticon.com/512/3655/3655588.png', type: 'Creative' },
];