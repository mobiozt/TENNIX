import { supabase } from './supabase';
import type { AuthResponse } from '@supabase/supabase-js';

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return data.subscription;
}
