import MultipleChoiceQuestion from './MultipleChoiceQuestion.jsx';
import GuessFigureQuestion from './GuessFigureQuestion.jsx';
import OrderingQuestion from './OrderingQuestion.jsx';
import MatchingQuestion from './MatchingQuestion.jsx';

/** Chọn component theo question.type. key đặt ở QuizPage để reset state mỗi câu. */
export default function QuestionRenderer({ question, onAnswered, themeColor }) {
  switch (question.type) {
    case 'multiple-choice':
      return <MultipleChoiceQuestion question={question} onAnswered={onAnswered} />;
    case 'guess-figure':
      return (
        <GuessFigureQuestion
          question={question}
          onAnswered={onAnswered}
          themeColor={themeColor}
        />
      );
    case 'ordering':
      return <OrderingQuestion question={question} onAnswered={onAnswered} />;
    case 'matching':
      return <MatchingQuestion question={question} onAnswered={onAnswered} />;
    default:
      return (
        <p className="font-mono text-sm text-red-400">
          Dạng câu hỏi không hỗ trợ: {question.type}
        </p>
      );
  }
}
