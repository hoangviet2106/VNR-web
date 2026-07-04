import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants.js';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-glow">404</h1>
      <p className="text-slate-400">
        Bạn đã lạc khỏi dòng thời gian. Tọa độ này không tồn tại trong hệ thống.
      </p>
      <Link
        to={ROUTES.home}
        className="rounded-full border border-glow px-8 py-3 font-display text-glow transition hover:shadow-neon"
      >
        ◂ VỀ BẢNG ĐIỀU KHIỂN
      </Link>
    </main>
  );
}
