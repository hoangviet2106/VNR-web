/**
 * Chữ hiệu ứng glitch: 2 lớp bóng lệch kênh màu nhấp nháy.
 * CSS keyframes định nghĩa trong index.css (.glitch).
 */
export default function GlitchText({ text, className = '' }) {
  return (
    <span className={`glitch relative inline-block ${className}`} data-text={text}>
      {text}
    </span>
  );
}
