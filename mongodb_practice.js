// ============================================================
// 🚀 MONGODB ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
// ============================================================
// MongoDB: NoSQL database, lưu dữ liệu dạng document (BSON/JSON-like)
// Cài đặt MongoDB: https://www.mongodb.com/try/download/community
// Hoặc dùng MongoDB Atlas (cloud): https://www.mongodb.com/atlas
// Test queries: MongoDB Shell (mongosh) hoặc MongoDB Compass
// ============================================================
// File này dùng cú pháp MongoDB Shell (mongosh).
// Bạn có thể paste trực tiếp vào mongosh hoặc Compass để chạy.
// ============================================================


// ************************************************************
// PHẦN 1: KHÁI NIỆM CƠ BẢN
// ************************************************************

// 📌 Định nghĩa:
// - Database    → Tương đương database trong SQL
// - Collection  → Tương đương table trong SQL
// - Document    → Tương đương row/record trong SQL (dạng JSON)
// - Field       → Tương đương column trong SQL
// - _id         → Primary key tự động (ObjectId)
// - BSON        → Binary JSON, format lưu trữ nội bộ của MongoDB

// 📌 So sánh SQL vs MongoDB:
// SQL                  | MongoDB
// -----------------------------------------
// Database             | Database
// Table                | Collection
// Row                  | Document
// Column               | Field
// PRIMARY KEY          | _id (ObjectId)
// JOIN                 | $lookup (aggregation) hoặc populate (Mongoose)
// GROUP BY             | $group (aggregation)
// SELECT * FROM users  | db.users.find()
// INSERT INTO          | db.users.insertOne()


// ************************************************************
// PHẦN 2: CÁC LỆNH CƠ BẢN (Database & Collection)
// ************************************************************

// 📌 Quản lý Database:
// show dbs                       → Xem tất cả databases
// use myDatabase                 → Chuyển sang / tạo database
// db                             → Xem database hiện tại
// db.dropDatabase()              → Xóa database hiện tại

// 📌 Quản lý Collection:
// show collections               → Xem tất cả collections
// db.createCollection("users")   → Tạo collection
// db.users.drop()                → Xóa collection

// 🏋️ BÀI TẬP 2.1: Tạo database và collection
// use practiceDB
// db.createCollection("students")
// db.createCollection("courses")
// db.createCollection("enrollments")


// ************************************************************
// PHẦN 3: CRUD OPERATIONS
// ************************************************************

// ═══════════════════════════════════════════
// 3.1: CREATE (Insert)
// ═══════════════════════════════════════════

// 📌 Phương thức:
// insertOne(document)        → Thêm 1 document
// insertMany([doc1, doc2])   → Thêm nhiều documents

// 🏋️ BÀI TẬP 3.1: Insert dữ liệu mẫu

// db.students.insertOne({
//   name: "Nguyen Van An",
//   age: 20,
//   email: "an@example.com",
//   gpa: 3.5,
//   skills: ["JavaScript", "React", "Node.js"],
//   address: { city: "HCM", district: "Quan 1" },
//   isActive: true,
//   createdAt: new Date()
// })

// db.students.insertMany([
//   { name: "Tran Thi Binh", age: 22, email: "binh@example.com", gpa: 3.8, skills: ["Python", "Django"], address: { city: "HN", district: "Cau Giay" }, isActive: true, createdAt: new Date() },
//   { name: "Le Van Chi", age: 21, email: "chi@example.com", gpa: 2.9, skills: ["Java", "Spring"], address: { city: "HCM", district: "Quan 7" }, isActive: false, createdAt: new Date() },
//   { name: "Pham Thi Dung", age: 23, email: "dung@example.com", gpa: 3.2, skills: ["JavaScript", "Vue"], address: { city: "DN", district: "Hai Chau" }, isActive: true, createdAt: new Date() },
//   { name: "Hoang Van Em", age: 19, email: "em@example.com", gpa: 3.9, skills: ["C++", "Python", "AI"], address: { city: "HCM", district: "Thu Duc" }, isActive: true, createdAt: new Date() },
//   { name: "Vo Thi Fen", age: 24, email: "fen@example.com", gpa: 2.5, skills: ["PHP", "Laravel"], address: { city: "HN", district: "Dong Da" }, isActive: false, createdAt: new Date() },
// ])


// ═══════════════════════════════════════════
// 3.2: READ (Find / Query)
// ═══════════════════════════════════════════

// 📌 Phương thức:
// find(filter, projection)      → Tìm nhiều documents
// findOne(filter)               → Tìm 1 document
// countDocuments(filter)        → Đếm documents
// distinct(field)               → Lấy giá trị unique

// 🏋️ BÀI TẬP 3.2a: Truy vấn cơ bản

// db.students.find()                           // Tất cả
// db.students.find({ isActive: true })          // Lọc theo field
// db.students.findOne({ email: "an@example.com" }) // Tìm 1
// db.students.find({ "address.city": "HCM" })  // Nested field (dot notation)
// db.students.find({ skills: "JavaScript" })    // Phần tử trong mảng

// 🏋️ BÀI TẬP 3.2b: Projection (chọn fields trả về)

// db.students.find({}, { name: 1, email: 1, _id: 0 })
// // 1 = hiển thị, 0 = ẩn. Không trộn 1 và 0 (trừ _id)

// 🏋️ BÀI TẬP 3.2c: Sorting, Limiting, Skipping

// db.students.find().sort({ gpa: -1 })          // Sắp xếp giảm dần
// db.students.find().sort({ name: 1 })           // Sắp xếp tăng dần
// db.students.find().limit(3)                     // Lấy 3 documents
// db.students.find().skip(2).limit(2)             // Phân trang: skip 2, lấy 2
// db.students.find().sort({ gpa: -1 }).limit(1)  // Top 1 GPA cao nhất


// ═══════════════════════════════════════════
// 3.3: COMPARISON OPERATORS (Toán tử so sánh)
// ═══════════════════════════════════════════

// 📌 Operators:
// $eq  : bằng           | $ne  : không bằng
// $gt  : lớn hơn        | $gte : lớn hơn hoặc bằng
// $lt  : nhỏ hơn        | $lte : nhỏ hơn hoặc bằng
// $in  : nằm trong mảng | $nin : không nằm trong mảng

// 🏋️ BÀI TẬP 3.3: Truy vấn với operators

// db.students.find({ age: { $gte: 20, $lte: 23 } })         // 20 <= age <= 23
// db.students.find({ gpa: { $gt: 3.0 } })                   // GPA > 3.0
// db.students.find({ "address.city": { $in: ["HCM", "HN"] } }) // Ở HCM hoặc HN
// db.students.find({ skills: { $in: ["JavaScript", "Python"] } }) // Biết JS hoặc Python
// db.students.find({ gpa: { $ne: 3.5 } })                   // GPA khác 3.5


// ═══════════════════════════════════════════
// 3.4: LOGICAL OPERATORS (Toán tử logic)
// ═══════════════════════════════════════════

// 📌 Operators:
// $and : VÀ (mặc định khi có nhiều điều kiện)
// $or  : HOẶC
// $not : PHỦ ĐỊNH
// $nor : KHÔNG thuộc bất kỳ

// 🏋️ BÀI TẬP 3.4: Truy vấn logic

// // $and (ngầm định)
// db.students.find({ isActive: true, gpa: { $gte: 3.0 } })

// // $and (tường minh - cần khi cùng field)
// db.students.find({ $and: [{ gpa: { $gte: 3.0 } }, { gpa: { $lte: 3.8 } }] })

// // $or
// db.students.find({ $or: [{ "address.city": "HCM" }, { gpa: { $gte: 3.5 } }] })

// // Kết hợp: Active VÀ (ở HCM HOẶC GPA >= 3.5)
// db.students.find({
//   isActive: true,
//   $or: [{ "address.city": "HCM" }, { gpa: { $gte: 3.5 } }]
// })


// ═══════════════════════════════════════════
// 3.5: ELEMENT & ARRAY OPERATORS
// ═══════════════════════════════════════════

// 📌 Element Operators:
// $exists : field có tồn tại hay không
// $type   : kiểu dữ liệu của field

// 📌 Array Operators:
// $all       : mảng chứa TẤT CẢ phần tử
// $elemMatch : phần tử mảng thỏa mãn TẤT CẢ điều kiện
// $size      : kích thước mảng

// 🏋️ BÀI TẬP 3.5:

// db.students.find({ phone: { $exists: false } })       // Không có field phone
// db.students.find({ skills: { $all: ["JavaScript", "React"] } }) // Biết CẢ JS và React
// db.students.find({ skills: { $size: 3 } })            // Có đúng 3 skills
// db.students.find({ age: { $type: "number" } })        // age là số


// ═══════════════════════════════════════════
// 3.6: UPDATE
// ═══════════════════════════════════════════

// 📌 Phương thức:
// updateOne(filter, update)     → Cập nhật 1 document
// updateMany(filter, update)    → Cập nhật nhiều documents
// replaceOne(filter, newDoc)    → Thay thế toàn bộ document
// findOneAndUpdate(filter, update, options) → Tìm, cập nhật, trả về

// 📌 Update Operators:
// $set     : gán giá trị mới
// $unset   : xóa field
// $inc     : tăng/giảm giá trị số
// $push    : thêm phần tử vào mảng
// $pull    : xóa phần tử khỏi mảng
// $addToSet: thêm vào mảng nếu chưa có (unique)
// $rename  : đổi tên field
// $min/$max: cập nhật nếu giá trị mới nhỏ/lớn hơn
// $mul     : nhân giá trị

// 🏋️ BÀI TẬP 3.6: Các loại update

// // $set - Cập nhật field
// db.students.updateOne(
//   { name: "Nguyen Van An" },
//   { $set: { age: 21, "address.district": "Quan 3" } }
// )

// // $inc - Tăng/giảm giá trị
// db.students.updateMany({}, { $inc: { age: 1 } })  // Tăng tuổi tất cả lên 1

// // $push - Thêm vào mảng
// db.students.updateOne(
//   { name: "Nguyen Van An" },
//   { $push: { skills: "MongoDB" } }
// )

// // $pull - Xóa khỏi mảng
// db.students.updateOne(
//   { name: "Nguyen Van An" },
//   { $pull: { skills: "React" } }
// )

// // $addToSet - Thêm unique
// db.students.updateOne(
//   { name: "Nguyen Van An" },
//   { $addToSet: { skills: { $each: ["Docker", "AWS"] } } }
// )

// // $unset - Xóa field
// db.students.updateOne({ name: "Nguyen Van An" }, { $unset: { phone: "" } })

// // $rename - Đổi tên field
// db.students.updateMany({}, { $rename: { "name": "fullName" } })

// // Upsert: Nếu không tìm thấy → insert mới
// db.students.updateOne(
//   { email: "new@example.com" },
//   { $set: { name: "New Student", age: 20 } },
//   { upsert: true }
// )


// ═══════════════════════════════════════════
// 3.7: DELETE
// ═══════════════════════════════════════════

// 📌 Phương thức:
// deleteOne(filter)    → Xóa 1 document
// deleteMany(filter)   → Xóa nhiều documents

// db.students.deleteOne({ email: "fen@example.com" })
// db.students.deleteMany({ isActive: false })
// db.students.deleteMany({})  // ⚠️ XÓA TẤT CẢ documents!


// ************************************************************
// PHẦN 4: INDEXING (Đánh chỉ mục)
// ************************************************************

// 📌 Định nghĩa:
// - Index giúp MongoDB tìm kiếm nhanh hơn (giống mục lục sách)
// - Không có index → MongoDB phải quét toàn bộ collection (COLLSCAN)
// - Có index → MongoDB dùng index scan (IXSCAN) → nhanh hơn nhiều
// - Trade-off: index tốn bộ nhớ và chậm hơn khi write

// 📌 Loại index:
// Single Field    : { field: 1 }           → 1 field
// Compound        : { field1: 1, field2: -1 } → nhiều fields
// Multikey        : tự động cho array field
// Text            : { field: "text" }      → full-text search
// TTL             : tự xóa document sau N giây
// Unique          : không cho phép giá trị trùng
// Partial         : chỉ index documents thỏa điều kiện

// 🏋️ BÀI TẬP 4.1: Tạo và quản lý Index

// // Tạo index
// db.students.createIndex({ email: 1 }, { unique: true })    // Unique index
// db.students.createIndex({ gpa: -1 })                       // Descending index
// db.students.createIndex({ "address.city": 1, gpa: -1 })   // Compound index
// db.students.createIndex({ name: "text", skills: "text" })  // Text index
// db.students.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 }) // TTL: 24h

// // Xem indexes
// db.students.getIndexes()

// // Xóa index
// db.students.dropIndex("email_1")
// db.students.dropIndexes()  // Xóa tất cả (trừ _id)

// // Explain: kiểm tra query dùng index hay không
// db.students.find({ email: "an@example.com" }).explain("executionStats")
// // Xem: winningPlan.stage → IXSCAN (tốt) hay COLLSCAN (chậm)


// ************************************************************
// PHẦN 5: AGGREGATION PIPELINE
// ************************************************************

// 📌 Định nghĩa:
// Aggregation = "đường ống" xử lý dữ liệu qua nhiều stages
// Luồng: document → stage1 → stage2 → ... → kết quả
// Mạnh hơn find(), dùng cho: thống kê, nhóm, biến đổi, join

// 📌 Các stages phổ biến:
// $match    : lọc documents (giống find)
// $group    : nhóm theo field, tính toán aggregate
// $sort     : sắp xếp
// $project  : chọn/biến đổi fields (giống projection)
// $limit    : giới hạn số lượng
// $skip     : bỏ qua N documents
// $unwind   : tách mảng thành nhiều documents
// $lookup   : JOIN với collection khác
// $addFields: thêm fields mới
// $count    : đếm
// $out      : ghi kết quả vào collection mới

// 📌 Accumulator operators (dùng trong $group):
// $sum, $avg, $min, $max, $first, $last, $push, $addToSet

// 🏋️ BÀI TẬP 5.1: $match + $group

// // Đếm sinh viên theo thành phố
// db.students.aggregate([
//   { $match: { isActive: true } },
//   { $group: { _id: "$address.city", count: { $sum: 1 }, avgGPA: { $avg: "$gpa" } } },
//   { $sort: { avgGPA: -1 } }
// ])


// 🏋️ BÀI TẬP 5.2: $unwind

// // Đếm số lần mỗi skill xuất hiện
// db.students.aggregate([
//   { $unwind: "$skills" },
//   { $group: { _id: "$skills", count: { $sum: 1 } } },
//   { $sort: { count: -1 } }
// ])


// 🏋️ BÀI TẬP 5.3: $project + $addFields

// // Thêm field xếp loại dựa trên GPA
// db.students.aggregate([
//   { $addFields: {
//     xepLoai: {
//       $switch: {
//         branches: [
//           { case: { $gte: ["$gpa", 3.6] }, then: "Gioi" },
//           { case: { $gte: ["$gpa", 3.0] }, then: "Kha" },
//           { case: { $gte: ["$gpa", 2.0] }, then: "Trung Binh" },
//         ],
//         default: "Yeu"
//       }
//     },
//     soSkill: { $size: "$skills" }
//   }},
//   { $project: { name: 1, gpa: 1, xepLoai: 1, soSkill: 1 } }
// ])


// 🏋️ BÀI TẬP 5.4: $lookup (JOIN)

// // Giả sử có collection "courses"
// // db.courses.insertMany([
// //   { _id: "CS101", name: "Intro to CS", credits: 3 },
// //   { _id: "CS201", name: "Data Structures", credits: 4 },
// //   { _id: "CS301", name: "Databases", credits: 3 },
// // ])
// // db.enrollments.insertMany([
// //   { studentEmail: "an@example.com", courseId: "CS101", grade: "A" },
// //   { studentEmail: "an@example.com", courseId: "CS201", grade: "B+" },
// //   { studentEmail: "binh@example.com", courseId: "CS301", grade: "A" },
// // ])

// // JOIN enrollments với courses
// db.enrollments.aggregate([
//   { $lookup: {
//     from: "courses",
//     localField: "courseId",
//     foreignField: "_id",
//     as: "courseInfo"
//   }},
//   { $unwind: "$courseInfo" },
//   { $project: {
//     studentEmail: 1,
//     courseName: "$courseInfo.name",
//     grade: 1,
//     credits: "$courseInfo.credits"
//   }}
// ])


// 🏋️ BÀI TẬP 5.5: Thống kê nâng cao

// // Top 3 thành phố có nhiều sinh viên active nhất, GPA trung bình cao nhất
// db.students.aggregate([
//   { $match: { isActive: true } },
//   { $group: {
//     _id: "$address.city",
//     totalStudents: { $sum: 1 },
//     avgGPA: { $avg: "$gpa" },
//     maxGPA: { $max: "$gpa" },
//     minGPA: { $min: "$gpa" },
//     allStudents: { $push: "$name" }
//   }},
//   { $sort: { totalStudents: -1, avgGPA: -1 } },
//   { $limit: 3 },
//   { $project: {
//     city: "$_id", _id: 0,
//     totalStudents: 1,
//     avgGPA: { $round: ["$avgGPA", 2] },
//     maxGPA: 1, minGPA: 1,
//     allStudents: 1
//   }}
// ])


// ************************************************************
// PHẦN 6: MONGOOSE SCHEMA & VALIDATION
// ************************************************************

// 📌 Mongoose là ODM (Object Data Modeling) cho MongoDB + Node.js
// Cài đặt: npm install mongoose

// 🏋️ BÀI TẬP 6.1: Schema với validation phức tạp

// const mongoose = require("mongoose");
//
// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Tên bắt buộc"],
//     trim: true,
//     minlength: [2, "Tên ít nhất 2 ký tự"],
//     maxlength: [50, "Tên tối đa 50 ký tự"],
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     validate: {
//       validator: (v) => /\S+@\S+\.\S+/.test(v),
//       message: (props) => `${props.value} không phải email hợp lệ!`,
//     },
//   },
//   age: { type: Number, min: 16, max: 60 },
//   gpa: { type: Number, min: 0, max: 4.0 },
//   role: { type: String, enum: ["student", "ta", "instructor"], default: "student" },
//   skills: [{ type: String }],
//   address: {
//     city: String,
//     district: String,
//   },
//   isActive: { type: Boolean, default: true },
// }, {
//   timestamps: true,                // Tự thêm createdAt, updatedAt
//   toJSON: { virtuals: true },      // Include virtuals khi toJSON
// });
//
// // Virtual field (không lưu trong DB)
// studentSchema.virtual("profileUrl").get(function () {
//   return `/students/${this._id}`;
// });
//
// // Pre-save middleware
// studentSchema.pre("save", function (next) {
//   console.log(`Đang lưu student: ${this.name}`);
//   next();
// });
//
// // Post-save middleware
// studentSchema.post("save", function (doc) {
//   console.log(`Đã lưu student: ${doc.name}`);
// });
//
// // Instance method
// studentSchema.methods.getSummary = function () {
//   return `${this.name} - GPA: ${this.gpa} - ${this.address.city}`;
// };
//
// // Static method
// studentSchema.statics.findByCity = function (city) {
//   return this.find({ "address.city": city });
// };
//
// // Query helper
// studentSchema.query.active = function () {
//   return this.where({ isActive: true });
// };
//
// const Student = mongoose.model("Student", studentSchema);


// ************************************************************
// PHẦN 7: MONGOOSE QUERIES NÂNG CAO
// ************************************************************

// 🏋️ BÀI TẬP 7.1: Populate (thay cho JOIN)

// // Schema với reference
// const courseSchema = new mongoose.Schema({
//   name: String,
//   instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
// });
//
// // Populate khi query
// // const course = await Course.findById(id)
// //   .populate("instructor", "name email")     // Chỉ lấy name, email
// //   .populate("students", "name gpa");         // Chỉ lấy name, gpa

// 🏋️ BÀI TẬP 7.2: Pagination helper

// async function paginate(Model, filter = {}, options = {}) {
//   const { page = 1, limit = 10, sort = "-createdAt", select, populate } = options;
//   const skip = (page - 1) * limit;
//
//   let query = Model.find(filter).sort(sort).skip(skip).limit(limit);
//   if (select) query = query.select(select);
//   if (populate) query = query.populate(populate);
//
//   const [data, total] = await Promise.all([
//     query.exec(),
//     Model.countDocuments(filter),
//   ]);
//
//   return {
//     data,
//     pagination: {
//       page, limit, total,
//       totalPages: Math.ceil(total / limit),
//       hasNext: page * limit < total,
//       hasPrev: page > 1,
//     },
//   };
// }

// 🏋️ BÀI TẬP 7.3: Transaction (ACID)
// 📌 Đảm bảo nhiều operations thành công hoặc thất bại cùng nhau

// async function transferCredits(fromId, toId, amount) {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     await Student.updateOne({ _id: fromId }, { $inc: { credits: -amount } }, { session });
//     await Student.updateOne({ _id: toId }, { $inc: { credits: amount } }, { session });
//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }
// }


// ************************************************************
// PHẦN 8: DATA MODELING PATTERNS
// ************************************************************

// 📌 Hai chiến lược chính:
// 1. Embedding (nhúng): lưu data con bên trong document cha
//    → Đọc nhanh, phù hợp quan hệ 1:few
// 2. Referencing (tham chiếu): lưu ObjectId, dùng populate
//    → Linh hoạt, phù hợp quan hệ 1:many, many:many

// 🏋️ BÀI TẬP 8.1: Embedding vs Referencing

// // ✅ Embedding: User có vài địa chỉ (1:few)
// const userWithAddresses = {
//   name: "An",
//   addresses: [
//     { type: "home", city: "HCM", street: "123 Nguyen Hue" },
//     { type: "work", city: "HCM", street: "456 Le Loi" },
//   ]
// };

// // ✅ Referencing: User có nhiều orders (1:many)
// // User: { _id, name, email }
// // Order: { _id, userId: ObjectId, items: [...], total: 1000 }

// // ✅ Two-way referencing: Many-to-many (Student ↔ Course)
// // Student: { _id, name, courseIds: [ObjectId] }
// // Course: { _id, name, studentIds: [ObjectId] }

// 📌 Quy tắc chọn:
// Embedding khi:  đọc cùng nhau, ít thay đổi, < 100 items
// Reference khi:  truy cập độc lập, thay đổi thường xuyên, > 100 items


// ************************************************************
// PHẦN 9: PERFORMANCE & OPTIMIZATION
// ************************************************************

// 📌 Tips tối ưu:
// 1. Đánh index cho fields hay query
// 2. Dùng projection để chỉ lấy fields cần thiết
// 3. Dùng lean() trong Mongoose để bỏ overhead
// 4. Bulk operations cho write nhiều
// 5. Capped collections cho logs / time-series
// 6. Shard khi data quá lớn

// 🏋️ BÀI TẬP 9.1: Bulk Operations

// // Nhanh hơn nhiều so với loop + updateOne
// db.students.bulkWrite([
//   { insertOne: { document: { name: "New Student", age: 20 } } },
//   { updateOne: { filter: { name: "An" }, update: { $set: { age: 22 } } } },
//   { deleteOne: { filter: { isActive: false } } },
// ])


// 🏋️ BÀI TẬP 9.2: Explain & Profiling

// // Xem execution stats
// db.students.find({ gpa: { $gt: 3.0 } }).explain("executionStats")
//
// // Quan tâm:
// // - executionStats.totalDocsExamined → Bao nhiêu docs đã quét
// // - executionStats.nReturned → Bao nhiêu docs trả về
// // - winningPlan.stage → IXSCAN (index) hay COLLSCAN (full scan)
// // → Nếu totalDocsExamined >> nReturned → CẦN INDEX!


// ************************************************************
// PHẦN 10: REGEX & TEXT SEARCH
// ************************************************************

// 📌 MongoDB hỗ trợ regex và full-text search

// 🏋️ BÀI TẬP 10.1: Regex search

// db.students.find({ name: /nguyen/i })                    // Chứa "nguyen" (case-insensitive)
// db.students.find({ email: { $regex: "^an", $options: "i" } }) // Bắt đầu bằng "an"
// db.students.find({ name: { $regex: "van", $options: "i" } })  // Chứa "van"

// 🏋️ BÀI TẬP 10.2: Text Search (cần text index)

// // Tạo text index trước
// db.students.createIndex({ name: "text", skills: "text" })
//
// // Tìm kiếm
// db.students.find({ $text: { $search: "JavaScript React" } })        // OR
// db.students.find({ $text: { $search: "\"JavaScript\" \"React\"" } }) // AND (exact phrases)
// db.students.find(
//   { $text: { $search: "JavaScript" } },
//   { score: { $meta: "textScore" } }
// ).sort({ score: { $meta: "textScore" } })  // Sắp xếp theo relevance


// ************************************************************
// PHẦN 11: CHANGE STREAMS & REAL-TIME
// ************************************************************

// 📌 Change Streams cho phép theo dõi thay đổi real-time
// (Cần replica set hoặc Atlas)

// const pipeline = [{ $match: { operationType: { $in: ["insert", "update"] } } }];
// const changeStream = db.students.watch(pipeline);
//
// changeStream.on("change", (change) => {
//   console.log("Thay đổi:", change.operationType);
//   console.log("Document:", change.fullDocument);
// });


// ============================================================
// 🎯 TỔNG KẾT MONGODB
// ============================================================
// Thứ tự học:
// 1. Khái niệm → CRUD cơ bản
// 2. Query Operators: comparison, logical, element, array
// 3. Update Operators: $set, $inc, $push, $pull, $addToSet
// 4. Indexing → explain() → Performance
// 5. Aggregation Pipeline: $match, $group, $sort, $lookup, $unwind
// 6. Mongoose: Schema, Validation, Middleware, Populate
// 7. Data Modeling: Embedding vs Referencing
// 8. Advanced: Transactions, Bulk, Text Search, Change Streams
//
// 📚 Tài liệu:
// - MongoDB Manual: https://www.mongodb.com/docs/manual/
// - Mongoose: https://mongoosejs.com/docs/
// - MongoDB University: https://learn.mongodb.com/
// ============================================================

console.log("🚀 MongoDB Practice File - Paste từng phần vào mongosh để thực hành!");
