import { motion, useReducedMotion } from 'framer-motion';

/** Dòng thời gian dọc: các mốc hiện lần lượt khi cuộn tới. */
export default function EraTimeline({ items, themeColor }) {
  const reduced = useReducedMotion();

  return (
    <ol className="relative ml-3 border-l border-space-700 md:ml-6">
      {items.map((item, i) => (
        <motion.li
          key={`${item.date}-${i}`}
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="mb-6 ml-6 last:mb-0"
        >
          <span
            className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 bg-space-950"
            style={{ borderColor: themeColor }}
            aria-hidden="true"
          />
          <time className="font-mono text-xs" style={{ color: themeColor }}>
            {item.date}
          </time>
          <p className="mt-0.5 text-sm text-slate-200">{item.label}</p>
        </motion.li>
      ))}
    </ol>
  );
}
