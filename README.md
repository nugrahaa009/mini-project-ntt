# 🛍️ Product Management Dashboard

A modern **Product Management Dashboard** built with **React + TypeScript + Vite**, featuring CRUD operations, product detail view, and persistent local storage.

---

## 🚀 Features

- 🔍 Search & pagination (API-based)
- 📦 Product listing with rich table (image, rating, tags, status)
- ➕ Add product
- ✏️ Edit product
- 🗑️ Delete product
- 📄 Product detail modal (full information)
- 💾 LocalStorage integration (data persists after refresh)
- ⚡ Debounced search for better performance
- 📱 Responsive UI (Ant Design Grid)

---

## 🧰 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **State Management**: Redux Toolkit + RTK Query
- **UI Library**: Ant Design
- **Routing**: React Router DOM
- **API**: DummyJSON (for product data)
- **Storage**: LocalStorage (for custom CRUD)

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Form/
│   ├── Description/
│
├── features/
│   └── product/
│       └── productApi.ts
│
├── pages/
│   └── Product.tsx
│
├── constants/
│   └── productColumns.tsx
│
├── types/
│   └── product.ts
│
├── utils/
│   └── AxiosBaseQuery.ts
    └── errorHandler.ts
│
└── main.tsx
```

---

## ⚙️ How It Works

### 🔹 Data Source Strategy

This app uses a **hybrid data approach**:

| Source | Purpose            |
| ------ | ------------------ |
| API    | Fetch product list |

### 🔹 CRUD Behavior

- ✅ **Create**
- ✅ **Read** → API
- ✅ **Update**
- ✅ **Delete**

---

## 🛠️ Installation & Setup

```bash
# clone repository
git clone https://github.com/nugrahaa009/mini-project-ntt

# go to project
cd mini-project-ntt

# install dependencies
npm install

# run development
npm run dev
```

---

## 🧪 Environment

No environment variables required.

---

## 📸 Screenshots

> (Optional — add screenshots here if needed)

---

## 🌐 Deployment (Vercel via GitHub)

### 1. Push Project to GitHub

```bash
git init
git add .
git commit -m "init project"
git branch -M main
git remote add origin https://github.com/nugrahaa009/mini-project-ntt
git push -u origin main
```

---

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Login with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. Vercel will auto-detect Vite config

---

### 3. Build Settings (Auto)

| Setting       | Value           |
| ------------- | --------------- |
| Framework     | Vite            |
| Build Command | `npm run build` |
| Output Dir    | `dist`          |

---

### 4. Click Deploy 🚀

Done! Your app will be live like:

```
https://your-project-name.vercel.app
```

---

## 🧠 Notes

- Dummy API does **not persist data**, so LocalStorage is used
- Local products are marked with `isLocal: true`
- UI updates are handled optimistically for better UX

---

## 👨‍💻 Author

**Aditya Nugraha**

Frontend Engineer (React, TypeScript, Ant Design)

---

## 📌 Improvements (Future Work)

- Image upload & preview
- Advanced filtering & sorting
- Role-based access
- Unit & integration testing
- Dark mode 🌙

---

## ⭐ Conclusion

This project demonstrates:

- Clean architecture
- Real-world CRUD handling (API)
- Scalable frontend patterns
- Production-ready UI practices

---

> Built for technical assessment 🚀
