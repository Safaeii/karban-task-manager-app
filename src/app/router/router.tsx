
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Footer from "../../components/Footer";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";

import RegisterPage from "../../features/auth/pages/RegisterPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import LandingPage from "../../features/landing/pages/ LandingPage";

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
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
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
