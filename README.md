# 🚀 ResumeForge

**ResumeForge** is a full-stack resume-building web application where users can create, edit, manage, and share professional resumes in real-time. Built using **Next.js**, **MongoDB**, **TailwindCSS**, **Clerk for Authentication**, and **shadcn/ui** components, it offers a modern and secure experience for users to build and share resumes with optional password protection and expiry control.

## 🔧 Tech Stack

- **Frontend:** Next.js 14, TailwindCSS, shadcn/ui
- **Backend:** Node.js, MongoDB, Mongoose
- **Authentication:** Clerk.dev
- **UI Components:** shadcn/ui
- **Deployment:** Vercel (Frontend) & MongoDB Atlas

## ✨ Features

- 🧩 **Select Resume Templates** — Choose from modern, professionally designed templates
- 🔐 **Share Resume with Password & Expiry** — Generate secure, time-bound, password-protected live share links
- 🖼️ **Live Resume Preview** — See changes in real-time while editing
- 📄 **Download as PDF** — Instantly export your resume to a clean PDF format
- 📋 **Resume Dashboard** — Create, edit, view, and delete resumes in one place
- 🔐 **Secure Authentication** — Handled using Clerk
- 💡 **Responsive UI** — Fully optimized for desktop, tablet, and mobile

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/pawantech12/resumeforge-resume-builder.git
cd resumeforge-resume-builder
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Run the development server

```bash
pnpm run dev
```

## 🚀 Deployment

You can deploy the frontend to **Vercel** and connect **MongoDB Atlas** for production use.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

## 📄 License

This repo is free to use
