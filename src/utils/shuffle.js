/** Fisher–Yates shuffle, trả về mảng mới. */
export function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Shuffle nhưng đảm bảo kết quả khác thứ tự ban đầu (nếu có thể). */
export function shuffleAvoidIdentity(arr) {
  if (arr.length < 2) return [...arr];
  for (let attempt = 0; attempt < 10; attempt++) {
    const out = shuffle(arr);
    if (out.some((v, i) => v !== arr[i])) return out;
  }
  return shuffle(arr);
}
