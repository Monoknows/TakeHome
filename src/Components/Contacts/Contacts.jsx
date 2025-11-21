import React, { useState } from "react";
import axios from "axios";

export default function Contacts({ darkMode }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Name.trim() || !Email.trim() || !Message.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    const serviceId = "service_zn9ck6i";
    const templateId = "template_q7z7i3r";
    const publicKey = "GkiixCDou3KmI0-lR";

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name: Name,
        email: Email,
        message: Message,
      },
    };

    try {
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Email successfully sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("There was an error sending the email:", error);
      alert("There was an error sending the email. Please try again later.");
    }
  };

  return (
    <section id="contact">
      <footer
        role="contentinfo"
        className={`mt-auto border-t transition-colors duration-300 ${
          darkMode
            ? "bg-[#0b1120] border-slate-700 text-cyan-100"
            : "bg-[#e0f2fe] border-blue-200 text-slate-900"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-cyan-300" : "text-blue-700"
              }`}
            >
              Contact Information
            </h2>

            <div className="space-y-6">
              <div>
                <h3
                  className={`text-sm uppercase font-semibold mb-2 ${
                    darkMode ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  Email
                </h3>
                <a
                  href="mailto:jonbernabe8@gmail.com"
                  className={`text-sm underline underline-offset-4 transition-colors ${
                    darkMode
                      ? "text-slate-400 hover:text-cyan-300"
                      : "text-slate-700 hover:text-blue-700"
                  }`}
                >
                  jonbernabe8@gmail.com
                </a>
              </div>

              <div>
                <h3
                  className={`text-sm uppercase font-semibold mb-2 ${
                    darkMode ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  Phone
                </h3>
                <a
                  href="tel:09683194750"
                  className={`text-sm underline underline-offset-4 transition-colors ${
                    darkMode
                      ? "text-slate-400 hover:text-cyan-300"
                      : "text-slate-700 hover:text-blue-700"
                  }`}
                >
                  0968-319-4750
                </a>
              </div>

              <div>
                <h3
                  className={`text-sm uppercase font-semibold mb-2 ${
                    darkMode ? "text-cyan-400" : "text-blue-600"
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
                    darkMode ? "text-cyan-400" : "text-blue-600"
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
                      className="hover:underline underline-offset-4 hover:text-cyan-400"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jon-bernabe-9676b6367"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4 hover:text-cyan-400"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              className={`mb-6 text-2xl font-bold ${
                darkMode ? "text-cyan-300" : "text-blue-700"
              }`}
            >
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className={`w-full p-6 space-y-4 rounded-2xl shadow-lg border transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800/70 border-slate-700"
                  : "bg-white/90 border-blue-200"
              }`}
              aria-label="Contact form"
            >
              <input
                type="text"
                placeholder="Enter Your Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-500 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-500 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <textarea
                placeholder="Enter Your Message"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-500 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-y"
              />
              <button
                type="submit"
                className={`w-full py-2 rounded font-semibold transition-colors ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-cyan-300"
                    : "bg-blue-500 hover:bg-blue-600 text-blue-700"
                }`}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </footer>
    </section>
  );
}
