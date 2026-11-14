import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import LoginPage from "../../features/auth/pages/LoginPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
  path: "/login",
  element: <LoginPage />,
},
]);

export default router;