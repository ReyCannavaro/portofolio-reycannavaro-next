import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import GitHubStats from "./components/GitHubStats";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Prestasi from "./components/Prestasi";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";
import { personalInfo, socialLinks, projects, achievements } from "./data";

export const metadata: Metadata = {
  title: "Rey Cannavaro | Fullstack Developer & Software Engineer",
  description:
    "Portfolio Rey Cannavaro — Fullstack Developer & Designer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, React, Next.js, IoT, dan AI.",
  alternates: {
    canonical: "https://reycannavaro.dev",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://reycannavaro.dev/#person",
        name: personalInfo.name,
        jobTitle: personalInfo.title,
        description: personalInfo.bio,
        email: `mailto:${personalInfo.email}`,
        telephone: personalInfo.phone,
        url: "https://reycannavaro.dev",
        image: "https://reycannavaro.dev/images/profile.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sidoarjo",
          addressRegion: "Jawa Timur",
          addressCountry: "ID",
        },
        sameAs: [
          socialLinks.github.url,
          socialLinks.linkedin.url,
          socialLinks.instagram.url,
        ],
        knowsAbout: [
          "Fullstack Development",
          "Next.js",
          "React",
          "TypeScript",
          "Laravel",
          "PHP",
          "Python",
          "Artificial Intelligence",
          "IoT",
          "ERP Systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://reycannavaro.dev/#website",
        url: "https://reycannavaro.dev",
        name: "Rey Cannavaro Portfolio",
        description: personalInfo.bio,
        author: {
          "@id": "https://reycannavaro.dev/#person",
        },
        inLanguage: ["id", "en"],
      },
      {
        "@type": "ItemList",
        "@id": "https://reycannavaro.dev/#projects",
        name: "Featured Projects by Rey Cannavaro",
        itemListElement: projects.map((p, idx) => ({
          "@type": "SoftwareApplication",
          position: idx + 1,
          name: p.name,
          description: p.description,
          applicationCategory: p.category,
          url: p.links.live || p.links.github || "https://reycannavaro.dev",
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://reycannavaro.dev/#achievements",
        name: "Awards & Recognition of Rey Cannavaro",
        itemListElement: achievements.map((a, idx) => ({
          "@type": "Award",
          position: idx + 1,
          name: a.title,
          description: a.description,
          funder: a.organizer,
          awardDate: a.year,
        })),
      },
    ],
  };

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100svh" }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Loader />
      <Sidebar />
      <main id="main-content" className="main-content">
        <Hero />
        <GitHubStats />
        <Skills />
        <Experience />
        <Projects />
        <Prestasi />
        <Education />
        <Footer />
      </main>
      <Chatbot />
    </div>
  );
}
