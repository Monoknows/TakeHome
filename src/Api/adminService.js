import { supabase } from "./supabaseClient";

export async function signUpAdmin({ username, password }) {
  const { error: accountsError } = await supabase
    .from("Accounts")
    .insert({ Username: username, Password: password });
  if (accountsError) {
    throw accountsError;
  }
  return { status: "ok" };
}

export async function signInAdmin({ username, password }) {
  const { data, error } = await supabase
    .from("Accounts")
    .select("Username, Password")
    .eq("Username", username)
    .eq("Password", password)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Invalid username or password");
  const user = { username: data.Username };
  try {
    localStorage.setItem("accounts_user", JSON.stringify(user));
  } catch {}
  return { user };
}

export async function getCurrentAdmin() {
  try {
    const raw = localStorage.getItem("accounts_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function signOutAdmin() {
  try {
    localStorage.removeItem("accounts_user");
  } catch {}
}
