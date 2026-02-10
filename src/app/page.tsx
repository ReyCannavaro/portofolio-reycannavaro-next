import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Prestasi from "./components/Prestasi";
import Footer from "./components/Footer";
import TerminalWrapper from "./components/Terminal";

export default function Home() {
  return (
    <main className="bg-[#020617] min-h-screen">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <Skills />
        <TerminalWrapper /> 
        <Projects />
        <Education />
        <Prestasi />
      </div>
      <Footer />
    </main>
  );
}