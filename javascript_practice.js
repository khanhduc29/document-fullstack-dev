// ============================================================
// 🚀 JAVASCRIPT ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
// ============================================================
// Chạy file này bằng Node.js: node javascript_practice.js
// Hoặc paste vào Console trình duyệt (F12) để thực hành.
// Hãy bỏ comment từng phần và tự viết code theo gợi ý!
// ============================================================


// ************************************************************
// PHẦN 1: BIẾN & KIỂU DỮ LIỆU (Variables & Data Types)
// ************************************************************

// 📌 Định nghĩa:
// - var: khai báo biến có phạm vi function-scope, có thể re-declare & hoisting
// - let: khai báo biến có phạm vi block-scope, KHÔNG re-declare, có hoisting nhưng TDZ
// - const: như let nhưng KHÔNG thể gán lại giá trị (immutable binding)

// 📌 Các kiểu dữ liệu nguyên thủy (Primitive):
//   string, number, boolean, null, undefined, symbol, bigint

// 📌 Kiểu tham chiếu (Reference):
//   object, array, function

// 🏋️ BÀI TẬP 1.1: Khai báo biến
// Gợi ý: Khai báo 3 biến dùng let, const để lưu tên, tuổi, và trạng thái sinh viên.

// let ten = ???;
// const tuoi = ???;
// let laSinhVien = ???;


// 🏋️ BÀI TẬP 1.2: Kiểm tra kiểu dữ liệu
// Gợi ý: Dùng typeof để kiểm tra kiểu của các biến bên trên.

// console.log(typeof ten);       // ???
// console.log(typeof tuoi);      // ???
// console.log(typeof laSinhVien); // ???
// console.log(typeof null);      // ⚠️ Kết quả là gì? Đây là một "bug" nổi tiếng!


// 🏋️ BÀI TẬP 1.3: Ép kiểu (Type Coercion)
// Gợi ý: JavaScript tự động ép kiểu trong một số trường hợp. Hãy dự đoán kết quả.

// console.log("5" + 3);         // ???
// console.log("5" - 3);         // ???
// console.log(true + 1);        // ???
// console.log("" == false);     // ???
// console.log("" === false);    // ???  (== vs === khác gì?)


// ************************************************************
// PHẦN 2: TOÁN TỬ (Operators)
// ************************************************************

// 📌 Định nghĩa:
// - Toán tử số học: +, -, *, /, %, **
// - Toán tử so sánh: ==, ===, !=, !==, >, <, >=, <=
// - Toán tử logic: && (AND), || (OR), ! (NOT)
// - Toán tử gán: =, +=, -=, *=, /=
// - Nullish Coalescing: ?? (trả về vế phải nếu vế trái là null/undefined)
// - Optional Chaining: ?. (truy cập an toàn vào property có thể không tồn tại)

// 🏋️ BÀI TẬP 2.1: So sánh == và ===
// Gợi ý: == so sánh giá trị (có ép kiểu), === so sánh giá trị VÀ kiểu.

// console.log(0 == "0");    // ???
// console.log(0 === "0");   // ???
// console.log(null == undefined);  // ???
// console.log(null === undefined); // ???


// 🏋️ BÀI TẬP 2.2: Toán tử logic
// Gợi ý: && trả về giá trị falsy đầu tiên, || trả về giá trị truthy đầu tiên.

// console.log("hello" && 0 && "world");  // ???
// console.log("" || null || "default");  // ???
// console.log(undefined ?? "fallback");  // ???


// ************************************************************
// PHẦN 3: CÂU LỆNH ĐIỀU KIỆN (Conditional Statements)
// ************************************************************

// 📌 Định nghĩa:
// - if / else if / else: kiểm tra điều kiện tuần tự
// - switch: so sánh một giá trị với nhiều case
// - Ternary operator: condition ? valueIfTrue : valueIfFalse

// 🏋️ BÀI TẬP 3.1: Viết hàm xếp loại học lực
// Gợi ý: Nhận điểm (0-10), trả về "Giỏi", "Khá", "Trung Bình", "Yếu"

// function xepLoai(diem) {
//   // Viết code ở đây dùng if...else if...else
// }
// console.log(xepLoai(8.5)); // "Giỏi"


// 🏋️ BÀI TẬP 3.2: Viết lại bài trên dùng switch
// Gợi ý: Dùng Math.floor(diem) hoặc switch(true) để xử lý range

// function xepLoaiSwitch(diem) {
//   // Viết code ở đây
// }


// ************************************************************
// PHẦN 4: VÒNG LẶP (Loops)
// ************************************************************

// 📌 Định nghĩa:
// - for: lặp với biến đếm
// - while: lặp khi điều kiện đúng
// - do...while: lặp ít nhất 1 lần rồi kiểm tra điều kiện
// - for...of: lặp qua iterable (arrays, strings, maps, sets)
// - for...in: lặp qua enumerable properties (keys) của object

// 🏋️ BÀI TẬP 4.1: In ra bảng cửu chương của số N
// Gợi ý: Dùng for loop

// function bangCuuChuong(n) {
//   // Viết code ở đây
// }
// bangCuuChuong(5);


// 🏋️ BÀI TẬP 4.2: Tìm số nguyên tố từ 1 đến N
// Gợi ý: Dùng vòng lặp lồng nhau, kiểm tra chia hết

// function timSoNguyenTo(n) {
//   // Viết code ở đây
// }
// console.log(timSoNguyenTo(20)); // [2, 3, 5, 7, 11, 13, 17, 19]


// 🏋️ BÀI TẬP 4.3: Phân biệt for...in và for...of
// Gợi ý: Thử cả hai trên một mảng và một object

// const mang = ["a", "b", "c"];
// // for (let x in mang) console.log(x);   // ??? (in ra index)
// // for (let x of mang) console.log(x);   // ??? (in ra giá trị)


// ************************************************************
// PHẦN 5: HÀM (Functions)
// ************************************************************

// 📌 Định nghĩa:
// - Function Declaration: function tenHam() {} → có hoisting
// - Function Expression: const tenHam = function() {} → không hoisting
// - Arrow Function: const tenHam = () => {} → không có this riêng
// - IIFE: (function() {})() → chạy ngay lập tức
// - Default Parameters: function f(x = 10) {}
// - Rest Parameters: function f(...args) {}

// 🏋️ BÀI TẬP 5.1: Viết 3 cách tạo hàm tính tổng 2 số
// Gợi ý: Function Declaration, Expression, Arrow Function

// // Cách 1: Declaration
// function tong1(a, b) { /* ??? */ }

// // Cách 2: Expression
// const tong2 = function(a, b) { /* ??? */ };

// // Cách 3: Arrow
// const tong3 = (a, b) => /* ??? */;


// 🏋️ BÀI TẬP 5.2: Rest parameters
// Gợi ý: Viết hàm nhận nhiều số và trả về tổng tất cả

// function tongTatCa(...soHang) {
//   // Viết code ở đây dùng reduce hoặc for loop
// }
// console.log(tongTatCa(1, 2, 3, 4, 5)); // 15


// 🏋️ BÀI TẬP 5.3: Closure
// 📌 Định nghĩa: Closure là hàm có khả năng "nhớ" biến từ scope bên ngoài
// ngay cả khi scope đó đã kết thúc thực thi.

// Gợi ý: Viết hàm đếm số lần được gọi

// function taoBoDem() {
//   // let count = 0;
//   // return function() { ??? }
// }
// const dem = taoBoDem();
// dem(); // 1
// dem(); // 2
// dem(); // 3


// ************************************************************
// PHẦN 6: MẢNG (Arrays)
// ************************************************************

// 📌 Định nghĩa:
// Mảng là cấu trúc dữ liệu lưu trữ danh sách có thứ tự.
// JS Array có thể chứa nhiều kiểu dữ liệu khác nhau.

// 📌 Các phương thức quan trọng:
// Mutate:  push, pop, shift, unshift, splice, sort, reverse
// Không Mutate: map, filter, reduce, find, findIndex, some, every,
//               slice, concat, flat, flatMap, includes, indexOf

// 🏋️ BÀI TẬP 6.1: map, filter, reduce
// Gợi ý: Từ mảng số, lọc số chẵn rồi tính tổng

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const tongSoChan = numbers
//   .filter(/* ??? */)
//   .reduce(/* ??? */);
// console.log(tongSoChan); // 30


// 🏋️ BÀI TẬP 6.2: Sắp xếp mảng objects
// Gợi ý: Dùng sort() với compare function

// const sinhVien = [
//   { ten: "An", diem: 8 },
//   { ten: "Binh", diem: 6 },
//   { ten: "Chi", diem: 9 },
//   { ten: "Dung", diem: 7 },
// ];
// // Sắp xếp theo điểm giảm dần
// // sinhVien.sort(/* ??? */);


// 🏋️ BÀI TẬP 6.3: Destructuring mảng
// Gợi ý: Lấy phần tử đầu và phần tử cuối

// const colors = ["red", "green", "blue", "yellow", "purple"];
// // const [first, , , , last] = colors;
// // Hoặc dùng rest: const [first, ...rest] = colors;


// 🏋️ BÀI TẬP 6.4: flat và flatMap
// Gợi ý: Dùng flat() để làm phẳng mảng lồng nhau

// const nested = [[1, 2], [3, [4, 5]], [6]];
// // console.log(nested.flat());     // ???
// // console.log(nested.flat(Infinity)); // ???


// ************************************************************
// PHẦN 7: OBJECT
// ************************************************************

// 📌 Định nghĩa:
// Object là tập hợp các cặp key-value, là nền tảng của JS.
// Mọi thứ trong JS (trừ primitive) đều là object.

// 📌 Các phương thức hữu ích:
// Object.keys(), Object.values(), Object.entries(),
// Object.assign(), Object.freeze(), Object.seal(),
// Spread operator: { ...obj }

// 🏋️ BÀI TẬP 7.1: Tạo và truy cập object
// Gợi ý: Tạo object sinhVien với tên, tuổi, điểm, phương thức giới thiệu

// const sinhVien1 = {
//   // ten: ???,
//   // tuoi: ???,
//   // diem: ???,
//   // gioiThieu() { return `Tôi là ${this.ten}, ${this.tuoi} tuổi`; }
// };


// 🏋️ BÀI TẬP 7.2: Destructuring object
// Gợi ý: Rút trích properties ra biến, đổi tên, giá trị mặc định

// const user = { name: "Duc", age: 25, city: "HCM" };
// // const { name, age, city, country = "VN" } = user;
// // const { name: hoTen } = user; // đổi tên biến


// 🏋️ BÀI TẬP 7.3: Spread & Rest với object
// Gợi ý: Clone object, merge objects, loại bỏ property

// const original = { a: 1, b: 2, c: 3 };
// // const clone = { ...original };
// // const { a, ...rest } = original; // rest = { b: 2, c: 3 }


// 🏋️ BÀI TẬP 7.4: Object.freeze vs Object.seal
// Gợi ý: freeze = không thêm/sửa/xóa, seal = không thêm/xóa nhưng SỬA được

// const frozen = Object.freeze({ x: 1, y: 2 });
// // frozen.x = 10; // ⚠️ Không lỗi nhưng không thay đổi
// // console.log(frozen.x); // ???


// ************************************************************
// PHẦN 8: STRING METHODS
// ************************************************************

// 📌 Các phương thức thường dùng:
// length, charAt, indexOf, lastIndexOf, includes, startsWith, endsWith,
// slice, substring, trim, trimStart, trimEnd,
// toUpperCase, toLowerCase, split, replace, replaceAll,
// repeat, padStart, padEnd, match, search
// Template Literals: `Hello ${name}`

// 🏋️ BÀI TẬP 8.1: Viết hàm đếm số từ trong chuỗi
// Gợi ý: Dùng trim() + split()

// function demTu(chuoi) {
//   // Viết code ở đây
// }
// console.log(demTu("  Hello World  JavaScript  ")); // 3


// 🏋️ BÀI TẬP 8.2: Viết hàm capitalize mỗi từ
// Gợi ý: Split → map → charAt(0).toUpperCase() → join

// function capitalizeWords(str) {
//   // Viết code ở đây
// }
// console.log(capitalizeWords("hello world")); // "Hello World"


// 🏋️ BÀI TẬP 8.3: Template Literals nâng cao
// Gợi ý: Tagged template literals

// function highlight(strings, ...values) {
//   // Ghép strings và values lại, bọc values trong **...**
//   // Viết code ở đây
// }
// const name1 = "Duc";
// const action = "code";
// // console.log(highlight`${name1} loves to ${action}`);
// // Kết quả: "**Duc** loves to **code**"


// ************************************************************
// PHẦN 9: ERROR HANDLING (Xử lý lỗi)
// ************************************************************

// 📌 Định nghĩa:
// - try...catch...finally: bắt và xử lý lỗi runtime
// - throw: tạo lỗi tùy chỉnh
// - Error types: Error, TypeError, RangeError, ReferenceError, SyntaxError

// 🏋️ BÀI TẬP 9.1: try...catch cơ bản
// Gợi ý: Viết hàm chia 2 số, throw error nếu chia cho 0

// function chia(a, b) {
//   // if (b === 0) throw new Error("???");
//   // return a / b;
// }
// // try {
// //   console.log(chia(10, 0));
// // } catch (error) {
// //   console.log("Lỗi:", error.message);
// // } finally {
// //   console.log("Luôn chạy dù có lỗi hay không");
// // }


// 🏋️ BÀI TẬP 9.2: Custom Error
// Gợi ý: Tạo class lỗi riêng kế thừa từ Error

// class ValidationError extends Error {
//   constructor(message, field) {
//     // super(message);
//     // this.name = "ValidationError";
//     // this.field = field;
//   }
// }


// ************************************************************
// PHẦN 10: ASYNCHRONOUS JAVASCRIPT (Bất đồng bộ)
// ************************************************************

// 📌 Định nghĩa:
// JS là single-threaded, dùng Event Loop để xử lý bất đồng bộ.
// - Callback: hàm được truyền vào hàm khác, gọi khi hoàn tất
// - Promise: đối tượng đại diện cho giá trị có thể có trong tương lai
//   → 3 trạng thái: pending, fulfilled (resolved), rejected
// - async/await: cú pháp "đường" (syntactic sugar) cho Promise

// 🏋️ BÀI TẬP 10.1: setTimeout và callback
// Gợi ý: Mô phỏng xử lý bất đồng bộ

// console.log("Bắt đầu");
// setTimeout(() => {
//   console.log("Sau 2 giây");
// }, 2000);
// console.log("Kết thúc");
// // ⚠️ Thứ tự in ra là gì? Tại sao?


// 🏋️ BÀI TẬP 10.2: Tạo và sử dụng Promise
// Gợi ý: Mô phỏng API call

// function fetchUser(id) {
//   return new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //   if (id > 0) {
//     //     resolve({ id, name: "User " + id });
//     //   } else {
//     //     reject(new Error("ID không hợp lệ"));
//     //   }
//     // }, 1000);
//   });
// }
// // fetchUser(1).then(user => console.log(user)).catch(err => console.log(err));


// 🏋️ BÀI TẬP 10.3: async/await
// Gợi ý: Viết lại bài 10.2 dùng async/await

// async function layThongTinUser(id) {
//   // try {
//   //   const user = await fetchUser(id);
//   //   console.log(user);
//   // } catch (error) {
//   //   console.log("Lỗi:", error.message);
//   // }
// }


// 🏋️ BÀI TẬP 10.4: Promise.all, Promise.race, Promise.allSettled
// Gợi ý: Chạy nhiều promise song song

// const p1 = fetchUser(1);
// const p2 = fetchUser(2);
// const p3 = fetchUser(3);

// // Promise.all([p1, p2, p3])     → Tất cả thành công hoặc 1 fail = fail
// // Promise.race([p1, p2, p3])    → Lấy kết quả nhanh nhất
// // Promise.allSettled([p1, p2, p3]) → Đợi tất cả, trả kết quả từng cái


// 🏋️ BÀI TẬP 10.5: Event Loop
// 📌 Thứ tự: Call Stack → Microtask (Promise) → Macrotask (setTimeout)
// Gợi ý: Dự đoán thứ tự in ra

// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => console.log("3"));
// console.log("4");
// // Thứ tự: ???  (Gợi ý: 1, 4, 3, 2)


// ************************************************************
// PHẦN 11: CLASS & OOP (Lập trình hướng đối tượng)
// ************************************************************

// 📌 Định nghĩa:
// - Class: bản thiết kế (blueprint) để tạo objects
// - constructor: phương thức khởi tạo
// - extends: kế thừa class cha
// - super: gọi constructor/phương thức class cha
// - static: phương thức/thuộc tính thuộc class, không thuộc instance
// - get/set: accessor properties
// - private fields: #field (ES2022)

// 🏋️ BÀI TẬP 11.1: Tạo class cơ bản
// Gợi ý: Tạo class DongVat với tên, tuổi, phương thức kêu

// class DongVat {
//   constructor(ten, tuoi) {
//     // ???
//   }
//   keu() {
//     // ???
//   }
// }


// 🏋️ BÀI TẬP 11.2: Kế thừa (Inheritance)
// Gợi ý: Tạo class Cho kế thừa DongVat, override method keu()

// class Cho extends DongVat {
//   constructor(ten, tuoi, giong) {
//     // super(???)
//     // this.giong = giong;
//   }
//   keu() {
//     // return "Gâu gâu!";
//   }
// }


// 🏋️ BÀI TẬP 11.3: Static method & Private field
// Gợi ý: Tạo class BankAccount với số dư private

// class BankAccount {
//   #soDu = 0;  // Private field
//
//   constructor(chuTaiKhoan, soDuBanDau) {
//     // ???
//   }
//
//   get balance() {
//     // return this.#soDu;
//   }
//
//   deposit(soTien) {
//     // ???
//   }
//
//   withdraw(soTien) {
//     // if (soTien > this.#soDu) throw new Error("Không đủ tiền");
//     // ???
//   }
//
//   static fromJSON(json) {
//     // Tạo instance từ JSON string
//     // ???
//   }
// }


// ************************************************************
// PHẦN 12: THIS, BIND, CALL, APPLY
// ************************************************************

// 📌 Định nghĩa:
// - this: tham chiếu đến object đang gọi method
//   → Trong global scope: window (browser) hoặc global (Node)
//   → Trong method: object chứa method
//   → Trong arrow function: kế thừa this từ scope bên ngoài
//   → Trong event handler: element nhận sự kiện
// - bind(): tạo hàm mới với this cố định
// - call(): gọi hàm với this chỉ định + args riêng lẻ
// - apply(): gọi hàm với this chỉ định + args là mảng

// 🏋️ BÀI TẬP 12.1: Hiểu this trong các context
// Gợi ý: Thử console.log(this) trong các tình huống khác nhau

// const person = {
//   name: "Duc",
//   greet() {
//     console.log(this.name); // ???
//     const inner = () => {
//       console.log(this.name); // ???  (arrow function)
//     };
//     inner();
//   },
// };
// person.greet();
// const greetFn = person.greet;
// // greetFn(); // ⚠️ this là gì ở đây?


// 🏋️ BÀI TẬP 12.2: bind, call, apply
// Gợi ý: Viết hàm chào và bind nó vào các object khác nhau

// function chao(loiChao, dauCau) {
//   // console.log(`${loiChao}, tôi là ${this.name}${dauCau}`);
// }
// const bob = { name: "Bob" };
// const alice = { name: "Alice" };
// // chao.call(bob, "Xin chào", "!");      // ???
// // chao.apply(alice, ["Hi", "~"]);        // ???
// // const chaoBob = chao.bind(bob, "Hey"); // ???
// // chaoBob("!!!");                         // ???


// ************************************************************
// PHẦN 13: PROTOTYPE & PROTOTYPE CHAIN
// ************************************************************

// 📌 Định nghĩa:
// Mọi object trong JS đều có [[Prototype]] (hay __proto__).
// Khi truy cập property, JS tìm trên object → prototype → prototype chain → null.
// Class chỉ là "syntactic sugar" cho prototype-based inheritance.

// 🏋️ BÀI TẬP 13.1: Prototype chain
// Gợi ý: Tạo object và kiểm tra prototype

// function Nguoi(ten) {
//   this.ten = ten;
// }
// Nguoi.prototype.chao = function () {
//   // return `Xin chào, tôi là ${this.ten}`;
// };
// const n1 = new Nguoi("An");
// // console.log(n1.chao());
// // console.log(n1.__proto__ === Nguoi.prototype); // ???
// // console.log(Object.getPrototypeOf(n1)); // ???


// ************************************************************
// PHẦN 14: MODULES (ES Modules)
// ************************************************************

// 📌 Định nghĩa:
// ES Modules cho phép chia code thành các file riêng biệt.
// - export: xuất biến/hàm/class từ module
// - import: nhập từ module khác
// - export default: xuất mặc định (chỉ 1 per file)
// - Named export: xuất có tên (nhiều per file)

// ⚠️ Để chạy ES Modules trong Node, cần:
// - Đổi extension thành .mjs
// - Hoặc thêm "type": "module" trong package.json

// 📝 VÍ DỤ (không chạy được trực tiếp trong file này):

// --- math.js ---
// export function cong(a, b) { return a + b; }
// export function tru(a, b) { return a - b; }
// export default function nhan(a, b) { return a * b; }

// --- app.js ---
// import nhan, { cong, tru } from './math.js';
// console.log(cong(2, 3));  // 5
// console.log(nhan(2, 3));  // 6


// ************************************************************
// PHẦN 15: ITERATORS & GENERATORS
// ************************************************************

// 📌 Định nghĩa:
// - Iterator: object có method next() trả về { value, done }
// - Generator: function* cho phép tạm dừng (yield) và tiếp tục thực thi
// - Iterable Protocol: object có [Symbol.iterator]() → Iterator

// 🏋️ BÀI TẬP 15.1: Tạo Generator đếm số
// Gợi ý: Dùng function* và yield

// function* demSo(start, end) {
//   // for (let i = start; i <= end; i++) {
//   //   yield i;
//   // }
// }
// const gen = demSo(1, 5);
// // console.log(gen.next()); // { value: 1, done: false }
// // console.log(gen.next()); // { value: 2, done: false }
// // for (const num of demSo(1, 5)) console.log(num);


// 🏋️ BÀI TẬP 15.2: Generator vô hạn (Infinite Generator)
// Gợi ý: Tạo generator Fibonacci

// function* fibonacci() {
//   // let a = 0, b = 1;
//   // while (true) {
//   //   yield a;
//   //   [a, b] = [b, a + b];
//   // }
// }
// // Lấy 10 số Fibonacci đầu tiên:
// // const fib = fibonacci();
// // for (let i = 0; i < 10; i++) console.log(fib.next().value);


// ************************************************************
// PHẦN 16: MAP, SET, WEAKMAP, WEAKSET
// ************************************************************

// 📌 Định nghĩa:
// - Map: key-value pairs, key có thể là BẤT KỲ kiểu nào (khác Object)
// - Set: tập hợp giá trị DUY NHẤT (không trùng lặp)
// - WeakMap: như Map nhưng key phải là object, cho phép garbage collect
// - WeakSet: như Set nhưng chỉ chứa object, cho phép garbage collect

// 🏋️ BÀI TẬP 16.1: Map cơ bản
// Gợi ý: Tạo Map đếm tần suất ký tự trong chuỗi

// function demKyTu(chuoi) {
//   // const map = new Map();
//   // for (const char of chuoi) {
//   //   map.set(char, (map.get(char) || 0) + 1);
//   // }
//   // return map;
// }
// // console.log(demKyTu("hello world"));


// 🏋️ BÀI TẬP 16.2: Set - Loại bỏ trùng lặp
// Gợi ý: Dùng Set để lọc mảng trùng lặp

// const arr = [1, 2, 2, 3, 3, 3, 4, 4, 5];
// // const unique = [...new Set(arr)];
// // console.log(unique); // [1, 2, 3, 4, 5]


// 🏋️ BÀI TẬP 16.3: Giao, Hợp, Hiệu của 2 Set
// Gợi ý: Dùng filter và has

// const setA = new Set([1, 2, 3, 4, 5]);
// const setB = new Set([4, 5, 6, 7, 8]);
// // Hợp (Union): ???
// // Giao (Intersection): ???
// // Hiệu (Difference): ???


// ************************************************************
// PHẦN 17: PROXY & REFLECT
// ************************************************************

// 📌 Định nghĩa:
// - Proxy: tạo "lớp trung gian" để chặn/tùy chỉnh thao tác trên object
//   → Các trap: get, set, has, deleteProperty, apply, construct, ...
// - Reflect: cung cấp methods tương ứng với các trap của Proxy

// 🏋️ BÀI TẬP 17.1: Validation Proxy
// Gợi ý: Tạo proxy chặn việc gán giá trị âm cho tuổi

// const handler = {
//   set(target, prop, value) {
//     // if (prop === "tuoi" && (typeof value !== "number" || value < 0)) {
//     //   throw new Error("Tuổi phải là số dương!");
//     // }
//     // return Reflect.set(target, prop, value);
//   },
//   get(target, prop) {
//     // console.log(`Đang truy cập: ${prop}`);
//     // return Reflect.get(target, prop);
//   },
// };
// // const nguoi = new Proxy({}, handler);
// // nguoi.ten = "An";     // OK
// // nguoi.tuoi = 25;      // OK
// // nguoi.tuoi = -5;      // ⚠️ Error!


// ************************************************************
// PHẦN 18: SYMBOL
// ************************************************************

// 📌 Định nghĩa:
// Symbol là kiểu dữ liệu nguyên thủy, mỗi Symbol là DUY NHẤT.
// Dùng làm key cho object properties để tránh xung đột tên.
// Well-known Symbols: Symbol.iterator, Symbol.toPrimitive, Symbol.toStringTag

// 🏋️ BÀI TẬP 18.1: Symbol cơ bản
// Gợi ý: Tạo Symbol và dùng làm key

// const id = Symbol("id");
// const obj = {
//   [id]: 12345,
//   name: "Test",
// };
// // console.log(obj[id]);       // 12345
// // console.log(Object.keys(obj)); // ["name"] → Symbol key bị ẩn!


// ************************************************************
// PHẦN 19: DESIGN PATTERNS PHỔ BIẾN
// ************************************************************

// 📌 Một số pattern thường gặp trong JS:

// 🏋️ BÀI TẬP 19.1: Singleton Pattern
// 📌 Đảm bảo chỉ có 1 instance duy nhất

// class Database {
//   static #instance = null;
//   constructor(connectionString) {
//     if (Database.#instance) {
//       return Database.#instance;
//     }
//     // this.connectionString = connectionString;
//     // Database.#instance = this;
//   }
// }
// // const db1 = new Database("mongodb://...");
// // const db2 = new Database("postgres://...");
// // console.log(db1 === db2); // true → cùng 1 instance


// 🏋️ BÀI TẬP 19.2: Observer Pattern
// 📌 Khi trạng thái thay đổi, thông báo cho tất cả "subscriber"

// class EventEmitter {
//   constructor() {
//     // this.events = {};
//   }
//   on(event, callback) {
//     // Đăng ký listener
//   }
//   emit(event, ...args) {
//     // Gọi tất cả listeners của event
//   }
//   off(event, callback) {
//     // Hủy đăng ký listener
//   }
// }


// 🏋️ BÀI TẬP 19.3: Currying
// 📌 Biến hàm nhiều tham số thành chuỗi hàm 1 tham số

// function curry(fn) {
//   // return function curried(...args) {
//   //   if (args.length >= fn.length) {
//   //     return fn.apply(this, args);
//   //   }
//   //   return function (...moreArgs) {
//   //     return curried.apply(this, [...args, ...moreArgs]);
//   //   };
//   // };
// }
// // const add = curry((a, b, c) => a + b + c);
// // console.log(add(1)(2)(3));   // 6
// // console.log(add(1, 2)(3));   // 6
// // console.log(add(1)(2, 3));   // 6


// ************************************************************
// PHẦN 20: ADVANCED CONCEPTS
// ************************************************************

// 🏋️ BÀI TẬP 20.1: Debounce & Throttle
// 📌 Debounce: chỉ chạy sau khi user ngừng hành động N ms
// 📌 Throttle: chỉ chạy tối đa 1 lần trong N ms

// function debounce(fn, delay) {
//   // let timeoutId;
//   // return function (...args) {
//   //   clearTimeout(timeoutId);
//   //   timeoutId = setTimeout(() => fn.apply(this, args), delay);
//   // };
// }

// function throttle(fn, limit) {
//   // let inThrottle = false;
//   // return function (...args) {
//   //   if (!inThrottle) {
//   //     fn.apply(this, args);
//   //     inThrottle = true;
//   //     setTimeout(() => (inThrottle = false), limit);
//   //   }
//   // };
// }


// 🏋️ BÀI TẬP 20.2: Deep Clone
// 📌 structuredClone (modern), JSON.parse/stringify (cũ), recursive

// function deepClone(obj) {
//   // Cách 1 (modern): return structuredClone(obj);
//   // Cách 2 (JSON): return JSON.parse(JSON.stringify(obj)); // ⚠️ mất function, Date, undefined
//   // Cách 3 (recursive): tự viết đệ quy
//   // ???
// }


// 🏋️ BÀI TẬP 20.3: Memoization
// 📌 Cache kết quả hàm để tránh tính toán lại

// function memoize(fn) {
//   // const cache = new Map();
//   // return function (...args) {
//   //   const key = JSON.stringify(args);
//   //   if (cache.has(key)) return cache.get(key);
//   //   const result = fn.apply(this, args);
//   //   cache.set(key, result);
//   //   return result;
//   // };
// }
// // const slowSquare = memoize((n) => {
// //   console.log("Tính toán...");
// //   return n * n;
// // });
// // console.log(slowSquare(5)); // "Tính toán..." → 25
// // console.log(slowSquare(5)); // 25 (lấy từ cache, không log)


// 🏋️ BÀI TẬP 20.4: Promise.race - Timeout pattern
// 📌 Giới hạn thời gian chờ cho async operation

// function withTimeout(promise, ms) {
//   // const timeout = new Promise((_, reject) =>
//   //   setTimeout(() => reject(new Error("Timeout!")), ms)
//   // );
//   // return Promise.race([promise, timeout]);
// }


// 🏋️ BÀI TẬP 20.5: Async Iterator
// 📌 Lặp bất đồng bộ qua dữ liệu

// async function* fetchPages(totalPages) {
//   // for (let i = 1; i <= totalPages; i++) {
//   //   // Giả lập API call
//   //   await new Promise((r) => setTimeout(r, 500));
//   //   yield { page: i, data: `Data trang ${i}` };
//   // }
// }
// // (async () => {
// //   for await (const page of fetchPages(3)) {
// //     console.log(page);
// //   }
// // })();


// ============================================================
// 🎯 TỔNG KẾT
// ============================================================
// 1. Bỏ comment từng phần và chạy thử
// 2. Sửa ??? thành đáp án của bạn
// 3. Thêm console.log để kiểm tra kết quả
// 4. Thử sáng tạo thêm bài tập riêng
// 5. Khi nắm vững, chuyển sang làm project thực tế!
//
// 📚 Tài liệu tham khảo:
// - MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript
// - JavaScript.info: https://javascript.info/
// ============================================================

console.log("🚀 Chào mừng bạn đến với JavaScript Practice!");
console.log("📝 Hãy bỏ comment từng phần và bắt đầu thực hành!");
