import { useState } from 'react';

/**
 * Ảnh có fallback: khi thiếu file hiển thị ô placeholder gradient theo màu chủ đề.
 *
 * fit="cover"   (mặc định): ảnh phủ kín khung, có thể bị cắt mép.
 * fit="contain": ảnh hiện nguyên vẹn không bị cắt; phần hở được lấp bằng
 *                chính ảnh đó phóng to + làm mờ (hiệu ứng cinema) — phù hợp
 *                ảnh tư liệu có tỷ lệ đa dạng.
 */
export default function SafeImage({
  src,
  alt,
  themeColor = '#22d3ee',
  className = '',
  fit = 'cover',
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `linear-gradient(135deg, ${themeColor}22, #111a2e 70%)`,
          border: `1px solid ${themeColor}44`,
        }}
      >
        <span className="px-3 text-center font-mono text-[10px] leading-relaxed text-slate-500">
          {alt || 'Tư liệu hình ảnh'}
        </span>
      </div>
    );
  }

  if (fit === 'contain') {
    return (
      <div className={`relative overflow-hidden bg-space-900 ${className}`}>
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl"
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="relative h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
