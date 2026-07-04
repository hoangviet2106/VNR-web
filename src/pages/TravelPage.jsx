import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidYear } from '../services/eraService.js';
import { ROUTES, TRAVEL } from '../utils/constants.js';

/**
 * Placeholder Phase 0: đếm ngược 3-2-1 rồi chuyển sang Era Page.
 * Phase 2 sẽ thêm tunnel ánh sáng, year scrambler, shake, âm thanh.
 */
export default function TravelPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!isValidYear(year)) {
      navigate(ROUTES.home, { replace: true });
      return;
    }
    if (count === 0) {
      navigate(ROUTES.era(year), { replace: true });
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), TRAVEL.countdownStep);
    return () => clearTimeout(timer);
  }, [count, year, navigate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ scale: 2.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-display text-9xl font-bold text-glow drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]"
        >
          {count > 0 ? count : ''}
        </motion.span>
      </AnimatePresence>
      <p className="mt-8 font-mono text-sm text-slate-500">
        Đang du hành đến năm <span className="text-energy">{year}</span>...
      </p>
      <button
        onClick={() => navigate(ROUTES.era(year), { replace: true })}
        className="mt-12 font-mono text-xs text-slate-600 hover:text-glow"
      >
        Bỏ qua ▸▸
      </button>
    </main>
  );
}
