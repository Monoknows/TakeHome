export default function Card({ image, title, description, darkMode }) {
  return (
    <article
      className={
        "w-72 p-6 rounded-lg g-30 flex flex-col items-start shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 flex-shrink-0 " +
        (darkMode
          ? "bg-gray-800 border border-gray-700 shadow-[#00000040] hover:shadow-[#00000060]"
          : "bg-[#2c2f48] shadow-[#00000040] hover:shadow-[#00000060]")
      }
    >
      <img
        className="rounded-md w-full object-cover mb-3"
        src={image}
        alt={title}
      />
      <h5 className="text-lg font-semibold">{title}</h5>
      {description && <p className="text-sm opacity-80 mt-1">{description}</p>}
    </article>
  );
}
