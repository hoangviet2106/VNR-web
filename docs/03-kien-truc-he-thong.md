# 03 — Kiến trúc hệ thống

## 1. Tổng quan kiến trúc

Ứng dụng là **SPA (Single Page Application)** thuần Frontend:

```
┌──────────────────────────────────────────────┐
│                  Trình duyệt                  │
│  ┌────────────────────────────────────────┐  │
│  │            React SPA (Vite)             │  │
│  │                                          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌───────┐ │  │
│  │  │  Pages    │  │Components│  │ Hooks │ │  │
│  │  └────┬─────┘  └──────────┘  └───────┘ │  │
│  │       │ React Router                     │  │
│  │  ┌────▼─────────────────────────────┐   │  │
│  │  │   Data layer (import JSON tĩnh)   │   │  │
│  │  │   src/data/eras.json              │   │  │
│  │  │   src/data/eras/1945.json ...     │   │  │
│  │  │   src/data/quiz/1945.json ...     │   │  │
│  │  └──────────────────────────────────┘   │  │
│  └────────────────────────────────────────┘  │
│         │ localStorage (tiến trình, âm thanh) │
└─────────┼────────────────────────────────────┘
          │ static hosting
   ┌──────▼───────┐        ┌──────────────┐
   │ Vercel / GH   │        │   YouTube     │
   │ Pages (HTML,  │        │ (iframe embed)│
   │ JS, CSS, JSON,│        └──────────────┘
   │ images, audio)│
   └──────────────┘
```

**Nguyên tắc cốt lõi:** *Nội dung là dữ liệu* — component chỉ là khuôn render; toàn bộ nội dung lịch sử nằm trong JSON. Thêm giai đoạn mới không cần sửa code.

## 2. Công nghệ và lý do chọn

| Công nghệ | Vai trò | Lý do |
|---|---|---|
| **React 18** | UI framework | Component hóa, hệ sinh thái lớn |
| **Vite** | Build tool + dev server | Nhanh, cấu hình đơn giản, hỗ trợ code-splitting |
| **Tailwind CSS** | Styling | Xây UI sci-fi nhanh, dễ responsive, không viết CSS rời |
| **Framer Motion** | Animation | Khai báo animation phức tạp (tunnel, scroll-reveal, page transition) gọn gàng |
| **React Router v6** | Routing | Điều hướng SPA, URL riêng cho từng giai đoạn |
| **@dnd-kit** (đề xuất) | Kéo thả | Hỗ trợ cảm ứng tốt cho quiz ordering/matching |

## 3. Sơ đồ Routing

| Route | Trang | Ghi chú |
|---|---|---|
| `/` | ConsolePage — bảng điều khiển | Trang chủ |
| `/travel/:year` | TravelPage — hiệu ứng du hành | Tự chuyển sang `/era/:year` khi xong |
| `/era/:year` | EraPage — khám phá giai đoạn | Validate `:year`; sai → chuyển `/` |
| `/era/:year/quiz` | QuizPage — câu hỏi tương tác | |
| `*` | NotFoundPage | Thông báo "lạc dòng thời gian" (theo chủ đề) |

**Luồng điều hướng chuẩn:** `/` → START → `/travel/1945` → (hiệu ứng xong) → `/era/1945` → `/era/1945/quiz` → "Du hành tiếp" → `/travel/1954` → ...

> Ghi chú GitHub Pages: SPA cần fallback cho deep-link. Dùng HashRouter **hoặc** trick 404.html (xem [08 — Triển khai](08-trien-khai.md)). Trên Vercel chỉ cần rewrite về `index.html`.

## 4. Kiến trúc component

```
App
├── AudioProvider (context: bật/tắt âm thanh, play sound effect)
├── ProgressProvider (context: tiến trình đã khám phá — F8)
└── RouterProvider
    ├── ConsolePage
    │   ├── ConsoleFrame (khung máy, đèn, particle nền)
    │   ├── EraSelector
    │   │   └── EraDial / EraCard (x5, từ eras.json)
    │   ├── StartButton
    │   └── SoundToggle
    ├── TravelPage
    │   ├── CountdownOverlay
    │   ├── TimeTunnel (canvas/CSS vệt sáng)
    │   └── YearScrambler (số năm nhảy loạn)
    ├── EraPage
    │   ├── EraHero
    │   ├── ContextSection
    │   ├── EventCardList → EventCard (scroll-reveal)
    │   ├── FigureGrid → FigureCard (flip)
    │   ├── EraTimeline → TimelineItem
    │   ├── VideoSection → YouTubeEmbed (lazy)
    │   ├── FunFactSection
    │   └── QuizCTA
    └── QuizPage
        ├── QuizProgress (câu x/y, điểm)
        ├── QuestionRenderer (switch theo type)
        │   ├── MultipleChoiceQuestion
        │   ├── OrderingQuestion (dnd)
        │   ├── GuessFigureQuestion
        │   └── MatchingQuestion (dnd)
        ├── AnswerExplanation
        └── QuizResult (tổng kết + điều hướng)
```

**Quy tắc:**

- Component nội dung (EraPage trở xuống) **chỉ nhận props từ JSON**, không tự chứa nội dung lịch sử.
- Hiệu ứng dùng chung (scroll-reveal, glow, glitch text) tách thành component/util tái sử dụng: `<Reveal>`, `<GlitchText>`, `<NeonButton>`.

## 5. Quản lý state

Ứng dụng đơn giản, **không cần Redux/Zustand**. Phân tầng:

| Loại state | Nơi lưu | Ví dụ |
|---|---|---|
| State cục bộ UI | `useState` trong component | Mốc đang chọn ở Console, đáp án đang chọn |
| State xuyên trang | React Context | Âm thanh bật/tắt, tiến trình khám phá |
| State bền vững | `localStorage` (sync qua custom hook `useLocalStorage`) | Điểm cao, mốc đã khám phá, cài đặt âm thanh |
| Dữ liệu nội dung | Import JSON tĩnh (qua `import()` động để code-split) | Nội dung era, câu hỏi quiz |

## 6. Data layer

```js
// src/services/eraService.js
export async function getEraList() {
  const { default: list } = await import('../data/eras.json');
  return list.eras;
}

export async function getEra(year) {
  // Vite code-splitting: mỗi era là 1 chunk riêng, chỉ tải khi cần
  const { default: era } = await import(`../data/eras/${year}.json`);
  return era;
}

export async function getQuiz(year) {
  const { default: quiz } = await import(`../data/quiz/${year}.json`);
  return quiz;
}
```

- Component gọi qua **service layer**, không import JSON trực tiếp → sau này muốn chuyển sang fetch API chỉ sửa 1 chỗ.
- `:year` từ URL phải validate với danh sách trong `eras.json` trước khi load.

## 7. Xử lý âm thanh

- Dùng Web Audio / thẻ `<audio>` qua hook `useSound(name)`.
- File âm thanh đặt tại `public/sounds/` (`click.mp3`, `start.mp3`, `travel.mp3`, `correct.mp3`, `wrong.mp3`).
- `AudioProvider` giữ trạng thái muted toàn cục; mọi tiếng đều đi qua provider để tôn trọng cài đặt.
- Chỉ phát âm thanh sau tương tác đầu tiên của người dùng (chính sách autoplay của trình duyệt).

## 8. Hiệu năng

- **Code-splitting theo route** (`React.lazy`) + theo era (dynamic import JSON).
- Ảnh: định dạng WebP, `loading="lazy"`, kích thước hợp lý (hero ≤ 1920px, card ≤ 800px).
- YouTube: dùng facade (hiển thị thumbnail, click mới nạp iframe).
- Animation: ưu tiên `transform`/`opacity` (GPU), tránh animate layout; particle nền giới hạn số lượng.
- `prefers-reduced-motion`: tắt tunnel/shake, thay bằng fade đơn giản.
