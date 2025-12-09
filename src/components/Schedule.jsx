export default function Schedule() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Duration & schedule</div>
          <h2 className="headline">Live training • 16 hours</h2>
        </div>
        <div className="status">Seats filling fast</div>
      </div>
      <div className="schedule-grid">
        <div className="card schedule-info">
          <div className="pill accent">Mode: Online</div>
          <div className="pill accent">Delivered by: Mr. Vimal Daga</div>
          <div className="pill accent">Dates: 20th, 21st, 27th, 28th Dec 2025</div>
          <div className="pill accent">Timings: 03:00 pm – 07:00 pm IST</div>
        </div>
        <div className="card schedule-stats">
          <div className="stat">
            <span>Format</span>
            <strong>Live + Labs</strong>
          </div>
          <div className="stat">
            <span>Total Duration</span>
            <strong>16 Hours</strong>
          </div>
          <div className="stat">
            <span>Dates</span>
            <strong>20, 21, 27, 28 Dec 2025</strong>
          </div>
          <div className="stat">
            <span>Timings (IST)</span>
            <strong>03:00 pm – 07:00 pm</strong>
          </div>
        </div>
      </div>
    </>
  );
}

