import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
        url: "https://reycannavaro.dev/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Reyjuno Al Cannavaro (Rey Cannavaro) - Fullstack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyjuno Al Cannavaro (Rey Cannavaro) | Fullstack Developer & Software Engineer",
    description:
      "Website portfolio resmi Reyjuno Al Cannavaro (Rey Cannavaro) — Fullstack Developer & Software Engineer berbasis di Sidoarjo, Indonesia.",
    creator: "@reycannavaro",
    images: ["https://reycannavaro.dev/images/profile.png"],
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
  alternates: { canonical: "https://reycannavaro.dev" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
