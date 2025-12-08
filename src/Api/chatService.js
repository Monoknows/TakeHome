import { supabase } from "./supabaseClient";

// Save a single message row
export async function saveMessage({ role, text }) {
  const { error } = await supabase
    .from("admin_messages")
    .insert({ role, text });
  if (error) throw error;
}

// Fetch recent messages
export async function fetchMessages({ limit = 50 } = {}) {
  const { data, error } = await supabase
    .from("admin_messages")
    .select("id, created_at, role, text")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}
