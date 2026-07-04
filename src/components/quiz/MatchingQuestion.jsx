import { useMemo, useState } from 'react';
import { shuffleAvoidIdentity } from '../../utils/shuffle.js';

const PAIR_COLORS = ['#22d3ee', '#fbbf24', '#f472b6', '#4ade80', '#a78bfa', '#fb923c'];

/**
 * Ghép sự kiện với năm: chạm chọn một mục bên trái rồi chạm mục bên phải
 * để nối cặp (tin cậy hơn kéo thả trên màn hình cảm ứng). Chạm lại để hủy cặp.
 */
export default function MatchingQuestion({ question, onAnswered }) {
  const rights = useMemo(
    () => shuffleAvoidIdentity(question.pairs.map((p) => p.right)),
    [question]
  );
  const [links, setLinks] = useState({}); // left -> right
  const [activeLeft, setActiveLeft] = useState(null);
  const [checked, setChecked] = useState(false);

  const rightTaken = (right) => Object.values(links).includes(right);
  const allLinked = Object.keys(links).length === question.pairs.length;
  const isPairCorrect = (left) =>
    question.pairs.find((p) => p.left === left)?.right === links[left];

  const colorOf = (left) => {
    const idx = Object.keys(links).indexOf(left);
    return idx === -1 ? null : PAIR_COLORS[idx % PAIR_COLORS.length];
  };
  const colorOfRight = (right) => {
    const left = Object.keys(links).find((l) => links[l] === right);
    return left ? colorOf(left) : null;
  };

  const clickLeft = (left) => {
    if (checked) return;
    if (links[left]) {
      // hủy cặp đã nối
      const next = { ...links };
      delete next[left];
      setLinks(next);
      setActiveLeft(left);
    } else {
      setActiveLeft(activeLeft === left ? null : left);
    }
  };

  const clickRight = (right) => {
    if (checked || !activeLeft || rightTaken(right)) return;
    setLinks({ ...links, [activeLeft]: right });
    setActiveLeft(null);
  };

  const handleCheck = () => {
    setChecked(true);
    onAnswered(question.pairs.every((p) => links[p.left] === p.right));
  };

  const cellBase = 'w-full rounded-lg border px-3 py-2.5 text-left text-sm transition';

  return (
    <div>
      <p className="mb-2 text-lg font-medium text-slate-100">{question.question}</p>
      <p className="mb-4 font-mono text-xs text-slate-500">
        Chạm một mục bên trái, rồi chạm mốc tương ứng bên phải để nối cặp
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {question.pairs.map((p) => {
            const linked = links[p.left];
            const color = colorOf(p.left);
            const resultStyle = checked
              ? isPairCorrect(p.left)
                ? { borderColor: '#4ade80', color: '#86efac' }
                : { borderColor: '#f87171', color: '#fca5a5' }
              : color
                ? { borderColor: color }
                : undefined;
            return (
              <button
                key={p.left}
                onClick={() => clickLeft(p.left)}
                disabled={checked}
                style={resultStyle}
                className={`${cellBase} ${
                  activeLeft === p.left
                    ? 'border-glow bg-glow/10 text-glow'
                    : linked
                      ? 'bg-space-800 text-slate-200'
                      : 'border-space-700 bg-space-800 text-slate-200 hover:border-glow-dim'
                }`}
              >
                {p.left}
                {checked && (
                  <span className="ml-1 font-mono text-xs">
                    {isPairCorrect(p.left) ? '✔' : `✘ (${question.pairs.find((q) => q.left === p.left).right})`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rights.map((right) => {
            const color = colorOfRight(right);
            return (
              <button
                key={right}
                onClick={() => clickRight(right)}
                disabled={checked || (!activeLeft && !rightTaken(right))}
                style={color && !checked ? { borderColor: color } : undefined}
                className={`${cellBase} font-mono ${
                  rightTaken(right)
                    ? 'bg-space-800 text-slate-200'
                    : activeLeft
                      ? 'border-space-700 bg-space-800 text-slate-200 hover:border-glow'
                      : 'border-space-700 bg-space-900 text-slate-500'
                }`}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>
      {!checked && (
        <button
          onClick={handleCheck}
          disabled={!allLinked}
          className={`mt-5 rounded-full border px-8 py-2.5 font-display text-sm transition ${
            allLinked
              ? 'border-glow text-glow hover:shadow-neon'
              : 'cursor-not-allowed border-space-700 text-slate-600'
          }`}
        >
          KIỂM TRA
        </button>
      )}
    </div>
  );
}
