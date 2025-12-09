import { useEffect, useState } from "react";
import { fetchSectionsList, fetchSection } from "../../Api/contentService";

export default function Sections({ darkMode = false }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const ids = await fetchSectionsList();
        const loaded = await Promise.all(ids.map((id) => fetchSection(id)));
        if (!mounted) return;
        setSections(loaded);
      } catch (err) {
        setError(err?.message || "Failed to load sections");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {sections.map((s) => (
        <article
          key={s.id}
          className={`rounded-2xl border shadow-md p-6 transition-colors ${
            darkMode
              ? "bg-slate-800/70 border-cyan-500/30 text-cyan-300"
              : "bg-white border-blue-400/30 text-blue-800"
          }`}
        >
          {s.title && (
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              {s.title}
            </h2>
          )}
          {s.image_url && (
            <img
              src={s.image_url}
              alt={s.title || "Section image"}
              className="w-full max-h-[22rem] object-cover rounded-xl mb-5"
            />
          )}
          {renderParagraphs(s.description)}
        </article>
      ))}
    </section>
  );
}

function renderParagraphs(text) {
  const parts = (text || "")
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <div className="space-y-4">
      {parts.map((p, i) => (
        <p key={i} className="leading-relaxed text-base">
          {p}
        </p>
      ))}
    </div>
  );
}
