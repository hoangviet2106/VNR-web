import { useState } from 'react';

/**
 * Facade cho YouTube: hiển thị thumbnail tĩnh, chỉ nạp iframe khi người dùng
 * nhấn play — tránh tải cả player YouTube lúc mở trang.
 */
export default function YouTubeEmbed({ youtubeId, title }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-space-700 bg-space-900">
      <div className="relative aspect-video w-full">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Phát video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-2xl text-glow shadow-neon transition group-hover:scale-110">
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="px-4 py-3 text-sm text-slate-300">{title}</p>
    </div>
  );
}
