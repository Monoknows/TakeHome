import { useState } from "react";
import { signUpAdmin } from "../../Api/adminService";

export default function AdminSignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      await signUpAdmin({ email, password, fullName });
      setSuccessMsg("Admin created. Check your email to confirm the account.");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setErrorMsg(err?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 rounded-md border"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border"
            required
          />
          <button
            type="submit"
            className="p-3 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
          {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}
          {successMsg && (
            <div className="text-green-600 text-sm">{successMsg}</div>
          )}
        </form>
      </div>
    </section>
  );
}
