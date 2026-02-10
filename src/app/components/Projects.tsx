"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { projects } from "@/app/data/index";
import { FiGithub, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

const ProjectSlider = ({ images, name }: { images: string[], name: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full group/slider overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image 
            src={images[currentIndex]} 
            alt={`${name} screenshot ${currentIndex + 1}`}
            fill
            className="object-cover object-top opacity-60 group-hover/slider:opacity-100 transition-all duration-700 group-hover:scale-110"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Projects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  if (!mounted) return null;

  return (
    <section id="projects" className="py-32 px-6 border-t border-slate-900 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.h2 variants={titleVariants} className="text-blue-500 font-mono mb-4 tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue-500"></span> // PORTFOLIO
            </motion.h2>
            <motion.h3 variants={titleVariants} className="text-6xl md:text-8xl font-black tracking-tighter text-white">
              SELECTED <br /> 
              <span 
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #1e293b" }}
              >
                WORKS
              </span>
            </motion.h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-end"
          >
            <span className="text-slate-500 font-mono italic text-sm mb-2">
              {"<total_projects />"}
            </span>
            <span className="text-4xl font-black text-white italic">0{projects.length}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="group relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-slate-800/50 to-transparent"
            >
              <div className="relative p-8 md:p-12 rounded-[2.4rem] bg-[#0a0f1e] border border-slate-800/50 overflow-hidden h-full">
                <div 
                  className="absolute -right-20 -top-20 w-96 h-96 blur-[150px] opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none"
                  style={{ backgroundColor: project.colors[0] }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                  <div className="w-full lg:w-1/2 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-blue-500 font-mono text-2xl font-bold">0{index + 1}.</span>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-[10px] px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 uppercase tracking-wider font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-5xl md:text-6xl font-black mb-6 text-white group-hover:text-blue-400 transition-colors duration-500 tracking-tighter leading-none">
                      {project.name}
                    </h4>
                    
                    <p className="text-slate-400 leading-relaxed mb-10 text-lg font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mt-auto">
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubLink} 
                        target="_blank" 
                        className="flex items-center gap-3 text-xs font-black text-white bg-blue-600 hover:bg-blue-500 transition-all px-8 py-4 rounded-2xl shadow-2xl shadow-blue-500/20"
                      >
                        <FiGithub size={18} /> GITHUB REPO
                      </motion.a>
                      <div className="hidden md:block group-hover:translate-x-2 transition-transform duration-500">
                        <FiArrowRight size={24} className="text-slate-700 group-hover:text-blue-500" />
                      </div>
                      <span className="text-xs text-slate-500 font-mono uppercase tracking-[0.3em] font-bold">{project.role}</span>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2" style={{ perspective: "1000px" }}>
                     <motion.div 
                        whileHover={{ rotateY: -5, rotateX: 5 }}
                        className="w-full aspect-video rounded-[2rem] bg-slate-900 border border-slate-800/50 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group-hover:border-blue-500/50 transition-all duration-700"
                      >
                        <ProjectSlider images={project.images} name={project.name} />
                      </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}