# ⏳ Cỗ Máy Thời Gian — Time Machine

> Website học lịch sử Việt Nam theo phong cách khoa học viễn tưởng (Sci-Fi), cho phép người dùng "du hành" đến các giai đoạn lịch sử quan trọng của dân tộc.

## Giới thiệu nhanh

Thay vì học lịch sử theo cách truyền thống, người dùng sẽ:

1. Chọn một **mốc thời gian** (1930, 1945, 1954, 1975, 1986) trên bảng điều khiển cỗ máy thời gian.
2. Nhấn **START** và trải nghiệm hiệu ứng du hành (đường hầm ánh sáng, đếm ngược, rung màn hình, âm thanh).
3. **Khám phá** giai đoạn lịch sử qua bối cảnh, sự kiện, nhân vật, hình ảnh và video tư liệu.
4. **Củng cố kiến thức** bằng các câu hỏi tương tác (trắc nghiệm, kéo thả, ghép nối, đoán nhân vật).

Sản phẩm **chỉ dùng Frontend** — dữ liệu lưu dạng JSON, không cần Backend hay cơ sở dữ liệu, triển khai trực tiếp trên Vercel hoặc GitHub Pages.

## Công nghệ

| Thành phần | Công nghệ |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Routing | React Router |
| Dữ liệu | JSON tĩnh (`src/data/`) |
| Triển khai | Vercel / GitHub Pages |

## Tài liệu dự án

Toàn bộ tài liệu nằm trong thư mục [docs/](docs/):

| Tài liệu | Nội dung |
|---|---|
| [01 — Tổng quan dự án](docs/01-tong-quan.md) | Ý tưởng, mục tiêu, phạm vi, đối tượng người dùng |
| [02 — Yêu cầu chức năng](docs/02-yeu-cau-chuc-nang.md) | Đặc tả chi tiết từng chức năng, user flow |
| [03 — Kiến trúc hệ thống](docs/03-kien-truc-he-thong.md) | Kiến trúc frontend, routing, quản lý state |
| [04 — Thiết kế dữ liệu](docs/04-thiet-ke-du-lieu.md) | Schema JSON cho giai đoạn, sự kiện, nhân vật, quiz |
| [05 — Thiết kế giao diện](docs/05-thiet-ke-giao-dien.md) | Design system Sci-Fi, màu sắc, typography, hiệu ứng |
| [06 — Cấu trúc thư mục](docs/06-cau-truc-thu-muc.md) | Tổ chức source code, quy ước đặt tên |
| [07 — Kế hoạch phát triển](docs/07-ke-hoach-phat-trien.md) | Các giai đoạn phát triển, milestone, phân chia công việc |
| [08 — Triển khai](docs/08-trien-khai.md) | Hướng dẫn build và deploy lên Vercel / GitHub Pages |

## Bắt đầu phát triển (dự kiến)

```bash
# Cài đặt dependencies
npm install

# Chạy môi trường dev
npm run dev

# Build production
npm run build
```

## Giấy phép

Dự án phục vụ mục đích học tập / đồ án môn học.
