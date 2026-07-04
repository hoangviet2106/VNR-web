import { motion } from 'framer-motion';

export default function EraCard({ era, isSelected, isVisited, bestScore, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(era)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={isSelected}
      className={`relative rounded-lg border bg-space-800/90 p-4 text-left transition-colors ${
        isSelected ? 'shadow-neon' : 'border-space-700 hover:border-glow-dim'
      }`}
      style={isSelected ? { borderColor: era.themeColor } : undefined}
    >
      {isVisited && (
        <span
          className="absolute right-2 top-2 rounded-full border px-1.5 py-0.5 font-mono text-[9px]"
          style={{ borderColor: era.themeColor, color: era.themeColor }}
          title={bestScore ? `Điểm cao nhất: ${bestScore.score}/${bestScore.total}` : 'Đã khám phá'}
        >
          ✔{bestScore ? ` ${bestScore.score}/${bestScore.total}` : ''}
        </span>
      )}
      <span className="font-display text-2xl font-bold" style={{ color: era.themeColor }}>
        {era.year}
      </span>
      <p className="mt-1 line-clamp-2 text-xs text-slate-400">{era.title}</p>
    </motion.button>
  );
}
