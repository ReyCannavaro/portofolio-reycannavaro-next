import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Prestasi from "./components/Prestasi";
import Footer from "./components/Footer";
import TerminalWrapper from "./components/Terminal";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  return (
    <main className="bg-[#07090f] min-h-screen">
      <LoadingScreen />
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