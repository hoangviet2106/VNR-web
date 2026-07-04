/**
 * Tổng hợp hiệu ứng âm thanh bằng Web Audio API — không cần file mp3.
 * Mỗi hàm nhận AudioContext và phát một âm ngắn.
 */

function tone(ctx, { freq, to = freq, duration, type = 'sine', gain = 0.15, when = 0 }) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  const t0 = ctx.currentTime + when;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, t0 + duration);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

const SFX = {
  /** Click chọn mốc: blip ngắn */
  click(ctx) {
    tone(ctx, { freq: 880, to: 1320, duration: 0.08, type: 'square', gain: 0.06 });
  },

  /** Nhấn START: quét tần số đi lên như khởi động máy */
  start(ctx) {
    tone(ctx, { freq: 220, to: 880, duration: 0.5, type: 'sawtooth', gain: 0.1 });
    tone(ctx, { freq: 440, to: 1760, duration: 0.5, type: 'sine', gain: 0.08, when: 0.1 });
  },

  /** Du hành: tiếng vút dài */
  travel(ctx) {
    tone(ctx, { freq: 110, to: 1600, duration: 2.0, type: 'sawtooth', gain: 0.07 });
    tone(ctx, { freq: 55, to: 800, duration: 2.0, type: 'triangle', gain: 0.09 });
  },

  /** Đếm ngược: bíp */
  beep(ctx) {
    tone(ctx, { freq: 660, duration: 0.15, type: 'square', gain: 0.08 });
  },

  /** Trả lời đúng: hợp âm trưởng đi lên */
  correct(ctx) {
    tone(ctx, { freq: 523, duration: 0.15, gain: 0.1 });
    tone(ctx, { freq: 659, duration: 0.15, gain: 0.1, when: 0.1 });
    tone(ctx, { freq: 784, duration: 0.3, gain: 0.1, when: 0.2 });
  },

  /** Trả lời sai: buzz trầm */
  wrong(ctx) {
    tone(ctx, { freq: 180, to: 120, duration: 0.35, type: 'sawtooth', gain: 0.1 });
  },
};

export function playSfx(ctx, name) {
  const fn = SFX[name];
  if (fn && ctx) fn(ctx);
}
