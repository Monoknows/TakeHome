export default function Card({ image, title, description, darkMode }) {
  return (
    <article
      className={
        "w-50 p-6 rounded-lg  flex flex-col items-start shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 flex-shrink-0 " +
        (darkMode
          ? "bg-slate-700 border border-slate-800 shadow-[#00000040] hover:shadow-[#00000060]"
          : "bg-blue-100 border border-blue-200 shadow-[#00000040] hover:shadow-[#00000060]")
      }
    >
      <img
        className="rounded-md w-full object-cover mb-3"
        src={image}
        alt={title}
      />
      <h5
        className={`text-lg font-semibold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h5>
      {description && (
        <p
          className={`text-sm mt-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {description}
        </p>
      )}
    </article>
  );
}
