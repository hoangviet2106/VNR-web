import erasIndex from '../data/eras.json';

const eras = [...erasIndex.eras].sort((a, b) => a.order - b.order);

export function getEraList() {
  return eras;
}

export function getEraMeta(year) {
  return eras.find((e) => String(e.year) === String(year)) ?? null;
}

export function isValidYear(year) {
  return getEraMeta(year) !== null;
}

/** Era kế tiếp theo thứ tự du hành; era cuối quay vòng về era đầu. */
export function getNextEra(year) {
  const idx = eras.findIndex((e) => String(e.year) === String(year));
  if (idx === -1) return null;
  return eras[(idx + 1) % eras.length];
}

/** Nội dung chi tiết của một giai đoạn — tách chunk riêng, chỉ tải khi cần. */
export async function getEra(year) {
  const { default: era } = await import(`../data/eras/${year}.json`);
  return era;
}

/** Bộ câu hỏi của một giai đoạn. */
export async function getQuiz(year) {
  const { default: quiz } = await import(`../data/quiz/${year}.json`);
  return quiz;
}
