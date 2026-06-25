import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import GitHubStats from "./components/GitHubStats";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Prestasi from "./components/Prestasi";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer",
  alternates: {
    canonical: "https://reycannavaro.dev",
  },
};

export default function Home() {
  return (
    <div style={{ background: "var(--canvas)", minHeight: "100svh" }}>
      <Loader />
      <Sidebar />
      <main className="main-content">
        <Hero />
        <GitHubStats />
        <Skills />
        <Projects />
        <Prestasi />
        <Education />
        <Footer />
      </main>
      <Chatbot />
    </div>
  );
}
