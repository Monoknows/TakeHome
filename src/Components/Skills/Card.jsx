export default function Card({ image, title, darkMode }) {
  return (
    <article
      className={
        "w-30 h-24 p-2 rounded-lg flex flex-col items-center justify-center shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 " +
        (darkMode
          ? "bg-slate-700 border border-slate-800 shadow-[#00000040] hover:shadow-[#00000060]"
          : "bg-blue-100 border border-blue-200 shadow-[#00000040] hover:shadow-[#00000060]")
      }
    >
      <img className="w-20 h-20 object-contain mb-1" src={image} alt={title} />
      <h5
        className={`text-xs font-semibold text-center ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h5>
    </article>
  );
}
