import React, { useState, useEffect } from 'react';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setNavOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`} id="mainNavbar" aria-label="Main navigation">
      <div className="container">
        <a className="navbar-brand" href="#home">
          <span className="brand-bracket">&lt;</span>
          <span className="brand-name">Jawad</span>
          <span className="brand-accent">.dev</span>
          <span className="brand-bracket">/&gt;</span>
        </a>

        <div className="d-flex align-items-center gap-3 order-lg-last">
          {/* Dark/Light Mode Toggle */}
          <button
            className="theme-toggle"
            id="themeToggle"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            title="Toggle theme"
          >
            <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'} id="themeIcon"></i>
          </button>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setNavOpen(prev => !prev)}
            aria-controls="navbarNav"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-icon">
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-2">
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                href="#home"
                onClick={handleLinkClick}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                href="#about"
                onClick={handleLinkClick}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                href="#skills"
                onClick={handleLinkClick}
              >
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                href="#projects"
                onClick={handleLinkClick}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                href="#contact"
                onClick={handleLinkClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
