import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Api({ darkMode }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Name.trim() || !Email.trim() || !Message.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    // EmailJS integration
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

    //Send email via API call
    try {
      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Email successfully sent!", response.data);
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
    <section
      id="contact"
      className={`transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-slate-100" : "bg-blue-200 text-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2
          className={`mb-6 text-2xl font-bold ${
            darkMode ? "text-blue-200" : "text-blue-600"
          }`}
        >
          Contact Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-xl mx-auto p-6 space-y-4 rounded-2xl shadow-lg border ${
            darkMode
              ? "bg-slate-800/60 border-slate-700"
              : "bg-white/80 border-blue-200"
          }`}
          aria-label="Contact form"
        >
          <input
            type="text"
            placeholder="Enter Your Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-900 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-900 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Enter Your Message"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-900 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          />
          <button
            type="submit"
            className={`w-full py-2 rounded font-semibold transition-colors ${
              darkMode
                ? "bg-slate-700 hover:bg-slate-600 text-blue-200"
                : "bg-blue-500 hover:bg-blue-600 text-blue-400"
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
