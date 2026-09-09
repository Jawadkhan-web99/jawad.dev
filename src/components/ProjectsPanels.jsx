import React from 'react';
import { projects } from '../data/projects';

export default function ProjectsPanels({ onSelectCategory }) {
  const feCount = projects.filter((p) => p.category === 'Frontend').length;
  const beCount = projects.filter((p) => p.category === 'Backend').length;
  const fsCount = projects.filter((p) => p.category === 'Full Stack').length;

  return (
    <section className="projects-section section-padding" id="projects" aria-label="Projects section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-tag">What I've Built</span>
          <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">Click a category to explore all my work in that area</p>
        </div>

        {/* 3-Panel Layout */}
        <div className="projects-panels" data-aos="fade-up" data-aos-delay="100">
          {/* Top Row: Frontend (left) + Backend (right) */}
          <div className="panels-top-row">
            {/* Frontend Panel */}
            <button
              className="panel-card panel-frontend"
              onClick={() => onSelectCategory('Frontend')}
              aria-label="View Frontend Projects"
            >
              <div className="panel-bg-icon" aria-hidden="true">
                <i className="fas fa-palette"></i>
              </div>
              <div className="panel-content">
                <div className="panel-icon-wrap">
                  <i className="fas fa-palette"></i>
                </div>
                <h3 className="panel-title">Frontend</h3>
                <p className="panel-subtitle">HTML · CSS · JS · React · Bootstrap</p>
                <div className="panel-count">{feCount} Project{feCount !== 1 ? 's' : ''}</div>
                <div className="panel-cta">
                  <span>Explore Projects</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              <div className="panel-tech-pills" aria-hidden="true">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>React</span>
                <span>Bootstrap</span>
              </div>
            </button>

            {/* Backend Panel */}
            <button
              className="panel-card panel-backend"
              onClick={() => onSelectCategory('Backend')}
              aria-label="View Backend Projects"
            >
              <div className="panel-bg-icon" aria-hidden="true">
                <i className="fas fa-server"></i>
              </div>
              <div className="panel-content">
                <div className="panel-icon-wrap">
                  <i className="fas fa-server"></i>
                </div>
                <h3 className="panel-title">Backend</h3>
                <p className="panel-subtitle">Node.js · Express · MongoDB · REST APIs</p>
                <div className="panel-count">{beCount} Project{beCount !== 1 ? 's' : ''}</div>
                <div className="panel-cta">
                  <span>Explore Projects</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              <div className="panel-tech-pills" aria-hidden="true">
                <span>Node.js</span>
                <span>Express</span>
                <span>MongoDB</span>
                <span>JWT</span>
              </div>
            </button>
          </div>

          {/* Bottom Row: Full Stack */}
          <button
            className="panel-card panel-fullstack"
            onClick={() => onSelectCategory('Full Stack')}
            aria-label="View Full Stack Projects"
          >
            <div className="panel-bg-icon" aria-hidden="true">
              <i className="fas fa-layer-group"></i>
            </div>
            <div className="panel-content">
              <div className="panel-icon-wrap">
                <i className="fas fa-layer-group"></i>
              </div>
              <h3 className="panel-title">Full Stack</h3>
              <p className="panel-subtitle">MERN Stack · Complete Web Applications</p>
              <div className="panel-count">{fsCount} Project{fsCount !== 1 ? 's' : ''}</div>
              <div className="panel-cta">
                <span>Explore Projects</span>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className="panel-tech-pills" aria-hidden="true">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>Express</span>
              <span>Socket.io</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
