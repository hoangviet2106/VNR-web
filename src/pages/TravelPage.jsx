import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { isValidYear, getEraMeta } from '../services/eraService.js';
import { ROUTES, TRAVEL } from '../utils/constants.js';
import { useAudio } from '../context/AudioContext.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import TimeTunnel from '../components/travel/TimeTunnel.jsx';
import YearScrambler from '../components/travel/YearScrambler.jsx';

/**
 * Trình tự du hành: đếm ngược 3-2-1 → tunnel + số năm hội tụ + rung màn hình
 * → flash trắng → chuyển sang Era Page. Có nút Bỏ qua sau 1 giây.
 */
export default function TravelPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const { play } = useAudio();
  const reduced = useReducedMotion();
  const meta = getEraMeta(year);
  usePageTitle(meta ? `Đang du hành đến ${meta.year}` : null);

  // phase: countdown → tunnel → flash
  const [phase, setPhase] = useState('countdown');
  const [count, setCount] = useState(3);
  const [showSkip, setShowSkip] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    navigate(ROUTES.era(year), { replace: true });
  };

  useEffect(() => {
    if (!isValidYear(year)) {
      navigate(ROUTES.home, { replace: true });
      return;
    }
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimer);
  }, [year, navigate]);

  // Reduced motion: bỏ toàn bộ hiệu ứng, fade nhanh rồi vào trang
  useEffect(() => {
    if (!reduced || !isValidYear(year)) return;
    const t = setTimeout(finish, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, year]);

  // Pha đếm ngược
  useEffect(() => {
    if (reduced || phase !== 'countdown') return;
    play('beep');
    if (count === 0) {
      setPhase('tunnel');
      play('travel');
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), TRAVEL.countdownStep);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, phase, reduced]);

  // Pha tunnel → flash → xong
  useEffect(() => {
    if (reduced || phase !== 'tunnel') return;
    const toFlash = setTimeout(() => setPhase('flash'), TRAVEL.tunnel);
    return () => clearTimeout(toFlash);
  }, [phase, reduced]);

  useEffect(() => {
    if (reduced || phase !== 'flash') return;
    const t = setTimeout(finish, TRAVEL.flash);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduced]);

  if (!meta) return null;

  if (reduced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <p className="font-mono text-slate-400">
          Đang đến năm <span className="text-energy">{year}</span>...
        </p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {phase !== 'countdown' && <TimeTunnel />}

      {/* Rung màn hình ở pha tunnel */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={
          phase === 'tunnel'
            ? { x: [0, -4, 5, -3, 4, -2, 0], y: [0, 3, -4, 2, -3, 1, 0] }
            : { x: 0, y: 0 }
        }
        transition={phase === 'tunnel' ? { duration: 0.4, repeat: Infinity } : undefined}
      >
        <AnimatePresence mode="wait">
          {phase === 'countdown' ? (
            <motion.span
              key={count}
              initial={{ scale: 2.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glitch font-display text-9xl font-bold text-glow drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]"
              data-text={String(count)}
            >
              {count}
            </motion.span>
          ) : (
            <motion.div
              key="scrambler"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <YearScrambler targetYear={meta.year} duration={TRAVEL.tunnel - 300} />
              <p className="mt-6 animate-blink font-mono text-xs tracking-widest text-slate-400 md:text-sm">
                ĐANG XUYÊN QUA DÒNG THỜI GIAN...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Flash trắng kết thúc */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: TRAVEL.flash / 1000 }}
            className="absolute inset-0 z-20 bg-white"
          />
        )}
      </AnimatePresence>

      {showSkip && phase !== 'flash' && (
        <button
          onClick={finish}
          className="absolute bottom-8 right-8 z-30 font-mono text-xs text-slate-500 transition hover:text-glow"
        >
          Bỏ qua ▸▸
        </button>
      )}
    </main>
  );
}
