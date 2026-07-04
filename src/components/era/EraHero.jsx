import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Hero full màn hình: năm lớn + tiêu đề + câu intro gõ chữ dần. */
export default function EraHero({ meta, intro }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(reduced ? intro : '');

  useEffect(() => {
    if (reduced || !intro) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(intro.slice(0, i));
      if (i >= intro.length) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [intro, reduced]);

  return (
    <section
      className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-4 text-center"
      style={{
        background: `radial-gradient(ellipse at 50% 120%, ${meta.themeColor}26 0%, transparent 55%)`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-6xl font-bold tracking-[0.2em] sm:text-7xl md:text-8xl"
        style={{ color: meta.themeColor, textShadow: `0 0 40px ${meta.themeColor}66` }}
      >
        {meta.year}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-4 max-w-2xl text-2xl font-semibold text-slate-100 md:text-3xl"
      >
        {meta.title}
      </motion.h2>
      {intro && (
        <p className="mt-4 min-h-[3rem] max-w-xl font-mono text-sm leading-relaxed text-slate-400">
          {typed}
          {!reduced && typed.length < intro.length && (
            <span className="animate-blink text-glow">▌</span>
          )}
        </p>
      )}
      <motion.span
        aria-hidden="true"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-6 text-2xl text-slate-500"
      >
        ⌄
      </motion.span>
    </section>
  );
}
