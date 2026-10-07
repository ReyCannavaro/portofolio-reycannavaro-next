import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import GitHubStats from "./components/GitHubStats";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Prestasi from "./components/Prestasi";
import Education from "./components/Education";
import Footer from "./components/Footer";
import { personalInfo, socialLinks, projects, achievements } from "./data";

const Chatbot = dynamic(() => import("./components/Chatbot"));

export const metadata: Metadata = {
  title: "Reyjuno Al Cannavaro (Rey Cannavaro) | Fullstack Developer & Software Engineer",
  description:
    "Website portfolio resmi Reyjuno Al Cannavaro (Rey Cannavaro) — Fullstack Developer & Software Engineer berbasis di Sidoarjo, Indonesia. Spesialis Laravel, Next.js, React, AI, dan IoT.",
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
        name: "Reyjuno Al Cannavaro",
        alternateName: [
          "Rey Cannavaro",
          "Reyjuno Cannavaro",
          "Reyjuno Al",
          "Reyjuno",
        ],
        givenName: "Reyjuno",
        additionalName: "Al",
        familyName: "Cannavaro",
        jobTitle: "Fullstack Developer & Software Engineer",
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
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "SMK Telkom Sidoarjo",
          url: "https://smktelkom-sda.sch.id",
        },
        sameAs: [
          socialLinks.linkedin.url,
          socialLinks.github.url,
          socialLinks.instagram.url,
          socialLinks.twitter.url,
          socialLinks.threads.url,
        ],
        knowsAbout: [
          "Fullstack Development",
          "Software Engineering",
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
        name: "Reyjuno Al Cannavaro Portfolio",
        alternateName: "Rey Cannavaro Portfolio",
        description: personalInfo.bio,
        author: {
          "@id": "https://reycannavaro.dev/#person",
        },
        inLanguage: ["id", "en"],
      },
      {
        "@type": "ItemList",
        "@id": "https://reycannavaro.dev/#projects",
        name: "Featured Projects by Reyjuno Al Cannavaro",
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
        name: "Awards & Recognition of Reyjuno Al Cannavaro",
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
