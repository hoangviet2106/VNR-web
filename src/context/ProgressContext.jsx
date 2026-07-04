import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { STORAGE_KEY } from '../utils/constants.js';

const Ctx = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useLocalStorage(`${STORAGE_KEY}:progress`, {
    visited: [],
    bestScores: {},
  });

  const markVisited = useCallback(
    (year) => {
      setProgress((p) =>
        p.visited.includes(year) ? p : { ...p, visited: [...p.visited, year] }
      );
    },
    [setProgress]
  );

  const saveScore = useCallback(
    (year, score, total) => {
      setProgress((p) => {
        const prev = p.bestScores[year];
        if (prev && prev.score >= score) return p;
        return { ...p, bestScores: { ...p.bestScores, [year]: { score, total } } };
      });
    },
    [setProgress]
  );

  const value = useMemo(
    () => ({
      visited: progress.visited,
      bestScores: progress.bestScores,
      markVisited,
      saveScore,
    }),
    [progress, markVisited, saveScore]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress phải dùng bên trong <ProgressProvider>');
  return ctx;
}
