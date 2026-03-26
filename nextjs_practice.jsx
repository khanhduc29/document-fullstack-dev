// ============================================================
// 🚀 NEXT.JS ÔN TẬP - TỪ CƠ BẢN ĐẾN NÂNG CAO
// ============================================================
// Next.js: React framework cho production với SSR, SSG, API Routes
// Tạo project: npx create-next-app@latest my-app
// Chạy dev: npm run dev (http://localhost:3000)
// File này là tài liệu ôn tập, copy code vào project Next.js để chạy!
// ============================================================
// Next.js 13+ dùng App Router (app/) thay Pages Router (pages/)
// File này tập trung App Router (chuẩn mới)
// ============================================================


// ************************************************************
// PHẦN 1: CẤU TRÚC THƯ MỤC APP ROUTER
// ************************************************************

// 📌 Định nghĩa:
// App Router dùng file-system based routing
// Mỗi folder trong app/ = 1 route segment
// Các file đặc biệt trong mỗi folder:

// app/
// ├── layout.js        → Layout bọc tất cả pages (bắt buộc root)
// ├── page.js          → UI cho route "/" (trang chủ)
// ├── loading.js       → Loading UI (Suspense tự động)
// ├── error.js         → Error UI (Error Boundary tự động)
// ├── not-found.js     → 404 page
// ├── template.js      → Giống layout nhưng re-mount mỗi navigation
// ├── globals.css      → CSS toàn cục
// ├── about/
// │   └── page.js      → Route "/about"
// ├── blog/
// │   ├── page.js      → Route "/blog"
// │   └── [slug]/
// │       └── page.js  → Route "/blog/:slug" (dynamic)
// ├── (marketing)/     → Route Group (không ảnh hưởng URL)
// │   ├── pricing/
// │   └── features/
// ├── @modal/           → Parallel Route
// ├── api/
// │   └── route.js     → API Route Handler
// └── _components/     → Folder private (không tạo route)


// ************************************************************
// PHẦN 2: SERVER COMPONENTS vs CLIENT COMPONENTS
// ************************************************************

// 📌 Định nghĩa:
// - Server Component (SC): render trên server, MẶC ĐỊNH trong App Router
//   → Truy cập DB trực tiếp, fetch data, không gửi JS về client
//   → KHÔNG dùng được: useState, useEffect, onClick, browser API
//
// - Client Component (CC): render trên client, thêm "use client" ở đầu file
//   → Dùng hooks, event handlers, browser APIs
//   → JS được gửi về client (bundle size tăng)

// 🏋️ BÀI TẬP 2.1: Server Component (mặc định)

// --- app/page.js ---
// async function HomePage() {
//   // ✅ Có thể fetch data trực tiếp (không cần useEffect!)
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
//   const posts = await res.json();
//
//   return (
//     <main>
//       <h1>Trang chủ (Server Component)</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </main>
//   );
// }
// export default HomePage;


// 🏋️ BÀI TẬP 2.2: Client Component

// --- app/components/Counter.js ---
// "use client";  // ← BẮT BUỘC khai báo!
//
// import { useState } from "react";
//
// export default function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(prev => prev + 1)}>+1</button>
//     </div>
//   );
// }

// 📌 Quy tắc vàng:
// → Server Component CÓ THỂ import Client Component
// → Client Component KHÔNG THỂ import Server Component
// → Đẩy "use client" xuống thấp nhất có thể (leaf components)


// ************************************************************
// PHẦN 3: ROUTING
// ************************************************************

// 🏋️ BÀI TẬP 3.1: Static Routes

// --- app/about/page.js ---
// export default function AboutPage() {
//   return <h1>Giới thiệu</h1>;
// }

// --- app/contact/page.js ---
// export default function ContactPage() {
//   return <h1>Liên hệ</h1>;
// }


// 🏋️ BÀI TẬP 3.2: Dynamic Routes [param]

// --- app/blog/[slug]/page.js ---
// export default async function BlogPost({ params }) {
//   const { slug } = await params;
//   // const post = await getPostBySlug(slug);
//   return <h1>Bài viết: {slug}</h1>;
// }


// 🏋️ BÀI TẬP 3.3: Catch-all Routes [...slug]

// --- app/docs/[...slug]/page.js ---
// export default async function DocsPage({ params }) {
//   const { slug } = await params;
//   // /docs/a/b/c → slug = ["a", "b", "c"]
//   return <h1>Docs: {slug.join(" / ")}</h1>;
// }


// 🏋️ BÀI TẬP 3.4: Route Groups (group)

// --- app/(marketing)/pricing/page.js → URL: /pricing (không có /marketing)
// --- app/(dashboard)/settings/page.js → URL: /settings
// → Dùng để tổ chức code + áp layout khác nhau cho mỗi group


// 🏋️ BÀI TẬP 3.5: Navigation

// "use client";
// import Link from "next/link";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
//
// export default function Navigation() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//
//   return (
//     <nav>
//       {/* Declarative navigation */}
//       <Link href="/">Home</Link>
//       <Link href="/about">About</Link>
//       <Link href="/blog/hello-world">Blog Post</Link>
//       <Link href={{ pathname: "/blog", query: { page: 2 } }}>Blog Page 2</Link>
//
//       {/* Programmatic navigation */}
//       <button onClick={() => router.push("/contact")}>Go to Contact</button>
//       <button onClick={() => router.back()}>Back</button>
//       <button onClick={() => router.refresh()}>Refresh</button>
//
//       <p>Current path: {pathname}</p>
//       <p>Query: {searchParams.get("page")}</p>
//     </nav>
//   );
// }


// ************************************************************
// PHẦN 4: LAYOUTS & TEMPLATES
// ************************************************************

// 📌 Định nghĩa:
// - layout.js: bọc pages, KHÔNG re-mount khi navigate (persist state)
// - template.js: giống layout nhưng RE-MOUNT mỗi lần navigate
// - Layouts lồng nhau: mỗi folder có layout riêng

// 🏋️ BÀI TẬP 4.1: Root Layout (bắt buộc)

// --- app/layout.js ---
// import { Inter } from "next/font/google";
// import "./globals.css";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata = {
//   title: "My App",
//   description: "Ôn tập Next.js",
// };
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="vi">
//       <body className={inter.className}>
//         <header>Header chung</header>
//         <main>{children}</main>
//         <footer>Footer chung</footer>
//       </body>
//     </html>
//   );
// }


// 🏋️ BÀI TẬP 4.2: Nested Layout

// --- app/dashboard/layout.js ---
// export default function DashboardLayout({ children }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <aside>
//         <nav>
//           <Link href="/dashboard">Overview</Link>
//           <Link href="/dashboard/analytics">Analytics</Link>
//           <Link href="/dashboard/settings">Settings</Link>
//         </nav>
//       </aside>
//       <section style={{ flex: 1 }}>{children}</section>
//     </div>
//   );
// }


// ************************************************************
// PHẦN 5: DATA FETCHING
// ************************************************************

// 📌 Định nghĩa:
// Next.js mở rộng fetch() với caching & revalidation
// - cache: "force-cache" (mặc định SSG) | "no-store" (SSR)
// - next.revalidate: ISR (tái tạo sau N giây)
// - next.tags: tag-based revalidation

// 🏋️ BÀI TẬP 5.1: Các chiến lược fetch

// // SSG - Static (cached mãi mãi, build time)
// async function getStaticData() {
//   const res = await fetch("https://api.example.com/data", {
//     cache: "force-cache",  // Mặc định
//   });
//   return res.json();
// }

// // SSR - Dynamic (fetch mỗi request)
// async function getDynamicData() {
//   const res = await fetch("https://api.example.com/data", {
//     cache: "no-store",
//   });
//   return res.json();
// }

// // ISR - Revalidate mỗi 60 giây
// async function getISRData() {
//   const res = await fetch("https://api.example.com/data", {
//     next: { revalidate: 60 },
//   });
//   return res.json();
// }

// // Tag-based revalidation
// async function getTaggedData() {
//   const res = await fetch("https://api.example.com/posts", {
//     next: { tags: ["posts"] },
//   });
//   return res.json();
// }

// // Revalidate by tag (trong Server Action hoặc Route Handler):
// import { revalidateTag } from "next/cache";
// revalidateTag("posts");


// 🏋️ BÀI TẬP 5.2: Parallel Data Fetching

// // ❌ Sequential (chậm)
// async function PageSlow() {
//   const user = await getUser();       // 1s
//   const posts = await getPosts();     // 1s → Tổng: 2s
// }

// // ✅ Parallel (nhanh)
// async function PageFast() {
//   const [user, posts] = await Promise.all([
//     getUser(),   // 1s
//     getPosts(),  // 1s  → Tổng: 1s
//   ]);
// }


// ************************************************************
// PHẦN 6: SERVER ACTIONS
// ************************************************************

// 📌 Định nghĩa:
// Server Actions = async functions chạy trên server
// Dùng để: form submissions, mutations (CRUD), revalidate cache
// Khai báo: "use server" ở đầu function hoặc đầu file

// 🏋️ BÀI TẬP 6.1: Server Action trong form

// --- app/actions.js ---
// "use server";
//
// import { revalidatePath } from "next/cache";
//
// export async function createPost(formData) {
//   const title = formData.get("title");
//   const content = formData.get("content");
//
//   // Validate
//   if (!title || !content) {
//     return { error: "Tiêu đề và nội dung bắt buộc" };
//   }
//
//   // Lưu vào DB
//   // await db.post.create({ data: { title, content } });
//
//   revalidatePath("/blog");
//   return { success: true };
// }

// --- app/blog/new/page.js ---
// import { createPost } from "../actions";
//
// export default function NewPostPage() {
//   return (
//     <form action={createPost}>
//       <input name="title" placeholder="Tiêu đề" required />
//       <textarea name="content" placeholder="Nội dung" required />
//       <button type="submit">Đăng bài</button>
//     </form>
//   );
// }


// 🏋️ BÀI TẬP 6.2: Server Action với useActionState

// "use client";
// import { useActionState } from "react";
// import { createPost } from "../actions";
//
// export default function PostForm() {
//   const [state, formAction, isPending] = useActionState(createPost, null);
//
//   return (
//     <form action={formAction}>
//       <input name="title" disabled={isPending} />
//       <button type="submit" disabled={isPending}>
//         {isPending ? "Đang gửi..." : "Đăng bài"}
//       </button>
//       {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
//       {state?.success && <p style={{ color: "green" }}>Thành công!</p>}
//     </form>
//   );
// }


// ************************************************************
// PHẦN 7: API ROUTE HANDLERS
// ************************************************************

// 📌 Định nghĩa:
// File route.js trong app/ → API endpoint
// Export: GET, POST, PUT, PATCH, DELETE functions
// Nhận Request object, trả về Response (Web API chuẩn)

// 🏋️ BÀI TẬP 7.1: CRUD API Routes

// --- app/api/posts/route.js ---
// import { NextResponse } from "next/server";
//
// // GET /api/posts
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const page = searchParams.get("page") || 1;
//   const limit = searchParams.get("limit") || 10;
//
//   // const posts = await db.post.findMany({ skip: (page-1)*limit, take: limit });
//   const posts = [{ id: 1, title: "Post 1" }]; // Mock
//
//   return NextResponse.json({ data: posts, page, limit });
// }
//
// // POST /api/posts
// export async function POST(request) {
//   const body = await request.json();
//   const { title, content } = body;
//
//   if (!title) {
//     return NextResponse.json({ error: "Thiếu tiêu đề" }, { status: 400 });
//   }
//
//   // const post = await db.post.create({ data: { title, content } });
//   return NextResponse.json({ data: body }, { status: 201 });
// }

// --- app/api/posts/[id]/route.js ---
// // GET /api/posts/:id
// export async function GET(request, { params }) {
//   const { id } = await params;
//   // const post = await db.post.findUnique({ where: { id } });
//   return NextResponse.json({ data: { id } });
// }
//
// // PUT /api/posts/:id
// export async function PUT(request, { params }) {
//   const { id } = await params;
//   const body = await request.json();
//   // const updated = await db.post.update({ where: { id }, data: body });
//   return NextResponse.json({ data: { id, ...body } });
// }
//
// // DELETE /api/posts/:id
// export async function DELETE(request, { params }) {
//   const { id } = await params;
//   // await db.post.delete({ where: { id } });
//   return NextResponse.json({ message: "Đã xóa" });
// }


// ************************************************************
// PHẦN 8: LOADING, ERROR, NOT-FOUND
// ************************************************************

// 📌 Next.js tự động bọc Suspense & ErrorBoundary bằng file conventions

// 🏋️ BÀI TẬP 8.1: loading.js (auto Suspense)

// --- app/blog/loading.js ---
// export default function BlogLoading() {
//   return (
//     <div className="skeleton">
//       <div className="skeleton-title" />
//       <div className="skeleton-text" />
//       <div className="skeleton-text" />
//     </div>
//   );
// }


// 🏋️ BÀI TẬP 8.2: error.js (auto Error Boundary)

// --- app/blog/error.js ---
// "use client"; // ← BẮT BUỘC là client component
//
// export default function BlogError({ error, reset }) {
//   return (
//     <div>
//       <h2>Đã xảy ra lỗi!</h2>
//       <p>{error.message}</p>
//       <button onClick={reset}>Thử lại</button>
//     </div>
//   );
// }


// 🏋️ BÀI TẬP 8.3: not-found.js

// --- app/not-found.js ---
// import Link from "next/link";
// export default function NotFound() {
//   return (
//     <div>
//       <h1>404 - Không tìm thấy trang</h1>
//       <Link href="/">Về trang chủ</Link>
//     </div>
//   );
// }

// // Trigger not-found trong page:
// import { notFound } from "next/navigation";
// async function BlogPost({ params }) {
//   const post = await getPost(params.slug);
//   if (!post) notFound();  // ← Hiển thị not-found.js
//   return <h1>{post.title}</h1>;
// }


// ************************************************************
// PHẦN 9: METADATA & SEO
// ************************************************************

// 📌 Hai cách set metadata:
// 1. Static: export const metadata = { ... }
// 2. Dynamic: export async function generateMetadata({ params }) { ... }

// 🏋️ BÀI TẬP 9.1: Static Metadata

// --- app/layout.js ---
// export const metadata = {
//   title: { default: "My App", template: "%s | My App" },
//   description: "Ứng dụng Next.js",
//   keywords: ["nextjs", "react", "javascript"],
//   openGraph: {
//     title: "My App",
//     description: "Ứng dụng Next.js",
//     url: "https://myapp.com",
//     images: [{ url: "/og-image.png", width: 1200, height: 630 }],
//   },
//   robots: { index: true, follow: true },
// };


// 🏋️ BÀI TẬP 9.2: Dynamic Metadata

// --- app/blog/[slug]/page.js ---
// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   // const post = await getPost(slug);
//   return {
//     title: slug,           // → "slug | My App" (dùng template cha)
//     description: `Bài viết về ${slug}`,
//     openGraph: { title: slug, images: [`/api/og?title=${slug}`] },
//   };
// }


// ************************************************************
// PHẦN 10: MIDDLEWARE
// ************************************************************

// 📌 Middleware chạy TRƯỚC mỗi request, ở edge runtime
// File: middleware.js (hoặc .ts) ở ROOT project (ngang app/)
// Dùng cho: auth check, redirect, rewrite, set headers

// 🏋️ BÀI TẬP 10.1: Auth Middleware

// --- middleware.js ---
// import { NextResponse } from "next/server";
//
// export function middleware(request) {
//   const token = request.cookies.get("auth-token")?.value;
//   const { pathname } = request.nextUrl;
//
//   // Public routes
//   const publicPaths = ["/", "/login", "/register", "/api/auth"];
//   if (publicPaths.some(path => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }
//
//   // Protected routes: redirect nếu chưa login
//   if (!token) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }
//
//   // Set custom header
//   const response = NextResponse.next();
//   response.headers.set("x-user-id", "decoded-user-id");
//   return response;
// }
//
// // Chỉ áp dụng cho các routes cụ thể:
// export const config = {
//   matcher: ["/dashboard/:path*", "/api/protected/:path*"],
// };


// ************************************************************
// PHẦN 11: IMAGE & FONT OPTIMIZATION
// ************************************************************

// 📌 next/image: tự động optimize, lazy load, responsive
// 📌 next/font: tự host fonts, không CLS

// 🏋️ BÀI TẬP 11.1: Image Component

// import Image from "next/image";
//
// export default function Gallery() {
//   return (
//     <div>
//       {/* Local image */}
//       <Image src="/hero.jpg" alt="Hero" width={800} height={400} priority />
//
//       {/* Remote image (cần config domains) */}
//       <Image
//         src="https://example.com/photo.jpg"
//         alt="Photo" width={400} height={300}
//         placeholder="blur" blurDataURL="data:image/..."
//       />
//
//       {/* Fill container */}
//       <div style={{ position: "relative", width: "100%", height: 300 }}>
//         <Image src="/bg.jpg" alt="BG" fill style={{ objectFit: "cover" }} />
//       </div>
//     </div>
//   );
// }

// --- next.config.js (cho remote images) ---
// module.exports = {
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "example.com" },
//       { protocol: "https", hostname: "**.amazonaws.com" },
//     ],
//   },
// };


// ************************************************************
// PHẦN 12: CACHING & STATIC GENERATION
// ************************************************************

// 📌 Next.js có 4 cơ chế caching:
// 1. Request Memoization → Dedupe cùng fetch trong 1 render
// 2. Data Cache → Cache fetch responses trên server
// 3. Full Route Cache → Cache HTML/RSC payload
// 4. Router Cache → Cache trên client khi navigate

// 🏋️ BÀI TẬP 12.1: generateStaticParams (thay getStaticPaths)

// --- app/blog/[slug]/page.js ---
// export async function generateStaticParams() {
//   // const posts = await getAllPosts();
//   const posts = [{ slug: "hello" }, { slug: "world" }];
//   return posts.map(post => ({ slug: post.slug }));
//   // Next.js sẽ pre-render /blog/hello và /blog/world tại build time
// }
//
// export default async function BlogPost({ params }) {
//   const { slug } = await params;
//   return <h1>{slug}</h1>;
// }


// 🏋️ BÀI TẬP 12.2: Dynamic rendering

// // Force dynamic (SSR)
// export const dynamic = "force-dynamic";
// // Force static (SSG)
// export const dynamic = "force-static";
// // Revalidate interval
// export const revalidate = 60; // ISR: 60 giây


// ************************************************************
// PHẦN 13: PARALLEL & INTERCEPTING ROUTES
// ************************************************************

// 📌 Parallel Routes (@folder): render nhiều pages đồng thời
// 📌 Intercepting Routes ((..)): "chặn" navigation, show modal

// 🏋️ BÀI TẬP 13.1: Parallel Routes (Dashboard)

// --- app/dashboard/layout.js ---
// export default function Layout({ children, analytics, notifications }) {
//   return (
//     <div>
//       {children}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
//         {analytics}
//         {notifications}
//       </div>
//     </div>
//   );
// }
// --- app/dashboard/@analytics/page.js → Analytics panel
// --- app/dashboard/@notifications/page.js → Notifications panel


// 🏋️ BÀI TẬP 13.2: Intercepting Routes (Photo Modal)

// // Cấu trúc:
// // app/feed/page.js                    → Feed page
// // app/feed/(..)photo/[id]/page.js     → Intercept: show modal
// // app/photo/[id]/page.js              → Full page (direct URL)
//
// // Khi click link trong feed → show modal (intercepted)
// // Khi truy cập URL trực tiếp → show full page


// ************************************************************
// PHẦN 14: BÀI TOÁN THỰC TẾ
// ************************************************************

// 🏋️ BÀI TOÁN 14.1: Authentication Pattern

// --- lib/auth.js (Server-side auth check) ---
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
//
// export async function getSession() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("session-token")?.value;
//   if (!token) return null;
//   // Verify token, return user
//   // return jwt.verify(token, SECRET);
// }
//
// export async function requireAuth() {
//   const session = await getSession();
//   if (!session) redirect("/login");
//   return session;
// }
//
// // Sử dụng trong page:
// async function DashboardPage() {
//   const user = await requireAuth();
//   return <h1>Xin chào, {user.name}</h1>;
// }


// 🏋️ BÀI TOÁN 14.2: Infinite Scroll với Server Components

// --- app/feed/page.js ---
// import { Suspense } from "react";
// import LoadMore from "./LoadMore";
//
// async function PostList({ page }) {
//   const posts = await fetch(`/api/posts?page=${page}`).then(r => r.json());
//   return posts.map(p => <article key={p.id}>{p.title}</article>);
// }
//
// export default function FeedPage({ searchParams }) {
//   const page = searchParams.page || 1;
//   return (
//     <div>
//       <Suspense fallback={<p>Loading...</p>}>
//         <PostList page={page} />
//       </Suspense>
//       <LoadMore currentPage={page} />
//     </div>
//   );
// }


// 🏋️ BÀI TOÁN 14.3: Optimistic Updates

// "use client";
// import { useOptimistic } from "react";
// import { addTodo } from "./actions";
//
// function TodoList({ todos }) {
//   const [optimisticTodos, addOptimisticTodo] = useOptimistic(
//     todos,
//     (state, newTodo) => [...state, { ...newTodo, pending: true }]
//   );
//
//   async function handleSubmit(formData) {
//     const title = formData.get("title");
//     addOptimisticTodo({ id: Date.now(), title });  // ← Hiển thị ngay
//     await addTodo(formData);                       // ← Server xử lý
//   }
//
//   return (
//     <div>
//       <form action={handleSubmit}>
//         <input name="title" />
//         <button>Thêm</button>
//       </form>
//       {optimisticTodos.map(todo => (
//         <p key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
//           {todo.title}
//         </p>
//       ))}
//     </div>
//   );
// }


// ============================================================
// 🎯 TỔNG KẾT NEXT.JS
// ============================================================
// Thứ tự học:
// 1. App Router → File conventions → Routing
// 2. Server Components vs Client Components ("use client")
// 3. Layouts → Templates → Loading/Error/Not-found
// 4. Data Fetching: SSG, SSR, ISR → cache + revalidate
// 5. Server Actions ("use server") → Form handling
// 6. API Route Handlers → CRUD API
// 7. Middleware → Auth → Protected routes
// 8. Metadata & SEO → Image/Font optimization
// 9. generateStaticParams → Dynamic rendering
// 10. Parallel Routes → Intercepting Routes
// 11. Patterns: Auth, Infinite Scroll, Optimistic Updates
//
// 📚 Tài liệu:
// - Next.js Docs: https://nextjs.org/docs
// - Next.js Learn: https://nextjs.org/learn
// - App Router: https://nextjs.org/docs/app
// ============================================================

console.log("🚀 Next.js Practice File - Tạo project Next.js và copy code từng phần để thực hành!");
