# 🎒 Tour Booking System - Backend API Service

Dự án xây dựng hệ thống **RESTful API Backend** cho nền tảng quản lý và đặt tour du lịch trực tuyến (**Tour Booking System**).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Ngôn ngữ & Runtime:** Node.js (v18+)
- **Framework:** Express.js (v4.x)
- **Cơ sở dữ liệu:** MongoDB & Mongoose ODM
- **Xác thực & Bảo mật:** JWT (JSON Web Tokens), Bcryptjs, CORS
- **Tiện ích:** Dotenv, Slugify, Nodemon

---

## 📁 Cấu Trúc Thư Mục (Folder Structure)

```plaintext
tour-booking-backend/
├── config/
│   └── database.js             # Cấu hình kết nối cơ sở dữ liệu MongoDB
├── controllers/
│   ├── auth.controller.js      # Điều hướng đăng ký, đăng nhập & phân quyền
│   ├── category.controller.js  # Xử lý danh mục tour du lịch
│   ├── order.controller.js     # Quản lý đơn đặt tour & thanh toán
│   └── tour.controller.js      # CRUD tour, lọc theo giá, địa điểm, tìm kiếm
├── middlewares/
│   └── auth.middleware.js      # Middleware kiểm tra và giải mã JWT token
├── models/
│   ├── category.model.js       # Mongoose Schema danh mục tour
│   ├── order.model.js          # Mongoose Schema đơn đặt tour
│   ├── tour.model.js           # Mongoose Schema chi tiết tour du lịch
│   └── user.model.js           # Mongoose Schema tài khoản người dùng
├── routes/
│   ├── auth.route.js           # Định tuyến API người dùng & xác thực
│   ├── category.route.js       # Định tuyến API danh mục
│   ├── index.route.js          # Điểm tập trung định tuyến hệ thống
│   ├── order.route.js          # Định tuyến API đặt tour
│   └── tour.route.js           # Định tuyến API tour du lịch
├── .env.example                # Mẫu cấu hình biến môi trường
├── .gitignore                  # Khai báo các file bỏ qua khi commit Git
├── index.js                    # File khởi tạo và chạy ứng dụng Express server
├── package.json                # Khai báo thư viện và script thực thi
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Clone repository
```bash
git clone https://github.com/anhtuank28/tour-booking-backend.git
cd tour-booking-backend
```

### 2. Cài đặt các thư viện phụ thuộc
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` từ file `.env.example`:
```bash
cp .env.example .env
```
Cập nhật chuỗi kết nối MongoDB và PORT phù hợp:
```env
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tour-booking
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Khởi động Server
- Chế độ phát triển (Development với auto-reload):
```bash
npm run dev
```
- Chế độ triển khai (Production):
```bash
npm start
```
Server sẽ chạy mặc định tại: `http://localhost:3001`

---

## 📡 Danh Sách Endpoint Mẫu (API Documentation)

### 1. Tours API (`/api/v1/tours`)
| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/v1/tours` | Lấy danh sách tour (hỗ trợ phân trang, lọc, tìm kiếm) |
| `GET` | `/api/v1/tours/:slug` | Lấy thông tin chi tiết tour theo slug |
| `POST` | `/api/v1/tours` | Tạo tour mới (Yêu cầu quyền Admin) |
| `PUT` | `/api/v1/tours/:id` | Cập nhật thông tin tour |
| `DELETE` | `/api/v1/tours/:id` | Xóa tour (Soft delete) |

### 2. Categories API (`/api/v1/categories`)
| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/v1/categories` | Lấy danh sách các danh mục tour |
| `POST` | `/api/v1/categories` | Thêm mới danh mục tour |

### 3. Orders API (`/api/v1/orders`)
| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `POST` | `/api/v1/orders` | Tạo đơn đặt tour mới |
| `GET` | `/api/v1/orders/:orderCode` | Tra cứu trạng thái đơn đặt tour theo mã code |
| `GET` | `/api/v1/orders/history/my-orders` | Xem lịch sử đặt tour của người dùng đăng nhập |

### 4. Auth API (`/api/v1/auth`)
| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Đăng ký tài khoản người dùng |
| `POST` | `/api/v1/auth/login` | Đăng nhập và nhận JWT access token |
| `GET` | `/api/v1/auth/profile` | Xem thông tin cá nhân |

---

## 👤 Tác Giả & Báo Cáo
- **Sinh viên thực hiện:** Nguyễn Anh Tuấn
- **Đồ án:** Xây dựng hệ thống Backend Quản lý & Đặt tour du lịch trực tuyến
