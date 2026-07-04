import { useMemo, useState } from 'react';
import { shuffle } from '../../utils/shuffle.js';
import AnswerOption from './AnswerOption.jsx';

/**
 * Trắc nghiệm 1 đáp án. Xáo trộn vị trí đáp án khi render.
 * onAnswered(correct: boolean) gọi đúng một lần khi người dùng chọn.
 */
export default function MultipleChoiceQuestion({ question, onAnswered, children }) {
  const [picked, setPicked] = useState(null);
  const options = useMemo(
    () => shuffle(question.options.map((label, index) => ({ label, index }))),
    [question]
  );

  const answered = picked !== null;

  const stateOf = (opt) => {
    if (!answered) return 'idle';
    if (opt.index === picked) return picked === question.correctIndex ? 'correct' : 'wrong';
    if (opt.index === question.correctIndex) return 'reveal';
    return 'locked';
  };

  return (
    <div>
      <p className="mb-5 text-lg font-medium text-slate-100">{question.question}</p>
      {children /* chỗ cắm ảnh cho dạng guess-figure */}
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <AnswerOption
            key={opt.index}
            label={opt.label}
            state={stateOf(opt)}
            onClick={() => {
              if (answered) return;
              setPicked(opt.index);
              onAnswered(opt.index === question.correctIndex);
            }}
          />
        ))}
      </div>
    </div>
  );
}
