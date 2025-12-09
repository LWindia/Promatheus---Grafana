export default function Hero() {
  return (
    <div className="hero-card">
      <div className="hero-grid">
        <div>
          <h1 className="headline">Master Prometheus &amp; Grafana with India’s DevOps Guru</h1>
          <p className="subhead">
            Hands-on live training that blends modern monitoring, observability, and dashboarding.
            Build production-grade skills with real-world labs, taught by Mr. Vimal Daga.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="https://rzp.io/rzp/prometheus-grafana" target="_blank" rel="noreferrer">
              Enroll Now
            </a>
          </div>
          <div className="highlight-pills">
            <span className="pill">Live Training</span>
            <span className="pill">Hands-on Labs</span>
            <span className="pill">Certificate</span>
          </div>
        </div>
        <div className="hero-banner">
          <div className="banner-metrics">
            <span className="badge">Prometheus + Grafana Stack</span>
            <div className="stat">
              <span>Real-Time Dashboards</span>
              <strong>Grafana</strong>
            </div>
            <div className="stat">
              <span>Metrics &amp; Alerting</span>
              <strong>Prometheus + Alertmanager</strong>
            </div>
            <div className="stat">
              <span>Hands-on Labs</span>
              <strong>Practical Learning</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

