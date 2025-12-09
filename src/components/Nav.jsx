const navLinks = [
  { href: "#about", label: "About" },
  { href: "#outcomes", label: "Outcomes" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#schedule", label: "Schedule" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="#hero" className="brand">
          <span className="brand-mark">PG</span>
          <span>Prometheus &amp; Grafana Training</span>
        </a>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-primary" href="https://rzp.io/rzp/prometheus-grafana" target="_blank" rel="noreferrer">
            Enroll Now
          </a>
        </nav>
      </div>
    </header>
  );
}


