import { useState } from "react";

export default function Contacts({ darkMode }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name required";
    if (!form.email.trim()) nextErrors.email = "Email required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      nextErrors.email = "Invalid email";
    if (!form.message.trim()) nextErrors.message = "Message required";
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 3000);
    }, 900);
  };

  return (
    <footer
      id="contact"
      role="contentinfo"
      className={`mt-auto border-t transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-blue-200 border-blue-300"
      }`}
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
              0968-319-4750
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
              Purok 3, Lagundi, Plaridel, Bulacan
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

        <div
          className={`mt-10 max-w-xl rounded-lg p-6 shadow transition-colors duration-300 ${
            darkMode
              ? "bg-slate-800/70 backdrop-blur border border-slate-700"
              : "bg-white/70 backdrop-blur border border-blue-300"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-blue-200" : "text-blue-700"
            }`}
          >
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className={`block text-xs font-medium uppercase tracking-wide mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-md px-3 py-2 text-sm outline-none transition-colors ${
                  darkMode
                    ? "bg-slate-900/60 border border-slate-600 text-slate-100 focus:border-blue-400"
                    : "bg-white border border-blue-300 text-slate-800 focus:border-blue-500"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-xs font-medium uppercase tracking-wide mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-md px-3 py-2 text-sm outline-none transition-colors ${
                  darkMode
                    ? "bg-slate-900/60 border border-slate-600 text-slate-100 focus:border-blue-400"
                    : "bg-white border border-blue-300 text-slate-800 focus:border-blue-500"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block text-xs font-medium uppercase tracking-wide mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`w-full resize-none rounded-md px-3 py-2 text-sm outline-none transition-colors ${
                  darkMode
                    ? "bg-slate-900/60 border border-slate-600 text-slate-100 focus:border-blue-400"
                    : "bg-white border border-blue-300 text-slate-800 focus:border-blue-500"
                }`}
                placeholder="Write something..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-500 text-blue-400"
                    : "bg-blue-500 hover:bg-blue-600 text-blue-500"
                }`}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <span
                  className={`text-xs font-medium ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Sent!
                </span>
              )}
            </div>
          </form>
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
          © {new Date().getFullYear()} Jon Alfred V. Bernabe. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
