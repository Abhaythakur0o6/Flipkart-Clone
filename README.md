# 🛒 Flipkart Clone

A production-ready, full-stack **Flipkart-inspired e-commerce platform** built with the **MERN stack**. Features a customer storefront, a fully functional admin panel, and a well-structured REST API — all running concurrently from a single command.

---

## ✨ Key Highlights

| 🔐 OTP Login | 📦 Pagination | 🔍 Search & Filter | ⭐ Reviews & Ratings |
|---|---|---|---|
| 💳 Razorpay Payments | 🖼️ Cloudinary Uploads | 📊 Redux State Management | 🔄 JWT Token Rotation |

---

## 🚀 Features

### 👤 Customer Storefront

- **🔐 Authentication**
  - Email & password signup/login with **bcryptjs** password hashing
  - **OTP-based login** — 6-digit OTP sent via email (SHA-256 hashed, expires in 5 minutes)
  - **JWT Access + Refresh Token** rotation — access token (20 min) + refresh token (7 days) stored in **HTTP-only cookies**
  - Silent token refresh on expiry — seamless user session

- **🛍️ Product Discovery**
  - Browse products by **category**
  - **Search** products by keyword
  - **Filter** by: minimum rating, minimum discount %, new arrivals / old listings
  - **Sort** by: price low-to-high, price high-to-low
  - **Server-side pagination** — efficient data loading with page & limit controls
  - Product detail page with full description, MRP, selling price & discount %

- **⭐ Reviews & Ratings**
  - Add, edit & delete your product review
  - Star rating (1–5) with auto-calculated **average rating**
  - Duplicate review prevention — one review per user per product

- **🛒 Cart & Checkout**
  - Add to cart, adjust quantities, remove items
  - **Redux Toolkit** for global cart & user state management with **redux-persist**
  - Checkout with **Razorpay** payment gateway (test mode)

- **📦 Orders**
  - View complete order history
  - Order detail page — items, quantities, total price, user info

---

### 🛠️ Admin Panel

- **Product Management**
  - Add new products with **Cloudinary** image upload (via Multer)
  - Delete products — image also deleted from Cloudinary on product removal
  - Search & filter products
  - Server-side **paginated product listing**

- **Order Management**
  - View all customer orders with **server-side pagination**

---

### ⚙️ Backend Architecture

- **RESTful API** with Express.js 5
- **MVC pattern** — controllers / routes / models / services / middlewares
- **MongoDB + Mongoose** with nested schemas (products → reviews, orders → items)
- **wrapAsync** utility — clean async error propagation without try/catch boilerplate
- **Role-based route protection** middleware (user/admin)
- **Cloudinary + Multer** — cloud image storage with automatic cleanup on delete
- **Nodemailer + Brevo SMTP** — transactional OTP emails
- **Razorpay** — server-side order creation & payment verification
- Global error handling middleware

---

## 🧰 Tech Stack

### Frontend (Client & Admin)
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Redux Toolkit + redux-persist** | Global state management & cart persistence |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP requests with interceptors |
| **MUI (Material UI)** | UI components |
| **Bootstrap 5** | Layout & utilities |
| **Vite** | Fast dev server & build tool |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express.js 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Access & refresh token auth |
| **bcryptjs** | Password hashing |
| **Cloudinary + Multer** | Image upload & storage |
| **Nodemailer + Brevo** | OTP email delivery |
| **Razorpay** | Payment gateway |
| **cookie-parser** | HTTP-only cookie management |
| **crypto** | OTP hashing (SHA-256) |

---

## 📁 Project Structure

```
FlipKart/
├── client/                  # React customer frontend — port 5173
│   └── src/
│       ├── components/      # Carousel, Header, Footer, Cart, etc.
│       ├── pages/           # MainPage, Cart, Categories, Orders, etc.
│       ├── redux/           # Store, CartSlice, ProductSlice, UserSlice
│       ├── service/         # Axios instance & API calls
│       └── context/         # DataProvider
│
├── admin/                   # React admin panel — port 5174
│   └── src/
│       ├── components/      # Sidebar, Navbar, ProductList, Search
│       ├── pages/           # Products, AddProducts, Orders
│       └── service/         # Axios instance & Order API
│
├── server/                  # Express.js backend — port 5000
│   ├── config/              # Cloudinary, Nodemailer, Razorpay setup
│   ├── controllers/         # Business logic (products, users, orders, otp, payment)
│   ├── middlewares/         # JWT auth guard, Multer upload
│   ├── models/              # User, Product, Order, OTP schemas
│   ├── routes/              # Route definitions
│   ├── service/             # Order & payment service layer
│   └── utils/               # wrapAsync error handler
│
└── package.json             # Root — runs all 3 apps concurrently
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB Atlas** account (or local MongoDB)
- **Razorpay** account — test API keys
- **Cloudinary** account — free tier works
- **Brevo (Sendinblue)** — free SMTP for email OTP

### 1. Clone the repository
```bash
git clone https://github.com/Abhaythakur0o6/FlipKart.git
cd FlipKart
```

### 2. Install all dependencies
```bash
# Root
npm install

# Client, Admin & Server
cd client && npm install && cd ..
cd admin && npm install && cd ..
cd server && npm install && cd ..
```

### 3. Configure environment variables

**`server/.env`** — copy from `server/.env.example`:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
NODE_ENV=development

RAZORPAY_APIKEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

**`client/.env`** — copy from `client/.env.example`:
```env
VITE_API_URL=http://localhost:5000
```

**`admin/.env`** — copy from `admin/.env.example`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the project
```bash
npm start
```

All three apps start concurrently:

| App | URL |
|---|---|
| 🛍️ Customer Frontend | http://localhost:5173 |
| 🛠️ Admin Panel | http://localhost:5174 |
| ⚙️ Backend API | http://localhost:5000 |

---

## 📸 Screenshots

> Coming soon

---

## 👨‍💻 Author

**Abhay Thakur**

[![GitHub](https://img.shields.io/badge/GitHub-Abhaythakur0o6-181717?style=flat-square&logo=github)](https://github.com/Abhaythakur0o6)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abhay%20Thakur-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/abhay-thakur-456716254/)
[![Email](https://img.shields.io/badge/Email-abhaythakur0494@gmail.com-D14836?style=flat-square&logo=gmail)](mailto:abhaythakur0494@gmail.com)

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).