
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">در حال بررسی حساب کاربری...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
