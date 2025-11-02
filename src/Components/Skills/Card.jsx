export default function Card({ image, title, darkMode }) {
  return (
    <article
      className={`w-30 h-24 p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300
        hover:scale-105 hover:shadow-xl
        ${
          darkMode
            ? "bg-slate-800 border border-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)]"
            : "bg-white border border-blue-200 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(56,189,248,0.3)]"
        }`}
    >
      <img className="w-16 h-16 object-contain mb-2" src={image} alt={title} />
      <h5
        className={`text-sm font-semibold text-center transition-colors duration-300 ${
          darkMode ? "text-cyan-300" : "text-blue-600"
        }`}
      >
        {title}
      </h5>
    </article>
  );
}
