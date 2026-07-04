import { useAudio } from '../../context/AudioContext.jsx';

export default function SoundToggle({ className = '' }) {
  const { soundEnabled, toggleSound, play } = useAudio();

  return (
    <button
      onClick={() => {
        const turningOn = !soundEnabled;
        toggleSound();
        if (turningOn) play('click', { force: true }); // phản hồi ngay khi vừa bật
      }}
      aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
      title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
      className={`rounded border border-space-700 px-3 py-1.5 font-mono text-xs transition hover:border-glow-dim ${
        soundEnabled ? 'text-glow' : 'text-slate-500'
      } ${className}`}
    >
      {soundEnabled ? '🔊 ON' : '🔇 OFF'}
    </button>
  );
}
