
import { supabase } from "../../../shared/services/supabase";

type SignUpProfile = {
  firstName: string;
  lastName: string;
  username: string;
};

async function signUp(
  email: string,
  password: string,
  profile: SignUpProfile
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: profile.firstName,
        last_name: profile.lastName,
        username: profile.username,
      },
    },
  });

  return { data, error };
}

async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  return { error };
}

export { signIn, signUp, signOut };
