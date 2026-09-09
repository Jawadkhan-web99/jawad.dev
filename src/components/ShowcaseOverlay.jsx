import React, { useState, useEffect, useMemo, useRef } from 'react';
import { projects } from '../data/projects';

const categoryConfig = {
  Frontend: {
    iconClass: 'fe',
    icon: 'fas fa-palette',
    meta: 'HTML · CSS · JavaScript · React · Bootstrap',
  },
  Backend: {
    iconClass: 'be',
    icon: 'fas fa-server',
    meta: 'Node.js · Express.js · MongoDB · REST APIs',
  },
  'Full Stack': {
    iconClass: 'fs',
    icon: 'fas fa-layer-group',
    meta: 'MERN Stack · Complete Web Applications',
  },
};

export default function ShowcaseOverlay({ category, onClose, onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [imgErrors, setImgErrors] = useState({});
  const closeBtnRef = useRef(null);

  const cfg = categoryConfig[category] || {};

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!category) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (closeBtnRef.current) {
      setTimeout(() => closeBtnRef.current?.focus(), 200);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [category, onClose]);

  const filteredProjects = useMemo(() => {
    if (!category) return [];
    const q = searchQuery.toLowerCase().trim();

    return projects.filter((p) => {
      if (p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [category, searchQuery]);

  if (!category) return null;

  return (
    <div
      className="showcase-overlay active"
      id="showcaseOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcaseTitle"
      onClick={(e) => {
        if (e.target.id === 'showcaseOverlay') onClose();
      }}
    >
      <div className="showcase-container">
        {/* Showcase Header */}
        <div className="showcase-header">
          <div className="showcase-header-left">
            <div className={`showcase-icon ${cfg.iconClass || ''}`}>
              <i className={cfg.icon}></i>
            </div>
            <div>
              <h2 className="showcase-title" id="showcaseTitle">
                {category} Projects
              </h2>
              <p className="showcase-meta" id="showcaseMeta">
                {cfg.meta || ''}
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            className="showcase-close"
            id="showcaseClose"
            onClick={onClose}
            aria-label="Close showcase"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Search inside showcase */}
        <div className="showcase-search-wrap">
          <i className="fas fa-search" aria-hidden="true"></i>
          <input
            type="search"
            id="showcaseSearch"
            className="showcase-search-input"
            placeholder="Search projects..."
            aria-label="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="showcase-grid" id="showcaseGrid" aria-live="polite">
            {filteredProjects.map((project, idx) => {
              const hasImgErr = imgErrors[project.title];
              const isLiveDisabled = !project.liveLink || project.liveLink === '#';

              return (
                <article
                  key={project.title}
                  className="sc-card"
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.title}`}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  onClick={() => onSelectProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                >
                  <div className="sc-img-wrap">
                    {project.image && !hasImgErr ? (
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [project.title]: true }))
                        }
                      />
                    ) : (
                      <div className="sc-img-placeholder">
                        <i className="fas fa-image" aria-hidden="true"></i>
                        <span>Screenshot coming soon</span>
                      </div>
                    )}
                    <div className="sc-img-overlay" aria-hidden="true">
                      <a
                        href={project.liveLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-btn"
                        style={isLiveDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fas fa-external-link-alt"></i> Live
                      </a>
                      <a
                        href={project.githubLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fab fa-github"></i> Code
                      </a>
                    </div>
                  </div>

                  <div className="sc-body">
                    <div className="sc-category"># {project.category}</div>
                    <h3 className="sc-title">{project.title}</h3>
                    <p className="sc-desc">{project.description}</p>
                    <div className="sc-tech-list">
                      {project.technologies.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sc-footer">
                    <a
                      href={project.liveLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-btn sc-btn-live"
                      style={isLiveDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a
                      href={project.githubLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-btn sc-btn-github"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-github"></i> Code
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="showcase-no-results">
            <i className="fas fa-search"></i>
            <p>No projects found. Try a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}
