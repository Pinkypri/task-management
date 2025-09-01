import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#27ae60">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            <span>Trusted by 10,000+ users</span>
          </div>
          <h1 className="hero-title">
            Organize Your Tasks
            <br />
            <span className="highlight">Boost Your Productivity</span>
          </h1>
          <p className="hero-subtitle">
            A powerful task management application that helps you stay organized, 
            track progress, and achieve your goals efficiently.
          </p>
        </div>
        <div className="hero-visual">
          <div className="task-preview">
            <div className="task-card">
              <div className="task-status completed"></div>
              <div className="task-content">
                
                <h4>Task Management</h4>
                <p>Create and organize tasks</p>
              </div>
            </div>
            <div className="task-card">
              <div className="task-status pending"></div>
              <div className="task-content">
                <h4>Progress Tracking</h4>
                <p>Monitor task completion</p>
              </div>
            </div>
            <div className="task-card">
              <div className="task-status progress"></div>
              <div className="task-content">
                <h4>Smart Filtering</h4>
                <p>Find tasks quickly</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <div className="cta-buttons">
              <Link to="/register">
                <Button variant="primary" size="lg">Get Started Free</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

  
    </div>
  );
};

export default Home;