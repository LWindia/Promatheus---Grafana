export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand">
          <img src="/images/WHITE LW.png" alt="LW Logo" className="brand-mark" />
          <div>
            <strong>Prometheus &amp; Grafana Training</strong>
            <br />
            With Mr. Vimal Daga — DevOps Guru of India
          </div>
        </div>
        <div className="socials">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">𝕏</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
        </div>
        <div>
          © {new Date().getFullYear()} Prometheus &amp; Grafana Training. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


