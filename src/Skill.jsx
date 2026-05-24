import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── SVG Icons ──────────────────────────────────────────── */
const icons = {
  React: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="currentColor" strokeWidth="1.6" fill="none" transform="rotate(0 24 24)"/>
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="currentColor" strokeWidth="1.6" fill="none" transform="rotate(60 24 24)"/>
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="currentColor" strokeWidth="1.6" fill="none" transform="rotate(120 24 24)"/>
      <circle cx="24" cy="24" r="3" fill="currentColor"/>
    </svg>
  ),
  Angular: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <path d="M24 6L8 12l2.5 22L24 42l13.5-8L40 12L24 6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M24 6v36" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
    <path d="M15 30l9-18 9 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="17.5" y1="25" x2="30.5" y2="25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
),

 HtmlCssJs: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <path d="M8 8l2.8 28L24 40l13.2-4L40 8H8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M24 14h9l-.8 8H24v4h7.8l-.8 8L24 36l-7-2-.4-5h3.5l.2 2.5L24 33l3.7-1 .4-5H17L16 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
),

 Laravel: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <path d="M42 14L26 8l-4 10 12 4-10 16-16-6-4-18L8 8 6 34l18 8 20-12V14z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M22 18l4-10 16 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
),

  AspNet: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1.6"/>
    <ellipse cx="24" cy="24" rx="8" ry="17" stroke="currentColor" strokeWidth="1.6"/>
    <line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="1.6"/>
    <line x1="10" y1="15" x2="38" y2="15" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="10" y1="33" x2="38" y2="33" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
),
  
  SqlServer: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
      <ellipse cx="24" cy="13" rx="14" ry="5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      <path d="M10 13V24C10 24 10 29 24 29C38 29 38 24 38 24V13" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      <path d="M10 24V35C10 35 10 40 24 40C38 40 38 35 38 35V24" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    </svg>
  ),

  Wordpress: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
    <path d="M6 24h5M37 24h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M10 16l12 20 5-12 5 12 11-20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
),

 Shopify: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <path d="M32 12c0 0-0.5-3-2.5-3c-1 0-2 0.8-2.8 1.5C24.8 9.2 22 8 18 9L15 34l18 3.5V16c0 0-0.5-0.3-1-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M26.7 10.5C27.5 12 28 15 28 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="30" cy="38" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="19" cy="38" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M10 13l2 24h22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="15" y1="20" x2="27" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
),

  UiUx: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <rect x="6" y="8" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.6"/>
    <line x1="6" y1="17" x2="42" y2="17" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="11" cy="12.5" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="12.5" r="1.5" fill="currentColor"/>
    <circle cx="21" cy="12.5" r="1.5" fill="currentColor"/>
    <circle cx="20" cy="28" r="5" stroke="currentColor" strokeWidth="1.6"/>
    <line x1="24" y1="32" x2="29" y2="37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
),
  GraphicDesign: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="24" cy="30" r="6" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M19.2 19.2L21.6 25.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M28.8 19.2L26.4 25.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M22 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
),

VideoEditing: (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
    <rect x="4" y="12" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M32 18l12-6v20l-12-6V18z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <line x1="4" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="10" y1="38" x2="10" y2="42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="20" y1="38" x2="20" y2="42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="30" y1="38" x2="30" y2="42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
),

  Python: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46"><path
        d="M24 4C14.5 4 15 8.5 15 11.5V15H24.5V16.5H11.5C8 16.5 4 18.5 4 25.5C4 32.5 7.5 33.5 10.5 33.5H14V29.5C14 24.5 18 20.5 23 20.5H32.5V14.5C32.5 8.5 29.5 4 24 4Z"
        fill="currentColor"
      />
      <path
        d="M24 44C33.5 44 33 39.5 33 36.5V33H23.5V31.5H36.5C40 31.5 44 29.5 44 22.5C44 15.5 40.5 14.5 37.5 14.5H34V18.5C34 23.5 30 27.5 25 27.5H15.5V33.5C15.5 39.5 18.5 44 24 44Z"
        fill="currentColor"
      />
      <circle cx="19.5" cy="9.5" r="1.5" fill="#FFF" />
      <circle cx="28.5" cy="38.5" r="1.5" fill="#FFF" />
    </svg>
  ),
};


const skills = [
  { name: "React",           category: "Frontend",  level: 88 },
  { name: "AspNet",          category: "Backend",   level: 85 },
  { name: "Angular",         category: "Frontend",  level: 80 },
  { name: "HtmlCssJs",       category: "Frontend",  level: 92 },
  { name: "Laravel",         category: "Backend",   level: 75 },
  { name: "SqlServer",       category: "Database",  level: 82 },
  { name: "Wordpress",       category: "CMS",       level: 78 },
  { name: "Shopify",         category: "E-Commerce",level: 72 },
  { name: "UiUx",            category: "Design",    level: 85 },
  { name: "GraphicDesign",   category: "Design",    level: 80 },
  { name: "VideoEditing",    category: "Media",     level: 70 },
  { name: "Python",          category: "Backend",   level: 60 },
];

/* ─── 3D Tilt Card ─────────────────────────────────────────── */
function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
  };

  const reset = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.045 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{
          position: "relative",
          background: hovered
            ? "linear-gradient(145deg, #1a1a1a 0%, #141414 100%)"
            : "linear-gradient(145deg, #131313 0%, #0e0e0e 100%)",
          border: `1px solid ${hovered ? "rgba(220,38,38,0.7)" : "rgba(220,38,38,0.15)"}`,
          borderRadius: 2,
          padding: "2rem 1.4rem 1.6rem",
          cursor: "default",
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 0 0 1px rgba(220,38,38,0.15), 0 0 28px rgba(220,38,38,0.2), 0 0 60px rgba(220,38,38,0.08), 0 20px 40px rgba(0,0,0,0.5)"
            : "0 4px 24px rgba(0,0,0,0.4)",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Inner glow top edge */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
          background: hovered ? "linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)" : "transparent",
          transition: "background 0.3s ease",
        }} />

        {/* Icon */}
        <div style={{
          color: hovered ? "#dc2626" : "rgba(255,255,255,0.3)",
          transition: "color 0.3s ease, filter 0.3s ease",
          filter: hovered ? "drop-shadow(0 0 8px rgba(220,38,38,0.6))" : "none",
          marginBottom: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateZ(20px)",
        }}>
          {icons[skill.name]}
        </div>

        {/* Skill name */}
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
          color: hovered ? "#dc2626" : "rgba(255,255,255,0.82)",
          textAlign: "center",
          marginBottom: "0.35rem",
          transition: "color 0.3s ease",
          transform: "translateZ(16px)",
          textShadow: hovered ? "0 0 16px rgba(220,38,38,0.55)" : "none",
        }}>
          {skill.name}
        </p>

        {/* Category badge */}
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: hovered ? "rgba(220,38,38,0.6)" : "rgba(255,255,255,0.22)",
          textAlign: "center",
          marginBottom: "1.2rem",
          transition: "color 0.3s ease",
        }}>
          {skill.category}
        </p>

        {/* Skill level bar */}
        <div style={{
          height: 2,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay: 0.3 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "100%",
              background: hovered
                ? "linear-gradient(90deg, #dc2626, #ef4444)"
                : "linear-gradient(90deg, rgba(220,38,38,0.6), rgba(220,38,38,0.35))",
              borderRadius: 1,
              transition: "background 0.3s ease",
              boxShadow: hovered ? "0 0 8px rgba(220,38,38,0.8)" : "none",
            }}
          />
        </div>

        {/* Level label */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 5,
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.1em",
            color: hovered ? "rgba(220,38,38,0.7)" : "rgba(255,255,255,0.2)",
            transition: "color 0.3s ease",
          }}>
            {skill.level}%
          </span>
        </div>

        {/* Corner accent */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 18, height: 18,
          borderBottom: `1.5px solid ${hovered ? "rgba(220,38,38,0.5)" : "rgba(220,38,38,0.12)"}`,
          borderRight: `1.5px solid ${hovered ? "rgba(220,38,38,0.5)" : "rgba(220,38,38,0.12)"}`,
          transition: "border-color 0.3s ease",
        }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */
export default function SkillsSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .skills-root {
          background: #060606;
          padding: 7rem 4vw;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow */
        .skills-root::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(220,38,38,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Grid bg */
        .skills-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .skills-inner {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .eyebrow {
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
        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 1px;
          background: #dc2626;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.8vw, 3rem);
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.08;
          margin-bottom: 0.9rem;
        }
        .section-title em {
          font-style: normal;
          color: #dc2626;
        }

        .section-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
          line-height: 1.8;
          max-width: 480px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.1rem;
        }

        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
        }
        @media (max-width: 520px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <section className="skills-root" id="skill">
        <div className="skills-inner">

          {/* Header */}
          <motion.div
            ref={headRef}
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">Technical Arsenal</p>
            <h2 className="section-title">
              Skills &amp; <em>Technologies</em>
            </h2>
            <p className="section-sub">
              A curated stack of tools and languages I use to architect, build, and ship — from desktop systems to full-stack web platforms.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}