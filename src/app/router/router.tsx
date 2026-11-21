
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Footer from "../../components/Footer";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";

import RegisterPage from "../../features/auth/pages/RegisterPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import LandingPage from "../../features/landing/pages/LandingPage";

import TasksPage from "../../features/tasks/pages/TasksPage";
import CategoriesPage from "../../features/categories/pages/CategoriesPage";
import TagsPage from "../../features/tags/pages/TagsPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
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
    ...protectedPage(<CategoriesPage />),
  },
  {
    path: "/tags",
    ...protectedPage(<TagsPage />),
  },
  {
    path: "/settings",
    ...protectedPage(<SettingsPage/>),
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
