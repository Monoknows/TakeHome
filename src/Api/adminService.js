import { supabase } from './supabaseClient';

export async function signUpAdmin({ email, password, fullName }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) return authData;

  const { error: profileError } = await supabase.from('admins').upsert(
    { id: userId, email, full_name: fullName ?? null },
    { onConflict: 'id' }
  );
  if (profileError) throw profileError;

  return authData;
}

export async function signInAdmin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function getCurrentAdmin() {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
