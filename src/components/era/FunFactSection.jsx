import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Accordion "Bạn có biết?" — mở một mục tại một thời điểm. */
export default function FunFactSection({ facts, themeColor }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {facts.map((fact, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-lg border bg-space-800"
            style={{ borderColor: isOpen ? `${themeColor}88` : '#1c2942' }}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="text-sm font-medium text-slate-100">
                💡 {fact.question}
              </span>
              <span
                className="font-mono text-lg transition-transform"
                style={{ color: themeColor, transform: isOpen ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-4 pb-4 text-sm leading-relaxed text-slate-400">
                    {fact.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
