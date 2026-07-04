import { useState, useCallback } from 'react';

/**
 * State đồng bộ với localStorage. An toàn khi localStorage bị chặn
 * (chế độ ẩn danh) — khi đó hoạt động như useState thường.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* localStorage bị chặn — bỏ qua */
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, set];
}
