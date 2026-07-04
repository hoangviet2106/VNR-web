import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ROUTES } from '../../utils/constants.js';

function evaluate(pct) {
  if (pct === 100) return 'Xuất sắc! Bạn là nhà sử học du hành thời gian! 🏆';
  if (pct >= 70) return 'Tuyệt vời! Kiến thức của bạn rất vững! 🎉';
  if (pct >= 50) return 'Khá lắm! Du hành lại một lần nữa để củng cố nhé! 💪';
  return 'Đừng nản! Hãy khám phá lại giai đoạn này rồi thử lại nhé! 🔄';
}

/** Màn tổng kết: điểm đếm chạy lên, lời đánh giá, các nút điều hướng. */
export default function QuizResult({ score, total, meta, next, onRetry }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? score : 0);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    if (reduced) return;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setShown(current);
      if (current >= score) clearInterval(timer);
    }, 120);
    if (score === 0) clearInterval(timer);
    return () => clearInterval(timer);
  }, [score, reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <p className="font-mono text-xs tracking-widest text-slate-400">
        KẾT QUẢ THỬ THÁCH {meta.year}
      </p>
      <p className="font-display text-7xl font-bold" style={{ color: meta.themeColor }}>
        {shown}
        <span className="text-3xl text-slate-500">/{total}</span>
      </p>
      <p className="max-w-md text-slate-300">{evaluate(pct)}</p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="rounded-full border border-space-700 px-6 py-2.5 font-display text-sm text-slate-300 transition hover:border-glow-dim"
        >
          🔄 LÀM LẠI
        </button>
        {next && (
          <Link
            to={ROUTES.travel(next.year)}
            className="rounded-full border border-glow px-6 py-2.5 font-display text-sm text-glow transition hover:shadow-neon"
          >
            🚀 DU HÀNH TIẾP: {next.year}
          </Link>
        )}
        <Link
          to={ROUTES.home}
          className="rounded-full border border-space-700 px-6 py-2.5 font-display text-sm text-slate-300 transition hover:border-glow-dim"
        >
          ◂ BẢNG ĐIỀU KHIỂN
        </Link>
      </div>
    </motion.div>
  );
}
