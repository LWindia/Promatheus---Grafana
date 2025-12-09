const audienceList = [
  "DevOps Engineers, SREs, Cloud Engineers",
  "Developers building apps with observability requirements",
  "Platform and Infra teams standardizing monitoring",
  "Leads who need reliable dashboards and alerting",
];

export default function Audience() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Who should attend</div>
          <h2 className="headline">For teams that own uptime and insight</h2>
          <p className="subhead">If you ship, run, or operate services—this training is for you.</p>
        </div>
      </div>
      <div className="grid cards-3">
        {audienceList.map((item) => (
          <div key={item} className="card audience-card">
            <div className="check">✓</div>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </>
  );
}


