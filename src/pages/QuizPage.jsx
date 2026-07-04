import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getQuiz, getEraMeta, isValidYear } from '../services/eraService.js';
import { ROUTES } from '../utils/constants.js';

/**
 * Placeholder Phase 0: hiển thị số câu hỏi có trong dữ liệu.
 * Phase 4 sẽ dựng QuestionRenderer với 4 dạng câu hỏi tương tác.
 */
export default function QuizPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const meta = getEraMeta(year);

  useEffect(() => {
    if (!isValidYear(year)) {
      navigate(ROUTES.home, { replace: true });
      return;
    }
    let cancelled = false;
    getQuiz(year).then((data) => {
      if (!cancelled) setQuiz(data);
    });
    return () => {
      cancelled = true;
    };
  }, [year, navigate]);

  if (!meta) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-3xl text-energy">⚡ THỬ THÁCH {meta.year}</h1>
      <p className="font-mono text-sm text-slate-400">
        {quiz
          ? `Dữ liệu có ${quiz.questions.length} câu hỏi — giao diện quiz sẽ dựng ở Phase 4.`
          : 'Đang tải bộ câu hỏi...'}
      </p>
      <Link to={ROUTES.era(year)} className="font-mono text-xs text-slate-500 hover:text-glow">
        ◂ Quay lại giai đoạn {meta.year}
      </Link>
    </main>
  );
}
