-- ============================================================
-- 🚀 MYSQL ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
-- ============================================================
-- MySQL: Hệ quản trị CSDL quan hệ (RDBMS) phổ biến nhất
-- Cài đặt: https://dev.mysql.com/downloads/ hoặc XAMPP
-- Chạy queries: MySQL Workbench, phpMyAdmin, DBeaver, hoặc CLI
-- Paste từng phần vào tool SQL để thực hành!
-- ============================================================


-- ************************************************************
-- PHẦN 1: QUẢN LÝ DATABASE & TABLE
-- ************************************************************

-- 📌 Định nghĩa:
-- Database  → Kho chứa các bảng
-- Table     → Bảng dữ liệu gồm hàng (row) và cột (column)
-- Column    → Trường dữ liệu, có kiểu dữ liệu cụ thể
-- Row       → Một bản ghi (record)
-- Primary Key (PK) → Khóa chính, định danh duy nhất mỗi row
-- Foreign Key (FK) → Khóa ngoại, liên kết giữa các bảng
-- Index     → Chỉ mục giúp tìm kiếm nhanh

-- 📌 Kiểu dữ liệu phổ biến:
-- SỐ:    INT, BIGINT, DECIMAL(p,s), FLOAT, DOUBLE, TINYINT(1) (boolean)
-- CHUỖI: VARCHAR(n), CHAR(n), TEXT, LONGTEXT, ENUM('a','b')
-- NGÀY:  DATE, DATETIME, TIMESTAMP, TIME, YEAR
-- KHÁC:  BLOB (binary), JSON, BOOLEAN

-- 🏋️ BÀI TẬP 1.1: Tạo Database

-- CREATE DATABASE IF NOT EXISTS practice_db
--   CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;
-- USE practice_db;


-- 🏋️ BÀI TẬP 1.2: Tạo Tables với đầy đủ constraints

-- CREATE TABLE departments (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL UNIQUE,
--   description TEXT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE employees (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   phone VARCHAR(20),
--   salary DECIMAL(10, 2) DEFAULT 0.00,
--   hire_date DATE NOT NULL,
--   department_id INT,
--   manager_id INT,
--   is_active BOOLEAN DEFAULT TRUE,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
--   FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
--   INDEX idx_department (department_id),
--   INDEX idx_salary (salary),
--   INDEX idx_name (last_name, first_name)
-- );

-- CREATE TABLE projects (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(200) NOT NULL,
--   budget DECIMAL(12, 2),
--   start_date DATE,
--   end_date DATE,
--   status ENUM('planning', 'active', 'completed', 'cancelled') DEFAULT 'planning',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Bảng trung gian N:N (employee ↔ project)
-- CREATE TABLE employee_projects (
--   employee_id INT,
--   project_id INT,
--   role VARCHAR(50) DEFAULT 'member',
--   assigned_date DATE DEFAULT (CURRENT_DATE),
--   PRIMARY KEY (employee_id, project_id),
--   FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
--   FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
-- );


-- 🏋️ BÀI TẬP 1.3: ALTER TABLE

-- ALTER TABLE employees ADD COLUMN address TEXT AFTER phone;
-- ALTER TABLE employees MODIFY COLUMN phone VARCHAR(30);
-- ALTER TABLE employees DROP COLUMN address;
-- ALTER TABLE employees RENAME COLUMN phone TO phone_number;
-- ALTER TABLE employees ADD INDEX idx_email (email);


-- ************************************************************
-- PHẦN 2: INSERT DATA (Thêm dữ liệu mẫu)
-- ************************************************************

-- INSERT INTO departments (name, description) VALUES
--   ('Engineering', 'Phòng Kỹ thuật'),
--   ('Marketing', 'Phòng Marketing'),
--   ('Sales', 'Phòng Kinh doanh'),
--   ('HR', 'Phòng Nhân sự'),
--   ('Finance', 'Phòng Tài chính');

-- INSERT INTO employees (first_name, last_name, email, phone, salary, hire_date, department_id, manager_id) VALUES
--   ('Nguyen', 'Van An', 'an@company.com', '0901111111', 25000000, '2020-01-15', 1, NULL),
--   ('Tran', 'Thi Binh', 'binh@company.com', '0902222222', 18000000, '2021-03-20', 1, 1),
--   ('Le', 'Van Chi', 'chi@company.com', '0903333333', 22000000, '2019-07-01', 2, NULL),
--   ('Pham', 'Thi Dung', 'dung@company.com', '0904444444', 15000000, '2022-01-10', 3, NULL),
--   ('Hoang', 'Van Em', 'em@company.com', '0905555555', 30000000, '2018-05-15', 1, 1),
--   ('Vo', 'Thi Fen', 'fen@company.com', '0906666666', 20000000, '2021-08-01', 2, 3),
--   ('Dao', 'Van Gio', 'gio@company.com', '0907777777', 17000000, '2023-01-01', 4, NULL),
--   ('Bui', 'Thi Hoa', 'hoa@company.com', '0908888888', 28000000, '2019-11-20', 5, NULL),
--   ('Ngo', 'Van Ich', 'ich@company.com', '0909999999', 16000000, '2022-06-15', 3, 4),
--   ('Do', 'Thi Kim', 'kim@company.com', '0910000000', 35000000, '2017-03-01', 1, NULL);

-- INSERT INTO projects (name, budget, start_date, end_date, status) VALUES
--   ('Website Redesign', 500000000, '2024-01-01', '2024-06-30', 'active'),
--   ('Mobile App', 800000000, '2024-03-01', '2024-12-31', 'active'),
--   ('CRM System', 300000000, '2023-06-01', '2024-01-31', 'completed'),
--   ('AI Chatbot', 600000000, '2024-06-01', NULL, 'planning');

-- INSERT INTO employee_projects (employee_id, project_id, role) VALUES
--   (1, 1, 'lead'), (2, 1, 'member'), (5, 1, 'member'),
--   (1, 2, 'member'), (2, 2, 'lead'), (10, 2, 'member'),
--   (3, 3, 'lead'), (6, 3, 'member'),
--   (5, 4, 'lead'), (10, 4, 'member');


-- ************************************************************
-- PHẦN 3: SELECT CƠ BẢN
-- ************************************************************

-- 📌 Cú pháp:
-- SELECT columns FROM table
-- WHERE condition
-- ORDER BY column ASC|DESC
-- LIMIT offset, count

-- 🏋️ BÀI TẬP 3.1: Queries cơ bản

-- SELECT * FROM employees;
-- SELECT first_name, last_name, salary FROM employees;
-- SELECT * FROM employees WHERE department_id = 1;
-- SELECT * FROM employees WHERE salary > 20000000;
-- SELECT * FROM employees ORDER BY salary DESC;
-- SELECT * FROM employees ORDER BY last_name ASC, first_name ASC;
-- SELECT * FROM employees LIMIT 5;
-- SELECT * FROM employees LIMIT 5 OFFSET 5;  -- Phân trang


-- 🏋️ BÀI TẬP 3.2: WHERE với operators

-- -- So sánh
-- SELECT * FROM employees WHERE salary BETWEEN 15000000 AND 25000000;
-- SELECT * FROM employees WHERE department_id IN (1, 2, 3);
-- SELECT * FROM employees WHERE department_id NOT IN (4, 5);
-- SELECT * FROM employees WHERE email LIKE '%@company.com';
-- SELECT * FROM employees WHERE first_name LIKE 'N%';      -- Bắt đầu bằng N
-- SELECT * FROM employees WHERE last_name LIKE '%an%';     -- Chứa "an"
-- SELECT * FROM employees WHERE phone IS NOT NULL;
-- SELECT * FROM employees WHERE is_active = TRUE;

-- -- Logic
-- SELECT * FROM employees
--   WHERE department_id = 1 AND salary > 20000000;
-- SELECT * FROM employees
--   WHERE department_id = 1 OR department_id = 2;
-- SELECT * FROM employees
--   WHERE NOT (salary < 20000000);


-- 🏋️ BÀI TẬP 3.3: DISTINCT & Alias

-- SELECT DISTINCT department_id FROM employees;
-- SELECT first_name AS 'Ho', last_name AS 'Ten',
--        salary AS 'Luong', salary * 12 AS 'Luong_Nam'
-- FROM employees;


-- ************************************************************
-- PHẦN 4: AGGREGATE FUNCTIONS (Hàm tổng hợp)
-- ************************************************************

-- 📌 Các hàm:
-- COUNT()  → Đếm          | SUM()    → Tính tổng
-- AVG()   → Trung bình    | MIN()    → Giá trị nhỏ nhất
-- MAX()   → Giá trị lớn nhất
-- GROUP_CONCAT() → Nối chuỗi các giá trị trong nhóm

-- 🏋️ BÀI TẬP 4.1: Aggregate cơ bản

-- SELECT COUNT(*) AS total_employees FROM employees;
-- SELECT AVG(salary) AS avg_salary FROM employees;
-- SELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees;
-- SELECT SUM(salary) AS total_salary FROM employees WHERE department_id = 1;


-- 🏋️ BÀI TẬP 4.2: GROUP BY + HAVING

-- -- Đếm nhân viên mỗi phòng
-- SELECT department_id, COUNT(*) AS so_nhan_vien, AVG(salary) AS luong_tb
-- FROM employees
-- GROUP BY department_id;

-- -- Chỉ lấy phòng có > 2 nhân viên
-- SELECT department_id, COUNT(*) AS so_nv
-- FROM employees
-- GROUP BY department_id
-- HAVING so_nv > 2;

-- -- Lương trung bình theo phòng, sắp xếp
-- SELECT department_id,
--        COUNT(*) AS total,
--        ROUND(AVG(salary), 0) AS avg_salary,
--        MIN(salary) AS min_salary,
--        MAX(salary) AS max_salary,
--        GROUP_CONCAT(first_name ORDER BY salary DESC) AS members
-- FROM employees
-- GROUP BY department_id
-- ORDER BY avg_salary DESC;


-- ************************************************************
-- PHẦN 5: JOIN (Kết bảng)
-- ************************************************************

-- 📌 Định nghĩa:
-- INNER JOIN  → Chỉ lấy rows khớp ở CẢ HAI bảng
-- LEFT JOIN   → Lấy TẤT CẢ rows bảng trái + rows khớp bảng phải
-- RIGHT JOIN  → Lấy TẤT CẢ rows bảng phải + rows khớp bảng trái
-- CROSS JOIN  → Tất cả tổ hợp (tích Descartes)
-- SELF JOIN   → Join bảng với chính nó

-- 🏋️ BÀI TẬP 5.1: INNER JOIN

-- -- Nhân viên + tên phòng ban
-- SELECT e.first_name, e.last_name, e.salary, d.name AS department
-- FROM employees e
-- INNER JOIN departments d ON e.department_id = d.id;


-- 🏋️ BÀI TẬP 5.2: LEFT JOIN

-- -- Tất cả phòng ban + số nhân viên (kể cả phòng không có ai)
-- SELECT d.name, COUNT(e.id) AS employee_count
-- FROM departments d
-- LEFT JOIN employees e ON d.id = e.department_id
-- GROUP BY d.id, d.name;


-- 🏋️ BÀI TẬP 5.3: SELF JOIN

-- -- Nhân viên + tên quản lý
-- SELECT
--   e.first_name AS employee,
--   e.last_name AS ho_employee,
--   m.first_name AS manager,
--   m.last_name AS ho_manager
-- FROM employees e
-- LEFT JOIN employees m ON e.manager_id = m.id;


-- 🏋️ BÀI TẬP 5.4: Multiple JOINs

-- -- Nhân viên + phòng ban + dự án
-- SELECT
--   CONCAT(e.first_name, ' ', e.last_name) AS full_name,
--   d.name AS department,
--   p.name AS project,
--   ep.role
-- FROM employees e
-- JOIN departments d ON e.department_id = d.id
-- JOIN employee_projects ep ON e.id = ep.employee_id
-- JOIN projects p ON ep.project_id = p.id
-- ORDER BY e.last_name;


-- 🏋️ BÀI TẬP 5.5: Bài tập JOIN tổng hợp
-- ⚠️ Tự viết query cho các yêu cầu sau:

-- 1. Liệt kê tất cả dự án + số thành viên + tên lead
-- ???

-- 2. Tìm nhân viên KHÔNG tham gia dự án nào
-- ???  (Gợi ý: LEFT JOIN + IS NULL)

-- 3. Phòng ban nào có tổng lương cao nhất?
-- ???


-- ************************************************************
-- PHẦN 6: SUBQUERY (Truy vấn con)
-- ************************************************************

-- 📌 Định nghĩa:
-- Subquery = query lồng bên trong query khác
-- Có thể dùng trong: WHERE, FROM, SELECT, HAVING

-- 🏋️ BÀI TẬP 6.1: Subquery trong WHERE

-- -- Nhân viên có lương > lương trung bình
-- SELECT * FROM employees
-- WHERE salary > (SELECT AVG(salary) FROM employees);

-- -- Nhân viên thuộc phòng Engineering
-- SELECT * FROM employees
-- WHERE department_id = (SELECT id FROM departments WHERE name = 'Engineering');

-- -- Nhân viên tham gia ít nhất 2 dự án
-- SELECT * FROM employees
-- WHERE id IN (
--   SELECT employee_id FROM employee_projects
--   GROUP BY employee_id
--   HAVING COUNT(*) >= 2
-- );


-- 🏋️ BÀI TẬP 6.2: Subquery trong FROM (Derived Table)

-- -- Lương trung bình theo phòng, lọc phòng có avg > 20M
-- SELECT * FROM (
--   SELECT
--     d.name AS department,
--     AVG(e.salary) AS avg_salary,
--     COUNT(e.id) AS total
--   FROM departments d
--   JOIN employees e ON d.id = e.department_id
--   GROUP BY d.id, d.name
-- ) AS dept_stats
-- WHERE avg_salary > 20000000;


-- 🏋️ BÀI TẬP 6.3: EXISTS

-- -- Phòng ban CÓ nhân viên
-- SELECT * FROM departments d
-- WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);

-- -- Phòng ban KHÔNG CÓ nhân viên
-- SELECT * FROM departments d
-- WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);


-- ************************************************************
-- PHẦN 7: WINDOW FUNCTIONS (Hàm cửa sổ)
-- ************************************************************

-- 📌 Định nghĩa:
-- Window Functions tính toán trên "cửa sổ" các rows liên quan
-- KHÔNG gộp rows lại (khác GROUP BY)
-- Cú pháp: function() OVER (PARTITION BY ... ORDER BY ...)

-- 📌 Các hàm:
-- ROW_NUMBER() → Số thứ tự (không trùng)
-- RANK()       → Xếp hạng (trùng thì bỏ thứ hạng)
-- DENSE_RANK() → Xếp hạng (trùng nhưng KHÔNG bỏ)
-- NTILE(n)     → Chia thành n nhóm đều nhau
-- LAG(col, n)  → Giá trị row trước đó n bước
-- LEAD(col, n) → Giá trị row sau đó n bước
-- SUM/AVG/COUNT() OVER() → Aggregate nhưng giữ nguyên rows

-- 🏋️ BÀI TẬP 7.1: ROW_NUMBER, RANK, DENSE_RANK

-- SELECT
--   first_name, last_name, salary, department_id,
--   ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
--   RANK() OVER (ORDER BY salary DESC) AS rank_num,
--   DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_num
-- FROM employees;


-- 🏋️ BÀI TẬP 7.2: PARTITION BY

-- -- Xếp hạng lương TRONG TỪNG phòng ban
-- SELECT
--   first_name, last_name, salary,
--   d.name AS department,
--   RANK() OVER (PARTITION BY e.department_id ORDER BY salary DESC) AS rank_in_dept
-- FROM employees e
-- JOIN departments d ON e.department_id = d.id;


-- 🏋️ BÀI TẬP 7.3: LAG / LEAD

-- -- So sánh lương với người trước/sau (theo thứ tự salary)
-- SELECT
--   first_name, salary,
--   LAG(salary, 1) OVER (ORDER BY salary) AS prev_salary,
--   LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary,
--   salary - LAG(salary, 1) OVER (ORDER BY salary) AS diff_from_prev
-- FROM employees;


-- 🏋️ BÀI TẬP 7.4: Running Total (Tổng tích lũy)

-- SELECT
--   first_name, salary, hire_date,
--   SUM(salary) OVER (ORDER BY hire_date) AS running_total,
--   AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3
-- FROM employees;


-- 🏋️ BÀI TẬP 7.5: Top N per group
-- 📌 Bài toán kinh điển: Top 2 lương cao nhất mỗi phòng

-- SELECT * FROM (
--   SELECT
--     e.*, d.name AS department,
--     DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
--   FROM employees e
--   JOIN departments d ON e.department_id = d.id
-- ) ranked
-- WHERE rnk <= 2;


-- ************************************************************
-- PHẦN 8: CTE (Common Table Expressions)
-- ************************************************************

-- 📌 Định nghĩa:
-- CTE = bảng tạm được định nghĩa bằng WITH
-- Dễ đọc hơn subquery, có thể đệ quy (recursive)

-- 🏋️ BÀI TẬP 8.1: CTE cơ bản

-- WITH dept_stats AS (
--   SELECT
--     department_id,
--     COUNT(*) AS total,
--     AVG(salary) AS avg_salary
--   FROM employees
--   GROUP BY department_id
-- )
-- SELECT d.name, ds.total, ROUND(ds.avg_salary, 0) AS avg_salary
-- FROM dept_stats ds
-- JOIN departments d ON ds.department_id = d.id
-- ORDER BY avg_salary DESC;


-- 🏋️ BÀI TẬP 8.2: CTE đệ quy (Recursive CTE)
-- 📌 Lấy cây quản lý (hierarchy)

-- WITH RECURSIVE management_tree AS (
--   -- Base case: top managers (không có manager)
--   SELECT id, first_name, last_name, manager_id, 0 AS level
--   FROM employees
--   WHERE manager_id IS NULL
--
--   UNION ALL
--
--   -- Recursive: nhân viên báo cáo cho manager
--   SELECT e.id, e.first_name, e.last_name, e.manager_id, mt.level + 1
--   FROM employees e
--   JOIN management_tree mt ON e.manager_id = mt.id
-- )
-- SELECT
--   CONCAT(REPEAT('  ', level), first_name, ' ', last_name) AS employee,
--   level
-- FROM management_tree
-- ORDER BY level, last_name;


-- ************************************************************
-- PHẦN 9: STORED PROCEDURES & FUNCTIONS
-- ************************************************************

-- 📌 Định nghĩa:
-- Stored Procedure: khối SQL có tên, lưu trên server, gọi bằng CALL
-- Function: trả về 1 giá trị, dùng trong SELECT/WHERE
-- Trigger: tự động chạy khi INSERT/UPDATE/DELETE

-- 🏋️ BÀI TẬP 9.1: Stored Procedure

-- DELIMITER //
-- CREATE PROCEDURE GetEmployeesByDept(IN dept_name VARCHAR(100))
-- BEGIN
--   SELECT e.first_name, e.last_name, e.salary
--   FROM employees e
--   JOIN departments d ON e.department_id = d.id
--   WHERE d.name = dept_name
--   ORDER BY e.salary DESC;
-- END //
-- DELIMITER ;
--
-- CALL GetEmployeesByDept('Engineering');


-- 🏋️ BÀI TẬP 9.2: Procedure với OUTPUT

-- DELIMITER //
-- CREATE PROCEDURE GetDeptStats(
--   IN dept_id INT,
--   OUT total_emp INT,
--   OUT avg_sal DECIMAL(10,2)
-- )
-- BEGIN
--   SELECT COUNT(*), AVG(salary) INTO total_emp, avg_sal
--   FROM employees
--   WHERE department_id = dept_id;
-- END //
-- DELIMITER ;
--
-- CALL GetDeptStats(1, @total, @avg);
-- SELECT @total, @avg;


-- 🏋️ BÀI TẬP 9.3: Function

-- DELIMITER //
-- CREATE FUNCTION XepLoaiLuong(salary DECIMAL(10,2))
-- RETURNS VARCHAR(20)
-- DETERMINISTIC
-- BEGIN
--   IF salary >= 30000000 THEN RETURN 'Cao';
--   ELSEIF salary >= 20000000 THEN RETURN 'Trung Binh';
--   ELSE RETURN 'Thap';
--   END IF;
-- END //
-- DELIMITER ;
--
-- SELECT first_name, salary, XepLoaiLuong(salary) AS xep_loai FROM employees;


-- 🏋️ BÀI TẬP 9.4: Trigger

-- DELIMITER //
-- CREATE TRIGGER before_employee_update
-- BEFORE UPDATE ON employees
-- FOR EACH ROW
-- BEGIN
--   IF NEW.salary < 0 THEN
--     SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Lương không được âm!';
--   END IF;
-- END //
-- DELIMITER ;


-- ************************************************************
-- PHẦN 10: VIEWS (Bảng ảo)
-- ************************************************************

-- 📌 Định nghĩa:
-- View = query được lưu lại như một "bảng ảo"
-- Không lưu dữ liệu thật, chạy query mỗi khi truy vấn
-- Dùng để: đơn giản hóa query phức tạp, bảo mật dữ liệu

-- 🏋️ BÀI TẬP 10.1: Tạo View

-- CREATE VIEW v_employee_detail AS
-- SELECT
--   e.id, CONCAT(e.first_name, ' ', e.last_name) AS full_name,
--   e.email, e.salary, e.hire_date,
--   d.name AS department,
--   CONCAT(m.first_name, ' ', m.last_name) AS manager_name
-- FROM employees e
-- LEFT JOIN departments d ON e.department_id = d.id
-- LEFT JOIN employees m ON e.manager_id = m.id;
--
-- -- Sử dụng view như bảng thường:
-- SELECT * FROM v_employee_detail WHERE department = 'Engineering';


-- ************************************************************
-- PHẦN 11: TRANSACTIONS & LOCKS
-- ************************************************************

-- 📌 Định nghĩa ACID:
-- A (Atomicity)   → Tất cả hoặc không gì cả
-- C (Consistency) → Data luôn hợp lệ trước và sau transaction
-- I (Isolation)   → Các transaction không ảnh hưởng lẫn nhau
-- D (Durability)  → Dữ liệu đã commit sẽ được lưu vĩnh viễn

-- 📌 Isolation Levels:
-- READ UNCOMMITTED → Đọc data chưa commit (dirty read)
-- READ COMMITTED   → Chỉ đọc data đã commit
-- REPEATABLE READ  → Đảm bảo đọc lại kết quả giống nhau (default MySQL)
-- SERIALIZABLE     → Nghiêm ngặt nhất, chạy tuần tự

-- 🏋️ BÀI TẬP 11.1: Transaction cơ bản

-- START TRANSACTION;
--   UPDATE employees SET salary = salary + 5000000 WHERE id = 1;
--   UPDATE employees SET salary = salary - 5000000 WHERE id = 2;
--   -- Kiểm tra: nếu lương < 0 thì rollback
--   -- SELECT salary FROM employees WHERE id = 2;
-- COMMIT;
-- -- Hoặc: ROLLBACK;


-- ************************************************************
-- PHẦN 12: INDEXING & PERFORMANCE
-- ************************************************************

-- 📌 Loại Index:
-- B-Tree Index  → Mặc định, tốt cho =, >, <, BETWEEN, LIKE 'abc%'
-- Hash Index    → Chỉ cho =, != (MEMORY engine)
-- Full-Text     → Tìm kiếm văn bản
-- Composite     → Nhiều cột (tuân theo leftmost prefix rule)
-- Covering      → Index chứa đủ data, không cần đọc bảng

-- 🏋️ BÀI TẬP 12.1: EXPLAIN - Phân tích query

-- EXPLAIN SELECT * FROM employees WHERE salary > 20000000;
-- EXPLAIN SELECT * FROM employees WHERE email = 'an@company.com';
--
-- -- Quan tâm:
-- -- type: ALL (full scan - TỆ), ref/range (index - TỐT), const (PK - RẤT TỐT)
-- -- key: index nào được dùng (NULL = không dùng index)
-- -- rows: số rows phải scan (càng ít càng tốt)

-- 📌 Tips tối ưu:
-- 1. Index cho columns trong WHERE, JOIN, ORDER BY
-- 2. Composite index: đặt column selective nhất trước
-- 3. Tránh: SELECT * (chỉ lấy cần thiết)
-- 4. Tránh: functions trên indexed column (WHERE YEAR(date) = 2024)
-- 5. Dùng LIMIT cho pagination
-- 6. Tránh: LIKE '%abc' (không dùng được index)


-- ************************************************************
-- PHẦN 13: BÀI TOÁN PHỎNG VẤN SQL
-- ************************************************************

-- 🏋️ BÀI TOÁN 13.1: Tìm lương cao thứ N

-- -- Cách 1: LIMIT + OFFSET
-- SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1; -- Thứ 2

-- -- Cách 2: Subquery
-- SELECT MAX(salary) FROM employees
-- WHERE salary < (SELECT MAX(salary) FROM employees);

-- -- Cách 3: DENSE_RANK (tổng quát)
-- SELECT * FROM (
--   SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
--   FROM employees
-- ) ranked WHERE rnk = 3;  -- Lương cao thứ 3


-- 🏋️ BÀI TOÁN 13.2: Tìm bản ghi trùng lặp

-- SELECT email, COUNT(*) AS cnt
-- FROM employees
-- GROUP BY email
-- HAVING cnt > 1;


-- 🏋️ BÀI TOÁN 13.3: Xóa bản ghi trùng (giữ lại id nhỏ nhất)

-- DELETE e1 FROM employees e1
-- INNER JOIN employees e2
-- ON e1.email = e2.email AND e1.id > e2.id;


-- 🏋️ BÀI TOÁN 13.4: Tìm nhân viên có lương cao nhất mỗi phòng

-- -- Cách 1: Subquery
-- SELECT * FROM employees e
-- WHERE salary = (
--   SELECT MAX(salary) FROM employees WHERE department_id = e.department_id
-- );

-- -- Cách 2: Window Function
-- SELECT * FROM (
--   SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
--   FROM employees
-- ) ranked WHERE rnk = 1;


-- 🏋️ BÀI TOÁN 13.5: Tính số ngày liên tiếp (Consecutive Days)
-- 📌 Bài toán kinh điển: tìm chuỗi ngày liên tiếp

-- CREATE TABLE login_logs (
--   user_id INT,
--   login_date DATE
-- );
-- -- Gợi ý: dùng ROW_NUMBER() và DATE_SUB để nhóm ngày liên tiếp
-- -- SELECT user_id, login_date,
-- --   DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS grp
-- -- FROM login_logs;
-- -- Các ngày liên tiếp sẽ có cùng giá trị grp


-- 🏋️ BÀI TOÁN 13.6: Pivot Table (chuyển hàng thành cột)

-- -- Đếm nhân viên theo phòng ban → cột ngang
-- SELECT
--   SUM(CASE WHEN d.name = 'Engineering' THEN 1 ELSE 0 END) AS Engineering,
--   SUM(CASE WHEN d.name = 'Marketing' THEN 1 ELSE 0 END) AS Marketing,
--   SUM(CASE WHEN d.name = 'Sales' THEN 1 ELSE 0 END) AS Sales,
--   SUM(CASE WHEN d.name = 'HR' THEN 1 ELSE 0 END) AS HR,
--   SUM(CASE WHEN d.name = 'Finance' THEN 1 ELSE 0 END) AS Finance
-- FROM employees e
-- JOIN departments d ON e.department_id = d.id;


-- ============================================================
-- 🎯 TỔNG KẾT MYSQL
-- ============================================================
-- Thứ tự học:
-- 1. CREATE DATABASE/TABLE → Kiểu dữ liệu → Constraints
-- 2. CRUD: INSERT, SELECT, UPDATE, DELETE
-- 3. WHERE operators → ORDER BY → LIMIT
-- 4. Aggregate: COUNT, SUM, AVG → GROUP BY → HAVING
-- 5. JOINs: INNER, LEFT, RIGHT, SELF → Multiple JOINs
-- 6. Subqueries → EXISTS → CTE (WITH)
-- 7. Window Functions: ROW_NUMBER, RANK, LAG/LEAD
-- 8. Stored Procedures, Functions, Triggers, Views
-- 9. Transactions → ACID → Isolation Levels
-- 10. Indexing → EXPLAIN → Performance tuning
-- 11. Bài toán phỏng vấn: Nth salary, duplicates, Top per group
--
-- 📚 Tài liệu:
-- - MySQL Docs: https://dev.mysql.com/doc/
-- - SQLBolt: https://sqlbolt.com/
-- - LeetCode SQL: https://leetcode.com/problemset/database/
-- ============================================================
