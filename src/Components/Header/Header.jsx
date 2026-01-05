import { useRef, useEffect, useState } from "react";

function LiveBackground({ darkMode }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const makeParticles = () => {
      particles.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 3,
        dx: -0.5 + Math.random(),
        dy: -0.5 + Math.random(),
        a: Math.random() * 360,
        da: -0.5 + Math.random(),
      }));
    };
    makeParticles();

    // 🌈 Updated, visually pleasing color palette
    const colors = darkMode
      ? [
          "rgba(94,234,212,0.5)", // teal glow
          "rgba(125,211,252,0.45)", // soft cyan
          "rgba(165,180,252,0.35)", // subtle violet
        ]
      : [
          "rgba(96,165,250,0.35)", // calm blue
          "rgba(196,181,253,0.3)", // light purple
          "rgba(244,182,255,0.25)", // pink highlight
        ];

    const bgGradient = () => {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (darkMode) {
        g.addColorStop(0, "#0b1120");
        g.addColorStop(1, "#1e293b");
      } else {
        g.addColorStop(0, "#dbeafe");
        g.addColorStop(1, "#bfdbfe");
      }
      return g;
    };

    let rafId = 0;
    const draw = () => {
      ctx.fillStyle = bgGradient();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        p.x += p.dx * 0.6;
        p.y += p.dy * 0.6;
        p.a += p.da;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        ctx.arc(
          p.x,
          p.y,
          p.r + Math.sin((p.a * Math.PI) / 180) * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
}

function TypingHeader({ text = "", darkMode }) {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const elRef = useRef(null);
  const typingSpeed = 90;

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const str = String(text ?? "");
    setDisplayedText("");
    if (!inView || str.length === 0) return;

    let i = 0;
    let timer = null;
    const tick = () => {
      setDisplayedText(str.slice(0, i + 1));
      i += 1;
      if (i < str.length) {
        timer = setTimeout(tick, typingSpeed);
      }
    };

    timer = setTimeout(tick, typingSpeed);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [text, inView]);

  useEffect(() => {
    const cid = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 600);
    return () => clearInterval(cid);
  }, []);

  return (
    <h1
      ref={elRef}
      className={`font-inter font-bold text-3xl transition-colors duration-300 transition-all duration-700 ease-out transform ${
        darkMode ? "text-cyan-300" : "text-blue-600"
      } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      aria-live="polite"
    >
      {displayedText}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.6rem",
          marginLeft: "0.25rem",
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 120ms linear",
        }}
      >
        |
      </span>
    </h1>
  );
}

export default function Header({ darkMode }) {
  const [headerTitle, setHeaderTitle] = useState("Jon Alfred V. Bernabe");

  useEffect(() => {
    setHeaderTitle("Jon Alfred V. Bernabe");
  }, []);
  return (
    <section id="home">
      <header
        className={`relative overflow-hidden p-15 h-150 flex items-center justify-between text-xl transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-blue-200"
        }`}
      >
        <LiveBackground darkMode={darkMode} />

        <div className="relative z-10 text-left max-w-[60%]">
          <TypingHeader text={headerTitle} darkMode={darkMode} />

          <p
            className={`text-xl transition-colors duration-300 ${
              darkMode ? "text-slate-300" : "text-blue-700"
            }`}
          >
            A passionate BSIT student with a love for coding and a constant
            <br />
            drive to learn, grow, and take on new challenges in the tech world.
          </p>
        </div>

        <div
          className="relative z-10 w-[350px] h-[350px]"
          aria-hidden="true"
          role="img"
        >
          <img
            className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-300 opacity-100 hover:opacity-0"
            src="/pfp.png"
            alt="profile"
          />
          <img
            className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
            src="/Me.jpg"
            alt="profile alt"
          />
        </div>
      </header>
    </section>
  );
}
