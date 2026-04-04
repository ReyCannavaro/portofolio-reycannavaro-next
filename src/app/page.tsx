import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Prestasi from "./components/Prestasi";
import Footer from "./components/Footer";
import TerminalWrapper from "./components/Terminal";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import NowPlaying from "./components/NowPlaying";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100svh" }}>
      <LoadingScreen />
      <CustomCursor />
      <NowPlaying />
      <Navbar />
      <Hero />
      <div>
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