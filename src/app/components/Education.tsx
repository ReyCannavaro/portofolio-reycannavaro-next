"use client";
import { motion, Variants } from "framer-motion";
import { educationHistory } from "@/app/data/index";
import { FiBookOpen, FiCalendar, FiCheckCircle } from "react-icons/fi";

export default function Education() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="education" className="py-32 px-6 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-blue-500 font-mono mb-4 tracking-[0.3em]"
          >
            // ACADEMIC PATH
          </motion.h2>
          <div className="flex items-center gap-6">
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white">EDUCATION</h3>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-blue-600/50 to-transparent hidden md:block"></div>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative space-y-16">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-800 to-transparent transform md:-translate-x-1/2 hidden sm:block"></div>

          {educationHistory.map((edu, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}>
              <div className="absolute left-0 md:left-1/2 top-0 md:top-8 w-6 h-6 bg-[#020617] border-4 border-blue-600 rounded-full z-10 transform -translate-x-1/2 hidden sm:block shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>

              <div className="w-full md:w-[45%]">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                  <FiBookOpen className="absolute -right-4 -bottom-4 text-slate-800/20 text-9xl transform -rotate-12 group-hover:text-blue-500/10 transition-colors" />

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-600/10 rounded-lg">
                      <FiCalendar className="text-blue-500" />
                    </div>
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest font-bold">
                      Class of {edu.graduationYear}
                    </span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                    {edu.institution}
                  </h4>
                  
                  <p className="text-blue-500 font-mono text-sm mb-6 font-bold flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-blue-500"></span>
                    {edu.degree}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {edu.details.map((detail, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-xs font-medium px-3 py-2 bg-slate-950/50 text-slate-400 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-all"
                      >
                        <FiCheckCircle className="text-blue-500/50" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="hidden md:block md:w-[45%]"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}