// src/components/ai/PromptChip.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PromptChip() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    "Ask me about today’s marine pollution hotspots"
  );
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, value.length);
    }
  }, [open]);

  function submit(q) {
    const query = (q ?? value).trim();
    if (!query) return;
    navigate(`/assistant?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="fixed right-4 bottom-5 md:right-6 md:bottom-7 z-30">
      {/* Collapsed pill */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-full px-4 py-2 flex items-center gap-2
                     text-navy bg-white/20 hover:bg-white/30"
          aria-label="Open AI prompt"
        >
          {/* sparkles icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.8 4.6L18 8.5l-4.4 1.4L12 14l-1.6-4.1L6 8.5l4.2-1.9L12 2Zm7 7 1 2.5 2.5 1-2.5 1L19 16l-1-2.5-2.5-1 2.5-1L19 9Zm-14 2 1 2.5 2.5 1-2.5 1L5 18l-1-2.5-2.5-1 2.5-1L5 11Z"/>
          </svg>
          <span className="font-medium">Ask Ecosphere AI</span>
        </motion.button>
      )}

      {/* Expanded composer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="glass rounded-2xl p-3 w-[92vw] max-w-[520px]
                       bg-white/15 backdrop-blur-lg border-white/20 shadow-[0_12px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-2">
              {/* AI avatar dot */}
              <div
                className="w-8 h-8 rounded-full border border-white/25"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #9FF5DE, #CAEBFF 60%, #FDFAEC)"
                }}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="flex-1 bg-transparent outline-none text-ivory placeholder:text-ivory/60
                           text-sm md:text-base"
                placeholder="Type a question…"
              />
              <button
                onClick={() => submit()}
                className="rounded-xl px-3 py-2 bg-primary/70 hover:bg-primary text-navy font-semibold"
                aria-label="Send prompt"
              >
                Ask
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2 text-ivory/70 hover:text-ivory"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* smart suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Hotspots near Mumbai today",
                "Ghost nets incidents this week",
                "Coral bleaching alerts now",
                "Top active cleanup projects"
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="text-xs md:text-sm rounded-full px-3 py-1
                             bg-secondary/70 text-navy border border-navy/10 hover:bg-secondary"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
