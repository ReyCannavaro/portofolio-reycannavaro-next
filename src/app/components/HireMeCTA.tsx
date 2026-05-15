"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail } from "react-icons/fi";

export default function HireMeCTA() {
  const [visible,  setVisible]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

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

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="mailto:reyjunoalcannavaro@gmail.com"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{    opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3 }}
          style={{
            position:       "fixed",
            bottom:         "100px",
            right:          "24px",
            zIndex:         8900,
            display:        "flex",
            alignItems:     "center",
            gap:            8,
            padding:        "10px 16px",
            background:     "var(--orange-light)",
            border:         "2px solid var(--orange)",
            boxShadow:      "4px 4px 0 var(--orange)",
            fontFamily:     "var(--font-accent)",
            fontWeight:     700,
            fontSize:       "12px",
            color:          "var(--orange)",
            textDecoration: "none",
            letterSpacing:  "0.02em",
            transition:     "transform 0.15s ease, box-shadow 0.15s ease",
            borderRadius:   0,
          }}
          whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 var(--orange)" } as never}
          whileTap={{   x:  2, y:  2, boxShadow: "2px 2px 0 var(--orange)" } as never}
          className="hidden md:flex"
        >
          <FiMail size={13} />
          Hire Me
        </motion.a>
      )}
    </AnimatePresence>
  );
}