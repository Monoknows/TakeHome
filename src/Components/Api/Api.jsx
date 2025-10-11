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
    const templateId = "template_1ah7w5g";
    const publicKey = "GkiixCDou3KmI0-lR";

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,

      template_params: {
        from_name: Name,
        from_email: Email,
        to_name: "Mr. Jon Bernabe",
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
      className={
        "flex justify-centermax-w-6xl mx-auto px-4 py-10 transition-colors duration-300 " +
        (darkMode ? "bg-slate-900" : "bg-blue-200 border-blue-200")
      }
    >
      <h2
        className={`mb-6 text-2xl font-bold transition-colors duration-300 ${
          darkMode ? "text-blue-200" : "text-blue-600"
        }`}
      >
        Forms
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-xl mx-auto p-6 space-y-4 rounded-2xl shadow-lg transition-colors duration-300
          ${
            darkMode
              ? "bg-slate-800/60 border border-slate-700"
              : "bg-white/80 border border-blue-200"
          }`}
        aria-label="Contact form"
      >
        <input
          type="text"
          placeholder="Enter Your Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Enter Your Message"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-transparent placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
        />

        <button
          type="submit"
          className={`ml-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-700 hover:bg-slate-600 focus:ring-slate-600 text-blue-300"
              : "bg-blue-300 hover:bg-blue-400 focus:ring-blue-400 text-blue-600"
          }`}
        >
          Send
        </button>
      </form>
    </section>
  );
}
