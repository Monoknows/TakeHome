import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { Data } from "../../Data/Data";

export default function Skills({ darkMode }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const closeBtnRef = useRef(null);

  // animation state for grid
  const gridRef = useRef(null);
  const [inView, setInView] = useState(false);

  // modal mount / open/close animation control
  const [modalMounted, setModalMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // focus close button when modal fully mounted (open animation started)
    if (modalMounted && closeBtnRef.current) closeBtnRef.current.focus();
  }, [modalMounted]);

  useEffect(() => {
    // Escape to close when modal mounted
    const onKey = (e) => {
      if (e.key === "Escape" && modalMounted) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalMounted]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openSkill = (skill) => {
    // clear any pending close timers
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsClosing(false);
    setSelectedSkill(skill);

    // ensure mount happens first, then trigger open animation on next frame
    setModalMounted(false);
    requestAnimationFrame(() => {
      // small timeout helps ensure CSS transition runs
      requestAnimationFrame(() => setModalMounted(true));
    });
  };

  const handleKeyOpen = (e, skill) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSkill(skill);
    }
  };

  const handleClose = () => {
    // start close animation, then remove selectedSkill
    setIsClosing(true);
    setModalMounted(false);
    closeTimer.current = setTimeout(() => {
      setSelectedSkill(null);
      setIsClosing(false);
      closeTimer.current = null;
    }, 300); // must match CSS duration
  };

  const showModal = selectedSkill !== null || isClosing;

  return (
    <section id="skills">
      <div
        className={`p-8 transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-blue-200"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-8 text-center ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Skills
        </h1>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {Data.map((skill, idx) => (
            <div
              key={skill.id}
              className="w-full h-28 flex items-center justify-center"
              style={{ transitionDelay: `${inView ? idx * 80 : 0}ms` }}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => openSkill(skill)}
                onKeyDown={(e) => handleKeyOpen(e, skill)}
                aria-label={`Open details for ${skill.title}`}
                className={`w-full h-full flex items-center justify-center cursor-pointer select-none focus:outline-none
                  transition-all duration-500 ease-out
                  ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
              >
                <Card
                  image={skill.image}
                  title={skill.title}
                  darkMode={darkMode}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        // backdrop: fade in/out. pointer-events only when visible.
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            modalMounted && !isClosing
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-modal="true"
          role="dialog"
          aria-label={`${selectedSkill?.title || ""} details`}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* dialog: animate on mount (modalMounted true) and animate out when isClosing */}
          <div
            className={`max-w-xl w-full rounded-lg shadow-xl p-6 transform transition-all duration-300 ${
              modalMounted && !isClosing
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            } ${
              darkMode ? "bg-slate-800 text-blue-300" : "bg-white text-blue-600"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {selectedSkill?.image && (
                  <img
                    src={selectedSkill.image}
                    alt={selectedSkill.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedSkill?.title}</h2>
                  <p className="text-sm opacity-80">
                    {selectedSkill?.subtitle || ""}
                  </p>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                onClick={handleClose}
                className="text-xl font-bold p-1 rounded hover:bg-black/10 focus:outline-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-4 text-sm leading-relaxed">
              {selectedSkill?.details || selectedSkill?.description || (
                <span>No additional details provided.</span>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className={`px-4 py-2 rounded ${
                  darkMode
                    ? "bg-blue-300 text-blue-200 hover:bg-blue-200"
                    : "bg-blue-600 text-blue-600 hover:bg-blue-500"
                } focus:outline-none`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
