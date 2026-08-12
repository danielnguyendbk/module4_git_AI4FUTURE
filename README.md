# AI4FUTURE Module 4

## Giới thiệu dự án

Đây là dự án Module 4 của nhóm AI4FUTURE. Dự án tập trung xây dựng backend cho hệ thống quản lý tài liệu và người dùng, sử dụng NestJS, TypeScript, Prisma và Docker Compose để hỗ trợ phát triển, kiểm thử và triển khai.

Mục tiêu của nhóm là tạo ra một backend có cấu trúc rõ ràng, dễ mở rộng, có khả năng kết nối cơ sở dữ liệu và cung cấp API cho các chức năng chính của sản phẩm.

## Công nghệ chính

- NestJS và TypeScript để xây dựng backend.
- Prisma để khai báo schema và thao tác cơ sở dữ liệu.
- Docker Compose để cấu hình môi trường phụ thuộc khi phát triển.
- Jest để viết unit test và e2e test.

## Phân công nhiệm vụ

| Thành viên | Vai trò | Nhiệm vụ chính |
| --- | --- | --- |
| Thái | DevOps | Cấu hình môi trường, Docker, quy trình build/deploy và hỗ trợ vận hành hệ thống. |
| Khoa | Backend | Phát triển API, xử lý logic nghiệp vụ và tích hợp cơ sở dữ liệu. |
| Tâm | Backend | Xây dựng module backend, viết service/controller và hỗ trợ kiểm thử API. |
| Nhân | Backend | Thiết kế và cài đặt chức năng backend, quản lý entity/dto và validate dữ liệu. |
| Đạt | Backend | Phát triển tính năng backend, sửa lỗi và hoàn thiện tài liệu kỹ thuật. |

## Cấu trúc dự án

```text
.
|-- backend/              # Mã nguồn NestJS backend
|-- docker-compose.yml    # Cấu hình dịch vụ phụ trợ
|-- package-lock.json     # Lockfile cấp root
`-- README.md             # Mô tả dự án và phân công nhóm
```

## Chạy dự án backend (phát triển)

```bash
cd backend
npm install
npm run start:dev
```

Ứng dụng sẽ chạy ở http://localhost:3000 (mặc định). Kiểm tra file `backend/.env` hoặc cấu hình tương ứng để biết cổng và các biến môi trường khác.

## Kiểm thử

```bash
cd backend
npm run test
npm run test:e2e
```

## Gợi ý triển khai

- Sử dụng Docker Compose để khởi động các dịch vụ phụ trợ (ví dụ: cơ sở dữ liệu) khi cần.
- Cập nhật schema Prisma và chạy `prisma migrate` khi thay đổi mô hình dữ liệu.

## Liên hệ

Nếu có câu hỏi hoặc cần hỗ trợ, liên hệ với thành viên phụ trách tương ứng trong phần "Phân công nhiệm vụ".
