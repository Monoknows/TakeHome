import { createClient } from "@supabase/supabase-js";

// Use the provided Supabase URL and read the anon key from Vite env
const supabaseUrl = "https://dsoelyxbdthtcaufuhbe.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error("Supabase anon key missing:", {
    VITE_SUPABASE_ANON_KEY: supabaseKey ? "set" : undefined,
  });
  throw new Error(
    "Supabase anon key missing. Define VITE_SUPABASE_ANON_KEY in .env and restart dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
