import { useState } from 'react';
import SafeImage from '../common/SafeImage.jsx';

/** Card nhân vật lật 2 mặt: mặt trước chân dung, mặt sau tiểu sử. */
export default function FigureCard({ figure, themeColor }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${figure.name} — nhấn để ${flipped ? 'xem chân dung' : 'đọc tiểu sử'}`}
      className="h-80 w-full [perspective:1000px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Mặt trước */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg border bg-space-800 [backface-visibility:hidden]"
          style={{ borderColor: `${themeColor}55` }}
        >
          <SafeImage
            src={figure.portrait}
            alt={`Chân dung ${figure.name}`}
            themeColor={themeColor}
            fit="contain"
            className="h-56 w-full"
          />
          <div className="p-3 text-left">
            <h4 className="font-semibold text-slate-100">{figure.name}</h4>
            <p className="mt-0.5 text-xs text-slate-400">{figure.role}</p>
            <p className="mt-2 font-mono text-[10px] text-slate-500">↻ Nhấn để xem tiểu sử</p>
          </div>
        </div>

        {/* Mặt sau */}
        <div
          className="absolute inset-0 flex rotate-y-180 flex-col justify-between overflow-hidden rounded-lg border bg-space-900 p-4 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ borderColor: themeColor }}
        >
          <div>
            <h4 className="font-semibold" style={{ color: themeColor }}>
              {figure.name}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{figure.bio}</p>
          </div>
          {figure.quote && (
            <blockquote className="mt-2 border-l-2 pl-2 text-xs italic text-slate-400" style={{ borderColor: themeColor }}>
              “{figure.quote}”
            </blockquote>
          )}
        </div>
      </div>
    </button>
  );
}
