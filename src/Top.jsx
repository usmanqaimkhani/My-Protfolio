import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home",     href: "home"     },
  { label: "About",    href: "about"    },
  { label: "Skills",   href: "skill"   },
  { label: "Projects", href: "project" },
  { label: "Contact",  href: "contact"  },
];

export default function PortfolioNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveLink(id);
    setMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    scrollTo("home");
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollTo(href);
  };

  const handleHamburger = () => {
    setMenuOpen((o) => !o);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .nav-root.scrolled {
          background: rgba(6, 6, 6, 0.55);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom: 1px solid rgba(220, 38, 38, 0.12);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.12em;
          color: #fff;
          cursor: pointer;
          position: relative;
          user-select: none;
          text-decoration: none;
        }
        .logo::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0;
          width: 100%;
          height: 2px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .logo:hover::after { transform: scaleX(1); }
        .logo:hover { color: #fff; text-shadow: 0 0 18px rgba(220,38,38,0.6); }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links li a {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%;
          height: 1.5px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .nav-links li a:hover,
        .nav-links li a.active {
          color: #fff;
          text-shadow:
            0 0 8px rgba(220,38,38,0.8),
            0 0 20px rgba(220,38,38,0.4),
            0 0 40px rgba(220,38,38,0.15);
        }
        .nav-links li a:hover::after,
        .nav-links li a.active::after {
          transform: scaleX(1);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
          outline: none;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: rgba(255,255,255,0.85);
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: #dc2626;
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: #dc2626;
        }

        .mobile-menu {
          position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(5, 5, 5, 0.97);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-top: 1px solid rgba(220,38,38,0.15);
          border-bottom: 1px solid rgba(220,38,38,0.15);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.35s ease;
          opacity: 0;
          pointer-events: none;
          z-index: 999;
        }
        .mobile-menu.open {
          max-height: 320px;
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu ul {
          list-style: none;
          padding: 1rem 0;
        }
        .mobile-menu ul li a {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          padding: 0.85rem 2rem;
          transition: color 0.25s ease, background 0.25s ease, text-shadow 0.25s ease;
          border-left: 2px solid transparent;
        }
        .mobile-menu ul li a:hover,
        .mobile-menu ul li a.active {
          color: #fff;
          background: rgba(220,38,38,0.06);
          border-left-color: #dc2626;
          text-shadow: 0 0 12px rgba(220,38,38,0.6);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <a className="logo" href="#home" onClick={handleLogoClick}>
            UK
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={`#${href}`}
                  className={activeLink === href ? "active" : ""}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={handleHamburger}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={`#${href}`}
                className={activeLink === href ? "active" : ""}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}