// Database removed: provide minimal localStorage-based stubs or no-ops
export async function signUpAdmin() {
  return { status: "ok" };
}

export async function signInAdmin({ username }) {
  const user = { username };
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
