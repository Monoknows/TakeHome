import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Seminars({ darkMode }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      title:
        "Software QA manual testing workshop: Become a confident QA Specialist- Stey-by-Step, Using jira,TestRail and Excel",
      issuer: "MST-Connect",
      date: "November 9, 2025",
      image: "JON ALFRED V BERNABE-1.png",
    },
    {
      title:
        "Microsoft Office Specialist: Excel Associate (Excel and Excel 2019)",
      issuer: "Microsoft",
      date: "May 17, 2023",
      image: "ExcelCert-1.png",
    },
  ];

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      {/* ...existing code... */}
      <section
        id="seminars"
        className={`py-16 transition-colors duration-300 ${
          darkMode ? "bg-[#0b1120]" : "bg-[#dbeafe]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className={`mb-10 text-3xl font-bold text-center ${
              darkMode ? "text-cyan-300" : "text-blue-700"
            }`}
          >
            Seminars & Certificates
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <article
                key={cert.title}
                className={`group overflow-hidden rounded-2xl shadow-lg ring-1 transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
                  darkMode
                    ? "bg-slate-800 ring-slate-700 hover:ring-cyan-400/50 hover:shadow-[0_8px_30px_rgba(0,255,255,0.1)]"
                    : "bg-white ring-blue-200 hover:ring-blue-400/40 hover:shadow-[0_8px_20px_rgba(59,130,246,0.2)]"
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => setSelectedImage(cert.image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelectedImage(cert.image);
                    }}
                    draggable={false}
                  />
                </div>

                <div className="p-5">
                  <h3
                    className={`text-xl font-semibold mb-2 transition-colors ${
                      darkMode ? "text-cyan-300" : "text-blue-700"
                    }`}
                  >
                    {cert.title}
                  </h3>

                  <p
                    className={`text-sm mb-1 ${
                      darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {cert.issuer}
                  </p>

                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {cert.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* animated pop-up */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden
            />
            <motion.div
              className="relative max-w-4xl w-[90%] z-10"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="certificate"
                className="w-full h-auto rounded-xl shadow-2xl"
              />

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 transition"
                onClick={() => setSelectedImage(null)}
                aria-label="Close certificate preview"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ...existing code... */}
    </>
  );
}
