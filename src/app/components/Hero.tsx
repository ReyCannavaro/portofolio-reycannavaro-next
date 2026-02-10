"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FiInstagram, FiGithub, FiLinkedin, FiMail, FiExternalLink } from "react-icons/fi";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="text-blue-500 font-mono font-medium mb-4 tracking-[0.3em]">
            // FULLSTACK ENGINEER
          </motion.h2>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-8">
            REY <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              CANNAVARO
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-lg leading-relaxed font-medium mb-10">
            Building scalable digital products and innovating with modern tech stacks. 
            Based in Indonesia, working globally.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              View Projects
            </a>
            <a 
              href="https://drive.google.com/file/d/1bfAzSDLQY4yjgPsLs8cbjDqhV859WUkP/view?usp=sharing" 
              target="_blank" 
              className="px-8 py-4 border border-slate-800 rounded-xl font-bold hover:bg-slate-900 transition-all text-white active:scale-95"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <a 
              href="https://linktr.ee/reycannavaro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors group"
            >
              <FiExternalLink className="group-hover:rotate-45 transition-transform" /> 
              <span>LINKTR.EE/REYCANNAVARO</span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 text-slate-500">
            <a href="https://github.com/ReyCannavaro" target="_blank" className="hover:text-white transition-colors hover:-translate-y-1 transition-transform"><FiGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/reycannavaro/" target="_blank" className="hover:text-blue-500 transition-colors hover:-translate-y-1 transition-transform"><FiLinkedin size={24} /></a>
            <a href="https://www.instagram.com/reycannavaro/" target="_blank" className="hover:text-pink-500 transition-colors hover:-translate-y-1 transition-transform"><FiInstagram size={24} /></a>
            <a href="mailto:reyjunoalcannavaro@gmail.com" className="hover:text-yellow-500 transition-colors hover:-translate-y-1 transition-transform"><FiMail size={24} /></a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative aspect-[4/5] max-w-[450px] mx-auto lg:ml-auto w-full group"
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image 
                src="/profile-picture.png" 
                alt="Rey Cannavaro"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-color-dodge pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-950/20 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 p-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-800 hidden md:block z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm font-bold text-white tracking-tight">Available for Freelance</p>
              </div>
              <p className="text-xs text-blue-500 font-mono italic">Open to new projects</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}