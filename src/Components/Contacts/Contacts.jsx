export default function Contacts({ darkMode }) {
  return (
    <section
      id="contact"
      className={
        "py-10 transition-colors duration-300" +
        (darkMode ? " bg-slate-900" : " bg-blue-200")
      }
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`mb-6 text-3xl font-bold transition-colors duration-300 ${
            darkMode ? "text-blue-00" : "text-blue-400"
          }`}
        >
          Contacts
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Email
            </h3>
            <a
              href="mailto:jonbernabe8@gmail.com"
              className={`underline underline-offset-4 transition-colors ${
                darkMode
                  ? "text-slate-400 hover:text-blue-400"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              jonbernabe8@gmail.com
            </a>
          </div>

          <div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              Phone
            </h3>
            <a
              href="tel:+15551234567"
              className={`underline underline-offset-4 transition-colors ${
                darkMode
                  ? "text-slate-400 hover:text-blue-400"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              09683194750
            </a>
          </div>

          <div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              Location
            </h3>
            <p className={darkMode ? "text-slate-300" : "text-slate-700"}>
              Purok 3 Lagundi Plaridel Bulacan
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              Social
            </h3>
            <ul
              className={`flex gap-4 ${
                darkMode ? "text-slate-400" : "text-slate-700"
              }`}
            >
              <li>
                <a
                  href="https://github.com/Monoknows"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:underline-offset-4"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jon-bernabe-9676b6367"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:underline-offset-4"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
