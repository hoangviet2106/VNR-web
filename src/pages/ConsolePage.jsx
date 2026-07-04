import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEraList } from '../services/eraService.js';
import { ROUTES } from '../utils/constants.js';

export default function ConsolePage() {
  const navigate = useNavigate();
  const eras = getEraList();
  const [selected, setSelected] = useState(null);

  const handleStart = () => {
    if (selected) navigate(ROUTES.travel(selected.year));
  };

  return (
    <main className="scanlines relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-4 py-12">
      {/* Thanh HUD trên */}
      <header className="absolute left-0 top-0 flex w-full items-center justify-between px-6 py-4 font-mono text-xs text-glow-dim">
        <span>⚙ TIME MACHINE v0.1</span>
        <span className="animate-blink text-glow">● ONLINE</span>
      </header>

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-900 tracking-widest text-glow drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] md:text-6xl"
        >
          CỖ MÁY THỜI GIAN
        </motion.h1>
        <p className="mt-3 font-mono text-sm text-slate-400">
          » Chọn điểm đến trong dòng thời gian «
        </p>
      </div>

      {/* Bộ chọn mốc thời gian */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {eras.map((era) => {
          const isSelected = selected?.year === era.year;
          return (
            <motion.button
              key={era.year}
              onClick={() => setSelected(era)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-lg border bg-space-800 p-4 text-left transition-colors ${
                isSelected
                  ? 'border-glow shadow-neon'
                  : 'border-space-700 hover:border-glow-dim'
              }`}
              style={isSelected ? { borderColor: era.themeColor } : undefined}
            >
              <span className="font-display text-2xl font-bold" style={{ color: era.themeColor }}>
                {era.year}
              </span>
              <p className="mt-1 line-clamp-2 text-xs text-slate-400">{era.title}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Màn hình LED điểm đến */}
      <div className="w-full max-w-md rounded border border-space-700 bg-space-900 px-4 py-3 text-center font-mono text-sm">
        {selected ? (
          <span className="text-energy">
            ĐIỂM ĐẾN: {selected.year} — {selected.title}
          </span>
        ) : (
          <span className="animate-blink text-slate-500">-- CHƯA CHỌN ĐIỂM ĐẾN --</span>
        )}
      </div>

      <motion.button
        onClick={handleStart}
        disabled={!selected}
        whileTap={selected ? { scale: 0.95 } : undefined}
        className={`rounded-full border px-14 py-4 font-display text-xl font-bold tracking-widest transition-all ${
          selected
            ? 'animate-pulse-glow border-glow text-glow'
            : 'cursor-not-allowed border-space-700 text-slate-600'
        }`}
      >
        ▶ START
      </motion.button>
    </main>
  );
}
