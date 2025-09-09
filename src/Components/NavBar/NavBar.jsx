import React, { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { section: "header", label: "Header" },
    { section: "skills", label: "Skills" },
    { section: "projects", label: "Projects" },
    { section: "about", label: "About Me" },
    { section: "contacts", label: "Contacts" },
  ];

  const handleClick = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white shadow-lg border-b-2 border-green-500">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        {/* Left: name */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-green-300 font-bold tracking-wide">
            Jon Alfred
          </span>
        </div>

        {/* Center: links (desktop) */}
        <div className="flex-1 flex justify-center lg:flex">
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.section}>
                <button
                  onClick={() => handleClick(l.section)}
                  className="text-sm text-green-100 hover:text-green-300 px-3 py-1 rounded-md transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden ml-auto p-2 rounded-md text-green-200 hover:bg-green-600/20 transition"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700 border-t border-green-500/30">
          <ul className="flex flex-col px-4 py-3 gap-2">
            {links.map((l) => (
              <li key={l.section}>
                <button
                  onClick={() => handleClick(l.section)}
                  className="block w-full text-left px-3 py-2 rounded-md text-green-100 hover:bg-green-600/20 transition"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
