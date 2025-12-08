import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentAdmin, signOutAdmin } from "../../Api/adminService";
import { fetchAllContent, upsertContent } from "../../Api/contentService";
// Accounts table section removed
import { supabase } from "../../Api/supabaseClient";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // const [accounts, setAccounts] = useState([]);
  // const [accountsError, setAccountsError] = useState("");

  // Animated background to match Admin pages
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

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const user = await getCurrentAdmin();
      if (!mounted) return;
      if (!user) {
        navigate("/admin");
        return;
      }
      setAdmin(user);
      try {
        const all = await fetchAllContent().catch(() => ({}));
        if (!mounted) return;
        setContent(all || {});
        // Accounts table section removed
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      const entries = Object.entries(content);
      for (const [key, value] of entries) {
        await upsertContent(key, value);
      }
      setMessage("Content saved ✅");
    } catch (err) {
      setError(err?.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (key, file) => {
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const fileName = `${key}-${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage
        .from("images")
        .upload(fileName, file, { upsert: false, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);
      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) throw new Error("Failed to get public URL");
      await upsertContent(key, publicUrl);
      setContent((c) => ({ ...c, [key]: publicUrl }));
      setMessage("Image uploaded ✅");
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    navigate("/admin");
  };

  if (loading)
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 p-6 rounded-xl shadow-xl bg-white/70 dark:bg-slate-800/70">
          Loading...
        </div>
      </section>
    );

  return (
    <section
      className={`relative flex flex-col items-center justify-start min-h-screen overflow-hidden transition-colors duration-300 ${
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

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className={`relative z-10 w-[900px] max-w-[95%] p-8 mt-14 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-500 ${
          darkMode
            ? "bg-slate-800/70 border-cyan-500/30"
            : "bg-blue-100/70 border-blue-400/30"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">{admin?.username}</span>
            <button
              onClick={handleSignOut}
              className={`px-3 py-2 rounded-md font-medium ${
                darkMode
                  ? "bg-cyan-500 hover:bg-cyan-400"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              Sign out
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* A few common fields. You can add more keys here */}
          <Field
            label="Header Title"
            value={content.header_title || ""}
            onChange={(v) => setContent((c) => ({ ...c, header_title: v }))}
          />
          <Field
            label="About Text"
            textarea
            value={content.about_text || ""}
            onChange={(v) => setContent((c) => ({ ...c, about_text: v }))}
          />
          <Field
            label="Contact Email"
            value={content.contacts_email || ""}
            onChange={(v) => setContent((c) => ({ ...c, contacts_email: v }))}
          />

          {/* Image uploads: store public URLs under keys */}
          <ImageField
            label="Header Image"
            currentUrl={content.header_image_url || ""}
            onUpload={(file) => handleUpload("header_image_url", file)}
            uploading={uploading}
            darkMode={darkMode}
          />
          <ImageField
            label="About Image"
            currentUrl={content.about_image_url || ""}
            onUpload={(file) => handleUpload("about_image_url", file)}
            uploading={uploading}
            darkMode={darkMode}
          />

          <div className="flex gap-3 items-center">
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded-md font-semibold ${
                darkMode
                  ? "bg-cyan-500 hover:bg-cyan-400"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {saving ? "Saving..." : "Save Content"}
            </button>
            {message && (
              <span className="text-green-600 text-sm">{message}</span>
            )}
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
        </form>

        {/* Diagnostics */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Diagnostics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-md ${
                darkMode ? "bg-slate-700/60" : "bg-white"
              }`}
            >
              <div className="text-sm opacity-80 mb-2">Supabase URL</div>
              <div className="text-sm break-all">
                {import.meta.env.VITE_SUPABASE_URL || "(not set)"}
              </div>
            </div>
            <div
              className={`p-4 rounded-md ${
                darkMode ? "bg-slate-700/60" : "bg-white"
              }`}
            >
              <div className="text-sm opacity-80 mb-2">Content Fetch</div>
              <div className="text-sm">
                {Object.keys(content || {}).length > 0
                  ? "OK"
                  : "No keys loaded"}
              </div>
            </div>
            <div
              className={`p-4 rounded-md ${
                darkMode ? "bg-slate-700/60" : "bg-white"
              }`}
            >
              <div className="text-sm opacity-80 mb-2">Header Image URL</div>
              <div className="text-xs break-all">
                {content.header_image_url || "(none)"}
              </div>
              {content.header_image_url && (
                <a
                  href={content.header_image_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block mt-2 text-xs underline ${
                    darkMode ? "text-cyan-300" : "text-blue-700"
                  }`}
                >
                  Open
                </a>
              )}
            </div>
            <div
              className={`p-4 rounded-md ${
                darkMode ? "bg-slate-700/60" : "bg-white"
              }`}
            >
              <div className="text-sm opacity-80 mb-2">About Image URL</div>
              <div className="text-xs break-all">
                {content.about_image_url || "(none)"}
              </div>
              {content.about_image_url && (
                <a
                  href={content.about_image_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block mt-2 text-xs underline ${
                    darkMode ? "text-cyan-300" : "text-blue-700"
                  }`}
                >
                  Open
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, textarea = false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded-md min-h-[120px]"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      )}
    </div>
  );
}

function ImageField({ label, currentUrl, onUpload, uploading, darkMode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {currentUrl ? (
        <img
          src={currentUrl}
          alt={label}
          className="w-full max-h-64 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="text-xs opacity-70 mb-2">No image set</div>
      )}
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onUpload(e.target.files?.[0] || null)}
        />
        <span className="text-xs opacity-70">PNG/JPG recommended</span>
        {uploading && (
          <span
            className={`text-xs ${
              darkMode ? "text-cyan-300" : "text-blue-700"
            }`}
          >
            Uploading...
          </span>
        )}
      </div>
    </div>
  );
}
