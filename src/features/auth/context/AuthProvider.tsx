import type { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: PropsWithChildren) {
  const {
    user,
    profile,
    loading,
    updateProfile,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };