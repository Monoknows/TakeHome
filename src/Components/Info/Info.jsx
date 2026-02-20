import { video } from "framer-motion/client";
import { href } from "react-router-dom";

export function Info({ darkMode }) {
  const projects = [
    {
      title: "Binhi",
      img: "/Binhiwebpage.png",
      href: "https://webpage-intern.vercel.app/",
      description:
        "Binhi is a web page dedicated to promote an outdoor school in Bulacan designed especially to todlers ages 2-5 years old. It aims to nurture young minds through nature-based learning experiences.",
    },
    {
      title: "SafeHub",
      img: "/SafeHub.png",
      hoverImg: "/safehubHover.png",
      href: "https://safehub-lcup.uk",
      description:
        "SafeHub is a mental health web system designed to help students at La Consolacion University of the Philippines take care of their well-being through supportive digital tools.",
    },
    {
      title: "Responder Ai Chatbot",
      img: "/Responder.png",
      hoverImg: "/ResponderChat.png",
      href: "https://chat-bot-p42q.vercel.app",
      description:
        "Responder Ai Chatbot is an AI-powered chatbot designed to assist programmers through coding-related inquiries, providing quick and accurate responses to enhance their coding experience.",
    },
    {
      title: "Personal Portfolio",
      img: "/image.png",
      href: "https://takehome-three.vercel.app/",
      description:
        "A personal portfolio website built with React and Tailwind CSS to showcase my projects, skills, and experiences in a visually appealing and user-friendly manner.",
    }
  ];

  return (
    <section
      id="projects"
      className={`py-16 transition-colors duration-300 ${
        darkMode ? "bg-[#0b1120]" : "bg-[#dbeafe]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`mb-10 text-3xl font-bold text-center ${
            darkMode ? "text-cyan-300" : "text-blue-700"
          }`}
        >
          Projects
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className={`group overflow-hidden rounded-2xl shadow-lg ring-1 transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
                darkMode
                  ? "bg-slate-800 ring-slate-700 hover:ring-cyan-400/50 hover:shadow-[0_8px_30px_rgba(0,255,255,0.1)]"
                  : "bg-white ring-blue-200 hover:ring-blue-400/40 hover:shadow-[0_8px_20px_rgba(59,130,246,0.2)]"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 block"
                  >
                    <img
                      src={p.img}
                      alt={`${p.title} preview`}
                      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        p.hoverImg ? "group-hover:opacity-0" : ""
                      }`}
                    />
                    {p.hoverImg && (
                      <img
                        src={p.hoverImg}
                        alt={`${p.title} hover preview`}
                        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                    {p.video && (
                      <video
                        src={p.video}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                    )}
                  </a>
                ) : (
                  <>
                    <img
                      src={p.img}
                      alt={`${p.title} preview`}
                      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        p.hoverImg ? "group-hover:opacity-0" : ""
                      }`}
                    />
                    {p.hoverImg && (
                      <img
                        src={p.hoverImg}
                        alt={`${p.title} hover preview`}
                        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                    {p.video && (
                      <video
                        src={p.video}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                    )}
                  </>
                )}
              </div>

              <div className="p-5">
                <h3
                  className={`text-xl font-semibold mb-2 transition-colors ${
                    darkMode ? "text-cyan-300" : "text-blue-700"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
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
