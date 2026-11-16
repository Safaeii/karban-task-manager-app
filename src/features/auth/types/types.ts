
import type { User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  created_at: string;
};

export type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};
