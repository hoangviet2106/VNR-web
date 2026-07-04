import { createContext, useContext, useRef, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { playSfx } from '../utils/sfx.js';
import { STORAGE_KEY } from '../utils/constants.js';

const Ctx = createContext(null);

export function AudioProvider({ children }) {
  // Mặc định tắt tiếng (chính sách autoplay + tránh làm phiền)
  const [soundEnabled, setSoundEnabled] = useLocalStorage(`${STORAGE_KEY}:sound`, false);
  const audioCtxRef = useRef(null);

  const play = useCallback(
    (name, { force = false } = {}) => {
      if (!soundEnabled && !force) return;
      try {
        // Chỉ tạo AudioContext sau tương tác đầu tiên (mọi lời gọi play đều từ event)
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
        playSfx(audioCtxRef.current, name);
      } catch {
        /* trình duyệt không hỗ trợ — bỏ qua */
      }
    },
    [soundEnabled]
  );

  const toggleSound = useCallback(() => setSoundEnabled((v) => !v), [setSoundEnabled]);

  const value = useMemo(
    () => ({ soundEnabled, toggleSound, play }),
    [soundEnabled, toggleSound, play]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAudio phải dùng bên trong <AudioProvider>');
  return ctx;
}
