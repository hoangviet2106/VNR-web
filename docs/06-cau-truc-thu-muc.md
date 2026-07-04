# 06 — Cấu trúc thư mục & quy ước code

## 1. Cấu trúc thư mục dự kiến

```
web-spst/
├── docs/                        # Tài liệu dự án (bộ tài liệu này)
├── public/
│   ├── images/
│   │   ├── 1930/                # Ảnh theo từng era (hero, thumb, sự kiện)
│   │   ├── 1945/
│   │   ├── 1954/
│   │   ├── 1975/
│   │   ├── 1986/
│   │   └── figures/             # Chân dung nhân vật (dùng chung giữa các era)
│   └── favicon.svg          # (âm thanh tổng hợp bằng Web Audio — không cần file mp3)
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Router + providers
│   ├── index.css                # Tailwind directives + CSS toàn cục (glitch, scanline)
│   │
│   ├── pages/                   # Mỗi route một trang
│   │   ├── ConsolePage.jsx
│   │   ├── TravelPage.jsx
│   │   ├── EraPage.jsx
│   │   ├── QuizPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/
│   │   ├── common/              # Dùng chung toàn app
│   │   │   ├── NeonButton.jsx
│   │   │   ├── GlitchText.jsx
│   │   │   ├── Reveal.jsx       # Wrapper scroll-reveal (Framer Motion)
│   │   │   ├── SoundToggle.jsx
│   │   │   └── PageTransition.jsx
│   │   ├── console/
│   │   │   ├── ConsoleFrame.jsx
│   │   │   ├── EraSelector.jsx
│   │   │   ├── EraCard.jsx
│   │   │   └── StartButton.jsx
│   │   ├── travel/
│   │   │   ├── CountdownOverlay.jsx
│   │   │   ├── TimeTunnel.jsx
│   │   │   └── YearScrambler.jsx
│   │   ├── era/
│   │   │   ├── EraHero.jsx
│   │   │   ├── ContextSection.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── FigureCard.jsx
│   │   │   ├── EraTimeline.jsx
│   │   │   ├── YouTubeEmbed.jsx
│   │   │   ├── FunFactSection.jsx
│   │   │   └── QuizCTA.jsx
│   │   └── quiz/
│   │       ├── QuizProgress.jsx
│   │       ├── QuestionRenderer.jsx
│   │       ├── MultipleChoiceQuestion.jsx
│   │       ├── OrderingQuestion.jsx
│   │       ├── GuessFigureQuestion.jsx
│   │       ├── MatchingQuestion.jsx
│   │       ├── AnswerExplanation.jsx
│   │       └── QuizResult.jsx
│   │
│   ├── data/
│   │   ├── eras.json            # Danh mục 5 giai đoạn
│   │   ├── eras/
│   │   │   ├── 1930.json
│   │   │   ├── 1945.json
│   │   │   ├── 1954.json
│   │   │   ├── 1975.json
│   │   │   └── 1986.json
│   │   └── quiz/
│   │       ├── 1930.json
│   │       ├── 1945.json
│   │       ├── 1954.json
│   │       ├── 1975.json
│   │       └── 1986.json
│   │
│   ├── services/
│   │   └── eraService.js        # getEraList / getEra / getQuiz (dynamic import)
│   │
│   ├── hooks/
│   │   ├── useSound.js
│   │   ├── useLocalStorage.js
│   │   ├── useEra.js            # Load + validate era theo URL param
│   │   └── useReducedMotion.js
│   │
│   ├── context/
│   │   ├── AudioContext.jsx
│   │   └── ProgressContext.jsx
│   │
│   └── utils/
│       ├── constants.js         # Route paths, key localStorage, thời lượng animation
│       └── shuffle.js           # Xáo trộn đáp án/cặp matching
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 2. Quy ước đặt tên

| Đối tượng | Quy ước | Ví dụ |
|---|---|---|
| Component file | PascalCase `.jsx` | `EraCard.jsx` |
| Hook | camelCase, prefix `use` | `useSound.js` |
| File JSON dữ liệu | theo năm | `1945.json` |
| Ảnh | kebab-case, prefix theo loại | `hero.webp`, `ev-01.webp`, `ho-chi-minh.webp` |
| ID trong JSON | prefix theo loại | `ev-1945-01`, `fig-hcm`, `q1` |
| Route path | hằng số trong `constants.js` | `ROUTES.era(year)` |
| Git branch | `feature/<tên>`, `fix/<tên>` | `feature/quiz-matching` |
| Commit | tiếng Anh hoặc Việt, dạng mệnh lệnh, ngắn gọn | `feat: add time tunnel effect` |

## 3. Quy ước code

- **Component nội dung không hardcode chữ lịch sử** — mọi nội dung đến từ props/JSON.
- Mỗi component ≤ ~150 dòng; dài hơn thì tách.
- Tailwind class dài → nhóm theo thứ tự: layout → spacing → màu → hiệu ứng; trích xuất pattern lặp thành component (không dùng `@apply` tràn lan).
- Animation config (duration, ease, stagger) đặt trong `constants.js` để chỉnh một chỗ.
- Không dùng `any`-style bừa bãi trong JSDoc; nếu chuyển TypeScript sau này, schema JSON tại [04 — Thiết kế dữ liệu](04-thiet-ke-du-lieu.md) là nguồn định nghĩa type.

## 4. Scripts (package.json dự kiến)

| Script | Lệnh | Mục đích |
|---|---|---|
| `dev` | `vite` | Chạy dev server |
| `build` | `vite build` | Build production vào `dist/` |
| `preview` | `vite preview` | Xem thử bản build |
| `lint` | `eslint src` | Kiểm tra code style |
