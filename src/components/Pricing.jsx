export default function Pricing() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Pricing</div>
          <h2 className="headline">Reserve your spot</h2>
          <p className="subhead">Secure your seat now and get live access to all the resources.</p>
        </div>
        <a className="btn btn-primary" href="https://rzp.io/rzp/prometheus-grafana" target="_blank" rel="noreferrer">
          Register Now
        </a>
      </div>
      <div className="pricing">
        <div className="card price-card price-card--featured pricing-grid">
          <div className="price-left">
            <div className="badge">Most Popular</div>
            <div className="price-header">
              <h3>Full Access Pass</h3>
              <div className="muted small">
                Launch offer (regular value ₹8,000). Live sessions, Practical Hands on, Summaries, and mentor Q&A.
              </div>
            </div>
            <ul className="list">
              <li><span className="check">✓</span><span>Live training + recordings</span></li>
              <li><span className="check">✓</span><span>Practical hands-on labs + guides</span></li>
              <li><span className="check">✓</span><span>Session summaries & templates</span></li>
              <li><span className="check">✓</span><span>Post-training Q&A window</span></li>
              <li><span className="check">✓</span><span>Certificate of completion</span></li>
            </ul>
          </div>
          <div className="price-right">
            <div className="price">₹2,000 + taxes</div>
            <div className="muted small strike">₹8,000</div>
            <div className="muted small">Limited-time launch pricing</div>
            <div className="hero-actions" style={{ marginTop: "16px", flexDirection: "column", alignItems: "stretch" }}>
              <a className="btn btn-primary" href="https://rzp.io/rzp/prometheus-grafana" target="_blank" rel="noreferrer" style={{ width: "100%" }}>Register Now</a>
              <a className="btn btn-ghost" href="#contact" style={{ width: "100%" }}>Talk to us</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


