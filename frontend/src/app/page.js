"use client";
import { useRouter } from "next/navigation";
import "./page.css";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="main-title">TodoMaster</h1>
            <p className="main-subtitle">Organize your life, one task at a time</p>
          </div>

          <div className="hero-description">
            <p>Stay productive and organized with our intuitive todo application. Create, manage, and track your daily tasks effortlessly.</p>
          </div>

          <div className="cta-buttons">
            <button onClick={handleLogin} className="cta-btn primary">
              <span>Login</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15M10 17L15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={handleRegister} className="cta-btn secondary">
              <span>Register</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7ZM20 8V14M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-cards">
            <div className="task-card card-1">
              <div className="task-checkbox checked"></div>
              <div className="task-text">
                <span>Complete project proposal</span>
                <small>Due today</small>
              </div>
            </div>
            <div className="task-card card-2">
              <div className="task-checkbox"></div>
              <div className="task-text">
                <span>Team meeting at 3 PM</span>
                <small>Tomorrow</small>
              </div>
            </div>
            <div className="task-card card-3">
              <div className="task-checkbox checked"></div>
              <div className="task-text">
                <span>Review design mockups</span>
                <small>Completed</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose TodoMaster?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Simple & Intuitive</h3>
              <p>Clean, user-friendly interface that makes task management effortless and enjoyable.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Personal & Secure</h3>
              <p>Your tasks are private and secure. Create your personal workspace with confidence.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast performance with reliable data storage. Your tasks are always safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <h2 className="stats-title">Join Thousands of Productive Users</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">User Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <h2>Ready to Get Organized?</h2>
          <p>Start managing your tasks efficiently today. It's free and takes less than a minute!</p>
          <div className="final-cta-buttons">
            <button onClick={handleRegister} className="cta-btn primary large">
              Get Started Free
            </button>
            <button onClick={handleLogin} className="cta-btn secondary large">
              I Already Have an Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 TodoMaster. Built with ❤️ for productivity enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
}