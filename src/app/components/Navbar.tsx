"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "py-4 bg-slate-950/70 backdrop-blur-md border-b border-white/10" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-black tracking-tighter text-white">
          REY<span className="text-blue-500">.</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Skills", "Projects", "Education"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all active:scale-95"
          >
            Hire Me
          </a>
        </div>

        <div className="md:hidden text-white font-mono text-xs font-bold tracking-widest">
          // MENU
        </div>
      </div>
    </nav>
  );
}