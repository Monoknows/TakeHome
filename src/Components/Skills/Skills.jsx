export function Skills() {
  const programming = ["Java", "Python", "C#"];
  const frameworks = ["React", "Node.js", "MySQL", "Git"];
  const interests = ["Web Development", "Mobile Apps", "Databases"];

  return (
    <section
      id="skills"
      className="max-w-5xl mx-auto my-12 px-6 py-8 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-lg shadow-lg border-l-4 border-green-400"
    >
      <h2 className="text-2xl md:text-3xl font-mono text-green-300 mb-8">
        Skills
      </h2>

      <div className="grid gap-6 md:grid-cols-3 text-green-100">
        <div className="bg-green-950 rounded-lg p-4 shadow-md border border-green-700 hover:border-green-400 transition">
          <h3 className="font-semibold text-green-200 mb-2">Programming</h3>
          <ul className="space-y-1">
            {programming.map((s) => (
              <li key={s} className="text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-950 rounded-lg p-4 shadow-md border border-green-700 hover:border-green-400 transition">
          <h3 className="font-semibold text-green-200 mb-2">
            Tools & Frameworks
          </h3>
          <ul className="space-y-1">
            {frameworks.map((s) => (
              <li key={s} className="text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-950 rounded-lg p-4 shadow-md border border-green-700 hover:border-green-400 transition">
          <h3 className="font-semibold text-green-200 mb-2">Interests</h3>
          <ul className="space-y-1">
            {interests.map((s) => (
              <li key={s} className="text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
