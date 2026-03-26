// ============================================================
// 🚀 EXPRESS.JS ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
// ============================================================
// Cài đặt: npm init -y && npm install express
// Chạy: node expressjs_practice.js
// Test API: dùng Postman, Thunder Client, hoặc curl
// ============================================================


// ╔══════════════════════════════════════════════════════════════╗
// ║              📖 LÝ THUYẾT EXPRESS.JS TỔNG QUAN              ║
// ╚══════════════════════════════════════════════════════════════╝

// ┌─────────────────────────────────────────────────────────────┐
// │ 1. EXPRESS.JS LÀ GÌ?                                        │
// └─────────────────────────────────────────────────────────────┘
// Express là web framework tối giản cho Node.js, dùng để xây dựng:
// - RESTful APIs (JSON)
// - Web applications (với template engine)
// - Microservices
//
// Ví dụ đơn giản nhất:
//   const express = require("express");
//   const app = express();
//   app.get("/", (req, res) => res.send("Hello World"));
//   app.listen(3000);

// ┌─────────────────────────────────────────────────────────────┐
// │ 2. MIDDLEWARE LÀ GÌ?                                        │
// └─────────────────────────────────────────────────────────────┘
// Middleware = hàm có quyền truy cập req, res, next
// Chạy TUẦN TỰ theo thứ tự khai báo:
//   Request → middleware1 → middleware2 → route handler → Response
//
// Cú pháp: function(req, res, next) { ...; next(); }
// - next(): chuyển sang middleware tiếp theo
// - Không gọi next() → request bị "treo"!
//
// Các loại:
// 1. Application-level: app.use(fn)
// 2. Router-level: router.use(fn)
// 3. Built-in: express.json(), express.static()
// 4. Error-handling: (err, req, res, next) → 4 params!
// 5. Third-party: cors(), helmet(), morgan()
//
// Ví dụ:
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`);
//     next();  // ← BẮT BUỘC!
//   });

// ┌─────────────────────────────────────────────────────────────┐
// │ 3. ROUTING                                                  │
// └─────────────────────────────────────────────────────────────┘
// RESTful API conventions:
//   GET    /api/users      → Danh sách users
//   GET    /api/users/:id  → 1 user theo id
//   POST   /api/users      → Tạo user mới
//   PUT    /api/users/:id  → Cập nhật toàn bộ
//   PATCH  /api/users/:id  → Cập nhật 1 phần
//   DELETE /api/users/:id  → Xóa user
//
// Route params: /users/:id → req.params.id
// Query string: /users?page=2&limit=10 → req.query.page, req.query.limit
// Body data: POST/PUT → req.body (cần express.json() middleware)

// ┌─────────────────────────────────────────────────────────────┐
// │ 4. REQUEST & RESPONSE                                       │
// └─────────────────────────────────────────────────────────────┘
// Request (req):
//   req.params   → { id: "123" }        (route params)
//   req.query    → { page: "2" }        (query string)
//   req.body     → { name: "Duc" }      (JSON body)
//   req.headers  → { authorization: "Bearer xxx" }
//   req.method   → "GET"
//   req.cookies  → cookies (cần cookie-parser)
//
// Response (res):
//   res.json(data)         → Trả JSON
//   res.status(201).json() → Set status code
//   res.send("text")       → Trả text/html
//   res.redirect("/login") → Chuyển hướng
//   res.sendFile(path)     → Gửi file
//
// HTTP Status Codes:
//   200 OK → 201 Created → 204 No Content
//   400 Bad Request → 401 Unauthorized → 403 Forbidden → 404 Not Found
//   500 Internal Server Error

// ┌─────────────────────────────────────────────────────────────┐
// │ 5. MVC PATTERN                                              │
// └─────────────────────────────────────────────────────────────┘
// Model:      Quản lý data & business logic (Mongoose Schema)
// View:       JSON response (API) hoặc Template engine (Web)
// Controller: Nhận req → gọi Model → trả res
//
// Cấu trúc thư mục:
//   /controllers  → Xử lý logic (userController.js)
//   /models       → Schema database (User.js)
//   /routes       → Định nghĩa routes (userRoutes.js)
//   /middleware    → Auth, validation, logging
//   /services     → Business logic phức tạp
//   /config       → Database, env config

// ┌─────────────────────────────────────────────────────────────┐
// │ 6. ERROR HANDLING                                           │
// └─────────────────────────────────────────────────────────────┘
// Operational errors: lỗi dự đoán được (invalid input, not found)
// Programming errors: bugs (null reference, type error)
//
// Pattern:
//   1. Custom Error class: class AppError extends Error { statusCode, ... }
//   2. Async wrapper: const asyncHandler = fn => (req,res,next) => fn(req,res,next).catch(next)
//   3. Global error handler: app.use((err, req, res, next) => { ... })
//   4. 404 handler: app.use("*", (req, res) => res.status(404).json(...))
//
// ⚠️ Error middleware PHẢI có 4 params và đặt SAU tất cả routes!

// ┌─────────────────────────────────────────────────────────────┐
// │ 7. AUTHENTICATION (JWT)                                     │
// └─────────────────────────────────────────────────────────────┘
// JWT = JSON Web Token: header.payload.signature
//
// Flow:
//   1. User đăng nhập → server tạo JWT → gửi về client
//   2. Client gửi JWT trong header: Authorization: Bearer <token>
//   3. Server verify token → cho phép/từ chối
//
//   const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
//   const decoded = jwt.verify(token, SECRET);
//
// Access Token: ngắn hạn (15m-1h) → dùng cho API calls
// Refresh Token: dài hạn (7d-30d) → dùng để lấy access token mới

// ┌─────────────────────────────────────────────────────────────┐
// │ 8. SECURITY CHECKLIST                                       │
// └─────────────────────────────────────────────────────────────┘
// ✅ helmet()       → Security HTTP headers
// ✅ cors()         → Control cross-origin requests
// ✅ rate-limit     → Chống brute force
// ✅ bcrypt/argon2  → Hash passwords
// ✅ sanitize input → Chống NoSQL injection & XSS
// ✅ HTTPS          → Mã hóa truyền tải
// ✅ env variables  → Không hardcode secrets
// ✅ Validate input → Dùng Joi/Zod/express-validator


// ╔══════════════════════════════════════════════════════════════╗
// ║              🏋️ BÀI TẬP THỰC HÀNH BÊN DƯỚI                ║
// ╚══════════════════════════════════════════════════════════════╝


// ************************************************************
// PHẦN 1: KHỞI TẠO SERVER CƠ BẢN
// ************************************************************

// 📌 Định nghĩa:
// - Express: framework web cho Node.js, xây dựng API/web app
// - app = express(): tạo instance ứng dụng
// - app.listen(port): khởi động server lắng nghe trên port
// - req (request): thông tin từ client gửi lên
// - res (response): phản hồi server trả về

const express = require("express");
const app = express();
const PORT = 3000;

// 📌 Built-in Middleware phổ biến:
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse form data

// 🏋️ BÀI TẬP 1.1: Route đầu tiên
app.get("/", (req, res) => {
  res.json({ message: "Chào mừng đến với Express.js Practice!" });
});

// 🏋️ BÀI TẬP 1.2: Các HTTP methods
// 📌 RESTful API conventions:
// GET    → Lấy dữ liệu
// POST   → Tạo mới
// PUT    → Cập nhật toàn bộ
// PATCH  → Cập nhật một phần
// DELETE → Xóa

// Gợi ý: Hoàn thành từng route bên dưới

// app.get("/api/items", (req, res) => {
//   // Trả về danh sách items
//   // res.json({ data: ??? });
// });

// app.post("/api/items", (req, res) => {
//   // Tạo item mới từ req.body
//   // const { name, price } = req.body;
//   // res.status(201).json({ message: "Đã tạo", data: ??? });
// });

// app.put("/api/items/:id", (req, res) => {
//   // Cập nhật item theo id
//   // const { id } = req.params;
//   // res.json({ message: `Đã cập nhật item ${id}` });
// });

// app.delete("/api/items/:id", (req, res) => {
//   // Xóa item theo id
//   // res.json({ message: `Đã xóa item ${req.params.id}` });
// });


// ************************************************************
// PHẦN 2: REQUEST OBJECT (req)
// ************************************************************

// 📌 Định nghĩa:
// - req.params  → Route parameters (/users/:id → req.params.id)
// - req.query   → Query string (/search?q=abc → req.query.q)
// - req.body    → Body data (POST/PUT) - cần middleware parse
// - req.headers → HTTP headers
// - req.method  → HTTP method (GET, POST, ...)
// - req.path    → URL path
// - req.ip      → IP của client
// - req.cookies → Cookies (cần cookie-parser)

// 🏋️ BÀI TẬP 2.1: Route params + Query string
app.get("/api/users/:userId/posts", (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10, sort = "desc" } = req.query;

  res.json({
    userId,
    page: Number(page),
    limit: Number(limit),
    sort,
    message: `Lấy bài viết của user ${userId}, trang ${page}`,
  });
});

// 🏋️ BÀI TẬP 2.2: Xử lý body data
// Gợi ý: Test bằng POST request với JSON body

// app.post("/api/register", (req, res) => {
//   // const { username, email, password } = req.body;
//   //
//   // if (!username || !email || !password) {
//   //   return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
//   // }
//   //
//   // // Giả lập lưu user
//   // res.status(201).json({
//   //   message: "Đăng ký thành công",
//   //   user: { username, email }  // Không trả password!
//   // });
// });


// ************************************************************
// PHẦN 3: RESPONSE OBJECT (res)
// ************************************************************

// 📌 Định nghĩa:
// - res.json(data)        → Trả JSON response
// - res.send(data)        → Trả text/html/buffer
// - res.status(code)      → Set HTTP status code
// - res.redirect(url)     → Chuyển hướng
// - res.render(view, data)→ Render template (cần view engine)
// - res.sendFile(path)    → Gửi file
// - res.set(header, value)→ Set response header
// - res.cookie(name, val) → Set cookie

// 📌 HTTP Status Codes phổ biến:
// 200 OK | 201 Created | 204 No Content
// 301 Moved Permanently | 302 Found (redirect)
// 400 Bad Request | 401 Unauthorized | 403 Forbidden | 404 Not Found
// 500 Internal Server Error

// 🏋️ BÀI TẬP 3.1: Response helpers
// Gợi ý: Tạo các response helper functions

// const sendSuccess = (res, data, statusCode = 200) => {
//   res.status(statusCode).json({ success: true, data });
// };

// const sendError = (res, message, statusCode = 500) => {
//   res.status(statusCode).json({ success: false, error: message });
// };

// app.get("/api/test-response", (req, res) => {
//   sendSuccess(res, { name: "Test" }, 200);
// });


// ************************************************************
// PHẦN 4: MIDDLEWARE
// ************************************************************

// 📌 Định nghĩa:
// Middleware = hàm có quyền truy cập req, res, next
// Chạy TUẦN TỰ: request → middleware1 → middleware2 → route handler → response
// - next(): chuyển sang middleware/route tiếp theo
// - Không gọi next() → request bị "treo"
// Loại: Application-level, Router-level, Error-handling, Built-in, Third-party

// 🏋️ BÀI TẬP 4.1: Logger Middleware
// Gợi ý: Log method, path, thời gian xử lý

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  console.log(`📨 ${req.method} ${req.path}`);

  // Ghi log sau khi response
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.path} → ${res.statusCode} (${duration}ms)`);
  });

  next(); // ← QUAN TRỌNG: phải gọi next()!
};
app.use(loggerMiddleware);


// 🏋️ BÀI TẬP 4.2: Auth Middleware
// Gợi ý: Kiểm tra token trong header Authorization

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
//
//   if (!token) {
//     return res.status(401).json({ error: "Chưa đăng nhập" });
//   }
//
//   // Giả lập verify token
//   if (token === "valid-token-123") {
//     req.user = { id: 1, name: "Admin", role: "admin" }; // Gắn user vào req
//     next();
//   } else {
//     res.status(401).json({ error: "Token không hợp lệ" });
//   }
// };

// // Áp dụng cho route cụ thể:
// app.get("/api/protected", authMiddleware, (req, res) => {
//   res.json({ message: `Xin chào ${req.user.name}!`, user: req.user });
// });


// 🏋️ BÀI TẬP 4.3: Validation Middleware
// Gợi ý: Tạo middleware factory validate body

// function validateBody(schema) {
//   return (req, res, next) => {
//     const errors = [];
//     for (const [field, rules] of Object.entries(schema)) {
//       if (rules.required && !req.body[field]) {
//         errors.push(`${field} là bắt buộc`);
//       }
//       if (rules.minLength && req.body[field]?.length < rules.minLength) {
//         errors.push(`${field} phải có ít nhất ${rules.minLength} ký tự`);
//       }
//       if (rules.type && typeof req.body[field] !== rules.type) {
//         errors.push(`${field} phải là kiểu ${rules.type}`);
//       }
//     }
//     if (errors.length > 0) {
//       return res.status(400).json({ errors });
//     }
//     next();
//   };
// }

// // Sử dụng:
// const userSchema = {
//   username: { required: true, minLength: 3, type: "string" },
//   email: { required: true, type: "string" },
//   password: { required: true, minLength: 6, type: "string" },
// };
// app.post("/api/users", validateBody(userSchema), (req, res) => {
//   res.status(201).json({ message: "User created", data: req.body });
// });


// 🏋️ BÀI TẬP 4.4: Rate Limiting Middleware
// 📌 Giới hạn số request trong khoảng thời gian

// function rateLimiter(maxRequests, windowMs) {
//   const requests = new Map(); // IP → { count, resetTime }
//
//   return (req, res, next) => {
//     const ip = req.ip;
//     const now = Date.now();
//     const record = requests.get(ip);
//
//     if (!record || now > record.resetTime) {
//       requests.set(ip, { count: 1, resetTime: now + windowMs });
//       return next();
//     }
//
//     if (record.count >= maxRequests) {
//       return res.status(429).json({ error: "Quá nhiều request, vui lòng thử lại sau" });
//     }
//
//     record.count++;
//     next();
//   };
// }
// // app.use("/api", rateLimiter(100, 15 * 60 * 1000)); // 100 req / 15 phút


// ************************************************************
// PHẦN 5: ROUTER (Tổ chức routes)
// ************************************************************

// 📌 Định nghĩa:
// - express.Router(): tạo mini-app, nhóm routes liên quan
// - Tách routes ra file riêng → code sạch, dễ quản lý
// - app.use("/prefix", router): mount router vào prefix

// 🏋️ BÀI TẬP 5.1: Tạo Router cho Products

const productRouter = express.Router();

// Giả lập database
let products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "MacBook Pro", price: 2499, category: "laptop" },
  { id: 3, name: "AirPods Pro", price: 249, category: "accessory" },
];

productRouter.get("/", (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;
  let result = [...products];

  if (category) result = result.filter((p) => p.category === category);
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));
  if (search)
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  res.json({ count: result.length, data: result });
});

productRouter.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Không tìm thấy" });
  res.json({ data: product });
});

// 🏋️ BÀI TẬP: Hoàn thành POST, PUT, DELETE cho productRouter
// productRouter.post("/", (req, res) => { ??? });
// productRouter.put("/:id", (req, res) => { ??? });
// productRouter.delete("/:id", (req, res) => { ??? });

app.use("/api/products", productRouter);


// ************************************************************
// PHẦN 6: ERROR HANDLING
// ************************************************************

// 📌 Định nghĩa:
// - Error middleware có 4 params: (err, req, res, next)
// - PHẢI đặt SAU tất cả routes
// - Dùng next(error) để chuyển lỗi đến error handler
// - Custom Error class để phân biệt loại lỗi

// 🏋️ BÀI TẬP 6.1: Custom Error Class

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Lỗi dự đoán được
  }
}

// 🏋️ BÀI TẬP 6.2: Async Error Wrapper
// 📌 Tránh try-catch lặp lại trong mỗi route

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Sử dụng:
app.get(
  "/api/error-test",
  asyncHandler(async (req, res) => {
    // Giả lập async operation có thể lỗi
    const data = null;
    if (!data) throw new AppError("Không tìm thấy dữ liệu", 404);
    res.json(data);
  })
);

// 🏋️ BÀI TẬP 6.3: Global Error Handler
// Gợi ý: Đặt SAU tất cả routes

// const globalErrorHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.isOperational ? err.message : "Lỗi server nội bộ";
//
//   console.error("❌ Error:", err.message);
//
//   res.status(statusCode).json({
//     success: false,
//     error: message,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// };

// 🏋️ BÀI TẬP 6.4: 404 Handler
// Gợi ý: Đặt SAU tất cả routes, TRƯỚC error handler

// app.use("*", (req, res) => {
//   res.status(404).json({ error: `Route ${req.originalUrl} không tồn tại` });
// });
// app.use(globalErrorHandler);


// ************************************************************
// PHẦN 7: MVC PATTERN (Model-View-Controller)
// ************************************************************

// 📌 Định nghĩa:
// - Model: quản lý data & business logic (database)
// - View: hiển thị (JSON response cho API, template cho web)
// - Controller: xử lý request, gọi model, trả response
// - Service Layer: (optional) business logic phức tạp giữa Controller & Model

// 📌 Cấu trúc thư mục chuẩn:
// project/
// ├── controllers/     ← Xử lý req/res
// │   ├── userController.js
// │   └── productController.js
// ├── models/          ← Schema & database
// │   ├── User.js
// │   └── Product.js
// ├── routes/          ← Định nghĩa routes
// │   ├── userRoutes.js
// │   └── productRoutes.js
// ├── middleware/       ← Custom middleware
// │   ├── auth.js
// │   └── validate.js
// ├── services/        ← Business logic
// ├── utils/           ← Helper functions
// ├── config/          ← Cấu hình (db, env)
// ├── app.js           ← Express setup
// └── server.js        ← Khởi động server

// 🏋️ BÀI TẬP 7.1: Tách code theo MVC
// Gợi ý: Viết controller tách biệt khỏi route

// --- controllers/userController.js ---
const userController = {
  getAll: asyncHandler(async (req, res) => {
    // const users = await User.find(); // Mongoose
    const users = [
      { id: 1, name: "An" },
      { id: 2, name: "Binh" },
    ];
    res.json({ success: true, count: users.length, data: users });
  }),

  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const user = await User.findById(id);
    const user = { id: Number(id), name: "Test User" };
    if (!user) throw new AppError("User không tồn tại", 404);
    res.json({ success: true, data: user });
  }),

  create: asyncHandler(async (req, res) => {
    // const user = await User.create(req.body);
    res.status(201).json({ success: true, data: req.body });
  }),

  // 🏋️ BÀI TẬP: Thêm update và delete methods
};

// --- routes/userRoutes.js ---
const userRouter = express.Router();
userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.post("/", userController.create);
app.use("/api/users", userRouter);


// ************************************************************
// PHẦN 8: MONGODB + MONGOOSE (Khái niệm)
// ************************************************************

// 📌 Định nghĩa:
// - MongoDB: NoSQL database, lưu dữ liệu dạng document (JSON-like)
// - Mongoose: ODM (Object Data Modeling) cho MongoDB
// - Schema: định nghĩa cấu trúc document
// - Model: interface để tương tác với collection

// 🏋️ BÀI TẬP 8.1: Mongoose Schema (code mẫu, cần npm install mongoose)

// const mongoose = require("mongoose");
//
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Username bắt buộc"],
//     unique: true,
//     trim: true,
//     minlength: [3, "Ít nhất 3 ký tự"],
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/\S+@\S+\.\S+/, "Email không hợp lệ"],
//   },
//   password: { type: String, required: true, select: false }, // Ẩn khi query
//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   createdAt: { type: Date, default: Date.now },
// });
//
// // Middleware (hooks)
// userSchema.pre("save", async function (next) {
//   // if (!this.isModified("password")) return next();
//   // this.password = await bcrypt.hash(this.password, 12);
//   next();
// });
//
// // Instance method
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   // return bcrypt.compare(candidatePassword, this.password);
// };
//
// // Static method
// userSchema.statics.findByEmail = function (email) {
//   return this.findOne({ email });
// };
//
// const User = mongoose.model("User", userSchema);

// 🏋️ BÀI TẬP 8.2: CRUD với Mongoose
// Gợi ý: Các phương thức Mongoose phổ biến

// // CREATE
// const newUser = await User.create({ username: "an", email: "an@test.com" });
//
// // READ
// const users = await User.find();                          // Tất cả
// const user = await User.findById(id);                     // Theo ID
// const user = await User.findOne({ email: "an@test.com" }); // Theo điều kiện
//
// // UPDATE
// const updated = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
//
// // DELETE
// await User.findByIdAndDelete(id);
//
// // QUERY CHAINING
// const result = await User.find({ role: "user" })
//   .select("username email")    // Chọn fields
//   .sort("-createdAt")          // Sắp xếp
//   .limit(10)                   // Giới hạn
//   .skip(20);                   // Bỏ qua (pagination)


// ************************************************************
// PHẦN 9: AUTHENTICATION (JWT)
// ************************************************************

// 📌 Định nghĩa:
// - JWT (JSON Web Token): token chứa thông tin user, tự xác thực
// - Cấu trúc: header.payload.signature (Base64 encoded)
// - Access Token: ngắn hạn (15m-1h), dùng cho API calls
// - Refresh Token: dài hạn (7d-30d), dùng để lấy access token mới
// - Cài đặt: npm install jsonwebtoken bcryptjs

// 🏋️ BÀI TẬP 9.1: Auth flow (pseudo code)

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const JWT_SECRET = "your-secret-key"; // ⚠️ Dùng env variable!
//
// // Đăng ký
// const register = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 12);
//   // const user = await User.create({ username, email, password: hashedPassword });
//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//   res.status(201).json({ token, user: { username, email } });
// });
//
// // Đăng nhập
// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   // const user = await User.findOne({ email }).select("+password");
//   // if (!user || !(await bcrypt.compare(password, user.password))) {
//   //   throw new AppError("Email hoặc mật khẩu sai", 401);
//   // }
//   const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token });
// });
//
// // Protect middleware
// const protect = asyncHandler(async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) throw new AppError("Chưa đăng nhập", 401);
//   const decoded = jwt.verify(token, JWT_SECRET);
//   // req.user = await User.findById(decoded.id);
//   next();
// });
//
// // Authorize (phân quyền)
// const authorize = (...roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role)) {
//     throw new AppError("Không có quyền truy cập", 403);
//   }
//   next();
// };
//
// // Sử dụng:
// // app.delete("/api/users/:id", protect, authorize("admin"), userController.delete);


// ************************************************************
// PHẦN 10: BÀI TOÁN THỰC TẾ
// ************************************************************

// 🏋️ BÀI TOÁN 10.1: Pagination Helper
// 📌 Phân trang cho API response

// function paginate(query, page = 1, limit = 10) {
//   const skip = (page - 1) * limit;
//   return {
//     query: query.skip(skip).limit(limit),
//     pagination: {
//       page: Number(page),
//       limit: Number(limit),
//       // totalPages, totalItems tính từ count
//     },
//   };
// }

app.get("/api/paginated", (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const allItems = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);
  const items = allItems.slice(startIndex, endIndex);

  res.json({
    data: items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: allItems.length,
      totalPages: Math.ceil(allItems.length / limit),
      hasNext: endIndex < allItems.length,
      hasPrev: startIndex > 0,
    },
  });
});


// 🏋️ BÀI TOÁN 10.2: File Upload (cần multer)
// 📌 npm install multer

// const multer = require("multer");
// const path = require("path");
//
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });
//
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Chỉ chấp nhận file ảnh (jpg, png, gif)", 400), false);
//   }
// };
//
// const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
//
// app.post("/api/upload", upload.single("avatar"), (req, res) => {
//   res.json({ message: "Upload thành công", file: req.file });
// });


// 🏋️ BÀI TOÁN 10.3: CORS Configuration
// 📌 npm install cors

// const cors = require("cors");
// app.use(cors({
//   origin: ["http://localhost:3001", "https://myapp.com"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true, // Cho phép cookies
// }));

// Hoặc tự viết CORS middleware:
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") return res.sendStatus(200);
//   next();
// });


// 🏋️ BÀI TOÁN 10.4: API Response Caching (đơn giản)
// 📌 Cache in-memory cho response

// function cacheMiddleware(duration) {
//   const cache = new Map();
//   return (req, res, next) => {
//     const key = req.originalUrl;
//     const cached = cache.get(key);
//
//     if (cached && Date.now() - cached.timestamp < duration * 1000) {
//       return res.json(cached.data);
//     }
//
//     // Override res.json để cache response
//     const originalJson = res.json.bind(res);
//     res.json = (data) => {
//       cache.set(key, { data, timestamp: Date.now() });
//       originalJson(data);
//     };
//     next();
//   };
// }
// // app.get("/api/expensive", cacheMiddleware(60), handler); // Cache 60 giây


// 🏋️ BÀI TOÁN 10.5: Graceful Shutdown
// 📌 Đóng server đúng cách khi nhận signal

// const server = app.listen(PORT, () => {
//   console.log(`Server chạy tại http://localhost:${PORT}`);
// });
//
// process.on("SIGTERM", () => {
//   console.log("SIGTERM received. Đang đóng server...");
//   server.close(() => {
//     // mongoose.connection.close();
//     console.log("Server đã đóng.");
//     process.exit(0);
//   });
// });

// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err.message);
//   server.close(() => process.exit(1));
// });


// ************************************************************
// PHẦN 11: SECURITY BEST PRACTICES
// ************************************************************

// 📌 Các package bảo mật nên dùng:
// - helmet: set security HTTP headers
// - express-rate-limit: rate limiting
// - express-mongo-sanitize: chống NoSQL injection
// - xss-clean: chống XSS
// - hpp: chống HTTP parameter pollution
// - cors: Cross-Origin Resource Sharing

// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");
//
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// 📌 Checklist bảo mật:
// [ ] Dùng HTTPS
// [ ] Hash passwords (bcrypt, argon2)
// [ ] JWT secret trong env variable
// [ ] Validate & sanitize input
// [ ] Rate limiting
// [ ] CORS cho phép đúng origin
// [ ] Helmet cho HTTP headers
// [ ] Không expose stack trace ở production


// ************************************************************
// PHẦN 12: ENVIRONMENT & DEPLOYMENT
// ************************************************************

// 📌 Định nghĩa:
// - dotenv: đọc biến môi trường từ file .env
// - process.env: truy cập biến môi trường
// - NODE_ENV: development / production / test

// require("dotenv").config();
//
// const config = {
//   port: process.env.PORT || 3000,
//   mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/mydb",
//   jwtSecret: process.env.JWT_SECRET || "fallback-secret",
//   nodeEnv: process.env.NODE_ENV || "development",
// };

// 📌 .env file example:
// PORT=3000
// MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
// JWT_SECRET=super-secret-key-here
// NODE_ENV=development


// ============================================================
// 🚀 KHỞI ĐỘNG SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📝 Test: GET http://localhost:${PORT}/api/products`);
  console.log(`📝 Test: GET http://localhost:${PORT}/api/users/1/posts?page=2&limit=5`);
  console.log(`📝 Test: GET http://localhost:${PORT}/api/paginated?page=2&limit=5`);
});


// ============================================================
// 🎯 TỔNG KẾT EXPRESS.JS
// ============================================================
// Thứ tự học:
// 1. Server cơ bản → Routes → HTTP methods
// 2. Request/Response → Middleware
// 3. Router → MVC Pattern → Cấu trúc project
// 4. MongoDB + Mongoose → CRUD
// 5. Authentication (JWT + bcrypt)
// 6. Error Handling → Validation
// 7. Security → Deployment
// 8. Bài toán: Pagination, Upload, CORS, Caching
//
// 📚 Tài liệu:
// - Express: https://expressjs.com/
// - Mongoose: https://mongoosejs.com/
// ============================================================
