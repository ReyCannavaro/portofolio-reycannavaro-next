"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiArrowUpRight } from "react-icons/fi";

const MESSAGES = [
  "Open to Internship",
  "Available for Freelance",
  "Let's Build Something",
  "Drop Me a Message",
];

export default function HireMeCTA() {
  const [visible, setVisible]   = useState(false);
  const [msgIdx, setMsgIdx]     = useState(0);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(pct > 0.22);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 2800);
    return () => clearInterval(id);
  }, [visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="mailto:reyjunoalcannavaro@gmail.com"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.4, ease: [0.23,1,0.32,1] }}
          style={{
            position:    "fixed",
            bottom:      "1.5rem",
            left:        "1.5rem",
            zIndex:      9988,
            display:     "flex",
            alignItems:  "center",
            gap:         "0.65rem",
            padding:     "0.7rem 1.1rem 0.7rem 0.85rem",
            borderRadius: 14,
            background:  "rgba(7,9,15,0.88)",
            backdropFilter: "blur(20px)",
            border:      "1px solid rgba(99,102,241,0.25)",
            boxShadow:   "0 16px 40px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)",
            textDecoration: "none",
            cursor:      "none",
            overflow:    "hidden",
          }}
          whileHover={{ scale: 1.03, borderColor: "rgba(99,102,241,0.5)" }}
          whileTap={{   scale: 0.97 }}
        >
          <div style={{ position:"relative", flexShrink:0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 0 rgba(99,102,241,0.5)",
              animation: "hirepulse 2s ease infinite",
            }}>
              <FiMail size={15} color="#fff" />
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:1, minWidth:148 }}>
            <span style={{
              fontFamily:"var(--font-dm-mono)", fontSize:"0.48rem",
              letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--fg-3)",
            }}>Rey Cannavaro</span>
            <div style={{ height:18, overflow:"hidden", position:"relative" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIdx}
                  initial={{ y: 18, opacity:0 }}
                  animate={{ y: 0,  opacity:1 }}
                  exit={{    y:-18, opacity:0 }}
                  transition={{ duration:0.3, ease:[0.23,1,0.32,1] }}
                  style={{
                    position:"absolute",
                    fontFamily:"var(--font-syne)", fontWeight:700,
                    fontSize:"0.78rem", letterSpacing:"-0.01em",
                    color:"var(--fg)", whiteSpace:"nowrap",
                  }}
                >
                  {MESSAGES[msgIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <FiArrowUpRight size={14} color="var(--fg-3)" style={{ flexShrink:0, marginLeft:2 }} />

          <style>{`
            @keyframes hirepulse {
              0%   { box-shadow: 0 0 0 0   rgba(99,102,241,0.55); }
              70%  { box-shadow: 0 0 0 10px rgba(99,102,241,0);   }
              100% { box-shadow: 0 0 0 0   rgba(99,102,241,0);    }
            }
          `}</style>
        </motion.a>
      )}
    </AnimatePresence>
  );
}