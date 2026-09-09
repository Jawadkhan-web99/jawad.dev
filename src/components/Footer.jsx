import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="footer-brand">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">Jawad</span>
            <span className="brand-accent">Khan</span>
            <span className="brand-bracket">/&gt;</span>
          </div>
          <p className="footer-copy mb-0">
            &copy; {currentYear} Jawad Khan. Built with <i className="fas fa-heart text-danger"></i> and passion.
          </p>
          <div className="footer-socials d-flex gap-3">
            <a
              href="https://github.com/jawadkh92552417"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/jawad-khan-72622832a"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://x.com/jawadkh92552417"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="X (Twitter)"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="mailto:jawadkhanahmad7@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
