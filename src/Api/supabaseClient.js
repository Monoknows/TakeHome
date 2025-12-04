import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase env missing:", {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_ANON_KEY: supabaseKey ? "set" : undefined,
  });
  throw new Error(
    "Supabase URL/Anon Key missing. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env then restart dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
