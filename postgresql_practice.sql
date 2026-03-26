-- ============================================================
-- 🚀 POSTGRESQL ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
-- ============================================================
-- PostgreSQL: RDBMS mã nguồn mở mạnh nhất, hỗ trợ SQL chuẩn
-- Cài đặt: https://www.postgresql.org/download/
-- Tool: pgAdmin, DBeaver, psql (CLI)
-- PostgreSQL khác MySQL ở nhiều tính năng nâng cao!
-- ============================================================


-- ╔══════════════════════════════════════════════════════════════╗
-- ║              📖 LÝ THUYẾT POSTGRESQL TỔNG QUAN              ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 1. POSTGRESQL LÀ GÌ?                                       │
-- └─────────────────────────────────────────────────────────────┘
-- PostgreSQL (Postgres) là RDBMS mã nguồn mở, tuân thủ SQL chuẩn nhất.
-- Nổi bật: extensible, hỗ trợ JSON, arrays, full-text search, GIS.
-- Dùng khi cần: data integrity, tính năng nâng cao, hybrid SQL + NoSQL.

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 2. POSTGRESQL vs MYSQL                                      │
-- └─────────────────────────────────────────────────────────────┘
-- PostgreSQL có mà MySQL không/yếu:
-- ✅ JSONB (JSON nhị phân, query nhanh → thay thế NoSQL trong nhiều case)
-- ✅ ARRAY native (lưu mảng không cần bảng phụ)
-- ✅ RETURNING clause (trả data sau INSERT/UPDATE/DELETE)
-- ✅ UPSERT (ON CONFLICT DO UPDATE/NOTHING)
-- ✅ Materialized Views (view lưu kết quả vật lý)
-- ✅ LATERAL JOIN (subquery tham chiếu bảng trái)
-- ✅ FILTER clause cho aggregate
-- ✅ Full-Text Search built-in mạnh mẽ
-- ✅ Range types (daterange, numrange)
-- ✅ Custom Types, Domains
-- ✅ Table Partitioning mạnh
-- ✅ Row-Level Security (RLS)
-- ✅ Generate Series (tạo dãy số/ngày)

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 3. KIỂU DỮ LIỆU ĐẶC BIỆT                                  │
-- └─────────────────────────────────────────────────────────────┘
-- SERIAL / BIGSERIAL  → Auto-increment
-- UUID                → Unique ID toàn cầu (uuid_generate_v4())
-- JSONB               → JSON nhị phân (nhanh, có index GIN)
-- TEXT[]               → Array native
-- INET / CIDR         → Địa chỉ IP
-- DATERANGE           → Khoảng ngày
-- TIMESTAMPTZ         → Timestamp CÓ timezone (khuyên dùng)
-- NUMERIC(p,s)        → Số chính xác (thay DECIMAL)
-- BOOLEAN             → true/false thật (không phải TINYINT)
--
-- Ví dụ:
--   skills TEXT[] DEFAULT '{}'           -- Array
--   profile JSONB DEFAULT '{}'           -- JSON linh hoạt
--   date_range DATERANGE                 -- Khoảng ngày

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 4. JSONB OPERATIONS                                         │
-- └─────────────────────────────────────────────────────────────┘
-- Operators:
--   ->   lấy value (JSON)    |   ->>  lấy value (text)
--   @>   chứa                |   ?    có key
--   ||   merge               |   -    xóa key
--
-- Ví dụ:
--   SELECT profile->>'level' FROM employees;          -- text
--   SELECT * FROM employees WHERE profile @> '{"level":"senior"}';
--   UPDATE employees SET profile = profile || '{"cert":"AWS"}';

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 5. ARRAY OPERATIONS                                         │
-- └─────────────────────────────────────────────────────────────┘
-- Operators:
--   @>   chứa       |   &&   overlap   |   ||   nối
--   ANY()  khớp 1   |   ALL()  khớp tất cả
--
-- Ví dụ:
--   SELECT * FROM emp WHERE 'JavaScript' = ANY(skills);
--   SELECT * FROM emp WHERE skills @> ARRAY['JS','React']; -- Biết CẢ hai
--   UPDATE emp SET skills = array_append(skills, 'Docker');
--   SELECT skill, COUNT(*) FROM emp, unnest(skills) AS skill GROUP BY skill;

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 6. RETURNING & UPSERT                                       │
-- └─────────────────────────────────────────────────────────────┘
-- RETURNING: trả data sau INSERT/UPDATE/DELETE (MySQL không có!)
--   INSERT INTO users (name) VALUES ('An') RETURNING id, name;
--   DELETE FROM users WHERE id = 1 RETURNING *;
--
-- UPSERT (ON CONFLICT):
--   INSERT INTO users (email, name) VALUES ('a@b.com', 'An')
--   ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
--   ON CONFLICT (email) DO NOTHING;

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 7. MATERIALIZED VIEWS & LATERAL JOIN                        │
-- └─────────────────────────────────────────────────────────────┘
-- Materialized View: view lưu kết quả vật lý → query nhanh
--   CREATE MATERIALIZED VIEW mv_stats AS SELECT ... WITH DATA;
--   REFRESH MATERIALIZED VIEW CONCURRENTLY mv_stats;
--
-- LATERAL JOIN: subquery tham chiếu bảng bên trái (Top N per group)
--   SELECT d.name, top.* FROM departments d
--   CROSS JOIN LATERAL (
--     SELECT * FROM employees e WHERE e.dept_id = d.id
--     ORDER BY salary DESC LIMIT 3
--   ) AS top;

-- ┌─────────────────────────────────────────────────────────────┐
-- │ 8. INDEX TYPES                                              │
-- └─────────────────────────────────────────────────────────────┘
-- B-tree  → Mặc định (<, >, =, BETWEEN)
-- GIN     → Inverted index (array, jsonb, full-text) → KHUYÊN DÙNG
-- GiST    → Range, geometry, full-text
-- BRIN    → Bảng rất lớn, data tự nhiên sắp xếp
-- Partial Index: chỉ index rows thỏa điều kiện
-- Expression Index: index biểu thức (LOWER(email))
--
-- EXPLAIN ANALYZE SELECT ... → xem query plan + thời gian thực tế


-- ╔══════════════════════════════════════════════════════════════╗
-- ║              🏋️ BÀI TẬP THỰC HÀNH BÊN DƯỚI                ║
-- ╚══════════════════════════════════════════════════════════════╝


-- ************************************************************
-- PHẦN 1: SO SÁNH POSTGRESQL vs MYSQL
-- ************************************************************

-- 📌 PostgreSQL có mà MySQL không/yếu:
-- ✅ Kiểu dữ liệu phong phú: ARRAY, JSON/JSONB, hstore, UUID, INET
-- ✅ Full ACID mặc định (MySQL InnoDB mới hỗ trợ)
-- ✅ Materialized Views
-- ✅ RETURNING clause
-- ✅ UPSERT (ON CONFLICT)
-- ✅ Hỗ trợ CTE tốt hơn
-- ✅ Table Inheritance
-- ✅ Custom Types, Domains
-- ✅ Full-text search mạnh mẽ hơn
-- ✅ LATERAL JOIN
-- ✅ FILTER clause cho aggregate
-- ✅ Generate Series

-- 📌 Kiểu dữ liệu PostgreSQL đặc biệt:
-- SERIAL / BIGSERIAL   → Auto-increment (hoặc GENERATED ALWAYS AS IDENTITY)
-- UUID                  → Unique ID toàn cầu
-- JSONB                 → JSON nhị phân (nhanh hơn JSON)
-- ARRAY                 → Mảng giá trị
-- INET / CIDR           → Địa chỉ IP
-- TSRANGE / DATERANGE   → Khoảng thời gian
-- BYTEA                 → Binary data
-- TEXT                   → Chuỗi không giới hạn (khác VARCHAR)
-- BOOLEAN               → true/false (không phải TINYINT(1))


-- ************************************************************
-- PHẦN 2: TẠO DATABASE & TABLE
-- ************************************************************

-- 🏋️ BÀI TẬP 2.1: Tạo Database

-- CREATE DATABASE practice_db
--   WITH ENCODING 'UTF8'
--   LC_COLLATE = 'en_US.UTF-8'
--   LC_CTYPE = 'en_US.UTF-8';
-- \c practice_db   -- Kết nối vào database (psql)


-- 🏋️ BÀI TẬP 2.2: Tạo Tables với PostgreSQL features

-- -- Bật extension UUID
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TABLE departments (
--   id SERIAL PRIMARY KEY,          -- Auto increment
--   name VARCHAR(100) NOT NULL UNIQUE,
--   description TEXT,
--   metadata JSONB DEFAULT '{}',    -- ✅ JSONB!
--   created_at TIMESTAMPTZ DEFAULT NOW()  -- Có timezone
-- );

-- CREATE TABLE employees (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  -- ✅ UUID!
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   phone VARCHAR(20),
--   salary NUMERIC(10, 2) DEFAULT 0.00,  -- NUMERIC thay DECIMAL
--   skills TEXT[] DEFAULT '{}',           -- ✅ ARRAY!
--   hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
--   department_id INT REFERENCES departments(id) ON DELETE SET NULL,
--   manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
--   profile JSONB DEFAULT '{}',           -- ✅ JSONB cho data linh hoạt
--   is_active BOOLEAN DEFAULT TRUE,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- Index cho JSONB và Array
-- CREATE INDEX idx_emp_skills ON employees USING GIN(skills);
-- CREATE INDEX idx_emp_profile ON employees USING GIN(profile);
-- CREATE INDEX idx_emp_salary ON employees(salary DESC);

-- CREATE TABLE projects (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(200) NOT NULL,
--   budget NUMERIC(12, 2),
--   date_range DATERANGE,              -- ✅ Range type!
--   status VARCHAR(20) DEFAULT 'planning'
--     CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
--   tags TEXT[] DEFAULT '{}',          -- ✅ ARRAY!
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- CREATE TABLE employee_projects (
--   employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
--   project_id INT REFERENCES projects(id) ON DELETE CASCADE,
--   role VARCHAR(50) DEFAULT 'member',
--   assigned_date DATE DEFAULT CURRENT_DATE,
--   PRIMARY KEY (employee_id, project_id)
-- );


-- ************************************************************
-- PHẦN 3: INSERT VỚI RETURNING & UPSERT
-- ************************************************************

-- 📌 RETURNING: trả về data sau INSERT/UPDATE/DELETE (MySQL không có!)
-- 📌 ON CONFLICT (UPSERT): xử lý khi trùng unique key

-- 🏋️ BÀI TẬP 3.1: INSERT + RETURNING

-- INSERT INTO departments (name, description, metadata) VALUES
--   ('Engineering', 'Phòng Kỹ thuật', '{"floor": 3, "budget_code": "ENG01"}'),
--   ('Marketing', 'Phòng Marketing', '{"floor": 2}'),
--   ('Sales', 'Phòng Kinh doanh', '{"floor": 1}'),
--   ('HR', 'Phòng Nhân sự', '{"floor": 2}'),
--   ('Finance', 'Phòng Tài chính', '{"floor": 4}')
-- RETURNING id, name;  -- ✅ Trả về id và name vừa tạo!

-- INSERT INTO employees (first_name, last_name, email, salary, skills, department_id, profile) VALUES
--   ('Nguyen', 'Van An', 'an@company.com', 25000000,
--    ARRAY['JavaScript', 'React', 'Node.js'], 1,
--    '{"level": "senior", "years_exp": 5}')
-- RETURNING id, first_name, last_name;


-- 🏋️ BÀI TẬP 3.2: UPSERT (ON CONFLICT)

-- -- Nếu email trùng → update salary, giữ nguyên record
-- INSERT INTO employees (first_name, last_name, email, salary, department_id)
-- VALUES ('Nguyen', 'Van An', 'an@company.com', 30000000, 1)
-- ON CONFLICT (email) DO UPDATE
-- SET salary = EXCLUDED.salary,    -- EXCLUDED = row mới
--     updated_at = NOW()
-- RETURNING *;

-- -- Nếu trùng → không làm gì
-- INSERT INTO departments (name, description)
-- VALUES ('Engineering', 'Updated description')
-- ON CONFLICT (name) DO NOTHING;


-- ************************************************************
-- PHẦN 4: ARRAY OPERATIONS
-- ************************************************************

-- 📌 PostgreSQL hỗ trợ mảng native (không cần JSON!)
-- Operators: @> (chứa), <@ (nằm trong), && (overlap), || (nối)
-- Functions: array_length, unnest, array_agg, array_append, array_remove

-- 🏋️ BÀI TẬP 4.1: Query với Array

-- -- Tìm nhân viên biết JavaScript
-- SELECT * FROM employees WHERE 'JavaScript' = ANY(skills);

-- -- Tìm nhân viên biết CẢ JavaScript VÀ React
-- SELECT * FROM employees WHERE skills @> ARRAY['JavaScript', 'React'];

-- -- Tìm nhân viên biết MỘT TRONG JavaScript HOẶC Python
-- SELECT * FROM employees WHERE skills && ARRAY['JavaScript', 'Python'];

-- -- Đếm số skills
-- SELECT first_name, array_length(skills, 1) AS skill_count FROM employees;


-- 🏋️ BÀI TẬP 4.2: Update Array

-- -- Thêm skill
-- UPDATE employees
-- SET skills = array_append(skills, 'Docker')
-- WHERE email = 'an@company.com';

-- -- Xóa skill
-- UPDATE employees
-- SET skills = array_remove(skills, 'React')
-- WHERE email = 'an@company.com';

-- -- Nối mảng
-- UPDATE employees
-- SET skills = skills || ARRAY['AWS', 'Kubernetes']
-- WHERE email = 'an@company.com';


-- 🏋️ BÀI TẬP 4.3: UNNEST - Tách mảng thành rows

-- -- Đếm tần suất mỗi skill (giống $unwind MongoDB)
-- SELECT skill, COUNT(*) AS frequency
-- FROM employees, unnest(skills) AS skill
-- GROUP BY skill
-- ORDER BY frequency DESC;


-- ************************************************************
-- PHẦN 5: JSONB OPERATIONS
-- ************************************************************

-- 📌 JSONB operators:
-- ->   : lấy value (JSON)      | ->>  : lấy value (text)
-- #>   : lấy nested (JSON)     | #>>  : lấy nested (text)
-- @>   : chứa                  | <@   : nằm trong
-- ?    : có key                 | ?|   : có BẤT KỲ key
-- ?&   : có TẤT CẢ keys        | ||   : merge
-- -    : xóa key                | #-   : xóa nested key

-- 🏋️ BÀI TẬP 5.1: Query JSONB

-- -- Lấy giá trị từ JSONB
-- SELECT first_name, profile->>'level' AS level FROM employees;
-- SELECT first_name, profile->'years_exp' AS years FROM employees;

-- -- Lọc theo JSONB field
-- SELECT * FROM employees WHERE profile->>'level' = 'senior';
-- SELECT * FROM employees WHERE (profile->>'years_exp')::int > 3;

-- -- Kiểm tra key tồn tại
-- SELECT * FROM employees WHERE profile ? 'level';

-- -- Kiểm tra chứa
-- SELECT * FROM employees WHERE profile @> '{"level": "senior"}';

-- -- Lấy metadata phòng ban
-- SELECT name, metadata->>'floor' AS floor FROM departments;
-- SELECT * FROM departments WHERE (metadata->>'floor')::int > 2;


-- 🏋️ BÀI TẬP 5.2: Update JSONB

-- -- Set field trong JSONB
-- UPDATE employees
-- SET profile = profile || '{"certification": "AWS Certified"}'
-- WHERE email = 'an@company.com';

-- -- Dùng jsonb_set
-- UPDATE employees
-- SET profile = jsonb_set(profile, '{level}', '"lead"')
-- WHERE email = 'an@company.com';

-- -- Xóa key
-- UPDATE employees
-- SET profile = profile - 'certification'
-- WHERE email = 'an@company.com';


-- 🏋️ BÀI TẬP 5.3: JSONB Aggregate

-- -- Tạo JSON object từ query
-- SELECT jsonb_build_object(
--   'name', CONCAT(first_name, ' ', last_name),
--   'salary', salary,
--   'skills', skills,
--   'profile', profile
-- ) AS employee_json
-- FROM employees;

-- -- Gom rows thành JSON array
-- SELECT jsonb_agg(jsonb_build_object('name', first_name, 'salary', salary))
-- FROM employees;


-- ************************************************************
-- PHẦN 6: WINDOW FUNCTIONS NÂNG CAO
-- ************************************************************

-- 📌 PostgreSQL hỗ trợ đầy đủ Window Functions (mạnh hơn MySQL)

-- 🏋️ BÀI TẬP 6.1: FILTER clause (PostgreSQL only!)
-- 📌 Thay thế CASE WHEN trong aggregate

-- SELECT
--   department_id,
--   COUNT(*) AS total,
--   COUNT(*) FILTER (WHERE salary > 20000000) AS high_salary_count,
--   AVG(salary) FILTER (WHERE is_active = true) AS active_avg_salary,
--   SUM(salary) FILTER (WHERE hire_date > '2021-01-01') AS recent_hires_total
-- FROM employees
-- GROUP BY department_id;


-- 🏋️ BÀI TẬP 6.2: PERCENTILE & Statistics

-- SELECT
--   department_id,
--   PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary,
--   PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY salary) AS p90_salary,
--   STDDEV(salary) AS salary_stddev,
--   VARIANCE(salary) AS salary_variance
-- FROM employees
-- GROUP BY department_id;


-- 🏋️ BÀI TẬP 6.3: Frame Clause chi tiết

-- SELECT
--   first_name, salary, hire_date,
--   -- Tổng tích lũy
--   SUM(salary) OVER (ORDER BY hire_date) AS running_total,
--   -- Trung bình 3 rows (trước, hiện tại, sau)
--   AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS moving_avg,
--   -- % so với tổng phòng ban
--   ROUND(salary / SUM(salary) OVER (PARTITION BY department_id) * 100, 2) AS pct_of_dept
-- FROM employees;


-- ************************************************************
-- PHẦN 7: CTE & RECURSIVE CTE
-- ************************************************************

-- 🏋️ BÀI TẬP 7.1: Multiple CTEs

-- WITH
-- dept_stats AS (
--   SELECT department_id, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
--   FROM employees
--   GROUP BY department_id
-- ),
-- high_performers AS (
--   SELECT * FROM employees WHERE salary > 25000000
-- )
-- SELECT d.name, ds.emp_count, ROUND(ds.avg_sal, 0) AS avg_salary,
--        COUNT(hp.id) AS high_performer_count
-- FROM dept_stats ds
-- JOIN departments d ON ds.department_id = d.id
-- LEFT JOIN high_performers hp ON hp.department_id = d.id
-- GROUP BY d.name, ds.emp_count, ds.avg_sal;


-- 🏋️ BÀI TẬP 7.2: Recursive CTE - Quản lý cây

-- WITH RECURSIVE org_tree AS (
--   SELECT id, first_name, last_name, manager_id, 1 AS depth,
--          ARRAY[first_name || ' ' || last_name] AS path
--   FROM employees WHERE manager_id IS NULL
--
--   UNION ALL
--
--   SELECT e.id, e.first_name, e.last_name, e.manager_id, ot.depth + 1,
--          ot.path || (e.first_name || ' ' || e.last_name)
--   FROM employees e
--   JOIN org_tree ot ON e.manager_id = ot.id
-- )
-- SELECT
--   REPEAT('  ', depth - 1) || first_name || ' ' || last_name AS employee,
--   depth,
--   array_to_string(path, ' → ') AS hierarchy
-- FROM org_tree
-- ORDER BY path;


-- 🏋️ BÀI TẬP 7.3: Generate Series (PostgreSQL only!)
-- 📌 Tạo dãy số hoặc ngày → rất hữu ích cho báo cáo

-- -- Dãy số
-- SELECT generate_series(1, 10) AS num;

-- -- Dãy ngày (30 ngày gần nhất)
-- SELECT generate_series(
--   CURRENT_DATE - INTERVAL '30 days',
--   CURRENT_DATE,
--   INTERVAL '1 day'
-- )::DATE AS date;

-- -- Ứng dụng: Báo cáo ngày kể cả ngày không có data
-- SELECT dates.date, COALESCE(COUNT(e.id), 0) AS hires
-- FROM generate_series('2020-01-01'::date, '2024-12-31'::date, '1 month') AS dates(date)
-- LEFT JOIN employees e ON DATE_TRUNC('month', e.hire_date) = dates.date
-- GROUP BY dates.date
-- ORDER BY dates.date;


-- ************************************************************
-- PHẦN 8: MATERIALIZED VIEWS
-- ************************************************************

-- 📌 Định nghĩa:
-- View thường: chạy query mỗi lần truy cập
-- Materialized View: lưu kết quả vật lý, cần REFRESH để cập nhật
-- → Nhanh hơn cho query phức tạp, dùng cho dashboard/báo cáo

-- 🏋️ BÀI TẬP 8.1: Tạo & Refresh Materialized View

-- CREATE MATERIALIZED VIEW mv_dept_summary AS
-- SELECT
--   d.id, d.name,
--   COUNT(e.id) AS total_employees,
--   ROUND(AVG(e.salary), 0) AS avg_salary,
--   SUM(e.salary) AS total_salary,
--   MIN(e.hire_date) AS earliest_hire,
--   MAX(e.hire_date) AS latest_hire
-- FROM departments d
-- LEFT JOIN employees e ON d.id = e.department_id
-- GROUP BY d.id, d.name
-- WITH DATA;  -- Tạo và populate ngay

-- -- Tạo index trên materialized view
-- CREATE UNIQUE INDEX idx_mv_dept ON mv_dept_summary(id);

-- -- Sử dụng như bảng thường (siêu nhanh!)
-- SELECT * FROM mv_dept_summary ORDER BY avg_salary DESC;

-- -- Refresh khi data thay đổi
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_dept_summary;
-- -- CONCURRENTLY: không lock read (cần unique index)


-- ************************************************************
-- PHẦN 9: LATERAL JOIN
-- ************************************************************

-- 📌 LATERAL JOIN cho phép subquery tham chiếu columns từ bảng bên trái
-- → Mạnh hơn correlated subquery, dùng cho "Top N per group"

-- 🏋️ BÀI TẬP 9.1: Top 2 lương cao nhất mỗi phòng (dùng LATERAL)

-- SELECT d.name, top_emp.*
-- FROM departments d
-- CROSS JOIN LATERAL (
--   SELECT first_name, last_name, salary
--   FROM employees e
--   WHERE e.department_id = d.id
--   ORDER BY salary DESC
--   LIMIT 2
-- ) AS top_emp;


-- 🏋️ BÀI TẬP 9.2: Dự án gần nhất của mỗi nhân viên

-- SELECT e.first_name, e.last_name, latest.*
-- FROM employees e
-- CROSS JOIN LATERAL (
--   SELECT p.name AS project, ep.role, ep.assigned_date
--   FROM employee_projects ep
--   JOIN projects p ON ep.project_id = p.id
--   WHERE ep.employee_id = e.id
--   ORDER BY ep.assigned_date DESC
--   LIMIT 1
-- ) AS latest;


-- ************************************************************
-- PHẦN 10: FULL-TEXT SEARCH
-- ************************************************************

-- 📌 PostgreSQL có full-text search built-in mạnh mẽ
-- tsvector: document được tokenize
-- tsquery: query tìm kiếm
-- @@ : match operator
-- ts_rank: tính relevance score

-- 🏋️ BÀI TẬP 10.1: Full-Text Search

-- -- Thêm column tsvector
-- ALTER TABLE employees ADD COLUMN search_vector tsvector;

-- -- Cập nhật search vector
-- UPDATE employees SET search_vector =
--   to_tsvector('english', COALESCE(first_name, '') || ' ' || COALESCE(last_name, '') || ' ' || COALESCE(email, ''));

-- -- Tạo GIN index
-- CREATE INDEX idx_search ON employees USING GIN(search_vector);

-- -- Tìm kiếm
-- SELECT first_name, last_name, ts_rank(search_vector, query) AS rank
-- FROM employees, to_tsquery('Nguyen | Van') AS query
-- WHERE search_vector @@ query
-- ORDER BY rank DESC;

-- -- Tạo trigger auto-update search vector
-- CREATE OR REPLACE FUNCTION update_search_vector()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.search_vector := to_tsvector('english', NEW.first_name || ' ' || NEW.last_name || ' ' || NEW.email);
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trg_search_vector
-- BEFORE INSERT OR UPDATE ON employees
-- FOR EACH ROW EXECUTE FUNCTION update_search_vector();


-- ************************************************************
-- PHẦN 11: PARTITIONING (Phân vùng bảng)
-- ************************************************************

-- 📌 Chia bảng lớn thành nhiều phân vùng nhỏ → tăng performance
-- Loại: RANGE, LIST, HASH

-- 🏋️ BÀI TẬP 11.1: Range Partitioning

-- CREATE TABLE orders (
--   id SERIAL,
--   customer_id INT,
--   amount NUMERIC(10,2),
--   order_date DATE NOT NULL,
--   status VARCHAR(20)
-- ) PARTITION BY RANGE (order_date);

-- -- Tạo partitions theo năm
-- CREATE TABLE orders_2023 PARTITION OF orders
--   FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
-- CREATE TABLE orders_2024 PARTITION OF orders
--   FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
-- CREATE TABLE orders_2025 PARTITION OF orders
--   FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- -- Query tự động chỉ scan partition liên quan
-- SELECT * FROM orders WHERE order_date BETWEEN '2024-06-01' AND '2024-12-31';


-- ************************************************************
-- PHẦN 12: CUSTOM TYPES & DOMAINS
-- ************************************************************

-- 📌 PostgreSQL cho phép tạo kiểu dữ liệu riêng

-- 🏋️ BÀI TẬP 12.1: ENUM Type

-- CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'on_leave', 'terminated');
-- -- ALTER TABLE employees ADD COLUMN status employee_status DEFAULT 'active';


-- 🏋️ BÀI TẬP 12.2: Composite Type

-- CREATE TYPE address_type AS (
--   street VARCHAR(200),
--   city VARCHAR(100),
--   province VARCHAR(100),
--   postal_code VARCHAR(10)
-- );
-- -- ALTER TABLE employees ADD COLUMN home_address address_type;
-- -- INSERT: ROW('123 Nguyen Hue', 'HCM', 'HCM', '70000')


-- 🏋️ BÀI TẬP 12.3: Domain (kiểu dữ liệu + constraint)

-- CREATE DOMAIN email_address AS VARCHAR(255)
--   CHECK (VALUE ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
-- CREATE DOMAIN positive_money AS NUMERIC(10,2)
--   CHECK (VALUE >= 0);
-- -- Dùng: salary positive_money


-- ************************************************************
-- PHẦN 13: PL/pgSQL (Stored Functions)
-- ************************************************************

-- 🏋️ BÀI TẬP 13.1: Function cơ bản

-- CREATE OR REPLACE FUNCTION get_full_name(emp_id UUID)
-- RETURNS TEXT AS $$
-- DECLARE
--   full_name TEXT;
-- BEGIN
--   SELECT first_name || ' ' || last_name INTO full_name
--   FROM employees WHERE id = emp_id;
--
--   IF NOT FOUND THEN
--     RAISE EXCEPTION 'Employee % not found', emp_id;
--   END IF;
--
--   RETURN full_name;
-- END;
-- $$ LANGUAGE plpgsql;


-- 🏋️ BÀI TẬP 13.2: Function trả về TABLE

-- CREATE OR REPLACE FUNCTION get_dept_employees(dept_name TEXT)
-- RETURNS TABLE (
--   full_name TEXT,
--   email VARCHAR,
--   salary NUMERIC
-- ) AS $$
-- BEGIN
--   RETURN QUERY
--   SELECT e.first_name || ' ' || e.last_name, e.email, e.salary
--   FROM employees e
--   JOIN departments d ON e.department_id = d.id
--   WHERE d.name = dept_name
--   ORDER BY e.salary DESC;
-- END;
-- $$ LANGUAGE plpgsql;
--
-- -- Sử dụng:
-- SELECT * FROM get_dept_employees('Engineering');


-- 🏋️ BÀI TẬP 13.3: Trigger Function

-- CREATE OR REPLACE FUNCTION update_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;
--
-- CREATE TRIGGER trg_employee_update
-- BEFORE UPDATE ON employees
-- FOR EACH ROW EXECUTE FUNCTION update_timestamp();


-- ************************************************************
-- PHẦN 14: PERFORMANCE & INDEXING
-- ************************************************************

-- 📌 PostgreSQL Index Types:
-- B-tree  → Mặc định, tốt cho <, >, =, BETWEEN
-- Hash    → Chỉ cho = (ít dùng)
-- GIN     → Inverted index cho array, jsonb, full-text
-- GiST    → Generalized, cho range, geometry, full-text
-- BRIN    → Block Range, cho bảng rất lớn có data tự nhiên sắp xếp
-- SP-GiST → Space-partitioned GiST

-- 🏋️ BÀI TẬP 14.1: Các loại Index

-- CREATE INDEX idx_btree_salary ON employees(salary);
-- CREATE INDEX idx_gin_skills ON employees USING GIN(skills);
-- CREATE INDEX idx_gin_profile ON employees USING GIN(profile jsonb_path_ops);
-- CREATE INDEX idx_gist_daterange ON projects USING GiST(date_range);

-- -- Partial Index: chỉ index data thỏa điều kiện
-- CREATE INDEX idx_active_emp ON employees(salary) WHERE is_active = true;

-- -- Expression Index
-- CREATE INDEX idx_lower_email ON employees(LOWER(email));


-- 🏋️ BÀI TẬP 14.2: EXPLAIN ANALYZE

-- EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 20000000;
-- EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
--   SELECT * FROM employees WHERE profile @> '{"level": "senior"}';

-- -- Quan tâm:
-- -- Seq Scan → Full scan (cần index?)
-- -- Index Scan → Dùng index (tốt)
-- -- Bitmap Index Scan → Kết hợp nhiều index
-- -- Execution Time → Thời gian thực tế


-- ************************************************************
-- PHẦN 15: BÀI TOÁN THỰC TẾ POSTGRESQL
-- ************************************************************

-- 🏋️ BÀI TOÁN 15.1: Tính khoảng cách liên tiếp (Gaps & Islands)

-- WITH numbered AS (
--   SELECT *, ROW_NUMBER() OVER (ORDER BY hire_date) AS rn
--   FROM employees
-- ),
-- gaps AS (
--   SELECT
--     hire_date,
--     hire_date - (rn || ' days')::INTERVAL AS grp
--   FROM numbered
-- )
-- SELECT MIN(hire_date) AS start_date, MAX(hire_date) AS end_date,
--        COUNT(*) AS consecutive_hires
-- FROM gaps GROUP BY grp ORDER BY start_date;


-- 🏋️ BÀI TOÁN 15.2: Crosstab / Pivot (cần tablefunc extension)

-- CREATE EXTENSION IF NOT EXISTS tablefunc;
-- -- Hoặc dùng FILTER:
-- SELECT
--   EXTRACT(YEAR FROM hire_date) AS year,
--   COUNT(*) FILTER (WHERE department_id = 1) AS engineering,
--   COUNT(*) FILTER (WHERE department_id = 2) AS marketing,
--   COUNT(*) FILTER (WHERE department_id = 3) AS sales
-- FROM employees
-- GROUP BY EXTRACT(YEAR FROM hire_date)
-- ORDER BY year;


-- 🏋️ BÀI TOÁN 15.3: JSON API Response trực tiếp từ SQL

-- SELECT jsonb_build_object(
--   'success', true,
--   'data', jsonb_agg(jsonb_build_object(
--     'id', e.id,
--     'fullName', e.first_name || ' ' || e.last_name,
--     'email', e.email,
--     'salary', e.salary,
--     'department', d.name,
--     'skills', e.skills,
--     'profile', e.profile
--   )),
--   'total', COUNT(*)
-- ) AS api_response
-- FROM employees e
-- JOIN departments d ON e.department_id = d.id
-- WHERE e.is_active = true;


-- 🏋️ BÀI TOÁN 15.4: Row-Level Security (RLS)
-- 📌 Kiểm soát truy cập dữ liệu ở mức row

-- ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
--
-- -- Policy: user chỉ xem được data của phòng mình
-- CREATE POLICY dept_isolation ON employees
--   USING (department_id = current_setting('app.department_id')::INT);
--
-- -- Set context trước khi query:
-- SET app.department_id = '1';
-- SELECT * FROM employees; -- Chỉ thấy phòng Engineering


-- ============================================================
-- 🎯 TỔNG KẾT POSTGRESQL
-- ============================================================
-- Thứ tự học:
-- 1. Cơ bản giống MySQL → CRUD, JOINs, Aggregate, Window Functions
-- 2. RETURNING clause & UPSERT (ON CONFLICT)
-- 3. ARRAY type & operations
-- 4. JSONB type & operations (thay NoSQL trong nhiều trường hợp)
-- 5. Generate Series → Materialized Views → LATERAL JOIN
-- 6. Full-Text Search built-in
-- 7. Partitioning → Custom Types → Domains
-- 8. PL/pgSQL → Functions → Triggers
-- 9. GIN/GiST Index → Partial Index → EXPLAIN ANALYZE
-- 10. Advanced: RLS, Crosstab, JSON API từ SQL
--
-- 📌 Khi nào chọn PostgreSQL thay MySQL?
-- → Cần JSONB (hybrid SQL + NoSQL)
-- → Cần Array, Range types
-- → Cần Full-text search mạnh
-- → Cần Materialized Views
-- → Cần data integrity & compliance
-- → Cần GIS/Geospatial (PostGIS)
--
-- 📚 Tài liệu:
-- - PostgreSQL Docs: https://www.postgresql.org/docs/
-- - PostgreSQL Tutorial: https://www.postgresqltutorial.com/
-- - PgExercises: https://pgexercises.com/
-- ============================================================
