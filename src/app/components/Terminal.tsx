"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  projects, 
  educationHistory, 
  prestasiData, 
  hardskills, 
  softskills 
} from "@/app/data/index"; 
import { 
  FiTerminal, 
  FiX, 
  FiUser, 
  FiAward, 
  FiBookOpen, 
  FiCode, 
  FiActivity, 
  FiStar,
  FiGithub,
  FiInstagram,
  FiLinkedin
} from "react-icons/fi";

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; res: React.ReactNode }[]>([]);
  
  const dummyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const asciiArt = `
    ____                      ______                                              
   / __ \\___  __  __         / ____/___ _____  ____  ____ __   ______ __________ 
  / /_/ / _ \\/ / / /        / /   / __ \`/ __ \\/ __ \\/ __ \`/ | / / __ \`/ ___/ __ \\
 / _, _/  __/ /_/ /        / /___/ /_/ / / / / / / / /_/ /| |/ / /_/ / /  / /_/ /
/_/ |_|\\___/\\__, /         \\____/\\__,_/_/ /_/_/ /_/\\__,_/ |___/\\__,_/_/   \\____/ 
           /____/                                                                 
  `;

  useEffect(() => {
    setIsMounted(true);
    setHistory([
      { cmd: "system_init", res: (
          <div className="space-y-4">
            <pre className="text-[4px] sm:text-[6px] text-blue-500 font-mono leading-tight whitespace-pre drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">
              {asciiArt}
            </pre>
            <div className="border-l-2 border-blue-500/50 pl-3 py-1 font-mono">
              <p className="text-blue-400 font-bold text-[10px] tracking-widest uppercase italic">Rey-OS Kernel 2.0.6 // Sidoarjo_ID</p>
              <p className="text-slate-500 text-[9px]">Welcome, user. Type <span className="text-yellow-500 font-bold underline">'help'</span> to explore data.</p>
            </div>
          </div>
        ) 
      },
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.toLowerCase().trim();
    if (!cleanInput) return;

    let response: React.ReactNode;
    switch (cleanInput) {
      case "help":
        response = (
          <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-400 border-l border-white/5 pl-3">
            {[
              ["projects", "Showcase of my builds"],
              ["skills", "Tech stack & soft skills"],
              ["prestasi", "Awards & leadership records"],
              ["education", "Academic journey"],
              ["whoami", "System architect info"],
              ["clear", "Flush buffer"],
            ].map(([c, d]) => (
              <div key={c} className="flex gap-4">
                <span className="text-blue-400 font-bold min-w-[70px]">{c}</span>
                <span className="text-slate-600 italic"># {d}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="grid grid-cols-1 gap-3 mt-2">
            {projects.map((p) => (
              <div key={p.id} className="p-3 bg-white/[0.03] rounded-lg border border-white/5 hover:border-blue-500/40 transition-all group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-400 font-bold text-xs">./{p.name.replace(/\s+/g, '-').toLowerCase()}</span>
                  <span className="text-[8px] px-1.5 py-0.5 bg-blue-500/10 text-blue-300 rounded uppercase">{p.role}</span>
                </div>
                <p className="text-[9px] text-slate-500 mb-2 line-clamp-1 group-hover:line-clamp-none transition-all">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.technologies.map(t => (
                    <span key={t} className="text-[7px] text-slate-400 bg-white/5 px-1 rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-4 mt-2">
            <div>
              <p className="text-[9px] text-yellow-500 font-bold uppercase mb-2 flex items-center gap-2"><FiCode /> Hardskills</p>
              <div className="flex flex-wrap gap-1.5">
                {hardskills.map(s => (
                  <span key={s.id} className="px-2 py-0.5 bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[9px] rounded uppercase font-bold tracking-tighter">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9px] text-green-500 font-bold uppercase mb-2 flex items-center gap-2"><FiStar /> Softskills</p>
              <div className="flex flex-wrap gap-1.5">
                {softskills.map(s => (
                  <span key={s.id} className="px-2 py-0.5 bg-green-500/5 border border-green-500/20 text-green-400 text-[9px] rounded uppercase font-bold tracking-tighter">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case "prestasi":
        response = (
          <div className="space-y-3 mt-2">
            {prestasiData.map((pr) => (
              <div key={pr.id} className="flex gap-3 items-start p-2 bg-white/[0.02] border-l border-yellow-500/40 rounded-r">
                <FiAward className="text-yellow-500 shrink-0 mt-0.5" size={12} />
                <div>
                  <p className="text-[10px] text-white font-bold leading-tight">{pr.title}</p>
                  <p className="text-[8px] text-slate-500 font-mono italic">{pr.organizer} — {pr.year}</p>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        response = (
          <div className="space-y-4 mt-2 font-mono">
             {educationHistory.map((ed) => (
               <div key={ed.id} className="flex items-start gap-3">
                 <FiBookOpen className="text-blue-500 mt-1 shrink-0" size={12} />
                 <div>
                   <p className="text-[11px] text-white font-bold">{ed.institution}</p>
                   <p className="text-[9px] text-blue-400">{ed.degree} ({ed.graduationYear})</p>
                   <ul className="mt-1">
                     {ed.details.map((detail, idx) => (
                       <li key={idx} className="text-[8px] text-slate-500 flex items-center gap-2">
                         <span className="w-1 h-1 bg-slate-700 rounded-full" /> {detail}
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             ))}
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="flex items-center gap-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-white/10 shrink-0">
              <FiUser className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-white tracking-widest uppercase">Rey Cannavaro</p>
              <p className="text-[9px] text-blue-400 font-mono italic mb-1">Informatics student @ SMK Telkom Sidoarjo</p>
              <div className="flex gap-3 text-slate-500">
                <FiGithub size={12} className="hover:text-white cursor-pointer" />
                <FiInstagram size={12} className="hover:text-white cursor-pointer" />
                <FiLinkedin size={12} className="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]); setInput(""); return;

      default:
        response = <p className="text-red-500 text-[10px] font-mono italic">bash: command not found: {input}</p>;
    }

    setHistory([...history, { cmd: input, res: response }]);
    setInput("");
  };

  if (!isMounted) return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-[0_15px_35px_-5px_rgba(37,99,235,0.6)] border border-white/20 text-white"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <FiTerminal size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            className="fixed bottom-24 right-6 z-[998] w-[92vw] md:w-[450px] h-[600px] bg-[#020617]/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col font-mono ring-1 ring-white/5">
            <div className="bg-white/[0.03] px-6 py-4 flex justify-between items-center border-b border-white/5 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <FiActivity size={12} className="text-blue-500 animate-pulse" />
                <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white">Shell.v2</span>
              </div>
            </div>

            <div className="flex-grow p-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-blue-500/[0.02]">
              {history.map((item, i) => (
                <div key={i} className="mb-8 last:mb-2 animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-500 font-black text-xs">➜</span>
                    <span className="text-blue-500 font-bold text-[10px]">~</span>
                    <span className="text-[10px] text-white/40 tracking-wider font-bold">{item.cmd}</span>
                  </div>
                  <div className="pl-5 border-l border-blue-500/10 ml-1.5 transition-all">{item.res}</div>
                </div>
              ))}
              <div ref={dummyRef} />

              <form onSubmit={handleCommand} className="flex items-center gap-3 mt-8 pb-10 group">
                <span className="text-green-500 font-black text-lg">➜</span>
                <span className="text-blue-500 font-bold text-sm tracking-widest animate-pulse">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-blue-400 flex-grow p-0 focus:ring-0 text-lg font-mono caret-white placeholder:text-slate-800"
                  placeholder="type command..."
                />
              </form>
            </div>

            <div className="p-3 bg-white/[0.02] border-t border-white/5 flex justify-between px-6">
               <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest italic">Sidoarjo Location Service: Active</span>
               <span className="text-[8px] text-blue-500 font-black animate-pulse">LIVE SESSION</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}