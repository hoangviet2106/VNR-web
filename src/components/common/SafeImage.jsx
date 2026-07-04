import { useState } from 'react';

/**
 * Ảnh có fallback: khi thiếu file (dự án chưa có ảnh thật) hiển thị
 * ô placeholder gradient theo màu chủ đề thay vì icon ảnh vỡ.
 */
export default function SafeImage({ src, alt, themeColor = '#22d3ee', className = '' }) {
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
