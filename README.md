
# Karban – Task Management App

A modern and responsive task management application built with React, TypeScript, and Supabase.

Karban helps users organize their daily tasks, manage categories and tags, track progress, and stay focused on their goals through a clean and user-friendly interface.

## 🚀 Live Demo

[View Karban](https://safaeii.github.io/karban-task-manager-app/)

## 📸 Screenshots

### Dashboard
![Dashboard](public/images/dashboard.png)

### Tasks
![Tasks](public/images/tasks.png)

### Statistics
![Statistics](public/images/statistics.png)

## ✨ Features

- User authentication and registration
- Create, edit, and delete tasks
- Organize tasks by categories
- Manage tags for better organization
- Set task priorities
- Track task status and progress
- Dashboard with task statistics
- Responsive design for desktop, tablet, and mobile
- Persian language and RTL layout
- Data management with Supabase

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase
- Framer Motion
- dnd-kit
- Recharts
- React Icons

## 📁 Project Structure

```text
src/
├── app/
│   └── router/
├── components/
│   ├── common/
│   └── ui/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── tasks/
│   ├── categories/
│   ├── tags/
│   ├── settings/
│   ├── about/
│   └── landing/
├── layouts/
├── hooks/
├── lib/
└── types/
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Safaeii/karban-task-manager-app.git
```

### 2. Navigate to the project directory

```bash
cd karban-task-manager-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the development server

```bash
npm run dev
```

## 🏗️ Build

To create a production build:

```bash
npm run build
```

## 🌐 Deployment

This project is deployed using GitHub Pages.

To deploy the latest version:

```bash
npm run deploy
```

## 👩‍💻 Author

**Elahe Safaeii**

Frontend Developer

- GitHub: [@Safaeii](https://github.com/Safaeii)

---

⭐ If you find this project useful, feel free to give it a star!
