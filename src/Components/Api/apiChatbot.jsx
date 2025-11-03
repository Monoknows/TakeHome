"use client";
import React, { useState, useRef, useEffect } from "react";
import * as DOMPurify from "dompurify";
import { motion, AnimatePresence } from "framer-motion";

export default function ApiChatbot({ darkMode }) {
  const purifier =
    DOMPurify && DOMPurify.default ? DOMPurify.default : DOMPurify;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const extractReply = (p) => {
    if (p === null || p === undefined) return "";
    if (typeof p === "string") {
      const looksLikeJson =
        p.trim().startsWith("{") || p.trim().startsWith("[");
      if (looksLikeJson) {
        try {
          const maybe = JSON.parse(p);
          return extractReply(maybe);
        } catch {
          return p;
        }
      }
      return p;
    }
    if (Array.isArray(p)) {
      if (p.length === 0) return "";
      return extractReply(p[0]);
    }
    if (typeof p === "object") {
      const keys = [
        "reply",
        "message",
        "text",
        "output",
        "data",
        "result",
        "response",
      ];
      for (const k of keys) {
        if (p[k] !== undefined && p[k] !== null) {
          return extractReply(p[k]);
        }
      }
      if (p.choices && Array.isArray(p.choices) && p.choices[0]) {
        const c = p.choices[0];
        return extractReply(c.text ?? c.message ?? c);
      }
      if (p.messages && Array.isArray(p.messages) && p.messages[0]) {
        return extractReply(p.messages[0].text ?? p.messages[0]);
      }
      for (const k of Object.keys(p)) {
        if (typeof p[k] === "string" && p[k].trim()) return p[k];
      }
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    }
    return String(p);
  };

  const stripCodeFences = (s) => {
    let t = String(s ?? "").trim();
    const blockFence = /^```(?:[a-zA-Z0-9_-]+)?\s*([\s\S]*?)\s*```$/;
    const m = t.match(blockFence);
    if (m) t = m[1];
    t = t.replace(/```/g, "");
    return t.trim();
  };

  const htmlToPlainText = (html) => {
    if (!html) return "";
    const noFences = stripCodeFences(html);
    const cleaned = purifier.sanitize(String(noFences), { ALLOWED_TAGS: [] });
    const tmp = document.createElement("div");
    tmp.innerHTML = cleaned;
    return tmp.textContent || tmp.innerText || "";
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const response = await fetch(
        "https://n8n.safehub-lcup.uk/webhook/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`HTTP ${response.status}: ${txt}`);
      }
      let parsed;
      try {
        parsed = await response.json();
      } catch {
        parsed = await response.text();
      }
      const reply = extractReply(parsed) || "No reply content";
      const finalText = htmlToPlainText(reply);
      const botMessage = { sender: "bot", text: finalText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to chatbot." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className={`rounded-full w-14 h-14 flex items-center justify-center font-semibold shadow-lg transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 text-blue-300 border border-slate-700 hover:bg-slate-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Chat
          </motion.button>
        )}

        {open && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`w-80 max-w-sm h-96 shadow-xl flex flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-slate-200"
                : "bg-blue-50 border-blue-200 text-slate-900"
            }`}
          >
            <div
              className={`flex items-center justify-between px-4 py-2 font-semibold transition-colors duration-300 ${
                darkMode
                  ? "bg-slate-800 text-blue-300"
                  : "bg-blue-300 text-white"
              }`}
            >
              <h2 className="text-sm">AI Chatbot</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([])}
                  className={`h-9 px-3 rounded-md text-xs font-medium flex items-center justify-center transition ${
                    darkMode
                      ? "bg-slate-700 text-blue-300 hover:bg-slate-600"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  }`}
                >
                  Clear
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className={`h-9 w-9 flex items-center justify-center rounded-md text-lg font-bold transition ${
                    darkMode
                      ? "bg-slate-700 text-blue-300 hover:bg-slate-600"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  }`}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className={`flex-1 overflow-y-auto p-3 flex flex-col gap-2 ${
                darkMode ? "bg-slate-900" : "bg-blue-50"
              }`}
            >
              {messages.length === 0 && (
                <div
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Say hi 👋
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      y: msg.sender === "user" ? 20 : -20,
                      scale: 0.95,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm leading-normal shadow-sm break-words whitespace-pre-line ${
                      msg.sender === "user"
                        ? darkMode
                          ? "self-end ml-auto bg-blue-600 text-white"
                          : "self-end ml-auto bg-blue-500 text-white"
                        : darkMode
                        ? "self-start mr-auto bg-slate-800 text-slate-200"
                        : "self-start mr-auto bg-white border border-blue-100 text-slate-900"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div
              className={`px-3 py-2 border-t flex gap-2 transition-colors duration-300 ${
                darkMode
                  ? "border-slate-700 bg-slate-900"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <input
                className={`flex-grow h-9 px-3 text-sm rounded-md focus:outline-none border transition-colors duration-300 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500"
                    : "bg-white border-blue-200 text-slate-900 placeholder-slate-400"
                }`}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                    setInput("");
                  }
                }}
              />
              <button
                className={`h-9 px-4 rounded-md font-medium transition-colors duration-300 flex items-center justify-center ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-blue-400"
                    : darkMode
                    ? "bg-blue-700 hover:bg-blue-600 text-blue-400"
                    : "bg-blue-500 hover:bg-blue-600 text-blue-400"
                }`}
                onClick={() => {
                  sendMessage();
                  setInput("");
                }}
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
