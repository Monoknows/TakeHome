export function Info({ darkMode }) {
  const projects = [
    {
      title: "Ewan",
      img: "./Ewan.png",
      description:
        "AdventureOfEwan is a 2D platformer game. That has a simple and cute design. Yet challenging gameplay.",
    },
    {
      title: "SafeHub",
      img: "./SafeHub.png",
      description: "SafeHub is a mental health care school website.",
    },
    {
      title: "Hotel",
      img: "./Hotel.png",
      description: "Hotel is a hotel system.",
    },
  ];

  return (
    <section
      id="projects"
      className={
        "py-10 transition-colors duration-300" +
        (darkMode ? " bg-slate-900" : " bg-blue-200")
      }
    >
      <div className={"max-w-6xl mx-auto px-4"}>
        <h2
          className={`mb-6 text-3xl font-bold transition-colors duration-300 ${
            darkMode ? "text-blue-300" : "text-blue-400"
          }`}
        >
          Projects
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className={`overflow-hidden rounded-xl shadow ring-1 transition-colors duration-300 ${
                darkMode
                  ? "bg-slate-800 ring-slate-700"
                  : "bg-white ring-blue-200"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={p.img}
                  alt={`${p.title} preview`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {p.title}
                </h3>
                <p className={darkMode ? "text-slate-300" : "text-slate-700"}>
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
