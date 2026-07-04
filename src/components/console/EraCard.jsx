import { motion } from 'framer-motion';

export default function EraCard({ era, isSelected, isVisited, bestScore, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(era)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={isSelected}
      className={`relative rounded-xl border bg-space-800/90 p-5 text-left transition-colors md:p-6 ${
        isSelected ? 'shadow-neon' : 'border-space-700 hover:border-glow-dim'
      }`}
      style={isSelected ? { borderColor: era.themeColor } : undefined}
    >
      {isVisited && (
        <span
          className="absolute right-2.5 top-2.5 rounded-full border px-2 py-0.5 font-mono text-[10px]"
          style={{ borderColor: era.themeColor, color: era.themeColor }}
          title={bestScore ? `Điểm cao nhất: ${bestScore.score}/${bestScore.total}` : 'Đã khám phá'}
        >
          ✔{bestScore ? ` ${bestScore.score}/${bestScore.total}` : ''}
        </span>
      )}
      <span
        className="font-display text-3xl font-bold md:text-4xl"
        style={{ color: era.themeColor }}
      >
        {era.year}
      </span>
      <p className="mt-2 line-clamp-2 text-sm text-slate-400">{era.title}</p>
    </motion.button>
  );
}
