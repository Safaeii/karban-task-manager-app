import type { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };