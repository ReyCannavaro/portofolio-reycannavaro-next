"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type GlitchMode = "normal" | "glitch";

interface GlitchContextValue {
  mode: GlitchMode;
  setMode: (m: GlitchMode) => void;
  toggle: () => void;
}

const GlitchContext = createContext<GlitchContextValue>({
  mode: "normal",
  setMode: () => {},
  toggle: () => {},
});

export function GlitchProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<GlitchMode>("normal");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rey-glitch-mode") as GlitchMode | null;
      if (saved === "glitch") setModeState("glitch");
    } catch {}
  }, []);

  const setMode = (m: GlitchMode) => {
    setModeState(m);
    try { localStorage.setItem("rey-glitch-mode", m); } catch {}
  };

  const toggle = () => setMode(mode === "normal" ? "glitch" : "normal");

  return (
    <GlitchContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </GlitchContext.Provider>
  );
}

export const useGlitch = () => useContext(GlitchContext);