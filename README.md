# AI4FUTURE Module 4

## Gioi thieu du an

Day la du an Module 4 cua nhom AI4FUTURE. Du an tap trung xay dung backend cho he thong quan ly tai lieu va nguoi dung, su dung NestJS, TypeScript, Prisma va Docker Compose de ho tro phat trien, kiem thu va trien khai moi truong dich vu.

Muc tieu cua nhom la tao ra mot backend co cau truc ro rang, de mo rong, co kha nang ket noi co so du lieu va cung cap API cho cac chuc nang chinh cua san pham.

## Cong nghe chinh

- NestJS va TypeScript cho tang backend.
- Prisma cho khai bao schema va thao tac co so du lieu.
- Docker Compose cho moi truong phu thuoc trong qua trinh phat trien.
- Jest cho unit test va e2e test.

## Phan cong nhiem vu

| Thanh vien | Vai tro | Nhiem vu chinh |
| --- | --- | --- |
| Thai | DevOps | Cau hinh moi truong, Docker, quy trinh build/deploy va ho tro van hanh he thong. |
| Khoa | Backend | Phat trien API, xu ly logic nghiep vu va tich hop co so du lieu. |
| Tam | Backend | Xay dung module backend, viet service/controller va ho tro kiem thu API. |
| Nhan | Backend | Thiet ke va cai dat chuc nang backend, quan ly entity/dto va validate du lieu. |
| Dat | Backend | Phat trien tinh nang backend, sua loi va hoan thien tai lieu ky thuat. |

## Cau truc du an

```text
.
|-- backend/              # Ma nguon NestJS backend
|-- docker-compose.yml    # Cau hinh dich vu phu tro
|-- package-lock.json     # Lockfile cap root
`-- README.md             # Mo ta du an va phan cong nhom
```

## Chay du an backend

```bash
cd backend
npm install
npm run start:dev
```

## Kiem thu

```bash
cd backend
npm run test
npm run test:e2e
```

