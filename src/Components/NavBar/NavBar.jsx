import { Sun, Moon } from "lucide-react";

export default function NavBar({ darkMode, setDarkMode }) {
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
  };

  return (
    <nav
      className={`sticky top-0 z-50 p-4 flex justify-between items-center transition-colors duration-300 ${
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

      {/* Menu */}
      <ul className="flex space-x-6">
        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => {
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
        })}
      </ul>

      {/* Dark/Light Toggle — only one button here */}
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className={`ml-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
          darkMode
            ? "bg-slate-700 hover:bg-slate-600 focus:ring-slate-600 text-blue-300"
            : "bg-blue-300 hover:bg-blue-400 focus:ring-blue-400 text-blue-600"
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
