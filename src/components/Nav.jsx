import { useState } from "react";

const navLinks = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#about", label: "About" },
  { href: "#outcomes", label: "Outcomes" },
  { href: "#schedule", label: "Schedule" },
  { href: "#mentor", label: "Mentor" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <header className="navbar">
        <div className="nav-inner">
          <a href="#hero" className="brand">
            <img src="/images/WHITE LW.png" alt="LW Logo" className="brand-mark" />
            <span className="brand-text">Prometheus &amp; Grafana Training</span>
          </a>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a 
            className="btn btn-primary nav-enroll-btn" 
            href="https://rzp.io/rzp/prometheus-grafana" 
            target="_blank" 
            rel="noreferrer"
          >
            Enroll Now
          </a>
        </div>
      </header>
    </>
  );
}


