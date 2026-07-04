import { useEffect, useState } from 'react';

/**
 * Số năm nhảy loạn rồi hội tụ dần về năm đích:
 * biên độ nhiễu giảm theo tiến độ, các chữ số khóa dần từ trái sang phải.
 */
export default function YearScrambler({ targetYear, duration = 2000 }) {
  const [display, setDisplay] = useState('????');

  useEffect(() => {
    const target = String(targetYear);
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const locked = Math.floor(t * (target.length + 1)); // số chữ số đã khóa
      let out = '';
      for (let i = 0; i < target.length; i++) {
        out += i < locked ? target[i] : String(Math.floor(Math.random() * 10));
      }
      setDisplay(out);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetYear, duration]);

  return (
    <span className="font-mono text-7xl font-bold tracking-[0.15em] text-glow drop-shadow-[0_0_40px_rgba(34,211,238,0.9)] md:text-9xl">
      {display}
    </span>
  );
}
