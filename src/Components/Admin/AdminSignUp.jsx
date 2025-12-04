import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAdmin } from "../../Api/adminService";
import { createAccount } from "../../Api/accountsService";

export default function AdminSignUp() {
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const makeParticles = () => {
      particles.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 3,
        dx: -0.5 + Math.random(),
        dy: -0.5 + Math.random(),
        a: Math.random() * 360,
        da: -0.5 + Math.random(),
      }));
    };
    makeParticles();

    const colors = darkMode
      ? [
          "rgba(94,234,212,0.5)",
          "rgba(125,211,252,0.45)",
          "rgba(165,180,252,0.35)",
        ]
      : [
          "rgba(96,165,250,0.35)",
          "rgba(196,181,253,0.3)",
          "rgba(244,182,255,0.25)",
        ];

    const bgGradient = () => {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (darkMode) {
        g.addColorStop(0, "#0b1120");
        g.addColorStop(1, "#1e293b");
      } else {
        g.addColorStop(0, "#dbeafe");
        g.addColorStop(1, "#bfdbfe");
      }
      return g;
    };

    let rafId = 0;
    const draw = () => {
      ctx.fillStyle = bgGradient();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        p.x += p.dx * 0.6;
        p.y += p.dy * 0.6;
        p.a += p.da;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        ctx.arc(
          p.x,
          p.y,
          p.r + Math.sin((p.a * Math.PI) / 180) * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      await signUpAdmin({
        username: trimmedUsername,
        password: trimmedPassword,
      });
      // Remove duplicate createAccount; adminService already inserts into Accounts
      setSuccessMsg("Account created.");
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMsg(err?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden transition-colors duration-300 ${
        darkMode ? "text-cyan-300" : "text-blue-800"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-6 right-6 z-20 px-4 py-2 rounded-md text-sm font-medium shadow-md transition-all duration-300 ${
          darkMode
            ? "bg-cyan-500 text-cyan-300 hover:bg-cyan-400"
            : "bg-blue-500 text-blue-700 hover:bg-blue-400"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
      />

      <div
        className={`relative z-10 w-[380px] p-8 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-500 ${
          darkMode
            ? "bg-slate-800/70 border-cyan-500/30"
            : "bg-blue-100/70 border-blue-400/30"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-cyan-300" : "text-blue-700"
          }`}
        >
          Admin Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`p-3 rounded-md outline-none transition-colors duration-300 ${
              darkMode
                ? "bg-slate-700 text-white placeholder-slate-400"
                : "bg-white text-blue-800 placeholder-blue-400"
            }`}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-3 rounded-md outline-none transition-colors duration-300 ${
              darkMode
                ? "bg-slate-700 text-white placeholder-slate-400"
                : "bg-white text-blue-800 placeholder-blue-400"
            }`}
            required
          />

          <button
            type="submit"
            className={`p-3 rounded-md font-semibold mt-2 transition-all duration-300 ${
              darkMode
                ? "bg-cyan-500 hover:bg-cyan-400 text-cyan-300"
                : "bg-blue-500 hover:bg-blue-400 text-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>

          {errorMsg && (
            <div
              className={`mt-2 text-sm ${
                darkMode ? "text-rose-300" : "text-red-600"
              }`}
            >
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mt-2 text-sm text-green-600">{successMsg}</div>
          )}
        </form>

        <div className="mt-3 text-center text-sm">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className={`underline hover:opacity-80 ${
              darkMode ? "text-cyan-300" : "text-blue-700"
            }`}
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </section>
  );
}
