import { useEffect, useRef, useState } from "react";

export default function About({ darkMode }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`h-150 p-10 flex justify-center transition-colors duration-300 ${
        darkMode ? "bg-[#0b1120] text-cyan-300" : "bg-[#dbeafe] text-blue-700"
      }`}
    >
      <div
        className={`card w-500 shadow-xl h-full flex transform transition-all duration-700 ease-out hover:shadow-2xl hover:scale-105 ${
          darkMode
            ? "bg-slate-800 text-cyan-200 focus:ring-2 focus:ring-cyan-400"
            : "bg-white text-blue-700 focus:ring-2 focus:ring-blue-400"
        } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div
          tabIndex={0}
          className="card w-full h-full shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <div className="card-body flex flex-col justify-center h-full">
            <h1
              className={`card-title text-2xl font-bold ${
                darkMode ? "text-cyan-300" : "text-blue-700"
              }`}
            >
              About Me
            </h1>
            <p className="mt-4 leading-relaxed flex-1">
              I am a passionate and dedicated developer with a strong interest
              in building dynamic and user-friendly web applications. I thrive
              on solving problems through code and take pride in writing clean,
              efficient, and maintainable solutions. My curiosity drives me to
              constantly explore new technologies, frameworks, and best
              practices in the ever-evolving world of web development. Whether
              it’s learning a new programming language, diving into a complex
              project, or collaborating with others, I’m always eager to grow
              both personally and professionally in the tech industry.
            </p>
            <p className="mt-4 leading-relaxed">
              Beyond coding, I value teamwork, creativity, and the ability to
              adapt in fast-paced environments. I believe that technology is not
              just about building applications but also about creating solutions
              that have a real impact on people’s lives. My long-term goal is to
              contribute to innovative projects that combine technical
              excellence with meaningful purpose.
            </p>
            <p className="mt-3 leading-relaxed">
              Outside of development, I enjoy continuous learning through books,
              online courses, and open-source contributions. These experiences
              not only sharpen my technical skills but also expand my
              perspective as a problem solver. I strive to maintain a balance
              between technical growth and personal well-being, believing that a
              motivated and healthy mindset is key to delivering impactful work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
