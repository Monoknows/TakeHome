import { Sun, Moon } from "lucide-react";

export default function NavBar({ darkMode, setDarkMode }) {
  return (
    <nav
      className={`sticky top-0 z-50 p-4 flex justify-between items-center transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-blue-100"
      }`}
    >
      <div
        className={`font-bold text-xl ${
          darkMode ? "text-blue-300" : "text-blue-300"
        }`}
      >
        My Portfolio
      </div>

      <ul className="flex space-x-6">
        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`${
                darkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-slate-700"
              } hover:underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode ? "focus:ring-slate-600" : "focus:ring-blue-400"
              } rounded`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`ml-6 p-2 rounded-full border transition-colors duration-300 ${
          darkMode
            ? "bg-slate-800 text-blue-300 border-slate-700 hover:bg-slate-700"
            : "bg-blue-100 text-blue-600 border-blue-300 hover:bg-blue-200"
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
