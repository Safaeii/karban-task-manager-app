
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "../types/types";
import { supabase } from "../../../shared/services/supabase";
import { ensureDefaultCategories } from "../../categories/api/categoriesApi";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // دریافت اطلاعات احراز هویت
  useEffect(() => {
    async function getProfile(userId: string) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile error:", error.message);
        setProfile(null);
        return;
      }

      setProfile(data);
    }

    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await getProfile(currentUser.id);
      }

      setLoading(false);
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        getProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ایجاد دسته‌بندی‌های پیش‌فرض کاربر
  useEffect(() => {
    if (!user?.id) return;

    const userId = user.id;

    async function initializeCategories() {
      try {
        await ensureDefaultCategories(userId);
      } catch (error) {
        console.error("Categories initialization error:", error);
      }
    }

    initializeCategories();
  }, [user?.id]);

  return { user, profile, loading ,
      updateProfile: setProfile,
   };
}

export { useAuth };
