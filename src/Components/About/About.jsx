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
      className={`px-4 py-12 md:py-16 flex justify-center transition-colors duration-300 ${
        darkMode ? "bg-[#0b1120] text-cyan-300" : "bg-[#dbeafe] text-blue-700"
      }`}
    >
      <div
        className={`card w-full max-w-xl shadow-xl flex transform transition-all duration-700 ease-out hover:shadow-2xl hover:scale-105 ${
          darkMode
            ? "bg-slate-800 text-cyan-200 focus:ring-2 focus:ring-cyan-400"
            : "bg-white text-blue-700 focus:ring-2 focus:ring-blue-400"
        } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div
          tabIndex={0}
          className="card w-full shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <div className="card-body flex flex-col justify-center">
            <h1
              className={`card-title text-2xl font-bold ${
                darkMode ? "text-cyan-300" : "text-blue-700"
              }`}
            >
              About Me
            </h1>
            {(() => {
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

              return (
                <div className="flex-1">
                  <p className="mt-4 leading-relaxed">
                    {
                      "I'm a passionate and dedicated IT graduate with a strong interest in web and software development. I am eager to apply my knowledge and skills in real-world projects. I enjoy problem-solving and continuously learning new technologies to enhance my skills and to stay updated in this updating field. I am very committed to delivering high-quality work and am always looking for oppurtunities to grow both personally and professionally."
                    }
                  </p>
                  <p className="mt-4 leading-relaxed">
                    {
                      "Over the years, I've trained my abilities through various personal and academic projects, constantly seeking to improve and stay updated with the latest technological trends. I expand my knowledge through online courses, tutorials, and hands-on practices. I am enthusiastic about collaborating with other people in the tech industry to create innovative solutions. I am excited about the opportunites that lie ahead and look forward to contributing to impactful projects in the future.  "
                    }
                  </p>
                  <p className="mt-4 leading-relaxed">
                    {
                      "Feel free to reach out to me for any potential collaboration or just to connect and share ideas. I'm always open to new opportunities and eager to learn from others in the field. "
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
