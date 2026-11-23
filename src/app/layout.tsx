import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://reycannavaro.dev"),
  title: "Reyjuno Al Cannavaro (Rey Cannavaro) | Fullstack Developer & Software Engineer",
  description:
    "Website portfolio resmi Reyjuno Al Cannavaro (Rey Cannavaro) — Fullstack Developer & Software Engineer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, Next.js, React, AI, dan IoT.",
  keywords: [
    "Reyjuno Al Cannavaro",
    "Reyjuno Cannavaro",
    "Reyjuno",
    "Rey Cannavaro",
    "Reyjuno Al Cannavaro Portfolio",
    "Reyjuno Al Cannavaro LinkedIn",
    "Reyjuno Al Cannavaro GitHub",
    "Reyjuno Al Cannavaro SMK Telkom Sidoarjo",
    "fullstack developer Sidoarjo",
    "software engineer Sidoarjo",
    "Laravel developer Indonesia",
    "React developer Sidoarjo",
    "Next.js developer Indonesia",
    "SMK Telkom Sidoarjo developer",
  ],
  authors: [{ name: "Reyjuno Al Cannavaro (Rey Cannavaro)", url: "https://reycannavaro.dev" }],
  creator: "Reyjuno Al Cannavaro",
  publisher: "Reyjuno Al Cannavaro",
  openGraph: {
    title: "Reyjuno Al Cannavaro (Rey Cannavaro) | Fullstack Developer & Software Engineer",
    description:
      "Website portfolio resmi Reyjuno Al Cannavaro (Rey Cannavaro) — Fullstack Developer & Software Engineer berbasis di Sidoarjo, Indonesia.",
    url: "https://reycannavaro.dev",
    siteName: "Reyjuno Al Cannavaro Portfolio",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "https://reycannavaro.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reyjuno Al Cannavaro (Rey Cannavaro) - Fullstack Developer & Software Engineer Official Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyjuno Al Cannavaro (Rey Cannavaro) | Fullstack Developer & Software Engineer",
    description:
      "Website portfolio resmi Reyjuno Al Cannavaro (Rey Cannavaro) — Fullstack Developer & Software Engineer berbasis di Sidoarjo, Indonesia.",
    creator: "@reycannavaro",
    images: ["https://reycannavaro.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google95de43cc49fb7357",
  },
  alternates: { canonical: "https://reycannavaro.dev" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://reycannavaro.dev/#person",
      name: "Reyjuno Al Cannavaro",
      alternateName: ["Rey Cannavaro", "Reyjuno Cannavaro", "Reyjuno"],
      jobTitle: "Fullstack Developer & Software Engineer",
      description:
        "Fullstack Developer and Technical Lead specializing in enterprise ERP/HRIS systems, climate-adaptive IoT, and predictive AI integration.",
      url: "https://reycannavaro.dev",
      image: "https://reycannavaro.dev/images/profile.png",
      email: "mailto:reyjunoalcannavaro@gmail.com",
      telephone: "+6282139531132",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sidoarjo",
        addressRegion: "Jawa Timur",
        addressCountry: "ID",
      },
      worksFor: {
        "@type": "Organization",
        name: "Quantum Leap (PT Qlcom Solusi Bisnis)",
        url: "https://qlcom.co.id",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "SMK Telkom Sidoarjo",
          url: "https://smktelkom-sda.sch.id",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/in/reycannavaro",
        "https://github.com/ReyCannavaro",
        "https://instagram.com/reycannavaro",
      ],
      knowsAbout: [
        "Full-Stack Development",
        "Laravel 11",
        "Next.js",
        "React",
        "Vue.js",
        "TypeScript",
        "PostgreSQL",
        "MySQL",
        "TimescaleDB",
        "IoT ESP32 FreeRTOS",
        "Predictive AI & Machine Learning",
      ],
      award: [
        "Juara 3 Jagoan Hosting Innovation Competition (JHIC 2026)",
        "Top 10 Finalist IoT MAGE 12 ITS (2026)",
        "Juara 2 Web Design Competition Nasional IBIK Bogor (2026)",
        "Juara 1 LKTI Nasional Telkom University (2025)",
        "Pramuka Penegak Garuda Kwartir Cabang Sidoarjo (2025)",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://reycannavaro.dev/#website",
      url: "https://reycannavaro.dev",
      name: "Reyjuno Al Cannavaro Official Portfolio",
      description:
        "Official engineering portfolio of Reyjuno Al Cannavaro (Rey Cannavaro) — Fullstack Developer & Software Engineer.",
      publisher: { "@id": "https://reycannavaro.dev/#person" },
      inLanguage: "id-ID",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://reycannavaro.dev/#webpage",
      url: "https://reycannavaro.dev",
      name: "Reyjuno Al Cannavaro (Rey Cannavaro) | Fullstack Developer & Software Engineer",
      isPartOf: { "@id": "https://reycannavaro.dev/#website" },
      about: { "@id": "https://reycannavaro.dev/#person" },
      mainEntity: { "@id": "https://reycannavaro.dev/#person" },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
