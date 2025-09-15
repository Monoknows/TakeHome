export default function About({ darkMode }) {
  return (
    <section
      id="about"
      className={
        "p-15 text-center h-100 text-justify-center transition-colors duration-300 " +
        (darkMode ? "bg-slate-900 text-blue-300" : "bg-blue-200 text-blue-400")
      }
    >
      <h1 className="font-bold text-2xl">About me</h1>
      <p className="text-cjustify mt-5">
        I am a passionate and dedicated developer with a strong interest in
        building dynamic and user-friendly web applications. I thrive on solving
        problems through code and take pride in writing clean, efficient, and
        maintainable solutions. My curiosity drives me to constantly explore new
        technologies, frameworks, and best practices in the ever-evolving world
        of web development. Whether it’s learning a new programming language,
        diving into a complex project, or collaborating with others, I’m always
        eager to grow both personally and professionally in the tech industry.
      </p>
    </section>
  );
}
