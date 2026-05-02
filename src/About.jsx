import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MyImage from './assets/MyImage.png';

/* ── Reusable scroll-reveal wrapper ───────────────────────── */
function Reveal({ children, delay = 0, x = 0, y = 40, duration = 0.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Timeline data ─────────────────────────────────────────── */
const timelineItems = [
  {
    year: "2024",
    title: "Foundation Year",
    desc: "Enrolled at Aptech Computer Education. Foundations of programming, web development & database systems.",
    active: true,
  },
  {
    year: "2025",
    title: "Core Development",
    desc: "Advanced OOP, data structures, front-end frameworks & agile project methodologies.",
    active: true,
  },
  {
    year: "2026",
    title: "Specialisation",
    desc: "Full-stack engineering, cloud fundamentals, software architecture & industry capstone projects.",
    active: true,
  },
  {
    year: "2027",
    title: "Graduation",
    desc: "Completion of HDSE qualification. Industry internship & final-year dissertation defence.",
    active: false,
  },
];

/* ── Skill chips ───────────────────────────────────────────── */
const skills = ["ASP.Net Core", "Laravel", "My SQL / SQL Server", "React", "Wordpress / Shopify", "GIT", "MS Office", ];

/* ── Image frame placeholder ──────────────────────────────── */
function ImageFrame() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60, scale: 0.94 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", width: "100%", maxWidth: 400 }}
    >
      {/* Red drop shadow block (offset decorative layer) */}
      <div style={{
        position: "absolute",
        inset: 0,
        transform: "translate(14px, 14px)",
        background: "#dc2626",
        zIndex: 0,
        opacity: 0.85,
      }} />

      {/* Secondary dark offset */}
      <div style={{
        position: "absolute",
        inset: 0,
        transform: "translate(7px, 7px)",
        background: "rgba(185,28,28,0.35)",
        zIndex: 0,
        filter: "blur(2px)",
      }} />

      {/* Main frame */}
      <div style={{
        position: "relative",
        zIndex: 1,
        border: "1.5px solid rgba(220,38,38,0.5)",
        background: "#0e0e0e",
        overflow: "hidden",
        aspectRatio: "4/5",
      }}>
        {/* Placeholder image area */}
        <div style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(160deg, #141414 0%, #0a0a0a 50%, #111 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle grid inside frame */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
            <defs>
              <pattern id="fgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(220,38,38,0.12)" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fgrid)" />
          </svg>

          {/* Avatar silhouette */}
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" style={{ position: "relative", zIndex: 1, opacity: 0.18 }}>
            <circle cx="45" cy="34" r="20" fill="#fff" />
            <ellipse cx="45" cy="80" rx="32" ry="22" fill="#fff" />
          </svg>

          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            position: "relative",
            zIndex: 1,
          }}>
            <img src={MyImage} alt="M Usman Khan" className="w-40 h-40 border-2 border-red-600" />
          </span>
        </div>

        {/* Red corner accent - top left */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 36, height: 36, borderTop: "2.5px solid #dc2626", borderLeft: "2.5px solid #dc2626", zIndex: 2 }} />
        {/* Bottom right */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 36, height: 36, borderBottom: "2.5px solid #dc2626", borderRight: "2.5px solid #dc2626", zIndex: 2 }} />

        {/* Name tag overlay at bottom */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "1rem 1.2rem",
          background: "linear-gradient(0deg, rgba(0,0,0,0.92) 60%, transparent 100%)",
          zIndex: 2,
        }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", margin: 0 }}>
            M. Usman Khan
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", color: "#dc2626", margin: 0, marginTop: 2 }}>
            SOFTWARE ENGINEER
          </p>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -18,
          right: -18,
          zIndex: 4,
          background: "#dc2626",
          padding: "0.45rem 0.85rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 24px rgba(220,38,38,0.5)",
        }}
      >
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", lineHeight: 1 }}>HDSE</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em" }}>APTECH</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Timeline Component ────────────────────────────────────── */
function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <Reveal delay={0.1}>
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#dc2626",
          marginBottom: "1.8rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{ display: "inline-block", width: 20, height: 1, background: "#dc2626" }} />
          HDSE Journey
        </p>
      </Reveal>

      <div style={{ position: "relative" }}>
        {/* Vertical connector line (background track) */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: 7,
            top: 8,
            bottom: 8,
            width: 1.5,
            background: "linear-gradient(to bottom, #dc2626 0%, rgba(220,38,38,0.15) 100%)",
            transformOrigin: "top",
            zIndex: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timelineItems.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", gap: "1.4rem", paddingBottom: i < timelineItems.length - 1 ? "1.8rem" : 0, position: "relative", zIndex: 1 }}
            >
              {/* Dot + year */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 16 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.18, ease: "backOut" }}
                  style={{
                    width: 16, height: 16,
                    borderRadius: "50%",
                    background: item.active ? "#dc2626" : "transparent",
                    border: item.active ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                    boxShadow: item.active ? "0 0 10px 3px rgba(220,38,38,0.45)" : "none",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ paddingBottom: "0.2rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.7rem", marginBottom: "0.3rem" }}>
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: item.active ? "#dc2626" : "rgba(255,255,255,0.3)",
                  }}>
                    {item.year}
                  </span>
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: item.active ? "#fff" : "rgba(255,255,255,0.35)",
                  }}>
                    {item.title}
                  </span>
                  {item.year === "2027" && (
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "1px 6px",
                    }}>
                      UPCOMING
                    </span>
                  )}
                </div>
                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  lineHeight: 1.65,
                  color: item.active ? "rgba(255,255,255,0.48)" : "rgba(255,255,255,0.2)",
                  maxWidth: 340,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ───────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .about-root {
          background: #060606;
          padding: 7rem 4vw;
          position: relative;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
        }

        /* Ambient light top-right */
        .about-root::before {
          content: '';
          position: absolute;
          top: -15%;
          right: -10%;
          width: 45%;
          height: 55%;
          background: radial-gradient(ellipse, rgba(220,38,38,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .about-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          align-items: start;
          gap: 5rem;
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #dc2626;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .section-label::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #dc2626;
        }

        .section-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 1.8rem;
        }
        .section-heading em {
          font-style: normal;
          color: #dc2626;
        }

        .about-body {
          font-family: 'DM Mono', monospace;
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.48);
          margin-bottom: 1.1rem;
        }

        .skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.8rem;
        }
        .chip {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 12px;
          transition: border-color 0.25s, color 0.25s;
          cursor: default;
        }
        .chip:hover {
          border-color: rgba(220,38,38,0.5);
          color: #fff;
        }

        @media (max-width: 860px) {
          .about-inner { grid-template-columns: 1fr; gap: 3.5rem; }
          .about-left { display: flex; justify-content: center; }
        }
      `}</style>

      <section className="about-root" id="about">
        <div className="about-inner">

          {/* ── LEFT: Image Frame ── */}
          <div className="about-left">
            <ImageFrame />
          </div>

          {/* ── RIGHT: Text Content ── */}
          <div className="about-right">
            <Reveal delay={0}>
              <p className="section-label">About Me</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="section-heading">
                Crafting Software<br />
                with <em>Purpose.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="about-body">
                I'm <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>M. Usman Khan</strong>, a Higher Diploma in Software Engineering (HDSE) student at <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>Aptech Computer Education</strong> (2024–2027). My journey into software is driven by a genuine curiosity for how digital systems are built — and an obsession with making them better.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="about-body">
                I am a results-driven Software Engineering student with a proven track record of bridging complex technical logic with user-centric design. My expertise spans across architecting scalable systems using <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>ASP.NET Core</strong> and <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>PHP Laravel</strong>, alongside building high-performance web applications. I approach every project with a focus on <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>Clean Architecture, MVC principles</strong>,and code that scales for real-world business growth.
              </p>
            </Reveal>

            {/* <Reveal delay={0.36}>
              <p className="about-body">
              <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>Beyond the Classroom</strong>
              While pursuing my Diploma at <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>Aptech</strong>, I have consistently delivered high-impact solutions, including:
              </p>
            </Reveal> */}

            <Reveal delay={0.44}>
              <div className="skill-chips">
                {skills.map((s, i) => (
                  <motion.span
                    key={s}
                    className="chip"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            {/* ── Timeline ── */}
            <Timeline />
          </div>

        </div>
      </section>
    </>
  );
}