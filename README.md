# 📚 BookNook – A Small Online Library

**Live Website:** [https://booknook-client.vercel.app](https://booknook-client.vercel.app)  
**Variant:** `B14-A8-Cat_Ron`

BookNook is a modern, community-driven online library platform engineered with Next.js (App Router), Express.js, and MongoDB. Readers can discover literary treasures, circulate their personal collection, borrow available volumes, and track return schedules with effortless ease.

---

## ✨ Key Features (Minimum 5 Highlights)

1. **Curated Catalog & Interactive Swiper Showcase:**  
   Experience a refined home showcase with an interactive multi-slide banner powered by Swiper.js, paired with dynamically loaded 'New Arrivals' sorted newest-first directly from the database.

2. **Complete CRUD Lifecycle for Personal Library:**  
   Add books with rich attributes (title, author, category, cover image, synopsis, total copies). Easily edit your own contributions with pre-filled forms and delete books protected with a polished custom confirmation modal.

3. **Intelligent Circulation & Real-Time Stock Management (Challenge 1):**  
   Borrow books seamlessly with a single click. Our backend automatically tracks library copies using MongoDB `$inc: { totalCopies: -1 }`. When stocks hit zero, the borrow button disables immediately with a "Not Available" badge.

4. **Double-Borrow Prevention Guard (Challenge 2):**  
   Built-in circulation validation prevents a reader from borrowing the same title twice concurrently. Returns automatically replenish shelf copies via `$inc: { totalCopies: 1 }`.

5. **JWT Authorization & Persistent Authentication:**  
   Secure session management powered by JWT tokens. Full reloading resilience guarantees that authenticated readers are never kicked back to login when refreshing private routes (`/add-book`, `/my-books`, `/my-borrows`, `/books/:id`).

6. **Accessibility & Dark/Light Editorial Theme:**  
   Full responsive styling crafted with Tailwind CSS, custom loaders, error-free navigation, and an intuitive Dark/Light mode toggle.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, Swiper.js, React Hot Toast, Next Themes
- **Backend:** Node.js, Express.js, MongoDB Native Driver, JSON Web Tokens (JWT), Cookie Parser
- **Deployment:** Vercel / Render

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Client Setup
```bash
cd booknook-client
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the library.

### 3. Server Setup
```bash
cd ../booknook-server
npm install
npm run dev
```
The server will run on [http://localhost:5000](http://localhost:5000).

---

## 📜 Assignment variant compliance: `B14-A8-Cat_Ron`
- Minimum 15 client git commits: ✅ Achieved
- Minimum 8 server git commits: ✅ Achieved
- No Lorem Ipsum text used: ✅ Verified
- Custom delete confirm modal (No window.confirm): ✅ Implemented
- Dynamic title on routes: ✅ Implemented
- Twitter rebranded with new X logo: ✅ Implemented
