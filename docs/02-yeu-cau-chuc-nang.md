# 02 — Yêu cầu chức năng

## 1. Sơ đồ luồng người dùng (User Flow)

```
┌─────────────────┐
│  Bảng điều khiển │  ← Trang chủ (Console)
│  Chọn mốc: 1930  │
│  1945 1954 1975  │
│  1986 → START    │
└────────┬────────┘
         │ nhấn START
         ▼
┌─────────────────┐
│  Hiệu ứng du     │  ← Đếm ngược, đường hầm ánh sáng,
│  hành thời gian  │     rung màn hình, âm thanh (~3-5s)
└────────┬────────┘
         ▼
┌─────────────────┐
│  Trang giai đoạn │  ← Bối cảnh, sự kiện, nhân vật,
│  (Era Page)      │     hình ảnh, video, timeline
└────────┬────────┘
         │ cuộn hết nội dung / nhấn "Thử thách"
         ▼
┌─────────────────┐
│  Quiz tương tác  │  ← 4 dạng câu hỏi + đáp án + giải thích
└────────┬────────┘
         │
    ┌────┴─────┐
    ▼          ▼
 Giai đoạn   Quay về
 kế tiếp     Console
 (kèm hiệu ứng du hành)
```

## 2. Danh sách chức năng

| Mã | Chức năng | Độ ưu tiên |
|---|---|---|
| F1 | Bảng điều khiển cỗ máy thời gian | Cao (MVP) |
| F2 | Hiệu ứng du hành thời gian | Cao (MVP) |
| F3 | Trang khám phá giai đoạn lịch sử | Cao (MVP) |
| F4 | Câu hỏi tương tác (Quiz) | Cao |
| F5 | Điều hướng giữa các mốc thời gian | Cao |
| F6 | Responsive + hiệu ứng cuộn trang | Trung bình |
| F7 | Âm thanh (bật/tắt) | Trung bình |
| F8 | Lưu tiến trình bằng localStorage | Thấp (nice-to-have) |

---

## 3. Đặc tả chi tiết

### F1 — Bảng điều khiển cỗ máy thời gian (Console)

**Mô tả:** Trang chủ được thiết kế như bảng điều khiển của một cỗ máy thời gian hiện đại.

**Yêu cầu:**

- Hiển thị 5 mốc thời gian có thể chọn: **1930, 1945, 1954, 1975, 1986** (đọc từ `eras.json`, không hardcode).
- Mỗi mốc hiển thị: năm, tên giai đoạn ngắn gọn, trạng thái (đã khám phá / chưa — nếu có F8).
- Chọn mốc bằng cách click; mốc đang chọn được highlight (hiệu ứng phát sáng neon).
- Nút **START** lớn, chỉ kích hoạt khi đã chọn mốc; nhấn START chuyển sang F2.
- Trang có các chi tiết trang trí sci-fi: đồng hồ năng lượng, đèn nhấp nháy, hiệu ứng particle nền, chữ kiểu HUD.
- Có nút bật/tắt âm thanh (F7) ở góc màn hình.

**Tiêu chí nghiệm thu:**

- [ ] Không chọn mốc → START bị disable (mờ, không click được).
- [ ] Chọn mốc → highlight rõ ràng, START sáng lên.
- [ ] Nhấn START → chuyển sang màn hình du hành với mốc đúng.

### F2 — Hiệu ứng du hành thời gian (Travel)

**Mô tả:** Màn hình chuyển cảnh mô phỏng quá trình du hành, kéo dài ~3–5 giây.

**Trình tự hiệu ứng:**

1. **Đếm ngược** 3 → 2 → 1 (font lớn, hiệu ứng glitch).
2. **Đường hầm ánh sáng** (tunnel): các vệt sáng lao về phía người xem (CSS/Canvas/Framer Motion).
3. **Rung màn hình** (screen shake) nhẹ ở cao trào.
4. **Số năm nhảy loạn** rồi dừng lại ở năm đích (vd: 1887 → 2041 → ... → 1945).
5. **Âm thanh khởi động** (nếu âm thanh đang bật).
6. **Flash trắng** rồi fade vào trang giai đoạn.

**Yêu cầu kỹ thuật:**

- Dùng chung cho mọi lần chuyển giữa các mốc (F5), tham số hóa theo năm đích.
- Có thể **bỏ qua** (nút Skip) sau 1 giây, phục vụ người dùng quay lại nhiều lần.
- Không chặn thread chính; giữ 60fps trên máy phổ thông.

**Tiêu chí nghiệm thu:**

- [ ] Hiệu ứng chạy đủ trình tự, kết thúc đúng ở trang giai đoạn đã chọn.
- [ ] Nút Skip hoạt động.
- [ ] Tắt âm thanh → không phát tiếng.

### F3 — Trang khám phá giai đoạn lịch sử (Era Page)

**Mô tả:** Trang nội dung chính của mỗi mốc thời gian, dữ liệu đọc từ `eras/<năm>.json`.

**Các khối nội dung (theo thứ tự):**

| Khối | Nội dung | Trình bày |
|---|---|---|
| Hero | Năm + tên giai đoạn + câu dẫn | Full-screen, chữ lớn, nền ảnh/gradient theo chủ đề |
| Bối cảnh | Đoạn giới thiệu bối cảnh lịch sử | Văn bản + ảnh minh họa |
| Sự kiện nổi bật | Danh sách sự kiện chính | Thẻ (Card) xuất hiện lần lượt khi cuộn (scroll-reveal) |
| Nhân vật tiêu biểu | Chân dung + tiểu sử ngắn | Card lật (flip) hoặc hover mở rộng |
| Timeline | Mốc thời gian liên quan trong giai đoạn | Dòng thời gian dọc/ngang có animation |
| Video tư liệu | 1–3 video | Nhúng YouTube (iframe, lazy-load) |
| Kiến thức mở rộng | Fact thú vị, "Bạn có biết?" | Accordion hoặc card nhỏ |
| CTA | Nút "Thử thách kiến thức" → Quiz | Nút nổi bật cuối trang |

**Tiêu chí nghiệm thu:**

- [ ] Toàn bộ nội dung render từ JSON, đổi JSON là đổi nội dung, không sửa code.
- [ ] Card có hiệu ứng xuất hiện khi cuộn tới.
- [ ] Video không tự phát, lazy-load để không chậm trang.
- [ ] URL dạng `/era/1945` — vào trực tiếp bằng link vẫn hoạt động.

### F4 — Câu hỏi tương tác (Quiz)

**Mô tả:** Sau khi tìm hiểu, người dùng làm bộ 5–10 câu hỏi. Dữ liệu từ `quiz/<năm>.json`.

**4 dạng câu hỏi:**

| Dạng | Mã | Cách chơi | Cách chấm |
|---|---|---|---|
| Trắc nghiệm | `multiple-choice` | Chọn 1 trong 4 đáp án | Đúng/sai ngay khi chọn |
| Sắp xếp sự kiện | `ordering` | Kéo thả các sự kiện theo trình tự thời gian | So thứ tự với đáp án |
| Đoán nhân vật | `guess-figure` | Xem ảnh (có thể làm mờ dần) → chọn tên | Đúng/sai ngay khi chọn |
| Ghép sự kiện–năm | `matching` | Nối sự kiện bên trái với năm bên phải | Đủ cặp đúng mới tính điểm câu |

**Yêu cầu:**

- Hiển thị **đáp án đúng + giải thích** ngay sau khi trả lời từng câu.
- Kết thúc: màn hình tổng kết điểm (vd: 8/10) + đánh giá vui theo điểm.
- Có nút "Làm lại" và nút điều hướng sang F5.
- Kéo thả phải hoạt động cả trên **cảm ứng** (mobile).

**Tiêu chí nghiệm thu:**

- [ ] Cả 4 dạng câu hỏi hoạt động đúng luật chấm.
- [ ] Giải thích hiển thị sau mỗi câu.
- [ ] Kéo thả dùng được trên điện thoại.

### F5 — Điều hướng giữa các mốc thời gian

**Yêu cầu:**

- Cuối mỗi Era Page / màn tổng kết Quiz có 2 lựa chọn:
  - **"Du hành tiếp"** → mốc kế tiếp theo thứ tự thời gian (1930 → 1945 → ... → 1986; mốc cuối quay vòng hoặc về Console).
  - **"Về bảng điều khiển"** → trang chủ.
- Mọi chuyển đổi giữa các mốc **đều đi kèm hiệu ứng du hành** (F2) để tạo cảm giác liền mạch.
- Có breadcrumb/indicator nhỏ cho biết đang ở mốc nào.

### F6 — Responsive & hiệu ứng cuộn

- Breakpoints Tailwind chuẩn: mobile (< 640px), tablet (640–1024px), desktop (> 1024px).
- Console trên mobile: các mốc xếp dọc, START cố định đáy màn hình.
- Scroll-reveal dùng Framer Motion `whileInView`; tôn trọng `prefers-reduced-motion` (giảm/tắt hiệu ứng).

### F7 — Âm thanh

- Nhạc nền ambient nhẹ (tùy chọn) + hiệu ứng âm thanh: click, START, du hành, đúng/sai quiz.
- Nút bật/tắt tổng, trạng thái lưu vào `localStorage`.
- **Mặc định tắt** (trình duyệt chặn autoplay; tránh làm phiền).

### F8 — Lưu tiến trình (localStorage)

- Lưu: các mốc đã khám phá, điểm quiz cao nhất mỗi mốc, trạng thái âm thanh.
- Console hiển thị badge "Đã khám phá" trên mốc tương ứng.
- Không bắt buộc cho MVP.

## 4. Yêu cầu phi chức năng

| Loại | Yêu cầu |
|---|---|
| Hiệu năng | First load < 3s trên mạng 4G; animation 60fps; ảnh nén (WebP), lazy-load |
| Tương thích | Chrome, Edge, Firefox, Safari (2 phiên bản gần nhất) |
| Khả năng truy cập | Tương phản màu đạt WCAG AA cho văn bản nội dung; hỗ trợ `prefers-reduced-motion` |
| SEO cơ bản | Title/description theo từng trang; Open Graph cho chia sẻ |
| Bảo trì | Thêm 1 giai đoạn mới = thêm 2 file JSON + ảnh, không sửa component |
