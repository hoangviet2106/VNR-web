# 01 — Tổng quan dự án

## 1. Tên sản phẩm

**Ngược Dòng Trăm Năm** — Website học lịch sử Việt Nam theo phong cách khoa học viễn tưởng. (Tên cũ trong quá trình phát triển: Cỗ Máy Thời Gian / Time Machine.)

## 2. Ý tưởng

"Cỗ máy thời gian" là một website học lịch sử được thiết kế theo phong cách Sci-Fi, cho phép người dùng trải nghiệm cảm giác **"du hành"** đến các giai đoạn lịch sử quan trọng của Việt Nam. Thay vì đọc văn bản khô khan, người dùng nhập một mốc thời gian, khởi động cỗ máy và khám phá sự kiện, nhân vật, dấu mốc lịch sử của giai đoạn đó thông qua hiệu ứng, hoạt ảnh và câu hỏi tương tác.

## 3. Mục tiêu

| # | Mục tiêu | Thước đo thành công |
|---|---|---|
| 1 | Trải nghiệm học lịch sử trực quan, sinh động | Người dùng hoàn thành trọn vẹn ít nhất 1 hành trình (chọn mốc → du hành → khám phá → quiz) |
| 2 | Tăng tính tương tác qua hiệu ứng và hoạt ảnh | Mọi chuyển cảnh đều có animation, không có trang "tĩnh" |
| 3 | Ghi nhớ kiến thức bằng trải nghiệm | Người dùng đạt ≥ 70% điểm quiz sau khi khám phá |
| 4 | Sản phẩm sáng tạo chỉ với Frontend | Deploy thành công trên Vercel/GitHub Pages, không cần server |

## 4. Phạm vi

### Trong phạm vi (In-scope)

- 5 mốc lịch sử: **1930, 1945, 1954, 1975, 1986**.
- Giao diện bảng điều khiển cỗ máy thời gian (trang chủ).
- Hiệu ứng du hành thời gian (đếm ngược, đường hầm ánh sáng, rung màn hình, âm thanh).
- Trang khám phá từng giai đoạn: bối cảnh, sự kiện, nhân vật, hình ảnh, video YouTube, timeline, kiến thức mở rộng.
- 4 dạng câu hỏi tương tác: trắc nghiệm, kéo thả sắp xếp, đoán nhân vật qua ảnh, ghép sự kiện với năm.
- Điều hướng giữa các mốc (giai đoạn kế tiếp / quay về bảng điều khiển).
- Responsive trên desktop, tablet, mobile.

### Ngoài phạm vi (Out-of-scope)

- Backend, cơ sở dữ liệu, API server.
- Đăng nhập / tài khoản người dùng.
- Lưu tiến trình học lâu dài trên server (chỉ dùng `localStorage` nếu cần).
- Nội dung ngoài 5 mốc lịch sử đã chọn (có thể mở rộng sau).

## 5. Đối tượng người dùng

| Nhóm | Mô tả | Nhu cầu |
|---|---|---|
| Học sinh THCS/THPT | Học lịch sử theo chương trình | Ôn tập kiến thức một cách thú vị |
| Sinh viên | Học các môn lịch sử Đảng, tư tưởng | Hệ thống hóa mốc thời gian nhanh |
| Người yêu lịch sử | Tự tìm hiểu | Trải nghiệm khám phá mới lạ |
| Ban giám khảo / giảng viên | Đánh giá đồ án, cuộc thi | Thấy được tính sáng tạo và kỹ thuật |

## 6. Điểm nổi bật

- Ý tưởng độc đáo, khác biệt so với website học lịch sử truyền thống.
- Chỉ cần Frontend nhưng vẫn tạo trải nghiệm tương tác cao.
- Tận dụng animation, transition, responsive để tăng thẩm mỹ.
- Dễ mở rộng thêm giai đoạn lịch sử hoặc môn học khác.
- Phù hợp trình bày trong cuộc thi, đồ án, thuyết trình về công nghệ giáo dục.

## 7. Ràng buộc kỹ thuật

- **100% Frontend**: dữ liệu là các tệp JSON tĩnh, bundle cùng ứng dụng.
- **Triển khai tĩnh**: Vercel hoặc GitHub Pages (chú ý cấu hình `base` path cho GitHub Pages).
- **Media**: hình ảnh đặt trong `public/images/`, video nhúng từ YouTube (không tự host video).
- **Hiệu năng**: hiệu ứng phải mượt (60fps), lazy-load hình ảnh và dữ liệu theo từng giai đoạn.

## 8. Thuật ngữ

| Thuật ngữ | Ý nghĩa |
|---|---|
| **Era / Giai đoạn** | Một mốc lịch sử người dùng có thể du hành đến (vd: 1945) |
| **Console / Bảng điều khiển** | Trang chủ, nơi chọn mốc thời gian và nhấn START |
| **Travel / Du hành** | Màn hình hiệu ứng chuyển cảnh giữa console và era |
| **Quiz** | Bộ câu hỏi tương tác sau mỗi giai đoạn |
| **Timeline** | Dòng thời gian các sự kiện trong một giai đoạn |
