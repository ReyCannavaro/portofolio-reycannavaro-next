"use client";
import { motion } from "framer-motion";
import { FiInstagram, FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] pt-32 pb-12 px-6 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-slate-900/30 select-none pointer-events-none whitespace-nowrap z-0">
        REY CANNAVARO
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-500 font-mono mb-8 tracking-[0.3em] uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue-500"></span> // NEXT STEP
            </h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-12">
              MINDING A <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">PROJECT?</span>
            </h3>
            <motion.a 
              href="mailto:reyjunoalcannavaro@gmail.com" 
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 text-2xl md:text-4xl font-bold text-white hover:text-blue-500 transition-all group"
            >
              Let's talk together
              <div className="p-3 rounded-full border border-slate-800 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all">
                <FiArrowUpRight className="group-hover:text-white transition-colors" />
              </div>
            </motion.a>
          </motion.div>

          <div className="flex flex-col lg:items-end justify-between">
            <div className="text-left lg:text-right space-y-6">
              <div className="space-y-2">
                <p className="text-white font-bold text-lg">Sidoarjo, East Java</p>
                <p className="text-slate-500 font-medium max-w-xs lg:ml-auto leading-relaxed">
                  Indonesia, GMT+7. <br />
                  Available for remote work worldwide.
                </p>
              </div>
              
              <div className="flex lg:justify-end gap-4 pt-6">
                {[
                  { icon: <FiGithub size={20} />, link: "https://github.com/ReyCannavaro", color: "hover:bg-white hover:text-black" },
                  { icon: <FiLinkedin size={20} />, link: "https://www.linkedin.com/in/reycannavaro/", color: "hover:bg-blue-600 hover:text-white" },
                  { icon: <FiInstagram size={20} />, link: "https://www.instagram.com/reycannavaro/", color: "hover:bg-pink-600 hover:text-white" },
                  { icon: <FiMail size={20} />, link: "mailto:reyjunoalcannavaro@gmail.com", color: "hover:bg-yellow-500 hover:text-white" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.button 
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 lg:mt-0 group flex items-center gap-4 text-slate-500"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] group-hover:text-blue-500 transition-colors">Back to top</span>
              <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all">
                <FiArrowUp className="group-hover:text-blue-500 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.button>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 font-mono text-[10px] uppercase tracking-[0.3em]">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {currentYear} REY CANNAVARO</p>
            <span className="hidden md:block w-1 h-1 bg-slate-800 rounded-full"></span>
            <p className="text-slate-800">ALL RIGHTS RESERVED</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Based in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}