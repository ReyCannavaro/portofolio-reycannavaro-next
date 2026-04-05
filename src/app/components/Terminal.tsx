"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, educationHistory, prestasiData, hardskills, softskills } from "@/app/data/index";
import { FiTerminal, FiX, FiUser, FiAward, FiBookOpen, FiCode, FiActivity, FiStar, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function TerminalWidget() {
  const [isOpen, setIsOpen]     = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [input, setInput]       = useState("");
  const [history, setHistory]   = useState<{ cmd: string; res: React.ReactNode }[]>([]);
  const [termHeight, setTermHeight] = useState(520);
  const dummyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const calcHeight = () => {
      const available = window.innerHeight - 64 - 80 - 24;
      setTermHeight(Math.min(Math.max(available, 300), 620));
    };
    calcHeight();
    window.addEventListener("resize", calcHeight);
    return () => window.removeEventListener("resize", calcHeight);
  }, []);

  const INIT_MSG = (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <pre style={{
        fontFamily:"var(--font-dm-mono)", fontSize:"clamp(4px,1.1vw,7px)",
        color:"var(--accent)", lineHeight:1.35, whiteSpace:"pre",
        textShadow:"0 0 12px rgba(99,102,241,0.35)",
      }}>{`    ____               ______                                     \n   / __ \\___ _  __     / ____/___ _____  ____  ____ _   ______ __________ \n  / /_/ / _ \\| |/ /    / /   / __ \\/ __ \\/ __ \\/ __ \\ | / / __ \\/ ___/ __ \\\n / _, _/  __/>  <    / /___/ /_/ / / / / / / / /_/ /| |/ / /_/ / /  / /_/ /\n/_/ |_|\\___/_/|_|    \\____/\\__,_/_/ /_/_/ /_/\\__,_/ |___/\\__,_/_/   \\____/ `}</pre>
      <div style={{ borderLeft:"2px solid rgba(99,102,241,0.4)", paddingLeft:"0.75rem" }}>
        <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.62rem", color:"var(--accent)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.2rem" }}>
          Rey-OS v2.1 // Sidoarjo_ID
        </p>
        <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.58rem", color:"var(--fg-3)" }}>
          Type <span style={{ color:"#fbbf24", fontWeight:600 }}>&apos;help&apos;</span> to explore.
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    setMounted(true);
    setHistory([{ cmd:"system_init", res: INIT_MSG }]);
  }, []);

  useEffect(() => {
    if (isOpen) { const t = setTimeout(() => inputRef.current?.focus(), 300); return () => clearTimeout(t); }
  }, [isOpen]);

  useEffect(() => { dummyRef.current?.scrollIntoView({ behavior:"smooth" }); }, [history]);

  const Tag = ({ c, children }: { c: string; children: React.ReactNode }) => (
    <span style={{
      fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem", letterSpacing:"0.08em",
      padding:"2px 7px", borderRadius:4,
      background:`${c}10`, border:`1px solid ${c}30`, color:c,
      textTransform:"uppercase",
    }}>{children}</span>
  );

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (!cmd) return;
    let res: React.ReactNode;

    switch (cmd) {
      case "help":
        res = (
          <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"0.3rem 1.2rem", fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem" }}>
            {[
              ["projects",   "Showcase of my builds"],
              ["skills",     "Tech stack & soft skills"],
              ["prestasi",   "Awards & leadership records"],
              ["education",  "Academic journey"],
              ["whoami",     "System architect info"],
              ["clear",      "Flush buffer"],
            ].map(([c,d]) => (
              <React.Fragment key={c}>
                <span style={{ color:"var(--accent)", fontWeight:600 }}>{c}</span>
                <span style={{ color:"var(--fg-3)", fontStyle:"italic" }}># {d}</span>
              </React.Fragment>
            ))}
          </div>
        );
        break;

      case "projects":
        res = (
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            {projects.map(p => (
              <div key={p.id} style={{
                padding:"0.65rem 0.75rem", borderRadius:8,
                background:"rgba(255,255,255,0.02)",
                border:"1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.25rem" }}>
                  <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.65rem", color:"var(--accent)", fontWeight:600 }}>./{p.name.replace(/\s+/g,"-").toLowerCase()}</span>
                  <span style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.5rem", color:"#a5b4fc", letterSpacing:"0.1em", textTransform:"uppercase" }}>{p.role}</span>
                </div>
                <p style={{ fontFamily:"var(--font-syne)", fontSize:"0.65rem", color:"var(--fg-3)", lineHeight:1.5, marginBottom:"0.4rem",
                  display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
                }}>{p.description}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {p.technologies.slice(0,4).map(t => <Tag key={t} c="var(--fg-3)">{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        res = (
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <div>
              <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem", color:"#fbbf24", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:"0.5rem", display:"flex", alignItems:"center", gap:4 }}>
                <FiCode size={10}/> Hardskills
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {hardskills.map(s => <Tag key={s.id} c="var(--accent)">{s.name}</Tag>)}
              </div>
            </div>
            <div>
              <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.55rem", color:"#4ade80", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:"0.5rem", display:"flex", alignItems:"center", gap:4 }}>
                <FiStar size={10}/> Softskills
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {softskills.map(s => <Tag key={s.id} c="#4ade80">{s.name}</Tag>)}
              </div>
            </div>
          </div>
        );
        break;

      case "prestasi":
        res = (
          <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
            {prestasiData.map(pr => (
              <div key={pr.id} style={{
                display:"flex", gap:"0.65rem", alignItems:"flex-start",
                padding:"0.5rem 0.65rem", borderRadius:6,
                background:"rgba(255,255,255,0.015)",
                borderLeft:"2px solid rgba(251,191,36,0.3)",
              }}>
                <FiAward size={11} style={{ color:"#fbbf24", flexShrink:0, marginTop:2 }}/>
                <div>
                  <p style={{ fontFamily:"var(--font-syne)", fontSize:"0.65rem", color:"var(--fg)", fontWeight:600, lineHeight:1.4, marginBottom:2 }}>{pr.title}</p>
                  <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.52rem", color:"var(--fg-3)", fontStyle:"italic" }}>{pr.organizer} — {pr.year}</p>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        res = (
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", fontFamily:"var(--font-dm-mono)" }}>
            {educationHistory.map(ed => (
              <div key={ed.id} style={{ display:"flex", gap:"0.65rem", alignItems:"flex-start" }}>
                <FiBookOpen size={11} style={{ color:"var(--accent)", marginTop:3, flexShrink:0 }}/>
                <div>
                  <p style={{ fontSize:"0.68rem", color:"var(--fg)", fontWeight:600, marginBottom:2 }}>{ed.institution}</p>
                  <p style={{ fontSize:"0.58rem", color:"var(--accent)", marginBottom:4 }}>{ed.degree} ({ed.graduationYear})</p>
                  {ed.details.map((d,i) => (
                    <p key={i} style={{ fontSize:"0.55rem", color:"var(--fg-3)", display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--border-2)", display:"inline-block", flexShrink:0 }} /> {d}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "whoami":
        res = (
          <div style={{
            display:"flex", alignItems:"center", gap:"0.85rem",
            padding:"0.85rem", borderRadius:12,
            background:"rgba(99,102,241,0.05)",
            border:"1px solid rgba(99,102,241,0.12)",
          }}>
            <div style={{
              width:44, height:44, borderRadius:"50%",
              background:"var(--accent)", flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 16px rgba(99,102,241,0.4)",
              border:"2px solid rgba(255,255,255,0.1)",
            }}>
              <FiUser size={20} style={{ color:"#fff" }}/>
            </div>
            <div>
              <p style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"0.82rem", color:"var(--fg)", letterSpacing:"-0.01em", marginBottom:2 }}>Rey Cannavaro</p>
              <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.58rem", color:"var(--accent)", fontStyle:"italic", marginBottom:6 }}>Informatics @ SMK Telkom Sidoarjo</p>
              <div style={{ display:"flex", gap:10 }}>
                {[FiGithub, FiInstagram, FiLinkedin].map((Icon,i) => (
                  <Icon key={i} size={12} style={{ color:"var(--fg-3)", cursor:"default" }}/>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]); setInput(""); return;

      default:
        res = <p style={{ fontFamily:"var(--font-dm-mono)", fontSize:"0.6rem", color:"#f87171", fontStyle:"italic" }}>bash: command not found: {input}</p>;
    }

    setHistory(h => [...h, { cmd:input, res }]);
    setInput("");
  };

  if (!isMounted) return null;

  return (
    <>
      <motion.button
        initial={{ scale:0, y:20 }} animate={{ scale:1, y:0 }}
        whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
        onClick={() => setIsOpen(o => !o)}
        style={{
          position:"fixed", bottom:"1.5rem", right:"1.5rem", zIndex:9990,
          width:52, height:52, borderRadius:14,
          background:"var(--accent)",
          boxShadow:"0 12px 32px -4px rgba(99,102,241,0.55)",
          border:"1px solid rgba(255,255,255,0.15)",
          color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"none",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x"   initial={{ opacity:0, rotate:-90 }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:90  }}><FiX size={22}/></motion.div>
            : <motion.div key="tm"  initial={{ opacity:0, rotate:90  }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:-90 }}><FiTerminal size={20}/></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity:0, y:32, scale:0.96, filter:"blur(8px)" }}
            animate={{ opacity:1, y:0,  scale:1,    filter:"blur(0px)" }}
            exit={   { opacity:0, y:32, scale:0.96, filter:"blur(8px)" }}
            transition={{ duration:0.3, ease:[0.23,1,0.32,1] }}
            style={{
              position:"fixed",
              bottom:"4.75rem",
              right:"1.5rem",
              zIndex:9989,
              width:"min(92vw, 440px)",
              height:termHeight,
              maxHeight:`calc(100vh - 64px - 5.5rem)`,
              background:"rgba(7,9,15,0.94)", backdropFilter:"blur(24px)",
              borderRadius:18, border:"1px solid rgba(99,102,241,0.18)",
              boxShadow:"0 40px 80px -16px rgba(0,0,0,0.85), 0 0 0 1px rgba(99,102,241,0.06)",
              display:"flex", flexDirection:"column", overflow:"hidden",
              fontFamily:"var(--font-dm-mono)",
            }}
          >
            <div style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"10px 14px", flexShrink:0,
              borderBottom:"1px solid rgba(255,255,255,0.04)",
              background:"rgba(255,255,255,0.015)",
            }}>
              {["#ff5f56","#ffbd2e","#27c93f"].map(c => (
                <span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, display:"block" }} />
              ))}
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5, opacity:0.45 }}>
                <FiActivity size={10} style={{ color:"var(--accent)", animation:"pulse 2s ease infinite" }}/>
                <span style={{ fontSize:"0.55rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--fg)" }}>Shell.v2</span>
              </div>
            </div>

            <div className="custom-scrollbar" style={{ flex:1, padding:"1rem 1.1rem", overflowY:"auto", overflowX:"hidden" }}>
              {history.map((item, i) => (
                <div key={i} style={{ marginBottom:"1.5rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"0.6rem" }}>
                    <span style={{ color:"#4ade80", fontWeight:700, fontSize:"0.7rem" }}>➜</span>
                    <span style={{ color:"var(--accent)", fontSize:"0.65rem", fontWeight:600 }}>~</span>
                    <span style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em" }}>{item.cmd}</span>
                  </div>
                  <div style={{ paddingLeft:"1.1rem", borderLeft:"1px solid rgba(99,102,241,0.12)", marginLeft:4 }}>
                    {item.res}
                  </div>
                </div>
              ))}
              <div ref={dummyRef} />

              <form onSubmit={handleCommand} style={{ display:"flex", alignItems:"center", gap:8, marginTop:"1rem", paddingBottom:"0.5rem" }}>
                <span style={{ color:"#4ade80", fontWeight:700, fontSize:"0.85rem" }}>➜</span>
                <span style={{ color:"var(--accent)", fontSize:"0.72rem", fontWeight:600 }}>~</span>
                <input
                  ref={inputRef} type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="type command…"
                  style={{
                    background:"transparent", border:"none", outline:"none",
                    color:"var(--accent)", flex:1, padding:0,
                    fontFamily:"var(--font-dm-mono)", fontSize:"0.78rem",
                    caretColor:"var(--fg)",
                  }}
                />
              </form>
            </div>

            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"6px 14px", flexShrink:0,
              borderTop:"1px solid rgba(255,255,255,0.04)",
              background:"rgba(99,102,241,0.04)",
            }}>
              <span style={{ fontSize:"0.52rem", color:"var(--fg-3)", letterSpacing:"0.15em", textTransform:"uppercase", fontStyle:"italic" }}>
                Sidoarjo · UTC+7
              </span>
              <span style={{ fontSize:"0.52rem", color:"var(--accent)", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:600 }}>
                LIVE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}