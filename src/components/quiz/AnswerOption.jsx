import { motion } from 'framer-motion';

/**
 * Một đáp án trắc nghiệm. state: 'idle' | 'correct' | 'wrong' | 'reveal' | 'locked'
 * - correct/wrong: đáp án người dùng đã chọn
 * - reveal: đáp án đúng được lộ ra khi chọn sai
 * - locked: các đáp án còn lại sau khi trả lời
 */
export default function AnswerOption({ label, state, onClick }) {
  const styles = {
    idle: 'border-space-700 bg-space-800 text-slate-200 hover:border-glow-dim',
    correct: 'border-green-400 bg-green-400/10 text-green-300',
    wrong: 'border-red-400 bg-red-400/10 text-red-300',
    reveal: 'border-green-400/60 bg-green-400/5 text-green-300/80',
    locked: 'border-space-700 bg-space-800 text-slate-500',
  };
  const icon = { correct: ' ✔', wrong: ' ✘', reveal: ' ✔' }[state] || '';

  return (
    <motion.button
      onClick={onClick}
      disabled={state !== 'idle'}
      animate={state === 'wrong' ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
      transition={{ duration: 0.35 }}
      className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${styles[state]} ${
        state !== 'idle' ? 'cursor-default' : ''
      }`}
    >
      {label}
      <span className="font-mono">{icon}</span>
    </motion.button>
  );
}
