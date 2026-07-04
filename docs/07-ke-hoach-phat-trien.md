# 07 — Kế hoạch phát triển

## 1. Chiến lược

Phát triển theo **chiều dọc trước** (vertical slice): hoàn thiện trọn luồng cho **1 giai đoạn (1945)** — Console → Travel → Era → Quiz — rồi mới nhân bản dữ liệu cho 4 giai đoạn còn lại. Cách này giúp phát hiện sớm vấn đề về schema JSON và UX trước khi soạn nhiều nội dung.

## 2. Các giai đoạn (Phase)

### Phase 0 — Khởi tạo dự án

**Mục tiêu:** dựng khung chạy được.

- [ ] Khởi tạo Vite + React, cài Tailwind CSS, Framer Motion, React Router.
- [ ] Cấu hình `tailwind.config.js`: bảng màu space/cyan, font Orbitron + Be Vietnam Pro.
- [ ] Dựng routing 5 route + trang placeholder.
- [ ] Setup ESLint, `.gitignore`, đẩy lên GitHub.
- [ ] Deploy "Hello Time Machine" lên Vercel ngay từ đầu (deploy sớm, deploy thường xuyên).

**Hoàn thành khi:** mở URL Vercel thấy trang chạy, điều hướng giữa các route được.

### Phase 1 — Dữ liệu & khung nội dung (era 1945)

- [ ] Viết `eras.json` đủ 5 mốc (chỉ metadata).
- [ ] Soạn **nội dung đầy đủ cho 1945**: `eras/1945.json` + `quiz/1945.json` (theo schema docs 04).
- [ ] Sưu tầm + nén ảnh cho 1945; chọn video YouTube.
- [ ] Viết `eraService.js`, hook `useEra`, validate year từ URL.
- [ ] EraPage render đủ các section từ JSON (chưa cần đẹp).

**Hoàn thành khi:** `/era/1945` hiển thị đúng toàn bộ nội dung từ JSON.

### Phase 2 — Console & hiệu ứng du hành

- [ ] ConsolePage: EraSelector, EraCard, StartButton, màn hình LED điểm đến.
- [ ] Trang trí sci-fi: particle nền, scanline, đèn nháy, energy bar.
- [ ] TravelPage: đếm ngược → tunnel → year scrambler → shake → flash → chuyển trang.
- [ ] Nút Skip; hỗ trợ `prefers-reduced-motion`.
- [ ] Âm thanh cơ bản: click, start, travel + SoundToggle + AudioContext.

**Hoàn thành khi:** luồng `/` → START → travel → `/era/1945` mượt, có/không âm thanh đều ổn.

### Phase 3 — Hoàn thiện Era Page

- [ ] Hero full-screen + typing effect + màu theme theo era.
- [ ] Scroll-reveal cho EventCard, FigureCard (flip), Timeline animate.
- [ ] YouTube facade (thumbnail → click mới nạp iframe).
- [ ] FunFact accordion, phần nguồn tham khảo, QuizCTA.
- [ ] Responsive 3 breakpoint.

### Phase 4 — Quiz tương tác

- [ ] QuestionRenderer + 2 dạng dễ trước: `multiple-choice`, `guess-figure`.
- [ ] 2 dạng kéo thả: `ordering`, `matching` (@dnd-kit, hỗ trợ cảm ứng).
- [ ] AnswerExplanation, chấm điểm, QuizResult (đếm số, đánh giá, điều hướng).
- [ ] Âm thanh đúng/sai; khóa đáp án sau khi trả lời.

### Phase 5 — Nội dung 4 giai đoạn còn lại

- [ ] Soạn JSON + ảnh + quiz cho 1930, 1954, 1975, 1986 (chia nhau theo thành viên nếu làm nhóm).
- [ ] Rà soát tính chính xác lịch sử, chính tả, nguồn.
- [ ] Nút "Du hành tiếp" nối đủ vòng 5 giai đoạn.

### Phase 6 — Đánh bóng & phát hành

- [ ] ProgressContext + localStorage: badge "Đã khám phá", điểm cao nhất.
- [ ] NotFoundPage theme "lạc dòng thời gian".
- [ ] SEO: title/meta từng trang, Open Graph, favicon.
- [ ] Tối ưu: Lighthouse ≥ 90 Performance, kiểm tra bundle, nén ảnh còn sót.
- [ ] Test chéo trình duyệt + điện thoại thật; sửa lỗi.
- [ ] Deploy bản chính thức, viết hướng dẫn demo/thuyết trình.

## 3. Ước lượng thời gian

Giả định 1–2 người làm ngoài giờ học (~10–15h/tuần):

| Phase | Thời lượng | Cộng dồn |
|---|---|---|
| 0 — Khởi tạo | 0.5 tuần | 0.5 |
| 1 — Dữ liệu + khung 1945 | 1 tuần | 1.5 |
| 2 — Console + Travel | 1.5 tuần | 3 |
| 3 — Era Page hoàn thiện | 1 tuần | 4 |
| 4 — Quiz | 1.5 tuần | 5.5 |
| 5 — Nội dung 4 era | 1.5 tuần (song song được với 3–4) | 6.5 |
| 6 — Đánh bóng | 1 tuần | **~7.5 tuần** |

> Nếu gấp (demo trong ~3 tuần): làm Phase 0–4 với riêng era 1945 + cắt F7/F8 → vẫn có sản phẩm trình diễn trọn vẹn 1 hành trình.

## 4. Phân công gợi ý (nếu làm nhóm 2–3 người)

| Vai trò | Phụ trách |
|---|---|
| Dev A (lead FE) | Kiến trúc, Console, Travel, hiệu ứng |
| Dev B | Era Page, Quiz, responsive |
| Content | Soạn JSON 5 giai đoạn, sưu tầm ảnh/video, kiểm chứng lịch sử |

Làm một mình: đi tuần tự Phase 0 → 6, soạn nội dung xen kẽ lúc "mỏi tay code".

## 5. Rủi ro & phương án

| Rủi ro | Ảnh hưởng | Phương án |
|---|---|---|
| Hiệu ứng tunnel/particle giật lag máy yếu | Trải nghiệm kém | Giới hạn particle, dùng transform/opacity, đo bằng DevTools Performance sớm (Phase 2) |
| Nội dung lịch sử sai | Mất điểm nghiêm trọng khi chấm | Đối chiếu Giáo trình Lịch sử Đảng CSVN (2021), ghi `sources` kèm số trang, nhờ người khác rà soát |
| Ảnh tư liệu vướng bản quyền | Không dám demo công khai | Ưu tiên ảnh public domain / Wikimedia Commons, ghi nguồn |
| Kéo thả lỗi trên mobile | Quiz hỏng 2/4 dạng | Dùng @dnd-kit (hỗ trợ touch), test điện thoại thật sớm ở Phase 4 |
| Deep-link hỏng trên GitHub Pages | Link chia sẻ 404 | Ưu tiên Vercel; nếu buộc GH Pages → HashRouter (docs 08) |
| Ôm đồm hiệu ứng, trễ tiến độ | Không kịp demo | Bám thứ tự phase; hiệu ứng "nice-to-have" để Phase 6 |

## 6. Definition of Done (mỗi tính năng)

1. Chạy đúng theo tiêu chí nghiệm thu trong [02 — Yêu cầu chức năng](02-yeu-cau-chuc-nang.md).
2. Responsive 3 breakpoint, test trên Chrome + 1 trình duyệt khác.
3. Không lỗi console, không warning React.
4. Nội dung từ JSON (không hardcode), hỗ trợ reduced-motion nếu có animation.
5. Đã deploy lên Vercel và bấm thử trên bản deploy.
