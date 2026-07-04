import SafeImage from '../common/SafeImage.jsx';

export default function EventCard({ event, themeColor }) {
  return (
    <article
      className={`overflow-hidden rounded-lg border bg-space-800 transition hover:-translate-y-1 hover:shadow-lg ${
        event.highlight ? 'sm:col-span-2' : ''
      }`}
      style={{ borderColor: event.highlight ? `${themeColor}88` : '#1c2942' }}
    >
      <SafeImage
        src={event.image}
        alt={event.title}
        themeColor={themeColor}
        fit="contain"
        className={`w-full ${event.highlight ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}
      />
      <div className="p-4">
        <span className="font-mono text-xs" style={{ color: themeColor }}>
          {event.date}
        </span>
        <h4 className="mt-1 font-semibold text-slate-100">{event.title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{event.description}</p>
      </div>
    </article>
  );
}
