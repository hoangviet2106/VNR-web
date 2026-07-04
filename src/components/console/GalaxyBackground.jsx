import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const STAR_COUNT = 160;
const DRIFT_COUNT = 40;
const SHOOTING_STAR_INTERVAL = [1500, 4500]; // ms giữa 2 lần xuất hiện sao băng

/**
 * Nền thiên hà cho Console:
 * - Lớp CSS: các đám mây nebula (radial-gradient tím / lam / hồng).
 * - Lớp canvas: sao lấp lánh, hạt trôi chậm và sao băng rơi chéo có vệt đuôi.
 * Reduced-motion: chỉ giữ nebula + sao tĩnh, không có sao băng.
 */
export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Sao nền lấp lánh
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.3,
      base: Math.random() * 0.5 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 1.5 + 0.5,
      hue: Math.random() < 0.85 ? 200 : Math.random() < 0.5 ? 45 : 300,
    }));

    // Hạt bụi vũ trụ trôi chậm
    const drifts = Array.from({ length: DRIFT_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      a: Math.random() * 0.4 + 0.1,
    }));

    // Sao băng
    let shootingStars = [];
    let nextSpawn = 0;
    const spawnShootingStar = (now) => {
      const [min, max] = SHOOTING_STAR_INTERVAL;
      nextSpawn = now + min + Math.random() * (max - min);
      const speed = 9 + Math.random() * 7;
      const angle = (Math.PI / 4) * (0.75 + Math.random() * 0.5); // rơi chéo xuống
      shootingStars.push({
        x: Math.random() * canvas.width * 0.9,
        y: -20 + Math.random() * canvas.height * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 90 + Math.random() * 90,
        life: 1,
        decay: 0.008 + Math.random() * 0.008,
      });
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${s.base})`;
        ctx.fill();
      }
    };

    if (reduced) {
      drawStatic();
      return () => window.removeEventListener('resize', resize);
    }

    const tick = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = now / 1000;

      // Sao lấp lánh (alpha dao động theo sin)
      for (const s of stars) {
        const a = s.base * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${a})`;
        ctx.fill();
      }

      // Bụi vũ trụ trôi
      for (const p of drifts) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.a})`;
        ctx.fill();
      }

      // Sao băng
      if (now >= nextSpawn) spawnShootingStar(now);
      shootingStars = shootingStars.filter((m) => m.life > 0);
      for (const m of shootingStars) {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;
        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * m.life})`);
        grad.addColorStop(0.3, `rgba(34, 211, 238, ${0.5 * m.life})`);
        grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        // đầu sao băng sáng hơn
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nebula: các đám mây màu mờ */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 18% 25%, rgba(124, 58, 237, 0.16), transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 82% 20%, rgba(34, 211, 238, 0.11), transparent 70%)',
            'radial-gradient(ellipse 65% 50% at 70% 85%, rgba(219, 39, 119, 0.10), transparent 70%)',
            'radial-gradient(ellipse 45% 40% at 30% 80%, rgba(59, 130, 246, 0.10), transparent 70%)',
          ].join(', '),
        }}
      />
      {/* Dải ngân hà chéo mờ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 38%, rgba(148, 163, 184, 0.05) 47%, rgba(199, 210, 254, 0.08) 50%, rgba(148, 163, 184, 0.05) 53%, transparent 62%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
