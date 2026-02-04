import { Sun, Moon, Menu, X } from "lucide-react";

import { useState } from "react";

export default function NavBar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    const nav = e.currentTarget.closest("nav");
    const navHeight = nav ? nav.offsetHeight : 0;

    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navHeight;

    const goingDown = targetTop > window.scrollY;
    document.documentElement.setAttribute(
      "data-scroll-direction",
      goingDown ? "down" : "up"
    );

    window.scrollTo({ top: targetTop, behavior: "smooth" });

    setTimeout(() => {
      document.documentElement.removeAttribute("data-scroll-direction");
    }, 700);

    // Close mobile menu after navigation
    if (open) setOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-4 py-3 flex justify-between items-center transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-blue-100"
      }`}
    >
      <div
        className={
          "font-bold text-xl " +
          (darkMode ? " text-blue-300" : " text-blue-600")
        }
      >
        My Portfolio
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-6">
        {["Home", "About", "Skills", "Projects", "Seminars", "Contact"].map(
          (item) => {
            const id = item.toLowerCase();
            return (
              <li key={item}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-slate-700"
                  } hover:underline transition-colors duration-300`}
                >
                  {item}
                </a>
              </li>
            );
          }
        )}
      </ul>

      <div className="flex items-center gap-2">
        {/* Dark/Light Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-700 hover:bg-slate-600 focus:ring-slate-600 text-blue-300"
              : "bg-blue-300 hover:bg-blue-400 focus:ring-blue-400 text-blue-600"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={`md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            darkMode
              ? "bg-slate-700 hover:bg-slate-600 focus:ring-slate-600 text-blue-300"
              : "bg-blue-300 hover:bg-blue-400 focus:ring-blue-400 text-blue-600"
          }`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={`md:hidden absolute left-0 right-0 top-full origin-top shadow-md ${
          darkMode ? "bg-slate-900" : "bg-blue-50"
        } ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"} transition-all duration-200`}
      >
        <ul className="flex flex-col px-4 py-3 gap-3">
          {["Home", "About", "Skills", "Projects", "Seminars", "Contact"].map(
            (item) => {
              const id = item.toLowerCase();
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={`${
                      darkMode
                        ? "text-blue-300 hover:text-blue-200"
                        : "text-blue-700 hover:text-slate-800"
                    } block w-full py-2`}
                  >
                    {item}
                  </a>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </nav>
  );
}
