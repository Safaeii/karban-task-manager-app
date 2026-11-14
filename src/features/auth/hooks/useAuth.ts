import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../shared/services/supabase";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // دریافت وضعیت ورود فعلی
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // گوش دادن به تغییرات ورود و خروج
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // پاک‌سازی Listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user };
}

export { useAuth };