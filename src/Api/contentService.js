import { supabase } from "./supabaseClient";

const TABLE = "site_content";

export async function fetchAllContent() {
  const { data, error } = await supabase.from(TABLE).select("key, value");
  if (error) throw error;
  const map = {};
  for (const row of data) map[row.key] = row.value;
  return map;
}

export async function upsertContent(key, value) {
  const { error } = await supabase.from(TABLE).upsert({ key, value });
  if (error) throw error;
}

export async function fetchContent(keys) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("key, value")
    .in("key", keys);
  if (error) throw error;
  const map = {};
  for (const row of data) map[row.key] = row.value;
  return map;
}
