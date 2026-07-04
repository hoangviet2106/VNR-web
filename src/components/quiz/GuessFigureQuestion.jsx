import SafeImage from '../common/SafeImage.jsx';
import MultipleChoiceQuestion from './MultipleChoiceQuestion.jsx';

/** Đoán nhân vật qua ảnh: trắc nghiệm + ảnh chân dung (kèm gợi ý nếu thiếu ảnh). */
export default function GuessFigureQuestion({ question, onAnswered, themeColor }) {
  return (
    <MultipleChoiceQuestion question={question} onAnswered={onAnswered}>
      <div className="mb-5 flex flex-col items-center gap-2">
        <SafeImage
          src={question.image}
          alt="Ảnh nhân vật cần đoán"
          themeColor={themeColor}
          fit="contain"
          className="h-72 w-60 rounded-lg"
        />
        {question.hint && (
          <p className="font-mono text-xs text-slate-500">Gợi ý: {question.hint}</p>
        )}
      </div>
    </MultipleChoiceQuestion>
  );
}
