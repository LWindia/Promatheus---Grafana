const outcomeItems = [
  "Deploy and scale a Prometheus monitoring stack",
  "Build and analyze Grafana dashboards with real data",
  "Set up Alertmanager, routing rules, and receiver integrations",
  "Configure exporters and service discovery strategies",
  "Write effective PromQL for SLOs and production signals",
  "Deliver production-grade observability for cloud-native apps",
];

export default function Outcomes() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Key learning outcomes</div>
          <h2 className="headline">Become fluent in Prometheus &amp; Grafana</h2>
          <p className="subhead">
            Walk away ready to instrument services, visualize metrics, build alerting policies, and
            operate observability in production.
          </p>
        </div>
      </div>
      <div className="grid outcomes">
        <div className="card">
          <h3>Hands-on skills</h3>
          <ul className="list">
            {outcomeItems.slice(0, 3).map((item) => (
              <li key={item}>
                <span className="check">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Operational confidence</h3>
          <ul className="list">
            {outcomeItems.slice(3).map((item) => (
              <li key={item}>
                <span className="check">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}


