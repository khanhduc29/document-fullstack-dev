// ============================================================
// 🚀 REACTJS ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
// ============================================================
// File này là tài liệu ôn tập + bài tập thực hành React.
// Mỗi phần có: 📌 Định nghĩa → 🏋️ Bài tập → Gợi ý
// Hãy tạo project React (npx create-react-app hoặc Vite) rồi
// copy từng phần vào component để chạy thử!
// ============================================================


// ************************************************************
// PHẦN 1: JSX & COMPONENT CƠ BẢN
// ************************************************************

// 📌 Định nghĩa:
// - JSX: cú pháp mở rộng cho JS, giống HTML nhưng thực chất là JS
// - Component: khối UI tái sử dụng, nhận props → trả về JSX
// - Function Component: cách viết component hiện đại (khuyên dùng)
// - Quy tắc JSX: phải có 1 root element, dùng className thay class,
//   dùng {} để nhúng JS, self-closing tags phải có /

// 🏋️ BÀI TẬP 1.1: Tạo component hiển thị thẻ profile
// Gợi ý: Nhận props name, avatar, bio

// function ProfileCard({ name, avatar, bio }) {
//   return (
//     <div className="profile-card">
//       {/* <img src={???} alt={???} /> */}
//       {/* <h2>{???}</h2> */}
//       {/* <p>{???}</p> */}
//     </div>
//   );
// }


// 🏋️ BÀI TẬP 1.2: Render danh sách (List Rendering)
// Gợi ý: Dùng .map() với key duy nhất

// function UserList({ users }) {
//   // users = [{ id: 1, name: "An" }, { id: 2, name: "Binh" }]
//   return (
//     <ul>
//       {/* users.map(user => <li key={???}>{???}</li>) */}
//     </ul>
//   );
// }


// 🏋️ BÀI TẬP 1.3: Conditional Rendering
// Gợi ý: Dùng ternary, &&, hoặc early return

// function Greeting({ isLoggedIn, username }) {
//   // Cách 1: Ternary
//   // return isLoggedIn ? <h1>Xin chào, {username}</h1> : <h1>Vui lòng đăng nhập</h1>;

//   // Cách 2: &&
//   // return (
//   //   <>
//   //     {isLoggedIn && <h1>Xin chào, {username}</h1>}
//   //     {!isLoggedIn && <h1>Vui lòng đăng nhập</h1>}
//   //   </>
//   // );
// }


// ************************************************************
// PHẦN 2: STATE & USESTATE
// ************************************************************

// 📌 Định nghĩa:
// - State: dữ liệu nội bộ của component, khi thay đổi → re-render
// - useState(initialValue): trả về [value, setValue]
// - setState là ASYNCHRONOUS → không thay đổi ngay lập tức
// - Khi update dựa trên state cũ → dùng callback: setState(prev => prev + 1)
// - State là IMMUTABLE → không mutate trực tiếp, tạo bản sao mới

// 🏋️ BÀI TẬP 2.1: Counter App
// import { useState } from 'react';

// function Counter() {
//   // const [count, setCount] = useState(0);
//   // return (
//   //   <div>
//   //     <h1>{count}</h1>
//   //     <button onClick={() => setCount(prev => prev + 1)}>+</button>
//   //     <button onClick={() => setCount(prev => prev - 1)}>-</button>
//   //     <button onClick={() => setCount(0)}>Reset</button>
//   //   </div>
//   // );
// }


// 🏋️ BÀI TẬP 2.2: Toggle Dark Mode
// Gợi ý: Dùng boolean state + conditional className

// function ThemeToggle() {
//   // const [isDark, setIsDark] = useState(false);
//   // return (
//   //   <div className={isDark ? "dark" : "light"}>
//   //     <button onClick={() => setIsDark(prev => !prev)}>
//   //       {isDark ? "🌞 Light" : "🌙 Dark"}
//   //     </button>
//   //   </div>
//   // );
// }


// 🏋️ BÀI TẬP 2.3: Todo List (CRUD với state)
// Gợi ý: Dùng mảng trong state, spread operator

// function TodoApp() {
//   // const [todos, setTodos] = useState([]);
//   // const [input, setInput] = useState("");
//   //
//   // const addTodo = () => {
//   //   if (!input.trim()) return;
//   //   setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
//   //   setInput("");
//   // };
//   //
//   // const toggleTodo = (id) => {
//   //   setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
//   // };
//   //
//   // const deleteTodo = (id) => {
//   //   setTodos(prev => prev.filter(t => t.id !== id));
//   // };
//   //
//   // ⚠️ BÀI TẬP: Viết phần JSX return cho component này
// }


// ************************************************************
// PHẦN 3: USEEFFECT & SIDE EFFECTS
// ************************************************************

// 📌 Định nghĩa:
// - useEffect(callback, deps): xử lý side effects (API call, DOM, timer)
// - deps = []: chạy 1 lần sau mount
// - deps = [a, b]: chạy khi a hoặc b thay đổi
// - Không có deps: chạy sau MỌI render
// - Cleanup function: return () => {} trong callback → chạy khi unmount

// 🏋️ BÀI TẬP 3.1: Fetch data từ API
// import { useState, useEffect } from 'react';

// function UsersList() {
//   // const [users, setUsers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   //
//   // useEffect(() => {
//   //   fetch("https://jsonplaceholder.typicode.com/users")
//   //     .then(res => res.json())
//   //     .then(data => { setUsers(data); setLoading(false); })
//   //     .catch(err => { setError(err.message); setLoading(false); });
//   // }, []); // ← Chạy 1 lần
//   //
//   // if (loading) return <p>Đang tải...</p>;
//   // if (error) return <p>Lỗi: {error}</p>;
//   // return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
// }


// 🏋️ BÀI TẬP 3.2: Cleanup - Đồng hồ đếm ngược
// Gợi ý: setInterval + cleanup clearInterval

// function Countdown({ seconds }) {
//   // const [timeLeft, setTimeLeft] = useState(seconds);
//   //
//   // useEffect(() => {
//   //   if (timeLeft <= 0) return;
//   //   const timer = setInterval(() => {
//   //     setTimeLeft(prev => prev - 1);
//   //   }, 1000);
//   //   return () => clearInterval(timer); // ← CLEANUP!
//   // }, [timeLeft]);
//   //
//   // return <h1>{timeLeft > 0 ? timeLeft : "Hết giờ! ⏰"}</h1>;
// }


// 🏋️ BÀI TẬP 3.3: Window resize listener
// Gợi ý: addEventListener + removeEventListener trong cleanup

// function WindowSize() {
//   // const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
//   //
//   // useEffect(() => {
//   //   const handleResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
//   //   window.addEventListener("resize", handleResize);
//   //   return () => window.removeEventListener("resize", handleResize);
//   // }, []);
//   //
//   // return <p>Kích thước: {size.w} x {size.h}</p>;
// }


// ************************************************************
// PHẦN 4: USEREF & DOM MANIPULATION
// ************************************************************

// 📌 Định nghĩa:
// - useRef(): tạo mutable reference, KHÔNG gây re-render khi thay đổi
// - ref.current: giá trị hiện tại
// - Dùng để: truy cập DOM element, lưu giá trị persist qua renders,
//   lưu previous state, lưu timer ID

// 🏋️ BÀI TẬP 4.1: Auto-focus input
// import { useRef, useEffect } from 'react';

// function SearchBox() {
//   // const inputRef = useRef(null);
//   //
//   // useEffect(() => {
//   //   inputRef.current.focus(); // Auto focus khi mount
//   // }, []);
//   //
//   // return <input ref={inputRef} placeholder="Tìm kiếm..." />;
// }


// 🏋️ BÀI TẬP 4.2: Đếm số lần render (useRef vs useState)
// Gợi ý: useRef không gây re-render → tránh infinite loop

// function RenderCounter() {
//   // const [value, setValue] = useState("");
//   // const renderCount = useRef(0);
//   //
//   // useEffect(() => {
//   //   renderCount.current += 1;
//   // });
//   //
//   // return (
//   //   <div>
//   //     <input value={value} onChange={e => setValue(e.target.value)} />
//   //     <p>Đã render: {renderCount.current} lần</p>
//   //   </div>
//   // );
// }


// 🏋️ BÀI TẬP 4.3: Stopwatch (useRef lưu interval ID)
// Gợi ý: useRef lưu interval, useState lưu time hiển thị

// function Stopwatch() {
//   // const [time, setTime] = useState(0);
//   // const [isRunning, setIsRunning] = useState(false);
//   // const intervalRef = useRef(null);
//   //
//   // const start = () => { ??? };
//   // const stop = () => { clearInterval(intervalRef.current); setIsRunning(false); };
//   // const reset = () => { stop(); setTime(0); };
//   //
//   // ⚠️ BÀI TẬP: Hoàn thành hàm start() và phần JSX
// }


// ************************************************************
// PHẦN 5: USEMEMO & USECALLBACK (Performance)
// ************************************************************

// 📌 Định nghĩa:
// - useMemo(fn, deps): cache GIÁ TRỊ tính toán nặng, chỉ tính lại khi deps đổi
// - useCallback(fn, deps): cache HÀM, tránh tạo hàm mới mỗi render
// - React.memo(Component): HOC bọc component, chỉ re-render khi props thay đổi
// - Chỉ dùng khi cần thiết! Không lạm dụng → overhead quản lý cache

// 🏋️ BÀI TẬP 5.1: useMemo - Lọc danh sách lớn
// import { useState, useMemo } from 'react';

// function FilteredList() {
//   // const [search, setSearch] = useState("");
//   // const [items] = useState(Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`));
//   //
//   // const filteredItems = useMemo(() => {
//   //   console.log("Đang lọc..."); // Chỉ log khi search thay đổi
//   //   return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
//   // }, [search, items]);
//   //
//   // return (
//   //   <div>
//   //     <input value={search} onChange={e => setSearch(e.target.value)} />
//   //     <p>Tìm thấy: {filteredItems.length}</p>
//   //     <ul>{filteredItems.slice(0, 20).map(item => <li key={item}>{item}</li>)}</ul>
//   //   </div>
//   // );
// }


// 🏋️ BÀI TẬP 5.2: useCallback + React.memo
// Gợi ý: Child component chỉ re-render khi callback thực sự thay đổi

// const ExpensiveChild = React.memo(({ onClick, label }) => {
//   console.log(`${label} rendered!`);
//   return <button onClick={onClick}>{label}</button>;
// });

// function Parent() {
//   // const [count, setCount] = useState(0);
//   // const [text, setText] = useState("");
//   //
//   // // ❌ Không dùng useCallback → child re-render mỗi khi parent render
//   // // const handleClick = () => setCount(prev => prev + 1);
//   //
//   // // ✅ Dùng useCallback
//   // const handleClick = useCallback(() => setCount(prev => prev + 1), []);
//   //
//   // return (
//   //   <div>
//   //     <input value={text} onChange={e => setText(e.target.value)} />
//   //     <ExpensiveChild onClick={handleClick} label={`Count: ${count}`} />
//   //   </div>
//   // );
// }


// ************************************************************
// PHẦN 6: CONTEXT API (Global State)
// ************************************************************

// 📌 Định nghĩa:
// - createContext(): tạo context object
// - Provider: component cung cấp giá trị cho cây con
// - useContext(Context): hook lấy giá trị từ context gần nhất
// - Dùng cho: theme, auth, language, global settings
// - ⚠️ Khi context thay đổi, TẤT CẢ consumer re-render

// 🏋️ BÀI TẬP 6.1: Theme Context
// import { createContext, useContext, useState } from 'react';

// const ThemeContext = createContext();

// function ThemeProvider({ children }) {
//   // const [theme, setTheme] = useState("light");
//   // const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
//   // return (
//   //   <ThemeContext.Provider value={{ theme, toggleTheme }}>
//   //     {children}
//   //   </ThemeContext.Provider>
//   // );
// }

// function ThemedButton() {
//   // const { theme, toggleTheme } = useContext(ThemeContext);
//   // return (
//   //   <button
//   //     style={{ background: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#333" }}
//   //     onClick={toggleTheme}
//   //   >
//   //     Theme: {theme}
//   //   </button>
//   // );
// }

// // Sử dụng:
// // <ThemeProvider><ThemedButton /></ThemeProvider>


// 🏋️ BÀI TẬP 6.2: Auth Context
// Gợi ý: Quản lý login/logout state toàn app

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   // const [user, setUser] = useState(null);
//   // const login = (userData) => setUser(userData);
//   // const logout = () => setUser(null);
//   // return (
//   //   <AuthContext.Provider value={{ user, login, logout }}>
//   //     {children}
//   //   </AuthContext.Provider>
//   // );
// }

// // ⚠️ BÀI TẬP: Tạo component LoginForm và UserProfile dùng AuthContext


// ************************************************************
// PHẦN 7: USEREDUCER (Complex State)
// ************************************************************

// 📌 Định nghĩa:
// - useReducer(reducer, initialState): thay thế useState cho state phức tạp
// - reducer(state, action) → newState: hàm thuần túy xử lý state transitions
// - dispatch(action): gửi action để trigger reducer
// - Dùng khi: nhiều sub-values, state phụ thuộc state trước, logic phức tạp

// 🏋️ BÀI TẬP 7.1: Shopping Cart với useReducer
// import { useReducer } from 'react';

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_ITEM":
//       // Kiểm tra đã có → tăng quantity, chưa có → thêm mới
//       // ???
//       return state;
//     case "REMOVE_ITEM":
//       // return state.filter(item => item.id !== action.payload);
//       return state;
//     case "UPDATE_QUANTITY":
//       // return state.map(item => item.id === action.payload.id
//       //   ? { ...item, quantity: action.payload.quantity } : item);
//       return state;
//     case "CLEAR_CART":
//       return [];
//     default:
//       return state;
//   }
// };

// function ShoppingCart() {
//   // const [cart, dispatch] = useReducer(cartReducer, []);
//   //
//   // const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
//   // const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
//   //
//   // ⚠️ BÀI TẬP: Hoàn thành case "ADD_ITEM" và viết JSX
// }


// ************************************************************
// PHẦN 8: CUSTOM HOOKS
// ************************************************************

// 📌 Định nghĩa:
// - Custom Hook: hàm bắt đầu bằng "use", tái sử dụng logic giữa components
// - Có thể dùng mọi hook bên trong (useState, useEffect, ...)
// - Tách logic phức tạp ra khỏi component → clean code

// 🏋️ BÀI TẬP 8.1: useLocalStorage
// Gợi ý: Đồng bộ state với localStorage

// function useLocalStorage(key, initialValue) {
//   // const [value, setValue] = useState(() => {
//   //   const stored = localStorage.getItem(key);
//   //   return stored ? JSON.parse(stored) : initialValue;
//   // });
//   //
//   // useEffect(() => {
//   //   localStorage.setItem(key, JSON.stringify(value));
//   // }, [key, value]);
//   //
//   // return [value, setValue];
// }
// // Sử dụng: const [name, setName] = useLocalStorage("name", "");


// 🏋️ BÀI TẬP 8.2: useFetch
// Gợi ý: Tách logic fetch API thành hook tái sử dụng

// function useFetch(url) {
//   // const [data, setData] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   //
//   // useEffect(() => {
//   //   const controller = new AbortController();
//   //   setLoading(true);
//   //   fetch(url, { signal: controller.signal })
//   //     .then(res => res.json())
//   //     .then(data => { setData(data); setLoading(false); })
//   //     .catch(err => {
//   //       if (err.name !== "AbortError") { setError(err.message); setLoading(false); }
//   //     });
//   //   return () => controller.abort(); // Cleanup!
//   // }, [url]);
//   //
//   // return { data, loading, error };
// }
// // Sử dụng: const { data, loading, error } = useFetch("/api/users");


// 🏋️ BÀI TẬP 8.3: useDebounce
// 📌 Debounce: trì hoãn thực thi cho đến khi user ngừng thay đổi trong N ms
// Gợi ý: Dùng setTimeout + cleanup

// function useDebounce(value, delay = 500) {
//   // const [debouncedValue, setDebouncedValue] = useState(value);
//   //
//   // useEffect(() => {
//   //   const timer = setTimeout(() => setDebouncedValue(value), delay);
//   //   return () => clearTimeout(timer);
//   // }, [value, delay]);
//   //
//   // return debouncedValue;
// }

// // Ứng dụng: Search với debounce
// function SearchWithDebounce() {
//   // const [query, setQuery] = useState("");
//   // const debouncedQuery = useDebounce(query, 300);
//   // const { data } = useFetch(
//   //   debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
//   // );
//   // ⚠️ BÀI TẬP: Viết component hoàn chỉnh
// }


// 🏋️ BÀI TẬP 8.4: useThrottle
// 📌 Throttle: chỉ cho phép thực thi tối đa 1 lần trong N ms

// function useThrottle(value, limit = 500) {
//   // const [throttledValue, setThrottledValue] = useState(value);
//   // const lastRun = useRef(Date.now());
//   //
//   // useEffect(() => {
//   //   const now = Date.now();
//   //   if (now - lastRun.current >= limit) {
//   //     setThrottledValue(value);
//   //     lastRun.current = now;
//   //   } else {
//   //     const timer = setTimeout(() => {
//   //       setThrottledValue(value);
//   //       lastRun.current = Date.now();
//   //     }, limit - (now - lastRun.current));
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [value, limit]);
//   //
//   // return throttledValue;
// }


// 🏋️ BÀI TẬP 8.5: usePrevious
// Gợi ý: Lưu giá trị render trước bằng useRef

// function usePrevious(value) {
//   // const ref = useRef();
//   // useEffect(() => { ref.current = value; }, [value]);
//   // return ref.current;
// }


// ************************************************************
// PHẦN 9: CÁC BÀI TOÁN NHỎ THỰC TẾ
// ************************************************************

// 🏋️ BÀI TOÁN 9.1: Infinite Scroll
// 📌 Tải thêm data khi user scroll đến cuối trang

// function InfiniteScroll() {
//   // const [items, setItems] = useState([]);
//   // const [page, setPage] = useState(1);
//   // const [loading, setLoading] = useState(false);
//   // const observerRef = useRef();
//   // const lastItemRef = useRef();
//   //
//   // useEffect(() => {
//   //   // Fetch data theo page
//   //   setLoading(true);
//   //   fetch(`/api/items?page=${page}`)
//   //     .then(res => res.json())
//   //     .then(newItems => {
//   //       setItems(prev => [...prev, ...newItems]);
//   //       setLoading(false);
//   //     });
//   // }, [page]);
//   //
//   // useEffect(() => {
//   //   // Intersection Observer: detect khi last item visible
//   //   const observer = new IntersectionObserver(entries => {
//   //     if (entries[0].isIntersecting && !loading) {
//   //       setPage(prev => prev + 1);
//   //     }
//   //   });
//   //   if (lastItemRef.current) observer.observe(lastItemRef.current);
//   //   return () => observer.disconnect();
//   // }, [items, loading]);
//   //
//   // ⚠️ BÀI TẬP: Viết JSX với ref={lastItemRef} cho phần tử cuối
// }


// 🏋️ BÀI TOÁN 9.2: Form Validation
// 📌 Validate form real-time với custom hook

// function useFormValidation(initialValues, validate) {
//   // const [values, setValues] = useState(initialValues);
//   // const [errors, setErrors] = useState({});
//   // const [touched, setTouched] = useState({});
//   //
//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setValues(prev => ({ ...prev, [name]: value }));
//   // };
//   //
//   // const handleBlur = (e) => {
//   //   const { name } = e.target;
//   //   setTouched(prev => ({ ...prev, [name]: true }));
//   //   setErrors(validate(values));
//   // };
//   //
//   // return { values, errors, touched, handleChange, handleBlur };
// }

// // Hàm validate
// // const validate = (values) => {
// //   const errors = {};
// //   if (!values.email) errors.email = "Email bắt buộc";
// //   else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email không hợp lệ";
// //   if (!values.password) errors.password = "Mật khẩu bắt buộc";
// //   else if (values.password.length < 6) errors.password = "Ít nhất 6 ký tự";
// //   return errors;
// // };


// 🏋️ BÀI TOÁN 9.3: Drag & Drop danh sách
// 📌 Sắp xếp lại items bằng kéo thả

// function DragDropList() {
//   // const [items, setItems] = useState(["Item A", "Item B", "Item C", "Item D"]);
//   // const dragItem = useRef(null);
//   // const dragOverItem = useRef(null);
//   //
//   // const handleDragStart = (index) => { dragItem.current = index; };
//   // const handleDragEnter = (index) => { dragOverItem.current = index; };
//   // const handleDragEnd = () => {
//   //   const newItems = [...items];
//   //   const [draggedItem] = newItems.splice(dragItem.current, 1);
//   //   newItems.splice(dragOverItem.current, 0, draggedItem);
//   //   setItems(newItems);
//   // };
//   //
//   // ⚠️ BÀI TẬP: Viết JSX với draggable="true" và các event handler
// }


// 🏋️ BÀI TOÁN 9.4: Copy to Clipboard
// 📌 Nút copy text vào clipboard với feedback

// function CopyButton({ text }) {
//   // const [copied, setCopied] = useState(false);
//   //
//   // const handleCopy = async () => {
//   //   await navigator.clipboard.writeText(text);
//   //   setCopied(true);
//   //   setTimeout(() => setCopied(false), 2000);
//   // };
//   //
//   // return (
//   //   <button onClick={handleCopy}>
//   //     {copied ? "✅ Đã copy!" : "📋 Copy"}
//   //   </button>
//   // );
// }


// 🏋️ BÀI TOÁN 9.5: Modal/Dialog Component
// 📌 Tạo modal có thể mở/đóng, đóng khi click overlay

// function Modal({ isOpen, onClose, title, children }) {
//   // if (!isOpen) return null;
//   //
//   // return ReactDOM.createPortal(
//   //   <div className="overlay" onClick={onClose}>
//   //     <div className="modal" onClick={e => e.stopPropagation()}>
//   //       <h2>{title}</h2>
//   //       <button className="close-btn" onClick={onClose}>✕</button>
//   //       {children}
//   //     </div>
//   //   </div>,
//   //   document.getElementById("modal-root")
//   // );
// }


// ************************************************************
// PHẦN 10: REACT PATTERNS NÂNG CAO
// ************************************************************

// 🏋️ BÀI TẬP 10.1: Higher-Order Component (HOC)
// 📌 Hàm nhận Component → trả về Component mới với logic thêm

// function withLoading(WrappedComponent) {
//   return function WithLoadingComponent({ isLoading, ...props }) {
//     // if (isLoading) return <div className="spinner">Loading...</div>;
//     // return <WrappedComponent {...props} />;
//   };
// }
// // const UserListWithLoading = withLoading(UserList);
// // <UserListWithLoading isLoading={true} users={[]} />


// 🏋️ BÀI TẬP 10.2: Render Props Pattern
// 📌 Component chia sẻ logic qua prop là function

// function MouseTracker({ render }) {
//   // const [position, setPosition] = useState({ x: 0, y: 0 });
//   //
//   // useEffect(() => {
//   //   const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
//   //   window.addEventListener("mousemove", handleMouseMove);
//   //   return () => window.removeEventListener("mousemove", handleMouseMove);
//   // }, []);
//   //
//   // return render(position);
// }
// // <MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />


// 🏋️ BÀI TẬP 10.3: Compound Components Pattern
// 📌 Các component con chia sẻ state ngầm qua Context

// const TabsContext = createContext();

// function Tabs({ children, defaultTab }) {
//   // const [activeTab, setActiveTab] = useState(defaultTab);
//   // return (
//   //   <TabsContext.Provider value={{ activeTab, setActiveTab }}>
//   //     <div className="tabs">{children}</div>
//   //   </TabsContext.Provider>
//   // );
// }

// Tabs.Tab = function Tab({ id, children }) {
//   // const { activeTab, setActiveTab } = useContext(TabsContext);
//   // return (
//   //   <button className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}>
//   //     {children}
//   //   </button>
//   // );
// };

// Tabs.Panel = function Panel({ id, children }) {
//   // const { activeTab } = useContext(TabsContext);
//   // return activeTab === id ? <div>{children}</div> : null;
// };

// // Sử dụng:
// // <Tabs defaultTab="tab1">
// //   <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
// //   <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
// //   <Tabs.Panel id="tab1">Nội dung tab 1</Tabs.Panel>
// //   <Tabs.Panel id="tab2">Nội dung tab 2</Tabs.Panel>
// // </Tabs>


// ************************************************************
// PHẦN 11: ERROR BOUNDARY & SUSPENSE
// ************************************************************

// 📌 Định nghĩa:
// - Error Boundary: class component bắt lỗi render của cây con
// - Suspense: hiển thị fallback khi component con đang loading
// - lazy(): dynamic import component (code splitting)

// 🏋️ BÀI TẬP 11.1: Error Boundary (class component)

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught:", error, errorInfo);
//   }
//   render() {
//     if (this.state.hasError) {
//       return this.props.fallback || <h1>Đã xảy ra lỗi!</h1>;
//     }
//     return this.props.children;
//   }
// }

// 🏋️ BÀI TẬP 11.2: React.lazy + Suspense

// const LazyDashboard = React.lazy(() => import("./Dashboard"));
//
// function App() {
//   return (
//     <ErrorBoundary fallback={<p>Lỗi tải trang!</p>}>
//       <Suspense fallback={<div>Đang tải Dashboard...</div>}>
//         <LazyDashboard />
//       </Suspense>
//     </ErrorBoundary>
//   );
// }


// ************************************************************
// PHẦN 12: BÀI TOÁN PHỎNG VẤN REACT
// ************************************************************

// 🏋️ BÀI TOÁN 12.1: Viết hàm deepEqual so sánh 2 objects
// 📌 Dùng trong React.memo custom comparator

// function deepEqual(a, b) {
//   // if (a === b) return true;
//   // if (typeof a !== "object" || typeof b !== "object") return false;
//   // if (a === null || b === null) return false;
//   // const keysA = Object.keys(a);
//   // const keysB = Object.keys(b);
//   // if (keysA.length !== keysB.length) return false;
//   // return keysA.every(key => deepEqual(a[key], b[key]));
// }


// 🏋️ BÀI TOÁN 12.2: Viết hàm flatten object
// { a: { b: { c: 1 } }, d: 2 } → { "a.b.c": 1, d: 2 }

// function flattenObject(obj, prefix = "", result = {}) {
//   // for (const key in obj) {
//   //   const newKey = prefix ? `${prefix}.${key}` : key;
//   //   if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
//   //     flattenObject(obj[key], newKey, result);
//   //   } else {
//   //     result[newKey] = obj[key];
//   //   }
//   // }
//   // return result;
// }


// 🏋️ BÀI TOÁN 12.3: Viết hook useInterval (bởi Dan Abramov)
// 📌 setInterval an toàn trong React

// function useInterval(callback, delay) {
//   // const savedCallback = useRef();
//   //
//   // useEffect(() => {
//   //   savedCallback.current = callback;
//   // }, [callback]);
//   //
//   // useEffect(() => {
//   //   if (delay === null) return;
//   //   const id = setInterval(() => savedCallback.current(), delay);
//   //   return () => clearInterval(id);
//   // }, [delay]);
// }


// 🏋️ BÀI TOÁN 12.4: Implement useReducer bằng useState

// function useMyReducer(reducer, initialState) {
//   // const [state, setState] = useState(initialState);
//   // const dispatch = (action) => setState(prev => reducer(prev, action));
//   // return [state, dispatch];
// }


// 🏋️ BÀI TOÁN 12.5: Viết hàm pipe / compose
// 📌 Kết hợp nhiều hàm thành 1 pipeline

// const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// // const transform = pipe(
// //   x => x * 2,
// //   x => x + 10,
// //   x => `Kết quả: ${x}`
// // );
// // console.log(transform(5)); // "Kết quả: 20"


// ============================================================
// 🎯 TỔNG KẾT REACTJS
// ============================================================
// Thứ tự học:
// 1. JSX & Component → Props → State (useState)
// 2. useEffect → useRef → Event Handling
// 3. useMemo, useCallback → Performance
// 4. Context API → useReducer → State Management
// 5. Custom Hooks → Advanced Patterns
// 6. Error Boundary → Suspense → Code Splitting
// 7. Bài toán thực tế: Debounce, Infinite Scroll, Form, Drag&Drop
//
// 📚 Tài liệu:
// - React Docs: https://react.dev/
// - React Hooks: https://react.dev/reference/react
// ============================================================

console.log("🚀 ReactJS Practice File - Hãy bỏ comment từng phần để thực hành!");
