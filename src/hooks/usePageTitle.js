import { useEffect } from 'react';

const BASE = 'Ngược Dòng Trăm Năm';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Du hành lịch sử Việt Nam`;
    return () => {
      document.title = `${BASE} — Du hành lịch sử Việt Nam`;
    };
  }, [title]);
}
