import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Project Data ─────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    number: "01",
    title: "Garments Web",
    subtitle: "Product Showcase",
    description:
      "A fully functional garments store website designed to showcase apparel collections. Developed using HTML, CSS, and JavaScript to ensure high performance and a smooth shopping experience across all devices.",
    tags: ["HTML", "CSS", "JS"],
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, #1a0000 0%, #0d0d0d 55%, #111 100%)",
    pattern: "circuit",
  },
  {
    id: 2,
    number: "02",
    title: "Fuel Signage Solutions",
    subtitle: "Signs Showcasing ",
    description:
      "A specialized corporate website built on WordPress for a leading manufacturer of petroleum pump signage and industrial displays. Features a comprehensive product catalog, high-conversion inquiry forms, and a responsive design tailored to showcase diverse hardware solutions with professional precision.",
    tags: ["Wordpress", "Elementor", "SEO Optimized"],
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, #0a0a00 0%, #0d0d0d 55%, #0e0e0e 100%)",
    pattern: "grid",
  },
  {
    id: 3,
    number: "03",
    title: "Mobile Marketplace",
    subtitle: "E-Commerce & Trade-In Portal",
    description:
      "Modern WordPress-based marketplace for mobile phones. Designed with a clean interface to facilitate smooth trading and selling, ensuring a secure and user-friendly environment for tech-savvy customers.",
    tags: ["Wordpress", "Elementor", "Responsive Design"],
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, #000a0a 0%, #0d0d0d 55%, #101010 100%)",
    pattern: "dots",
  },
  {
    id: 4,
    number: "04",
    title: "AgroTrade Showcase",
    subtitle: "Agricultural Commodities Export",
    description:
      "A professional business showcase website designed for an agricultural trading firm. Built with HTML and CSS, it highlights high-quality commodities like Wheat, Cotton, and Rice through a clean, grid-based layout and a focused user interface for global clients.",
    tags: ["HTML5", "CSS3", "Business Showcase"],
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, #0a0500 0%, #0d0d0d 55%, #0f0f0f 100%)",
    pattern: "lines",
  },
  {
    id: 5,
    number: "05",
    title: "E-Commerce Web",
    subtitle: "Shopify E-Commerce Brand",
    description:
      "A premium clothing storefront developed on Shopify for the Cene Fashion brand. Focused on high conversion and brand identity, featuring automated collection filters, a seamless mobile shopping experience, and a high-end aesthetic tailored for modern apparel retail.",
    tags: ["Shopify", "Liquid", "Brand Identity", "E-Commerce"],
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, #00000a 0%, #0d0d0d 55%, #0e0e10 100%)",
    pattern: "circuit",
  },
  {
    id: 6,
    number: "06",
    title: "Cosmetic Store",
    subtitle: "Shopify Cosmetic Store",
    description:
      "A specialized Shopify e-commerce platform for a beauty and skincare brand. Designed with a focus on visual storytelling and product purity, featuring advanced skin-type filtering, customer review integration, and a sleek, modern checkout flow for a seamless shopping experience.",
    tags: ["Shopify", "UI/UX Design", "E-Commerce", "SkinCare"],
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, #050505 0%, #0d0d0d 55%, #121212 100%)",
    pattern: "grid",
  },
];

/* ─── SVG Pattern Generators ───────────────────────────────── */
function PatternSVG({ type }) {
  if (type === "circuit")
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
        <defs>
          <pattern id={`c-${type}`} width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M10 30 H30 M30 30 V10 M50 30 H30 M30 30 V50" stroke="rgba(220,38,38,0.7)" strokeWidth="0.7" fill="none"/>
            <circle cx="30" cy="30" r="2.5" fill="none" stroke="rgba(220,38,38,0.8)" strokeWidth="0.7"/>
            <circle cx="10" cy="30" r="1.5" fill="rgba(220,38,38,0.5)"/>
            <circle cx="50" cy="30" r="1.5" fill="rgba(220,38,38,0.5)"/>
            <circle cx="30" cy="10" r="1.5" fill="rgba(220,38,38,0.5)"/>
            <circle cx="30" cy="50" r="1.5" fill="rgba(220,38,38,0.5)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#c-${type})`}/>
      </svg>
    );
  if (type === "grid")
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <defs>
          <pattern id="grid-p" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(220,38,38,0.6)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-p)"/>
      </svg>
    );
  if (type === "dots")
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
        <defs>
          <pattern id="dots-p" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="11" cy="11" r="1" fill="rgba(220,38,38,0.7)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-p)"/>
      </svg>
    );
  if (type === "lines")
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.09 }}>
        <defs>
          <pattern id="lines-p" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0" stroke="rgba(220,38,38,0.6)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines-p)"/>
      </svg>
    );
  return null;
}

/* ─── Project Card ──────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1.1fr" : "1.1fr 1fr",
        gap: 0,
        border: "1px solid rgba(255,255,255,0.06)",
        borderColor: hovered ? "rgba(220,38,38,0.28)" : "rgba(255,255,255,0.06)",
        background: "#080808",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 0 0 1px rgba(220,38,38,0.08), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(220,38,38,0.05)"
          : "0 8px 40px rgba(0,0,0,0.5)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Image side */}
      <div style={{ order: isEven ? 0 : 1, position: "relative", overflow: "hidden", minHeight: 320 }}>
        {/* Zoom-in image/pattern panel */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", inset: 0,
            background: project.gradient,
          }}
        >
          <PatternSVG type={project.pattern} />

          {/* Big project number watermark */}
          <div style={{
            position: "absolute",
            bottom: -20, right: -10,
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "9rem",
            lineHeight: 1,
            color: "rgba(220,38,38,0.07)",
            userSelect: "none",
            pointerEvents: "none",
          }}>
            {project.number}
          </div>

          {/* Centre glyph */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <motion.div
              animate={{ opacity: hovered ? 0 : 0.45, scale: hovered ? 0.85 : 1 }}
              transition={{ duration: 0.45 }}
              style={{
                width: 72, height: 72,
                border: "1px solid rgba(220,38,38,0.4)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <div style={{ width: 28, height: 28, border: "1px solid rgba(220,38,38,0.6)", transform: "rotate(45deg)" }} />
            </motion.div>
          </div>

          {/* Hover overlay with red tint */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(220,38,38,0.06) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* Number badge */}
        <div style={{
          position: "absolute", top: 20, left: 20,
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          color: "rgba(220,38,38,0.7)",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(220,38,38,0.2)",
          padding: "4px 10px",
          zIndex: 2,
        }}>
          {project.number}
        </div>

        {/* Category strip */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1.8rem 1.4rem 1.2rem",
          background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(220,38,38,0.65)",
          }}>
            {project.subtitle}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div style={{
        order: isEven ? 1 : 0,
        padding: "2.5rem 2.2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderLeft: isEven ? "1px solid rgba(255,255,255,0.05)" : "none",
        borderRight: isEven ? "none" : "1px solid rgba(255,255,255,0.05)",
        gap: "1.4rem",
      }}>
        {/* Title */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
            letterSpacing: "-0.02em",
            color: hovered ? "#fff" : "rgba(255,255,255,0.88)",
            lineHeight: 1.15,
            marginBottom: "1rem",
            transition: "color 0.3s ease",
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.76rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.42)",
            marginBottom: "1.4rem",
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#dc2626",
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.28)",
                padding: "3px 9px",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {/* Live Demo */}
          <motion.a
            href="#"
            onClick={e => e.preventDefault()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.65rem 1.4rem",
              border: "1px solid #dc2626",
              background: "transparent",
              color: "#dc2626",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(220,38,38,0.1)";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(220,38,38,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Live Demo
          </motion.a>

          {/* GitHub */}
         {/* <motion.a
            href="#"
            onClick={e => e.preventDefault()}
            whileHover={{ scale: 1.03, color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.65rem 1.2rem",
              background: "transparent",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid transparent",
              transition: "color 0.25s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            GitHub
          </motion.a>
          */}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Export ───────────────────────────────────────────── */
export default function ProjectsSection() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .projects-root {
          background: #030303;
          padding: 7rem 4vw;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow top-left */
        .projects-root::before {
          content: '';
          position: absolute;
          top: 0; left: -10%;
          width: 50%; height: 40%;
          background: radial-gradient(ellipse, rgba(220,38,38,0.04) 0%, transparent 65%);
          pointer-events: none;
        }

        .projects-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-eyebrow {
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
        .section-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px; height: 1px;
          background: #dc2626;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.8vw, 3rem);
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.08;
          margin-bottom: 0.8rem;
        }
        .section-title em { font-style: normal; color: #dc2626; }

        .section-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(255,255,255,0.32);
          letter-spacing: 0.04em;
          line-height: 1.8;
          max-width: 460px;
          margin-bottom: 4rem;
        }

        .projects-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5px;
        }

        @media (max-width: 720px) {
          .projects-stack article {
            grid-template-columns: 1fr !important;
          }
          .projects-stack article > div:first-child,
          .projects-stack article > div:last-child {
            order: unset !important;
            border-left: none !important;
            border-right: none !important;
          }
          .projects-stack article > div:first-child {
            min-height: 220px !important;
          }
        }
      `}</style>

      <section className="projects-root" id="project">
        <div className="projects-inner">

          {/* Header */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-eyebrow">Selected Work</p>
            <h2 className="section-title">Featured <em>Projects</em></h2>
            <p className="section-sub">
              Real systems, real clients, real impact — a curated selection of software I've architected and shipped from concept to deployment.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="projects-stack">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}