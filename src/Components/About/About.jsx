import { useEffect, useRef, useState } from "react";

export default function About({ darkMode }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [aboutText, setAboutText] = useState("");

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

  // Static fallback only; database removed
  useEffect(() => {
    setAboutText("");
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
            {(() => {
              // If aboutText exists, split into paragraphs by double newline
              if (aboutText) {
                const parts = String(aboutText).split(/\n\n+/);
                return (
                  <div className="flex-1">
                    {parts.map((p, i) => (
                      <p
                        key={i}
                        className={`mt-4 leading-relaxed ${i === 0 ? "" : ""}`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                );
              }
              // Fallback: two paragraphs
              return (
                <div className="flex-1">
                  <p className="mt-4 leading-relaxed">
                    {
                      "I am a passionate and dedicated developer with a strong interest in building dynamic and user-friendly web applications. I thrive on solving problems through code and take pride in writing clean, efficient, and maintainable solutions. My curiosity drives me to constantly explore new technologies, frameworks, and best practices in the ever-evolving world of web development. Whether it’s learning a new programming language, diving into a complex project, or collaborating with others, I’m always eager to grow both personally and professionally in the tech industry."
                    }
                  </p>
                  <p className="mt-4 leading-relaxed">
                    {
                      "Over the years, I’ve worked across the stack—crafting accessible interfaces, architecting APIs, and tuning performance so products feel fast and reliable. I value thoughtful design, clear communication, and pragmatic engineering that scales. Outside of coding, I enjoy teaching, documenting learnings, and contributing to communities where knowledge is shared openly. I’m motivated by building tools and experiences that help people, and I’m constantly refining my craft to deliver high-quality, resilient software."
                    }
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
