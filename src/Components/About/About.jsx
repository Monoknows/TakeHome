export function About() {
  return (
    <section
      id="about"
      className="max-w-4xl mx-auto my-12 px-6 py-8 bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-lg shadow-lg border-l-4 border-green-400"
    >
      <h2 className="text-2xl md:text-3xl font-mono text-green-300 mb-4">
        About Me
      </h2>
      <p className="text-green-100 leading-relaxed">
        I'm Jon, a passionate{" "}
        <span className="text-green-200 font-semibold">BSIT student</span>
        with a keen interest in software development, databases, and mobile app
        design.
        <br />
        <br />I love creating projects that address{" "}
        <span className="text-green-200 font-semibold">
          real-world challenges
        </span>
        and make a positive impact.
      </p>
    </section>
  );
}
