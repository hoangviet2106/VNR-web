import { useMemo, useState } from 'react';
import { Reorder } from 'framer-motion';
import { shuffleAvoidIdentity } from '../../utils/shuffle.js';

/**
 * Kéo thả sắp xếp sự kiện theo trình tự thời gian (Framer Motion Reorder —
 * hỗ trợ cả chuột lẫn cảm ứng). Có thêm nút ▲▼ cho bàn phím/screen reader.
 */
export default function OrderingQuestion({ question, onAnswered }) {
  const initial = useMemo(
    () => shuffleAvoidIdentity(question.items.map((it) => it.id)),
    [question]
  );
  const [order, setOrder] = useState(initial);
  const [checked, setChecked] = useState(false);

  const labelOf = (id) => question.items.find((it) => it.id === id)?.label;
  const isCorrectAt = (id, idx) => question.correctOrder[idx] === id;

  const move = (idx, dir) => {
    if (checked) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next);
  };

  const handleCheck = () => {
    setChecked(true);
    onAnswered(order.every((id, idx) => isCorrectAt(id, idx)));
  };

  return (
    <div>
      <p className="mb-2 text-lg font-medium text-slate-100">{question.question}</p>
      <p className="mb-4 font-mono text-xs text-slate-500">
        Kéo thả (hoặc dùng nút ▲▼) để sắp xếp, sau đó nhấn Kiểm tra
      </p>
      <Reorder.Group axis="y" values={order} onReorder={checked ? () => {} : setOrder} className="space-y-2">
        {order.map((id, idx) => (
          <Reorder.Item
            key={id}
            value={id}
            dragListener={!checked}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
              checked
                ? isCorrectAt(id, idx)
                  ? 'border-green-400 bg-green-400/10 text-green-300'
                  : 'border-red-400 bg-red-400/10 text-red-300'
                : 'cursor-grab border-space-700 bg-space-800 text-slate-200 active:cursor-grabbing'
            }`}
          >
            <span className="font-mono text-xs text-slate-500">{idx + 1}.</span>
            <span className="flex-1">{labelOf(id)}</span>
            {!checked && (
              <span className="flex gap-1">
                <button
                  onClick={() => move(idx, -1)}
                  aria-label="Di chuyển lên"
                  className="rounded border border-space-700 px-1.5 text-xs text-slate-400 hover:border-glow-dim"
                >
                  ▲
                </button>
                <button
                  onClick={() => move(idx, 1)}
                  aria-label="Di chuyển xuống"
                  className="rounded border border-space-700 px-1.5 text-xs text-slate-400 hover:border-glow-dim"
                >
                  ▼
                </button>
              </span>
            )}
            {checked && (
              <span className="font-mono text-xs">{isCorrectAt(id, idx) ? '✔' : '✘'}</span>
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
      {!checked && (
        <button
          onClick={handleCheck}
          className="mt-5 rounded-full border border-glow px-8 py-2.5 font-display text-sm text-glow transition hover:shadow-neon"
        >
          KIỂM TRA
        </button>
      )}
    </div>
  );
}
