export function Info() {
  const projects = [
    {
      title: "Simple Hotel System",
      info: "CRUD booking app built with React (frontend), Node.js + Express (API), and MySQL (database). Features room management, reservations, and basic authentication.",
      img: "/Hotel.png",
      alt: "Simple Hotel System screenshot",
    },
    {
      title: "Adventure Of Ewan",
      info: "A small 2D platformer prototype created with Godot. Includes player movement, simple enemy mechanics, and collectibles.",
      img: "/Ewan.png",
      alt: "Adventure Of Ewan screenshot",
    },
    {
      title: "SafeHub Counseling and Guidance Services",
      info: "An online mental health support system built with React, Tailwind CSS and MySQL. Implements appointment booking, announcements, and AI-assisted chat when counselors are unavailable.",
      img: "/SafeHub.png",
      alt: "SafeHub screenshot",
    },
  ];

  return (
    <section
      id="projects"
      className="max-w-5xl mx-auto my-12 px-6 py-8 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-lg shadow-lg border-l-4 border-green-400"
    >
      <h2 className="text-2xl md:text-3xl font-mono text-green-300 mb-8">
        Projects
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.title}
            className="bg-green-950 rounded-lg shadow-md overflow-hidden border border-green-700 hover:border-green-400 hover:shadow-green-400/30 transition"
          >
            <figure className="w-full h-48 overflow-hidden">
              <img
                src={p.img}
                alt={p.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </figure>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-200">
                {p.title}
              </h3>
              <p className="mt-2 text-green-100/80 text-sm">{p.info}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
