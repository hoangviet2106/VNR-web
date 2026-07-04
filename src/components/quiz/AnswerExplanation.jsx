import { motion } from 'framer-motion';

/** Ô giải thích trượt lên sau khi trả lời, kèm nút chuyển câu. */
export default function AnswerExplanation({ correct, explanation, isLast, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`mt-6 rounded-lg border p-4 ${
        correct ? 'border-green-400/60 bg-green-400/5' : 'border-red-400/60 bg-red-400/5'
      }`}
    >
      <p className={`font-semibold ${correct ? 'text-green-300' : 'text-red-300'}`}>
        {correct ? '✔ Chính xác!' : '✘ Chưa đúng!'}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-slate-300">{explanation}</p>
      <div className="mt-3 text-right">
        <button
          onClick={onNext}
          className="rounded-full border border-glow px-6 py-2 font-display text-sm text-glow transition hover:shadow-neon"
        >
          {isLast ? 'XEM KẾT QUẢ ▸' : 'CÂU TIẾP ▸'}
        </button>
      </div>
    </motion.div>
  );
}
