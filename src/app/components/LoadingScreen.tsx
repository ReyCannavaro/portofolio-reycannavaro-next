"use client";
import { useEffect, useState, useRef } from "react";

const NAME = "REY CANNAVARO";
const GLITCH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const rand = () => GLITCH[Math.floor(Math.random() * GLITCH.length)];

const BOOT_LINES = [
  { text: "Initializing environment...",     delay: 0   },
  { text: "Loading modules: React · Laravel · Next.js", delay: 180 },
  { text: "Mounting components...",          delay: 360 },
  { text: "Compiling assets... Done.",       delay: 520 },
  { text: "✓ Portfolio v2.0 ready.",         delay: 680, accent: true },
];

const STATS = [
  { value: 6,  suffix: "",  label: "Projects"     },
  { value: 12, suffix: "",  label: "Achievements" },
  { value: 3,  suffix: "+", label: "Yrs Building" },
];

function useCountUp(target: number, trigger: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!trigger || done.current) return;
    done.current = true;
    const t = setTimeout(() => {
      let i = 0; const N = 32;
      const id = setInterval(() => {
        i++;
        setVal(Math.round((1 - Math.pow(1 - i / N, 3)) * target));
        if (i >= N) clearInterval(id);
      }, 900 / N);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger, target, delay]);
  return val;
}

function StatItem({ value, suffix, label, trigger, delay }: { value:number; suffix:string; label:string; trigger:boolean; delay:number }) {
  const n = useCountUp(value, trigger, delay);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.2rem" }}>
      <span style={{ fontFamily:"var(--font-syne,system-ui)", fontWeight:800, fontSize:"clamp(1.4rem,3.5vw,2.2rem)", letterSpacing:"-0.04em", color:"#f1f5f9", lineHeight:1 }}>
        {n}{suffix}
      </span>
      <span style={{ fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#475569" }}>
        {label}
      </span>
    </div>
  );
}

export default function LoadingScreen() {
  const [phase, setPhase]         = useState<"boot"|"name"|"stats"|"done"|"exit">("boot");
  const [bootLines, setBootLines] = useState<boolean[]>([]);
  const [chars, setChars]         = useState<string[]>(Array(NAME.length).fill(""));
  const [revealed, setRevealed]   = useState<boolean[]>(Array(NAME.length).fill(false));
  const [statsOn, setStatsOn]     = useState(false);
  const [barW, setBarW]           = useState(0);
  const [scanY, setScanY]         = useState(-10);
  const [glitchOn, setGlitchOn]   = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [isDone, setIsDone]       = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("intro-done")) {
      setIsDone(true);
      return;
    }

    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => setBootLines(prev => { const n = [...prev]; n[i] = true; return n; }), 120 + _.delay);
    });

    setTimeout(() => {
      setPhase("name");
      revealName();
    }, 1200);

    setTimeout(() => { setStatsOn(true); }, 2100);

    setTimeout(() => {
      setBarW(0);
      const start = Date.now();
      const dur   = 600;
      const tick  = () => {
        const p = Math.min((Date.now() - start) / dur, 1);
        setBarW(p * 100);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 2200);

    setTimeout(() => {
      let sy = -10;
      const scanTick = () => {
        sy += 2.2;
        setScanY(sy);
        if (sy < 110) rafRef.current = requestAnimationFrame(scanTick);
      };
      rafRef.current = requestAnimationFrame(scanTick);
    }, 2300);

    setTimeout(() => { setGlitchOn(true); }, 2850);
    setTimeout(() => { setGlitchOn(false); }, 2980);
    setTimeout(() => { setGlitchOn(true); }, 3050);
    setTimeout(() => { setGlitchOn(false); }, 3120);

    setTimeout(() => setPhase("exit"), 3200);
    setTimeout(() => {
      setIsDone(true);
      sessionStorage.setItem("intro-done", "1");
    }, 3900);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const revealName = () => {
    let idx = 0;
    const step = () => {
      if (idx >= NAME.length) {
        let passes = 0;
        const scrambleFinal = () => {
          passes++;
          setChars(NAME.split("").map((c, i) => {
            if (c === " ") return " ";
            return Math.random() > 0.6 ? rand() : c;
          }));
          if (passes < 6) setTimeout(scrambleFinal, 45);
          else setChars(NAME.split(""));
        };
        setTimeout(scrambleFinal, 80);
        return;
      }
      // Scramble ahead chars
      setChars(prev => {
        const n = [...prev];
        n[idx] = NAME[idx] === " " ? " " : rand();
        if (idx + 1 < NAME.length) n[idx + 1] = NAME[idx + 1] === " " ? " " : rand();
        return n;
      });
      setTimeout(() => {
        setRevealed(prev => { const n = [...prev]; n[idx] = true; return n; });
        setChars(prev => { const n = [...prev]; n[idx] = NAME[idx]; return n; });
        idx++;
        setTimeout(step, 52);
      }, 38);
    };
    step();
  };

  if (!mounted || isDone) return null;

  const isExit = phase === "exit";

  return (
    <>
      <style>{`
        @keyframes ls-flicker { 0%,100%{opacity:1} 48%{opacity:0.92} 50%{opacity:0.6} 52%{opacity:0.95} }
        @keyframes ls-scanline { 0%{opacity:0.6} 100%{opacity:0} }
        @keyframes ls-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ls-glow { 0%,100%{text-shadow:0 0 20px rgba(99,102,241,0.4)} 50%{text-shadow:0 0 40px rgba(99,102,241,0.8),0 0 80px rgba(99,102,241,0.3)} }
        @keyframes ls-glitch-r { 0%,100%{clip-path:none;transform:none} 20%{clip-path:polygon(0 15%,100% 15%,100% 30%,0 30%);transform:translateX(4px)} 40%{clip-path:polygon(0 55%,100% 55%,100% 65%,0 65%);transform:translateX(-3px)} 60%{clip-path:polygon(0 70%,100% 70%,100% 80%,0 80%);transform:translateX(5px)} 80%{clip-path:none;transform:none} }
        @keyframes ls-glitch-b { 0%,100%{clip-path:none;transform:none} 20%{clip-path:polygon(0 20%,100% 20%,100% 35%,0 35%);transform:translateX(-4px)} 40%{clip-path:polygon(0 50%,100% 50%,100% 62%,0 62%);transform:translateX(3px)} 60%{clip-path:polygon(0 75%,100% 75%,100% 85%,0 85%);transform:translateX(-5px)} 80%{clip-path:none;transform:none} }
        .ls-name-r { position:absolute;inset:0;color:#ff3366;animation:ls-glitch-r 0.12s steps(1) infinite;pointer-events:none; }
        .ls-name-b { position:absolute;inset:0;color:#22d3ee;animation:ls-glitch-b 0.12s steps(1) infinite 0.04s;pointer-events:none; }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "#07090f",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          transform: isExit ? "translateY(-100%)" : "translateY(0)",
          transition: isExit ? "transform 0.7s cubic-bezier(0.76,0,0.24,1)" : "none",
          animation: glitchOn ? "ls-flicker 0.08s steps(1) 2" : "none",
        }}
      >
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(99,102,241,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.035) 1px,transparent 1px)",
          backgroundSize:"64px 64px" }} />

        <div style={{
          position:"absolute", left:0, right:0, height:2, zIndex:10,
          top:`${scanY}%`,
          background:"linear-gradient(90deg,transparent,rgba(99,102,241,0.6),rgba(34,211,238,0.4),transparent)",
          pointerEvents:"none",
          animation:"ls-scanline 0.4s ease forwards",
          display: scanY > -5 && scanY < 105 ? "block" : "none",
        }} />

        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />

        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"clamp(1.2rem,3vw,2rem) clamp(1.5rem,6vw,5rem)",
          borderBottom:"1px solid rgba(99,102,241,0.1)",
          opacity: phase === "boot" ? 0.4 : 1,
          transition:"opacity 0.4s ease",
          flexShrink:0,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#6366f1", animation:"ls-blink 1.2s ease infinite" }} />
            <span style={{ fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.58rem", letterSpacing:"0.28em", color:"#6366f1", textTransform:"uppercase" }}>
              Rey-OS v2.0
            </span>
          </div>
          <span style={{ fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.55rem", letterSpacing:"0.2em", color:"#475569", textTransform:"uppercase" }}>
            {new Date().getFullYear()} · Sidoarjo, ID
          </span>
        </div>

        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 clamp(1.5rem,6vw,5rem)", position:"relative", zIndex:1 }}>

          <div style={{
            marginBottom:"2rem",
            opacity: phase === "name" || phase === "stats" || phase === "exit" ? 1 : 1,
          }}>
            {BOOT_LINES.map((line, i) => (
              <div key={i} style={{
                fontFamily:"var(--font-dm-mono,monospace)", fontSize:"clamp(0.5rem,1.1vw,0.62rem)",
                letterSpacing:"0.1em", color: line.accent ? "#6366f1" : "#334155",
                marginBottom:"0.2rem",
                opacity: bootLines[i] ? 1 : 0,
                transform: bootLines[i] ? "translateX(0)" : "translateX(-8px)",
                transition:`opacity 0.3s ease, transform 0.3s ease`,
                display:"flex", alignItems:"center", gap:"0.5rem",
              }}>
                <span style={{ color: line.accent ? "#4ade80" : "#1e3a5f", flexShrink:0 }}>›</span>
                {line.text}
                {i === BOOT_LINES.length - 1 && bootLines[i] && (
                  <span style={{ width:6, height:"0.7em", background:"#6366f1", display:"inline-block", animation:"ls-blink 0.9s step-end infinite", marginLeft:2 }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ position:"relative", marginBottom:"2.5rem" }}>
            {glitchOn && (
              <>
                <div className="ls-name-r" style={{
                  fontFamily:"var(--font-syne,system-ui)", fontWeight:800,
                  fontSize:"clamp(3.5rem,11vw,8.5rem)", letterSpacing:"-0.04em", lineHeight:0.88,
                  userSelect:"none",
                }}>
                  {NAME.split("").map((c, i) => (
                    <span key={i} style={{ display:"inline-block", width:c===" "?"0.3em":undefined }}>{c === " " ? "" : c}</span>
                  ))}
                </div>
                <div className="ls-name-b" style={{
                  fontFamily:"var(--font-syne,system-ui)", fontWeight:800,
                  fontSize:"clamp(3.5rem,11vw,8.5rem)", letterSpacing:"-0.04em", lineHeight:0.88,
                  userSelect:"none",
                }}>
                  {NAME.split("").map((c, i) => (
                    <span key={i} style={{ display:"inline-block", width:c===" "?"0.3em":undefined }}>{c === " " ? "" : c}</span>
                  ))}
                </div>
              </>
            )}

            <h1 style={{
              fontFamily:"var(--font-syne,system-ui)", fontWeight:800,
              fontSize:"clamp(3.5rem,11vw,8.5rem)", letterSpacing:"-0.04em", lineHeight:0.88,
              color:"#f1f5f9", margin:0,
              userSelect:"none", position:"relative",
              animation: phase === "stats" ? "ls-glow 3s ease infinite" : "none",
            }}>
              {chars.map((char, i) => (
                <span key={i} style={{
                  display:"inline-block",
                  width: NAME[i] === " " ? "0.3em" : undefined,
                  opacity: revealed[i] ? 1 : char ? 0.3 : 0,
                  color: revealed[i] ? "#f1f5f9" : "#6366f1",
                  transform: revealed[i] ? "translateY(0) scaleY(1)" : "translateY(14px) scaleY(0.8)",
                  transition: revealed[i] ? "opacity 0.2s ease, transform 0.25s cubic-bezier(0.23,1,0.32,1), color 0.15s" : "none",
                  display: NAME[i] === " " ? "inline-block" : "inline-block",
                  fontVariantNumeric:"tabular-nums",
                }}>
                  {NAME[i] === " " ? "\u00a0" : char}
                </span>
              ))}
            </h1>

            <div style={{
              height:2, marginTop:"0.6rem",
              background:"linear-gradient(90deg,#6366f1,#22d3ee,transparent)",
              width: phase === "stats" || phase === "exit" ? "100%" : "0%",
              transition:"width 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
              borderRadius:2,
            }} />
          </div>

          <div style={{
            fontFamily:"var(--font-dm-mono,monospace)",
            fontSize:"clamp(0.6rem,1.4vw,0.75rem)",
            letterSpacing:"0.3em", textTransform:"uppercase",
            color:"#94a3b8", marginBottom:"2rem",
            opacity: statsOn ? 1 : 0,
            transform: statsOn ? "translateY(0)" : "translateY(8px)",
            transition:"opacity 0.4s ease, transform 0.4s ease",
            display:"flex", alignItems:"center", gap:"0.75rem",
          }}>
            <span style={{ width:20, height:1, background:"#6366f1", display:"block", flexShrink:0 }} />
            Fullstack Developer · Indonesia
          </div>

          <div style={{
            display:"flex", gap:"clamp(2rem,5vw,4rem)",
            opacity: statsOn ? 1 : 0,
            transform: statsOn ? "translateY(0)" : "translateY(16px)",
            transition:"opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s",
            paddingTop:"1.5rem",
            borderTop:"1px solid rgba(255,255,255,0.05)",
          }}>
            {STATS.map((s, i) => (
              <StatItem key={i} {...s} trigger={statsOn} delay={i * 100} />
            ))}
          </div>

          <div style={{ marginTop:"2.5rem" }}>
            <div style={{
              display:"flex", justifyContent:"space-between", marginBottom:"0.4rem",
              opacity: statsOn ? 1 : 0, transition:"opacity 0.3s ease 0.3s",
            }}>
              <span style={{ fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.5rem", letterSpacing:"0.2em", color:"#475569", textTransform:"uppercase" }}>
                Loading portfolio
              </span>
              <span style={{ fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.5rem", letterSpacing:"0.1em", color:"#6366f1" }}>
                {Math.round(barW)}%
              </span>
            </div>
            <div style={{ height:1.5, background:"rgba(255,255,255,0.05)", borderRadius:2, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:2,
                background:"linear-gradient(90deg,#6366f1,#22d3ee)",
                width:`${barW}%`,
                transition:"width 0.05s linear",
                boxShadow:"0 0 12px rgba(99,102,241,0.6)",
              }} />
            </div>
          </div>
        </div>

        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"clamp(0.8rem,2vw,1.25rem) clamp(1.5rem,6vw,5rem)",
          borderTop:"1px solid rgba(99,102,241,0.08)",
          flexShrink:0,
          opacity: statsOn ? 1 : 0, transition:"opacity 0.4s ease 0.4s",
        }}>
          <div style={{ display:"flex", gap:"1rem" }}>
            {["React","Laravel","Next.js","IoT"].map((t, i) => (
              <span key={t} style={{
                fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.48rem",
                letterSpacing:"0.15em", textTransform:"uppercase",
                padding:"2px 7px", borderRadius:4,
                background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.15)",
                color:"#6366f1",
                opacity: statsOn ? 1 : 0,
                transition:`opacity 0.3s ease ${0.5 + i * 0.07}s`,
              }}>{t}</span>
            ))}
          </div>
          <span style={{ fontFamily:"var(--font-dm-mono,monospace)", fontSize:"0.5rem", letterSpacing:"0.2em", color:"#334155", textTransform:"uppercase" }}>
            SMK Telkom Sidoarjo
          </span>
        </div>
      </div>
    </>
  );
}