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
  title: "Rey Cannavaro | Fullstack Developer & Designer",
  description:
    "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, React, Next.js, IoT, dan AI.",
  keywords: [
    "Rey Cannavaro", "Reyjuno Al Cannavaro", "fullstack developer Sidoarjo",
    "designer developer Indonesia", "Laravel developer Indonesia",
    "React developer Sidoarjo", "Next.js developer Indonesia",
    "portfolio Rey Cannavaro", "SMK Telkom Sidoarjo",
  ],
  authors: [{ name: "Rey Cannavaro", url: "https://reycannavaro.dev" }],
  creator: "Rey Cannavaro",
  openGraph: {
    title: "Rey Cannavaro | Fullstack Developer & Designer",
    description: "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia.",
    url: "https://reycannavaro.dev",
    siteName: "Rey Cannavaro Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rey Cannavaro | Fullstack Developer & Designer",
    description: "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia.",
    creator: "@reycannavaro",
  },
  robots: { index: true, follow: true },
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
