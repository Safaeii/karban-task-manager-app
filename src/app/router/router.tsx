
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Footer from "../../components/Footer";
import Header from "../../components/common/Header";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";

import RegisterPage from "../../features/auth/pages/RegisterPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import LandingPage from "../../features/landing/pages/LandingPage";

import TasksPage from "../../features/tasks/pages/TasksPage";
import CategoriesPage from "../../features/categories/pages/CategoriesPage";
import TagsPage from "../../features/tags/pages/TagsPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import AboutPage from "../../features/about/pages/AboutPage";

// ساختار مشترک صفحات محافظت‌شده
const protectedPage = (element: React.ReactNode) => ({
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element,
    },
  ],
});

const router = createBrowserRouter(
  [
    // صفحه اصلی
    {
      path: "/",
      element: (
        <>
          <Header />
          <LandingPage />
          <Footer />
        </>
      ),
    },

    // درباره ما
    {
      path: "/about",
      element: (
        <>
          <Header />
          <AboutPage />
          <Footer />
        </>
      ),
    },

    // داشبورد
    {
      path: "/dashboard",
      ...protectedPage(<DashboardPage />),
    },

    // وظایف
    {
      path: "/tasks",
      ...protectedPage(<TasksPage />),
    },

    // دسته‌بندی‌ها
    {
      path: "/categories",
      ...protectedPage(<CategoriesPage />),
    },

    // برچسب‌ها
    {
      path: "/tags",
      ...protectedPage(<TagsPage />),
    },

    // تنظیمات
    {
      path: "/settings",
      ...protectedPage(<SettingsPage />),
    },

    // ثبت‌نام
    {
      path: "/register",
      element: (
        <>
          <Header />
          <RegisterPage />
          <Footer />
        </>
      ),
    },

    // ورود
    {
      path: "/login",
      element: (
        <>
          <Header />
          <LoginPage />
          <Footer />
        </>
      ),
    },
  ],
  {
    basename: "/karban-task-manager-app",
  }
);

export default router;
