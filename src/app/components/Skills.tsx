"use client";
import { motion, Variants } from "framer-motion";
import { hardskills, softskills } from "@/app/data/index";

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    },
  };

  return (
    <section id="skills" className="py-32 px-6 border-t border-slate-900 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/2 right-0 w-72 h-72 bg-purple-600 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-mono mb-4 tracking-[0.3em]"
          >
            // CAPABILITIES
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
          >
            TECH STACK <span className="text-slate-700">&</span> SKILLS
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7">
            <h4 className="text-xl font-bold mb-10 flex items-center gap-4 text-white">
              <span className="w-12 h-[2px] bg-blue-600"></span>
              Hard Skills
            </h4>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {hardskills.map((skill) => (
                <motion.div 
                  key={skill.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.2 } 
                  }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/50 hover:bg-slate-900/50 transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-12 h-12 object-contain mb-4 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400 text-center uppercase tracking-widest font-bold transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <h4 className="text-xl font-bold mb-10 flex items-center gap-4 text-white">
              <span className="w-12 h-[2px] bg-purple-600"></span>
              Soft Skills
            </h4>
            <div className="flex flex-col gap-4">
              {softskills.map((skill, index) => (
                <motion.div 
                  key={skill.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-purple-500/30 transition-all cursor-default group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:border-purple-500/50 transition-all">
                    <img src={skill.icon} alt={skill.name} className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">{skill.name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-[0.2em]">{skill.type}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}