import { supabase } from "./supabaseClient";

const TABLE = "Accounts";

export async function listAccounts() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, created_at, Username, Password")
    .order("id", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createAccount({ Username, Password }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ Username, Password }])
    .select("id, created_at, Username, Password")
    .single();
  if (error) throw error;
  return data;
}
