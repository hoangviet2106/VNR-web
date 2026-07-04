import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEra, getEraMeta, getNextEra, isValidYear } from '../services/eraService.js';
import { ROUTES } from '../utils/constants.js';

/**
 * Placeholder Phase 0/1: render nội dung thô từ JSON.
 * Phase 3 sẽ tách thành các section component với hiệu ứng đầy đủ.
 */
export default function EraPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [era, setEra] = useState(null);
  const meta = getEraMeta(year);
  const next = getNextEra(year);

  useEffect(() => {
    if (!isValidYear(year)) {
      navigate(ROUTES.home, { replace: true });
      return;
    }
    let cancelled = false;
    getEra(year).then((data) => {
      if (!cancelled) setEra(data);
    });
    return () => {
      cancelled = true;
    };
  }, [year, navigate]);

  if (!meta) return null;

  return (
    <main className="min-h-screen">
      {/* Thanh điều hướng mảnh */}
      <nav className="flex items-center justify-between border-b border-space-700 px-6 py-3 font-mono text-xs">
        <Link to={ROUTES.home} className="text-slate-400 hover:text-glow">
          ◂ Bảng điều khiển
        </Link>
        <span style={{ color: meta.themeColor }}>
          ● {meta.year} — mốc {meta.order}/5
        </span>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-7xl font-bold tracking-[0.2em] md:text-8xl"
          style={{ color: meta.themeColor }}
        >
          {meta.year}
        </motion.h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-100 md:text-3xl">{meta.title}</h2>
        <p className="mt-2 text-slate-400">{meta.subtitle}</p>
      </section>

      {/* Nội dung từ JSON (khung thô — hoàn thiện ở Phase 3) */}
      <section className="mx-auto max-w-3xl space-y-8 px-4 pb-16">
        {era?.context?.paragraphs?.length > 0 && (
          <div className="rounded-lg border border-space-700 bg-space-800 p-6">
            <h3 className="mb-3 font-display text-lg text-glow">BỐI CẢNH LỊCH SỬ</h3>
            {era.context.paragraphs.map((p, i) => (
              <p key={i} className="mb-3 leading-relaxed text-slate-300">
                {p}
              </p>
            ))}
          </div>
        )}

        {era?.events?.length > 0 && (
          <div>
            <h3 className="mb-4 font-display text-lg text-glow">SỰ KIỆN NỔI BẬT</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {era.events.map((ev) => (
                <div key={ev.id} className="rounded-lg border border-space-700 bg-space-800 p-4">
                  <span className="font-mono text-xs text-energy">{ev.date}</span>
                  <h4 className="mt-1 font-semibold text-slate-100">{ev.title}</h4>
                  <p className="mt-1 text-sm text-slate-400">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {era === null && (
          <p className="animate-blink text-center font-mono text-sm text-slate-500">
            Đang tải dữ liệu thời gian...
          </p>
        )}
        {era !== null && !era.events?.length && (
          <p className="rounded border border-dashed border-space-700 p-6 text-center font-mono text-sm text-slate-500">
            [ Nội dung giai đoạn {meta.year} sẽ được bổ sung ở Phase 1/5 ]
          </p>
        )}
      </section>

      {/* Điều hướng */}
      <section className="flex flex-wrap items-center justify-center gap-4 border-t border-space-700 px-4 py-10">
        <Link
          to={ROUTES.quiz(year)}
          className="rounded-full border border-energy px-8 py-3 font-display text-energy transition hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
        >
          ⚡ THỬ THÁCH KIẾN THỨC
        </Link>
        {next && (
          <Link
            to={ROUTES.travel(next.year)}
            className="rounded-full border border-glow px-8 py-3 font-display text-glow transition hover:shadow-neon"
          >
            🚀 DU HÀNH TIẾP: {next.year}
          </Link>
        )}
      </section>
    </main>
  );
}
