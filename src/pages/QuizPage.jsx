import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getQuiz, getEraMeta, getNextEra, isValidYear } from '../services/eraService.js';
import { ROUTES } from '../utils/constants.js';
import { useAudio } from '../context/AudioContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import QuestionRenderer from '../components/quiz/QuestionRenderer.jsx';
import AnswerExplanation from '../components/quiz/AnswerExplanation.jsx';
import QuizResult from '../components/quiz/QuizResult.jsx';

export default function QuizPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const { play } = useAudio();
  const { saveScore } = useProgress();
  const meta = getEraMeta(year);
  const next = getNextEra(year);
  usePageTitle(meta ? `Thử thách ${meta.year}` : null);

  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null); // null | { correct }
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0); // tăng khi làm lại để reset toàn bộ

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

  const questions = quiz?.questions ?? [];
  const current = questions[index];
  const isLast = index === questions.length - 1;

  const handleAnswered = (correct) => {
    play(correct ? 'correct' : 'wrong');
    setAnswered({ correct });
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setAnswered(null);
    if (isLast) {
      const finalScore = score; // score đã cộng ở handleAnswered
      saveScore(Number(year), finalScore, questions.length);
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleRetry = () => {
    setIndex(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    setRound((r) => r + 1);
  };

  if (!meta) return null;

  return (
    <main className="min-h-screen">
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-space-700 bg-space-950/85 px-4 py-3 font-mono text-xs backdrop-blur md:px-6">
        <Link to={ROUTES.era(year)} className="text-slate-400 transition hover:text-glow">
          ◂ Giai đoạn {meta.year}
        </Link>
        {!finished && questions.length > 0 && (
          <span className="text-slate-400">
            Câu <span className="text-glow">{index + 1}</span>/{questions.length} · ⚡{' '}
            <span className="text-energy">{score}</span> điểm
          </span>
        )}
      </nav>

      {/* Thanh tiến độ */}
      {!finished && questions.length > 0 && (
        <div className="h-1 w-full bg-space-800">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%`,
              backgroundColor: meta.themeColor,
            }}
          />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-8 text-center font-display text-2xl text-energy">
          ⚡ THỬ THÁCH {meta.year}
        </h1>

        {quiz === null && (
          <p className="animate-blink text-center font-mono text-sm text-slate-500">
            Đang tải bộ câu hỏi...
          </p>
        )}

        {quiz !== null && questions.length === 0 && (
          <p className="rounded border border-dashed border-space-700 p-6 text-center font-mono text-sm text-slate-500">
            [ Bộ câu hỏi cho giai đoạn {meta.year} đang được biên soạn ]
          </p>
        )}

        {finished ? (
          <QuizResult
            score={score}
            total={questions.length}
            meta={meta}
            next={next}
            onRetry={handleRetry}
          />
        ) : (
          current && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${round}-${current.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionRenderer
                  question={current}
                  onAnswered={handleAnswered}
                  themeColor={meta.themeColor}
                />
                {answered && (
                  <AnswerExplanation
                    correct={answered.correct}
                    explanation={current.explanation}
                    isLast={isLast}
                    onNext={handleNext}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )
        )}
      </div>
    </main>
  );
}
