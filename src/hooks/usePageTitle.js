import { useEffect } from 'react';

const BASE = 'Cỗ Máy Thời Gian';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Du hành lịch sử Việt Nam`;
    return () => {
      document.title = `${BASE} — Du hành lịch sử Việt Nam`;
    };
  }, [title]);
}
