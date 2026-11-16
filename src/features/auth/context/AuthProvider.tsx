
import type { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: PropsWithChildren) {
  const { user, profile, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
