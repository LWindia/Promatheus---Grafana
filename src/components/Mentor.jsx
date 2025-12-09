export default function Mentor() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Know your mentor</div>
          <h2 className="headline">Learn from India's DevOps Guru</h2>
          <p className="subhead">Live training • 16 hours</p>
        </div>
      </div>
      <div className="mentor-grid">
        <div className="mentor-image">
          <img 
            src="/images/Vimal Sir's .jpg" 
            alt="Vimal Daga - DevOps Guru" 
            className="mentor-photo"
          />
        </div>
        <div className="mentor-content">
          <h3>Vimal Daga</h3>
          <p className="mentor-description">
            With over a decade of experience in transforming careers and building tech leaders, 
            Mr. Vimal Daga has mentored thousands of professionals across the globe. His unique 
            approach combines practical industry experience with innovative teaching methodologies.
          </p>
          
          <div className="mentor-stats">
            <div className="stat-card">
              <div className="stat-value">10 Lakh+</div>
              <div className="stat-label">Students Mentored</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">23+ Years</div>
              <div className="stat-label">Industry Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">153+</div>
              <div className="stat-label">Tools & Technology</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">4.9/5</div>
              <div className="stat-label">Student Rating</div>
            </div>
          </div>
          
          <blockquote className="mentor-quote">
            "Technology should serve humanity, not the other way around. My mission is to create 
            tech leaders who build solutions that make the world a better place."
          </blockquote>
        </div>
      </div>
    </>
  );
}

