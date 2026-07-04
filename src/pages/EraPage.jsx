import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getEra, getEraMeta, getNextEra, isValidYear } from '../services/eraService.js';
import { ROUTES } from '../utils/constants.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import Reveal from '../components/common/Reveal.jsx';
import SafeImage from '../components/common/SafeImage.jsx';
import EraHero from '../components/era/EraHero.jsx';
import SectionHeading from '../components/era/SectionHeading.jsx';
import EventCard from '../components/era/EventCard.jsx';
import FigureCard from '../components/era/FigureCard.jsx';
import EraTimeline from '../components/era/EraTimeline.jsx';
import YouTubeEmbed from '../components/era/YouTubeEmbed.jsx';
import FunFactSection from '../components/era/FunFactSection.jsx';

export default function EraPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const { markVisited } = useProgress();
  const [era, setEra] = useState(null);
  const meta = getEraMeta(year);
  const next = getNextEra(year);
  usePageTitle(meta ? `${meta.year} · ${meta.title}` : null);

  useEffect(() => {
    if (!isValidYear(year)) {
      navigate(ROUTES.home, { replace: true });
      return;
    }
    markVisited(Number(year));
    let cancelled = false;
    getEra(year).then((data) => {
      if (!cancelled) setEra(data);
    });
    return () => {
      cancelled = true;
    };
  }, [year, navigate, markVisited]);

  if (!meta) return null;

  const color = meta.themeColor;

  return (
    <main className="min-h-screen">
      {/* Thanh điều hướng mảnh */}
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-space-700 bg-space-950/85 px-4 py-3 font-mono text-xs backdrop-blur md:px-6">
        <Link to={ROUTES.home} className="text-slate-400 transition hover:text-glow">
          ◂ Bảng điều khiển
        </Link>
        <span style={{ color }}>
          ● {meta.year} — mốc {meta.order}/5
        </span>
      </nav>

      <EraHero meta={meta} intro={era?.intro} />

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 md:px-8">
        {/* Bối cảnh */}
        {era?.context?.paragraphs?.length > 0 && (
          <Reveal>
            <section>
              <SectionHeading themeColor={color}>
                {era.context.heading?.toUpperCase() || 'BỐI CẢNH LỊCH SỬ'}
              </SectionHeading>
              <div className="grid items-start gap-8 md:grid-cols-[1.5fr_1fr]">
                <div>
                  {era.context.paragraphs.map((p, i) => (
                    <p key={i} className="mb-4 leading-relaxed text-slate-300">
                      {p}
                    </p>
                  ))}
                </div>
                <figure>
                  <SafeImage
                    src={era.context.image}
                    alt={era.context.imageCaption || 'Ảnh tư liệu bối cảnh'}
                    themeColor={color}
                    fit="contain"
                    className="aspect-[4/3] w-full rounded-lg"
                  />
                  {era.context.imageCaption && (
                    <figcaption className="mt-2 text-center text-xs text-slate-500">
                      {era.context.imageCaption}
                    </figcaption>
                  )}
                </figure>
              </div>
            </section>
          </Reveal>
        )}

        {/* Sự kiện nổi bật */}
        {era?.events?.length > 0 && (
          <section>
            <SectionHeading themeColor={color}>SỰ KIỆN NỔI BẬT</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {era.events.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 0.06} className={ev.highlight ? 'sm:col-span-2' : ''}>
                  <EventCard event={ev} themeColor={color} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Nhân vật tiêu biểu */}
        {era?.figures?.length > 0 && (
          <section>
            <SectionHeading themeColor={color}>NHÂN VẬT TIÊU BIỂU</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {era.figures.map((fig, i) => (
                <Reveal key={fig.id} delay={i * 0.08}>
                  <FigureCard figure={fig} themeColor={color} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Dòng thời gian */}
        {era?.timeline?.length > 0 && (
          <section>
            <SectionHeading themeColor={color}>DÒNG THỜI GIAN</SectionHeading>
            <EraTimeline items={era.timeline} themeColor={color} />
          </section>
        )}

        {/* Video tư liệu */}
        {era?.videos?.length > 0 && (
          <section>
            <SectionHeading themeColor={color}>VIDEO TƯ LIỆU</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              {era.videos.map((v) => (
                <Reveal key={v.youtubeId}>
                  <YouTubeEmbed youtubeId={v.youtubeId} title={v.title} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Kiến thức mở rộng */}
        {era?.funFacts?.length > 0 && (
          <Reveal>
            <section>
              <SectionHeading themeColor={color}>BẠN CÓ BIẾT?</SectionHeading>
              <FunFactSection facts={era.funFacts} themeColor={color} />
            </section>
          </Reveal>
        )}

        {era === null && (
          <p className="animate-blink text-center font-mono text-sm text-slate-500">
            Đang tải dữ liệu thời gian...
          </p>
        )}
      </div>

      {/* CTA + điều hướng */}
      <section className="border-t border-space-700 px-4 py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4">
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
        </div>
        {era?.sources?.length > 0 && (
          <div className="mx-auto mt-10 max-w-6xl border-t border-space-800 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
              Nguồn tham khảo
            </p>
            <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
              {era.sources.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
