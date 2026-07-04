import { useEffect, useRef } from 'react';

const STREAK_COUNT = 140;

/** Đường hầm ánh sáng: các vệt sáng lao từ tâm ra phía người xem (canvas). */
export default function TimeTunnel() {
  const canvasRef = useRef(null);

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

    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;

    const streaks = Array.from({ length: STREAK_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 0.9 + 0.05, // 0..1 tính từ tâm
      speed: Math.random() * 0.02 + 0.012,
      hue: Math.random() < 0.8 ? 190 : 45, // đa số cyan, lác đác vàng
    }));

    const tick = () => {
      // vệt mờ dần thay vì xóa hẳn → tạo đuôi sáng
      ctx.fillStyle = 'rgba(2, 4, 10, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const maxR = Math.hypot(cx(), cy());
      for (const s of streaks) {
        s.dist += s.speed * (0.4 + s.dist * 2.2); // càng xa tâm càng nhanh
        if (s.dist > 1) {
          s.dist = Math.random() * 0.1 + 0.02;
          s.angle = Math.random() * Math.PI * 2;
        }
        const r1 = s.dist * maxR;
        const r2 = Math.max(r1 - (6 + s.dist * 60), 0);
        const x1 = cx() + Math.cos(s.angle) * r1;
        const y1 = cy() + Math.sin(s.angle) * r1;
        const x2 = cx() + Math.cos(s.angle) * r2;
        const y2 = cy() + Math.sin(s.angle) * r2;
        ctx.strokeStyle = `hsla(${s.hue}, 90%, ${55 + s.dist * 35}%, ${0.25 + s.dist * 0.7})`;
        ctx.lineWidth = 0.5 + s.dist * 2.5;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />;
}
