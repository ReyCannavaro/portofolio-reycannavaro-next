"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { prestasiData } from "@/app/data/index";
import Image from "next/image";
import { FiAward, FiStar, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function Prestasi() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  if (!isMounted) return <section className="py-32 bg-[#020617]" />;

  return (
    <section id="achievements" className="py-32 px-6 bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.5)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E")` 
        }} 
      />
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-500 font-mono mb-4 tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue-500"></span> // MILESTONES
            </h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              HONORS <span className="text-slate-800">&</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">LEADERSHIP</span>
            </h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block text-right"
          >
            <FiTrendingUp className="text-blue-500 mb-4 ml-auto" size={32} />
            <p className="text-slate-500 font-mono text-sm max-w-[200px]">
              Continuous growth through competitions & community impact.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {prestasiData.map((item, index) => {
            const isFeatured = index === 0 || index === 4;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className={`group relative min-h-[450px] rounded-[2.5rem] border border-slate-800/50 bg-slate-900/20 overflow-hidden transition-all duration-500 ${
                  isFeatured ? "md:col-span-2" : "col-span-1"
                }`}
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={item.images} 
                    alt={item.title} 
                    fill 
                    className="object-cover object-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
                </div>

                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <span className="w-fit px-4 py-1.5 rounded-full bg-blue-600/10 backdrop-blur-md border border-blue-500/20 text-blue-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                        {item.year}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-all duration-500">
                      {index % 2 === 0 ? <FiAward size={24} /> : <FiUsers size={24} />}
                    </div>
                  </div>

                  <div>
                    {isFeatured && (
                      <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold mb-4 tracking-tighter">
                        <FiStar fill="currentColor" size={14} />
                        <span className="uppercase tracking-[0.2em]">Top Achievement</span>
                      </div>
                    )}
                    
                    <h4 className={`font-black text-white mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-500 ${
                      isFeatured ? "text-4xl md:text-5xl" : "text-2xl"
                    }`}>
                      {item.title}
                    </h4>

                    <p className="text-slate-400 text-sm font-medium mb-6 group-hover:text-slate-200 transition-colors">
                      {item.organizer}
                    </p>

                    <div className="w-full h-[1px] bg-slate-800 relative overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 py-12 border-t border-slate-900 flex flex-col items-center justify-center text-center"
        >
          <div className="flex gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em] animate-pulse">
            Next Milestone Loading
          </p>
        </motion.div>
      </div>
    </section>
  );
}