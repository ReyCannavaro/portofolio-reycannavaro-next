import type { Metadata } from "next";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Prestasi from "./components/Prestasi";
import Footer from "./components/Footer";
import NowPlaying from "./components/NowPlaying";
import HireMeCTA from "./components/HireMeCTA";

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer Sidoarjo",
  alternates: {
    canonical: "https://reycannavaro.vercel.app",
  },
};

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100svh" }}>
      <HireMeCTA />
      <NowPlaying />
      <Navbar />
      <Hero />
      <div>
        <Skills />
        <Projects />
        <Education />
        <Prestasi />
      </div>
      <Footer />
    </main>
  );
}