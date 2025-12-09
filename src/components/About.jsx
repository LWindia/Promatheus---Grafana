const cards = [
  {
    title: "Prometheus + Grafana stack",
    body:
      "Instrument, scrape, store, and visualize metrics. See how Prometheus, Alertmanager, exporters, and Grafana come together for a production-grade pipeline.",
  },
  {
    title: "Purpose-built for practitioners",
    body:
      "Designed for DevOps, SRE, and cloud engineers who need actionable dashboards, reliable alerts, and observability that scales.",
  },
  {
    title: "Mentored by experience",
    body:
      "Learn directly from Mr. Vimal Daga—India’s DevOps Guru—with two decades of real-world delivery, industry cases, and hands-on labs.",
  },
];

export default function About() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Why this training</div>
          <h2 className="headline">Monitoring that matches modern delivery</h2>
          <p className="subhead">
            Observability is now critical for resilient systems. Learn how Prometheus and Grafana
            power real-time insights, proactive alerting, and executive-ready dashboards across
            Kubernetes, microservices, and cloud-native workloads.
          </p>
        </div>
      </div>
      <div className="grid cards-3">
        {cards.map((card) => (
          <div key={card.title} className="card">
            <h3>{card.title}</h3>
            <p className="muted">{card.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}


