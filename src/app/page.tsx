import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Prestasi from "./components/Prestasi";
import Education from "./components/Education";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer Sidoarjo",
  alternates: {
    canonical: "https://reycannavaro.vercel.app",
  },
};

export default function Home() {
  return (
    <div style={{ background: "var(--canvas)", minHeight: "100svh" }}>
      <Sidebar />
      <main className="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Prestasi />
        <Education />
        <Footer />
      </main>
    </div>
  );
}