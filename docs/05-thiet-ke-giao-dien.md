# 05 — Thiết kế giao diện (UI/UX Design System)

## 1. Định hướng thẩm mỹ

**Chủ đề:** Sci-Fi / Retro-futuristic — bảng điều khiển phi thuyền pha nét hoài niệm phù hợp nội dung lịch sử.

**Từ khóa cảm xúc:** bí ẩn, công nghệ, phiêu lưu, trang nghiêm (khi vào nội dung lịch sử).

**Nguyên tắc chuyển tông:** Console và Travel đậm chất sci-fi (neon, HUD, particle); vào Era Page thì **giảm sci-fi, tăng trang trọng** — nền tối giữ nguyên nhưng nội dung lịch sử trình bày sạch, dễ đọc, ảnh tư liệu là trung tâm. Hiệu ứng phục vụ nội dung, không lấn át.

## 2. Bảng màu

### Màu nền tảng (dùng toàn site)

| Tên | Hex | Vai trò |
|---|---|---|
| `space-950` | `#050810` | Nền chính (đen xanh vũ trụ) |
| `space-900` | `#0a1120` | Nền section xen kẽ |
| `space-800` | `#111a2e` | Nền card |
| `space-700` | `#1c2942` | Viền, divider |
| `cyan-glow` | `#22d3ee` | Màu neon chính (nút, viền phát sáng, HUD) |
| `cyan-dim` | `#0e7490` | Neon phụ, trạng thái inactive |
| `amber-energy` | `#fbbf24` | Điểm nhấn năng lượng (đồng hồ, cảnh báo) |
| `text-primary` | `#e2e8f0` | Chữ chính |
| `text-muted` | `#94a3b8` | Chữ phụ |
| `success` | `#4ade80` | Đáp án đúng |
| `danger` | `#f87171` | Đáp án sai |

### Màu chủ đề theo giai đoạn (`themeColor` trong `eras.json`)

Mỗi era có 1 màu accent riêng phủ lên hero, viền card, timeline của trang đó:

| Era | Màu gợi ý | Ý nghĩa |
|---|---|---|
| 1930 | `#e63946` (đỏ cờ) | Ngọn lửa cách mạng |
| 1945 | `#f4a261` (vàng cam) | Bình minh độc lập |
| 1954 | `#2a9d8f` (xanh lục lam) | Chiến thắng, hòa bình lập lại |
| 1975 | `#e76f51` (cam đỏ) | Thống nhất non sông |
| 1986 | `#4895ef` (xanh dương) | Đổi mới, mở cửa |

> Kiểm tra tương phản: chữ nội dung trên nền tối phải đạt WCAG AA (≥ 4.5:1). Màu accent chỉ dùng cho trang trí/heading lớn, không dùng cho đoạn văn.

## 3. Typography

| Vai trò | Font | Ghi chú |
|---|---|---|
| Display / số năm / HUD | **Orbitron** hoặc **Space Grotesk** (Google Fonts) | Chất sci-fi, chỉ dùng cho heading + số |
| Nội dung | **Be Vietnam Pro** | Hỗ trợ tiếng Việt tốt, dễ đọc |
| Mono (tọa độ, hiệu ứng gõ chữ) | **JetBrains Mono** / `font-mono` | Chi tiết HUD |

Thang cỡ chữ (Tailwind): `text-sm` (14) phụ chú → `text-base` (16) nội dung → `text-xl/2xl` heading card → `text-4xl–7xl` hero/số năm. Line-height nội dung ≥ 1.7 để dễ đọc đoạn dài.

## 4. Hiệu ứng đặc trưng (Signature effects)

| Hiệu ứng | Nơi dùng | Kỹ thuật |
|---|---|---|
| **Neon glow** | Nút START, mốc được chọn, viền card hover | `box-shadow` nhiều lớp + màu cyan/accent |
| **Particle nền** | Console, Travel | Canvas hoặc các dot CSS animate; ≤ 60 hạt |
| **Glitch text** | Số năm khi đếm ngược, tiêu đề NotFound | CSS `clip-path` + text-shadow lệch kênh màu |
| **Scanline / grid HUD** | Nền Console | Overlay gradient mảnh, opacity thấp |
| **Time tunnel** | TravelPage | Các vệt sáng phóng từ tâm ra (scale + opacity), hoặc canvas |
| **Screen shake** | Cao trào du hành | Framer Motion animate `x/y` biên độ nhỏ |
| **Scroll reveal** | Card sự kiện, nhân vật, timeline | Framer Motion `whileInView`, stagger 80–120ms |
| **Card flip** | Nhân vật | `rotateY` 180°, mặt sau là tiểu sử |
| **Typing effect** | Câu intro của era | Hiện chữ dần, con trỏ nhấp nháy |

**Quy tắc:** thời lượng micro-animation 150–300ms; transition trang 400–600ms; hiệu ứng du hành tổng ~3–5s (có Skip). Tôn trọng `prefers-reduced-motion`: thay tunnel/shake/glitch bằng fade.

## 5. Wireframe từng trang

### 5.1 Console (Trang chủ)

```
┌──────────────────────────────────────────────┐
│  ⚙ TIME MACHINE v1.0        🔊 [Sound On/Off] │ ← thanh HUD trên
│                                                │
│        CỖ MÁY THỜI GIAN                        │ ← logo glitch
│   "Chọn điểm đến trong dòng thời gian"          │
│                                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ 1930 │ │ 1945 │ │ 1954 │ │ 1975 │ │ 1986 │ │ ← era card, cái
│  │ .... │ │ .... │ │ .... │ │ .... │ │ .... │ │   được chọn glow
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │
│                                                │
│   ĐIỂM ĐẾN: 1945 — Cách mạng Tháng Tám         │ ← màn hình LED
│                                                │
│              ╭─────────────╮                   │
│              │  ▶  START    │                   │ ← nút to, glow,
│              ╰─────────────╯                   │   disable khi chưa chọn
│  ▁▂▃▅▆ energy bar ▆▅▃▂▁   ● ● ● (đèn nháy)     │ ← trang trí
└──────────────────────────────────────────────┘
Mobile: era card xếp dọc (scroll), START sticky đáy màn hình.
```

### 5.2 Travel (Du hành)

```
Toàn màn hình đen → đếm ngược 3-2-1 (glitch, mỗi số ~0.7s)
→ tunnel vệt sáng + số năm nhảy loạn ở giữa (font mono lớn)
→ shake nhẹ → flash trắng → fade vào Era Page.
Góc dưới phải: [Bỏ qua ▸▸] (hiện sau 1s)
```

### 5.3 Era Page

```
┌──────────────────────────────────────────────┐
│ [◂ Console]                    ● 1945 ● 2/5   │ ← thanh điều hướng mảnh
│                                                │
│                 1 9 4 5                        │ ← HERO full màn hình
│        CÁCH MẠNG THÁNG TÁM                     │   nền ảnh + overlay tối
│      "câu dẫn typing effect..."   ⌄ cuộn xuống │   accent = themeColor
├──────────────────────────────────────────────┤
│  BỐI CẢNH LỊCH SỬ                              │
│  [đoạn văn................] [ảnh minh họa]     │
├──────────────────────────────────────────────┤
│  SỰ KIỆN NỔI BẬT                               │
│  ┌────────┐ ┌────────┐ ┌────────┐             │ ← card reveal lần lượt
│  │ 13/08  │ │ 19/08  │ │ 02/09  │             │
│  └────────┘ └────────┘ └────────┘             │
├──────────────────────────────────────────────┤
│  NHÂN VẬT TIÊU BIỂU                            │
│  (chân dung tròn/card lật)  ○  ○  ○           │
├──────────────────────────────────────────────┤
│  DÒNG THỜI GIAN   ●───●───●───●───●           │ ← timeline animate
├──────────────────────────────────────────────┤
│  VIDEO TƯ LIỆU  [thumbnail ▶ (facade)]        │
├──────────────────────────────────────────────┤
│  BẠN CÓ BIẾT?  (accordion fun facts)           │
├──────────────────────────────────────────────┤
│        ╭──────────────────────────╮            │
│        │ ⚡ THỬ THÁCH KIẾN THỨC ▸  │            │ ← CTA vào quiz
│        ╰──────────────────────────╯            │
│  Nguồn tham khảo: ...                          │
└──────────────────────────────────────────────┘
```

### 5.4 Quiz Page

```
┌──────────────────────────────────────────────┐
│  THỬ THÁCH 1945        Câu 3/8      ⚡ 2 điểm  │ ← progress bar
│                                                │
│  Bác Hồ đọc Tuyên ngôn Độc lập ngày nào?       │
│                                                │
│   [ 19/08/1945 ]      [ 02/09/1945 ]           │ ← đáp án: hover glow;
│   [ 23/09/1945 ]      [ 06/01/1946 ]           │   đúng=xanh, sai=đỏ
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ ✔ Chính xác! Ngày 02/09/1945 tại quảng    │ │ ← giải thích trượt lên
│  │   trường Ba Đình...        [Câu tiếp ▸]   │ │   sau khi trả lời
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘

Màn tổng kết: điểm to ở giữa (đếm số chạy lên), lời đánh giá,
[🔄 Làm lại]  [🚀 Du hành tiếp: 1954]  [◂ Về bảng điều khiển]
```

## 6. Trạng thái tương tác

| Thành phần | Default | Hover | Active/Selected | Disabled |
|---|---|---|---|---|
| Era card | viền `space-700` | viền cyan mờ, nhích lên 4px | viền + glow themeColor, scale 1.03 | — |
| Nút START | glow cyan nhẹ, pulse chậm | glow mạnh | nhấn: scale 0.97 + âm thanh | xám, không pulse |
| Đáp án quiz | nền `space-800` | viền cyan | đúng: nền success/15 + viền success; sai: danger + shake nhẹ | sau khi trả lời khóa cả nhóm |

## 7. Responsive

| Breakpoint | Console | Era Page | Quiz |
|---|---|---|---|
| Mobile < 640 | Card dọc, START sticky đáy | 1 cột, hero chữ nhỏ hơn, timeline dọc | Đáp án 1 cột, kéo thả tối ưu chạm |
| Tablet 640–1024 | Grid 2–3 cột | 2 cột ở section sự kiện | Đáp án 2 cột |
| Desktop > 1024 | 5 card ngang | Bố cục đầy đủ như wireframe | 2 cột, max-width 800px căn giữa |

## 8. Accessibility

- Mọi ảnh có `alt` mô tả (nội dung tư liệu quan trọng với người dùng screen reader).
- Điều khiển được bằng bàn phím: chọn era (mũi tên/Tab), trả lời quiz (Tab + Enter); kéo thả có phương án thay thế bằng nút lên/xuống.
- `prefers-reduced-motion` → tắt shake/tunnel/glitch.
- Focus ring rõ ràng (viền cyan) trên nền tối.
- Âm thanh mặc định tắt; đúng/sai không chỉ dựa vào màu (có icon ✔/✘).
