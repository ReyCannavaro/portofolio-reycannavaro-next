import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer Sidoarjo",
  description:
    "Portfolio Rey Cannavaro (Reyjuno Al Cannavaro) — Fullstack Developer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, React, Next.js, dan IoT.",
  keywords: [
    "Rey Cannavaro",
    "Reyjuno Al Cannavaro",
    "Reyjuno Cannavaro",
    "Rey Cannavaro developer",
    "fullstack developer Sidoarjo",
    "Laravel developer Indonesia",
    "React developer Sidoarjo",
    "Next.js developer Indonesia",
    "portfolio Rey Cannavaro",
    "portofolio Reyjuno Al Cannavaro",
    "SMK Telkom Sidoarjo",
  ],
  authors: [{ name: "Rey Cannavaro", url: "https://reycannavaro.vercel.app" }],
  creator: "Rey Cannavaro",
  openGraph: {
    title: "Rey Cannavaro | Fullstack Developer",
    description:
      "Portfolio Rey Cannavaro (Reyjuno Al Cannavaro) — Fullstack Developer berbasis di Sidoarjo, Indonesia.",
    url: "https://reycannavaro.vercel.app",
    siteName: "Rey Cannavaro Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rey Cannavaro | Fullstack Developer",
    description:
      "Portfolio Rey Cannavaro (Reyjuno Al Cannavaro) — Fullstack Developer berbasis di Sidoarjo, Indonesia.",
    creator: "@reycannavaro",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://reycannavaro.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${syne.variable} ${dmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}