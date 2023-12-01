import { createClient } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth',() => {
  const { dbUrl, dbKey } = useAppConfig();
  const supabase = createClient(
    dbUrl,
    dbKey
  );
  async function signUp(email: any, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    return data.user.id;
  }
  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(error)
    console.log(data)
    if(error)return false;
    return data.user.id;
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return { signUp, signIn, signOut };
});