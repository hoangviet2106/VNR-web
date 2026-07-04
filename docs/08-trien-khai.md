# 08 — Triển khai (Deployment)

Ứng dụng là site tĩnh (output của `vite build` trong `dist/`), có thể deploy lên **Vercel** (khuyến nghị) hoặc **GitHub Pages**.

## 1. Chuẩn bị chung

```bash
# Build production
npm run build

# Kiểm tra bản build tại http://localhost:4173
npm run preview
```

Checklist trước khi deploy:

- [ ] `npm run build` không lỗi, không warning quan trọng.
- [ ] Đã test bản `preview` (khác dev server — lỗi đường dẫn ảnh/JSON thường lộ ra ở đây).
- [ ] Ảnh đã nén (WebP), tổng bundle JS ban đầu < ~300KB gzip.
- [ ] Title, meta description, favicon, Open Graph đã đặt.

## 2. Triển khai lên Vercel (khuyến nghị)

Vercel hỗ trợ SPA tốt nhất và deploy tự động theo git.

### Cách làm

1. Đẩy code lên GitHub.
2. Vào [vercel.com](https://vercel.com) → **Add New Project** → import repo.
3. Vercel tự nhận diện Vite: Build Command `npm run build`, Output `dist` — giữ mặc định.
4. Nhấn **Deploy**. Mỗi lần push lên nhánh chính sẽ tự deploy lại; các nhánh khác có preview URL riêng.

### Cấu hình SPA fallback

Tạo file `vercel.json` ở gốc repo để deep-link (`/era/1945`) không bị 404 khi truy cập trực tiếp:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 3. Triển khai lên GitHub Pages

### 3.1 Cấu hình `base` trong Vite

GitHub Pages phục vụ site tại `https://<user>.github.io/<repo>/` nên phải đặt base:

```js
// vite.config.js
export default defineConfig({
  base: '/web-spst/', // đúng tên repo
  plugins: [react()],
});
```

> Lưu ý: khi đặt `base`, các đường dẫn tuyệt đối trong JSON (`/images/...`) sẽ sai. Giải pháp: dùng `import.meta.env.BASE_URL + 'images/...'` khi render ảnh, hoặc viết helper `assetUrl(path)` dùng chung.

### 3.2 Xử lý deep-link cho SPA

GitHub Pages không có rewrite. Hai lựa chọn:

| Phương án | Ưu | Nhược |
|---|---|---|
| **HashRouter** (`/#/era/1945`) — khuyến nghị cho GH Pages | Không cần cấu hình gì thêm | URL có dấu `#` |
| Trick `404.html` (copy `index.html` thành `404.html` sau build) | URL sạch | Hacky, ảnh hưởng SEO |

### 3.3 Deploy tự động bằng GitHub Actions

Tạo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Sau đó vào **Settings → Pages → Source: GitHub Actions**.

## 4. So sánh nhanh

| Tiêu chí | Vercel | GitHub Pages |
|---|---|---|
| Cấu hình SPA | 1 file `vercel.json` | HashRouter hoặc trick 404 |
| Deploy tự động | Có sẵn khi import repo | Cần workflow Actions |
| Preview theo nhánh/PR | Có | Không |
| Base path | Không cần chỉnh | Phải đặt `base` + helper asset |
| **Khuyến nghị** | ✅ Chọn Vercel | Dự phòng |

## 5. Sau khi deploy

- [ ] Bấm thử toàn bộ luồng trên bản deploy: Console → Travel → Era → Quiz → Du hành tiếp (cả 5 era).
- [ ] Vào trực tiếp deep-link `/era/1954` từ tab ẩn danh — không 404.
- [ ] Test trên điện thoại thật (kéo thả quiz, hiệu ứng, video).
- [ ] Chạy Lighthouse trên bản production; mục tiêu Performance ≥ 90.
- [ ] Chia sẻ link lên Zalo/Messenger xem Open Graph hiển thị đúng.

## 6. Khắc phục sự cố thường gặp

| Triệu chứng | Nguyên nhân | Cách sửa |
|---|---|---|
| Trang trắng trên GH Pages | Thiếu/sai `base` trong vite.config | Đặt `base: '/<repo>/'` đúng tên repo |
| Ảnh 404 trên GH Pages nhưng dev chạy ổn | Đường dẫn `/images/...` tuyệt đối | Dùng helper `assetUrl()` với `BASE_URL` |
| Refresh ở `/era/1945` → 404 | SPA không có fallback | Vercel: `vercel.json` rewrites; GH Pages: HashRouter |
| Video YouTube không hiện | ID sai hoặc video chặn embed | Kiểm tra `youtubeId`, chọn video cho phép nhúng |
| Âm thanh không phát lần đầu | Chính sách autoplay trình duyệt | Chỉ phát sau tương tác đầu tiên của người dùng |
