export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand">
          <span className="brand-mark">PG</span>
          <div>
            <strong>Prometheus &amp; Grafana Training</strong>
            <br />
            With Mr. Vimal Daga — DevOps Guru of India
          </div>
        </div>
        <div className="socials">
          <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
          <a href="https://twitter.com" aria-label="Twitter">𝕏</a>
          <a href="https://youtube.com" aria-label="YouTube">▶</a>
        </div>
        <div>
          © {new Date().getFullYear()} Prometheus &amp; Grafana Training. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


