/** Tiêu đề section thống nhất trong Era Page. */
export default function SectionHeading({ children, themeColor }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 font-display text-lg tracking-widest text-slate-100 md:text-xl">
      <span className="inline-block h-px w-8" style={{ backgroundColor: themeColor }} />
      <span style={{ color: themeColor }}>{children}</span>
      <span className="inline-block h-px flex-1 bg-space-700" />
    </h3>
  );
}
