# 04 — Thiết kế dữ liệu (JSON Schema)

Toàn bộ nội dung lịch sử lưu trong `src/data/`. Quy tắc chung:

- Tên file theo năm: `1930.json`, `1945.json`, ...
- Encoding UTF-8, nội dung tiếng Việt có dấu.
- Đường dẫn ảnh là đường dẫn tương đối từ `public/` (vd: `/images/1945/hero.webp`).
- **Thêm một giai đoạn mới = thêm 1 entry vào `eras.json` + 2 file JSON + thư mục ảnh.**

## 1. Danh mục giai đoạn — `src/data/eras.json`

File "mục lục" cho Console và điều hướng.

```json
{
  "eras": [
    {
      "year": 1930,
      "slug": "1930",
      "title": "Thành lập Đảng Cộng sản Việt Nam",
      "subtitle": "Bước ngoặt của cách mạng Việt Nam",
      "themeColor": "#e63946",
      "thumbnail": "/images/1930/thumb.webp",
      "order": 1
    },
    {
      "year": 1945,
      "slug": "1945",
      "title": "Cách mạng Tháng Tám & Quốc khánh",
      "subtitle": "Nước Việt Nam Dân chủ Cộng hòa ra đời",
      "themeColor": "#f4a261",
      "thumbnail": "/images/1945/thumb.webp",
      "order": 2
    }
    // ... 1954, 1975, 1986
  ]
}
```

| Trường | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `year` | number | ✔ | Năm mốc lịch sử, dùng làm khóa chính |
| `slug` | string | ✔ | Dùng trong URL `/era/:slug` |
| `title` | string | ✔ | Tên giai đoạn hiển thị trên Console |
| `subtitle` | string | ✔ | Câu mô tả ngắn |
| `themeColor` | string (hex) | ✔ | Màu chủ đạo của giai đoạn (accent trên nền sci-fi) |
| `thumbnail` | string | ✔ | Ảnh nhỏ trên Console |
| `order` | number | ✔ | Thứ tự du hành (dùng cho nút "Du hành tiếp") |

## 2. Nội dung giai đoạn — `src/data/eras/<năm>.json`

```json
{
  "year": 1945,
  "title": "Cách mạng Tháng Tám & Quốc khánh 2/9",
  "heroImage": "/images/1945/hero.webp",
  "intro": "Câu dẫn ngắn xuất hiện trên màn hình hero...",

  "context": {
    "heading": "Bối cảnh lịch sử",
    "paragraphs": [
      "Đoạn văn 1 mô tả bối cảnh...",
      "Đoạn văn 2..."
    ],
    "image": "/images/1945/context.webp",
    "imageCaption": "Chú thích ảnh"
  },

  "events": [
    {
      "id": "ev-1945-01",
      "date": "13/08/1945",
      "title": "Hội nghị toàn quốc của Đảng",
      "description": "Mô tả ngắn gọn sự kiện...",
      "image": "/images/1945/ev-01.webp",
      "highlight": true
    }
  ],

  "figures": [
    {
      "id": "fig-hcm",
      "name": "Hồ Chí Minh",
      "role": "Chủ tịch Chính phủ lâm thời",
      "portrait": "/images/figures/ho-chi-minh.webp",
      "bio": "Tiểu sử ngắn 2-3 câu...",
      "quote": "Câu nói nổi tiếng (tùy chọn)"
    }
  ],

  "timeline": [
    { "date": "09/03/1945", "label": "Nhật đảo chính Pháp" },
    { "date": "19/08/1945", "label": "Tổng khởi nghĩa thắng lợi ở Hà Nội" },
    { "date": "02/09/1945", "label": "Tuyên ngôn Độc lập" }
  ],

  "videos": [
    {
      "youtubeId": "dQw4w9WgXcQ",
      "title": "Phim tư liệu: Cách mạng Tháng Tám",
      "duration": "10:24"
    }
  ],

  "funFacts": [
    {
      "question": "Bạn có biết?",
      "answer": "Nội dung kiến thức mở rộng thú vị..."
    }
  ],

  "sources": [
    "Sách giáo khoa Lịch sử 12, NXB Giáo dục",
    "https://vi.wikipedia.org/wiki/..."
  ]
}
```

| Trường | Ghi chú |
|---|---|
| `events[].highlight` | `true` → card to hơn / nổi bật hơn |
| `figures[].quote` | Tùy chọn; hiển thị ở mặt sau card lật |
| `videos[].youtubeId` | Chỉ lưu ID, component tự dựng URL embed |
| `sources` | Nguồn tham khảo — hiển thị cuối trang, tăng độ tin cậy |

## 3. Bộ câu hỏi — `src/data/quiz/<năm>.json`

```json
{
  "year": 1945,
  "passScore": 70,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Bác Hồ đọc Tuyên ngôn Độc lập vào ngày nào?",
      "options": ["19/08/1945", "02/09/1945", "23/09/1945", "06/01/1946"],
      "correctIndex": 1,
      "explanation": "Ngày 02/09/1945, tại Quảng trường Ba Đình..."
    },
    {
      "id": "q2",
      "type": "ordering",
      "question": "Sắp xếp các sự kiện theo trình tự thời gian:",
      "items": [
        { "id": "a", "label": "Nhật đảo chính Pháp" },
        { "id": "b", "label": "Tổng khởi nghĩa ở Hà Nội" },
        { "id": "c", "label": "Tuyên ngôn Độc lập" }
      ],
      "correctOrder": ["a", "b", "c"],
      "explanation": "Trình tự đúng: 09/03 → 19/08 → 02/09/1945."
    },
    {
      "id": "q3",
      "type": "guess-figure",
      "question": "Nhân vật trong ảnh là ai?",
      "image": "/images/figures/vo-nguyen-giap.webp",
      "options": ["Võ Nguyên Giáp", "Phạm Văn Đồng", "Trường Chinh", "Tôn Đức Thắng"],
      "correctIndex": 0,
      "explanation": "Đại tướng Võ Nguyên Giáp..."
    },
    {
      "id": "q4",
      "type": "matching",
      "question": "Ghép sự kiện với mốc thời gian tương ứng:",
      "pairs": [
        { "left": "Thành lập Đảng", "right": "1930" },
        { "left": "Tuyên ngôn Độc lập", "right": "1945" },
        { "left": "Chiến thắng Điện Biên Phủ", "right": "1954" }
      ],
      "explanation": "Giải thích thêm nếu cần."
    }
  ]
}
```

### Quy tắc theo từng `type`

| `type` | Trường riêng | Luật chấm |
|---|---|---|
| `multiple-choice` | `options[]`, `correctIndex` | Chọn đúng index → 1 điểm |
| `ordering` | `items[]` (có `id`), `correctOrder[]` | Thứ tự khớp hoàn toàn → 1 điểm |
| `guess-figure` | `image`, `options[]`, `correctIndex` | Như trắc nghiệm |
| `matching` | `pairs[]` (left/right) | Đúng **tất cả** cặp → 1 điểm (UI xáo trộn cột phải khi render) |

Trường chung bắt buộc: `id`, `type`, `question`, `explanation`.

## 4. Dữ liệu localStorage (F8)

Key: `time-machine:v1`

```json
{
  "soundEnabled": false,
  "visited": [1930, 1945],
  "bestScores": { "1945": 8 }
}
```

- Có prefix version (`v1`) để đổi cấu trúc sau này không vỡ dữ liệu cũ.
- Đọc/ghi qua hook `useLocalStorage`, có try/catch (chế độ ẩn danh có thể chặn).

## 5. Checklist chất lượng nội dung

- [ ] Thông tin lịch sử chính xác, đối chiếu SGK/nguồn chính thống, ghi `sources`.
- [ ] Mỗi era: ≥ 4 sự kiện, ≥ 2 nhân vật, ≥ 5 mốc timeline, ≥ 1 video, ≥ 2 fun fact.
- [ ] Mỗi quiz: 5–10 câu, đủ cả 4 dạng, câu nào cũng có `explanation`.
- [ ] Ảnh có bản quyền phù hợp (tư liệu công cộng / ghi nguồn), đã nén WebP.
- [ ] Không lỗi chính tả; giọng văn nhất quán, dễ hiểu với học sinh.
