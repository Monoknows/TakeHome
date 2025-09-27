import { useState } from "react";
export default function Contacts({ darkMode }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  return (
    <footer
      id="contact"
      role="contentinfo"
      className={
        "mt-auto border-t transition-colors duration-300 " +
        (darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-blue-200 border-blue-300")
      }
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2
          className={`mb-6 text-2xl font-bold tracking-wide transition-colors duration-300 ${
            darkMode ? "text-blue-200" : "text-blue-600"
          }`}
        >
          Contacts
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3
              className={`text-sm uppercase font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Email
            </h3>
            <a
              href="mailto:jonbernabe8@gmail.com"
              className={`text-sm underline underline-offset-4 transition-colors ${
                darkMode
                  ? "text-slate-400 hover:text-blue-300"
                  : "text-slate-700 hover:text-blue-700"
              }`}
            >
              jonbernabe8@gmail.com
            </a>
          </div>

          <div>
            <h3
              className={`text-sm uppercase font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Phone
            </h3>
            <a
              href="tel:09683194750"
              className={`text-sm underline underline-offset-4 transition-colors ${
                darkMode
                  ? "text-slate-400 hover:text-blue-300"
                  : "text-slate-700 hover:text-blue-700"
              }`}
            >
              09683194750
            </a>
          </div>

          <div>
            <h3
              className={`text-sm uppercase font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Location
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Purok 3 Lagundi Plaridel Bulacan
            </p>
          </div>

          <div>
            <h3
              className={`text-sm uppercase font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Social
            </h3>
            <ul
              className={`flex gap-4 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-700"
              }`}
            >
              <li>
                <a
                  href="https://github.com/Monoknows"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jon-bernabe-9676b6367"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr
          className={`my-8 border-dashed ${
            darkMode ? "border-slate-700" : "border-blue-300"
          }`}
        />

        <p
          className={`text-xs text-center ${
            darkMode ? "text-slate-500" : "text-slate-600"
          }`}
        >
          © {new Date().getFullYear()} Jon Alfred V. Bernabe . All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
