import React from 'react';
import { useTypedText } from '../hooks/useTypedText';

const ROLES = [
  'Web Developer',
  'Frontend Developer',
  'MERN Stack Developer',
  'React Developer',
  'UI/UX Enthusiast',
];

export default function Hero() {
  const typedRole = useTypedText(ROLES);

  return (
    <section className="hero-section" id="home" aria-label="Hero section">
      {/* Animated background particles */}
      <div className="hero-bg-animation" aria-hidden="true">
        <div className="particle"></div><div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div><div className="particle"></div>
        <div className="floating-code code-1" aria-hidden="true">&lt;div&gt;</div>
        <div className="floating-code code-2" aria-hidden="true">const dev = () =&gt; {}</div>
        <div className="floating-code code-3" aria-hidden="true">.css &#123; &#125;</div>
        <div className="floating-code code-4" aria-hidden="true">npm install</div>
        <div className="floating-code code-5" aria-hidden="true">&#123; ...MERN &#125;</div>
      </div>

      <div className="container">
        <div className="row align-items-center min-vh-100 py-5">
          {/* Text Content */}
          <div className="col-lg-6 hero-content" data-aos="fade-right" data-aos-duration="900">
            <div className="hero-badge mb-3">
              <span className="badge-dot"></span>
              <span>Available for Work</span>
            </div>
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">Jawad <span className="gradient-text">Khan</span></h1>
            <div className="hero-roles">
              <span className="role-prefix"> </span>
              <span className="typed-text" id="typedText">{typedRole}</span>
              <span className="typed-cursor">|</span>
              <span className="role-prefix"> </span>
            </div>
            <p className="hero-description">
              I build modern, responsive web applications using the MERN stack.
              I care about clean code, fast performance, and user experiences
              that actually work — on every device.
            </p>
            <div className="hero-cta d-flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary-custom">
                <i className="fas fa-rocket me-2"></i>View My Projects
              </a>
              <a href="#contact" className="btn btn-outline-custom">
                <i className="fas fa-envelope me-2"></i>Contact Me
              </a>
            </div>
            <div className="hero-socials d-flex gap-3 mt-4">
              <a href="https://github.com/jawadkh92552417" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/jawad-khan-72622832a" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://x.com/jawadkh92552417" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X (Twitter)">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="mailto:jawadkhanahmad7@gmail.com" className="social-icon" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="col-lg-6 hero-visual d-flex justify-content-center" data-aos="fade-left" data-aos-duration="900" data-aos-delay="200">
            <div className="hero-image-wrapper">
              <div className="hero-glow" aria-hidden="true"></div>
              <div className="hero-avatar">
                <img src="/images/profile.png" alt="Jawad Khan - Web Developer" onError={(e) => { e.currentTarget.src = "/jwd.png"; }} />
              </div>
              {/* Floating tech badges */}
              <div className="tech-float tech-float-1" aria-hidden="true"><i className="fab fa-react"></i> React</div>
              <div className="tech-float tech-float-2" aria-hidden="true"><i className="fab fa-node-js"></i> Node.js</div>
              <div className="tech-float tech-float-3" aria-hidden="true"><i className="fab fa-js-square"></i> JS</div>
              <div className="tech-float tech-float-4" aria-hidden="true"><i className="fab fa-html5"></i> HTML5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
      </a>
    </section>
  );
}
