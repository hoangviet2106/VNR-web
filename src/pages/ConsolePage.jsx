import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEraList } from '../services/eraService.js';
import { ROUTES } from '../utils/constants.js';
import { useAudio } from '../context/AudioContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import ParticleBackground from '../components/console/ParticleBackground.jsx';
import EraCard from '../components/console/EraCard.jsx';
import SoundToggle from '../components/common/SoundToggle.jsx';
import GlitchText from '../components/common/GlitchText.jsx';

export default function ConsolePage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const eras = getEraList();
  const { play } = useAudio();
  const { visited, bestScores } = useProgress();
  const [selected, setSelected] = useState(null);

  const handleSelect = (era) => {
    setSelected(era);
    play('click');
  };

  const handleStart = () => {
    if (!selected) return;
    play('start');
    navigate(ROUTES.travel(selected.year));
  };

  return (
    <main className="scanlines relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-4 pb-24 pt-16 md:gap-10 md:pb-12">
      <ParticleBackground />

      {/* Thanh HUD trên */}
      <header className="absolute left-0 top-0 flex w-full items-center justify-between px-4 py-3 font-mono text-xs text-glow-dim md:px-6 md:py-4">
        <span>⚙ TIME MACHINE v1.0</span>
        <div className="flex items-center gap-3">
          <span className="animate-blink text-glow">● ONLINE</span>
          <SoundToggle />
        </div>
      </header>

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold tracking-widest text-glow drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] sm:text-4xl md:text-6xl"
        >
          <GlitchText text="CỖ MÁY THỜI GIAN" />
        </motion.h1>
        <p className="mt-3 font-mono text-xs text-slate-400 sm:text-sm">
          » Chọn điểm đến trong dòng thời gian «
        </p>
      </div>

      {/* Bộ chọn mốc thời gian */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {eras.map((era) => (
          <EraCard
            key={era.year}
            era={era}
            isSelected={selected?.year === era.year}
            isVisited={visited.includes(era.year)}
            bestScore={bestScores[era.year]}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Màn hình LED điểm đến */}
      <div className="w-full max-w-md rounded border border-space-700 bg-space-900/90 px-4 py-3 text-center font-mono text-xs sm:text-sm">
        {selected ? (
          <span className="text-energy">
            ĐIỂM ĐẾN: {selected.year} — {selected.title}
          </span>
        ) : (
          <span className="animate-blink text-slate-500">-- CHƯA CHỌN ĐIỂM ĐẾN --</span>
        )}
      </div>

      {/* START: sticky đáy trên mobile, inline trên desktop */}
      <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-space-950 via-space-950/90 to-transparent px-4 pb-4 pt-6 md:static md:bg-none md:p-0">
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
      </div>

      {/* Trang trí: energy bar + đèn nháy */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 font-mono text-[10px] text-glow-dim"
      >
        <span className="tracking-widest">▁▂▃▅▆▅▃▂▁</span>
        <span className="flex gap-1.5">
          <i className="h-1.5 w-1.5 animate-blink rounded-full bg-glow" />
          <i
            className="h-1.5 w-1.5 animate-blink rounded-full bg-energy"
            style={{ animationDelay: '0.4s' }}
          />
          <i
            className="h-1.5 w-1.5 animate-blink rounded-full bg-glow-dim"
            style={{ animationDelay: '0.8s' }}
          />
        </span>
        <span className="tracking-widest">▁▂▃▅▆▅▃▂▁</span>
      </div>
    </main>
  );
}
