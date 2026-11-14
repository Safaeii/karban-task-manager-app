import { supabase } from "../../../shared/services/supabase";

async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

async function signIn(email: string, password: string) {

const {data ,error}=await supabase.auth.signInWithPassword({
    email,
    password
}) 
return { data, error };
}


async function signOut() {
const {error} =await supabase.auth.signOut()
return { error };
}


export { signIn ,signUp ,signOut};
