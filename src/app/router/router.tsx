
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Footer from "../../components/Footer";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";

import RegisterPage from "../../features/auth/pages/RegisterPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import LandingPage from "../../features/landing/pages/LandingPage";
import PlaceholderPage from "../../features/common/components/PlaceholderPage";

import TasksPage from "../../features/tasks/pages/TasksPage";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LandingPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/dashboard",
    ...protectedPage(<DashboardPage />),
  },
  {
    path: "/tasks",
    ...protectedPage(<TasksPage />),
  },
  {
    path: "/categories",
    ...protectedPage(<PlaceholderPage title="دسته‌بندی‌ها" />),
  },
  {
    path: "/tags",
    ...protectedPage(<PlaceholderPage title="برچسب‌ها" />),
  },
  {
    path: "/settings",
    ...protectedPage(<PlaceholderPage title="تنظیمات" />),
  },
  {
    path: "/register",
    element: (
      <>
        <RegisterPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
        <Footer />
      </>
    ),
  },
]);

export default router;
