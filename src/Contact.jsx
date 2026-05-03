import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Reveal wrapper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 36 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Input Field ───────────────────────────────── */
function Field({
  label,
  type = "text",
  name,
  value,
  onChange,
  multiline = false,
}) {
  const [focused, setFocused] = useState(false);
  const filled = value?.length > 0;

  const baseStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.88rem",
    fontWeight: 300,
    letterSpacing: "0.04em",
    paddingTop: "1.5rem",
    paddingBottom: "0.6rem",
    resize: "none",
    caretColor: "#dc2626",
  };

  return (
    <div style={{ position: "relative", marginBottom: "2.2rem" }}>
      {/* Floating label */}
      <label
        style={{
          position: "absolute",
          top: focused || filled ? "0" : "1.4rem",
          left: 0,
          fontFamily: "'DM Mono', monospace",
          fontSize: focused || filled ? "0.58rem" : "0.82rem",
          letterSpacing: focused || filled ? "0.22em" : "0.08em",
          textTransform: focused || filled ? "uppercase" : "none",
          color: focused ? "#dc2626" : "rgba(255,255,255,0.3)",
          transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </label>

      {/* Input or Textarea */}
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
          autoComplete="off"
        />
      )}

      {/* Bottom border track */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.1)",
        }}
      />

      {/* Expanding red border */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #dc2626, #ef4444)",
          transformOrigin: "left",
          boxShadow: "0 0 10px rgba(220,38,38,0.5)",
        }}
      />

      {/* Focus dot indicator */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: -4,
              right: 0,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#dc2626",
              boxShadow: "0 0 8px rgba(220,38,38,0.8)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Glitch Button ───────────────────────────────────────── */
function GlitchButton({ children, onClick, sent }) {
  const [glitching, setGlitching] = useState(false);

  return (
    <>
      <style>{`
        @keyframes glitch-skew {
          0%  { transform: skew(0deg); }
          10% { transform: skew(-3deg); }
          20% { transform: skew(2deg); }
          30% { transform: skew(-1.5deg); }
          40% { transform: skew(3deg); }
          50% { transform: skew(-2deg); }
          60% { transform: skew(1deg); }
          70% { transform: skew(-3deg); }
          80% { transform: skew(2.5deg); }
          90% { transform: skew(-1deg); }
          100%{ transform: skew(0deg); }
        }
        @keyframes glitch-clip-1 {
          0%   { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 0); }
          25%  { clip-path: inset(10% 0 70% 0); transform: translate(4px, 0); }
          50%  { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 0); }
          75%  { clip-path: inset(20% 0 60% 0); transform: translate(3px, 0); }
          100% { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 0); }
        }
        @keyframes glitch-clip-2 {
          0%   { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
          25%  { clip-path: inset(70% 0 10% 0); transform: translate(-3px, 0); }
          50%  { clip-path: inset(20% 0 55% 0); transform: translate(5px, 0); }
          75%  { clip-path: inset(60% 0 25% 0); transform: translate(-2px, 0); }
          100% { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
        }
        .glitch-wrap {
          position: relative;
          display: inline-block;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .glitch-wrap.active { animation: glitch-skew 0.4s infinite; }
        .glitch-text { position: relative; z-index: 1; }
        .glitch-before, .glitch-after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
          opacity: 0;
        }
        .glitch-wrap.active .glitch-before {
          color: #ff0000;
          opacity: 0.7;
          animation: glitch-clip-1 0.3s infinite;
        }
        .glitch-wrap.active .glitch-after {
          color: #00ffff;
          opacity: 0.5;
          animation: glitch-clip-2 0.35s infinite;
          mix-blend-mode: screen;
        }
      `}</style>

      <motion.button
        onClick={onClick}
        onHoverStart={() => setGlitching(true)}
        onHoverEnd={() => setGlitching(false)}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "relative",
          padding: "1rem 3rem",
          background: sent ? "transparent" : "#dc2626",
          border: sent ? "1px solid rgba(220,38,38,0.4)" : "1px solid #dc2626",
          cursor: "pointer",
          overflow: "hidden",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          boxShadow:
            glitching && !sent
              ? "0 0 30px rgba(220,38,38,0.4), 0 0 60px rgba(220,38,38,0.15)"
              : "0 0 20px rgba(220,38,38,0.2)",
        }}
      >
        {/* Scan-line overlay */}
        {glitching && !sent && (
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "30%",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(220,38,38,0.08) 50%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}

        <div className={`glitch-wrap${glitching && !sent ? " active" : ""}`}>
          <span
            className="glitch-text"
            style={{
              color: sent ? "rgba(220,38,38,0.6)" : "#fff",
              position: "relative",
              zIndex: 1,
            }}
          >
            {children}
          </span>
          <span
            className="glitch-before"
            data-text={children}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="glitch-after"
            data-text={children}
            aria-hidden="true"
          >
            {children}
          </span>
        </div>
      </motion.button>
    </>
  );
}

/* ─── Social Icons ───────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 10v7M7 7v.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 17v-4c0-1.657 1.343-3 3-3s3 1.343 3 3v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 10v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2 7l10 7 10-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const socialLinks = [
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    href: "https://github.com/usmanqaimkhani",
  },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://linkedin.com" },
  {
    icon: <EmailIcon />,
    label: "Email",
    href: "mailto:musmankhan671@gmail.com",
  },
];

/* ─── Main Component ──────────────────────────────────────── */
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-root {
          background: #030303;
          position: relative;
          overflow: hidden;
        }

        /* ── Contact Section ── */
        .contact-section {
          padding: 7rem 4vw 5rem;
          position: relative;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          bottom: 0; right: -5%;
          width: 50%; height: 60%;
          background: radial-gradient(ellipse, rgba(220,38,38,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .contact-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: start;
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
          width: 24px; height: 1px;
          background: #dc2626;
        }

        .contact-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.0;
          margin-bottom: 1.8rem;
        }
        .contact-heading em { font-style: normal; color: #dc2626; }

        .contact-desc {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.38);
          margin-bottom: 2.8rem;
          max-width: 360px;
        }

        /* Info rows */
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.4rem;
        }
        .info-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(220,38,38,0.2);
          display: flex; align-items: center; justify-content: center;
          color: rgba(220,38,38,0.6);
          flex-shrink: 0;
        }
        .info-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 3px;
        }
        .info-value {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
        }

        /* Form panel */
        .form-panel {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 2.8rem 2.4rem;
          position: relative;
        }
        .form-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #dc2626 0%, rgba(220,38,38,0.2) 60%, transparent 100%);
        }

        .form-corner {
          position: absolute;
          bottom: 0; right: 0;
          width: 24px; height: 24px;
          border-bottom: 1.5px solid rgba(220,38,38,0.3);
          border-right: 1.5px solid rgba(220,38,38,0.3);
        }

        /* Success */
        .success-msg {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem 0;
          text-align: center;
        }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 2.8rem 4vw;
          position: relative;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.3) 50%, transparent 100%);
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .footer-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
        }
        .footer-logo span { color: #dc2626; }

        .footer-copy {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.2);
          text-align: center;
        }
        .footer-copy span { color: rgba(220,38,38,0.5); }

        .social-links {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .social-btn {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .social-btn:hover {
          color: #dc2626;
          border-color: rgba(220,38,38,0.4);
          box-shadow: 0 0 16px rgba(220,38,38,0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 820px) {
          .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
          .footer-inner { flex-direction: column; text-align: center; }
        }

        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes success-pop { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        .success-check { animation: success-pop 0.5s ease forwards; }
      `}</style>

      <div className="contact-root">
        {/* ── Contact Section ── */}
        <section className="contact-section" id="contact">
          <div className="contact-inner">
            {/* Left: Info */}
            <div>
              <Reveal delay={0}>
                <p className="eyebrow">Get In Touch</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="contact-heading">
                  Let's Build
                  <br />
                  Something <em>Real.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="contact-desc">
                  Open to freelance collaborations, internship opportunities,
                  and interesting engineering problems. If you have a project in
                  mind — let's talk.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div>
                  {[
                    {
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <polyline
                            points="22,6 12,13 2,6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                      label: "Email",
                      value: "musmankhan671@gmail.com",
                    },
                    {
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      ),
                      label: "Location",
                      value: "Karachi, Pakistan",
                    },
                    {
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="8"
                            y1="2"
                            x2="8"
                            y2="6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      ),
                      label: "Availability",
                      value: "Open to opportunities",
                    },
                  ].map((item, i) => (
                    <div className="info-item" key={i}>
                      <div className="info-icon">{item.icon}</div>
                      <div>
                        <p className="info-label">{item.label}</p>
                        <p className="info-value">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Decorative large text */}
              <Reveal delay={0.4}>
                <div
                  style={{
                    marginTop: "3rem",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    lineHeight: 1,
                    color: "rgba(220,38,38,0.06)",
                    letterSpacing: "0.06em",
                    userSelect: "none",
                  }}
                >
                  HDSE
                  <br />
                  2024–2027
                </div>
              </Reveal>
            </div>

            {/* Right: Form */}
            <Reveal delay={0.15}>
              <div className="form-panel">
                <div className="form-corner" />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="success-msg"
                    >
                      <div
                        className="success-check"
                        style={{
                          width: 60,
                          height: 60,
                          border: "1.5px solid rgba(220,38,38,0.5)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#dc2626",
                          boxShadow: "0 0 30px rgba(220,38,38,0.2)",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          color: "#fff",
                        }}
                      >
                        Message Sent
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.35)",
                          lineHeight: 1.8,
                        }}
                      >
                        Thanks for reaching out.
                        <br />
                        I'll get back to you soon.
                      </p>
                      <button
                        onClick={() => {
                          setSent(false);
                          setForm({ name: "", email: "", message: "" });
                        }}
                        style={{
                          marginTop: "0.5rem",
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.35)",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "0.5rem 1.2rem",
                          cursor: "pointer",
                          transition: "border-color 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = "rgba(220,38,38,0.3)";
                          e.target.style.color = "rgba(220,38,38,0.6)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.1)";
                          e.target.style.color = "rgba(255,255,255,0.35)";
                        }}
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(220,38,38,0.55)",
                          marginBottom: "2rem",
                        }}
                      >
                        — New Message
                      </p>

                      <Field
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      <Field
                        label="Email Address"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <Field
                        label="Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        multiline
                      />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "0.5rem",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        <GlitchButton onClick={handleSend} sent={sent}>
                          {sending ? "Sending..." : "Send Message"}
                        </GlitchButton>

                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.58rem",
                            letterSpacing: "0.12em",
                            color: "rgba(255,255,255,0.18)",
                          }}
                        >
                          Usually replies within 24h
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-logo">
              M.<span>U</span>K
            </div>


            <p className="footer-copy">
              © 2026 All Rights Reserved By M. Usman Khan &nbsp;{" "}
            </p>

            <div className="social-links">
              <a
                href="https://github.com/usmanqaimkhani"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/m-usman-kq"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>

              <a
                href="mailto:musmankhan671@gmail.com"
                className="social-btn"
                aria-label="Email"
                title="Email"
              >
                <EmailIcon />
              </a>
            </div>
            {/* <div className="social-links">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  aria-label={s.label}
                  title={s.label}
                  onClick={e => e.preventDefault()}
                >
                  {s.icon}
                </a>
              ))}
            </div> */}
          </div>
        </footer>
      </div>
    </>
  );
}
