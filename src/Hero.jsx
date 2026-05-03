import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";

/* ─── Typewriter Hook ─────────────────────────────────────── */
function useTypewriter(text, speed = 52, startDelay = 1200) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ─── Glowing Red Sphere (SVG + CSS) ─────────────────────── */
function GlowingSphere() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer ambient glow rings */}
      {[1, 0.55, 0.3].map((op, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.08 + i * 0.05, 1], opacity: [op * 0.18, op * 0.32, op * 0.18] }}
          transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          style={{
            position: "absolute",
            width: `${62 + i * 18}%`, height: `${62 + i * 18}%`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(220,38,38,${op * 0.22}) 0%, transparent 70%)`,
            filter: `blur(${8 + i * 12}px)`,
          }}
        />
      ))}

      {/* Tech orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "85%", height: "85%", borderRadius: "50%", border: "1px solid rgba(220,38,38,0.18)", borderTopColor: "rgba(220,38,38,0.55)", borderRightColor: "rgba(220,38,38,0.35)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "72%", height: "72%", borderRadius: "50%", border: "1px solid rgba(220,38,38,0.12)", borderBottomColor: "rgba(220,38,38,0.4)", borderLeftColor: "rgba(220,38,38,0.28)" }}
      />

      {/* Orbit dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "85%", height: "85%" }}
      >
        <div style={{ position: "absolute", top: "0%", left: "50%", transform: "translate(-50%, -50%)", width: 8, height: 8, borderRadius: "50%", background: "#dc2626", boxShadow: "0 0 12px 4px rgba(220,38,38,0.8)" }} />
      </motion.div>

      {/* Main sphere */}
      <motion.div
        animate={{ scale: [1, 1.025, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative",
          width: "58%", height: "58%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, rgba(255,80,80,0.95) 0%, #b91c1c 35%, #7f1d1d 62%, #1a0000 100%)",
          boxShadow: "0 0 60px 18px rgba(220,38,38,0.35), 0 0 120px 40px rgba(185,28,28,0.18), inset 0 -8px 32px rgba(0,0,0,0.6), inset 0 8px 20px rgba(255,120,120,0.18)",
        }}
      >
        {/* Specular highlight */}
        <div style={{ position: "absolute", top: "16%", left: "22%", width: "30%", height: "18%", borderRadius: "50%", background: "rgba(255,255,255,0.18)", filter: "blur(4px)", transform: "rotate(-20deg)" }} />
        {/* Inner glow */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 60% 65%, rgba(220,38,38,0.3) 0%, transparent 55%)" }} />
      </motion.div>

      {/* Floating tech particles */}
      {[
        { x: "18%", y: "14%", size: 4, delay: 0 },
        { x: "78%", y: "22%", size: 3, delay: 0.7 },
        { x: "88%", y: "65%", size: 5, delay: 1.4 },
        { x: "12%", y: "72%", size: 3, delay: 2.1 },
        { x: "52%", y: "90%", size: 4, delay: 0.4 },
        { x: "92%", y: "42%", size: 2, delay: 1.8 },
      ].map((p, i) => (
        <motion.div key={i}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          style={{
            position: "absolute", left: p.x, top: p.y,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "#dc2626",
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px rgba(220,38,38,0.7)`,
          }}
        />
      ))}

      {/* Corner bracket decorations */}
      {[
        { top: "5%", left: "5%", borders: "borderTop borderLeft" },
        { top: "5%", right: "5%", borders: "borderTop borderRight" },
        { bottom: "5%", left: "5%", borders: "borderBottom borderLeft" },
        { bottom: "5%", right: "5%", borders: "borderBottom borderRight" },
      ].map((pos, i) => {
        const { borders, ...style } = pos;
        const bStyle = {};
        if (borders.includes("borderTop")) bStyle.borderTop = "1.5px solid rgba(220,38,38,0.4)";
        if (borders.includes("borderBottom")) bStyle.borderBottom = "1.5px solid rgba(220,38,38,0.4)";
        if (borders.includes("borderLeft")) bStyle.borderLeft = "1.5px solid rgba(220,38,38,0.4)";
        if (borders.includes("borderRight")) bStyle.borderRight = "1.5px solid rgba(220,38,38,0.4)";
        return (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 + i * 0.15, duration: 0.5 }}
            style={{ position: "absolute", width: 22, height: 22, ...style, ...bStyle }}
          />
        );
      })}
    </div>
  );
}

/* ─── Grid Background ─────────────────────────────────────── */
function GridBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
          </pattern>
          <radialGradient id="gridFade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#gridFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridMask)" />
      </svg>
      {/* Red ambient bottom-left */}
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(220,38,38,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function HeroSection() {
  const subText = "Higher Diploma in Software Engineering (HDSE) Student";
  const { displayed, done } = useTypewriter(subText, 48, 1400);

  const stagger = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.18 } }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050505; }

        .hero-root {
          position: relative;
          min-height: 100vh;
          background: #060606;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 5rem 4vw 3rem;
          font-family: 'Syne', sans-serif;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
        }
        .hero-left { display: flex; flex-direction: column; gap: 0; }

        .eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #dc2626;
          margin-bottom: 1.4rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #dc2626;
        }

        .hero-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 5.5vw, 5.2rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 0.3rem;
        }
        .hero-name .first { display: block; color: rgba(255,255,255,0.92); }
        .hero-name .last  {
          display: block;
          background: linear-gradient(90deg, #fff 60%, rgba(220,38,38,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .typewriter-wrap {
          min-height: 2.4rem;
          margin-top: 1.4rem;
          margin-bottom: 2.6rem;
        }
        .typewriter-text {
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.78rem, 1.3vw, 0.92rem);
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.04em;
        }
        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #dc2626;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .hero-actions { display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap; }

        .btn-primary {
          position: relative;
          padding: 0.85rem 2.1rem;
          background: #dc2626;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.25s ease, transform 0.18s ease;
        }
        .btn-primary:hover { background: #b91c1c; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0px); }

        .btn-secondary {
          padding: 0.85rem 2.1rem;
          background: transparent;
          color: rgba(255,255,255,0.65);
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.18s ease;
        }
        .btn-secondary:hover { border-color: rgba(220,38,38,0.55); color: #fff; transform: translateY(-1px); }

        .stat-row {
          display: flex;
          gap: 2.5rem;
          margin-top: 3.2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .stat { display: flex; flex-direction: column; gap: 3px; }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: #fff;
          line-height: 1;
        }
        .stat-num span { color: #dc2626; }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @media (max-width: 860px) {
          .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .hero-right { order: -1; }
          .hero-right > div { max-width: 280px !important; }
          .hero-name { font-size: clamp(2.4rem, 10vw, 3.5rem); }
          .stat-row { gap: 1.8rem; }
        }
      `}</style>

      <section className="hero-root" id="home">
        <GridBackground />

        <div className="hero-inner">
          {/* ── LEFT CONTENT ── */}
          <div className="hero-left">
            <motion.div className="eyebrow" custom={0} initial="hidden" animate="show" variants={stagger}>
              Portfolio · 2026
            </motion.div>

            <motion.h1 className="hero-name" custom={1} initial="hidden" animate="show" variants={stagger}>
              <span className="first">M. Usman</span>
              <span className="last">Khan</span>
            </motion.h1>

            <motion.div className="typewriter-wrap" custom={2} initial="hidden" animate="show" variants={stagger}>
              <span className="typewriter-text">
                {displayed}
                <span className="cursor" style={{ opacity: done ? 0 : 1, animation: done ? "none" : "blink 1s step-end infinite" }} />
              </span>
            </motion.div>

            <motion.div className="hero-actions" custom={3} initial="hidden" animate="show" variants={stagger}>
              {/* Pulse wrapper */}
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(220,38,38,0.55)", "0 0 0 14px rgba(220,38,38,0)", "0 0 0 0 rgba(220,38,38,0)"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
                style={{ borderRadius: 0, display: "inline-block" }}
              >
                <button
                  className="btn-primary"
                  onClick={() => {
                    const el = document.getElementById("project");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  View My Work
                </button>
              </motion.div>
              <button
                className="btn-secondary"
                onClick={() => window.open("/src/assets/resume.pdf", "_blank")}
              >
                Download CV
              </button>
            </motion.div>

            <motion.div className="stat-row" custom={5} initial="hidden" animate="show" variants={stagger}>
              {[
                { num: "6", unit: "+", label: "Projects Built" },
                { num: "2", unit: "+", label: "Years Coding" },
                { num: "100", unit: "%", label: "Passion Driven" },
              ].map(s => (
                <div className="stat" key={s.label}>
                  <span className="stat-num">{s.num}<span>{s.unit}</span></span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <GlowingSphere />
          </motion.div>
        </div>
      </section>
    </>
  );
}